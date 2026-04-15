"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle,
	Clock,
	Mail,
	MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function CTA() {
	return (
		<section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900" />
				<motion.div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
					style={{ transform: "translate(-50%, -50%) translateZ(0)" }}
					animate={{ opacity: [0.3, 0.5, 0.3] }}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 sm:w-72 h-48 sm:h-72 bg-orange-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
					style={{ transform: "translateZ(0)" }}
					animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-10 sm:bottom-20 -right-10 sm:-right-20 w-48 sm:w-72 h-48 sm:h-72 bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
					style={{ transform: "translateZ(0)" }}
					animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ type: "spring", stiffness: 100, damping: 15 }}
					className="text-center"
				>
					{/* Icon */}
					<motion.div
						className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-amber-500/10 rounded-xl sm:rounded-2xl border border-amber-500/20 mb-6 sm:mb-8"
						animate={{ y: [0, -6, 0] }}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						whileHover={{ scale: 1.08, rotate: 3 }}
					>
						<MessageSquare
							size={24}
							className="text-amber-400 sm:w-7 sm:h-7"
						/>
					</motion.div>

					{/* Title */}
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
						Un projet en tête
						<span className="text-gradient-warm"> ?</span>
					</h2>

					<p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
						Discutons de votre projet et voyons comment je peux vous
						aider à le concrétiser. Je suis disponible pour des
						missions freelance et toujours ouvert à de nouvelles
						collaborations.
					</p>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-12">
						<motion.div
							whileHover={{ scale: 1.02, y: -2 }}
							whileTap={{ scale: 0.98 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 25,
							}}
							className="w-full sm:w-auto"
						>
							<Link
								href="/contact"
								className="btn-warm inline-flex items-center justify-center gap-2 relative z-10 w-full sm:w-auto"
							>
								<Mail size={18} className="relative z-10" />
								<span className="relative z-10">
									Me Contacter
								</span>
								<ArrowRight
									size={18}
									className="relative z-10"
								/>
							</Link>
						</motion.div>

						<motion.a
							href="mailto:mattbuchs25@gmail.com"
							whileHover={{ scale: 1.02, y: -2 }}
							whileTap={{ scale: 0.98 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 25,
							}}
							className="btn-outline inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
						>
							mattbuchs25@gmail.com
						</motion.a>
					</div>

					{/* Trust Indicators */}
					<div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
						{[
							{
								icon: (
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{
											duration: 2,
											repeat: Infinity,
										}}
										className="w-2 h-2 bg-green-400 rounded-full"
									/>
								),
								text: "Disponible maintenant",
							},
							{
								icon: (
									<Clock
										size={16}
										className="text-amber-400"
									/>
								),
								text: "Réponse sous 24h",
							},
							{
								icon: (
									<CheckCircle
										size={16}
										className="text-amber-400"
									/>
								),
								text: "Devis gratuit",
							},
						].map((item, idx) => (
							<motion.div
								key={idx}
								className="flex items-center justify-center gap-2 text-sm text-zinc-400"
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1 }}
								viewport={{ once: true }}
							>
								{item.icon}
								<span>{item.text}</span>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
