"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useScreenSize } from "../../hook/useScreenSize";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Services() {
    const screenSize = useScreenSize();

    // Variants pour les animations
    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: { delay: 0.3, type: "spring", stiffness: 200 },
        },
        hover: {
            rotate: 10,
            scale: 1.1,
            transition: { duration: 0.3 },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    const sectionRightVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.2, duration: 0.5 },
        },
    };

    return (
        <section className="max-w-4xl md:w-[90%] w-full h-full mx-auto relative">
            <div className="pt-20 pb-8">
                <motion.header
                    className="mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl text-center font-bold">Services</h2>
                    <div className="flex justify-center mt-6 relative">
                        <motion.span
                            className="w-10 h-10 border border-gray-300 rounded-full p-2.5 bg-gray-100"
                            variants={iconVariants}
                            whileHover="hover"
                        >
                            <ClipboardList className="w-full h-full text-blue-700" />
                        </motion.span>
                        <hr
                            className="h-0.5 w-182.5 absolute mt-4.5 -z-10 border-none"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(0, 0, 0, 0) 10%, rgba(209, 213, 219, 1) 50%, rgba(0, 0, 0, 0) 90%)",
                            }}
                        />
                    </div>
                </motion.header>

                <main className="flex flex-col gap-8 px-4 md:px-0">
                    <motion.section
                        className={`flex flex-col md:flex-row items-center p-5 sm:p-8 rounded-2xl md:rounded-full ${
                            screenSize.width < 768
                                ? "gradient-card-mobile"
                                : "gradient-card"
                        }`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariants}
                    >
                        <motion.div
                            className="w-37.5 h-37.5 md:min-w-50 md:h-50 flex justify-center items-center mb-4 md:mb-0"
                            variants={imageVariants}
                        >
                            <Image
                                src="/img/illustration/illustration-conception-de-sites-web-personnalisés.jpg"
                                alt=""
                                className="rounded-full w-full h-full object-cover"
                                width={200}
                                height={200}
                            />
                        </motion.div>

                        <div className="md:ml-8 lg:ml-24">
                            <motion.h3
                                className="text-lg text-center md:text-left md:text-xl font-semibold mb-2 md:mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Conception et Développement de Sites Web
                                Personnalisés
                            </motion.h3>
                            <motion.p
                                className="text-sm md:text-base mt-2 md:mt-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Je propose la création de sites web sur mesure,
                                adaptés à l&apos;identité et aux besoins
                                spécifiques de chaque client. Chaque projet est
                                conçu pour offrir une expérience utilisateur
                                intuitive, une navigation fluide et un design
                                moderne, garantissant une présence en ligne
                                professionnelle et efficace.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href="/contact"
                                    className="inline-block mt-2 text-sm italic text-blue-500 font-semibold hover:underline"
                                >
                                    Demander un devis
                                </Link>
                            </motion.div>
                        </div>
                    </motion.section>

                    <motion.section
                        className={`flex flex-col md:flex-row-reverse items-center p-5 sm:p-8 rounded-2xl md:rounded-full ${
                            screenSize.width < 768
                                ? "gradient-card-mobile"
                                : "gradient-card-inverse"
                        }`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionRightVariants}
                    >
                        <motion.div
                            className="w-37.5 h-37.5 md:min-w-50 md:h-50 flex justify-center items-center mb-4 md:mb-0"
                            variants={imageVariants}
                        >
                            <Image
                                src="/img/illustration/illustration-seo.webp"
                                alt=""
                                className="rounded-full w-full h-full object-cover"
                                width={200}
                                height={200}
                            />
                        </motion.div>

                        <div className="md:mr-8 lg:mr-24">
                            <motion.h3
                                className="text-lg text-center md:text-left md:text-xl font-semibold mb-2 md:mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Optimisation des Performances et du
                                Référencement (SEO)
                            </motion.h3>
                            <motion.p
                                className="text-sm md:text-base mt-2 md:mt-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Un site performant et bien référencé est
                                essentiel pour attirer et retenir les visiteurs.
                                J&apos;analyse et optimise la vitesse de
                                chargement, la structure du site et le contenu
                                pour améliorer la visibilité sur les moteurs de
                                recherche, assurant ainsi une meilleure position
                                dans les résultats et une augmentation du trafic
                                organique.
                            </motion.p>
                        </div>
                    </motion.section>

                    <motion.section
                        className={`flex flex-col md:flex-row items-center p-5 sm:p-8 rounded-2xl md:rounded-full ${
                            screenSize.width < 768
                                ? "gradient-card-mobile"
                                : "gradient-card"
                        }`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariants}
                    >
                        <motion.div
                            className="w-37.5 h-37.5 md:min-w-50 md:h-50 flex justify-center items-center mb-4 md:mb-0"
                            variants={imageVariants}
                        >
                            <Image
                                src="/img/illustration/illustration-maintenance.jpg"
                                alt=""
                                className="rounded-full w-full h-full object-cover"
                                width={200}
                                height={200}
                            />
                        </motion.div>

                        <div className="md:ml-8 lg:ml-24">
                            <motion.h3
                                className="text-lg text-center md:text-left md:text-xl font-semibold mb-2 md:mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Maintenance Continue et Support Technique
                            </motion.h3>
                            <motion.p
                                className="text-sm md:text-base mt-2 md:mt-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Pour assurer la pérennité et la sécurité de
                                votre site, j&apos;offre des services de
                                maintenance régulière. Cela inclut les mises à
                                jour nécessaires, la surveillance de la
                                sécurité, la correction de bugs éventuels et un
                                support technique réactif, garantissant que
                                votre site reste opérationnel et sécurisé en
                                tout temps.
                            </motion.p>
                        </div>
                    </motion.section>
                </main>
            </div>
        </section>
    );
}
