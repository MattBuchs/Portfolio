"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetail({ project }) {
    return (
        <main className="max-w-4xl md:w-[90%] w-full h-full mx-auto relative pt-24 lg:pt-28 px-4 pb-16">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Link
                    href="/projects"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
                >
                    <ArrowLeft className="mr-2" />
                    <span>Retour aux projets</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Partie gauche - Infos du projet */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="sticky top-24">
                            <h2 className="text-4xl font-bold mb-4">
                                {project.title}
                            </h2>
                            <div
                                className="w-16 h-1 mb-6"
                                style={{ backgroundColor: project.bgColor }}
                            ></div>

                            <p className="text-lg mb-8 text-gray-600 font-medium">
                                {project.paragraph}
                            </p>

                            <div className="space-y-2 lg:space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.githubLink && (
                                        <motion.a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Github />
                                            <span>GitHub</span>
                                        </motion.a>
                                    )}

                                    {project.projectLink && (
                                        <motion.a
                                            href={project.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-3 rounded-lg text-white transition-colors"
                                            style={{
                                                backgroundColor:
                                                    project.bgColor,
                                            }}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <ExternalLink />
                                            <span>Voir le site</span>
                                        </motion.a>
                                    )}
                                </div>

                                <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 italic">
                                    Projet #{project.id}
                                </h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Partie droite - Image et description */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div
                            className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-10 "
                            style={{
                                background: project.bgColor,
                            }}
                        >
                            <motion.div
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={`/img/${project.img}`}
                                    alt={project.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-contain p-4"
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">
                                À propos du projet
                            </h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>

                            <motion.div
                                className="mt-12 p-6 border rounded-lg bg-stone-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    Vous avez aimé ce projet ?
                                </h3>
                                <p className="mb-4">
                                    N&apos;hésitez pas à me contacter pour
                                    discuter de vos idées ou projets similaires.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-block px-6 py-3 rounded-lg text-white transition-colors"
                                    style={{
                                        backgroundColor: project.bgColor,
                                    }}
                                >
                                    Contactez-moi
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
