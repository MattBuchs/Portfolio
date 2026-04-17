export const metadata = {
	title: "GameMaster OS - Logiciel de Gestion pour Escape Games",
	description:
		"GameMaster OS est le logiciel tout-en-un pour gérer votre escape game : indices, chronomètre, sons, vidéos, images et control room. Interface moderne et intuitive pour game masters.",
	keywords: [
		"escape game",
		"game master",
		"logiciel escape room",
		"gestion escape game",
		"chronomètre escape game",
		"indices escape room",
		"control room escape game",
		"logiciel game master",
		"GameMaster OS",
		"escape room software",
	],
	alternates: {
		canonical: "https://matt-buchs.me/gamemaster-os",
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://matt-buchs.me/gamemaster-os",
		title: "GameMaster OS - Logiciel de Gestion pour Escape Games",
		description:
			"Le logiciel tout-en-one pour game masters : indices, chronomètre, sons, vidéos et control room. Interface moderne et intuitive pour gérer vos escape games.",
		siteName: "Matt Buchs",
		images: [
			{
				url: "https://matt-buchs.me/img/screenshots/dashboard.png",
				width: 1200,
				height: 630,
				alt: "GameMaster OS - Interface de gestion pour escape games",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "GameMaster OS - Logiciel de Gestion pour Escape Games",
		description:
			"Le logiciel tout-en-one pour game masters : indices, chronomètre, sons, vidéos et control room.",
		images: ["https://matt-buchs.me/img/screenshots/dashboard.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function GameMasterOSLayout({ children }) {
	return children;
}
