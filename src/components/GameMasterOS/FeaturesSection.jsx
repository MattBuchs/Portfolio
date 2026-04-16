"use client";

import {
	MessageSquare,
	Monitor,
	Music,
	Palette,
	Shield,
	Timer,
} from "lucide-react";

const features = [
	{
		icon: Timer,
		title: "Contrôle total en temps réel",
		description:
			"Gestion de plusieurs timers, pause, alarmes personnalisées, dépassement géré automatiquement",
	},
	{
		icon: MessageSquare,
		title: "Messages et indices",
		description:
			"Envoi d'indices en un clic, catégories personnalisées, icônes visuelles pour plus d'impact",
	},
	{
		icon: Music,
		title: "Gestion audio intégrée",
		description:
			"Musiques d'ambiance, sons d'indices, alarme de fin personnalisable, import libre de MP3",
	},
	{
		icon: Palette,
		title: "Thèmes professionnels",
		description:
			"Personnalisation avancée, éditeur de thème, interface cohérente avec votre marque",
	},
	{
		icon: Shield,
		title: "Fiabilité avant tout",
		description:
			"Fonctionnement entièrement hors ligne, stabilité garantie, pas de dépendance internet",
	},
	{
		icon: Monitor,
		title: "Interface joueur immersive",
		description:
			"Affichage automatique plein écran sur second écran, timer lisible à distance",
	},
];

export default function FeaturesSection() {
	return (
		<section className="py-28 px-6 relative overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-zinc-800/40" />

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Conçu pour les </span>
						<span className="text-gradient-warm">
							vrais besoins du terrain
						</span>
					</h2>
					<p className="text-xl text-zinc-400 max-w-2xl mx-auto">
						GameMaster OS résout les problèmes que vous rencontrez
						chaque jour
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group card-dark cursor-default transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.15)]"
						>
							<div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
								<feature.icon className="w-7 h-7 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-zinc-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
