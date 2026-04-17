import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Récupére la dernière version de l'application (public)
export async function GET(req) {
	try {
		const latestVersion = await prisma.appVersion.findFirst({
			where: { isLatest: true },
		});

		if (!latestVersion) {
			return NextResponse.json(
				{ error: "Aucune version disponible" },
				{ status: 404 },
			);
		}

		delete latestVersion.downloadCount;

		return NextResponse.json({
			...latestVersion,
			fileSize: latestVersion.fileSize.toString(),
		});
	} catch (error) {
		console.error("Erreur récupération dernière version:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
