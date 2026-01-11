import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET - Récupérer les prix des plans
export async function GET() {
    try {
        let pricing = await prisma.planPricing.findMany({
            orderBy: { plan: "asc" },
        });

        // Si aucun prix n'existe, initialiser avec les prix par défaut
        if (pricing.length === 0) {
            // Créer les prix par défaut un par un pour éviter les conflits
            const plans = [
                {
                    plan: "PRO",
                    basePrice: 119,
                    currentPrice: 119,
                    isOnSale: false,
                },
                {
                    plan: "BUSINESS",
                    basePrice: 199,
                    currentPrice: 199,
                    isOnSale: false,
                },
            ];

            for (const planData of plans) {
                try {
                    await prisma.planPricing.upsert({
                        where: { plan: planData.plan },
                        update: {},
                        create: planData,
                    });
                } catch (err) {
                    // Ignorer si le plan existe déjà
                    console.log(`Plan ${planData.plan} already exists`);
                }
            }

            pricing = await prisma.planPricing.findMany({
                orderBy: { plan: "asc" },
            });
        }

        return NextResponse.json(pricing);
    } catch (error) {
        console.error("Error fetching pricing:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des prix" },
            { status: 500 }
        );
    }
}

// PATCH - Mettre à jour les prix d'un plan
export async function PATCH(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { plan, currentPrice, isOnSale, saleEndDate } =
            await request.json();

        if (!plan || currentPrice === undefined) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        // Récupérer le prix actuel
        const existingPricing = await prisma.planPricing.findUnique({
            where: { plan },
        });

        if (!existingPricing) {
            return NextResponse.json(
                { error: "Plan non trouvé" },
                { status: 404 }
            );
        }

        const updatedPricing = await prisma.planPricing.update({
            where: { plan },
            data: {
                currentPrice: parseFloat(currentPrice),
                isOnSale:
                    isOnSale !== undefined
                        ? isOnSale
                        : existingPricing.isOnSale,
                saleEndDate: saleEndDate ? new Date(saleEndDate) : null,
            },
        });

        return NextResponse.json(updatedPricing);
    } catch (error) {
        console.error("Error updating pricing:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour des prix" },
            { status: 500 }
        );
    }
}

// POST - Réinitialiser le prix d'un plan au prix de base
export async function POST(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { plan } = await request.json();

        if (!plan) {
            return NextResponse.json(
                { error: "Plan manquant" },
                { status: 400 }
            );
        }

        const pricing = await prisma.planPricing.findUnique({
            where: { plan },
        });

        if (!pricing) {
            return NextResponse.json(
                { error: "Plan non trouvé" },
                { status: 404 }
            );
        }

        const updatedPricing = await prisma.planPricing.update({
            where: { plan },
            data: {
                currentPrice: pricing.basePrice,
                isOnSale: false,
                saleEndDate: null,
            },
        });

        return NextResponse.json(updatedPricing);
    } catch (error) {
        console.error("Error resetting pricing:", error);
        return NextResponse.json(
            { error: "Erreur lors de la réinitialisation du prix" },
            { status: 500 }
        );
    }
}
