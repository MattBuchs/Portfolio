import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    generateLicenseKey,
    encryptLicenseKey,
    decryptLicenseKey,
    generateLicenseSecret,
} from "@/lib/crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Nombre d'utilisations par plan
const PLAN_USAGES = {
    PRO: 1, // 1 installation
    BUSINESS: 3, // 3 installations
};

export async function POST(request) {
    try {
        const { sessionId } = await request.json();

        console.log("sessionId", sessionId);

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID manquant" },
                { status: 400 }
            );
        }

        // Vérifier si une licence existe déjà dans la base de données
        let existingLicense = await prisma.license.findUnique({
            where: { sessionId },
        });

        if (existingLicense) {
            // Déchiffrer la clé de licence
            const decryptedKey = decryptLicenseKey(existingLicense.licenseKey);

            return NextResponse.json({
                success: true,
                licenseKey: decryptedKey,
                email: existingLicense.email,
            });
        }

        // Vérifier le paiement auprès de Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });

        if (session.payment_status !== "paid") {
            return NextResponse.json(
                { error: "Paiement non confirmé" },
                { status: 400 }
            );
        }

        console.log("SESSION", session);

        // Générer une nouvelle clé de licence
        const licenseKey = generateLicenseKey();
        const encryptedKey = encryptLicenseKey(licenseKey);
        const licenseSecret = generateLicenseSecret();

        // Récupérer le plan depuis les metadata et le convertir en majuscules
        const planLower = session.metadata.plan || "pro";
        const plan = planLower.toUpperCase(); // Convertir en majuscules pour matcher l'enum Prisma
        const maxUsages = PLAN_USAGES[plan] || 1;

        // Récupérer les prix depuis Stripe (en centimes)
        const amountTotal = session.amount_total / 100; // Convertir en euros
        const originalPrice = session.metadata.originalPrice
            ? parseFloat(session.metadata.originalPrice)
            : amountTotal;
        const promoCode = session.metadata.promoCode || null;
        const discount = originalPrice - amountTotal;

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

        return NextResponse.json({
            success: true,
            licenseKey: licenseKey, // Retourner la clé déchiffrée
            email: license.email,
        });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification" },
            { status: 500 }
        );
    }
}
