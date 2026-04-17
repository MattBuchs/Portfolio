"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
	MessageSquare,
	Monitor,
	Music,
	Palette,
	Shield,
	Timer,
} from "lucide-react";
import { useRef } from "react";

const features = [
	{
		icon: Timer,
		title: "Contrôle total en temps réel",
		description:
			"Gestion de plusieurs timers, pause, alarmes personnalisées, dépassement géré automatiquement",
		accent: "amber",
	},
	{
		icon: MessageSquare,
		title: "Messages et indices",
		description:
			"Envoi d'indices en un clic, catégories personnalisées, icônes visuelles pour plus d'impact",
		accent: "orange",
	},
	{
		icon: Music,
		title: "Gestion audio intégrée",
		description:
			"Musiques d'ambiance, sons d'indices, alarme de fin personnalisable, import libre de MP3",
		accent: "amber",
	},
	{
		icon: Palette,
		title: "Thèmes professionnels",
		description:
			"Personnalisation avancée, éditeur de thème, interface cohérente avec votre marque",
		accent: "orange",
	},
	{
		icon: Shield,
		title: "Fiabilité avant tout",
		description:
			"Fonctionnement entièrement hors ligne, stabilité garantie, pas de dépendance internet",
		accent: "amber",
	},
	{
		icon: Monitor,
		title: "Interface joueur immersive",
		description:
			"Affichage automatique plein écran sur second écran, timer lisible à distance",
		accent: "orange",
	},
];

// Animation variants for staggered reveal
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 60,
		rotateX: -15,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
			mass: 0.8,
		},
	},
};

const titleVariants = {
	hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 20,
		},
	},
};

function FeatureCard({ feature, index }) {
	const cardRef = useRef(null);

	return (
		<motion.div
			ref={cardRef}
			variants={cardVariants}
			className="group relative cursor-default perspective-1000"
			whileHover={{
				y: -8,
				transition: { type: "spring", stiffness: 400, damping: 25 },
			}}
		>
			{/* Card */}
			<div className="relative h-full rounded-2xl bg-zinc-900/80 border border-zinc-700/50 p-6 overflow-hidden transition-all duration-500 ease-out group-hover:border-zinc-600/80 group-hover:bg-zinc-900/95 group-hover:shadow-2xl group-hover:shadow-amber-500/5">
				{/* Ambient glow on hover - positioned at bottom */}
				<div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

				{/* Light beam effect on hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />
				</div>

				{/* Content */}
				<div className="relative z-10">
					{/* Icon with subtle float animation on hover */}
					<div className="relative w-14 h-14 mb-5">
						<div className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-150" />
						<div className="relative w-full h-full rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
							<feature.icon className="w-7 h-7 text-white" />
						</div>
					</div>

					{/* Title */}
					<h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-amber-50">
						{feature.title}
					</h3>

					{/* Description */}
					<p className="text-zinc-400 leading-relaxed transition-colors duration-300 group-hover:text-zinc-300">
						{feature.description}
					</p>
				</div>

				{/* Corner accent */}
				<div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-amber-500/10 to-transparent" />
				</div>
			</div>
		</motion.div>
	);
}

export default function FeaturesSection() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Parallax for decorative elements
	const decorY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const decorY2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
	const decorOpacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.8, 1],
		[0, 1, 1, 0],
	);

	return (
		<section
			ref={sectionRef}
			className="py-28 px-6 relative overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-zinc-800/40" />

			{/* Parallax decorative orbs */}
			<motion.div
				style={{ y: decorY1, opacity: decorOpacity }}
				className="absolute top-20 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
			/>
			<motion.div
				style={{ y: decorY2, opacity: decorOpacity }}
				className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
			/>

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header with scroll animation */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="text-center mb-16"
				>
					<motion.h2
						variants={titleVariants}
						className="text-4xl md:text-5xl font-bold mb-6"
					>
						<span className="text-white">Conçu pour les </span>
						<span className="text-gradient-warm">
							vrais besoins du terrain
						</span>
					</motion.h2>
					<motion.p
						variants={titleVariants}
						className="text-xl text-zinc-400 max-w-2xl mx-auto"
					>
						GameMaster OS résout les problèmes que vous rencontrez
						chaque jour
					</motion.p>
				</motion.div>

				{/* Cards grid with staggered animation */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
					style={{ perspective: "1000px" }}
				>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							feature={feature}
							index={index}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
}
