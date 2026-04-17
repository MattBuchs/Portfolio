import { ContactFormEmail } from "@/lib/email-templates";
import { FROM_EMAIL, resend, SUPPORT_EMAIL } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { firstName, lastName, email, phone, society, message } =
			await request.json();

		// Validation des champs obligatoires
		if (!lastName?.trim() || !email?.trim() || !message?.trim()) {
			return NextResponse.json(
				{ error: "Veuillez remplir tous les champs obligatoires" },
				{ status: 400 },
			);
		}

		// Validation basique de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email.trim())) {
			return NextResponse.json(
				{ error: "Le format de l'email n'est pas valide" },
				{ status: 400 },
			);
		}

		const fullName = firstName
			? `${firstName} ${lastName}`.trim()
			: lastName.trim();

		const subject = society
			? `Contact de ${fullName} (${society})`
			: `Contact de ${fullName}`;

		// Envoyer l'email au support
		const { error } = await resend.emails.send({
			from: FROM_EMAIL,
			to: SUPPORT_EMAIL,
			replyTo: email.trim(),
			subject,
			react: ContactFormEmail({
				name: fullName,
				email: email.trim(),
				subject,
				message: message.trim(),
			}),
		});

		if (error) {
			console.error("Erreur Resend:", error);
			return NextResponse.json(
				{ error: "Erreur lors de l'envoi du message" },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			success: true,
			message: "Message envoyé avec succès",
		});
	} catch (error) {
		console.error("Erreur lors de l'envoi du message:", error);
		return NextResponse.json(
			{ error: "Erreur interne du serveur" },
			{ status: 500 },
		);
	}
}
