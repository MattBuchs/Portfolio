"use client";

import { motion } from "framer-motion";
import { Code2, Lightbulb, Target, Zap } from "lucide-react";

export default function About() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delayChildren: 0.1, staggerChildren: 0.06 },
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
				stiffness: 120,
				damping: 18,
			},
		},
	};

	const cardVariants = {
		hidden: { scale: 0.95, opacity: 0 },
		visible: (idx) => ({
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: idx * 0.08,
			},
		}),
	};

	const highlights = [
		{
			icon: Code2,
			title: "Clean Code",
			desc: "Code maintenable et scalable",
		},
		{
			icon: Zap,
			title: "Performance",
			desc: "Applications rapides et optimisées",
		},
		{
			icon: Lightbulb,
			title: "Innovation",
			desc: "Solutions créatives et modernes",
		},
		{
			icon: Target,
			title: "Résultats",
			desc: "Objectifs atteints, clients satisfaits",
		},
	];

	return (
		<section className="relative py-24 md:py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/50 to-transparent" />

			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
					backgroundSize: "50px 50px",
				}}
			/>

			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{/* Header */}
					<motion.div
						variants={itemVariants}
						className="text-center mb-16"
					>
						<span className="inline-block px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
							À propos
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
							Qui suis-je
							<span className="text-gradient-warm"> ?</span>
						</h2>
					</motion.div>

					{/* Content Grid */}
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
						{/* Text Content */}
						<motion.div
							variants={itemVariants}
							className="space-y-4 sm:space-y-6"
						>
							<p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
								<strong className="text-white">
									Développeur web freelance
								</strong>
								, diplômé d&apos;un Bac +2 en développement web
								grâce à la formation en ligne O&apos;clock. Je
								possède une expertise solide en{" "}
								<span className="text-amber-400 font-medium">
									JavaScript, Node.js et React
								</span>
								.
							</p>
							<p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
								Actuellement, je conçois principalement des
								sites avec{" "}
								<strong className="text-zinc-300">
									Next.js, Tailwind CSS et Prisma
								</strong>
								, garantissant des solutions innovantes,
								performantes et esthétiques, tout en assurant
								une expérience utilisateur optimale.
							</p>
							<p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
								Ma passion pour les nouvelles technologies me
								pousse à explorer continuellement de nouveaux
								outils et frameworks, afin de proposer des
								solutions toujours plus adaptées aux besoins
								spécifiques de mes clients.
							</p>
						</motion.div>

						{/* Highlights Grid */}
						<motion.div
							variants={itemVariants}
							className="grid grid-cols-2 gap-3 sm:gap-4"
						>
							{highlights.map((item, idx) => {
								const Icon = item.icon;
								return (
									<motion.div
										key={idx}
										custom={idx}
										variants={cardVariants}
										className="card-dark p-4 sm:p-5 group cursor-default spotlight will-change-transform"
										whileHover={{ scale: 1.02, y: -3 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 25,
										}}
									>
										<motion.div
											className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-amber-500/20 transition-colors duration-200"
											whileHover={{
												rotate: 8,
												scale: 1.05,
											}}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 20,
											}}
										>
											<Icon
												size={18}
												className="text-amber-400 sm:w-5 sm:h-5"
											/>
										</motion.div>
										<h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
											{item.title}
										</h3>
										<p className="text-xs sm:text-sm text-zinc-500">
											{item.desc}
										</p>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
