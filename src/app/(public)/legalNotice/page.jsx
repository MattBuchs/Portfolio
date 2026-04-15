"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function LegalNotice() {
	return (
		<>
			<NavBar />
			<main className="bg-zinc-900 min-h-screen pt-28 pb-20 relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-zinc-900" />

					{/* Animated Gradient Orbs */}
					<motion.div
						className="absolute top-20 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, 50, 0],
							y: [0, 30, 0],
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-20 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, -40, 0],
							y: [0, -20, 0],
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>

					{/* Grid Pattern */}
					<div
						className="absolute inset-0 opacity-[0.02]"
						style={{
							backgroundImage: `linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)`,
							backgroundSize: "60px 60px",
						}}
					/>
				</div>

				<div className="max-w-4xl mx-auto px-5 md:px-10">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-full mb-4">
							<Shield className="text-amber-400" size={32} />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
							Mentions Légales
						</h1>
						<p className="text-lg text-zinc-400">
							Dernière mise à jour : 21 novembre 2025
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-8 md:p-12 space-y-8"
					>
						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								1. Éditeur du site
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>
									<strong className="text-white">
										Nom :
									</strong>{" "}
									Matt Buchs
								</p>
								<p>
									<strong className="text-white">
										Statut :
									</strong>{" "}
									Auto-entrepreneur
								</p>
								<p>
									<strong className="text-white">
										Adresse :
									</strong>{" "}
									25300 Arçon, France
								</p>
								<p>
									<strong className="text-white">
										Email :
									</strong>{" "}
									<a
										href="mailto:mattbuchs25@gmail.com"
										className="text-amber-400 hover:text-amber-300 hover:underline"
									>
										mattbuchs25@gmail.com
									</a>
								</p>
								<p>
									<strong className="text-white">
										Téléphone :
									</strong>{" "}
									<a
										href="tel:0664935294"
										className="text-amber-400 hover:text-amber-300 hover:underline"
									>
										06 64 93 52 94
									</a>
								</p>
								<p>
									<strong className="text-white">
										SIRET :
									</strong>{" "}
									93948022400012
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								2. Hébergement
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>Ce site est hébergé par :</p>
								<p>
									<strong className="text-white">
										GitHub Pages
									</strong>
								</p>
								<p>
									88 Colin P Kelly Jr Street, San Francisco,
									CA 94107, États-Unis
								</p>
								<p>
									Site web :{" "}
									<a
										href="https://pages.github.com"
										target="_blank"
										rel="noopener noreferrer"
										className="text-amber-400 hover:text-amber-300 hover:underline"
									>
										https://pages.github.com
									</a>
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								3. Propriété intellectuelle
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								L&apos;ensemble du contenu de ce site (textes,
								images, vidéos, design, logos) est la propriété
								exclusive de Matt Buchs, sauf mention contraire.
								Toute reproduction, distribution, modification
								ou utilisation sans autorisation préalable est
								strictement interdite et constitue une
								contrefaçon sanctionnée par le Code de la
								propriété intellectuelle.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								4. Données personnelles
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Conformément à la loi « Informatique et Libertés
								» du 6 janvier 1978 modifiée et au Règlement
								Général sur la Protection des Données (RGPD),
								vous disposez d&apos;un droit d&apos;accès, de
								rectification et de suppression des données vous
								concernant. Pour exercer ces droits,
								contactez-nous à l&apos;adresse :{" "}
								<a
									href="mailto:mattbuchs25@gmail.com"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									mattbuchs25@gmail.com
								</a>
							</p>
							<p className="text-zinc-300 leading-relaxed mt-4">
								Pour plus d&apos;informations, consultez notre{" "}
								<a
									href="/privacyPolicy"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									Politique de confidentialité
								</a>
								.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								5. Cookies
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Ce site n&apos;utilise pas de cookies
								publicitaires ou de tracking. Seuls des cookies
								techniques nécessaires au bon fonctionnement du
								site peuvent être utilisés.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								6. Crédits
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Site conçu et développé par Matt Buchs.
								<br />
								Technologies utilisées : React, Vite, Tailwind
								CSS, Framer Motion.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								7. Droit applicable
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Les présentes mentions légales sont régies par
								le droit français. En cas de litige, les
								tribunaux français seront seuls compétents.
							</p>
						</section>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	);
}
