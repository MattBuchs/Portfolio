import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptLicenseKey } from "@/lib/crypto";

// Headers CORS pour autoriser l'app Electron
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function PATCH(request) {
    try {
        const { licenseKey, email, machineId, timestamp } =
            await request.json();

        if (!email || !licenseKey || !machineId || !timestamp) {
            return NextResponse.json(
                { error: "Paramètres manquants" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Vérifier la validité du timestamp
        const now = Date.now();
        const maxAge = 5 * 60 * 1000; // 5 minutes

        if (now - timestamp > maxAge) {
            return NextResponse.json(
                { error: "Requête expirée" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (timestamp > now) {
            return NextResponse.json(
                { error: "Timestamp invalide" },
                { status: 400, headers: corsHeaders }
            );
        }

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

        // Vérification machine autorisée
        const isAuthorized = matchingLicense.machineIds.includes(machineId);

        if (!isAuthorized) {
            return NextResponse.json(
                { error: "Machine non autorisée pour cette licence" },
                { status: 403, headers: corsHeaders }
            );
        }

        if (matchingLicense.remainingUsages >= matchingLicense.maxUsages) {
            return NextResponse.json(
                { error: "Le nombre maximum de transferts a été atteint" },
                { status: 400, headers: corsHeaders }
            );
        }

        const updatedMachineIds = matchingLicense.machineIds.filter(
            (id) => id !== machineId
        );

        // Ajoute 1 d'usage au compteur
        await prisma.license.update({
            where: {
                id: matchingLicense.id,
            },
            data: {
                remainingUsages: matchingLicense.remainingUsages + 1,
                machineIds: updatedMachineIds,
            },
        });

        return NextResponse.json(
            { success: true, message: "Licence transférée avec succès" },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("Erreur lors du transfert de licence :", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500, headers: corsHeaders }
        );
    }
}
