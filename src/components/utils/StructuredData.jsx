export default function StructuredData() {
	// Person/Professional Profile Schema
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": "https://matt-buchs.me/#person",
		name: "Matt Buchs",
		givenName: "Matt",
		familyName: "Buchs",
		jobTitle: "Développeur Web Full Stack",
		description:
			"Développeur web freelance spécialisé en Next.js, Node.js et JavaScript. Diplômé d'un Bac +2 en développement web.",
		url: "https://matt-buchs.me",
		sameAs: [
			"https://github.com/MattBuchs",
			"https://www.linkedin.com/in/matt-buchs/",
		],
		image: {
			"@type": "ImageObject",
			url: "https://matt-buchs.me/img/Logo-Skroma.jpg",
			width: 1200,
			height: 630,
		},
		email: "mailto:mattbuchs25@gmail.com",
		telephone: "+33664935294",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Arçon",
			postalCode: "25300",
			addressCountry: "FR",
		},
		knowsAbout: [
			"JavaScript",
			"React",
			"Node.js",
			"Next.js",
			"Tailwind CSS",
			"Prisma",
			"TypeScript",
			"Full Stack Development",
			"SEO",
			"Web Performance",
		],
		alumniOf: {
			"@type": "EducationalOrganization",
			name: "O'clock",
			url: "https://oclock.io/",
		},
		hasOccupation: {
			"@type": "Occupation",
			name: "Développeur Web Full Stack",
			occupationLocation: {
				"@type": "Country",
				name: "France",
			},
			skills: [
				"React",
				"JavaScript",
				"Node.js",
				"Next.js",
				"Tailwind CSS",
				"TypeScript",
			],
		},
	};

	// WebSite Schema for search optimization
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "https://matt-buchs.me/#website",
		url: "https://matt-buchs.me",
		name: "Matt Buchs - Développeur Web Full Stack",
		description:
			"Portfolio de Matt Buchs, développeur web freelance spécialisé en React, Next.js et Node.js.",
		publisher: {
			"@id": "https://matt-buchs.me/#person",
		},
		inLanguage: "fr-FR",
	};

	// Professional Service Schema
	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"@id": "https://matt-buchs.me/#service",
		name: "Matt Buchs - Développement Web",
		description:
			"Services de développement web sur mesure : sites vitrines, applications web, e-commerce et optimisation SEO.",
		url: "https://matt-buchs.me",
		provider: {
			"@id": "https://matt-buchs.me/#person",
		},
		areaServed: {
			"@type": "Country",
			name: "France",
		},
		serviceType: [
			"Développement Web",
			"Applications Web",
			"Sites E-commerce",
			"Optimisation SEO",
			"Maintenance Web",
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Services de développement web",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Développement Web Sur Mesure",
						description:
							"Création de sites web personnalisés, adaptés à votre identité et vos besoins.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Optimisation SEO & Performance",
						description:
							"Optimisation de la vitesse, de la structure et du contenu pour améliorer votre visibilité.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Maintenance & Support",
						description:
							"Services de maintenance régulière : mises à jour, sécurité et support technique.",
					},
				},
			],
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(personSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(serviceSchema),
				}}
			/>
		</>
	);
}
