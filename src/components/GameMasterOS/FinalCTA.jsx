"use client";

import { motion } from "framer-motion";
import { Crown, Download } from "lucide-react";

export default function FinalCTA({ latestVersion }) {
	return (
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
							Téléchargez la version gratuite et découvrez un
							outil pensé pour les professionnels de l&apos;Escape
							Game
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
	);
}
