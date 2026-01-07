import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptLicenseKey, decryptLicenseKey } from "@/lib/crypto";

export async function POST(request) {
    try {
        const { licenseKey } = await request.json();

        if (!licenseKey) {
            return NextResponse.json(
                { error: "Clé de licence manquante" },
                { status: 400 }
            );
        }

        // Rechercher toutes les licences et déchiffrer pour comparer
        const allLicenses = await prisma.license.findMany({
            where: {
                isActive: true,
            },
        });

        let matchingLicense = null;
        for (const license of allLicenses) {
            try {
                const decryptedKey = decryptLicenseKey(license.licenseKey);
                if (decryptedKey === licenseKey) {
                    matchingLicense = license;
                    break;
                }
            } catch {
                // Ignorer les erreurs de déchiffrement
                continue;
            }
        }

        if (!matchingLicense) {
            return NextResponse.json(
                { error: "Clé de licence invalide" },
                { status: 404 }
            );
        }

        // Vérifier si la licence a encore des utilisations disponibles
        if (matchingLicense.remainingUsages <= 0) {
            return NextResponse.json(
                {
                    error: "Nombre maximum d'installations atteint",
                    maxUsages: matchingLicense.maxUsages,
                },
                { status: 403 }
            );
        }

        // Décrémenter le nombre d'utilisations restantes
        const updatedLicense = await prisma.license.update({
            where: { id: matchingLicense.id },
            data: {
                remainingUsages: matchingLicense.remainingUsages - 1,
            },
        });

        return NextResponse.json({
            success: true,
            valid: true,
            plan: updatedLicense.plan,
            remainingUsages: updatedLicense.remainingUsages,
            maxUsages: updatedLicense.maxUsages,
        });
    } catch (error) {
        console.error("License validation error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la validation" },
            { status: 500 }
        );
    }
}

// Route GET pour vérifier l'état d'une licence sans la consommer
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const licenseKey = searchParams.get("key");

        if (!licenseKey) {
            return NextResponse.json(
                { error: "Clé de licence manquante" },
                { status: 400 }
            );
        }

        // Rechercher et déchiffrer
        const allLicenses = await prisma.license.findMany({
            where: {
                isActive: true,
            },
        });

        let matchingLicense = null;
        for (const license of allLicenses) {
            try {
                const decryptedKey = decryptLicenseKey(license.licenseKey);
                if (decryptedKey === licenseKey) {
                    matchingLicense = license;
                    break;
                }
            } catch {
                continue;
            }
        }

        if (!matchingLicense) {
            return NextResponse.json(
                { valid: false, error: "Clé invalide" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            valid: true,
            plan: matchingLicense.plan,
            remainingUsages: matchingLicense.remainingUsages,
            maxUsages: matchingLicense.maxUsages,
            isActive: matchingLicense.isActive,
        });
    } catch (error) {
        console.error("License check error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification" },
            { status: 500 }
        );
    }
}
