import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * Génère une facture PDF pour GameMaster OS
 * @param {Object} data - Données de la facture
 * @returns {Promise<Buffer>} Le PDF en buffer
 */
export async function generateInvoicePDF({
	invoiceNumber,
	purchaseDate,
	customerName,
	customerEmail,
	company,
	licenseKey,
	plan,
	price,
	originalPrice,
	discount,
	promoCode,
}) {
	// Créer un nouveau document PDF
	const pdfDoc = await PDFDocument.create();
	const page = pdfDoc.addPage([595.28, 841.89]); // A4

	// Polices
	const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	// Couleurs
	const colors = {
		dark: rgb(0.04, 0.04, 0.04), // #0a0a0b
		amber: rgb(0.96, 0.62, 0.04), // #f59e0b
		gray: rgb(0.44, 0.44, 0.47), // #71717a
		lightGray: rgb(0.63, 0.63, 0.66), // #a1a1aa
		white: rgb(1, 1, 1),
		border: rgb(0.85, 0.85, 0.85),
	};

	const { width, height } = page.getSize();
	const margin = 50;
	let y = height - margin;

	// ===== EN-TÊTE =====
	// Logo placeholder (texte stylisé)
	page.drawText("GAMEMASTER OS", {
		x: margin,
		y: y,
		size: 24,
		font: fontBold,
		color: colors.dark,
	});

	// Numéro de facture
	page.drawText(`FACTURE N° ${invoiceNumber}`, {
		x: width - margin - 180,
		y: y,
		size: 12,
		font: fontBold,
		color: colors.amber,
	});

	y -= 30;

	// Informations vendeur
	page.drawText("Matt Buchs - Développeur Web", {
		x: margin,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});

	y -= 14;
	page.drawText("mattbuchs25@gmail.com", {
		x: margin,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});

	y -= 14;
	page.drawText("https://matt-buchs.me", {
		x: margin,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});

	// Date de facture (à droite)
	const formattedDate = new Date(purchaseDate).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	page.drawText(`Date : ${formattedDate}`, {
		x: width - margin - 180,
		y: y + 28,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});

	// Ligne de séparation
	y -= 40;
	page.drawLine({
		start: { x: margin, y: y },
		end: { x: width - margin, y: y },
		thickness: 1,
		color: colors.border,
	});

	// ===== INFORMATIONS CLIENT =====
	y -= 30;
	page.drawText("FACTURÉ À", {
		x: margin,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.amber,
	});

	y -= 20;
	page.drawText(customerName, {
		x: margin,
		y: y,
		size: 12,
		font: fontBold,
		color: colors.dark,
	});

	if (company) {
		y -= 16;
		page.drawText(company, {
			x: margin,
			y: y,
			size: 10,
			font: fontRegular,
			color: colors.gray,
		});
	}

	y -= 16;
	page.drawText(customerEmail, {
		x: margin,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});

	// ===== TABLEAU DES ARTICLES =====
	y -= 50;

	// En-tête du tableau
	const tableStartY = y;
	const colWidths = {
		description: 280,
		quantity: 60,
		unitPrice: 80,
		total: 75,
	};

	// Fond de l'en-tête
	page.drawRectangle({
		x: margin,
		y: y - 5,
		width: width - 2 * margin,
		height: 25,
		color: rgb(0.96, 0.96, 0.96),
	});

	page.drawText("Description", {
		x: margin + 10,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.dark,
	});

	page.drawText("Qté", {
		x: margin + colWidths.description + 10,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.dark,
	});

	page.drawText("Prix unitaire", {
		x: margin + colWidths.description + colWidths.quantity + 10,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.dark,
	});

	page.drawText("Total", {
		x: width - margin - 50,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.dark,
	});

	// Ligne de produit
	y -= 35;

	const planNames = {
		PRO: "Pro",
		BUSINESS: "Business",
	};

	const productName = `Licence GameMaster OS ${planNames[plan] || plan}`;
	const productDescription = `Clé: ${licenseKey}`;

	page.drawText(productName, {
		x: margin + 10,
		y: y,
		size: 11,
		font: fontBold,
		color: colors.dark,
	});

	y -= 14;
	page.drawText(productDescription, {
		x: margin + 10,
		y: y,
		size: 9,
		font: fontRegular,
		color: colors.gray,
	});

	page.drawText("1", {
		x: margin + colWidths.description + 20,
		y: y + 7,
		size: 10,
		font: fontRegular,
		color: colors.dark,
	});

	page.drawText(`${originalPrice?.toFixed(2)} €`, {
		x: margin + colWidths.description + colWidths.quantity + 10,
		y: y + 7,
		size: 10,
		font: fontRegular,
		color: colors.dark,
	});

	page.drawText(`${originalPrice?.toFixed(2)} €`, {
		x: width - margin - 55,
		y: y + 7,
		size: 10,
		font: fontRegular,
		color: colors.dark,
	});

	// Ligne de séparation
	y -= 25;
	page.drawLine({
		start: { x: margin, y: y },
		end: { x: width - margin, y: y },
		thickness: 1,
		color: colors.border,
	});

	// ===== TOTAUX =====
	y -= 30;
	const totalsX = width - margin - 180;

	// Sous-total
	page.drawText("Sous-total HT", {
		x: totalsX,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});
	page.drawText(`${originalPrice?.toFixed(2)} €`, {
		x: width - margin - 55,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.dark,
	});

	// Réduction si applicable
	if (promoCode && discount > 0) {
		y -= 18;
		page.drawText(`Réduction (${promoCode})`, {
			x: totalsX,
			y: y,
			size: 10,
			font: fontRegular,
			color: colors.amber,
		});
		page.drawText(`-${discount?.toFixed(2)} €`, {
			x: width - margin - 55,
			y: y,
			size: 10,
			font: fontRegular,
			color: colors.amber,
		});
	}

	// TVA
	y -= 18;
	page.drawText("TVA (0%)", {
		x: totalsX,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.gray,
	});
	page.drawText("0,00 €", {
		x: width - margin - 55,
		y: y,
		size: 10,
		font: fontRegular,
		color: colors.dark,
	});

	// Ligne avant total
	y -= 15;
	page.drawLine({
		start: { x: totalsX, y: y },
		end: { x: width - margin, y: y },
		thickness: 1,
		color: colors.border,
	});

	// Total TTC
	y -= 25;
	page.drawText("TOTAL TTC", {
		x: totalsX,
		y: y,
		size: 12,
		font: fontBold,
		color: colors.dark,
	});
	page.drawText(`${price?.toFixed(2)} €`, {
		x: width - margin - 60,
		y: y,
		size: 14,
		font: fontBold,
		color: colors.amber,
	});

	// ===== NOTES =====
	y -= 80;
	page.drawLine({
		start: { x: margin, y: y },
		end: { x: width - margin, y: y },
		thickness: 1,
		color: colors.border,
	});

	y -= 25;
	page.drawText("NOTES", {
		x: margin,
		y: y,
		size: 10,
		font: fontBold,
		color: colors.amber,
	});

	y -= 18;
	const notes = [
		"• Cette licence est valide pour une utilisation personnelle ou commerciale.",
		"• Le nombre d'installations dépend du plan choisi.",
		"• Support technique disponible par email.",
		"• Facture acquittée - Paiement reçu par carte bancaire via Stripe.",
	];

	for (const note of notes) {
		page.drawText(note, {
			x: margin,
			y: y,
			size: 9,
			font: fontRegular,
			color: colors.gray,
		});
		y -= 14;
	}

	// ===== PIED DE PAGE =====
	const footerY = 50;

	page.drawLine({
		start: { x: margin, y: footerY + 20 },
		end: { x: width - margin, y: footerY + 20 },
		thickness: 1,
		color: colors.border,
	});

	page.drawText(
		"Matt Buchs - Développeur Web Freelance | matt-buchs.me | mattbuchs25@gmail.com",
		{
			x: margin,
			y: footerY,
			size: 8,
			font: fontRegular,
			color: colors.gray,
		},
	);

	page.drawText("Merci pour votre confiance !", {
		x: width - margin - 120,
		y: footerY,
		size: 8,
		font: fontBold,
		color: colors.amber,
	});

	// Générer le PDF
	const pdfBytes = await pdfDoc.save();
	return Buffer.from(pdfBytes);
}

/**
 * Génère un numéro de facture unique
 * @returns {string} Numéro de facture au format GMOS-YYYYMMDD-XXXX
 */
export function generateInvoiceNumber() {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const random = Math.random().toString(36).substring(2, 6).toUpperCase();

	return `GMOS-${year}${month}${day}-${random}`;
}
