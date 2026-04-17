import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptLicenseKey } from "@/lib/crypto";

export async function POST(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const { licenseId, password } = await request.json();

        // Vérifier le mot de passe admin
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "Mot de passe incorrect" },
                { status: 403 }
            );
        }

        // Récupérer et déchiffrer la licence
        const license = await prisma.license.findUnique({
            where: { id: licenseId },
        });

        if (!license) {
            return NextResponse.json(
                { error: "Licence introuvable" },
                { status: 404 }
            );
        }

        const decryptedKey = decryptLicenseKey(license.licenseKey);

        return NextResponse.json({
            success: true,
            licenseKey: decryptedKey,
        });
    } catch (error) {
        console.error("Error decrypting license:", error);
        return NextResponse.json(
            { error: "Erreur lors du déchiffrement" },
            { status: 500 }
        );
    }
}
