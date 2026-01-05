import NavBar from "../components/Header/NavBar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export const metadata = {
    title: "Conditions Générales d'Utilisation",
    description: "Conditions générales d'utilisation du site matt-buchs.me.",
    alternates: {
        canonical: "https://matt-buchs.me/conditions-utilisation",
    },
    openGraph: {
        title: "Conditions Générales d'Utilisation | Matt Buchs",
        description:
            "Conditions générales d'utilisation du site matt-buchs.me.",
        url: "https://matt-buchs.me/conditions-utilisation",
    },
};

export default function TermsOfService() {
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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-full mb-4">
                            <FileText className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Conditions Générales d&apos;Utilisation
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
                                1. Objet
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Les présentes Conditions Générales
                                d&apos;Utilisation (CGU) ont pour objet de
                                définir les modalités et conditions
                                d&apos;utilisation du site{" "}
                                <a
                                    href="https://matt-buchs.me"
                                    className="text-blue-600 hover:underline"
                                >
                                    matt-buchs.me
                                </a>{" "}
                                ainsi que les droits et obligations des
                                utilisateurs et de l&apos;éditeur du site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                2. Acceptation des CGU
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                L&apos;accès et l&apos;utilisation du site
                                impliquent l&apos;acceptation pleine et entière
                                des présentes CGU. Si vous n&apos;acceptez pas
                                ces conditions, vous devez vous abstenir
                                d&apos;utiliser ce site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                3. Accès au site
                            </h2>
                            <div className="text-gray-700 space-y-4">
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
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                4. Utilisation du site
                            </h2>
                            <div className="text-gray-700 space-y-2">
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
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                5. Propriété intellectuelle
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                L&apos;ensemble du contenu présent sur le site
                                (textes, images, vidéos, design, logos, code
                                source) est protégé par le droit d&apos;auteur
                                et appartient à Matt Buchs ou à ses partenaires.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Toute reproduction, distribution, modification,
                                adaptation, retransmission ou publication de ces
                                éléments est strictement interdite sans
                                l&apos;accord écrit préalable de Matt Buchs.
                                Cette interdiction s&apos;étend également aux
                                bases de données et au code source du site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                6. Formulaire de contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Le formulaire de contact disponible sur le site
                                permet aux utilisateurs de nous transmettre
                                leurs demandes. Les informations collectées via
                                ce formulaire sont traitées conformément à notre{" "}
                                <a
                                    href="/politique-confidentialite"
                                    className="text-blue-600 hover:underline"
                                >
                                    Politique de Confidentialité
                                </a>
                                .
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                L&apos;utilisateur s&apos;engage à fournir des
                                informations exactes et à jour. Toute
                                utilisation frauduleuse ou abusive du formulaire
                                pourra entraîner des poursuites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                7. Liens hypertextes
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Le site peut contenir des liens vers
                                d&apos;autres sites Internet. L&apos;éditeur
                                n&apos;exerce aucun contrôle sur ces sites et
                                décline toute responsabilité quant à leur
                                contenu, leur disponibilité ou leur politique de
                                confidentialité.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                La création de liens hypertextes vers le site
                                matt-buchs.me est autorisée sous réserve
                                d&apos;obtenir l&apos;accord préalable de
                                l&apos;éditeur et à condition que ces liens ne
                                portent pas atteinte à l&apos;image du site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                8. Données personnelles
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Les données personnelles collectées sur le site
                                sont traitées conformément au RGPD. Pour plus
                                d&apos;informations, veuillez consulter notre{" "}
                                <a
                                    href="/politique-confidentialite"
                                    className="text-blue-600 hover:underline"
                                >
                                    Politique de Confidentialité
                                </a>
                                .
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                9. Modification des CGU
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                L&apos;éditeur se réserve le droit de modifier
                                les présentes CGU à tout moment. Les
                                modifications entrent en vigueur dès leur
                                publication sur le site. Il est recommandé aux
                                utilisateurs de consulter régulièrement cette
                                page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                10. Droit applicable et juridiction compétente
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Les présentes CGU sont régies par le droit
                                français. En cas de litige relatif à
                                l&apos;interprétation ou à l&apos;exécution des
                                présentes, et à défaut d&apos;accord amiable,
                                les tribunaux français seront seuls compétents.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                11. Contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Pour toute question concernant les présentes
                                CGU, vous pouvez nous contacter à :
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
