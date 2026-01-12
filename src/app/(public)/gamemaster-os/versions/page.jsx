"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Download,
    Calendar,
    FileCode,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";

export default function VersionsPage() {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedVersions, setExpandedVersions] = useState({});

    useEffect(() => {
        fetchVersions();
    }, []);

    const fetchVersions = async () => {
        try {
            const res = await fetch("/api/versions");
            if (res.ok) {
                const data = await res.json();
                setVersions(data);
                // Ne pas expand par défaut
            }
        } catch (error) {
            console.error("Erreur chargement versions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (versionId, fileName) => {
        // Incrémenter le compteur de téléchargements
        try {
            await fetch("/api/versions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ versionId }),
            });
        } catch (error) {
            console.error("Erreur incrémentation téléchargements:", error);
        }

        // Télécharger le fichier
        window.location.href = `/downloads/${fileName}`;
    };

    const toggleExpanded = (versionId) => {
        setExpandedVersions((prev) => ({
            ...prev,
            [versionId]: !prev[versionId],
        }));
    };

    const formatFileSize = (bytes) => {
        const mb = Number(bytes) / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 px-6 bg-indigo-50">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            href="/gamemaster-os"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Retour à GameMaster OS
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mt-12"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Historique des versions
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                                Consultez toutes les versions de GameMaster OS
                                et leurs notes de mise à jour
                            </p>
                        </motion.div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
                        <div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        />
                    </div>
                </section>

                {/* Versions List */}
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                <p className="mt-4 text-gray-600">
                                    Chargement des versions...
                                </p>
                            </div>
                        ) : versions.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                                <FileCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-xl text-gray-600">
                                    Aucune version disponible
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {versions.map((version, index) => (
                                    <motion.div
                                        key={version.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-white rounded-2xl border shadow-lg overflow-hidden transition-all ${
                                            version.isLatest
                                                ? "border-green-500"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        {/* Header */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-blue-100 p-3 rounded-xl">
                                                        <FileCode className="w-8 h-8 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h2 className="text-2xl font-bold text-gray-900">
                                                                Version{" "}
                                                                {
                                                                    version.version
                                                                }
                                                            </h2>
                                                            {version.isLatest && (
                                                                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                                                    <CheckCircle className="w-3 h-3" />
                                                                    Dernière
                                                                    version
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                {formatDate(
                                                                    version.releaseDate
                                                                )}
                                                            </span>
                                                            <span>
                                                                {formatFileSize(
                                                                    version.fileSize
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    onClick={() =>
                                                        handleDownload(
                                                            version.id,
                                                            version.fileName
                                                        )
                                                    }
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                                                >
                                                    <Download className="w-5 h-5" />
                                                    Télécharger
                                                </motion.button>
                                            </div>

                                            {/* Toggle Release Notes */}
                                            <button
                                                onClick={() =>
                                                    toggleExpanded(version.id)
                                                }
                                                className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <span className="font-semibold text-gray-900">
                                                    Notes de version
                                                </span>
                                                {expandedVersions[
                                                    version.id
                                                ] ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-600" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Release Notes (Collapsible) */}
                                        {expandedVersions[version.id] && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-6 pb-6"
                                            >
                                                <div className="bg-gray-50 rounded-lg p-6">
                                                    <ReactMarkdown
                                                        components={{
                                                            h1: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <h1
                                                                    className="text-3xl font-bold text-gray-900 mb-4 mt-6"
                                                                    {...props}
                                                                />
                                                            ),
                                                            h2: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <h2
                                                                    className="text-2xl font-bold text-gray-900 mb-3 mt-5"
                                                                    {...props}
                                                                />
                                                            ),
                                                            h3: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <h3
                                                                    className="text-xl font-bold text-gray-900 mb-2 mt-4"
                                                                    {...props}
                                                                />
                                                            ),
                                                            p: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <p
                                                                    className="text-gray-700 mb-3 leading-relaxed"
                                                                    {...props}
                                                                />
                                                            ),
                                                            ul: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <ul
                                                                    className="list-disc list-inside mb-4 space-y-1"
                                                                    {...props}
                                                                />
                                                            ),
                                                            ol: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <ol
                                                                    className="list-decimal list-inside mb-4 space-y-1"
                                                                    {...props}
                                                                />
                                                            ),
                                                            li: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <li
                                                                    className="text-gray-700 ml-4"
                                                                    {...props}
                                                                />
                                                            ),
                                                            a: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <a
                                                                    className="text-blue-600 hover:text-blue-700 underline"
                                                                    {...props}
                                                                />
                                                            ),
                                                            strong: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <strong
                                                                    className="font-bold text-gray-900"
                                                                    {...props}
                                                                />
                                                            ),
                                                            em: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <em
                                                                    className="italic"
                                                                    {...props}
                                                                />
                                                            ),
                                                            code: ({
                                                                node,
                                                                inline,
                                                                ...props
                                                            }) =>
                                                                inline ? (
                                                                    <code
                                                                        className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
                                                                        {...props}
                                                                    />
                                                                ) : (
                                                                    <code
                                                                        className="block bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4"
                                                                        {...props}
                                                                    />
                                                                ),
                                                            blockquote: ({
                                                                node,
                                                                ...props
                                                            }) => (
                                                                <blockquote
                                                                    className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                                                                    {...props}
                                                                />
                                                            ),
                                                        }}
                                                    >
                                                        {version.releaseNotes}
                                                    </ReactMarkdown>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-6 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                Vous n&apos;avez pas encore GameMaster OS ?
                            </h2>
                            <p className="text-xl text-white mb-8">
                                Téléchargez la dernière version et découvrez
                                toutes les fonctionnalités
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="/gamemaster-os"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    En savoir plus
                                </motion.a>
                                <motion.a
                                    href="/gamemaster-os#pricing"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold text-lg transition-colors"
                                >
                                    Voir les offres
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
