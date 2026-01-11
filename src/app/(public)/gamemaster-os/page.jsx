"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Download,
    Shield,
    Zap,
    Clock,
    Check,
    Crown,
    Timer,
    MessageSquare,
    Music,
    Palette,
    Building2,
    TrendingDown,
} from "lucide-react";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function GameMasterOSPage() {
    const [pricing, setPricing] = useState(null);
    const [loadingPricing, setLoadingPricing] = useState(true);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const res = await fetch("/api/pricing");
                const data = await res.json();
                setPricing(data);
            } catch (error) {
                console.error("Error fetching pricing:", error);
            }
            setLoadingPricing(false);
        };

        fetchPricing();
    }, []);

    const getPlanPrice = (planName) => {
        if (!pricing) return planName === "PRO" ? 119 : 199;
        const plan = pricing.find((p) => p.plan === planName);
        if (!plan) return planName === "PRO" ? 119 : 199;

        const now = new Date();
        const isPromoExpired =
            plan.saleEndDate && now > new Date(plan.saleEndDate);

        if (isPromoExpired && plan.isOnSale) {
            return plan.basePrice;
        }
        return plan.currentPrice;
    };

    const isPlanOnSale = (planName) => {
        if (!pricing) return false;
        const plan = pricing.find((p) => p.plan === planName);
        if (!plan) return false;

        const now = new Date();
        const isPromoExpired =
            plan.saleEndDate && now > new Date(plan.saleEndDate);

        return (
            plan.isOnSale &&
            !isPromoExpired &&
            plan.currentPrice < plan.basePrice
        );
    };

    const getBasePrice = (planName) => {
        if (!pricing) return null;
        const plan = pricing.find((p) => p.plan === planName);
        return plan?.basePrice;
    };
    const features = [
        {
            icon: Timer,
            title: "Contrôle total en temps réel",
            description:
                "Gestion de plusieurs timers, ajout ou retrait de temps à la volée, dépassement géré automatiquement",
        },
        {
            icon: MessageSquare,
            title: "Messages et indices prêts à l'emploi",
            description:
                "Envoi d'indices en un clic, catégories personnalisées, icônes visuelles pour plus d'impact",
        },
        {
            icon: Music,
            title: "Gestion audio intégrée",
            description:
                "Musiques d'ambiance, sons d'indices, alarme de fin personnalisable, import libre de MP3",
        },
        {
            icon: Palette,
            title: "Thèmes professionnels",
            description:
                "Personnalisation avancée, éditeur de thème (PRO), interface cohérente avec votre marque",
        },
        {
            icon: Shield,
            title: "Fiabilité avant tout",
            description:
                "Fonctionnement 100% hors ligne, aucune donnée envoyée sur internet, pas d'abonnement",
        },
        {
            icon: Zap,
            title: "Interface joueur immersive",
            description:
                "Affichage plein écran sur second écran, timer lisible à distance, messages clairs",
        },
    ];

    const freeFeatures = [
        "1 timer",
        "5 messages personnalisés",
        "1 thème",
        "Double écran",
        "Gestion audio",
        "Français / Anglais",
        "Gratuit, sans limite de durée",
    ];

    const proFeatures = [
        "Timers illimités",
        "Messages illimités",
        "Tous les thèmes",
        "Éditeur de thème",
        "Mises à jour incluses",
        "Licence perpétuelle",
    ];

    const enterpriseFeatures = [
        "Toutes les fonctionnalités PRO",
        "Installation sur 3 postes",
        "Gestion simplifiée des salles",
        "Licence unique multi-postes",
        "Support prioritaire",
    ];

    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden scroll-smooth">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 bg-indigo-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.h1
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="inline-block mb-6"
                            >
                                <Image
                                    src="/img/logo_gamemaster-og_black.png"
                                    // sizes="(max-width: 768px) 100vw, 500px"
                                    width={450}
                                    height={200}
                                    alt="GameMaster OS Logo"
                                    className="w-64 md:w-md mx-auto"
                                />
                            </motion.h1>

                            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Le centre de contrôle des Game Masters.
                            </p>

                            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                                Gérez vos timers, vos messages et vos ambiances
                                sonores depuis une seule interface, conçue
                                spécifiquement pour les Games Master.
                                <br />
                                <strong>Stable, local, sans abonnement.</strong>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.a
                                    href="/downloads/GameMasterOS_Setup.exe"
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-blue-500/50 transition-shadow"
                                >
                                    <Download className="w-5 h-5" />
                                    Télécharger la version gratuite
                                </motion.a>

                                <motion.a
                                    href="#pricing"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gray-100 text-gray-800 rounded-full font-semibold text-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                                >
                                    Voir les offres PRO
                                </motion.a>
                            </div>

                            <p className="mt-6 text-sm text-gray-600">
                                Compatible Windows 10/11 • Version 1.0.0
                            </p>
                        </motion.div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
                        <div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        />
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900"
                        >
                            Vous gérez un Escape Game ?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-xl text-gray-700 mb-16 max-w-3xl mx-auto"
                        >
                            GameMaster OS résout les vrais problèmes du terrain
                        </motion.p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20 px-6 bg-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
                        >
                            Offres & Tarifs
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-gray-600 mb-16"
                        >
                            Choisissez la licence adaptée à votre structure
                        </motion.p>

                        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {/* Free Plan */}
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <Download className="w-8 h-8 text-blue-600" />
                                    <h3 className="text-3xl font-bold text-gray-900">
                                        Version Gratuite
                                    </h3>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    Pour tester l&apos;application en conditions
                                    réelles.
                                </p>

                                <div className="mb-8">
                                    <p className="text-5xl font-bold text-gray-900 mb-2">
                                        0€
                                    </p>
                                    <p className="text-gray-600">
                                        Sans limite de durée
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {freeFeatures.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-gray-700"
                                        >
                                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.a
                                    href="/downloads/GameMasterOS_Setup.exe"
                                    download
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="block w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-semibold text-center transition-colors border border-gray-300"
                                >
                                    Télécharger
                                </motion.a>
                            </div>

                            {/* PRO Plan */}
                            <div className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-400 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                                <div className="absolute top-4 right-4 flex gap-2 z-10">
                                    {isPlanOnSale("PRO") && (
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                            <TrendingDown className="w-4 h-4" />
                                            PROMO
                                        </div>
                                    )}
                                    <div className="bg-linear-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                        <Crown className="w-4 h-4" />
                                        Populaire
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-6 relative z-0">
                                    <Crown className="w-8 h-8 text-blue-600" />
                                    <h3 className="text-3xl font-bold text-gray-900">
                                        Version PRO
                                    </h3>
                                </div>

                                <p className="text-gray-700 mb-6">
                                    Pour les Escape Games à une salle ou un
                                    poste maître du jeu.
                                </p>

                                <div className="mb-8">
                                    {isPlanOnSale("PRO") &&
                                        getBasePrice("PRO") && (
                                            <p className="text-2xl font-semibold text-gray-400 line-through mb-1">
                                                {getBasePrice("PRO")}€ TTC
                                            </p>
                                        )}
                                    <p className="text-5xl font-bold text-gray-900 mb-2">
                                        {loadingPricing
                                            ? "..."
                                            : `${getPlanPrice("PRO")}€`}
                                        <span className="text-2xl text-gray-600 ml-2">
                                            TTC
                                        </span>
                                    </p>
                                    <p className="text-gray-700">
                                        Paiement unique • Licence perpétuelle
                                    </p>
                                    {isPlanOnSale("PRO") &&
                                        pricing &&
                                        (() => {
                                            const plan = pricing.find(
                                                (p) => p.plan === "PRO"
                                            );
                                            if (plan?.saleEndDate) {
                                                return (
                                                    <p className="text-sm text-red-600 font-semibold mt-2 flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Offre valable
                                                        jusqu&apos;au{" "}
                                                        {new Date(
                                                            plan.saleEndDate
                                                        ).toLocaleDateString(
                                                            "fr-FR",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })()}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {proFeatures.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-gray-700"
                                        >
                                            <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.a
                                    href="/gamemaster-os/checkout?plan=pro"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="block w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-center shadow-xl hover:shadow-blue-500/50 transition-shadow"
                                >
                                    Acheter la version PRO
                                </motion.a>
                            </div>

                            {/* Enterprise Plan */}
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all relative">
                                {isPlanOnSale("BUSINESS") && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg z-10">
                                        <TrendingDown className="w-4 h-4" />
                                        PROMO
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-6 relative z-0">
                                    <Building2 className="w-8 h-8 text-blue-600" />
                                    <h3 className="text-3xl font-bold text-gray-900">
                                        Entreprise
                                    </h3>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    Pour les structures multi-salles
                                    (jusqu&apos;à 3 postes).
                                </p>

                                <div className="mb-8">
                                    {isPlanOnSale("BUSINESS") &&
                                        getBasePrice("BUSINESS") && (
                                            <p className="text-2xl font-semibold text-gray-400 line-through mb-1">
                                                {getBasePrice("BUSINESS")}€ TTC
                                            </p>
                                        )}
                                    <p className="text-5xl font-bold text-gray-900 mb-2">
                                        {loadingPricing
                                            ? "..."
                                            : `${getPlanPrice("BUSINESS")}€`}
                                        <span className="text-2xl text-gray-600 ml-2">
                                            TTC
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Paiement unique • Multi-postes
                                    </p>
                                    {isPlanOnSale("BUSINESS") &&
                                        pricing &&
                                        (() => {
                                            const plan = pricing.find(
                                                (p) => p.plan === "BUSINESS"
                                            );
                                            if (plan?.saleEndDate) {
                                                return (
                                                    <p className="text-sm text-red-600 font-semibold mt-2 flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Offre valable
                                                        jusqu&apos;au{" "}
                                                        {new Date(
                                                            plan.saleEndDate
                                                        ).toLocaleDateString(
                                                            "fr-FR",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })()}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {enterpriseFeatures.map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-gray-700"
                                            >
                                                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        )
                                    )}
                                </ul>

                                <motion.a
                                    href="/gamemaster-os/checkout?plan=enterprise"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="block w-full py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-full font-semibold text-center transition-colors"
                                >
                                    Acheter la version Entreprise
                                </motion.a>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-gray-600 mt-8"
                        >
                            👉 Besoin de plus de postes ?{" "}
                            <a
                                href="/contact"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Contactez-nous pour une offre sur mesure
                            </a>
                        </motion.p>
                    </div>
                </section>

                {/* Installation Requirements */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
                        >
                            Installation simple et rapide
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-6 border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Configuration requise
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        Windows 10 / 11 (64 bits)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        4 Go de RAM recommandés
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        2 écrans conseillés
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-6 border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Mise en route
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        Installation en 3 clics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        Aucune connexion internet requise
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-blue-600" />
                                        Configuration automatique
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 px-6 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                                Essayez GameMaster OS dès maintenant
                            </h2>
                            <p className="text-xl text-white mb-8">
                                Téléchargez la version gratuite et découvrez un
                                outil pensé pour les exploitants d&apos;Escape
                                Games
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="/downloads/GameMasterOS_Setup.exe"
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    <Download className="w-5 h-5" />
                                    Télécharger la version gratuite
                                </motion.a>
                                <motion.a
                                    href="#pricing"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold text-lg transition-colors"
                                >
                                    Passer à la version PRO
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
