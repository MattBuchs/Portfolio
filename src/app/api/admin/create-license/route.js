import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    generateLicenseKey,
    encryptLicenseKey,
    generateLicenseSecret,
} from "@/lib/crypto";

export async function POST(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const { email, customerName, company, plan, maxUsages, price } =
            await request.json();

        if (!email || !customerName || !plan || !maxUsages) {
            return NextResponse.json(
                { error: "Champs obligatoires manquants" },
                { status: 400 }
            );
        }

        // Générer une nouvelle clé
        const licenseKey = generateLicenseKey();
        const encryptedKey = encryptLicenseKey(licenseKey);
        const licenseSecret = generateLicenseSecret();

        // Créer la licence
        const license = await prisma.license.create({
            data: {
                email,
                customerName,
                company: company || null,
                licenseKey: encryptedKey,
                licenseSecret,
                plan,
                maxUsages: parseInt(maxUsages),
                remainingUsages: parseInt(maxUsages),
                price: price ? parseFloat(price) : null,
                sessionId: `manual_${Date.now()}_${Math.random()
                    .toString(36)
                    .substring(7)}`,
                isActive: true,
            },
        });

        return NextResponse.json({
            success: true,
            license,
            licenseKey, // Retourner la clé non chiffrée pour l'afficher
        });
    } catch (error) {
        console.error("Error creating license:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création" },
            { status: 500 }
        );
    }
}
