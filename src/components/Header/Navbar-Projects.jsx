"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarProjects() {
    const pathname = usePathname();

    return (
        <header className="absolute z-50 text-white flex justify-between items-center w-full h-12">
            <h1 className="text-2xl font-vibes font-semibold ml-2 mt-4 text-black bg-white px-5 pt-2 pb-0.5 border rounded-lg shadow-sm">
                Matt Buchs
            </h1>

            <nav className="bg-black/80 h-full px-8 rounded-bl">
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
