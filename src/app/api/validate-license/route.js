import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptLicenseKey } from "@/lib/crypto";

// Headers CORS pour autoriser l'app Electron
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
    try {
        const { licenseKey, email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email manquant" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!licenseKey) {
            return NextResponse.json(
                { error: "Clé de licence manquante" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Rechercher et déchiffrer
        const isLicense = await prisma.license.findMany({
            where: {
                isActive: true,
                email,
            },
        });

        if (!isLicense || isLicense.length === 0) {
            return NextResponse.json(
                { error: "Aucune licence trouvée pour cet email" },
                { status: 404, headers: corsHeaders }
            );
        }

        let matchingLicense = null;
        if (isLicense.length > 1) {
            for (const license of isLicense) {
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
        } else {
            const decryptedKey = decryptLicenseKey(isLicense[0].licenseKey);
            if (decryptedKey === licenseKey) {
                matchingLicense = isLicense[0];
            }
        }

        if (!matchingLicense) {
            return NextResponse.json(
                { error: "Clé de licence invalide pour cet email" },
                { status: 404, headers: corsHeaders }
            );
        }

        // Vérifier si la licence a encore des utilisations disponibles
        if (matchingLicense.remainingUsages <= 0) {
            return NextResponse.json(
                {
                    error: "Nombre maximum d'installations atteint",
                    maxUsages: matchingLicense.maxUsages,
                    remainingUsages: matchingLicense.remainingUsages,
                },
                { status: 403, headers: corsHeaders }
            );
        }

        console.log("License :", matchingLicense);

        // Décrémenter le nombre d'utilisations restantes
        const updatedLicense = await prisma.license.update({
            where: { id: matchingLicense.id },
            data: {
                remainingUsages: matchingLicense.remainingUsages - 1,
            },
        });

        return NextResponse.json(
            {
                success: true,
                valid: true,
                plan: updatedLicense.plan,
                remainingUsages: updatedLicense.remainingUsages,
                maxUsages: updatedLicense.maxUsages,
            },
            { headers: corsHeaders }
        );
    } catch (error) {
        console.error("License validation error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la validation" },
            { status: 500, headers: corsHeaders }
        );
    }
}

// Route GET pour vérifier l'état d'une licence sans la consommer
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const licenseKey = searchParams.get("key");
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email manquant" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!licenseKey) {
            return NextResponse.json(
                { error: "Clé de licence manquante" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Rechercher et déchiffrer
        const isLicense = await prisma.license.findMany({
            where: {
                isActive: true,
                email,
            },
        });

        if (!isLicense || isLicense.length === 0) {
            return NextResponse.json(
                { error: "Aucune licence trouvée pour cet email" },
                { status: 404, headers: corsHeaders }
            );
        }

        let matchingLicense = null;
        if (isLicense.length > 1) {
            for (const license of isLicense) {
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
        } else {
            const decryptedKey = decryptLicenseKey(isLicense[0].licenseKey);
            if (decryptedKey === licenseKey) {
                matchingLicense = isLicense[0];
            }
        }

        if (!matchingLicense) {
            return NextResponse.json(
                { error: "Clé de licence invalide pour cet email" },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            {
                valid: true,
                plan: matchingLicense.plan,
                remainingUsages: matchingLicense.remainingUsages,
                maxUsages: matchingLicense.maxUsages,
                isActive: matchingLicense.isActive,
            },
            { headers: corsHeaders }
        );
    } catch (error) {
        console.error("License check error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification" },
            { status: 500, headers: corsHeaders }
        );
    }
}
