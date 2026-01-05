"use client";

import { Layers } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Technos() {
    const cardRefs = useRef([]);
    const technos = [
        { id: 1, title: "JavaScript", img: "Javascript.png" },
        { id: 2, title: "TypeScript", img: "Typescript.png" },
        { id: 3, title: "Tailwind", img: "Tailwind.png" },
        { id: 4, title: "Sass", img: "Sass.png" },
        { id: 5, title: "React", img: "React.png" },
        { id: 6, title: "Next.js", img: "Nextjs.png" },
        { id: 7, title: "Node.js", img: "Node.png" },
        { id: 8, title: "PostgreSQL", img: "Postgres.png" },
        { id: 9, title: "MongoDB", img: "Mongo.png" },
        { id: 10, title: "Git", img: "Git.png" },
    ];

    const rotateToMouse = (e, index) => {
        const card = cardRefs.current[index];
        const bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.x;
        const mouseY = e.clientY - bounds.y;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const rotateX = ((mouseY - centerY) / centerY) * 10;
        const rotateY = ((centerX - mouseX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

        card.querySelector(".glow").style.backgroundImage = `
            radial-gradient(
                circle at
                ${mouseX}px
                ${mouseY}px,
                #ffffffa5,
                #0000000f
            )
        `;
    };

    const resetCard = (index) => {
        const card = cardRefs.current[index];
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.querySelector(".glow").style.backgroundImage = "none";
    };

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
        <section className="max-w-312.5 md:w-[90%] w-full h-full mx-auto relative">
            <div className="py-20">
                <motion.header
                    className="mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl text-center font-bold">Technos</h2>
                    <div className="flex justify-center mt-6 relative">
                        <motion.span
                            className="w-10 h-10 border border-gray-300 rounded-full p-2.5 bg-gray-100"
                            variants={iconVariants}
                            whileHover="hover"
                        >
                            <Layers className="w-full h-full text-blue-700" />
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

                <div className="flex gap-3 sm:gap-5 mx-4 flex-wrap justify-center">
                    {technos.map((techno, index) => (
                        <div
                            key={techno.id}
                            onMouseMove={(e) => rotateToMouse(e, index)}
                            onMouseLeave={() => resetCard(index)}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="techno-card w-35 sm:w-62.5 bg-slate-100 flex flex-col justify-center items-center py-5 sm:py-8 border border-gray-300 rounded shadow"
                        >
                            <div className="relative h-14 sm:h-20 w-14 sm:w-20">
                                <Image
                                    src={`/img/technos/${techno.img}`}
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <p className="mt-4 sm:text-lg">{techno.title}</p>
                            <div className="glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
