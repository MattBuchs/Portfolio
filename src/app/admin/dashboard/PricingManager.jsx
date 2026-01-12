"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    DollarSign,
    Tag,
    Calendar,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    TrendingDown,
} from "lucide-react";

export default function PricingManager() {
    const [pricing, setPricing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPlan, setEditingPlan] = useState(null);
    const [editForm, setEditForm] = useState({
        currentPrice: "",
        isOnSale: false,
        saleEndDate: "",
    });
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const fetchPricing = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/pricing");
            const data = await res.json();
            setPricing(data);
        } catch (error) {
            console.error("Error fetching pricing:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPricing();
    }, []);

    const handleEdit = (plan) => {
        setEditingPlan(plan.plan);
        setEditForm({
            currentPrice: plan.currentPrice.toString(),
            isOnSale: plan.isOnSale,
            saleEndDate: plan.saleEndDate
                ? new Date(plan.saleEndDate).toISOString().split("T")[0]
                : "",
        });
        setMessage({ type: "", text: "" });
    };

    const handleSave = async (plan) => {
        setSaveLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/admin/pricing", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plan: plan,
                    currentPrice: parseFloat(editForm.currentPrice),
                    isOnSale: editForm.isOnSale,
                    saleEndDate: editForm.saleEndDate || null,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                await fetchPricing();
                setEditingPlan(null);
                setMessage({
                    type: "success",
                    text: "Prix mis à jour avec succès !",
                });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            } else {
                setMessage({
                    type: "error",
                    text: data.error || "Erreur lors de la mise à jour",
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Erreur lors de la mise à jour",
            });
        }
        setSaveLoading(false);
    };

    const handleReset = async (plan) => {
        if (
            !confirm(
                "Êtes-vous sûr de vouloir réinitialiser ce prix au prix de base ?"
            )
        ) {
            return;
        }

        try {
            const res = await fetch("/api/admin/pricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });

            if (res.ok) {
                await fetchPricing();
                setMessage({
                    type: "success",
                    text: "Prix réinitialisé avec succès !",
                });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            }
        } catch (error) {
            console.error("Error resetting pricing:", error);
        }
    };

    const calculateDiscount = (basePrice, currentPrice) => {
        if (basePrice === currentPrice) return 0;
        return Math.round(((basePrice - currentPrice) / basePrice) * 100);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                        Gestion des Prix
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Définissez les prix et promotions pour vos plans
                    </p>
                </div>
            </div>

            {/* Message */}
            {message.text && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                        message.type === "success"
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                    }`}
                >
                    {message.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <p
                        className={`text-sm ${
                            message.type === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {message.text}
                    </p>
                </motion.div>
            )}

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 p-8 text-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                ) : (
                    pricing.map((plan) => {
                        const isEditing = editingPlan === plan.plan;
                        const discount = calculateDiscount(
                            plan.basePrice,
                            plan.currentPrice
                        );
                        const isExpired =
                            plan.saleEndDate &&
                            new Date(plan.saleEndDate) < new Date();

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
                            >
                                {/* Plan Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Plan {plan.plan}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Prix de base: {plan.basePrice}€
                                        </p>
                                    </div>
                                    {plan.isOnSale && !isExpired && (
                                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold flex items-center gap-1">
                                            <TrendingDown className="w-3 h-3" />
                                            PROMO
                                        </span>
                                    )}
                                </div>

                                {isEditing ? (
                                    /* Edit Mode */
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Prix actuel (€)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editForm.currentPrice}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        currentPrice:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={editForm.isOnSale}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            isOnSale:
                                                                e.target
                                                                    .checked,
                                                        })
                                                    }
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <span className="text-sm font-semibold text-gray-900">
                                                    Marquer comme promotion
                                                </span>
                                            </label>
                                        </div>

                                        {editForm.isOnSale && (
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Date de fin de promotion
                                                </label>
                                                <input
                                                    type="date"
                                                    value={editForm.saleEndDate}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            saleEndDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Laisser vide pour pas de
                                                    date de fin
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={() =>
                                                    setEditingPlan(null)
                                                }
                                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleSave(plan.plan)
                                                }
                                                disabled={saveLoading}
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                                            >
                                                {saveLoading
                                                    ? "Enregistrement..."
                                                    : "Enregistrer"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Display Mode */
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-xl">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Prix actuel
                                                </span>
                                                <div className="text-right">
                                                    <span className="text-3xl font-bold text-blue-600">
                                                        {plan.currentPrice}€
                                                    </span>
                                                    {discount > 0 && (
                                                        <div className="text-sm text-green-600 font-semibold mt-1">
                                                            -{discount}% de
                                                            réduction
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {plan.saleEndDate && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {isExpired
                                                        ? "Promotion expirée le"
                                                        : "Promotion jusqu'au"}{" "}
                                                    {new Date(
                                                        plan.saleEndDate
                                                    ).toLocaleDateString(
                                                        "fr-FR"
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={() => handleEdit(plan)}
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <Tag className="w-4 h-4" />
                                                Modifier
                                            </button>
                                            {plan.currentPrice !==
                                                plan.basePrice && (
                                                <button
                                                    onClick={() =>
                                                        handleReset(plan.plan)
                                                    }
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Réinitialiser
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">
                            💡 Comment ça marche ?
                        </p>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>
                                Modifiez le prix actuel pour appliquer une
                                réduction
                            </li>
                            <li>
                                Les clients verront automatiquement le nouveau
                                prix sur le site
                            </li>
                            <li>
                                Activez "Promotion" pour afficher un badge PROMO
                            </li>
                            <li>
                                Définissez une date de fin pour une promotion
                                temporaire
                            </li>
                            <li>
                                Les codes promo s'appliquent en plus des
                                réductions de prix
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
