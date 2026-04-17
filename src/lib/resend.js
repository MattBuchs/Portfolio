import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const isDev = process.env.NODE_ENV === "development";

// En dev, utiliser le domaine de test Resend
// En prod, utiliser le domaine vérifié
export const FROM_EMAIL = isDev
	? "GameMaster OS <onboarding@resend.dev>"
	: "GameMaster OS <noreply@matt-buchs.me>";

// Email de support / destinataire en dev
export const SUPPORT_EMAIL = "mattbuchs25@gmail.com";

// En dev, tous les emails sont redirigés vers cette adresse
export const DEV_EMAIL = "mattbuchs25@gmail.com";

/**
 * Retourne l'email destinataire (redirige vers DEV_EMAIL en développement)
 * @param {string} email - Email original
 * @returns {string} Email à utiliser
 */
export function getRecipientEmail(email) {
	if (isDev) {
		console.log(`[DEV] Email redirigé: ${email} → ${DEV_EMAIL}`);
		return DEV_EMAIL;
	}
	return email;
}
