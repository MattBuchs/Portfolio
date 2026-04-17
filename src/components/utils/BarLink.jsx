"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/matt-buchs/",
		label: "Profil LinkedIn",
	},
	{
		icon: Github,
		href: "https://github.com/MattBuchs",
		label: "Profil GitHub",
	},
	{
		icon: Mail,
		href: "mailto:mattbuchs25@gmail.com",
		label: "Envoyer un email",
	},
	{
		icon: FileText,
		href: "/files/Flyer.pdf",
		label: "Télécharger le flyer (PDF)",
	},
];

function LinksPanel({ className = "" }) {
	return (
		<div
			className={`flex flex-col gap-2 p-2 bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl shadow-black/20 ${className}`}
		>
			{links.map((link, idx) => {
				const Icon = link.icon;
				return (
					<a
						key={idx}
						href={link.href}
						target={
							link.href.startsWith("http") ? "_blank" : undefined
						}
						rel={
							link.href.startsWith("http")
								? "noopener noreferrer"
								: undefined
						}
						aria-label={link.label}
						title={link.label}
						className="group w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 transition-all duration-300 ease-out hover:scale-110 hover:bg-linear-to-br hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)] active:scale-95"
					>
						<Icon
							size={20}
							className="transition-transform duration-300 group-hover:rotate-6"
						/>
					</a>
				);
			})}

			{/* Decorative line */}
			<div className="w-6 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent mx-auto my-1" />

			{/* Status indicator */}
			<div className="flex items-center justify-center gap-1.5 px-2 py-1">
				<motion.div
					className="w-2 h-2 bg-green-400 rounded-full"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.7, 1, 0.7],
					}}
					transition={{ duration: 2, repeat: Infinity }}
				/>
				<span className="text-[10px] text-zinc-500 font-medium">
					Dispo
				</span>
			</div>
		</div>
	);
}

export default function BarLink() {
	const [isOpen, setIsOpen] = useState(false);

	// Fermer le panneau quand on passe en grand écran
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1280) {
				setIsOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			{/* Version toujours visible sur grands écrans */}
			<div className="hidden 1.5xl:block fixed bottom-6 left-6 z-50">
				<LinksPanel />
			</div>

			{/* Version avec toggle sur écrans moyens */}
			<div className="hidden md:block 1.5xl:hidden fixed bottom-12 left-0 z-50">
				{/* Toggle Button */}
				<motion.button
					onClick={() => setIsOpen(!isOpen)}
					className="absolute z-30 left-0 top-1/2 -translate-y-1/2 w-6 h-16 bg-zinc-900/90 backdrop-blur-xl border border-l-0 border-zinc-700/50 rounded-r-xl flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer 1.5xl:hidden"
					animate={{ x: isOpen ? 68 : 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					aria-label={
						isOpen ? "Fermer les liens" : "Ouvrir les liens"
					}
					title={isOpen ? "Fermer" : "Liens rapides"}
				>
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						<ChevronRight size={16} />
					</motion.div>
				</motion.button>

				{/* Links Panel */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							id="barLink"
							initial={{ x: -80, opacity: 0 }}
							animate={{ x: 6, opacity: 1 }}
							exit={{ x: -80, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
						>
							<LinksPanel />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
