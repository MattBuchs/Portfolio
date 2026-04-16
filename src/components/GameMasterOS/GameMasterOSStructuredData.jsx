"use client";

import { useEffect, useState } from "react";

export default function GameMasterOSStructuredData({ pricing }) {
	const [structuredData, setStructuredData] = useState(null);

	useEffect(() => {
		const proPrice =
			pricing?.find((p) => p.plan === "PRO")?.currentPrice ?? 119;
		const enterprisePrice =
			pricing?.find((p) => p.plan === "ENTERPRISE")?.currentPrice ?? 199;

		// SoftwareApplication Schema
		const softwareSchema = {
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"@id": "https://matt-buchs.me/gamemaster-os/#software",
			name: "GameMaster OS",
			applicationCategory: "BusinessApplication",
			operatingSystem: "Windows",
			description:
				"GameMaster OS est le logiciel tout-en-un pour gérer votre escape game : indices, chronomètre, sons, vidéos, images et control room. Interface moderne et intuitive pour game masters.",
			url: "https://matt-buchs.me/gamemaster-os",
			image: "https://matt-buchs.me/img/screenshots/dashboard.png",
			screenshot: [
				"https://matt-buchs.me/img/screenshots/dashboard.png",
				"https://matt-buchs.me/img/screenshots/gestion-timer.png",
				"https://matt-buchs.me/img/screenshots/ecran-joueur.png",
			],
			author: {
				"@type": "Person",
				name: "Matt Buchs",
				url: "https://matt-buchs.me",
			},
			featureList: [
				"Chronomètre personnalisable",
				"Gestion d'indices",
				"Control Room",
				"Sons et vidéos",
				"Double écran",
				"Thèmes personnalisables",
				"Support français et anglais",
			],
			softwareVersion: "1.0.0",
			offers: [
				{
					"@type": "Offer",
					name: "Version Gratuite",
					price: "0",
					priceCurrency: "EUR",
					description:
						"1 timer, 1 thème, Double écran, Gestion audio",
					availability: "https://schema.org/InStock",
				},
				{
					"@type": "Offer",
					name: "Licence PRO",
					price: proPrice.toString(),
					priceCurrency: "EUR",
					description:
						"Timers illimités, Tous les thèmes, Éditeur de thème, Indices pré-configurés, Licence perpétuelle",
					availability: "https://schema.org/InStock",
				},
				{
					"@type": "Offer",
					name: "Licence Entreprise",
					price: enterprisePrice.toString(),
					priceCurrency: "EUR",
					description:
						"Toutes les fonctionnalités PRO, Installation sur 3 postes, Support prioritaire",
					availability: "https://schema.org/InStock",
				},
			],
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "5",
				bestRating: "5",
				worstRating: "1",
				ratingCount: "1",
			},
		};

		// Product Schema for rich snippets in search results
		const productSchema = {
			"@context": "https://schema.org",
			"@type": "Product",
			name: "GameMaster OS - Licence PRO",
			description:
				"Logiciel de gestion complet pour escape games avec chronomètre, indices, sons et control room.",
			image: "https://matt-buchs.me/img/screenshots/dashboard.png",
			brand: {
				"@type": "Brand",
				name: "Matt Buchs",
			},
			offers: {
				"@type": "Offer",
				url: "https://matt-buchs.me/gamemaster-os",
				priceCurrency: "EUR",
				price: proPrice.toString(),
				availability: "https://schema.org/InStock",
				seller: {
					"@type": "Person",
					name: "Matt Buchs",
				},
			},
		};

		// FAQ Schema for SEO
		const faqSchema = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "Qu'est-ce que GameMaster OS ?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "GameMaster OS est un logiciel de gestion complet pour les escape games. Il permet de gérer le chronomètre, les indices, les sons, les vidéos et dispose d'une control room pour piloter vos parties.",
					},
				},
				{
					"@type": "Question",
					name: "GameMaster OS est-il gratuit ?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Oui, GameMaster OS propose une version gratuite avec 1 timer, 1 thème, le double écran et la gestion audio. Des licences PRO et Entreprise sont disponibles pour plus de fonctionnalités.",
					},
				},
				{
					"@type": "Question",
					name: "Sur quels systèmes GameMaster OS fonctionne-t-il ?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "GameMaster OS est disponible pour Windows. L'application est optimisée pour une utilisation professionnelle dans les escape games.",
					},
				},
				{
					"@type": "Question",
					name: "La licence GameMaster OS est-elle perpétuelle ?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Oui, les licences PRO et Entreprise sont des licences perpétuelles. Vous payez une seule fois et pouvez utiliser le logiciel sans limite de durée avec les mises à jour incluses.",
					},
				},
			],
		};

		// Breadcrumb Schema
		const breadcrumbSchema = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Accueil",
					item: "https://matt-buchs.me",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "GameMaster OS",
					item: "https://matt-buchs.me/gamemaster-os",
				},
			],
		};

		setStructuredData({
			softwareSchema,
			productSchema,
			faqSchema,
			breadcrumbSchema,
		});
	}, [pricing]);

	if (!structuredData) return null;

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData.softwareSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData.productSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData.faqSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData.breadcrumbSchema),
				}}
			/>
		</>
	);
}
