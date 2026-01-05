import { projects } from "@/lib/projects";
import NavBar from "@/components/Header/NavBar";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";

// Générer les métadonnées dynamiques pour chaque projet
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Projet non trouvé",
        };
    }

    return {
        title: project.title,
        description: project.paragraph,
        keywords: [
            project.title,
            "projet web",
            "portfolio",
            ...(project.tags || []),
        ],
        alternates: {
            canonical: `https://matt-buchs.me/projects/${slug}`,
        },
        openGraph: {
            title: `${project.title} | Matt Buchs`,
            description: project.paragraph,
            url: `https://matt-buchs.me/projects/${slug}`,
            images: [
                {
                    url: `https://matt-buchs.me/img/${project.img}`,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
    };
}

// Générer les routes statiques pour tous les projets
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function Project({ params }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <NavBar isProjectPage={true} />
            <ProjectDetail project={project} />
        </>
    );
}
