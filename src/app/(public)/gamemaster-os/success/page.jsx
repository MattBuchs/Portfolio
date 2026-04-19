"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import {
	AlertTriangle,
	ArrowLeft,
	Check,
	Clock,
	Copy,
	Download,
	Mail,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
	const searchParams = useSearchParams();
	const [licenseKey, setLicenseKey] = useState("");
	const [email, setEmail] = useState("");
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(true);
	const [errorType, setErrorType] = useState(null); // 'expired', 'limitReached', 'notFound'
	const [errorMessage, setErrorMessage] = useState("");
	const [viewsRemaining, setViewsRemaining] = useState(null);
	const [latestVersion, setLatestVersion] = useState(null);

	// Fonction pour tracker le téléchargement
	const handleDownload = async () => {
		if (latestVersion?.id) {
			try {
				await fetch("/api/versions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ versionId: latestVersion.id }),
				});
			} catch (error) {
				console.error("Erreur tracking téléchargement:", error);
			}
		}
	};

	useEffect(() => {
		// Fetch latest version for download link
		const fetchLatestVersion = async () => {
			try {
				const res = await fetch("/api/versions?latest=true");
				if (res.ok) {
					const data = await res.json();
					setLatestVersion(data);
				}
			} catch (error) {
				console.error("Erreur récupération version:", error);
			}
		};
		fetchLatestVersion();

		const sessionId = searchParams.get("session_id");

		if (!sessionId) {
			setErrorType("notFound");
			setLoading(false);
			return;
		}

		const verifyPayment = async () => {
			try {
				const res = await fetch(`/api/verify-payment`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ sessionId }),
				});
				const data = await res.json();

				if (data.success) {
					setLicenseKey(data.licenseKey);
					setEmail(data.email);
					setViewsRemaining(data.viewsRemaining);
				} else if (data.expired) {
					setErrorType("expired");
					setErrorMessage(data.message);
				} else if (data.limitReached) {
					setErrorType("limitReached");
					setErrorMessage(data.message);
				} else {
					setErrorType("notFound");
				}
			} catch {
				setErrorType("notFound");
			} finally {
				setLoading(false);
			}
		};

		verifyPayment();
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
				<main className="min-h-screen bg-zinc-900 flex items-center justify-center">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
						<p className="text-zinc-400">
							Vérification du paiement...
						</p>
					</div>
				</main>
			</>
		);
	}

	if (!licenseKey) {
		// Déterminer le contenu en fonction du type d'erreur
		const errorContent = {
			expired: {
				icon: <Clock className="w-10 h-10 text-amber-500" />,
				title: "Lien expiré",
				description:
					errorMessage ||
					"Ce lien a expiré. Votre clé de licence vous a été envoyée par email lors de votre achat.",
				bgGradient: "from-amber-900/20",
				borderColor: "border-amber-500/20",
				bgColor: "bg-amber-500/10",
			},
			limitReached: {
				icon: <AlertTriangle className="w-10 h-10 text-orange-500" />,
				title: "Limite de consultations atteinte",
				description:
					errorMessage ||
					"Vous avez atteint le nombre maximum de consultations de cette page. Votre clé de licence vous a été envoyée par email.",
				bgGradient: "from-orange-900/20",
				borderColor: "border-orange-500/20",
				bgColor: "bg-orange-500/10",
			},
			notFound: {
				icon: <span className="text-4xl">❌</span>,
				title: "Paiement non trouvé",
				description:
					"Le paiement n'a pas pu être vérifié. Si vous pensez qu'il s'agit d'une erreur, contactez-moi via le formulaire de contact.",
				bgGradient: "from-red-900/20",
				borderColor: "border-red-500/20",
				bgColor: "bg-red-500/10",
			},
		};

		const content = errorContent[errorType] || errorContent.notFound;

		return (
			<>
				<NavBar />
				<main className="min-h-screen bg-zinc-900 flex items-center justify-center px-6 relative overflow-hidden">
					{/* Background Effects */}
					<div className="absolute inset-0 -z-10">
						<div
							className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${content.bgGradient} via-zinc-900 to-zinc-900`}
						/>
					</div>

					<div className="max-w-md text-center">
						<div
							className={`w-20 h-20 ${content.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 border ${content.borderColor}`}
						>
							{content.icon}
						</div>
						<h1 className="text-2xl font-bold text-white mb-4">
							{content.title}
						</h1>
						<p className="text-zinc-400 mb-6">
							{content.description}
						</p>

						{(errorType === "expired" ||
							errorType === "limitReached") && (
							<div className="mb-6 p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
								<p className="text-sm text-zinc-300 flex items-center justify-center gap-2">
									<Mail className="w-4 h-4 text-amber-500" />
									Vérifiez votre boîte mail pour retrouver
									votre clé
								</p>
							</div>
						)}

						<Link
							href="/gamemaster-os"
							className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-full font-semibold transition-all duration-300"
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
			<main className="min-h-screen bg-zinc-900 py-20 px-6 relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-900 to-zinc-900" />

					{/* Animated Gradient Orbs */}
					<motion.div
						className="absolute top-20 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, 50, 0],
							y: [0, 30, 0],
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-20 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, -40, 0],
							y: [0, -20, 0],
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>

					{/* Grid Pattern */}
					<div
						className="absolute inset-0 opacity-[0.02]"
						style={{
							backgroundImage: `linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)`,
							backgroundSize: "60px 60px",
						}}
					/>
				</div>

				<div className="max-w-3xl mx-auto pt-12">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="text-center mb-12"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: "spring" }}
							className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
						>
							<Check className="w-12 h-12 text-emerald-500" />
						</motion.div>

						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="text-white">Paiement </span>
							<span className="text-gradient-warm">réussi</span>
							<span className="text-white"> ! 🎉</span>
						</h1>
						<p className="text-xl text-zinc-400">
							Merci pour votre achat. Votre licence GameMaster OS
							est prête !
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="bg-zinc-800/50 border border-amber-500/30 rounded-3xl p-8 mb-8"
					>
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
								<Sparkles className="w-5 h-5 text-amber-500" />
							</div>
							<h2 className="text-2xl font-bold text-white">
								Votre clé de licence
							</h2>
						</div>

						<div className="bg-zinc-900/50 rounded-xl p-6 mb-4 border border-zinc-700/50">
							<p className="text-3xl md:text-4xl font-mono font-bold text-center text-amber-500 tracking-wider break-all">
								{licenseKey}
							</p>
						</div>

						<button
							onClick={copyToClipboard}
							className="w-full py-3 bg-zinc-700/50 border border-zinc-600 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
						>
							{copied ? (
								<>
									<Check className="w-5 h-5 text-emerald-500" />
									<span className="text-emerald-500">
										Copié !
									</span>
								</>
							) : (
								<>
									<Copy className="w-5 h-5" />
									Copier la clé
								</>
							)}
						</button>

						<div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
							<p className="text-sm text-amber-200 flex items-start gap-2">
								<Mail className="w-4 h-4 shrink-0 mt-0.5" />
								<span>
									Une copie de cette clé a également été
									envoyée à <strong>{email}</strong>
								</span>
							</p>
						</div>

						{viewsRemaining !== null && viewsRemaining <= 3 && (
							<div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
								<p className="text-sm text-orange-200 flex items-start gap-2">
									<AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
									<span>
										<strong>Attention :</strong> Cette page
										ne peut être consultée que{" "}
										<strong>{viewsRemaining} fois</strong>{" "}
										de plus. Conservez bien votre clé !
									</span>
								</p>
							</div>
						)}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700/50 mb-8"
					>
						<h2 className="text-2xl font-bold text-white mb-6">
							Comment activer votre licence ?
						</h2>

						<div className="space-y-4">
							<div className="flex gap-4">
								<div className="shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-zinc-900 text-sm">
									1
								</div>
								<div>
									<h3 className="font-semibold text-white mb-1">
										Ouvrez GameMaster OS
									</h3>
									<p className="text-zinc-400 text-sm">
										Lancez l&apos;application sur votre
										ordinateur
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-zinc-900 text-sm">
									2
								</div>
								<div>
									<h3 className="font-semibold text-white mb-1">
										Accédez aux paramètres
									</h3>
									<p className="text-zinc-400 text-sm">
										Cliquez sur l&apos;icône des paramètres,
										puis sur &quot;Licence&quot;
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-zinc-900 text-sm">
									3
								</div>
								<div>
									<h3 className="font-semibold text-white mb-1">
										Entrez votre clé
									</h3>
									<p className="text-zinc-400 text-sm">
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
						className="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700/50"
					>
						<h2 className="text-xl font-bold text-white mb-4">
							Vous n&apos;avez pas encore installé GameMaster OS ?
						</h2>
						<p className="text-zinc-400 mb-6">
							Téléchargez l&apos;application maintenant pour
							commencer à utiliser toutes les fonctionnalités PRO.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={latestVersion?.downloadUrl || "#"}
								onClick={handleDownload}
								download
								className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
							>
								<Download className="w-5 h-5" />
								Télécharger GameMaster OS
							</a>

							<Link
								href="/gamemaster-os"
								className="flex-1 px-6 py-3 bg-zinc-700/50 border border-zinc-600 text-white rounded-full font-semibold hover:bg-zinc-700 transition-all duration-300 text-center"
							>
								Retour à la page principale
							</Link>
						</div>
					</motion.div>

					<div className="mt-8 text-center text-sm text-zinc-500">
						<p>
							Une question ? Besoin d&apos;aide ?{" "}
							<Link
								href="/contact"
								className="text-amber-500 hover:text-amber-400 font-semibold"
							>
								Contactez-moi
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
				<div className="min-h-screen bg-zinc-900 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
				</div>
			}
		>
			<SuccessContent />
		</Suspense>
	);
}
