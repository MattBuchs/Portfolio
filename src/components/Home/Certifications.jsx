"use client";

import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle2, GraduationCap } from "lucide-react";

const certifications = [
	{
		id: 1,
		name: "Développeur Web et Web Mobile",
		organization: "O'clock - École en ligne",
		level: "Titre RNCP Niveau 5 (Bac +2)",
		year: "2022",
		verified: true,
		skills: ["React", "Node.js", "JavaScript", "HTML/CSS", "SQL"],
	},
];

export default function Certifications() {
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

	return (
		<section className="relative py-24 md:py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

			<div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
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
						<span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
							<GraduationCap size={16} />
							Formation
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Ma{" "}
							<span className="text-gradient-warm">
								Formation
							</span>
						</h2>
						<p className="text-zinc-400 max-w-xl mx-auto">
							Diplômé en développement web avec une formation
							intensive et certifiante
						</p>
					</motion.div>

					{/* Certifications */}
					<div className="space-y-6">
						{certifications.map((cert) => (
							<motion.article
								key={cert.id}
								variants={itemVariants}
								className="group card-dark p-6 md:p-8 relative overflow-hidden will-change-transform"
								whileHover={{ y: -4 }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
								}}
							>
								{/* Glow effect on hover */}
								<div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								<div className="relative z-10">
									<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
										<div className="flex items-start gap-4">
											{/* Icon */}
											<div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
												<Award
													size={28}
													className="text-amber-400"
												/>
											</div>

											{/* Info */}
											<div>
												<div className="flex items-center gap-2 flex-wrap mb-1">
													<h3 className="text-xl md:text-2xl font-bold text-white">
														{cert.name}
													</h3>
													{cert.verified && (
														<CheckCircle2
															size={20}
															className="text-amber-400"
														/>
													)}
												</div>
												<p className="text-amber-400 font-medium mb-1">
													{cert.organization}
												</p>
												<p className="text-zinc-500 text-sm">
													{cert.level}
												</p>
											</div>
										</div>

										{/* Year Badge */}
										<div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
											<Calendar
												size={16}
												className="text-amber-400"
											/>
											<span className="font-bold text-amber-400">
												{cert.year}
											</span>
										</div>
									</div>

									{/* Skills */}
									<div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
										{cert.skills.map((skill) => (
											<span
												key={skill}
												className="px-3 py-1.5 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</motion.article>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
