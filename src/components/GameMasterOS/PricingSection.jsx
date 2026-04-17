"use client";

import { motion } from "framer-motion";
import { Building2, Check, Clock, Crown, Download } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
	"1 timer",
	"1 thème",
	"Double écran",
	"Gestion audio",
	"Français / Anglais",
	"Sans limite de durée",
];

const proFeatures = [
	"Installation sur 1 poste",
	"Timers illimités",
	"Tous les thèmes",
	"Éditeur de thème",
	"Indices pré-configurés",
	"Mises à jour incluses",
	"Licence perpétuelle",
];

const enterpriseFeatures = [
	"Toutes les fonctionnalités PRO",
	"Installation sur 3 postes",
	"Support prioritaire",
];

export default function PricingSection({
	pricing,
	loadingPricing,
	latestVersion,
}) {
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

	const getSaleEndDate = (planName) => {
		if (!pricing) return null;
		const plan = pricing.find((p) => p.plan === planName);
		if (!plan?.saleEndDate) return null;

		const endDate = new Date(plan.saleEndDate);
		return endDate.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<section
			id="pricing"
			className="py-28 px-6 bg-zinc-800/30 relative overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

			{/* Animated orbs */}
			<motion.div
				className="absolute top-20 left-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl will-change-transform backface-hidden"
				style={{ transform: "translateZ(0)" }}
				animate={{
					x: [0, 30, 0],
					y: [0, -20, 0],
					opacity: [0.6, 1, 0.6],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl will-change-transform backface-hidden"
				style={{ transform: "translateZ(0)" }}
				animate={{
					x: [0, -40, 0],
					y: [0, 25, 0],
					opacity: [0.7, 1, 0.7],
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header with animation */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						type: "spring",
						stiffness: 80,
						damping: 20,
					}}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Offres & </span>
						<span className="text-gradient-warm">Tarifs</span>
					</h2>
					<p className="text-xl text-zinc-400">
						Paiement unique, licence perpétuelle, pas
						d&apos;abonnement
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{/* Free Plan */}
					<motion.div
						initial={{ opacity: 0, y: 50, rotateY: -10 }}
						whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 15,
							delay: 0,
						}}
						whileHover={{
							y: -8,
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 25,
							},
						}}
						className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 flex flex-col transition-colors duration-300 hover:border-zinc-600 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center">
								<Download className="w-6 h-6 text-zinc-300" />
							</div>
							<h3 className="text-2xl font-bold text-white">
								Gratuit
							</h3>
						</div>

						<p className="text-zinc-400 mb-6">
							Pour tester en conditions réelles
						</p>

						<div className="mb-6">
							<span className="text-5xl font-bold text-white">
								0€
							</span>
							<span className="text-zinc-500 ml-2">à vie</span>
						</div>

						<ul className="space-y-3 mb-8 flex-1">
							{freeFeatures.map((feature, index) => (
								<li
									key={index}
									className="flex items-start gap-3 text-zinc-300"
								>
									<Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<a
							href={
								latestVersion
									? `/downloads/${latestVersion.fileName}`
									: "/downloads/GameMasterOS_Setup.exe"
							}
							download
							className="block w-full py-4 bg-zinc-700 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:bg-zinc-600 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
						>
							Télécharger
						</a>
					</motion.div>

					{/* PRO Plan - highlighted */}
					<motion.div
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 15,
							delay: 0.1,
						}}
						whileHover={{
							y: -8,
							scale: 1.02,
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 25,
							},
						}}
						className="relative bg-linear-to-b from-amber-500/10 to-zinc-800/50 border-2 border-amber-500/50 rounded-2xl p-8 flex flex-col transition-colors duration-300 hover:border-amber-500/80 hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.2)]"
					>
						{/* Popular badge */}
						<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center gap-1.5">
							<Crown className="w-4 h-4" />
							Populaire
						</div>

						<div className="flex items-center gap-3 mb-4 mt-2">
							<div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
								<Crown className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-white">
								PRO
							</h3>
						</div>

						<p className="text-zinc-400 mb-6">
							Pour un poste Game Master
						</p>

						<div className="mb-6">
							{isPlanOnSale("PRO") && getBasePrice("PRO") && (
								<div className="text-xl text-zinc-500 line-through mb-1">
									{getBasePrice("PRO")}€
								</div>
							)}
							<span className="text-5xl font-bold text-white">
								{loadingPricing
									? "..."
									: `${getPlanPrice("PRO")}€`}
							</span>
							<span className="text-zinc-400 ml-2">TTC</span>
						</div>

						{isPlanOnSale("PRO") && (
							<div className="mb-6 flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
								<Clock className="w-4 h-4 text-red-400 shrink-0" />
								<span className="text-red-400 text-sm font-medium">
									Offre limitée
									{getSaleEndDate("PRO") &&
										` jusqu'au ${getSaleEndDate("PRO")}`}
								</span>
							</div>
						)}

						<ul className="space-y-3 mb-8 flex-1">
							{proFeatures.map((feature, index) => (
								<li
									key={index}
									className="flex items-start gap-3 text-zinc-200"
								>
									<Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<a
							href="/gamemaster-os/checkout?plan=pro"
							className="btn-warm-gmos w-full flex justify-center text-center"
						>
							Acheter la version PRO
						</a>
					</motion.div>

					{/* Enterprise Plan */}
					<motion.div
						initial={{ opacity: 0, y: 50, rotateY: 10 }}
						whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 15,
							delay: 0.2,
						}}
						whileHover={{
							y: -8,
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 25,
							},
						}}
						className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 flex flex-col transition-colors duration-300 hover:border-zinc-600 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center">
								<Building2 className="w-6 h-6 text-zinc-300" />
							</div>
							<h3 className="text-2xl font-bold text-white">
								Entreprise
							</h3>
						</div>

						<p className="text-zinc-400 mb-6">
							Pour 3 postes Game Master
						</p>

						<div className="mb-6">
							{isPlanOnSale("BUSINESS") &&
								getBasePrice("BUSINESS") && (
									<div className="text-xl text-zinc-500 line-through mb-1">
										{getBasePrice("BUSINESS")}€
									</div>
								)}
							<span className="text-5xl font-bold text-white">
								{loadingPricing
									? "..."
									: `${getPlanPrice("BUSINESS")}€`}
							</span>
							<span className="text-zinc-400 ml-2">TTC</span>
						</div>

						{isPlanOnSale("BUSINESS") && (
							<div className="mb-6 flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
								<Clock className="w-4 h-4 text-red-400 shrink-0" />
								<span className="text-red-400 text-sm font-medium">
									Offre limitée
									{getSaleEndDate("BUSINESS") &&
										` jusqu'au ${getSaleEndDate("BUSINESS")}`}
								</span>
							</div>
						)}

						<ul className="space-y-3 mb-8 flex-1">
							{enterpriseFeatures.map((feature, index) => (
								<li
									key={index}
									className="flex items-start gap-3 text-zinc-300"
								>
									<Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<a
							href="/gamemaster-os/checkout?plan=enterprise"
							className="block w-full py-4 bg-zinc-700 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:bg-zinc-600 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
						>
							Acheter la version Entreprise
						</a>
					</motion.div>
				</div>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="text-center text-zinc-500 mt-10"
				>
					Besoin de plus de postes ?{" "}
					<Link
						href="/contact"
						className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
					>
						Contactez-moi pour une offre sur mesure →
					</Link>
				</motion.p>
			</div>
		</section>
	);
}
