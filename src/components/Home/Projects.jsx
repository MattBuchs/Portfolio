"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, FolderOpen, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delayChildren: 0.1, staggerChildren: 0.1 },
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
			},
		},
	};

	const cardVariants = {
		hidden: { scale: 0.95, opacity: 0, y: 20 },
		visible: (idx) => ({
			scale: 1,
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: idx * 0.08,
			},
		}),
	};

	// Show only first 4 projects on homepage
	const featuredProjects = projects.slice(0, 4);

	return (
		<section
			id="projects"
			className="relative py-24 md:py-32 overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(251,191,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.5) 1px, transparent 1px)`,
					backgroundSize: "50px 50px",
				}}
			/>

			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

			{/* Ambient light */}
			<div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

			<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{/* Header */}
					<motion.div
						variants={itemVariants}
						className="text-center mb-16"
					>
						<span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
							<FolderOpen size={16} />
							Portfolio
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Mes{" "}
							<span className="text-gradient-warm">Projets</span>
						</h2>
						<p className="text-zinc-400 max-w-2xl mx-auto text-lg">
							Découvrez une sélection de mes réalisations récentes
						</p>
					</motion.div>

					{/* Projects Grid */}
					<div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
						{featuredProjects.map((project, idx) => (
							<motion.article
								key={project.id}
								custom={idx}
								variants={cardVariants}
								className="group card-dark overflow-hidden will-change-transform"
								whileHover={{ y: -6 }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
								}}
							>
								{/* Image Container */}
								<div className="relative h-48 sm:h-56 overflow-hidden">
									<div
										className="absolute inset-0"
										style={{
											background: `linear-gradient(135deg, ${project.bgColor}40 0%, ${project.bgColor}20 100%)`,
										}}
									/>
									<Image
										src={`/img/${project.img}`}
										alt={project.title}
										fill
										className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

									{/* Project number badge */}
									<div className="absolute top-4 right-4 px-3 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full text-xs font-medium text-amber-400 border border-amber-500/20">
										#
										{project.id.toString().padStart(2, "0")}
									</div>
								</div>

								{/* Content */}
								<div className="p-5 sm:p-6">
									<h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">
										{project.title}
									</h3>
									<p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
										{project.paragraph}
									</p>

									{/* Actions */}
									<div className="flex items-center justify-between">
										<Link
											href={`/projects/${project.slug}`}
											className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group/link"
										>
											Voir le projet
											<ArrowRight
												size={16}
												className="group-hover/link:translate-x-1 transition-transform duration-200"
											/>
										</Link>

										<div className="flex items-center gap-2">
											{project.githubLink && (
												<motion.a
													href={project.githubLink}
													target="_blank"
													rel="noopener noreferrer"
													className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													aria-label="Voir sur GitHub"
												>
													<Github size={18} />
												</motion.a>
											)}
											{project.projectLink && (
												<motion.a
													href={project.projectLink}
													target="_blank"
													rel="noopener noreferrer"
													className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													aria-label="Voir le site"
												>
													<ExternalLink size={18} />
												</motion.a>
											)}
										</div>
									</div>
								</div>
							</motion.article>
						))}
					</div>

					{/* View All Button */}
					<motion.div variants={itemVariants} className="text-center">
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
								href="/projects"
								className="btn-outline inline-flex items-center gap-2 group"
							>
								Voir tous les projets
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform duration-200"
								/>
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
