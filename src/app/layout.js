import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import StructuredData from "../components/utils/StructuredData";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const greatVibes = Great_Vibes({
    weight: "400",
    variable: "--font-vibes",
    subsets: ["latin"],
});

export const metadata = {
    metadataBase: new URL("https://matt-buchs.me"),
    title: {
        default: "Matt Buchs - Développeur Web Full Stack",
        template: "%s | Matt Buchs",
    },
    description:
        "Portfolio de Matt Buchs - Développeur Web Full Stack spécialisé en React, Node.js et JavaScript. Découvrez mes projets et compétences en développement web moderne.",
    keywords: [
        "Matt Buchs",
        "développeur web",
        "full stack",
        "React",
        "JavaScript",
        "Node.js",
        "Next.js",
        "portfolio",
        "développeur front-end",
        "développeur back-end",
    ],
    authors: [{ name: "Matt Buchs" }],
    creator: "Matt Buchs",
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://matt-buchs.me",
        title: "Matt Buchs - Développeur Web Full Stack",
        description:
            "Portfolio de Matt Buchs - Développeur Web Full Stack spécialisé en React, Node.js et JavaScript. Découvrez mes projets et compétences en développement web moderne.",
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
        title: "Matt Buchs - Développeur Web Full Stack",
        description:
            "Portfolio de Matt Buchs - Développeur Web Full Stack spécialisé en React, Node.js et JavaScript. Découvrez mes projets et compétences en développement web moderne.",
        images: ["https://matt-buchs.me/img/Logo-Skroma.jpg"],
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
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
            >
                <StructuredData />
                {children}
            </body>
        </html>
    );
}
