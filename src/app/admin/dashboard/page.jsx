import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { decryptLicenseKey } from "@/lib/crypto";
import Link from "next/link";
import {
    Key,
    Users,
    TrendingUp,
    LogOut,
    Home,
    Mail,
    Building2,
} from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    // Récupérer les statistiques
    const licenses = await prisma.license.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    const stats = {
        total: await prisma.license.count(),
        active: await prisma.license.count({ where: { isActive: true } }),
        pro: await prisma.license.count({ where: { plan: "PRO" } }),
        enterprise: await prisma.license.count({
            where: { plan: "BUSINESS" },
        }),
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Key className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Administration
                            </h1>
                            <p className="text-sm text-gray-600">
                                Gestion des licences EscapeTime
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Site
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/admin/login" });
                            }}
                        >
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Déconnexion
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                                Total Licences
                            </p>
                            <Key className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {stats.total}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Actives</p>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {stats.active}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">PRO</p>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {stats.pro}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Entreprise</p>
                            <Building2 className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {stats.enterprise}
                        </p>
                    </div>
                </div>

                {/* Licences récentes */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">
                            Licences récentes
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Clé de licence
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Utilisations
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {licenses.map((license) => {
                                    const decryptedKey = decryptLicenseKey(
                                        license.licenseKey
                                    );

                                    return (
                                        <tr
                                            key={license.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {license.customerName ||
                                                            "-"}
                                                    </p>
                                                    {license.company && (
                                                        <p className="text-sm text-gray-600">
                                                            {license.company}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    {license.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-800">
                                                    {decryptedKey}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        license.plan === "PRO"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-purple-100 text-purple-700"
                                                    }`}
                                                >
                                                    {license.plan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <span className="text-gray-900 font-medium">
                                                        {
                                                            license.remainingUsages
                                                        }
                                                    </span>
                                                    <span className="text-gray-600">
                                                        {" "}
                                                        / {license.maxUsages}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(
                                                    license.createdAt
                                                ).toLocaleDateString("fr-FR")}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
