"use client";

import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function LegalNotice() {
    return (
        <>
            <NavBar />
            <main className="bg-gray-50 min-h-screen pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-5 md:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                            <Shield className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Mentions Légales
                        </h1>
                        <p className="text-lg text-gray-600">
                            Dernière mise à jour : 21 novembre 2025
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-stone-100 rounded-2xl shadow-lg p-8 md:p-12 space-y-8"
                    >
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                1. Éditeur du site
                            </h2>
                            <div className="text-gray-700 space-y-2">
                                <p>
                                    <strong>Nom :</strong> Matt Buchs
                                </p>
                                <p>
                                    <strong>Statut :</strong> Auto-entrepreneur
                                </p>
                                <p>
                                    <strong>Adresse :</strong> 25300 Arçon,
                                    France
                                </p>
                                <p>
                                    <strong>Email :</strong>{" "}
                                    <a
                                        href="mailto:mattbuchs25@gmail.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        mattbuchs25@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <strong>Téléphone :</strong>{" "}
                                    <a
                                        href="tel:0664935294"
                                        className="text-blue-600 hover:underline"
                                    >
                                        06 64 93 52 94
                                    </a>
                                </p>
                                <p>
                                    <strong>SIRET :</strong> 93948022400012
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                2. Hébergement
                            </h2>
                            <div className="text-gray-700 space-y-2">
                                <p>Ce site est hébergé par :</p>
                                <p>
                                    <strong>GitHub Pages</strong>
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
                                        className="text-blue-600 hover:underline"
                                    >
                                        https://pages.github.com
                                    </a>
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                3. Propriété intellectuelle
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
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
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                4. Données personnelles
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Conformément à la loi « Informatique et Libertés
                                » du 6 janvier 1978 modifiée et au Règlement
                                Général sur la Protection des Données (RGPD),
                                vous disposez d&apos;un droit d&apos;accès, de
                                rectification et de suppression des données vous
                                concernant. Pour exercer ces droits,
                                contactez-nous à l&apos;adresse :{" "}
                                <a
                                    href="mailto:mattbuchs25@gmail.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    mattbuchs25@gmail.com
                                </a>
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Pour plus d&apos;informations, consultez notre{" "}
                                <a
                                    href="/privacyPolicy"
                                    className="text-blue-600 hover:underline"
                                >
                                    Politique de confidentialité
                                </a>
                                .
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                5. Cookies
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Ce site n&apos;utilise pas de cookies
                                publicitaires ou de tracking. Seuls des cookies
                                techniques nécessaires au bon fonctionnement du
                                site peuvent être utilisés.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                6. Crédits
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Site conçu et développé par Matt Buchs.
                                <br />
                                Technologies utilisées : React, Vite, Tailwind
                                CSS, Framer Motion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                7. Droit applicable
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
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
