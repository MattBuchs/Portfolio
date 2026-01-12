import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Récupérer toutes les versions (public)
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const latestOnly = searchParams.get("latest") === "true";

        if (latestOnly) {
            const latestVersion = await prisma.appVersion.findFirst({
                where: { isLatest: true },
            });

            if (!latestVersion) {
                return NextResponse.json(
                    { error: "Aucune version disponible" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                ...latestVersion,
                fileSize: latestVersion.fileSize.toString(),
            });
        }

        const versions = await prisma.appVersion.findMany({
            orderBy: { releaseDate: "desc" },
        });

        // Convertir BigInt en string pour JSON
        const versionsForJson = versions.map((v) => ({
            ...v,
            fileSize: v.fileSize.toString(),
        }));

        return NextResponse.json(versionsForJson);
    } catch (error) {
        console.error("Erreur récupération versions:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// POST: Incrémenter le compteur de téléchargements
export async function POST(req) {
    try {
        const { versionId } = await req.json();

        if (!versionId) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        await prisma.appVersion.update({
            where: { id: versionId },
            data: {
                downloadCount: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur incrémentation téléchargements:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
