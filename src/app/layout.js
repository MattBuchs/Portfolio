import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import StructuredData from "../components/utils/StructuredData";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
	weight: ["500", "700"],
	variable: "--font-space",
	subsets: ["latin"],
});

export const metadata = {
	metadataBase: new URL("https://matt-buchs.me"),
	title: {
		default: "Matt Buchs - Développeur Web Full Stack Freelance",
		template: "%s | Matt Buchs",
	},
	description:
		"Matt Buchs, développeur web Full Stack freelance spécialisé en React, Next.js et Node.js. Création de sites web sur mesure, applications web et optimisation SEO. Disponible pour vos projets.",
	keywords: [
		"Matt Buchs",
		"développeur web",
		"full stack",
		"freelance",
		"React",
		"JavaScript",
		"Node.js",
		"Next.js",
		"portfolio",
		"développeur front-end",
		"développeur back-end",
		"création site web",
		"développeur freelance France",
		"Tailwind CSS",
		"TypeScript",
	],
	authors: [{ name: "Matt Buchs", url: "https://matt-buchs.me" }],
	creator: "Matt Buchs",
	publisher: "Matt Buchs",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://matt-buchs.me",
		title: "Matt Buchs - Développeur Web Full Stack Freelance",
		description:
			"Développeur web Full Stack freelance spécialisé en React, Next.js et Node.js. Création de sites web sur mesure et applications web modernes.",
		siteName: "Matt Buchs Portfolio",
		images: [
			{
				url: "https://matt-buchs.me/img/Logo-Skroma.jpg",
				width: 1200,
				height: 630,
				alt: "Matt Buchs - Développeur Web Full Stack",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Matt Buchs - Développeur Web Full Stack Freelance",
		description:
			"Développeur web Full Stack freelance spécialisé en React, Next.js et Node.js. Création de sites web sur mesure.",
		images: ["https://matt-buchs.me/img/Logo-Skroma.jpg"],
		creator: "@mattbuchs",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://matt-buchs.me",
	},
	category: "technology",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr" data-scroll-behavior="smooth" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
			>
				<StructuredData />
				{children}
			</body>
		</html>
	);
}
