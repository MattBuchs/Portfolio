"use client";

import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function PrivacyPolicy() {
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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-full mb-4">
                            <Lock className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Politique de Confidentialité
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
                                1. Introduction
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                La présente Politique de Confidentialité a pour
                                objectif de vous informer sur la manière dont
                                Matt Buchs collecte, utilise et protège vos
                                données personnelles lorsque vous visitez le
                                site{" "}
                                <a
                                    href="https://matt-buchs.me"
                                    className="text-blue-600 hover:underline"
                                >
                                    matt-buchs.me
                                </a>
                                . Nous accordons une importance capitale à la
                                protection de votre vie privée et nous nous
                                engageons à respecter le Règlement Général sur
                                la Protection des Données (RGPD).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                2. Responsable du traitement
                            </h2>
                            <div className="text-gray-700 space-y-2">
                                <p>
                                    Le responsable du traitement des données est
                                    :
                                </p>
                                <p>
                                    <strong>Matt Buchs</strong>
                                    <br />
                                    Email :{" "}
                                    <a
                                        href="mailto:mattbuchs25@gmail.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        mattbuchs25@gmail.com
                                    </a>
                                    <br />
                                    Téléphone : 06 64 93 52 94
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                3. Données collectées
                            </h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    Nous collectons les données personnelles
                                    suivantes lorsque vous utilisez notre
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
                                    <strong>Données de navigation :</strong> Ce
                                    site n&apos;utilise pas de cookies de
                                    tracking ou d&apos;analyse. Aucune donnée de
                                    navigation n&apos;est collectée à des fins
                                    publicitaires.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                4. Finalité du traitement
                            </h2>
                            <div className="text-gray-700 space-y-2">
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
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                5. Base légale du traitement
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Le traitement de vos données personnelles repose
                                sur votre consentement explicite lors de
                                l&apos;envoi du formulaire de contact,
                                conformément à l&apos;article 6(1)(a) du RGPD.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                6. Durée de conservation
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Vos données personnelles sont conservées pendant
                                une durée de <strong>3 ans</strong> à compter de
                                notre dernier contact, sauf obligation légale de
                                conservation plus longue ou si vous exercez
                                votre droit de suppression.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                7. Destinataires des données
                            </h2>
                            <div className="text-gray-700 space-y-2">
                                <p>
                                    Vos données personnelles sont destinées
                                    uniquement à :
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Matt Buchs (responsable du site)</li>
                                    <li>
                                        EmailJS (service d&apos;envoi
                                        d&apos;emails) - Les données sont
                                        transmises de manière sécurisée
                                    </li>
                                </ul>
                                <p className="pt-4">
                                    Nous ne vendons, ne louons ni ne partageons
                                    vos données avec des tiers à des fins
                                    commerciales.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                8. Vos droits
                            </h2>
                            <div className="text-gray-700 space-y-2">
                                <p>
                                    Conformément au RGPD, vous disposez des
                                    droits suivants :
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>
                                        <strong>Droit d&apos;accès :</strong>{" "}
                                        Vous pouvez demander l&apos;accès à vos
                                        données personnelles
                                    </li>
                                    <li>
                                        <strong>
                                            Droit de rectification :
                                        </strong>{" "}
                                        Vous pouvez demander la correction de
                                        données inexactes
                                    </li>
                                    <li>
                                        <strong>
                                            Droit à l&apos;effacement :
                                        </strong>{" "}
                                        Vous pouvez demander la suppression de
                                        vos données
                                    </li>
                                    <li>
                                        <strong>
                                            Droit à la limitation du traitement
                                            :
                                        </strong>{" "}
                                        Vous pouvez demander la limitation du
                                        traitement
                                    </li>
                                    <li>
                                        <strong>
                                            Droit à la portabilité :
                                        </strong>{" "}
                                        Vous pouvez recevoir vos données dans un
                                        format structuré
                                    </li>
                                    <li>
                                        <strong>
                                            Droit d&apos;opposition :
                                        </strong>{" "}
                                        Vous pouvez vous opposer au traitement
                                        de vos données
                                    </li>
                                </ul>
                                <p className="pt-4">
                                    Pour exercer ces droits, contactez-nous à :{" "}
                                    <a
                                        href="mailto:mattbuchs25@gmail.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        mattbuchs25@gmail.com
                                    </a>
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                9. Sécurité des données
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nous mettons en œuvre des mesures techniques et
                                organisationnelles appropriées pour protéger vos
                                données personnelles contre tout accès non
                                autorisé, perte, destruction ou divulgation. Le
                                site utilise le protocole HTTPS pour sécuriser
                                les échanges de données.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                10. Réclamation
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
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
                                    className="text-blue-600 hover:underline"
                                >
                                    www.cnil.fr
                                </a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                11. Modifications
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nous nous réservons le droit de modifier cette
                                Politique de Confidentialité à tout moment.
                                Toute modification sera publiée sur cette page
                                avec une nouvelle date de mise à jour.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                12. Contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Pour toute question concernant cette Politique
                                de Confidentialité, vous pouvez nous contacter à
                                :
                                <br />
                                <a
                                    href="mailto:mattbuchs25@gmail.com"
                                    className="text-blue-600 hover:underline"
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
