"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
    Key,
    Users,
    TrendingUp,
    LogOut,
    Home,
    Mail,
    Building2,
    Search,
    Download,
    RefreshCw,
    ToggleLeft,
    ToggleRight,
    Trash2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    DollarSign,
    BarChart3,
    Plus,
    X,
    Copy,
    CheckCircle,
    Eye,
    Lock,
    Tag,
} from "lucide-react";
import Link from "next/link";
import PromoCodesManager from "./PromoCodesManager";
import PricingManager from "./PricingManager";
import VersionManager from "./VersionManager";

export default function DashboardClient() {
    const [activeTab, setActiveTab] = useState("licenses"); // "licenses", "promoCodes", "pricing", ou "versions"
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterPlan, setFilterPlan] = useState("");
    const [filterActive, setFilterActive] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [actionLoading, setActionLoading] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createForm, setCreateForm] = useState({
        email: "",
        customerName: "",
        company: "",
        plan: "PRO",
        maxUsages: 1,
        price: "",
    });
    const [createdLicense, setCreatedLicense] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [selectedLicenseId, setSelectedLicenseId] = useState(null);
    const [revealedKeys, setRevealedKeys] = useState({});
    const [copySuccess, setCopySuccess] = useState({
        copyModal: false,
        copyArray: false,
    });

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            setStats(data.stats);
            setChartData(data.chart);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchLicenses = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                ...(search && { search }),
                ...(filterPlan && { plan: filterPlan }),
                ...(filterActive && { isActive: filterActive }),
            });

            const res = await fetch(`/api/admin/licenses?${params}`);
            const data = await res.json();
            setLicenses(data.licenses);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error fetching licenses:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchLicenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, filterPlan, filterActive]);

    const handleAction = async (id, action) => {
        setActionLoading(id);
        try {
            await fetch("/api/admin/licenses", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action }),
            });
            fetchLicenses();
            fetchStats();
        } catch (error) {
            console.error("Error:", error);
        }
        setActionLoading(null);
    };

    const handleDelete = async (id) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette licence ?"))
            return;

        setActionLoading(id);
        try {
            await fetch(`/api/admin/licenses?id=${id}`, { method: "DELETE" });
            fetchLicenses();
            fetchStats();
        } catch (error) {
            console.error("Error:", error);
        }
        setActionLoading(null);
    };

    const handleExport = async () => {
        try {
            const res = await fetch("/api/admin/export");
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `licenses_${
                new Date().toISOString().split("T")[0]
            }.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error exporting:", error);
        }
    };

    const copyToClipboard = (text, copy) => {
        navigator.clipboard.writeText(text);

        setCopySuccess((prev) => ({ ...prev, [copy]: true }));

        setTimeout(() => {
            setCopySuccess((prev) => ({ ...prev, [copy]: false }));
        }, 2000);
    };

    const handleCreateLicense = async (e) => {
        e.preventDefault();
        setCreateLoading(true);

        try {
            const res = await fetch("/api/admin/create-license", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createForm),
            });

            const data = await res.json();

            if (data.success) {
                setCreatedLicense(data.licenseKey);
                setCreateForm({
                    email: "",
                    customerName: "",
                    company: "",
                    plan: "PRO",
                    maxUsages: 1,
                    price: "",
                });
                fetchLicenses();
                fetchStats();
            }
        } catch (error) {
            console.error("Error creating license:", error);
        }

        setCreateLoading(false);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        setCreatedLicense(null);
        setCreateForm({
            email: "",
            customerName: "",
            company: "",
            plan: "PRO",
            maxUsages: 1,
            price: "",
        });
    };

    const handleViewKey = (licenseId) => {
        setSelectedLicenseId(licenseId);
        setPasswordInput("");
        setPasswordError("");
        setShowPasswordModal(true);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");

        try {
            const res = await fetch("/api/admin/decrypt-license", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    licenseId: selectedLicenseId,
                    password: passwordInput,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setRevealedKeys({
                    ...revealedKeys,
                    [selectedLicenseId]: data.licenseKey,
                });
                setShowPasswordModal(false);
                setPasswordInput("");
            } else {
                setPasswordError(data.error || "Mot de passe incorrect");
            }
        } catch (error) {
            setPasswordError("Erreur lors de la vérification");
        }
    };

    if (!stats) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
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
                                Gestion des licences GameMaster OS
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Créer une licence
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <Link
                            href="/"
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Site
                        </Link>
                        <button
                            onClick={() =>
                                signOut({ callbackUrl: "/admin/login" })
                            }
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="mb-8 border-b border-gray-200">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("licenses")}
                            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                                activeTab === "licenses"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Key className="w-5 h-5" />
                            Licences
                        </button>
                        <button
                            onClick={() => setActiveTab("pricing")}
                            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                                activeTab === "pricing"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <DollarSign className="w-5 h-5" />
                            Prix
                        </button>
                        <button
                            onClick={() => setActiveTab("promoCodes")}
                            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                                activeTab === "promoCodes"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Tag className="w-5 h-5" />
                            Codes Promo
                        </button>
                        <button
                            onClick={() => setActiveTab("versions")}
                            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                                activeTab === "versions"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Download className="w-5 h-5" />
                            Versions
                        </button>
                    </div>
                </div>

                {activeTab === "licenses" && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-600">
                                        Total Licences
                                    </p>
                                    <Key className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-600">
                                        Actives
                                    </p>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.active}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-600">PRO</p>
                                    <Users className="w-5 h-5 text-blue-500" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.pro}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-600">
                                        Entreprise
                                    </p>
                                    <Building2 className="w-5 h-5 text-purple-500" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.enterprise}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-green-700 font-medium">
                                        Revenus
                                    </p>
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-green-900">
                                    {stats.revenue}€
                                </p>
                            </motion.div>
                        </div>

                        {/* Filters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher (email, nom, société)..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <select
                                    value={filterPlan}
                                    onChange={(e) => {
                                        setFilterPlan(e.target.value);
                                        setPage(1);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tous les plans</option>
                                    <option value="FREE">FREE</option>
                                    <option value="PRO">PRO</option>
                                    <option value="BUSINESS">BUSINESS</option>
                                </select>

                                <select
                                    value={filterActive}
                                    onChange={(e) => {
                                        setFilterActive(e.target.value);
                                        setPage(1);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tous les statuts</option>
                                    <option value="true">
                                        Actives uniquement
                                    </option>
                                    <option value="false">
                                        Inactives uniquement
                                    </option>
                                </select>
                            </div>
                        </motion.div>

                        {/* Licenses Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Licences
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {pagination.total} licence
                                        {pagination.total > 1 ? "s" : ""} au
                                        total
                                    </p>
                                </div>
                                {stats.expiring > 0 && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {stats.expiring} licence
                                            {stats.expiring > 1 ? "s" : ""} sans
                                            utilisations
                                        </span>
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : licenses.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Aucune licence trouvée
                                </div>
                            ) : (
                                <>
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
                                                        Plan
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Utilisations
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Statut
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {licenses.map((license) => (
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
                                                                        {
                                                                            license.company
                                                                        }
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
                                                            <span
                                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                                    license.plan ===
                                                                    "PRO"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : license.plan ===
                                                                          "BUSINESS"
                                                                        ? "bg-purple-100 text-purple-700"
                                                                        : "bg-gray-100 text-gray-700"
                                                                }`}
                                                            >
                                                                {license.plan}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-sm">
                                                                    <span
                                                                        className={`font-medium ${
                                                                            license.remainingUsages ===
                                                                            0
                                                                                ? "text-red-600"
                                                                                : "text-gray-900"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            license.remainingUsages
                                                                        }
                                                                    </span>
                                                                    <span className="text-gray-600">
                                                                        {" "}
                                                                        /{" "}
                                                                        {
                                                                            license.maxUsages
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        handleAction(
                                                                            license.id,
                                                                            "reset"
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading ===
                                                                        license.id
                                                                    }
                                                                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                                                    title="Réinitialiser"
                                                                >
                                                                    <RefreshCw className="w-4 h-4 text-gray-500" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() =>
                                                                    handleAction(
                                                                        license.id,
                                                                        "toggle"
                                                                    )
                                                                }
                                                                disabled={
                                                                    actionLoading ===
                                                                    license.id
                                                                }
                                                                className="flex items-center gap-2 cursor-pointer"
                                                            >
                                                                {license.isActive ? (
                                                                    <>
                                                                        <ToggleRight className="w-5 h-5 text-green-500" />
                                                                        <span className="text-sm text-green-600">
                                                                            Active
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                                                                        <span className="text-sm text-gray-500">
                                                                            Inactive
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            {new Date(
                                                                license.createdAt
                                                            ).toLocaleDateString(
                                                                "fr-FR"
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handleViewKey(
                                                                            license.id
                                                                        )
                                                                    }
                                                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                                    title="Voir la clé"
                                                                >
                                                                    {revealedKeys[
                                                                        license
                                                                            .id
                                                                    ] ? (
                                                                        <div className="flex items-center gap-2">
                                                                            <code className="text-xs font-mono text-gray-900">
                                                                                {
                                                                                    revealedKeys[
                                                                                        license
                                                                                            .id
                                                                                    ]
                                                                                }
                                                                            </code>
                                                                            <button
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    e.stopPropagation();
                                                                                    copyToClipboard(
                                                                                        revealedKeys[
                                                                                            license
                                                                                                .id
                                                                                        ],
                                                                                        "copyArray"
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {copySuccess.copyArray ? (
                                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                                ) : (
                                                                                    <Copy className="w-4 h-4 text-blue-600 cursor-pointer" />
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <Eye className="w-4 h-4 text-gray-600" />
                                                                    )}
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            license.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading ===
                                                                        license.id
                                                                    }
                                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                                    title="Supprimer"
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {pagination.totalPages > 1 && (
                                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                            <p className="text-sm text-gray-600">
                                                Page {pagination.page} sur{" "}
                                                {pagination.totalPages}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        setPage((p) =>
                                                            Math.max(1, p - 1)
                                                        )
                                                    }
                                                    disabled={
                                                        pagination.page === 1
                                                    }
                                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setPage((p) =>
                                                            Math.min(
                                                                pagination.totalPages,
                                                                p + 1
                                                            )
                                                        )
                                                    }
                                                    disabled={
                                                        pagination.page ===
                                                        pagination.totalPages
                                                    }
                                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>

                        {/* Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Ventes des 7 derniers jours
                                </h2>
                            </div>
                            <div className="flex items-end justify-between gap-2 h-48">
                                {chartData.map((day, index) => {
                                    const total = day.pro + day.enterprise;
                                    const maxHeight = Math.max(
                                        ...chartData.map(
                                            (d) => d.pro + d.enterprise
                                        )
                                    );
                                    const heightPro =
                                        maxHeight > 0
                                            ? (day.pro / maxHeight) * 100
                                            : 0;
                                    const heightEnterprise =
                                        maxHeight > 0
                                            ? (day.enterprise / maxHeight) * 100
                                            : 0;

                                    return (
                                        <div
                                            key={index}
                                            className="flex-1 flex flex-col items-center gap-2"
                                        >
                                            <div className="text-xs font-medium text-gray-900">
                                                {total}
                                            </div>
                                            <div className="w-full flex flex-col gap-1 items-center">
                                                {day.enterprise > 0 && (
                                                    <div
                                                        className="w-full bg-purple-500 rounded-t"
                                                        style={{
                                                            height: `${heightEnterprise}%`,
                                                            minHeight: "4px",
                                                        }}
                                                    />
                                                )}
                                                {day.pro > 0 && (
                                                    <div
                                                        className="w-full bg-blue-500 rounded-b"
                                                        style={{
                                                            height: `${heightPro}%`,
                                                            minHeight: "4px",
                                                        }}
                                                    />
                                                )}
                                                {total === 0 && (
                                                    <div className="w-full h-1 bg-gray-200 rounded" />
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {new Date(
                                                    day.date
                                                ).toLocaleDateString("fr-FR", {
                                                    weekday: "short",
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded" />
                                    <span className="text-sm text-gray-600">
                                        PRO
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded" />
                                    <span className="text-sm text-gray-600">
                                        Entreprise
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}

                {activeTab === "pricing" && <PricingManager />}

                {activeTab === "promoCodes" && <PromoCodesManager />}

                {activeTab === "versions" && <VersionManager />}
            </main>

            {/* Modal Créer une licence */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {createdLicense ? (
                            // Affichage de la clé créée
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Licence créée avec succès !
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeCreateModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                                    <p className="text-sm text-blue-900 mb-3 font-medium">
                                        Clé de licence générée :
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <code className="flex-1 px-4 py-3 bg-white border border-blue-300 rounded-lg text-lg font-mono text-gray-900 select-all">
                                            {createdLicense}
                                        </code>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    createdLicense,
                                                    "copyModal"
                                                )
                                            }
                                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                            title="Copier"
                                        >
                                            {copySuccess.copyModal ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={closeCreateModal}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            // Formulaire de création
                            <form
                                onSubmit={handleCreateLicense}
                                className="p-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Créer une nouvelle licence
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={closeCreateModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={createForm.email}
                                            onChange={(e) =>
                                                setCreateForm({
                                                    ...createForm,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="client@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Nom du client{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={createForm.customerName}
                                            onChange={(e) =>
                                                setCreateForm({
                                                    ...createForm,
                                                    customerName:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Société (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            value={createForm.company}
                                            onChange={(e) =>
                                                setCreateForm({
                                                    ...createForm,
                                                    company: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Plan{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                value={createForm.plan}
                                                onChange={(e) => {
                                                    const newPlan =
                                                        e.target.value;
                                                    setCreateForm({
                                                        ...createForm,
                                                        plan: newPlan,
                                                        maxUsages:
                                                            newPlan === "PRO"
                                                                ? 1
                                                                : newPlan ===
                                                                  "BUSINESS"
                                                                ? 3
                                                                : 1,
                                                    });
                                                }}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            >
                                                <option value="PRO">PRO</option>
                                                <option value="BUSINESS">
                                                    BUSINESS
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Utilisations max{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="999"
                                                required
                                                value={createForm.maxUsages}
                                                onChange={(e) =>
                                                    setCreateForm({
                                                        ...createForm,
                                                        maxUsages: parseInt(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                                disabled={
                                                    createForm.plan === "PRO"
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="1"
                                            />
                                        </div>
                                    </div>

                                    {createForm.plan === "BUSINESS" && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Prix (€){" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                required
                                                value={createForm.price}
                                                onChange={(e) =>
                                                    setCreateForm({
                                                        ...createForm,
                                                        price: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="179.00"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Prix utilisé pour le calcul des
                                                revenus
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <p className="text-sm text-blue-900">
                                            💡 La clé sera générée
                                            automatiquement et chiffrée dans la
                                            base de données.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={closeCreateModal}
                                        className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createLoading}
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {createLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Création...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />
                                                Créer la licence
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Modal Mot de passe pour voir la clé */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
                    >
                        <form onSubmit={handlePasswordSubmit} className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Lock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Mot de passe requis
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordInput("");
                                        setPasswordError("");
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Entrez votre mot de passe administrateur pour
                                déchiffrer et afficher cette clé de licence.
                            </p>

                            {passwordError && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-600">
                                        {passwordError}
                                    </p>
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={passwordInput}
                                    onChange={(e) =>
                                        setPasswordInput(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordInput("");
                                        setPasswordError("");
                                    }}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
