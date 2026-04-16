"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Music, Shield, Timer } from "lucide-react";
import { useRef } from "react";

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

// Staggered card animation from different directions
const cardVariants = {
	hidden: (index) => ({
		opacity: 0,
		x: index % 2 === 0 ? -40 : 40,
		y: 30,
		scale: 0.9,
	}),
	visible: (index) => ({
		opacity: 1,
		x: 0,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
			delay: index * 0.1,
		},
	}),
};

export default function UseCases() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Parallax for grid pattern
	const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);

	return (
		<section
			ref={sectionRef}
			className="py-28 px-6 relative overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/80 to-transparent" />

			{/* Grid Pattern with parallax */}
			<motion.div
				style={{ y: gridY }}
				className="absolute inset-0 opacity-[0.025]"
			>
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
						backgroundSize: "60px 60px",
					}}
				/>
			</motion.div>

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

			<div className="max-w-5xl mx-auto relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						type: "spring",
						stiffness: 80,
						damping: 20,
					}}
					className="text-center mb-16"
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6"
					>
						Au-delà des Escape Games
					</motion.span>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Un outil </span>
						<span className="text-gradient-warm">polyvalent</span>
					</h2>
					<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
						Dès qu&apos;il faut gérer un timing ou envoyer des
						messages, GameMaster OS fait le job
					</p>
				</motion.div>

				{/* Cards */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{useCases.map((useCase, index) => (
						<motion.div
							key={index}
							custom={index}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-50px" }}
							whileHover={{
								y: -6,
								scale: 1.02,
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 25,
								},
							}}
							className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 cursor-default transition-colors duration-300 hover:border-orange-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]"
						>
							<div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/30">
								<useCase.icon className="w-5 h-5 text-orange-400" />
							</div>
							<h3 className="font-bold text-white mb-1">
								{useCase.title}
							</h3>
							<p className="text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
								{useCase.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
