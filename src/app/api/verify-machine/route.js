import { decryptLicenseKey } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Headers CORS pour autoriser l'app Electron
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const licenseKey = searchParams.get("licenseKey");
        const email = searchParams.get("email");
        const machineId = searchParams.get("machineId");

        if (!licenseKey || !email || !machineId) {
            return NextResponse.json(
                { valid: false, error: "Paramètres manquants" },
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

        // Vérifie si le machineId est dans la liste des machineIds autorisés
        if (!matchingLicense.machineIds.includes(machineId)) {
            return NextResponse.json(
                { valid: false, error: "Machine non autorisée" },
                { status: 403 }
            );
        }

        return NextResponse.json({ valid: true });
    } catch (error) {
        console.error("License validation error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la validation" },
            { status: 500, headers: corsHeaders }
        );
    }
}
