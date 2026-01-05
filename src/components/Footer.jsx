import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white">
            <div className="max-w-200 w-full md:w-11/12 h-full mx-auto pt-6 md:pb-3 flex flex-col md:flex-row md:justify-between">
                <nav
                    className="pt-2 hidden md:block"
                    aria-label="Navigation du pied de page"
                >
                    <ul className="flex flex-col items-center justify-start mx-2 text-lg">
                        <li className="mb-1 w-full">
                            <Link
                                href="/"
                                className="hover:underline"
                                aria-label="Aller à la page d'accueil"
                            >
                                Accueil
                            </Link>
                        </li>
                        <li className="mb-1 w-full">
                            <Link
                                href="/projects"
                                className="hover:underline"
                                aria-label="Voir mes projets"
                            >
                                Projets
                            </Link>
                        </li>
                        <li className="mb-1 w-full">
                            <Link
                                href="/contact"
                                className="hover:underline"
                                aria-label="Me contacter"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-col items-center text-sm">
                    <Image
                        src="/img/Logo-Skroma.jpg"
                        alt="Logo Matt Buchs"
                        className="w-16 h-16 rounded-full mb-6"
                        width={64}
                        height={64}
                    />
                    <p className="text-base">By Matt.</p>
                    <p className="mb-3">
                        matt-buchs.me - {new Date().getFullYear()}
                        <br />
                        &copy; All rights reserved
                    </p>
                    <nav className="flex flex-wrap justify-center gap-3 text-xs text-slate-300">
                        <Link
                            href="/legalNotice"
                            className="hover:underline hover:text-white"
                        >
                            Mentions légales
                        </Link>
                        <span>•</span>
                        <Link
                            href="/privacyPolicy"
                            className="hover:underline hover:text-white"
                        >
                            Confidentialité
                        </Link>
                        <span>•</span>
                        <Link
                            href="/termsOfService"
                            className="hover:underline hover:text-white"
                        >
                            CGU
                        </Link>
                    </nav>
                </div>
                <div
                    className="flex mt-6 md:mt-0 md:mr-2 border-t md:border-0 border-slate-50/30"
                    role="navigation"
                    aria-label="Liens réseaux sociaux"
                >
                    <a
                        href="https://github.com/MattBuchs"
                        className="w-full h-full flex justify-center pt-3 mr-1 border-r md:border-r-0 pb-3 md:pb-0 border-slate-50/30"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visiter mon profil GitHub"
                        title="GitHub"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 496 512"
                            height="30"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:fill-slate-400"
                        >
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/matt-buchs/"
                        className="w-full h-full flex justify-center pt-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visiter mon profil LinkedIn"
                        title="LinkedIn"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="30"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:fill-slate-400"
                        >
                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
