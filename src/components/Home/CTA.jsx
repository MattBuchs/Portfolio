"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20 bg-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

            <div className="max-w-312.5 mx-auto px-5 md:px-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-200"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <MessageSquare className="text-white" size={32} />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Un projet en tête ?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-gray-600 leading-relaxed">
                        Discutons de votre projet et voyons comment je peux vous
                        aider à le concrétiser. Je suis disponible pour des
                        missions freelance et toujours ouvert à de nouvelles
                        collaborations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Link
                                href="/contact"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                aria-label="Me contacter pour discuter de votre projet"
                            >
                                <Mail size={20} aria-hidden="true" />
                                <span>Me Contacter</span>
                                <ArrowRight size={20} aria-hidden="true" />
                            </Link>
                        </motion.div>

                        <motion.a
                            href="mailto:mattbuchs25@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gray-100 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 hover:border-gray-400 transition-all duration-300"
                            aria-label="M'envoyer un email directement"
                        >
                            <span className="truncate">
                                mattbuchs25@gmail.com
                            </span>
                        </motion.a>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Disponible immédiatement</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>⚡</span>
                            <span>Réponse sous 24h</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>💼</span>
                            <span>Devis gratuit</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
