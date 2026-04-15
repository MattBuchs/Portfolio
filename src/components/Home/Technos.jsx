"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Technos() {
	const cardRefs = useRef([]);

	const technos = [
		{
			id: 1,
			title: "JavaScript",
			img: "javascript-icon.svg",
			category: "Language",
		},
		{
			id: 2,
			title: "TypeScript",
			img: "typescript-icon.svg",
			category: "Language",
		},
		{
			id: 3,
			title: "React",
			img: "react-js-icon.svg",
			category: "Frontend",
		},
		{
			id: 4,
			title: "Next.js",
			img: "nextjs-icon.svg",
			category: "Framework",
		},
		{
			id: 5,
			title: "Tailwind",
			img: "tailwind-css-icon.svg",
			category: "Styling",
		},
		{ id: 6, title: "Sass", img: "sass-icon.svg", category: "Styling" },
		{
			id: 7,
			title: "Framer Motion",
			img: "framer-motion-icon.svg",
			category: "Animation",
		},
		{
			id: 8,
			title: "Node.js",
			img: "node-js-icon.svg",
			category: "Backend",
		},
		{
			id: 9,
			title: "PostgreSQL",
			img: "postgresql-icon.svg",
			category: "Database",
		},
		{ id: 10, title: "Git", img: "git-icon.svg", category: "Tools" },
	];

	const rotateToMouse = (e, index) => {
		const card = cardRefs.current[index];
		if (!card) return;

		const bounds = card.getBoundingClientRect();
		const mouseX = e.clientX - bounds.x;
		const mouseY = e.clientY - bounds.y;
		const centerX = bounds.width / 2;
		const centerY = bounds.height / 2;
		const rotateX = ((mouseY - centerY) / centerY) * 10;
		const rotateY = ((centerX - mouseX) / centerX) * 10;

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;

		const glow = card.querySelector(".glow");
		if (glow) {
			glow.style.opacity = "1";
			glow.style.backgroundImage = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.15) 40%, transparent 70%)`;
		}
	};

	const resetCard = (index) => {
		const card = cardRefs.current[index];
		if (!card) return;

		card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
		const glow = card.querySelector(".glow");
		if (glow) {
			glow.style.opacity = "0";
			glow.style.backgroundImage = "none";
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delayChildren: 0.1, staggerChildren: 0.04 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
		visible: {
			y: 0,
			opacity: 1,
			filter: "blur(0px)",
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 18,
			},
		},
	};

	const technoVariants = {
		hidden: { scale: 0.9, opacity: 0 },
		visible: (idx) => ({
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 150,
				damping: 15,
				delay: idx * 0.03,
			},
		}),
	};

	return (
		<section
			id="technos"
			className="relative py-24 md:py-32 overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900/80 to-transparent" />

			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage: `linear-gradient(rgba(251,191,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.6) 1px, transparent 1px)`,
					backgroundSize: "40px 40px",
				}}
			/>

			{/* Decorative */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
			<div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

			<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{/* Header */}
					<motion.div
						variants={itemVariants}
						className="text-center mb-16"
					>
						<span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
							<Layers size={16} />
							Stack Technique
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Technologies{" "}
							<span className="text-gradient-warm">
								maîtrisées
							</span>
						</h2>
						<p className="text-zinc-400 max-w-2xl mx-auto">
							Les outils et frameworks que j&apos;utilise au
							quotidien pour créer des applications performantes
						</p>
					</motion.div>

					{/* Technos Grid */}
					<div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
						{technos.map((techno, index) => (
							<motion.div
								key={techno.id}
								custom={index}
								variants={technoVariants}
								ref={(el) => (cardRefs.current[index] = el)}
								onMouseMove={(e) => rotateToMouse(e, index)}
								onMouseLeave={() => resetCard(index)}
								className="group relative card-dark p-4 sm:p-5 md:p-6 flex flex-col items-center cursor-pointer spotlight will-change-transform"
								style={{
									transition: "transform 0.12s ease-out",
								}}
							>
								{/* Glow effect */}
								<div className="glow absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-opacity duration-200" />

								{/* Icon */}
								<div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-200">
									<Image
										src={`/img/technos/${techno.img}`}
										alt=""
										fill
										className="object-contain drop-shadow-lg"
									/>
								</div>

								{/* Title */}
								<h3 className="font-semibold text-white text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1 group-hover:text-amber-400 transition-colors duration-200">
									{techno.title}
								</h3>

								{/* Category */}
								<span className="text-[10px] sm:text-xs text-zinc-500">
									{techno.category}
								</span>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
