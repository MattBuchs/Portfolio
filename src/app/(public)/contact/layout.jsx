export const metadata = {
	title: "Contact - Développeur Web Freelance",
	description:
		"Contactez Matt Buchs pour vos projets de développement web. Développeur Full Stack freelance disponible pour missions, collaborations et projets sur mesure.",
	keywords: [
		"contact développeur",
		"embaucher développeur web",
		"freelance développeur",
		"collaboration web",
		"mission développement",
		"devis site web",
		"développeur React freelance",
		"développeur Next.js",
	],
	alternates: {
		canonical: "https://matt-buchs.me/contact",
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://matt-buchs.me/contact",
		title: "Contact | Matt Buchs - Développeur Web Freelance",
		description:
			"Contactez Matt Buchs pour vos projets de développement web. Disponible pour des missions freelance et collaborations professionnelles.",
		siteName: "Matt Buchs",
		images: [
			{
				url: "https://matt-buchs.me/img/Logo-Skroma.jpg",
				width: 1200,
				height: 630,
				alt: "Contactez Matt Buchs - Développeur Web",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact | Matt Buchs - Développeur Web Freelance",
		description:
			"Contactez Matt Buchs pour vos projets de développement web. Disponible pour missions freelance.",
		images: ["https://matt-buchs.me/img/Logo-Skroma.jpg"],
	},
};

export default function ContactLayout({ children }) {
	return children;
}
