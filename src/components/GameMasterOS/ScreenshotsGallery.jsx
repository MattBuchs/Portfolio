"use client";

import { Search } from "lucide-react";
import Image from "next/image";

const screenshots = [
	{
		src: "/img/screenshots/dashboard.png",
		alt: "Dashboard Game Master - Vue d'ensemble de l'application",
		label: "Dashboard Game Master",
		description:
			"Vue d'ensemble : timers, salles actives, contrôles rapides",
	},
	{
		src: "/img/screenshots/gestion-timer.png",
		alt: "Gestion des timers en temps réel",
		label: "Gestion des timers",
		description: "Ajout/retrait de temps, pause, reset, alarmes",
	},
	{
		src: "/img/screenshots/ecran-joueur.png",
		alt: "Interface joueur sur TV",
		label: "Écran joueurs",
		description: "Affichage immersif sur TV : timer + messages",
	},
];

export default function ScreenshotsGallery({ onImageClick }) {
	return (
		<section className="py-28 px-6 bg-zinc-800/30 relative overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />

			{/* Ambient light */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-amber-500/5 rounded-full blur-3xl" />

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Aperçu de </span>
						<span className="text-gradient-warm">
							l&apos;interface
						</span>
					</h2>
					<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
						Découvrez une interface pensée pour l&apos;efficacité
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{screenshots.map((shot, index) => (
						<div
							key={index}
							onClick={() => onImageClick(shot)}
							className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]"
						>
							<div className="relative rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-800 transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.15)]">
								<div className="aspect-video relative overflow-hidden">
									<Image
										src={shot.src}
										alt={shot.alt}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
									<div className="absolute bottom-3 right-3 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-sm rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
										<Search className="w-3.5 h-3.5" />
										Cliquez pour agrandir
									</div>
								</div>
								<div className="p-5">
									<h3 className="text-lg font-bold text-white mb-1">
										{shot.label}
									</h3>
									<p className="text-sm text-zinc-400">
										{shot.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
