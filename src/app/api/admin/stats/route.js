import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        // Stats générales
        const [total, active, pro, enterprise, free] = await Promise.all([
            prisma.license.count(),
            prisma.license.count({ where: { isActive: true } }),
            prisma.license.count({ where: { plan: "PRO" } }),
            prisma.license.count({ where: { plan: "BUSINESS" } }),
            prisma.license.count({ where: { plan: "FREE" } }),
        ]);

        // Revenus totaux (calculés selon le prix stocké ou prix par défaut)
        const allLicenses = await prisma.license.findMany({
            select: { plan: true, price: true },
        });

        const revenue = allLicenses.reduce((sum, license) => {
            if (license.price !== null) {
                return sum + license.price;
            }
            // Prix par défaut si non renseigné
            if (license.plan === "PRO") return sum + 119;
            if (license.plan === "BUSINESS") return sum + 199;
            return sum;
        }, 0);

        // Licences par jour (7 derniers jours)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentLicenses = await prisma.license.findMany({
            where: {
                createdAt: { gte: sevenDaysAgo },
            },
            select: { createdAt: true, plan: true },
        });

        // Grouper par jour
        const dailyStats = {};
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            dailyStats[dateStr] = { date: dateStr, pro: 0, enterprise: 0 };
        }

        recentLicenses.forEach((license) => {
            const dateStr = license.createdAt.toISOString().split("T")[0];
            if (dailyStats[dateStr]) {
                if (license.plan === "PRO") dailyStats[dateStr].pro++;
                if (license.plan === "BUSINESS")
                    dailyStats[dateStr].enterprise++;
            }
        });

        // Licences expirant bientôt (usages restants = 0)
        const expiring = await prisma.license.count({
            where: {
                remainingUsages: 0,
                isActive: true,
            },
        });

        return NextResponse.json({
            stats: {
                total,
                active,
                pro,
                enterprise,
                free,
                revenue,
                expiring,
            },
            chart: Object.values(dailyStats),
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des stats" },
            { status: 500 }
        );
    }
}
