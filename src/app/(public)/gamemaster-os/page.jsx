"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import {
	ArrowRight,
	Building2,
	Check,
	Clock,
	Crown,
	Download,
	MessageSquare,
	Monitor,
	Music,
	Palette,
	Search,
	Shield,
	Sparkles,
	Star,
	Timer,
	X,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function GameMasterOSPage() {
	const [pricing, setPricing] = useState(null);
	const [loadingPricing, setLoadingPricing] = useState(true);
	const [zoomedImage, setZoomedImage] = useState(null);
	const [latestVersion, setLatestVersion] = useState(null);
	const [loadingVersion, setLoadingVersion] = useState(true);
	const heroRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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

		const fetchLatestVersion = async () => {
			try {
				const res = await fetch("/api/versions?latest=true");
				if (res.ok) {
					const data = await res.json();
					setLatestVersion(data);
				}
			} catch (error) {
				console.error("Error fetching version:", error);
			}
			setLoadingVersion(false);
		};

		fetchPricing();
		fetchLatestVersion();
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
				"Gestion de plusieurs timers, pause, alarmes personnalisées, dépassement géré automatiquement",
		},
		{
			icon: MessageSquare,
			title: "Messages et indices",
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
				"Personnalisation avancée, éditeur de thème, interface cohérente avec votre marque",
		},
		{
			icon: Shield,
			title: "Fiabilité avant tout",
			description:
				"Fonctionnement entièrement hors ligne, stabilité garantie, pas de dépendance internet",
		},
		{
			icon: Monitor,
			title: "Interface joueur immersive",
			description:
				"Affichage automatique plein écran sur second écran, timer lisible à distance",
		},
	];

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

	const screenshots = [
		{
			src: "/img/screenshots/dashboard.png",
			alt: "Dashboard Game Master - Vue d'ensemble de l'application",
			label: "Dashboard Game Master",
			description:
				"Vue d'ensemble : timers, salles actives, contrôles rapides",
		},
		{
			src: "/img/screenshots/gestion-timer.png",
			alt: "Gestion des timers en temps réel",
			label: "Gestion des timers",
			description: "Ajout/retrait de temps, pause, reset, alarmes",
		},
		{
			src: "/img/screenshots/ecran-joueur.png",
			alt: "Interface joueur sur TV",
			label: "Écran joueurs",
			description: "Affichage immersif sur TV : timer + messages",
		},
	];

	const useCases = [
		{
			icon: Timer,
			title: "Quiz & Soirées",
			description: "Compte à rebours, annonces, sons synchronisés",
		},
		{
			icon: MessageSquare,
			title: "Formations",
			description: "Timeboxing, rappels visuels, consignes projetées",
		},
		{
			icon: Music,
			title: "Événements",
			description: "Ambiances, jingles, transitions pilotées",
		},
		{
			icon: Shield,
			title: "Lieux offline",
			description: "Fonctionne sans connexion internet",
		},
	];

	const springTransition = {
		type: "spring",
		stiffness: 100,
		damping: 20,
	};

	const fadeInUp = {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
		transition: springTransition,
	};

	return (
		<>
			<NavBar />
			<main className="min-h-screen">
				{/* Hero Section */}
				<section
					ref={heroRef}
					className="relative min-h-[86vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden"
				>
					{/* Background Effects */}
					<div className="absolute inset-0 -z-10 overflow-hidden">
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-zinc-900" />

						{/* Animated Gradient Orbs */}
						<motion.div
							className="absolute top-20 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl will-change-transform backface-hidden"
							style={{ transform: "translateZ(0)" }}
							animate={{
								x: [0, 50, 0],
								y: [0, 30, 0],
								opacity: [0.8, 1, 0.8],
							}}
							transition={{
								duration: 10,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute bottom-20 -right-32 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl will-change-transform backface-hidden"
							style={{ transform: "translateZ(0)" }}
							animate={{
								x: [0, -40, 0],
								y: [0, -20, 0],
								opacity: [0.8, 1, 0.8],
							}}
							transition={{
								duration: 12,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 rounded-full blur-3xl will-change-transform backface-hidden"
							style={{ transform: "translateZ(0)" }}
							animate={{ opacity: [0.5, 0.8, 0.5] }}
							transition={{
								duration: 8,
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

					<motion.div
						style={{ opacity: heroOpacity, y: heroY }}
						className="max-w-6xl mx-auto text-center relative z-10"
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 150,
								damping: 20,
								delay: 0.05,
							}}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8"
						>
							<Sparkles className="w-4 h-4" />
							Application de gestion pour Escape Games
						</motion.div>

						{/* Logo */}
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.9,
								filter: "blur(10px)",
							}}
							animate={{
								opacity: 1,
								scale: 1,
								filter: "blur(0px)",
							}}
							transition={{
								type: "spring",
								stiffness: 80,
								damping: 20,
								delay: 0.15,
							}}
							className="mb-8"
						>
							<Image
								src="/img/logo_gamemaster-og_black.png"
								width={500}
								height={200}
								alt="GameMaster OS Logo"
								className="w-72 md:w-112.5 mx-auto"
							/>
						</motion.div>

						{/* Headline */}
						<motion.h1
							initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{
								type: "spring",
								stiffness: 80,
								damping: 18,
								delay: 0.25,
							}}
							className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
						>
							<span className="text-white">
								Le centre de contrôle
							</span>
							<br />
							<span className="text-gradient-warm">
								des Game Masters
							</span>
						</motion.h1>

						{/* Subheadline */}
						<motion.p
							initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{
								type: "spring",
								stiffness: 80,
								damping: 18,
								delay: 0.35,
							}}
							className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
						>
							Gérez vos timers, messages et ambiances sonores
							depuis une seule interface.
							<span className="text-white font-medium">
								{" "}
								Stable, local, sans abonnement.
							</span>
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								stiffness: 100,
								damping: 20,
								delay: 0.45,
							}}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
						>
							<a
								href={
									latestVersion
										? `/downloads/${latestVersion.fileName}`
										: "/downloads/GameMasterOS_Setup.exe"
								}
								download
								className="btn-warm group flex items-center gap-2 text-lg px-8 py-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
							>
								<Download className="w-5 h-5" />
								Télécharger gratuitement
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</a>

							<a
								href="#pricing"
								className="btn-outline flex items-center gap-2 text-lg px-8 py-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
							>
								<Crown className="w-5 h-5" />
								Voir les offres PRO
							</a>
						</motion.div>

						{/* Version info */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								stiffness: 100,
								damping: 20,
								delay: 0.6,
							}}
							className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500"
						>
							<span className="flex items-center gap-1.5">
								<Check className="w-4 h-4 text-green-500" />
								Windows 10/11
							</span>
							<span className="flex items-center gap-1.5">
								<Check className="w-4 h-4 text-green-500" />
								{loadingVersion
									? "v1.0.0"
									: `v${latestVersion?.version}`}
							</span>
							<Link
								href="/gamemaster-os/versions"
								className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
							>
								Notes de version →
							</Link>
						</motion.div>

						{/* Scroll Indicator */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1, duration: 0.5 }}
							className="mt-12 hidden sm:block"
						>
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
								className="flex flex-col items-center gap-2"
							>
								<span className="text-xs text-zinc-500 uppercase tracking-widest">
									Scroll
								</span>
								<div className="w-5 h-8 border border-zinc-600 rounded-full flex justify-center pt-2">
									<motion.div
										className="w-1 h-2 bg-amber-400 rounded-full"
										animate={{
											y: [0, 6, 0],
											opacity: [1, 0.3, 1],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
										}}
									/>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</section>

				{/* Social Proof */}
				<section className="py-12 px-6 border-b border-zinc-800 relative">
					<div className="max-w-5xl mx-auto relative">
						<div className="flex flex-wrap justify-center items-center gap-8 md:gap-0 text-center">
							{[
								{
									value: "100+",
									label: "Escape Games équipés",
									hasStar: false,
								},
								{
									value: "4.9/5",
									label: "Satisfaction client",
									hasStar: true,
								},
								{
									value: "0€/mois",
									label: "Aucun abonnement",
									hasStar: false,
								},
							].map((stat, i) => (
								<div
									key={stat.label}
									className={`flex items-center cursor-default transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 ${i < 2 ? "md:border-r md:border-zinc-700" : ""}`}
								>
									<div className="flex flex-col items-center px-8 md:px-12">
										<div className="text-3xl md:text-4xl font-bold text-white mb-1">
											{stat.value}
										</div>
										<div className="text-zinc-500 text-sm flex items-center justify-center gap-1">
											{stat.hasStar && (
												<Star className="w-4 h-4 text-amber-400 fill-amber-400" />
											)}
											{stat.label}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Feature highlights */}
				<section className="py-16 px-6 border-b border-zinc-800 relative overflow-hidden">
					{/* Subtle ambient light */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/3 rounded-full blur-3xl" />

					<div className="max-w-4xl mx-auto relative z-10">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{[
								{
									icon: Timer,
									label: "Multi-timers",
									desc: "Gérez plusieurs salles",
								},
								{
									icon: Monitor,
									label: "Double écran",
									desc: "GM + Joueurs",
								},
								{
									icon: Music,
									label: "Audio intégré",
									desc: "Sons & ambiances",
								},
								{
									icon: Shield,
									label: "100% Offline",
									desc: "Aucune dépendance",
								},
							].map((item) => (
								<div
									key={item.label}
									className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-zinc-800/50 border border-zinc-700/50 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]"
								>
									<div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
										<item.icon className="w-6 h-6 text-amber-500" />
									</div>
									<div className="text-center">
										<span className="block text-white font-semibold">
											{item.label}
										</span>
										<span className="text-xs text-zinc-500">
											{item.desc}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-28 px-6 relative overflow-hidden">
					{/* Background */}
					<div className="absolute inset-0 bg-zinc-800/40" />

					{/* Decorative lines */}
					<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
					<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

					<div className="max-w-7xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold mb-6">
								<span className="text-white">
									Conçu pour les{" "}
								</span>
								<span className="text-gradient-warm">
									vrais besoins du terrain
								</span>
							</h2>
							<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
								GameMaster OS résout les problèmes que vous
								rencontrez chaque jour
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{features.map((feature, index) => (
								<div
									key={index}
									className="group card-dark cursor-default transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.15)]"
								>
									<div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
										<feature.icon className="w-7 h-7 text-white" />
									</div>
									<h3 className="text-xl font-bold text-white mb-3">
										{feature.title}
									</h3>
									<p className="text-zinc-400 leading-relaxed">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Screenshots Gallery */}
				<section className="py-28 px-6 bg-zinc-800/30 relative overflow-hidden">
					{/* Background */}
					<div className="absolute inset-0 bg-linear-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

					{/* Ambient light */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-amber-500/5 rounded-full blur-3xl" />

					<div className="max-w-7xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
								Aperçu de l&apos;interface
							</h2>
							<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
								Découvrez une interface pensée pour
								l&apos;efficacité
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-6">
							{screenshots.map((shot, index) => (
								<div
									key={index}
									onClick={() => setZoomedImage(shot)}
									className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]"
								>
									<div className="relative rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-800 transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.15)]">
										<div className="aspect-video relative overflow-hidden">
											<Image
												src={shot.src}
												alt={shot.alt}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
											<div className="absolute bottom-3 right-3 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-sm rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
												<Search className="w-3.5 h-3.5" />
												Cliquez pour agrandir
											</div>
										</div>
										<div className="p-5">
											<h3 className="text-lg font-bold text-white mb-1">
												{shot.label}
											</h3>
											<p className="text-sm text-zinc-400">
												{shot.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Use Cases */}
				<section className="py-28 px-6 relative overflow-hidden">
					{/* Background */}
					<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/80 to-transparent" />

					{/* Grid Pattern */}
					<div
						className="absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
							backgroundSize: "60px 60px",
						}}
					/>

					{/* Decorative lines */}
					<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
					<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

					<div className="max-w-5xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
								Au-delà des Escape Games
							</span>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
								Un outil polyvalent
							</h2>
							<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
								Dès qu&apos;il faut gérer un timing ou envoyer
								des messages, GameMaster OS fait le job
							</p>
						</div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
							{useCases.map((useCase, index) => (
								<div
									key={index}
									className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]"
								>
									<div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
										<useCase.icon className="w-5 h-5 text-orange-400" />
									</div>
									<h3 className="font-bold text-white mb-1">
										{useCase.title}
									</h3>
									<p className="text-sm text-zinc-400">
										{useCase.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Pricing Section */}
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
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold mb-6">
								<span className="text-white">Offres & </span>
								<span className="text-gradient-warm">
									Tarifs
								</span>
							</h2>
							<p className="text-xl text-zinc-400">
								Paiement unique, licence perpétuelle, pas
								d&apos;abonnement
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
							{/* Free Plan */}
							<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:border-zinc-600 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]">
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
									<span className="text-zinc-500 ml-2">
										à vie
									</span>
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
							</div>

							{/* PRO Plan - highlighted */}
							<div className="relative bg-linear-to-b from-amber-500/10 to-zinc-800/50 border-2 border-amber-500/50 rounded-2xl p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-amber-500/80 hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.2)]">
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
									{isPlanOnSale("PRO") &&
										getBasePrice("PRO") && (
											<div className="text-xl text-zinc-500 line-through mb-1">
												{getBasePrice("PRO")}€
											</div>
										)}
									<span className="text-5xl font-bold text-white">
										{loadingPricing
											? "..."
											: `${getPlanPrice("PRO")}€`}
									</span>
									<span className="text-zinc-400 ml-2">
										TTC
									</span>
									{isPlanOnSale("PRO") && pricing && (
										<div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
											<Clock className="w-3.5 h-3.5" />
											Offre limitée
										</div>
									)}
								</div>

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
									className="btn-warm w-full flex justify-center transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
								>
									Acheter la version PRO
								</a>
							</div>

							{/* Enterprise Plan */}
							<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:border-zinc-600 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]">
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
									<span className="text-zinc-400 ml-2">
										TTC
									</span>
								</div>

								<ul className="space-y-3 mb-8 flex-1">
									{enterpriseFeatures.map(
										(feature, index) => (
											<li
												key={index}
												className="flex items-start gap-3 text-zinc-300"
											>
												<Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
												<span>{feature}</span>
											</li>
										),
									)}
								</ul>

								<a
									href="/gamemaster-os/checkout?plan=enterprise"
									className="block w-full py-4 bg-zinc-700 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:bg-zinc-600 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
								>
									Acheter Entreprise
								</a>
							</div>
						</div>

						<p className="text-center text-zinc-500 mt-10">
							Besoin de plus de postes ?{" "}
							<Link
								href="/contact"
								className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
							>
								Contactez-moi pour une offre sur mesure →
							</Link>
						</p>
					</div>
				</section>

				{/* Installation */}
				<section className="py-28 px-6 relative overflow-hidden">
					{/* Background */}
					<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/50 to-transparent" />

					{/* Ambient light */}
					<div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

					{/* Decorative lines */}
					<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
					<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

					<div className="max-w-4xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
								Installation en 3 clics
							</h2>
							<p className="text-xl text-zinc-400">
								Prêt à l&apos;emploi en moins de 2 minutes
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<div className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]">
								<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
									<Monitor className="w-5 h-5 text-amber-500" />
									Configuration requise
								</h3>
								<ul className="space-y-3 text-zinc-300">
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										Windows 10 / 11 (64 bits)
									</li>
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										4 Go de RAM recommandés
									</li>
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										2 écrans conseillés
									</li>
								</ul>
							</div>

							<div className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]">
								<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
									<Zap className="w-5 h-5 text-amber-500" />
									Mise en route
								</h3>
								<ul className="space-y-3 text-zinc-300">
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										Installation en 3 clics
									</li>
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										Aucune connexion requise
									</li>
									<li className="flex items-center gap-3">
										<Check className="w-5 h-5 text-green-500" />
										Configuration automatique
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="py-28 px-6 relative overflow-hidden bg-zinc-900/80">
					{/* Animated orbs */}
					<motion.div
						className="absolute top-10 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, 40, 0],
							y: [0, -25, 0],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, -35, 0],
							y: [0, 20, 0],
							opacity: [0.7, 1, 0.7],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>

					<div className="max-w-4xl mx-auto relative z-10">
						<div className="relative rounded-3xl overflow-hidden border border-zinc-700/50">
							{/* Background */}
							<div className="absolute inset-0 bg-zinc-800" />
							<div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-orange-500/5" />

							<div className="relative p-12 md:p-16 text-center">
								<h2 className="text-3xl md:text-5xl font-bold mb-6">
									<span className="text-white">
										Prêt à améliorer{" "}
									</span>
									<span className="text-gradient-warm">
										vos sessions ?
									</span>
								</h2>
								<p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
									Téléchargez la version gratuite et découvrez
									un outil pensé pour les professionnels de
									l&apos;Escape Game
								</p>

								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<a
										href={
											latestVersion
												? `/downloads/${latestVersion.fileName}`
												: "/downloads/GameMasterOS_Setup.exe"
										}
										download
										className="btn-warm flex items-center justify-center gap-2 px-8 py-4 text-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
									>
										<Download className="w-5 h-5" />
										Télécharger gratuitement
									</a>
									<a
										href="#pricing"
										className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
									>
										<Crown className="w-5 h-5" />
										Passer à la version PRO
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Image Zoom Modal */}
			<AnimatePresence>
				{zoomedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setZoomedImage(null)}
						className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
					>
						<button
							onClick={() => setZoomedImage(null)}
							className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
							aria-label="Fermer"
						>
							<X className="w-6 h-6 text-white" />
						</button>

						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-6xl w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl cursor-default border border-zinc-700"
						>
							<div className="relative aspect-video">
								<Image
									src={zoomedImage.src}
									alt={zoomedImage.alt}
									fill
									className="object-contain"
								/>
							</div>
							<div className="p-6 border-t border-zinc-800">
								<h3 className="text-xl font-bold text-white mb-2">
									{zoomedImage.label}
								</h3>
								<p className="text-zinc-400">
									{zoomedImage.description}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</>
	);
}
