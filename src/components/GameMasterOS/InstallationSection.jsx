"use client";

import { Check, Monitor, Zap } from "lucide-react";

export default function InstallationSection() {
	return (
		<section className="py-28 px-6 relative overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/50 to-transparent" />

			{/* Ambient light */}
			<div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

			{/* Decorative lines */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="max-w-4xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="text-white">Installation en </span>
						<span className="text-gradient-warm">3 clics</span>
					</h2>
					<p className="text-xl text-zinc-400">
						Prêt à l&apos;emploi en moins de 2 minutes
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]">
						<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
							<Monitor className="w-5 h-5 text-amber-500" />
							Configuration requise
						</h3>
						<ul className="space-y-3 text-zinc-300">
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />
								Windows 10 / 11 (64 bits)
							</li>
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />4 Go
								de RAM recommandés
							</li>
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />2
								écrans conseillés
							</li>
						</ul>
					</div>

					<div className="group bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(251,191,36,0.1)]">
						<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
							<Zap className="w-5 h-5 text-amber-500" />
							Mise en route
						</h3>
						<ul className="space-y-3 text-zinc-300">
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />
								Installation en 3 clics
							</li>
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />
								Aucune connexion requise
							</li>
							<li className="flex items-center gap-3">
								<Check className="w-5 h-5 text-green-500" />
								Configuration automatique
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
