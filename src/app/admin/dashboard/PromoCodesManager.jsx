"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Tag,
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Calendar,
    Percent,
    DollarSign,
    Users,
    Search,
    X,
    AlertCircle,
} from "lucide-react";

export default function PromoCodesManager() {
    const [promoCodes, setPromoCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [search, setSearch] = useState("");
    const [createForm, setCreateForm] = useState({
        code: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        maxUses: "",
        validFrom: new Date().toISOString().split("T")[0],
        validUntil: "",
        applicablePlans: [],
    });
    const [createLoading, setCreateLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPromoCodes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/promo-codes");
            const data = await res.json();
            setPromoCodes(data);
        } catch (error) {
            console.error("Error fetching promo codes:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const handleCreatePromoCode = async (e) => {
        e.preventDefault();
        setError("");
        setCreateLoading(true);

        try {
            const res = await fetch("/api/admin/promo-codes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createForm),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Erreur lors de la création");
                setCreateLoading(false);
                return;
            }

            await fetchPromoCodes();
            setShowCreateModal(false);
            setCreateForm({
                code: "",
                discountType: "PERCENTAGE",
                discountValue: "",
                maxUses: "",
                validFrom: new Date().toISOString().split("T")[0],
                validUntil: "",
                applicablePlans: [],
            });
        } catch (error) {
            setError("Erreur lors de la création du code promo");
        }
        setCreateLoading(false);
    };

    const handleToggleActive = async (id, currentStatus) => {
        try {
            await fetch("/api/admin/promo-codes", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isActive: !currentStatus }),
            });
            await fetchPromoCodes();
        } catch (error) {
            console.error("Error toggling promo code:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce code promo ?")) {
            return;
        }

        try {
            await fetch(`/api/admin/promo-codes?id=${id}`, {
                method: "DELETE",
            });
            await fetchPromoCodes();
        } catch (error) {
            console.error("Error deleting promo code:", error);
        }
    };

    const handlePlanToggle = (plan) => {
        setCreateForm((prev) => ({
            ...prev,
            applicablePlans: prev.applicablePlans.includes(plan)
                ? prev.applicablePlans.filter((p) => p !== plan)
                : [...prev.applicablePlans, plan],
        }));
    };

    const filteredPromoCodes = promoCodes.filter((promo) =>
        promo.code.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return "Jamais";
        return new Date(dateString).toLocaleDateString("fr-FR");
    };

    const isExpired = (validUntil) => {
        if (!validUntil) return false;
        return new Date(validUntil) < new Date();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Tag className="w-6 h-6 text-blue-600" />
                        Codes Promo
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Gérez vos codes promotionnels
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Créer un code promo
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher un code promo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Promo Codes List */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                ) : filteredPromoCodes.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        {search
                            ? "Aucun code promo trouvé"
                            : "Aucun code promo créé"}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Code
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Réduction
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Utilisations
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Plans
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Validité
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Statut
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPromoCodes.map((promo) => {
                                    const expired = isExpired(promo.validUntil);
                                    const maxUsesReached =
                                        promo.maxUses &&
                                        promo.usedCount >= promo.maxUses;

                                    return (
                                        <tr
                                            key={promo.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <code className="px-3 py-1 bg-gray-100 rounded-lg font-mono text-sm font-semibold">
                                                        {promo.code}
                                                    </code>
                                                    {(expired ||
                                                        maxUsesReached) && (
                                                        <span className="text-xs text-red-600 font-semibold">
                                                            {expired
                                                                ? "Expiré"
                                                                : "Max atteint"}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {promo.discountType ===
                                                    "PERCENTAGE" ? (
                                                        <>
                                                            <Percent className="w-4 h-4 text-green-600" />
                                                            <span className="font-semibold text-green-600">
                                                                {
                                                                    promo.discountValue
                                                                }
                                                                %
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <DollarSign className="w-4 h-4 text-green-600" />
                                                            <span className="font-semibold text-green-600">
                                                                {
                                                                    promo.discountValue
                                                                }
                                                                €
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {promo.usedCount} /{" "}
                                                        {promo.maxUses || "∞"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {promo.applicablePlans
                                                        .length === 0 ? (
                                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                            Tous
                                                        </span>
                                                    ) : (
                                                        promo.applicablePlans.map(
                                                            (plan) => (
                                                                <span
                                                                    key={plan}
                                                                    className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                                                                >
                                                                    {plan}
                                                                </span>
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {formatDate(
                                                            promo.validFrom
                                                        )}
                                                        {" - "}
                                                        {formatDate(
                                                            promo.validUntil
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        handleToggleActive(
                                                            promo.id,
                                                            promo.isActive
                                                        )
                                                    }
                                                    className="flex items-center gap-2"
                                                >
                                                    {promo.isActive ? (
                                                        <>
                                                            <ToggleRight className="w-6 h-6 text-green-600" />
                                                            <span className="text-sm font-semibold text-green-600">
                                                                Actif
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                                                            <span className="text-sm font-semibold text-gray-400">
                                                                Inactif
                                                            </span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(promo.id)
                                                    }
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Créer un code promo
                            </h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleCreatePromoCode}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Code promo *
                                </label>
                                <input
                                    type="text"
                                    value={createForm.code}
                                    onChange={(e) =>
                                        setCreateForm({
                                            ...createForm,
                                            code: e.target.value.toUpperCase(),
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono"
                                    placeholder="PROMO2025"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Type de réduction *
                                    </label>
                                    <select
                                        value={createForm.discountType}
                                        onChange={(e) =>
                                            setCreateForm({
                                                ...createForm,
                                                discountType: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="PERCENTAGE">
                                            Pourcentage
                                        </option>
                                        <option value="FIXED_AMOUNT">
                                            Montant fixe
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Valeur *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={createForm.discountValue}
                                        onChange={(e) =>
                                            setCreateForm({
                                                ...createForm,
                                                discountValue: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={
                                            createForm.discountType ===
                                            "PERCENTAGE"
                                                ? "20"
                                                : "10"
                                        }
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {createForm.discountType ===
                                        "PERCENTAGE"
                                            ? "Pourcentage de réduction (0-100)"
                                            : "Montant en euros"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Nombre maximum d&apos;utilisations
                                </label>
                                <input
                                    type="number"
                                    value={createForm.maxUses}
                                    onChange={(e) =>
                                        setCreateForm({
                                            ...createForm,
                                            maxUses: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Laisser vide pour illimité"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Date de début
                                    </label>
                                    <input
                                        type="date"
                                        value={createForm.validFrom}
                                        onChange={(e) =>
                                            setCreateForm({
                                                ...createForm,
                                                validFrom: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Date de fin
                                    </label>
                                    <input
                                        type="date"
                                        value={createForm.validUntil}
                                        onChange={(e) =>
                                            setCreateForm({
                                                ...createForm,
                                                validUntil: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Laisser vide pour pas d&apos;expiration
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Plans applicables
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={createForm.applicablePlans.includes(
                                                "PRO"
                                            )}
                                            onChange={() =>
                                                handlePlanToggle("PRO")
                                            }
                                            className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span className="text-sm">PRO</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={createForm.applicablePlans.includes(
                                                "BUSINESS"
                                            )}
                                            onChange={() =>
                                                handlePlanToggle("BUSINESS")
                                            }
                                            className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span className="text-sm">
                                            BUSINESS
                                        </span>
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Ne sélectionner aucun plan = applicable à
                                    tous
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={createLoading}
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    {createLoading ? "Création..." : "Créer"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
