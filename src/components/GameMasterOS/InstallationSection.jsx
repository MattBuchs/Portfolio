"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Monitor, Zap } from "lucide-react";
import { useRef } from "react";

// Step counter animation - counts up as the card enters view
const stepVariants = {
	hidden: { opacity: 0, x: -30 },
	visible: (i) => ({
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
			delay: i * 0.15,
		},
	}),
};

const cardVariants = {
	hidden: { opacity: 0, y: 50, scale: 0.95 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 80,
			damping: 15,
			delay: i * 0.2,
		},
	}),
};

export default function InstallationSection() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Parallax for ambient light
	const lightX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
	const lightOpacity = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		[0, 1, 1, 0],
	);

	return (
		<section
			ref={sectionRef}
			className="py-28 px-6 relative overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/50 to-transparent" />

			{/* Ambient light with parallax */}
			<motion.div
				style={{ x: lightX, opacity: lightOpacity }}
				className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
			/>

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="max-w-4xl mx-auto relative z-10">
				{/* Header with reveal animation */}
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
						<span className="text-white">Installation en </span>
						<motion.span
							initial={{ opacity: 0, scale: 0.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 15,
								delay: 0.2,
							}}
							className="text-gradient-warm inline-block"
						>
							3 clics
						</motion.span>
					</h2>
					<p className="text-xl text-zinc-400">
						Prêt à l&apos;emploi en moins de 2 minutes
					</p>
				</motion.div>

				{/* Cards with staggered animation */}
				<div className="grid md:grid-cols-2 gap-6">
					<motion.div
						custom={0}
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
						className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-colors duration-300 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]"
					>
						<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
							<Monitor className="w-5 h-5 text-amber-500" />
							Configuration requise
						</h3>
						<ul className="space-y-3 text-zinc-300">
							{[
								"Windows 10 / 11 (64 bits)",
								"4 Go de RAM recommandés",
								"2 écrans conseillés",
							].map((item, index) => (
								<motion.li
									key={index}
									custom={index}
									variants={stepVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									className="flex items-center gap-3"
								>
									<Check className="w-5 h-5 text-green-500" />
									{item}
								</motion.li>
							))}
						</ul>
					</motion.div>

					<motion.div
						custom={1}
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
						className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-colors duration-300 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]"
					>
						<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
							<Zap className="w-5 h-5 text-amber-500" />
							Mise en route
						</h3>
						<ul className="space-y-3 text-zinc-300">
							{[
								"Installation en 3 clics",
								"Aucune connexion requise",
								"Configuration automatique",
							].map((item, index) => (
								<motion.li
									key={index}
									custom={index + 3}
									variants={stepVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									className="flex items-center gap-3"
								>
									<Check className="w-5 h-5 text-green-500" />
									{item}
								</motion.li>
							))}
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
