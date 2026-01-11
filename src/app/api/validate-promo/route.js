import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
    try {
        const { promoCode, plan } = await request.json();

        if (!promoCode) {
            return NextResponse.json(
                { error: "Code promo manquant" },
                { status: 400 }
            );
        }

        const promo = await prisma.promoCode.findUnique({
            where: { code: promoCode },
        });

        if (!promo) {
            return NextResponse.json(
                { valid: false, message: "Code promo invalide" },
                { status: 200 }
            );
        }

        const now = new Date();
        const isExpired = promo.validUntil && now > promo.validUntil;
        const isNotYetValid = now < promo.validFrom;
        const isMaxUsesReached =
            promo.maxUses && promo.usedCount >= promo.maxUses;

        if (!promo.isActive) {
            return NextResponse.json(
                { valid: false, message: "Code promo désactivé" },
                { status: 200 }
            );
        }

        if (isExpired) {
            return NextResponse.json(
                { valid: false, message: "Code promo expiré" },
                { status: 200 }
            );
        }

        if (isNotYetValid) {
            return NextResponse.json(
                { valid: false, message: "Code promo pas encore valide" },
                { status: 200 }
            );
        }

        if (isMaxUsesReached) {
            return NextResponse.json(
                {
                    valid: false,
                    message: "Code promo : limite d'utilisation atteinte",
                },
                { status: 200 }
            );
        }

        // Vérifier si le code s'applique au plan
        const planUpper = plan === "enterprise" ? "BUSINESS" : "PRO";
        const applicableToAll = promo.applicablePlans.length === 0;
        const applicableToPlan = promo.applicablePlans.includes(planUpper);

        if (!applicableToAll && !applicableToPlan) {
            return NextResponse.json(
                {
                    valid: false,
                    message: "Ce code promo ne s'applique pas à ce plan",
                },
                { status: 200 }
            );
        }

        return NextResponse.json({
            valid: true,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            message: `Code promo appliqué : ${
                promo.discountType === "PERCENTAGE"
                    ? `${promo.discountValue}%`
                    : `${promo.discountValue}€`
            } de réduction`,
        });
    } catch (error) {
        console.error("Promo validation error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la validation du code promo" },
            { status: 500 }
        );
    }
}
