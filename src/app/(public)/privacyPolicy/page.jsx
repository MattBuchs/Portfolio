"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function PrivacyPolicy() {
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
							<Lock className="text-amber-400" size={32} />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
							Politique de Confidentialité
						</h1>
						<p className="text-lg text-zinc-400">
							Dernière mise à jour : 17 avril 2026
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
								1. Introduction
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								La présente Politique de Confidentialité a pour
								objectif de vous informer sur la manière dont
								Matt Buchs collecte, utilise et protège vos
								données personnelles lorsque vous visitez le
								site{" "}
								<a
									href="https://matt-buchs.me"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									matt-buchs.me
								</a>
								. J&apos;accorde une importance capitale à la
								protection de votre vie privée et je
								m&apos;engage à respecter le Règlement Général
								sur la Protection des Données (RGPD).
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								2. Responsable du traitement
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>
									Le responsable du traitement des données est
									:
								</p>
								<p>
									<strong className="text-white">
										Matt Buchs
									</strong>
									<br />
									Email :{" "}
									<a
										href="mailto:mattbuchs25@gmail.com"
										className="text-amber-400 hover:text-amber-300 hover:underline"
									>
										mattbuchs25@gmail.com
									</a>
									<br />
									Téléphone : 06 64 93 52 94
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								3. Données collectées
							</h2>
							<div className="text-zinc-300 space-y-4">
								<p>
									Je collecte les données personnelles
									suivantes lorsque vous utilisez mon
									formulaire de contact :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Nom et prénom</li>
									<li>Adresse email</li>
									<li>Numéro de téléphone (optionnel)</li>
									<li>Société (optionnel)</li>
									<li>Message</li>
								</ul>
								<p className="pt-4">
									<strong className="text-white">
										Données de navigation :
									</strong>{" "}
									Ce site n&apos;utilise pas de cookies de
									tracking ou d&apos;analyse. Aucune donnée de
									navigation n&apos;est collectée à des fins
									publicitaires.
								</p>
								<p className="pt-4">
									<strong className="text-white">
										Données liées aux achats (GameMaster OS)
										:
									</strong>{" "}
									Lors de l&apos;achat d&apos;une licence
									GameMaster OS, les données collectées sont :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4 mt-2">
									<li>Nom et prénom</li>
									<li>Adresse email</li>
									<li>Société (optionnel)</li>
									<li>
										Informations de paiement (traitées par
										Stripe)
									</li>
									<li>
										Identifiant machine (pour
										l&apos;activation de la licence)
									</li>
								</ul>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								4. Finalité du traitement
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>
									Les données collectées sont utilisées pour :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Répondre à vos demandes de contact</li>
									<li>
										Vous fournir des informations sur nos
										services
									</li>
									<li>
										Établir une relation commerciale dans le
										cadre de projets freelance
									</li>
									<li>
										Traiter vos achats de licences
										GameMaster OS (facturation, envoi de clé
										de licence, support)
									</li>
									<li>
										Vérifier et activer les licences
										logicielles
									</li>
								</ul>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								5. Base légale du traitement
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Le traitement de vos données personnelles repose
								sur votre consentement explicite lors de
								l&apos;envoi du formulaire de contact,
								conformément à l&apos;article 6(1)(a) du RGPD.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								6. Durée de conservation
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Vos données personnelles sont conservées pendant
								une durée de{" "}
								<strong className="text-white">3 ans</strong> à
								compter de notre dernier contact, sauf
								obligation légale de conservation plus longue ou
								si vous exercez votre droit de suppression.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								7. Destinataires des données et sous-traitants
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>
									Vos données personnelles peuvent être
									traitées par les prestataires suivants :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Matt Buchs (responsable du site)</li>
									<li>
										<strong className="text-white">
											Vercel Inc.
										</strong>{" "}
										(hébergement) - Serveurs situés à Paris,
										France (eu-west-3)
									</li>
									<li>
										<strong className="text-white">
											Supabase Inc.
										</strong>{" "}
										(base de données) - Serveurs situés à
										Francfort, Allemagne (eu-central-1)
									</li>
									<li>
										<strong className="text-white">
											Stripe Inc.
										</strong>{" "}
										(paiement) - Traitement sécurisé des
										paiements (certifié PCI-DSS). Vos
										informations bancaires sont gérées
										uniquement par Stripe selon leur{" "}
										<a
											href="https://stripe.com/fr/privacy"
											target="_blank"
											rel="noopener noreferrer"
											className="text-amber-400 hover:text-amber-300 hover:underline"
										>
											politique de confidentialité
										</a>
									</li>
									<li>
										<strong className="text-white">
											Resend Inc.
										</strong>{" "}
										(envoi d&apos;emails) - Envoi des emails
										transactionnels (confirmations,
										factures)
									</li>
								</ul>
								<p className="pt-4">
									<strong className="text-white">
										Stockage des données :
									</strong>{" "}
									Vos données sont hébergées exclusivement au
									sein de l&apos;Union Européenne (France et
									Allemagne), garantissant une conformité
									optimale avec le RGPD.
								</p>
								<p className="pt-4">
									<strong className="text-white">
										Non-revente des données :
									</strong>{" "}
									Aucune données n&apos;est vendue, louée ni
									partagée avec des tiers à des fins
									commerciales. Vos informations sont
									uniquement utilisées pour le fonctionnement
									de mes services.
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								8. Vos droits
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>
									Conformément au RGPD, vous disposez des
									droits suivants :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										<strong className="text-white">
											Droit d&apos;accès :
										</strong>{" "}
										Vous pouvez demander l&apos;accès à vos
										données personnelles
									</li>
									<li>
										<strong className="text-white">
											Droit de rectification :
										</strong>{" "}
										Vous pouvez demander la correction de
										données inexactes
									</li>
									<li>
										<strong className="text-white">
											Droit à l&apos;effacement :
										</strong>{" "}
										Vous pouvez demander la suppression de
										vos données
									</li>
									<li>
										<strong className="text-white">
											Droit à la limitation du traitement
											:
										</strong>{" "}
										Vous pouvez demander la limitation du
										traitement
									</li>
									<li>
										<strong className="text-white">
											Droit à la portabilité :
										</strong>{" "}
										Vous pouvez recevoir vos données dans un
										format structuré
									</li>
									<li>
										<strong className="text-white">
											Droit d&apos;opposition :
										</strong>{" "}
										Vous pouvez vous opposer au traitement
										de vos données
									</li>
								</ul>
								<p className="pt-4">
									Pour exercer ces droits, contactez-moi à :{" "}
									<a
										href="mailto:mattbuchs25@gmail.com"
										className="text-amber-400 hover:text-amber-300 hover:underline"
									>
										mattbuchs25@gmail.com
									</a>
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								9. Sécurité des données
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Je mets en œuvre des mesures techniques et
								organisationnelles appropriées pour protéger vos
								données personnelles contre tout accès non
								autorisé, perte, destruction ou divulgation. Le
								site utilise le protocole HTTPS pour sécuriser
								les échanges de données.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								10. Réclamation
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Si vous estimez que vos droits ne sont pas
								respectés, vous avez le droit d&apos;introduire
								une réclamation auprès de la Commission
								Nationale de l&apos;Informatique et des Libertés
								(CNIL) :
								<br />
								<a
									href="https://www.cnil.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									www.cnil.fr
								</a>
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								11. Modifications
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Je me réserve le droit de modifier cette
								Politique de Confidentialité à tout moment.
								Toute modification sera publiée sur cette page
								avec une nouvelle date de mise à jour.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								12. Contact
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Pour toute question concernant cette Politique
								de Confidentialité, vous pouvez me contacter à
								l&apos;adresse suivante : <br />
								<a
									href="mailto:mattbuchs25@gmail.com"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									mattbuchs25@gmail.com
								</a>
							</p>
						</section>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	);
}
