"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BarLink from "../utils/BarLink";
import DownloadCV from "../utils/DownloadCV";
import "./Card.css";

export default function Presentation() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delayChildren: 0.1, staggerChildren: 0.08 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
		visible: {
			y: 0,
			opacity: 1,
			filter: "blur(0px)",
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				mass: 0.8,
			},
		},
	};

	return (
		<motion.section
			className="relative min-h-screen overflow-hidden"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Gradient Orbs */}
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

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 min-h-screen flex items-center py-32 md:py-40 lg:py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
					{/* Left Content */}
					<motion.div
						className="space-y-8"
						variants={containerVariants}
					>
						{/* Main Title */}
						<div className="space-y-3 sm:space-y-4">
							<motion.p
								variants={itemVariants}
								className="text-base sm:text-lg text-amber-400 font-medium flex items-center gap-2"
							>
								<Sparkles size={18} className="animate-pulse" />
								Bienvenue sur mon portfolio
							</motion.p>

							<motion.h1
								variants={itemVariants}
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
							>
								Je suis{" "}
								<span className="text-gradient-warm inline-block">
									Matt Buchs
								</span>
							</motion.h1>

							<motion.p
								variants={itemVariants}
								className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl"
							>
								<strong className="text-white">
									Développeur Web Full-Stack
								</strong>{" "}
								passionné, je crée des sites internet modernes
								et performants. Spécialisé en React, Next.js et
								Node.js.
							</motion.p>
						</div>

						{/* CTA Buttons */}
						<motion.div
							variants={itemVariants}
							className="flex flex-row gap-3 sm:gap-4 pt-4"
						>
							<motion.div
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 25,
								}}
							>
								<Link
									href="/contact"
									className="btn-warm inline-flex items-center justify-center gap-2 relative z-10 group"
								>
									<span className="relative z-10">
										Démarrer un projet
									</span>
									<ArrowRight
										size={18}
										className="relative z-10 group-hover:translate-x-1 transition-transform duration-200"
									/>
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 25,
								}}
							>
								<DownloadCV />
							</motion.div>
						</motion.div>

						{/* Stats */}
						<motion.div
							variants={itemVariants}
							className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10"
						>
							{[
								{ value: "3+", label: "Années d'exp." },
								{ value: "10+", label: "Projets" },
								{ value: "24/7", label: "Support" },
							].map((stat, idx) => (
								<motion.div
									key={idx}
									className="text-center sm:text-left"
									whileHover={{ scale: 1.05, y: -2 }}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 25,
									}}
								>
									<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-warm">
										{stat.value}
									</h2>
									<p className="text-xs sm:text-sm text-zinc-500 mt-1">
										{stat.label}
									</p>
								</motion.div>
							))}
						</motion.div>
					</motion.div>

					{/* Right Visual */}
					<motion.aside
						className="relative flex items-center justify-center order-first lg:order-last"
						initial={{
							opacity: 0,
							scale: 0.95,
							filter: "blur(8px)",
						}}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						transition={{
							type: "spring",
							stiffness: 80,
							damping: 20,
							delay: 0.3,
						}}
					>
						{/* Glow Effect */}
						<div className="absolute inset-0 flex items-center justify-center">
							<motion.div
								className="w-64 sm:w-80 h-64 sm:h-80 bg-linear-to-br from-amber-500/25 via-orange-500/20 to-amber-400/15 rounded-full blur-3xl"
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.5, 0.8, 0.5],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						</div>

						{/* Card with classic border style */}
						<motion.div
							className="relative card-wrapper max-w-50 sm:max-w-xs md:max-w-sm"
							whileHover={{ y: -6 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						>
							<div className="w-full flex justify-center">
								<div className="card w-3/4 lg:w-full">
									<Image
										src="/img/me.png"
										alt="Photo de Matt Buchs"
										width={400}
										height={400}
										className="w-full h-auto"
									/>
								</div>
							</div>

							{/* Decorative floating elements */}
							<motion.div
								className="absolute z-20 -top-3 -right-3 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-20 sm:h-20 border-2 border-amber-600/40 rounded-full hidden lg:block"
								animate={{ rotate: 360 }}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear",
								}}
							/>
							<motion.div
								className="absolute z-20 -bottom-4 -left-4 sm:top-16 sm:-left-7 w-10 h-10 sm:w-14 sm:h-14 border-2 border-amber-800/40 rounded-xl backdrop-blur-sm hidden lg:block will-change-transform"
								animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
								transition={{
									duration: 3.5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<motion.div
								className="absolute top-1/3 -right-6 sm:-right-10 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-500/50"
								style={{ transform: "translateZ(0)" }}
								animate={{
									scale: [1, 1.3, 1],
									opacity: [0.5, 1, 0.5],
								}}
								transition={{
									duration: 2.2,
									repeat: Infinity,
									ease: [0.4, 0, 0.2, 1],
								}}
							/>
							<motion.div
								className="absolute bottom-1/4 -left-4 sm:-left-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50"
								style={{ transform: "translateZ(0)" }}
								animate={{
									scale: [1, 1.3, 1],
									opacity: [0.5, 0.9, 0.5],
								}}
								transition={{
									duration: 2.5,
									repeat: Infinity,
									ease: [0.4, 0, 0.2, 1],
									delay: 0.5,
								}}
							/>
							<motion.div
								className="absolute -bottom-7 left-2/7 w-3.5 h-3.5 border border-amber-400/50 rounded-full hidden lg:block"
								style={{ transform: "translateZ(0)" }}
								animate={{ y: [0, -8, 0] }}
								transition={{
									duration: 2.8,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						</motion.div>
					</motion.aside>
				</div>
			</div>

			{/* Scroll Indicator - Hidden on mobile */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
				animate={{ y: [0, 8, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<div className="flex flex-col items-center gap-2">
					<span className="text-xs text-zinc-500 uppercase tracking-widest">
						Scroll
					</span>
					<div className="w-5 h-8 border border-zinc-600 rounded-full flex justify-center pt-2">
						<motion.div
							className="w-1 h-2 bg-amber-400 rounded-full"
							animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
					</div>
				</div>
			</motion.div>

			<BarLink />
		</motion.section>
	);
}
