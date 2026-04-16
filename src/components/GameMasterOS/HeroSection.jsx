"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	Check,
	Crown,
	Download,
	Shield,
	Sparkles,
	Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({
	heroRef,
	heroOpacity,
	heroY,
	latestVersion,
	loadingVersion,
}) {
	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex flex-col px-6 overflow-hidden"
		>
			{/* Background Effects */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-amber-900/25 via-zinc-900 to-zinc-900" />

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
					className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl will-change-transform backface-hidden"
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
					className="absolute top-1/3 right-0 w-150 h-150 bg-amber-500/5 rounded-full blur-3xl will-change-transform backface-hidden"
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

			{/* Main Content - Centered vertically */}
			<div className="flex-1 flex flex-col justify-center pt-24 pb-8">
				<div className="max-w-7xl mx-auto w-full relative z-10">
					{/* Badge - Centered above both columns */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 150,
							damping: 20,
							delay: 0.05,
						}}
						className="flex justify-center md:mb-12"
					>
						<div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
							<Sparkles className="w-4 h-4" />
							Application de gestion pour Escape Games
						</div>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-24 3xl:gap-32 items-center">
						{/* Left Column - Text Content */}
						<motion.div
							style={{ opacity: heroOpacity, y: heroY }}
							className="text-center lg:text-left order-1 lg:order-1"
						>
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
								className="mb-6"
							>
								<Image
									src="/img/logo_gamemaster-os_white.png"
									width={500}
									height={200}
									loading="eager"
									alt="GameMaster OS Logo"
									className="w-64 md:w-80 lg:w-80 xl:w-96 mx-auto lg:mx-0"
								/>
							</motion.div>

							{/* Headline */}
							<motion.h1
								initial={{
									opacity: 0,
									y: 30,
									filter: "blur(6px)",
								}}
								animate={{
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
								}}
								transition={{
									type: "spring",
									stiffness: 80,
									damping: 18,
									delay: 0.25,
								}}
								className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 xl:mb-5 leading-tight"
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
								initial={{
									opacity: 0,
									y: 20,
									filter: "blur(4px)",
								}}
								animate={{
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
								}}
								transition={{
									type: "spring",
									stiffness: 80,
									damping: 18,
									delay: 0.35,
								}}
								className="text-base sm:text-lg lg:text-base xl:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-0 lg:mb-6 xl:mb-8 leading-relaxed"
							>
								Gérez vos timers, messages et ambiances sonores
								depuis une seule interface.
								<span className="text-white font-medium">
									{" "}
									Stable, local, sans abonnement.
								</span>
							</motion.p>

							{/* CTA Buttons - Hidden on mobile, shown on desktop */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 100,
									damping: 20,
									delay: 0.45,
								}}
								className="hidden lg:flex flex-row gap-3 xl:gap-4 justify-start items-center mb-6 xl:mb-8"
							>
								<a
									href={
										latestVersion
											? `/downloads/${latestVersion.fileName}`
											: "/downloads/GameMasterOS_Setup.exe"
									}
									download
									className="btn-warm-gmos group flex items-center gap-2 text-base xl:text-lg px-6 xl:px-8 py-3 xl:py-4"
								>
									<Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
									Télécharger gratuitement
									<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
								</a>

								<a
									href="#pricing"
									className="btn-outline flex items-center gap-2 text-base xl:text-lg px-6 xl:px-8 py-3 xl:py-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
								>
									<Crown className="w-5 h-5" />
									Voir les offres PRO
								</a>
							</motion.div>

							{/* Version info - Hidden on mobile, shown on desktop */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 100,
									damping: 20,
									delay: 0.6,
								}}
								className="hidden lg:flex flex-wrap justify-start gap-3 xl:gap-4 text-xs xl:text-sm text-zinc-500"
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
						</motion.div>

						{/* Right Column - Screenshot */}
						<motion.div
							initial={{
								opacity: 0,
								x: 20,
								scale: 0.95,
							}}
							animate={{
								opacity: 1,
								x: 0,
								scale: 1,
							}}
							transition={{
								type: "spring",
								stiffness: 60,
								damping: 20,
								delay: 0.3,
							}}
							className="relative order-2 lg:order-2 w-full sm:w-3/4 xl:w-[80%] 2xl:w-full mx-auto sm:my-8 lg:my-0 group/screenshot"
						>
							{/* Glow effect behind screenshot */}
							<div className="absolute -inset-4 bg-linear-to-r from-amber-500/20 via-orange-500/10 to-transparent rounded-3xl blur-2xl transition-all duration-500 group-hover/screenshot:from-amber-500/30 group-hover/screenshot:via-orange-500/20" />

							{/* Main screenshot */}
							<div className="relative transition-all duration-500 ease-out group-hover/screenshot:-translate-y-2 group-hover/screenshot:scale-[1.02]">
								<div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-amber-500/10 bg-zinc-800 transition-all duration-500 group-hover/screenshot:border-amber-500/30 group-hover/screenshot:shadow-[0_35px_60px_-15px_rgba(251,191,36,0.25)]">
									{/* Window bar */}
									<div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-zinc-900/80 border-b border-zinc-700/50">
										<div className="flex gap-1 sm:gap-1.5">
											<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80 transition-all duration-300 group-hover/screenshot:bg-red-500 group-hover/screenshot:shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
											<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 transition-all duration-300 group-hover/screenshot:bg-yellow-500 group-hover/screenshot:shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
											<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80 transition-all duration-300 group-hover/screenshot:bg-green-500 group-hover/screenshot:shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
										</div>
										<span className="text-[10px] sm:text-xs text-zinc-500 ml-2 transition-colors duration-300 group-hover/screenshot:text-zinc-400">
											GameMaster OS
										</span>
									</div>

									{/* Screenshot image with shine effect */}
									<div className="relative overflow-hidden">
										<Image
											src="/img/screenshots/dashboard.png"
											width={800}
											height={500}
											alt="GameMaster OS - Interface principale"
											className="w-full h-auto transition-transform duration-700 group-hover/screenshot:scale-[1.02]"
											priority
										/>
										{/* Shine effect on hover */}
										<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/screenshot:translate-x-full transition-transform duration-1000 ease-out" />
									</div>
								</div>

								{/* Floating feature cards - Hidden on small screens */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
									className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700/50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-xl hidden sm:block transition-all duration-500 group-hover/screenshot:-translate-x-2 group-hover/screenshot:-translate-y-1 group-hover/screenshot:border-amber-500/30 group-hover/screenshot:shadow-amber-500/20"
								>
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center transition-all duration-300 group-hover/screenshot:bg-amber-500/30 group-hover/screenshot:scale-110">
											<Timer className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
										</div>
										<div>
											<div className="text-white font-semibold text-xs sm:text-sm">
												Multi-timers
											</div>
											<div className="text-zinc-500 text-[10px] sm:text-xs">
												Gérez plusieurs salles
											</div>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 1 }}
									className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700/50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-xl hidden sm:block transition-all duration-500 group-hover/screenshot:translate-x-2 group-hover/screenshot:-translate-y-1 group-hover/screenshot:border-green-500/30 group-hover/screenshot:shadow-green-500/20"
								>
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center transition-all duration-300 group-hover/screenshot:bg-green-500/30 group-hover/screenshot:scale-110">
											<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
										</div>
										<div>
											<div className="text-white font-semibold text-xs sm:text-sm">
												100% Offline
											</div>
											<div className="text-zinc-500 text-[10px] sm:text-xs">
												Aucune dépendance
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</motion.div>

						{/* Mobile CTA Buttons - Only visible on mobile */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								stiffness: 100,
								damping: 20,
								delay: 0.45,
							}}
							className="flex lg:hidden flex-col gap-4 justify-center items-center order-3 text-center mt-2"
						>
							{/* Buttons row */}
							<div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
								<a
									href={
										latestVersion
											? `/downloads/${latestVersion.fileName}`
											: "/downloads/GameMasterOS_Setup.exe"
									}
									download
									className="btn-warm-gmos group flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto"
								>
									<Download className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
									Télécharger gratuitement
									<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
								</a>

								<a
									href="#pricing"
									className="btn-outline flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
								>
									<Crown className="w-4 h-4 sm:w-5 sm:h-5" />
									Voir les offres PRO
								</a>
							</div>

							{/* Version info mobile - Inline compact */}
							<div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-zinc-500">
								<span className="flex items-center gap-1">
									<Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
									Windows 10/11
								</span>
								<span className="text-zinc-600">•</span>
								<span className="flex items-center gap-1">
									<Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
									{loadingVersion
										? "v1.0.0"
										: `v${latestVersion?.version}`}
								</span>
								<span className="text-zinc-600">•</span>
								<Link
									href="/gamemaster-os/versions"
									className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
								>
									Notes de version
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator - Fixed at bottom */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.5 }}
				className="pb-8 hidden lg:flex justify-center"
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
		</section>
	);
}
