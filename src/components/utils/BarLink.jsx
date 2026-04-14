"use client";

import { motion } from "framer-motion";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

export default function BarLink({ isBarVisible }) {
	const links = [
		{
			icon: Linkedin,
			href: "https://www.linkedin.com/in/matt-buchs/",
			label: "Profil LinkedIn",
			color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400",
		},
		{
			icon: Github,
			href: "https://github.com/MattBuchs",
			label: "Profil GitHub",
			color: "hover:bg-zinc-400/20 hover:border-zinc-400/50 hover:text-zinc-300",
		},
		{
			icon: Mail,
			href: "mailto:mattbuchs25@gmail.com",
			label: "Envoyer un email",
			color: "hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400",
		},
		{
			icon: FileText,
			href: "/files/Flyer.pdf",
			label: "Télécharger le flyer (PDF)",
			color: "hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400",
		},
	];

	return (
		<motion.div
			id="barLink"
			initial={{ x: -100, opacity: 0 }}
			animate={{
				x: isBarVisible ? 0 : -100,
				opacity: isBarVisible ? 1 : 0,
			}}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="hidden xl:flex fixed bottom-6 left-6 z-50"
		>
			<div className="flex flex-col gap-2 p-2 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl shadow-black/20">
				{links.map((link, idx) => {
					const Icon = link.icon;
					return (
						<motion.a
							key={idx}
							href={link.href}
							target={
								link.href.startsWith("http")
									? "_blank"
									: undefined
							}
							rel={
								link.href.startsWith("http")
									? "noopener noreferrer"
									: undefined
							}
							aria-label={link.label}
							title={link.label}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className={`w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 transition-all duration-200 ${link.color}`}
						>
							<Icon size={20} />
						</motion.a>
					);
				})}

				{/* Decorative line */}
				<div className="w-6 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto my-1" />

				{/* Status indicator */}
				<div className="flex items-center justify-center gap-1.5 px-2 py-1">
					<motion.div
						className="w-2 h-2 bg-green-400 rounded-full"
						animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<span className="text-[10px] text-zinc-500 font-medium">
						Dispo
					</span>
				</div>
			</div>
		</motion.div>
	);
}
