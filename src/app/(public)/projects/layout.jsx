export const metadata = {
	title: "Portfolio Projets - Développement Web",
	description:
		"Découvrez mon portfolio de développement web : applications React/Next.js, sites web responsive, e-commerce et projets Full Stack. Réalisations modernes et performantes.",
	keywords: [
		"portfolio développeur web",
		"projets React",
		"projets Next.js",
		"applications web",
		"sites web responsive",
		"développement front-end",
		"projets full stack",
		"réalisations web",
	],
	alternates: {
		canonical: "https://matt-buchs.me/projects",
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://matt-buchs.me/projects",
		title: "Portfolio Projets | Matt Buchs - Développeur Web",
		description:
			"Découvrez mon portfolio de développement web : applications React/Next.js, sites responsive et projets Full Stack.",
		siteName: "Matt Buchs",
		images: [
			{
				url: "https://matt-buchs.me/img/Logo-Skroma.jpg",
				width: 1200,
				height: 630,
				alt: "Portfolio Projets - Matt Buchs",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Portfolio Projets | Matt Buchs - Développeur Web",
		description:
			"Découvrez mon portfolio de développement web : applications React/Next.js et projets Full Stack.",
		images: ["https://matt-buchs.me/img/Logo-Skroma.jpg"],
	},
};

export default function ProjectsLayout({ children }) {
	return children;
}
