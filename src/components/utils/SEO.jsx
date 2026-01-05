/**
 * Fonction utilitaire pour générer les métadonnées d'une page Next.js
 * À utiliser avec `export const metadata = generateMetadata(...)` dans vos pages
 *
 * @param {Object} params - Paramètres pour les métadonnées
 * @param {string} params.title - Titre de la page
 * @param {string} params.description - Description de la page
 * @param {string|string[]} params.keywords - Mots-clés de la page
 * @param {string} params.image - URL de l'image pour les réseaux sociaux
 * @param {string} params.url - URL canonique de la page
 * @param {string} params.type - Type de contenu OpenGraph (website, article, etc.)
 * @returns {Object} Objet metadata pour Next.js
 */
export function generateSEOMetadata({
    title,
    description,
    keywords,
    image = "https://matt-buchs.me/img/Logo-Skroma.jpg",
    url,
    type = "website",
} = {}) {
    const metadata = {};

    // Title
    if (title) {
        metadata.title = title;
    }

    // Description
    if (description) {
        metadata.description = description;
    }

    // Keywords
    if (keywords) {
        metadata.keywords = Array.isArray(keywords)
            ? keywords
            : keywords.split(", ");
    }

    // Canonical URL
    if (url) {
        metadata.alternates = {
            canonical: url,
        };
    }

    // OpenGraph
    if (title || description || image || url || type) {
        metadata.openGraph = {};

        if (type) metadata.openGraph.type = type;
        if (url) metadata.openGraph.url = url;
        if (title) metadata.openGraph.title = title;
        if (description) metadata.openGraph.description = description;
        if (image) {
            metadata.openGraph.images = [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title || "Matt Buchs",
                },
            ];
        }
    }

    // Twitter
    if (title || description || image) {
        metadata.twitter = {
            card: "summary_large_image",
        };

        if (title) metadata.twitter.title = title;
        if (description) metadata.twitter.description = description;
        if (image) metadata.twitter.images = [image];
    }

    return metadata;
}
