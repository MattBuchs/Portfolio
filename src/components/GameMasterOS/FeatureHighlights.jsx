"use client";

import { motion } from "framer-motion";
import { Check, MessageSquare, Monitor, Music } from "lucide-react";

const highlights = [
	{
		icon: Check,
		label: "Gratuit",
		desc: "Version de base sans coût",
	},
	{
		icon: Monitor,
		label: "Double écran",
		desc: "GM + Joueurs",
	},
	{
		icon: Music,
		label: "Audio intégré",
		desc: "Sons & ambiances",
	},
	{
		icon: MessageSquare,
		label: "Support réactif",
		desc: "Assistance dédiée",
	},
];

// Wave animation - each card pops up with a wave effect
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 40,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 15,
		},
	},
};

export default function FeatureHighlights() {
	return (
		<section className="py-16 px-6 border-b border-zinc-800 relative overflow-hidden">
			{/* Subtle ambient light */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/3 rounded-full blur-3xl" />

			<div className="max-w-4xl mx-auto relative z-10">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					className="grid grid-cols-2 md:grid-cols-4 gap-4"
				>
					{highlights.map((item, index) => (
						<motion.div
							key={item.label}
							variants={itemVariants}
							whileHover={{
								y: -6,
								scale: 1.03,
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 25,
								},
							}}
							className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-zinc-800/50 border border-zinc-700/50 cursor-default transition-colors duration-300 hover:border-amber-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]"
						>
							<div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500/20">
								<item.icon className="w-6 h-6 text-amber-500" />
							</div>
							<div className="text-center">
								<span className="block text-white font-semibold">
									{item.label}
								</span>
								<span className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
									{item.desc}
								</span>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
