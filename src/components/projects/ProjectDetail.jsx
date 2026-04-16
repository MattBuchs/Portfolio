"use client";

import { motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	ExternalLink,
	Github,
	Hash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetail({ project }) {
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

	return (
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
				{/* Ambient light with project color */}
				<div
					className="absolute top-20 -right-40 w-150 h-150 rounded-full blur-3xl opacity-20"
					style={{ background: project.bgColor }}
				/>
				<div className="absolute bottom-20 -left-40 w-100 h-100 bg-amber-500/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Back Link */}
					<motion.div variants={itemVariants} className="mb-8">
						<Link
							href="/projects"
							className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors group"
						>
							<ArrowLeft
								size={18}
								className="group-hover:-translate-x-1 transition-transform"
							/>
							Retour aux projets
						</Link>
					</motion.div>

					{/* Header with Image */}
					<motion.div
						variants={itemVariants}
						className="relative rounded-2xl overflow-hidden mb-10"
					>
						<div
							className="relative h-64 sm:h-80 md:h-96"
							style={{
								background: `linear-gradient(135deg, ${project.bgColor}60 0%, ${project.bgColor}30 50%, transparent 100%)`,
							}}
						>
							<Image
								src={`/img/${project.img}`}
								alt={project.title}
								fill
								sizes="100vw"
								className="object-contain p-6 sm:p-10"
								priority
							/>
							<div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
						</div>

						{/* Project badge */}
						<div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm rounded-full border border-amber-500/20">
							<Hash size={14} className="text-amber-400" />
							<span className="text-sm font-medium text-amber-400">
								Projet {project.id.toString().padStart(2, "0")}
							</span>
						</div>
					</motion.div>

					{/* Content Grid */}
					<div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
						{/* Main Content */}
						<motion.div
							variants={itemVariants}
							className="lg:col-span-2 space-y-8"
						>
							{/* Title */}
							<div>
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
									{project.title}
								</h1>
								<p className="text-lg sm:text-xl text-amber-400 font-medium">
									{project.paragraph}
								</p>
							</div>

							{/* Description */}
							<div className="card-dark p-6 sm:p-8">
								<h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
									<span className="w-1 h-6 bg-amber-500 rounded-full"></span>
									À propos du projet
								</h2>
								<p className="text-zinc-300 leading-relaxed whitespace-pre-line">
									{project.description}
								</p>
							</div>
						</motion.div>

						{/* Sidebar */}
						<motion.aside
							variants={itemVariants}
							className="space-y-6"
						>
							{/* Actions Card */}
							<div className="card-dark p-6 space-y-4">
								<h3 className="font-semibold text-white mb-4">
									Liens du projet
								</h3>

								{project.projectLink && (
									<motion.a
										href={project.projectLink}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-xl transition-colors"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 25,
										}}
									>
										<ExternalLink size={18} />
										Voir le site
									</motion.a>
								)}

								{project.githubLink && (
									<motion.a
										href={project.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl border border-zinc-700 hover:border-zinc-600 transition-colors"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 25,
										}}
									>
										<Github size={18} />
										Voir sur GitHub
									</motion.a>
								)}

								{!project.projectLink &&
									!project.githubLink && (
										<p className="text-zinc-500 text-sm text-center py-2">
											Projet privé ou en cours de
											développement
										</p>
									)}
							</div>

							{/* Contact CTA */}
							<div className="card-dark p-6 border border-amber-500/20">
								<h3 className="font-semibold text-white mb-2">
									Vous avez aimé ce projet ?
								</h3>
								<p className="text-zinc-400 text-sm mb-4">
									Discutons de vos idées ou projets
									similaires.
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
										className="btn-outline w-full flex items-center justify-center gap-2 text-sm"
									>
										Me contacter
										<ArrowRight size={16} />
									</Link>
								</motion.div>
							</div>
						</motion.aside>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
