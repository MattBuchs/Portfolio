import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Liste paginée avec recherche et filtres
export async function GET(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const plan = searchParams.get("plan") || "";
    const isActive = searchParams.get("isActive");

    const where = {
        AND: [
            search
                ? {
                      OR: [
                          { email: { contains: search, mode: "insensitive" } },
                          {
                              customerName: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                          {
                              company: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                      ],
                  }
                : {},
            plan ? { plan } : {},
            isActive !== null && isActive !== undefined
                ? { isActive: isActive === "true" }
                : {},
        ],
    };

    const [licenses, total] = await Promise.all([
        prisma.license.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.license.count({ where }),
    ]);

    return NextResponse.json({
        licenses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}

// PATCH: Mettre à jour une licence
export async function PATCH(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const { id, action, data } = await request.json();

        if (action === "toggle") {
            const license = await prisma.license.findUnique({
                where: { id },
            });

            const updated = await prisma.license.update({
                where: { id },
                data: { isActive: !license.isActive },
            });

            return NextResponse.json(updated);
        }

        if (action === "reset") {
            const license = await prisma.license.findUnique({
                where: { id },
            });

            const updated = await prisma.license.update({
                where: { id },
                data: { remainingUsages: license.maxUsages },
            });

            return NextResponse.json(updated);
        }

        if (action === "update") {
            const updated = await prisma.license.update({
                where: { id },
                data,
            });

            return NextResponse.json(updated);
        }

        return NextResponse.json({ error: "Action invalide" }, { status: 400 });
    } catch (error) {
        console.error("Error updating license:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour" },
            { status: 500 }
        );
    }
}

// DELETE: Supprimer une licence
export async function DELETE(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        await prisma.license.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting license:", error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression" },
            { status: 500 }
        );
    }
}
