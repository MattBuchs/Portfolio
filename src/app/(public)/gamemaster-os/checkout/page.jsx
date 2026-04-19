"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
				0,
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
			<main className="min-h-screen bg-zinc-900 py-20 px-6 relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-zinc-900" />

					{/* Animated Gradient Orbs */}
					<motion.div
						className="absolute top-20 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, 50, 0],
							y: [0, 30, 0],
							opacity: [0.6, 0.9, 0.6],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-20 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, -40, 0],
							y: [0, -20, 0],
							opacity: [0.6, 0.9, 0.6],
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

				<div className="max-w-6xl mx-auto">
					<Link
						href="/gamemaster-os"
						className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors mt-4"
					>
						<ArrowLeft className="w-4 h-4" />
						Retour
					</Link>

					<div className="gap-8 flex flex-col-reverse md:flex-row">
						{/* Formulaire */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="md:w-1/2"
						>
							<div className="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700/50">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
										<CreditCard className="w-6 h-6 text-amber-500" />
									</div>
									<h1 className="text-3xl font-bold text-white">
										Finaliser l&apos;achat
									</h1>
								</div>

								<p className="text-zinc-400 mb-8">
									Remplissez vos informations pour procéder au
									paiement sécurisé via Stripe.
								</p>

								{error && (
									<div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
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
											className="block text-sm font-semibold text-white mb-2"
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
											className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder-zinc-500"
											placeholder="votre@email.com"
										/>
										<p className="mt-1 text-xs text-zinc-500">
											Votre clé de licence sera envoyée à
											cette adresse
										</p>
									</div>

									<div>
										<label
											htmlFor="name"
											className="block text-sm font-semibold text-white mb-2"
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
											className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder-zinc-500"
											placeholder="Votre Nom et Prénom"
										/>
									</div>

									<div>
										<label
											htmlFor="company"
											className="block text-sm font-semibold text-white mb-2"
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
											className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder-zinc-500"
											placeholder="Nom de votre société"
										/>
									</div>

									<div>
										<label
											htmlFor="promoCode"
											className="block text-sm font-semibold text-white mb-2"
										>
											Code promo (optionnel)
										</label>
										<input
											type="text"
											id="promoCode"
											value={formData.promoCode}
											onChange={handlePromoCodeChange}
											onBlur={handlePromoCodeBlur}
											className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder-zinc-500 uppercase placeholder:lowercase"
											placeholder="code promo"
											disabled={
												promoValidation.isValidating
											}
										/>
										{promoValidation.isValidating && (
											<p className="mt-2 text-sm text-zinc-400">
												Validation en cours...
											</p>
										)}
										{promoValidation.message && (
											<p
												className={`mt-2 text-sm ${
													promoValidation.isValid
														? "text-emerald-500"
														: "text-red-400"
												}`}
											>
												{promoValidation.message}
											</p>
										)}
									</div>

									<button
										type="submit"
										disabled={loading}
										className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
									>
										{loading ? (
											<>
												<div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
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

									<p className="text-xs text-zinc-500 text-center">
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
							className="md:w-1/2"
						>
							<div className="bg-zinc-800/50 border border-amber-500/30 rounded-3xl p-8 sticky top-8">
								<div className="flex justify-between items-start mb-6">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
											<Sparkles className="w-5 h-5 text-amber-500" />
										</div>
										<h2 className="text-2xl font-bold text-white">
											{selectedPlan.name}
										</h2>
									</div>
									{dynamicPricing &&
										(() => {
											const planUpper =
												plan === "enterprise"
													? "BUSINESS"
													: "PRO";
											const planPricing =
												dynamicPricing.find(
													(p) => p.plan === planUpper,
												);
											const now = new Date();
											const isPromoExpired =
												planPricing?.saleEndDate &&
												now >
													new Date(
														planPricing.saleEndDate,
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

								<div className="mb-6 pb-6 border-b border-zinc-700/50">
									<div className="space-y-3">
										{promoValidation.isValid && (
											<div className="flex justify-between items-baseline">
												<span className="text-zinc-400">
													Prix original
												</span>
												<span className="text-xl font-semibold text-zinc-500 line-through">
													{selectedPlan.price}€ TTC
												</span>
											</div>
										)}
										{promoValidation.isValid && (
											<div className="flex justify-between items-baseline">
												<span className="text-emerald-500 font-semibold">
													Réduction
												</span>
												<span className="text-xl font-semibold text-emerald-500">
													-
													{promoValidation.discountType ===
													"PERCENTAGE"
														? `${promoValidation.discountValue}%`
														: `${promoValidation.discountValue}€`}
												</span>
											</div>
										)}
										<div className="flex justify-between items-baseline">
											<span className="text-zinc-400">
												{promoValidation.isValid
													? "Prix final"
													: "Prix"}
											</span>
											<div className="text-right">
												<span className="text-4xl font-bold text-white">
													{finalPrice.toFixed(2)}€
												</span>
												<span className="text-lg text-zinc-400 ml-2">
													TTC
												</span>
											</div>
										</div>
									</div>
									<p className="text-sm text-zinc-500 mt-2">
										Paiement unique • Licence perpétuelle
									</p>
								</div>

								<div className="mb-6">
									<h3 className="font-semibold text-white mb-4">
										Fonctionnalités incluses :
									</h3>
									<ul className="space-y-3">
										{selectedPlan.features.map(
											(feature, index) => (
												<li
													key={index}
													className="flex items-start gap-3 text-zinc-300"
												>
													<Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
													<span className="text-sm">
														{feature}
													</span>
												</li>
											),
										)}
									</ul>
								</div>

								<div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
									<p className="text-sm text-amber-200 flex items-start gap-2">
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
				<div className="min-h-screen bg-zinc-900 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
				</div>
			}
		>
			<CheckoutForm />
		</Suspense>
	);
}
