import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const pricing = await prisma.planPricing.findMany({
            orderBy: { plan: "asc" },
        });

        // Si aucun prix n'existe, retourner les prix par défaut
        if (pricing.length === 0) {
            return NextResponse.json([
                {
                    plan: "PRO",
                    basePrice: 119,
                    currentPrice: 199,
                    isOnSale: false,
                    saleEndDate: null,
                },
                {
                    plan: "BUSINESS",
                    basePrice: 199,
                    currentPrice: 199,
                    isOnSale: false,
                    saleEndDate: null,
                },
            ]);
        }

        // Vérifier et nettoyer les promotions expirées
        const now = new Date();
        for (const plan of pricing) {
            if (plan.saleEndDate && now > plan.saleEndDate && plan.isOnSale) {
                await prisma.planPricing.update({
                    where: { id: plan.id },
                    data: {
                        currentPrice: plan.basePrice,
                        isOnSale: false,
                        saleEndDate: null,
                    },
                });
            }
        }

        // Récupérer les prix mis à jour
        const updatedPricing = await prisma.planPricing.findMany({
            orderBy: { plan: "asc" },
        });

        return NextResponse.json(updatedPricing);
    } catch (error) {
        console.error("Error fetching pricing:", error);
        // Retourner les prix par défaut en cas d'erreur
        return NextResponse.json([
            {
                plan: "PRO",
                basePrice: 119,
                currentPrice: 119,
                isOnSale: false,
                saleEndDate: null,
            },
            {
                plan: "BUSINESS",
                basePrice: 199,
                currentPrice: 199,
                isOnSale: false,
                saleEndDate: null,
            },
        ]);
    }
}
