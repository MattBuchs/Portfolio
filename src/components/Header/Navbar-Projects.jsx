"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarProjects() {
	const pathname = usePathname();

	return (
		<header className="absolute z-50 text-white flex justify-between items-center w-full h-12">
			<h1 className="text-2xl font-space font-bold ml-2 mt-4 bg-zinc-800/90 backdrop-blur-sm px-5 pt-2 pb-1 border border-zinc-700 rounded-lg">
				<span className="text-white">Matt</span>
				<span className="text-gradient-warm ml-1">Buchs</span>
			</h1>

			<nav className="bg-zinc-900/80 backdrop-blur-sm h-full px-8 rounded-bl border-l border-b border-zinc-700/50">
				<ul className="flex items-center h-full">
					<li className="mr-4 mb-1">
						<Link
							href="/"
							className={`${
								pathname === "/" &&
								"underline underline-offset-4"
							}`}
						>
							Accueil
						</Link>
					</li>
					<li className="mr-4 mb-1">
						<Link
							href="/projects"
							className={`${
								pathname.startsWith("/projects") &&
								"underline underline-offset-4"
							}`}
						>
							Projets
						</Link>
					</li>
					<li>
						<Link
							href="/contact"
							className={`${
								pathname === "/contact" &&
								"underline underline-offset-4"
							}`}
						>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
