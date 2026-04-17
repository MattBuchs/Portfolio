"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfService() {
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
							<FileText className="text-amber-400" size={32} />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
							Conditions Générales d&apos;Utilisation
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
								1. Objet
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Les présentes Conditions Générales
								d&apos;Utilisation (CGU) ont pour objet de
								définir les modalités et conditions
								d&apos;utilisation du site{" "}
								<a
									href="https://matt-buchs.me"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									matt-buchs.me
								</a>{" "}
								ainsi que les droits et obligations des
								utilisateurs et de l&apos;éditeur du site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								2. Acceptation des CGU
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								L&apos;accès et l&apos;utilisation du site
								impliquent l&apos;acceptation pleine et entière
								des présentes CGU. Si vous n&apos;acceptez pas
								ces conditions, vous devez vous abstenir
								d&apos;utiliser ce site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								3. Accès au site
							</h2>
							<div className="text-zinc-300 space-y-4">
								<p>
									Le site matt-buchs.me est accessible
									gratuitement à tout utilisateur disposant
									d&apos;un accès à Internet. Tous les coûts
									liés à l&apos;accès au site (matériel
									informatique, connexion Internet, etc.) sont
									à la charge de l&apos;utilisateur.
								</p>
								<p>
									L&apos;éditeur s&apos;efforce de maintenir
									le site accessible 24h/24 et 7j/7, mais ne
									peut garantir une disponibilité permanente.
									Le site peut être interrompu temporairement
									pour des raisons de maintenance, de mise à
									jour ou d&apos;événements indépendants de la
									volonté de l&apos;éditeur.
								</p>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								4. Utilisation du site
							</h2>
							<div className="text-zinc-300 space-y-2">
								<p>L&apos;utilisateur s&apos;engage à :</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										Utiliser le site de manière loyale et
										conforme à sa destination
									</li>
									<li>
										Ne pas porter atteinte aux droits de
										tiers
									</li>
									<li>
										Ne pas diffuser de contenu illicite,
										offensant ou contraire aux bonnes mœurs
									</li>
									<li>
										Ne pas tenter d&apos;accéder de manière
										non autorisée au site ou à ses serveurs
									</li>
									<li>
										Ne pas nuire au bon fonctionnement du
										site
									</li>
								</ul>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								5. Propriété intellectuelle
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								L&apos;ensemble du contenu présent sur le site
								(textes, images, vidéos, design, logos, code
								source) est protégé par le droit d&apos;auteur
								et appartient à Matt Buchs ou à ses partenaires.
							</p>
							<p className="text-zinc-300 leading-relaxed mt-4">
								Toute reproduction, distribution, modification,
								adaptation, retransmission ou publication de ces
								éléments est strictement interdite sans
								l&apos;accord écrit préalable de Matt Buchs.
								Cette interdiction s&apos;étend également aux
								bases de données et au code source du site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								6. Formulaire de contact
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Le formulaire de contact disponible sur le site
								permet aux utilisateurs de nous transmettre
								leurs demandes. Les informations collectées via
								ce formulaire sont traitées conformément à notre{" "}
								<a
									href="/privacyPolicy"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									Politique de Confidentialité
								</a>
								.
							</p>
							<p className="text-zinc-300 leading-relaxed mt-4">
								L&apos;utilisateur s&apos;engage à fournir des
								informations exactes et à jour. Toute
								utilisation frauduleuse ou abusive du formulaire
								pourra entraîner des poursuites.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								7. Conditions d&apos;achat - GameMaster OS
							</h2>
							<div className="text-zinc-300 space-y-4">
								<p>
									L&apos;achat d&apos;une licence GameMaster
									OS est soumis aux conditions suivantes :
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										<strong className="text-white">
											Licence personnelle (Pro) :
										</strong>{" "}
										Valable pour 1 installation sur un seul
										ordinateur
									</li>
									<li>
										<strong className="text-white">
											Licence Business :
										</strong>{" "}
										Valable pour 3 installations sur des
										ordinateurs différents
									</li>
									<li>
										La clé de licence est envoyée par email
										après paiement
									</li>
									<li>
										Le transfert de licence vers une autre
										machine est possible depuis
										l&apos;application, mais limité à 5 fois
										par licence pour éviter les abus
									</li>
								</ul>
								<p className="pt-2">
									<strong className="text-white">
										Paiement :
									</strong>{" "}
									Les paiements sont traités de manière
									sécurisée par Stripe. Nous n&apos;avons pas
									accès à vos informations bancaires
									complètes.
								</p>
								<p className="pt-2">
									<strong className="text-white">
										Remboursement :
									</strong>{" "}
									Conformément à la législation sur les
									produits numériques, le droit de
									rétractation ne s&apos;applique pas une fois
									la clé de licence délivrée. Pour toute
									réclamation, contactez-nous à{" "}
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
								8. Liens hypertextes
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Le site peut contenir des liens vers
								d&apos;autres sites Internet. L&apos;éditeur
								n&apos;exerce aucun contrôle sur ces sites et
								décline toute responsabilité quant à leur
								contenu, leur disponibilité ou leur politique de
								confidentialité.
							</p>
							<p className="text-zinc-300 leading-relaxed mt-4">
								La création de liens hypertextes vers le site
								matt-buchs.me est autorisée sous réserve
								d&apos;obtenir l&apos;accord préalable de
								l&apos;éditeur et à condition que ces liens ne
								portent pas atteinte à l&apos;image du site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								9. Données personnelles
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Les données personnelles collectées sur le site
								sont traitées conformément au RGPD. Pour plus
								d&apos;informations, veuillez consulter notre{" "}
								<a
									href="/privacyPolicy"
									className="text-amber-400 hover:text-amber-300 hover:underline"
								>
									Politique de Confidentialité
								</a>
								.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								10. Modification des CGU
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								L&apos;éditeur se réserve le droit de modifier
								les présentes CGU à tout moment. Les
								modifications entrent en vigueur dès leur
								publication sur le site. Il est recommandé aux
								utilisateurs de consulter régulièrement cette
								page.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								11. Droit applicable et juridiction compétente
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Les présentes CGU sont régies par le droit
								français. En cas de litige relatif à
								l&apos;interprétation ou à l&apos;exécution des
								présentes, et à défaut d&apos;accord amiable,
								les tribunaux français seront seuls compétents.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4 text-white">
								12. Contact
							</h2>
							<p className="text-zinc-300 leading-relaxed">
								Pour toute question concernant les présentes
								CGU, vous pouvez nous contacter à :
								<br />
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
