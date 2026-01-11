"use client";

import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

function CheckoutForm() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "pro";

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        company: "",
        promoCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [promoValidation, setPromoValidation] = useState({
        isValidating: false,
        isValid: false,
        message: "",
        discountType: null,
        discountValue: 0,
    });
    const [dynamicPricing, setDynamicPricing] = useState(null);
    const [loadingPricing, setLoadingPricing] = useState(true);

    const plans = {
        pro: {
            name: "Version PRO",
            price: 119,
            features: [
                "Timers illimités",
                "Messages illimités",
                "Tous les thèmes",
                "Éditeur de thème",
                "Mises à jour incluses",
                "Licence perpétuelle",
            ],
        },
        enterprise: {
            name: "Entreprise",
            price: 199,
            features: [
                "Toutes les fonctionnalités PRO",
                "Installation sur 3 postes",
                "Gestion simplifiée des salles",
                "Licence unique multi-postes",
                "Support prioritaire",
            ],
        },
    };

    // Récupérer les prix dynamiques depuis l'API
    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const res = await fetch("/api/pricing");
                const data = await res.json();
                setDynamicPricing(data);
            } catch (error) {
                console.error("Error fetching pricing:", error);
            }
            setLoadingPricing(false);
        };

        fetchPricing();
    }, []);

    // Obtenir le prix du plan sélectionné (avec les prix dynamiques ou par défaut)
    const getPlanPrice = () => {
        if (!dynamicPricing) return plans[plan]?.price || 119;

        const planUpper = plan === "enterprise" ? "BUSINESS" : "PRO";
        const planPricing = dynamicPricing.find((p) => p.plan === planUpper);

        if (planPricing) {
            const now = new Date();
            const isPromoExpired =
                planPricing.saleEndDate &&
                now > new Date(planPricing.saleEndDate);

            if (isPromoExpired && planPricing.isOnSale) {
                return planPricing.basePrice;
            }
            return planPricing.currentPrice;
        }

        return plans[plan]?.price || 199;
    };

    const selectedPlan = {
        ...(plans[plan] || plans.pro),
        price: getPlanPrice(),
    };

    const validatePromoCode = async (code) => {
        if (!code) {
            setPromoValidation({
                isValidating: false,
                isValid: false,
                message: "",
                discountType: null,
                discountValue: 0,
            });
            return;
        }

        setPromoValidation((prev) => ({ ...prev, isValidating: true }));

        try {
            const response = await fetch("/api/validate-promo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promoCode: code, plan }),
            });

            const data = await response.json();

            setPromoValidation({
                isValidating: false,
                isValid: data.valid,
                message: data.message || "",
                discountType: data.discountType || null,
                discountValue: data.discountValue || 0,
            });
        } catch (error) {
            setPromoValidation({
                isValidating: false,
                isValid: false,
                message: "Erreur lors de la validation",
                discountType: null,
                discountValue: 0,
            });
        }
    };

    const handlePromoCodeChange = (e) => {
        const code = e.target.value.toUpperCase();
        setFormData({ ...formData, promoCode: code });
    };

    const handlePromoCodeBlur = () => {
        if (formData.promoCode) {
            validatePromoCode(formData.promoCode);
        }
    };

    const calculateFinalPrice = () => {
        if (!promoValidation.isValid) return selectedPlan.price;

        if (promoValidation.discountType === "PERCENTAGE") {
            return (
                selectedPlan.price * (1 - promoValidation.discountValue / 100)
            );
        } else {
            return Math.max(
                selectedPlan.price - promoValidation.discountValue,
                0
            );
        }
    };

    const finalPrice = calculateFinalPrice();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.email || !formData.name) {
            setError("Veuillez remplir tous les champs obligatoires");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan,
                    email: formData.email,
                    name: formData.name,
                    company: formData.company,
                    promoCode: promoValidation.isValid
                        ? formData.promoCode
                        : null,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setError("Une erreur est survenue. Veuillez réessayer.");
                setLoading(false);
            }
        } catch {
            setError("Une erreur est survenue. Veuillez réessayer.");
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/gamemaster-os"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Formulaire */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-white" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Finaliser l&apos;achat
                                    </h1>
                                </div>

                                <p className="text-gray-600 mb-8">
                                    Remplissez vos informations pour procéder au
                                    paiement sécurisé via Stripe.
                                </p>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-gray-900 mb-2"
                                        >
                                            Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="votre@email.com"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Votre clé de licence sera envoyée à
                                            cette adresse
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-semibold text-gray-900 mb-2"
                                        >
                                            Nom complet{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Jean Dupont"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm font-semibold text-gray-900 mb-2"
                                        >
                                            Société (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    company: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Nom de votre Escape Game"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="promoCode"
                                            className="block text-sm font-semibold text-gray-900 mb-2"
                                        >
                                            Code promo (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            id="promoCode"
                                            value={formData.promoCode}
                                            onChange={handlePromoCodeChange}
                                            onBlur={handlePromoCodeBlur}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                                            placeholder="PROMO2025"
                                            disabled={
                                                promoValidation.isValidating
                                            }
                                        />
                                        {promoValidation.isValidating && (
                                            <p className="mt-2 text-sm text-gray-500">
                                                Validation en cours...
                                            </p>
                                        )}
                                        {promoValidation.message && (
                                            <p
                                                className={`mt-2 text-sm ${
                                                    promoValidation.isValid
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {promoValidation.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Chargement...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5" />
                                                Payer {finalPrice.toFixed(2)}€
                                                TTC
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Paiement sécurisé par Stripe. Vos
                                        informations bancaires ne sont jamais
                                        stockées sur nos serveurs.
                                    </p>
                                </form>
                            </div>
                        </motion.div>

                        {/* Récapitulatif */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-400 rounded-3xl p-8 sticky top-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedPlan.name}
                                    </h2>
                                    {dynamicPricing &&
                                        (() => {
                                            const planUpper =
                                                plan === "enterprise"
                                                    ? "BUSINESS"
                                                    : "PRO";
                                            const planPricing =
                                                dynamicPricing.find(
                                                    (p) => p.plan === planUpper
                                                );
                                            const now = new Date();
                                            const isPromoExpired =
                                                planPricing?.saleEndDate &&
                                                now >
                                                    new Date(
                                                        planPricing.saleEndDate
                                                    );

                                            return (
                                                planPricing?.isOnSale &&
                                                !isPromoExpired &&
                                                planPricing.currentPrice <
                                                    planPricing.basePrice && (
                                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                                                        PROMO
                                                    </span>
                                                )
                                            );
                                        })()}
                                </div>

                                <div className="mb-6 pb-6 border-b border-blue-200">
                                    <div className="space-y-3">
                                        {promoValidation.isValid && (
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-gray-600">
                                                    Prix original
                                                </span>
                                                <span className="text-xl font-semibold text-gray-400 line-through">
                                                    {selectedPlan.price}€ TTC
                                                </span>
                                            </div>
                                        )}
                                        {promoValidation.isValid && (
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-green-600 font-semibold">
                                                    Réduction
                                                </span>
                                                <span className="text-xl font-semibold text-green-600">
                                                    -
                                                    {promoValidation.discountType ===
                                                    "PERCENTAGE"
                                                        ? `${promoValidation.discountValue}%`
                                                        : `${promoValidation.discountValue}€`}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-gray-600">
                                                {promoValidation.isValid
                                                    ? "Prix final"
                                                    : "Prix"}
                                            </span>
                                            <div className="text-right">
                                                <span className="text-4xl font-bold text-gray-900">
                                                    {finalPrice.toFixed(2)}€
                                                </span>
                                                <span className="text-lg text-gray-600 ml-2">
                                                    TTC
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Paiement unique • Licence perpétuelle
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">
                                        Fonctionnalités incluses :
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedPlan.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 text-gray-700"
                                                >
                                                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                                    <span className="text-sm">
                                                        {feature}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <div className="bg-blue-100 border border-blue-300 rounded-xl p-4">
                                    <p className="text-sm text-blue-900 flex items-start gap-2">
                                        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>
                                            Après le paiement, vous recevrez
                                            immédiatement votre clé de licence
                                            par email et sur la page de
                                            confirmation.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <CheckoutForm />
        </Suspense>
    );
}
