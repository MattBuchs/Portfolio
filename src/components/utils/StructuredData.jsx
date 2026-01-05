export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Matt Buchs",
        jobTitle: "Développeur Web Full Stack",
        description:
            "Développeur web freelance spécialisé en Next.js, Node.js et JavaScript. Diplômé d'un Bac +2 en développement web.",
        url: "https://matt-buchs.me",
        sameAs: [
            "https://github.com/MattBuchs",
            "https://www.linkedin.com/in/matt-buchs/",
        ],
        image: "https://matt-buchs.me/img/Logo-Skroma.jpg",
        email: "mailto:mattbuchs25@gmail.com",
        knowsAbout: [
            "JavaScript",
            "React",
            "Node.js",
            "Next.js",
            "Tailwind CSS",
            "Prisma",
            "TypeScript",
            "Full Stack Development",
        ],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "O'clock",
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
        offers: {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Développement Web",
                description:
                    "Conception et développement de sites web et applications web modernes, performantes et esthétiques",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
