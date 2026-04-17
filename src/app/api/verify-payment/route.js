import {
	decryptLicenseKey,
	encryptLicenseKey,
	generateLicenseKey,
	generateLicenseSecret,
} from "@/lib/crypto";
import { LicensePurchaseEmail } from "@/lib/email-templates";
import { generateInvoiceNumber, generateInvoicePDF } from "@/lib/invoice-pdf";
import { prisma } from "@/lib/prisma";
import { FROM_EMAIL, getRecipientEmail, resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Plans valides dans l'enum Prisma
const VALID_PLANS = ["PRO", "BUSINESS"];

// Nombre d'utilisations par plan
const PLAN_USAGES = {
	PRO: 1, // 1 installation
	BUSINESS: 3, // 3 installations
};

// Mapping des plans invalides vers des plans valides
const PLAN_MAPPING = {
	ENTERPRISE: "BUSINESS", // Enterprise n'existe pas, mapper vers Business
	FREE: "PRO", // Free n'est pas payant, mapper vers Pro par défaut
};

// Configuration de sécurité pour la consultation de la clé
const MAX_VIEW_COUNT = 5; // Nombre maximum de consultations
const VIEW_EXPIRY_HOURS = 24; // Durée de validité en heures

export async function POST(request) {
	try {
		const { sessionId } = await request.json();

		if (!sessionId) {
			return NextResponse.json(
				{ error: "Session ID manquant" },
				{ status: 400 },
			);
		}

		// Vérifier si une licence existe déjà dans la base de données
		let existingLicense = await prisma.license.findUnique({
			where: { sessionId },
		});

		if (existingLicense) {
			// Vérifier si la consultation est encore autorisée
			const now = new Date();

			// Vérifier l'expiration temporelle
			if (
				existingLicense.viewableUntil &&
				now > existingLicense.viewableUntil
			) {
				return NextResponse.json(
					{
						error: "Lien expiré",
						message:
							"Ce lien a expiré. Votre clé de licence vous a été envoyée par email.",
						expired: true,
					},
					{ status: 403 },
				);
			}

			// Vérifier le nombre de consultations
			if (existingLicense.viewCount >= MAX_VIEW_COUNT) {
				return NextResponse.json(
					{
						error: "Limite de consultations atteinte",
						message:
							"Vous avez atteint le nombre maximum de consultations. Votre clé de licence vous a été envoyée par email.",
						limitReached: true,
					},
					{ status: 403 },
				);
			}

			// Incrémenter le compteur de vues
			await prisma.license.update({
				where: { sessionId },
				data: { viewCount: { increment: 1 } },
			});

			// Déchiffrer la clé de licence
			const decryptedKey = decryptLicenseKey(existingLicense.licenseKey);

			return NextResponse.json({
				success: true,
				licenseKey: decryptedKey,
				email: existingLicense.email,
				viewsRemaining: MAX_VIEW_COUNT - existingLicense.viewCount - 1,
			});
		}

		// Vérifier le paiement auprès de Stripe
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["line_items"],
		});

		if (session.payment_status !== "paid") {
			return NextResponse.json(
				{ error: "Paiement non confirmé" },
				{ status: 400 },
			);
		}

		// Générer une nouvelle clé de licence
		const licenseKey = generateLicenseKey();
		const encryptedKey = encryptLicenseKey(licenseKey);
		const licenseSecret = generateLicenseSecret();

		// Récupérer le plan depuis les metadata et le convertir en majuscules
		const planLower = session.metadata.plan || "pro";
		let plan = planLower.toUpperCase(); // Convertir en majuscules pour matcher l'enum Prisma

		// Valider et mapper le plan si nécessaire
		if (!VALID_PLANS.includes(plan)) {
			plan = PLAN_MAPPING[plan] || "PRO"; // Mapper vers un plan valide ou PRO par défaut
		}

		const maxUsages = PLAN_USAGES[plan] || 1;

		// Récupérer les prix depuis Stripe (en centimes)
		const amountTotal = session.amount_total / 100; // Convertir en euros
		const originalPrice = session.metadata.originalPrice
			? parseFloat(session.metadata.originalPrice)
			: amountTotal;
		const promoCode = session.metadata.promoCode || null;
		const discount = originalPrice - amountTotal;

		// Calculer la date d'expiration pour la consultation de la clé
		const viewableUntil = new Date();
		viewableUntil.setHours(viewableUntil.getHours() + VIEW_EXPIRY_HOURS);

		// Créer la licence dans la base de données
		const license = await prisma.license.create({
			data: {
				sessionId,
				email: session.customer_email,
				licenseKey: encryptedKey,
				licenseSecret,
				plan,
				maxUsages,
				remainingUsages: maxUsages,
				customerName: session.metadata.name || null,
				company: session.metadata.company || null,
				price: amountTotal, // Prix final payé
				originalPrice: originalPrice, // Prix avant réduction
				promoCode: promoCode,
				discount: discount > 0 ? discount : null,
				viewCount: 1, // Première consultation
				viewableUntil,
			},
		});

		// Si un code promo a été utilisé, incrémenter son compteur d'utilisations
		if (promoCode) {
			await prisma.promoCode.update({
				where: { code: promoCode },
				data: {
					usedCount: {
						increment: 1,
					},
				},
			});
		}

		// ===== ENVOI DE L'EMAIL AVEC FACTURE PDF =====
		try {
			const invoiceNumber = generateInvoiceNumber();
			const purchaseDate = new Date();

			// Générer la facture PDF
			const invoicePDF = await generateInvoicePDF({
				invoiceNumber,
				purchaseDate,
				customerName: license.customerName || "Client",
				customerEmail: license.email,
				company: license.company,
				licenseKey,
				plan,
				price: amountTotal,
				originalPrice,
				discount: discount > 0 ? discount : null,
				promoCode,
			});

			// Envoyer l'email avec la facture en pièce jointe
			await resend.emails.send({
				from: FROM_EMAIL,
				to: getRecipientEmail(license.email),
				subject: `Votre licence GameMaster OS ${plan === "PRO" ? "Pro" : "Business"} - Facture ${invoiceNumber}`,
				react: LicensePurchaseEmail({
					customerName: license.customerName || "Client",
					email: license.email,
					licenseKey,
					plan,
					price: amountTotal,
					originalPrice,
					discount: discount > 0 ? discount : null,
					promoCode,
					invoiceNumber,
					purchaseDate,
				}),
				attachments: [
					{
						filename: `Facture-${invoiceNumber}.pdf`,
						content: invoicePDF,
					},
				],
			});

			console.log(
				`Email envoyé à ${license.email} avec facture ${invoiceNumber}`,
			);
		} catch (emailError) {
			// Log l'erreur mais ne pas faire échouer la requête
			console.error("Erreur lors de l'envoi de l'email:", emailError);
		}

		return NextResponse.json({
			success: true,
			licenseKey: licenseKey, // Retourner la clé déchiffrée
			email: license.email,
			viewsRemaining: MAX_VIEW_COUNT - 1,
		});
	} catch (error) {
		console.error("Verification error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la vérification" },
			{ status: 500 },
		);
	}
}
