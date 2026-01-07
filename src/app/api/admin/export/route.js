import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptLicenseKey } from "@/lib/crypto";

export async function GET(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const licenses = await prisma.license.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Créer le CSV
        const headers = [
            "ID",
            "Email",
            "Nom",
            "Société",
            "Clé de licence",
            "Plan",
            "Utilisations max",
            "Utilisations restantes",
            "Active",
            "Date de création",
        ];

        const rows = licenses.map((license) => {
            const decryptedKey = decryptLicenseKey(license.licenseKey);
            return [
                license.id,
                license.email,
                license.customerName || "",
                license.company || "",
                decryptedKey,
                license.plan,
                license.maxUsages,
                license.remainingUsages,
                license.isActive ? "Oui" : "Non",
                new Date(license.createdAt).toLocaleDateString("fr-FR"),
            ];
        });

        const csv = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="licenses_${
                    new Date().toISOString().split("T")[0]
                }.csv"`,
            },
        });
    } catch (error) {
        console.error("Error exporting licenses:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'export" },
            { status: 500 }
        );
    }
}
