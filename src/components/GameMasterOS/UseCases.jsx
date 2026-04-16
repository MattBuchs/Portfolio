"use client";

import { MessageSquare, Music, Shield, Timer } from "lucide-react";

const useCases = [
	{
		icon: Timer,
		title: "Quiz & Soirées",
		description: "Compte à rebours, annonces, sons synchronisés",
	},
	{
		icon: MessageSquare,
		title: "Formations",
		description: "Timeboxing, rappels visuels, consignes projetées",
	},
	{
		icon: Music,
		title: "Événements",
		description: "Ambiances, jingles, transitions pilotées",
	},
	{
		icon: Shield,
		title: "Lieux offline",
		description: "Fonctionne sans connexion internet",
	},
];

export default function UseCases() {
	return (
		<section className="py-28 px-6 relative overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/80 to-transparent" />

			{/* Grid Pattern */}
			<div
				className="absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

			<div className="max-w-5xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
						Au-delà des Escape Games
					</span>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Un outil </span>
						<span className="text-gradient-warm">polyvalent</span>
					</h2>
					<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
						Dès qu&apos;il faut gérer un timing ou envoyer des
						messages, GameMaster OS fait le job
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{useCases.map((useCase, index) => (
						<div
							key={index}
							className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/30 hover:bg-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]"
						>
							<div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
								<useCase.icon className="w-5 h-5 text-orange-400" />
							</div>
							<h3 className="font-bold text-white mb-1">
								{useCase.title}
							</h3>
							<p className="text-sm text-zinc-400">
								{useCase.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
