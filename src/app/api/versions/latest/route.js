import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupére la dernière version de l'application (public)
export async function GET(req) {
    try {
        const latestVersion = await prisma.appVersion.findFirst({
            where: { isLatest: true },
        });

        if (!latestVersion) {
            return NextResponse.json(
                { error: "Aucune version disponible" },
                { status: 404 }
            );
        }

        delete latestVersion.downloadCount;

        return NextResponse.json({
            ...latestVersion,
            fileSize: latestVersion.fileSize.toString(),
            downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/downloads/GameMasterOS_v${latestVersion.version}_Setup.exe`,
        });
    } catch (error) {
        console.error("Erreur récupération dernière version:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
