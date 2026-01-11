import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { plan, email, name, company, promoCode } = await request.json();

        // Récupérer les prix depuis la base de données
        const planUpper = plan === "enterprise" ? "BUSINESS" : "PRO";
        const planPricing = await prisma.planPricing.findUnique({
            where: { plan: planUpper },
        });

        // Prix par défaut si aucun prix n'est trouvé en BDD
        const defaultPrices = {
            pro: { amount: 9900, name: "GameMaster OS PRO" },
            enterprise: { amount: 17900, name: "GameMaster OS Enterprise" },
        };

        let baseAmount;
        let planName;

        if (planPricing) {
            // Vérifier si la promotion est expirée
            const now = new Date();
            const isPromoExpired =
                planPricing.saleEndDate && now > planPricing.saleEndDate;

            if (isPromoExpired && planPricing.isOnSale) {
                // Réinitialiser le prix si la promotion est expirée
                await prisma.planPricing.update({
                    where: { plan: planUpper },
                    data: {
                        currentPrice: planPricing.basePrice,
                        isOnSale: false,
                        saleEndDate: null,
                    },
                });
                baseAmount = Math.round(planPricing.basePrice * 100);
            } else {
                baseAmount = Math.round(planPricing.currentPrice * 100);
            }
            planName =
                plan === "enterprise"
                    ? "GameMaster OS Enterprise"
                    : "GameMaster OS PRO";
        } else {
            const selectedPlan = defaultPrices[plan] || defaultPrices.pro;
            baseAmount = selectedPlan.amount;
            planName = selectedPlan.name;
        }

        let finalAmount = baseAmount;
        let originalPrice = baseAmount / 100;
        let discountAmount = 0;
        let validPromoCode = null;

        // Vérifier et appliquer le code promo si fourni
        if (promoCode) {
            const promo = await prisma.promoCode.findUnique({
                where: { code: promoCode },
            });

            if (promo) {
                const now = new Date();
                const isValid =
                    promo.isActive &&
                    now >= promo.validFrom &&
                    (!promo.validUntil || now <= promo.validUntil) &&
                    (!promo.maxUses || promo.usedCount < promo.maxUses);

                // Vérifier si le code s'applique au plan sélectionné
                const planUpper = plan === "enterprise" ? "BUSINESS" : "PRO";
                const applicableToAll = promo.applicablePlans.length === 0;
                const applicableToPlan =
                    promo.applicablePlans.includes(planUpper);

                if (isValid && (applicableToAll || applicableToPlan)) {
                    validPromoCode = promoCode;

                    if (promo.discountType === "PERCENTAGE") {
                        discountAmount = Math.round(
                            (baseAmount * promo.discountValue) / 100
                        );
                    } else {
                        // FIXED_AMOUNT (en euros, convertir en centimes)
                        discountAmount = Math.round(promo.discountValue * 100);
                    }

                    finalAmount = Math.max(baseAmount - discountAmount, 0); // Ne jamais descendre en dessous de 0
                }
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: planName,
                            description: `Licence perpétuelle ${planName}${
                                validPromoCode
                                    ? ` (Code promo: ${validPromoCode})`
                                    : ""
                            }`,
                        },
                        unit_amount: finalAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/gamemaster-os/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/gamemaster-os/checkout?plan=${plan}`,
            customer_email: email,
            metadata: {
                plan,
                name,
                company: company || "",
                promoCode: validPromoCode || "",
                originalPrice: originalPrice.toString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création de la session" },
            { status: 500 }
        );
    }
}
