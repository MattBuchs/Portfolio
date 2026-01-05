"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Award } from "lucide-react";

const certifications = [
    {
        id: 1,
        name: "Développeur Web et Web Mobile",
        organization: "O'clock - École en ligne",
        level: "Titre RNCP Niveau 5 (Bac +2)",
        year: "2022",
        verified: true,
    },
];

export default function Certifications() {
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
                    <h2 className="text-3xl text-center font-bold">
                        Formation & Certifications
                    </h2>
                    <div className="flex justify-center mt-6 relative">
                        <motion.span
                            className="w-10 h-10 border border-gray-300 rounded-full p-2.5 bg-gray-100"
                            variants={iconVariants}
                            whileHover="hover"
                        >
                            <GraduationCap className="w-full h-full text-blue-700" />
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

                <div className="max-w-3xl mx-auto px-4">
                    {certifications.map((cert, index) => (
                        <motion.article
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                            className="relative bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
                        >
                            {/* Decoration */}
                            <motion.div
                                className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"
                                initial={{ scale: 0, rotate: 0 }}
                                whileInView={{ scale: 1, rotate: 180 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                            />

                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                                            <Award
                                                className="text-white"
                                                size={24}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                                    {cert.name}
                                                </h3>
                                                {cert.verified && (
                                                    <CheckCircle2
                                                        className="text-blue-600 hidden sm:inline-block"
                                                        size={22}
                                                        aria-label="Certification vérifiée"
                                                    />
                                                )}
                                            </div>
                                            <p className="text-gray-700 font-medium text-base mb-1">
                                                {cert.organization}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {cert.level}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="flex items-center bg-linear-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                                        {cert.year}
                                    </span>
                                </div>

                                {/* Skills tags */}
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                                    {[
                                        "React",
                                        "Node.js",
                                        "JavaScript",
                                        "HTML/CSS",
                                        "SQL",
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
