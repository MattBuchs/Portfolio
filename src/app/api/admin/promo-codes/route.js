import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET - Récupérer tous les codes promo
export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const promoCodes = await prisma.promoCode.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(promoCodes);
    } catch (error) {
        console.error("Error fetching promo codes:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des codes promo" },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau code promo
export async function POST(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const {
            code,
            discountType,
            discountValue,
            maxUses,
            validFrom,
            validUntil,
            applicablePlans,
        } = await request.json();

        // Validation
        if (!code || !discountType || !discountValue) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        if (
            discountType === "PERCENTAGE" &&
            (discountValue < 0 || discountValue > 100)
        ) {
            return NextResponse.json(
                { error: "Le pourcentage doit être entre 0 et 100" },
                { status: 400 }
            );
        }

        if (discountType === "FIXED_AMOUNT" && discountValue < 0) {
            return NextResponse.json(
                { error: "Le montant doit être positif" },
                { status: 400 }
            );
        }

        // Vérifier si le code existe déjà
        const existingCode = await prisma.promoCode.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (existingCode) {
            return NextResponse.json(
                { error: "Ce code promo existe déjà" },
                { status: 400 }
            );
        }

        const promoCode = await prisma.promoCode.create({
            data: {
                code: code.toUpperCase(),
                discountType,
                discountValue: parseFloat(discountValue),
                maxUses: maxUses ? parseInt(maxUses) : null,
                validFrom: validFrom ? new Date(validFrom) : new Date(),
                validUntil: validUntil ? new Date(validUntil) : null,
                applicablePlans: applicablePlans || [],
            },
        });

        return NextResponse.json(promoCode);
    } catch (error) {
        console.error("Error creating promo code:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création du code promo" },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un code promo
export async function DELETE(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        await prisma.promoCode.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting promo code:", error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression du code promo" },
            { status: 500 }
        );
    }
}

// PATCH - Mettre à jour un code promo (activer/désactiver)
export async function PATCH(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { id, isActive } = await request.json();

        if (!id || isActive === undefined) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        const promoCode = await prisma.promoCode.update({
            where: { id },
            data: { isActive },
        });

        return NextResponse.json(promoCode);
    } catch (error) {
        console.error("Error updating promo code:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du code promo" },
            { status: 500 }
        );
    }
}
