import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { auth } from "@/lib/auth";

// GET: Récupérer toutes les versions
export async function GET(req) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
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

// POST: Créer une nouvelle version
export async function POST(req) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const version = formData.get("version");
        const releaseNotes = formData.get("releaseNotes");

        if (!file || !version || !releaseNotes) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        // Vérifier si la version existe déjà
        const existingVersion = await prisma.appVersion.findUnique({
            where: { version },
        });

        if (existingVersion) {
            return NextResponse.json(
                { error: "Cette version existe déjà" },
                { status: 400 }
            );
        }

        // Sauvegarder le fichier
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `GameMasterOS_v${version}_Setup.exe`;
        const filePath = join(process.cwd(), "public", "downloads", fileName);

        await writeFile(filePath, buffer);

        // Mettre toutes les versions en isLatest = false
        await prisma.appVersion.updateMany({
            where: { isLatest: true },
            data: { isLatest: false },
        });

        // Créer la nouvelle version
        const newVersion = await prisma.appVersion.create({
            data: {
                version,
                fileName,
                fileSize: BigInt(buffer.length),
                releaseNotes,
                isLatest: true,
            },
        });

        // Convertir BigInt en string pour JSON
        const versionForJson = {
            ...newVersion,
            fileSize: newVersion.fileSize.toString(),
        };

        return NextResponse.json(versionForJson);
    } catch (error) {
        console.error("Erreur création version:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// DELETE: Supprimer une version
export async function DELETE(req) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const versionId = searchParams.get("id");

        if (!versionId) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        const version = await prisma.appVersion.findUnique({
            where: { id: versionId },
        });

        if (!version) {
            return NextResponse.json(
                { error: "Version introuvable" },
                { status: 404 }
            );
        }

        // Ne pas permettre de supprimer la dernière version
        if (version.isLatest) {
            return NextResponse.json(
                {
                    error: "Impossible de supprimer la dernière version. Créez d'abord une nouvelle version.",
                },
                { status: 400 }
            );
        }

        // Supprimer le fichier
        const filePath = join(
            process.cwd(),
            "public",
            "downloads",
            version.fileName
        );

        if (existsSync(filePath)) {
            await unlink(filePath);
        }

        // Supprimer de la DB
        await prisma.appVersion.delete({
            where: { id: versionId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur suppression version:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// PATCH: Marquer une version comme latest
export async function PATCH(req) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            );
        }

        const { versionId } = await req.json();

        if (!versionId) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        // Mettre toutes les versions en isLatest = false
        await prisma.appVersion.updateMany({
            where: { isLatest: true },
            data: { isLatest: false },
        });

        // Marquer la version comme latest
        const updatedVersion = await prisma.appVersion.update({
            where: { id: versionId },
            data: { isLatest: true },
        });

        return NextResponse.json({
            ...updatedVersion,
            fileSize: updatedVersion.fileSize.toString(),
        });
    } catch (error) {
        console.error("Erreur mise à jour version:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
