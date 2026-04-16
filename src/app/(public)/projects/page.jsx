"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
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
				delay: idx * 0.06,
			},
		}),
	};

	return (
		<>
			<NavBar />
			<main className="min-h-screen pt-24 pb-16 overflow-hidden">
				{/* Background */}
				<div className="fixed inset-0 -z-10">
					<div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-zinc-900/95 to-zinc-900" />
					<div
						className="absolute inset-0 opacity-[0.02]"
						style={{
							backgroundImage: `linear-gradient(rgba(251,191,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.5) 1px, transparent 1px)`,
							backgroundSize: "60px 60px",
						}}
					/>
					{/* Ambient lights */}
					<div className="absolute top-20 -left-40 w-125 h-125 bg-amber-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-20 -right-40 w-125 h-125 bg-orange-500/10 rounded-full blur-3xl" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Header */}
						<motion.div
							variants={itemVariants}
							className="text-center mb-16"
						>
							<span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mt-8 md:mt-14 mb-4">
								<FolderOpen size={16} />
								Portfolio
							</span>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
								Mes meilleurs{" "}
								<span className="text-gradient-warm">
									Projets
								</span>
							</h1>
							<p className="text-zinc-400 max-w-2xl mx-auto text-lg">
								Explorez l&apos;ensemble de mes réalisations, du
								développement web aux applications
							</p>
						</motion.div>

						{/* Projects Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
							{projects.map((project, idx) => (
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
									<div className="relative h-44 sm:h-52 overflow-hidden">
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${project.bgColor}50 0%, ${project.bgColor}20 100%)`,
											}}
										/>
										<Image
											src={`/img/${project.img}`}
											alt={project.title}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
											className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
											loading="eager"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

										{/* Project number badge */}
										<div className="absolute top-4 right-4 px-3 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full text-xs font-medium text-amber-400 border border-amber-500/20">
											#
											{project.id
												.toString()
												.padStart(2, "0")}
										</div>
									</div>

									{/* Content */}
									<div
										className="p-5 sm:p-6 flex flex-col justify-between"
										style={{
											height: "calc(100% - 185px)", // Adjust height based on image container
										}}
									>
										<div>
											<h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">
												{project.title}
											</h2>
											<p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">
												{project.paragraph}
											</p>
										</div>

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
														href={
															project.githubLink
														}
														target="_blank"
														rel="noopener noreferrer"
														className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
														whileHover={{
															scale: 1.05,
														}}
														whileTap={{
															scale: 0.95,
														}}
														aria-label="Voir sur GitHub"
													>
														<Github size={16} />
													</motion.a>
												)}
												{project.projectLink && (
													<motion.a
														href={
															project.projectLink
														}
														target="_blank"
														rel="noopener noreferrer"
														className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
														whileHover={{
															scale: 1.05,
														}}
														whileTap={{
															scale: 0.95,
														}}
														aria-label="Voir le site"
													>
														<ExternalLink
															size={16}
														/>
													</motion.a>
												)}
											</div>
										</div>
									</div>
								</motion.article>
							))}
						</div>

						{/* CTA Section */}
						<motion.div
							variants={itemVariants}
							className="mt-20 text-center"
						>
							<div className="card-dark p-8 sm:p-12 max-w-2xl mx-auto">
								<h3 className="text-2xl font-bold mb-4">
									Un projet en tête
									<span className="text-gradient-warm">
										{" "}
										?
									</span>
								</h3>
								<p className="text-zinc-400 mb-6">
									Discutons de votre projet et voyons comment
									je peux vous aider à le concrétiser.
								</p>
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
										className="btn-warm inline-flex items-center gap-2"
									>
										Me contacter
										<ArrowRight size={18} />
									</Link>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	);
}
