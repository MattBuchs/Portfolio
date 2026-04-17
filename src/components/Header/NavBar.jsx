"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScreenSize } from "../../hook/useScreenSize";

export default function NavBar({ isProjectPage }) {
	const screenWidth = useScreenSize().width;
	const pathname = usePathname();
	const navRef = useRef(null);
	const modalRef = useRef(null);
	const [toggle, setToggle] = useState(false);
	const [disableParallax, setdisableParallax] = useState(false);

	useEffect(() => {
		if (screenWidth <= 768) setdisableParallax(true);
		else setdisableParallax(false);

		setToggle(false);
	}, [screenWidth]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				navRef.current &&
				!navRef.current.contains(event.target) &&
				modalRef.current &&
				!modalRef.current.contains(event.target)
			) {
				setToggle(false);
			}
		};

		if (toggle) document.addEventListener("mousedown", handleClickOutside);
		else document.removeEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [toggle]);

	// Animation variants pour la modal
	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.3 },
		},
		exit: {
			opacity: 0,
			transition: { delay: 0.2, duration: 0.3 },
		},
	};

	const modalVariants = {
		hidden: { y: "100%" },
		visible: {
			y: 0,
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300,
			},
		},
		exit: {
			y: "100%",
			transition: { duration: 0.3 },
		},
	};

	const menuItemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (custom) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.1 + custom * 0.1,
				duration: 0.5,
			},
		}),
	};

	return (
		<header
			className={`w-full mx-auto mt-3 absolute z-40 flex justify-center${
				isProjectPage ? "" : " md:mt-8"
			}`}
		>
			<div className="max-w-312.5 md:w-[90%] flex justify-between items-center w-full px-5">
				<Link href="/" className="flex items-center group">
					<Image
						src="/img/Logo-Skroma.jpg"
						alt="Logo de Matt Buchs"
						width={48}
						height={48}
						className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-amber-500/30 group-hover:ring-amber-500/60 group-hover:scale-105 transition-all duration-300"
					/>
					<span className="ml-3 text-xl sm:text-2xl font-space font-bold tracking-tight transition-all duration-300 group-hover:tracking-wide">
						<span className="text-white group-hover:text-amber-100 transition-colors duration-300">
							Matt
						</span>
						<span className="text-gradient-warm ml-1 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-300">
							Buchs
						</span>
					</span>
				</Link>

				<nav ref={navRef} className="h-full rounded-bl flex">
					{disableParallax && (
						<motion.button
							className="md:hidden w-12 h-12 flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-sm border border-zinc-700/50 rounded-xl transition-colors"
							onClick={() => setToggle(!toggle)}
							whileTap={{ scale: 0.95 }}
							aria-label="Ouvrir le menu"
							title="Ouvrir le menu"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="3"
									y="6"
									width="18"
									height="2"
									rx="1"
									fill="#fbbf24"
								/>
								<rect
									x="3"
									y="11"
									width="18"
									height="2"
									rx="1"
									fill="#fbbf24"
								/>
								<rect
									x="8"
									y="16"
									width="13"
									height="2"
									rx="1"
									fill="#fbbf24"
								/>
							</svg>
						</motion.button>
					)}

					{/* Menu pour les écrans larges */}
					{!disableParallax && (
						<ul
							className="items-center h-full text-lg flex gap-1"
							role="menubar"
							aria-label="Navigation principale"
						>
							<li role="none">
								<Link
									href="/"
									className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
										pathname === "/"
											? "text-amber-400 bg-amber-500/10"
											: "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
									}`}
									role="menuitem"
									aria-label="Aller à la page d'accueil"
								>
									Accueil
								</Link>
							</li>
							<li role="none">
								<Link
									href="/projects"
									className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
										pathname.startsWith("/projects")
											? "text-amber-400 bg-amber-500/10"
											: "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
									}`}
									role="menuitem"
									aria-label="Voir mes projets"
								>
									Projets
								</Link>
							</li>
							<li role="none">
								<Link
									href="/gamemaster-os"
									className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
										pathname.startsWith("/gamemaster-os")
											? "text-amber-400 bg-amber-500/10"
											: "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
									}`}
									role="menuitem"
									aria-label="Découvrir GameMaster OS"
								>
									GameMaster OS
								</Link>
							</li>
							<li role="none">
								<Link
									href="/contact"
									className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
										pathname === "/contact"
											? "text-amber-400 bg-amber-500/10"
											: "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
									}`}
									role="menuitem"
									aria-label="Me contacter"
								>
									Contact
								</Link>
							</li>
						</ul>
					)}
				</nav>
			</div>

			{/* Modal de navigation mobile */}
			<AnimatePresence>
				{toggle && disableParallax && (
					<>
						<motion.div
							className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
							variants={backdropVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							onClick={() => setToggle(false)}
						/>

						<motion.div
							ref={modalRef}
							className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700/50 rounded-t-3xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
							variants={modalVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							role="dialog"
							aria-modal="true"
							aria-label="Menu de navigation mobile"
						>
							<button
								className="flex justify-center pt-3 pb-4 w-full cursor-pointer"
								onClick={() => setToggle(false)}
								aria-label="Fermer le menu"
							>
								<div className="w-16 h-1 bg-zinc-600 rounded-full" />
							</button>

							<motion.h3
								className="text-center text-2xl font-semibold mb-4 text-white"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { delay: 0.2 },
								}}
								id="mobile-menu-title"
							>
								Menu
							</motion.h3>

							<nav
								className="p-6"
								aria-labelledby="mobile-menu-title"
							>
								<ul className="space-y-1" role="menu">
									<motion.li
										custom={0}
										variants={menuItemVariants}
										initial="hidden"
										animate="visible"
										role="none"
									>
										<Link
											href="/"
											className={`block py-3 px-4 text-lg rounded-xl transition-colors ${
												pathname === "/"
													? "bg-amber-500/20 text-amber-400 font-medium border border-amber-500/30"
													: "text-zinc-300 hover:bg-zinc-800"
											}`}
											onClick={() => setToggle(false)}
											role="menuitem"
											aria-label="Aller à la page d'accueil"
										>
											Accueil
										</Link>
									</motion.li>
									<motion.li
										custom={1}
										variants={menuItemVariants}
										initial="hidden"
										animate="visible"
										role="none"
									>
										<Link
											href="/projects"
											className={`block py-3 px-4 text-lg rounded-xl transition-colors ${
												pathname.startsWith("/projects")
													? "bg-amber-500/20 text-amber-400 font-medium border border-amber-500/30"
													: "text-zinc-300 hover:bg-zinc-800"
											}`}
											onClick={() => setToggle(false)}
											role="menuitem"
											aria-label="Voir mes projets"
										>
											Projets
										</Link>
									</motion.li>
									<motion.li
										custom={2}
										variants={menuItemVariants}
										initial="hidden"
										animate="visible"
										role="none"
									>
										<Link
											href="/gamemaster-os"
											className={`block py-3 px-4 text-lg rounded-xl transition-colors ${
												pathname.startsWith(
													"/gamemaster-os",
												)
													? "bg-amber-500/20 text-amber-400 font-medium border border-amber-500/30"
													: "text-zinc-300 hover:bg-zinc-800"
											}`}
											onClick={() => setToggle(false)}
											role="menuitem"
											aria-label="Découvrir GameMaster OS"
										>
											GameMaster OS
										</Link>
									</motion.li>
									<motion.li
										custom={3}
										variants={menuItemVariants}
										initial="hidden"
										animate="visible"
										role="none"
									>
										<Link
											href="/contact"
											className={`block py-3 px-4 text-lg rounded-xl transition-colors ${
												pathname === "/contact"
													? "bg-amber-500/20 text-amber-400 font-medium border border-amber-500/30"
													: "text-zinc-300 hover:bg-zinc-800"
											}`}
											onClick={() => setToggle(false)}
											role="menuitem"
											aria-label="Me contacter"
										>
											Contact
										</Link>
									</motion.li>
								</ul>
							</nav>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
