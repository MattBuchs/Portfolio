export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [],
        },
        sitemap: "https://matt-buchs.me/sitemap.xml",
    };
}
