"use client";

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

export default function FeatureHighlights() {
	return (
		<section className="py-16 px-6 border-b border-zinc-800 relative overflow-hidden">
			{/* Subtle ambient light */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/3 rounded-full blur-3xl" />

			<div className="max-w-4xl mx-auto relative z-10">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{highlights.map((item) => (
						<div
							key={item.label}
							className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-zinc-800/50 border border-zinc-700/50 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]"
						>
							<div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
								<item.icon className="w-6 h-6 text-amber-500" />
							</div>
							<div className="text-center">
								<span className="block text-white font-semibold">
									{item.label}
								</span>
								<span className="text-xs text-zinc-500">
									{item.desc}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
