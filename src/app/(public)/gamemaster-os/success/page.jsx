"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const [licenseKey, setLicenseKey] = useState("");
    const [email, setEmail] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return;
        }

        fetch(`/api/verify-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setLicenseKey(data.licenseKey);
                    setEmail(data.email);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [searchParams]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(licenseKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">
                            Vérification du paiement...
                        </p>
                    </div>
                </main>
            </>
        );
    }

    if (!licenseKey) {
        return (
            <>
                <NavBar />
                <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-6">
                    <div className="max-w-md text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">❌</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Paiement non trouvé
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Nous n&apos;avons pas pu vérifier votre paiement. Si
                            vous pensez qu&apos;il s&apos;agit d&apos;une
                            erreur, contactez-nous.
                        </p>
                        <Link
                            href="/gamemaster-os"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Check className="w-12 h-12 text-green-600" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Paiement réussi ! 🎉
                        </h1>
                        <p className="text-xl text-gray-600">
                            Merci pour votre achat. Votre licence GameMaster OS
                            est prête !
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-400 rounded-3xl p-8 mb-8 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Mail className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Votre clé de licence
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl p-6 mb-4 border border-blue-200">
                            <p className="text-3xl md:text-4xl font-mono font-bold text-center text-blue-700 tracking-wider break-all">
                                {licenseKey}
                            </p>
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="w-full py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Copié !
                                </>
                            ) : (
                                <>
                                    <Copy className="w-5 h-5" />
                                    Copier la clé
                                </>
                            )}
                        </button>

                        <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-xl">
                            <p className="text-sm text-blue-900 flex items-start gap-2">
                                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>
                                    Une copie de cette clé a également été
                                    envoyée à <strong>{email}</strong>
                                </span>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg mb-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Comment activer votre licence ?
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Ouvrez GameMaster OS
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Lancez l&apos;application sur votre
                                        ordinateur
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Accédez aux paramètres
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Cliquez sur l&apos;icône des paramètres,
                                        puis sur &quot;Licence&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Entrez votre clé
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Collez votre clé de licence et cliquez
                                        sur &quot;Activer&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Vous n&apos;avez pas encore installé GameMaster OS ?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Téléchargez l&apos;application maintenant pour
                            commencer à utiliser toutes les fonctionnalités PRO.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href="/downloads/GameMasterOS_Setup.exe"
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-500/50 transition-shadow"
                            >
                                <Download className="w-5 h-5" />
                                Télécharger GameMaster OS
                            </motion.a>

                            <Link
                                href="/gamemaster-os"
                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors text-center"
                            >
                                Retour à la page principale
                            </Link>
                        </div>
                    </motion.div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            Une question ? Besoin d&apos;aide ?{" "}
                            <Link
                                href="/contact"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Contactez-nous
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
