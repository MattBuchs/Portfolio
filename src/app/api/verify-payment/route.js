import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    generateLicenseKey,
    encryptLicenseKey,
    decryptLicenseKey,
} from "@/lib/crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Nombre d'utilisations par plan
const PLAN_USAGES = {
    pro: 1, // 1 installation
    enterprise: 3, // 3 installations
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID manquant" },
                { status: 400 }
            );
        }

        // Vérifier si une licence existe déjà dans la base de données
        let existingLicense = await prisma.license.findUnique({
            where: { sessionId },
        });

        if (existingLicense) {
            // Déchiffrer la clé de licence
            const decryptedKey = decryptLicenseKey(existingLicense.licenseKey);

            return NextResponse.json({
                success: true,
                licenseKey: decryptedKey,
                email: existingLicense.email,
            });
        }

        // Vérifier le paiement auprès de Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return NextResponse.json(
                { error: "Paiement non confirmé" },
                { status: 400 }
            );
        }

        // Générer une nouvelle clé de licence
        const licenseKey = generateLicenseKey();
        const encryptedKey = encryptLicenseKey(licenseKey);

        const plan = session.metadata.plan || "pro";
        const maxUsages = PLAN_USAGES[plan] || 1;

        // Déterminer le prix en fonction du plan
        const price = plan === "pro" ? 99 : plan === "business" ? 179 : null;

        // Créer la licence dans la base de données
        const license = await prisma.license.create({
            data: {
                sessionId,
                email: session.customer_email,
                licenseKey: encryptedKey,
                plan,
                maxUsages,
                remainingUsages: maxUsages,
                customerName: session.metadata.name || null,
                company: session.metadata.company || null,
                price: price,
            },
        });

        return NextResponse.json({
            success: true,
            licenseKey: licenseKey, // Retourner la clé déchiffrée
            email: license.email,
        });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification" },
            { status: 500 }
        );
    }
}
