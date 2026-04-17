"use client";

import Footer from "@/components/Footer";
import Form from "@/components/Form";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
	const contactInfo = [
		{
			icon: Mail,
			label: "Email",
			value: "mattbuchs25@gmail.com",
			href: "mailto:mattbuchs25@gmail.com",
		},
		{
			icon: Phone,
			label: "Téléphone",
			value: "06 64 93 52 94",
			href: "tel:0664935294",
		},
		{
			icon: MapPin,
			label: "Localisation",
			value: "25300 Arçon, France",
			href: null,
		},
		{
			icon: Clock,
			label: "Disponibilité",
			value: "Lun - Ven : 9h - 18h",
			href: null,
		},
	];

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
		<>
			<NavBar />
			<main className="min-h-screen py-24 overflow-hidden">
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
					<div className="absolute top-20 -right-40 w-125 h-125 bg-amber-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-20 -left-40 w-100 h-100 bg-orange-500/10 rounded-full blur-3xl" />
				</div>

				<div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Back Link */}
						<motion.div variants={itemVariants} className="mb-8">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors group"
							>
								<ArrowLeft
									size={18}
									className="group-hover:-translate-x-1 transition-transform"
								/>
								Retour à l&apos;accueil
							</Link>
						</motion.div>

						{/* Header */}
						<motion.div
							variants={itemVariants}
							className="text-center mb-16"
						>
							<motion.div
								className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-6"
								whileHover={{ scale: 1.05, rotate: 5 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 25,
								}}
							>
								<Send className="text-amber-400" size={28} />
							</motion.div>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
								Contactez
								<span className="text-gradient-warm">-moi</span>
							</h1>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								Un projet en tête ? N&apos;hésitez pas à me
								contacter. Je réponds généralement sous 24h.
							</p>
						</motion.div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Contact Info Cards */}
							<motion.div
								variants={itemVariants}
								className="lg:col-span-1 space-y-4"
							>
								{contactInfo.map((info, index) => {
									const Icon = info.icon;
									return (
										<motion.div
											key={info.label}
											variants={itemVariants}
											whileHover={{ scale: 1.02, y: -2 }}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 25,
											}}
											className="card-dark p-5 group"
										>
											<div className="flex items-start gap-4">
												<div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
													<Icon
														size={20}
														className="text-amber-400"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<h2 className="font-semibold text-white mb-1">
														{info.label}
													</h2>
													{info.href ? (
														<a
															href={info.href}
															className="text-zinc-400 hover:text-amber-400 transition-colors break-all"
														>
															{info.value}
														</a>
													) : (
														<p className="text-zinc-400">
															{info.value}
														</p>
													)}
												</div>
											</div>
										</motion.div>
									);
								})}
							</motion.div>

							{/* Form */}
							<motion.div
								variants={itemVariants}
								className="lg:col-span-2"
							>
								<div className="card-dark p-6 sm:p-8">
									<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
										<span className="w-1 h-6 bg-amber-500 rounded-full"></span>
										Envoyez-moi un message
									</h2>
									<Form />
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	);
}
