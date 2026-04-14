"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
	{
		id: 1,
		icon: Code,
		title: "Développement Web Sur Mesure",
		description:
			"Je crée des sites web personnalisés, adaptés à votre identité et vos besoins. Chaque projet offre une expérience utilisateur intuitive et un design moderne.",
		image: "/img/illustration/illustration-conception-de-sites-web-personnalisés.jpg",
		features: [
			"Sites vitrines",
			"Applications web",
			"E-commerce",
			"Dashboards",
		],
	},
	{
		id: 2,
		icon: Search,
		title: "Optimisation SEO & Performance",
		description:
			"Un site performant et bien référencé est essentiel. J'optimise la vitesse, la structure et le contenu pour améliorer votre visibilité sur les moteurs de recherche.",
		image: "/img/illustration/illustration-seo.png",
		features: [
			"Audit SEO",
			"Optimisation vitesse",
			"Core Web Vitals",
			"Analytics",
		],
	},
	{
		id: 3,
		icon: Settings,
		title: "Maintenance & Support",
		description:
			"Pour assurer la pérennité de votre site, j'offre des services de maintenance régulière : mises à jour, sécurité, corrections et support technique réactif.",
		image: "/img/illustration/illustration-maintenance.jpg",
		features: ["Mises à jour", "Sécurité", "Backups", "Support 24/7"],
	},
];

export default function Services() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delayChildren: 0.1, staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { y: 25, opacity: 0, filter: "blur(4px)" },
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
		hidden: { scale: 0.96, opacity: 0, y: 20 },
		visible: (idx) => ({
			scale: 1,
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: idx * 0.1,
			},
		}),
	};

	return (
		<section className="relative py-24 md:py-32 overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

			{/* Ambient light */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />

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
						className="text-center mb-16 md:mb-20"
					>
						<span className="inline-block px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
							Mes Services
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Ce que je peux faire{" "}
							<span className="text-gradient-warm">
								pour vous
							</span>
						</h2>
						<p className="text-zinc-400 max-w-2xl mx-auto text-lg">
							Des solutions complètes pour donner vie à vos
							projets digitaux
						</p>
					</motion.div>

					{/* Services Grid */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
						{services.map((service, idx) => {
							const Icon = service.icon;
							return (
								<motion.article
									key={service.id}
									custom={idx}
									variants={cardVariants}
									className="group card-dark overflow-hidden spotlight will-change-transform"
									whileHover={{ y: -6 }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 20,
									}}
								>
									{/* Image */}
									<div className="relative h-40 sm:h-48 overflow-hidden">
										<Image
											src={service.image}
											alt={service.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

										{/* Icon Badge */}
										<motion.div
											className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4"
											whileHover={{
												scale: 1.08,
												rotate: 3,
											}}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 20,
											}}
										>
											<div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-500/30 transition-colors">
												<Icon
													size={20}
													className="text-amber-400 sm:w-6 sm:h-6"
												/>
											</div>
										</motion.div>
									</div>

									{/* Content */}
									<div className="p-4 sm:p-6">
										<h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-400 transition-colors">
											{service.title}
										</h3>
										<p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
											{service.description}
										</p>

										{/* Features */}
										<div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
											{service.features.map((feature) => (
												<span
													key={feature}
													className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
												>
													{feature}
												</span>
											))}
										</div>

										{/* CTA */}
										<Link
											href="/contact"
											className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group/link"
										>
											Demander un devis
											<ArrowRight
												size={14}
												className="group-hover/link:translate-x-1 transition-transform sm:w-4 sm:h-4"
											/>
										</Link>
									</div>
								</motion.article>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
