"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const links = [
		{ label: "Accueil", href: "/" },
		{ label: "Projets", href: "/projects" },
		{ label: "Contact", href: "/contact" },
	];

	const socials = [
		{ icon: Github, href: "https://github.com/MattBuchs", label: "GitHub" },
		{
			icon: Linkedin,
			href: "https://www.linkedin.com/in/matt-buchs/",
			label: "LinkedIn",
		},
		{ icon: Mail, href: "mailto:mattbuchs25@gmail.com", label: "Email" },
	];

	const legal = [
		{ label: "Mentions légales", href: "/legalNotice" },
		{ label: "Confidentialité", href: "/privacyPolicy" },
		{ label: "CGU", href: "/termsOfService" },
	];

	return (
		<footer className="relative bg-zinc-950 border-t border-zinc-800/50">
			{/* Gradient line */}
			<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />

			<div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
				{/* Main Footer */}
				<div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
					{/* Brand */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Image
								src="/img/Logo-Skroma.jpg"
								alt=""
								width={48}
								height={48}
								className="rounded-xl border border-zinc-700"
							/>
							<div>
								<h1 className="font-bold text-white">
									Matt Buchs
								</h1>
								<h2 className="text-xs text-zinc-500">
									Développeur Full-Stack
								</h2>
							</div>
						</div>
						<p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
							Création d&apos;applications web modernes et
							performantes avec une attention particulière au
							design et à l&apos;expérience utilisateur.
						</p>
					</div>

					{/* Navigation */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Navigation
						</h3>
						<nav className="flex flex-col gap-3">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-sm text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group w-fit"
								>
									{link.label}
									<ArrowUpRight
										size={12}
										className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
									/>
								</Link>
							))}
						</nav>
					</div>

					{/* Social & Contact */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Contact
						</h3>
						<div className="flex gap-3">
							{socials.map((social) => {
								const Icon = social.icon;
								return (
									<motion.a
										key={social.label}
										href={social.href}
										target={
											social.href.startsWith("http")
												? "_blank"
												: undefined
										}
										rel={
											social.href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
										className="w-10 h-10 bg-zinc-800 hover:bg-amber-500/10 border border-zinc-700 hover:border-amber-500/30 hover:rotate-2 rounded-lg flex items-center justify-center transition-colors group"
										aria-label={social.label}
									>
										<Icon
											size={18}
											className="text-zinc-400 group-hover:text-amber-400"
										/>
									</motion.a>
								);
							})}
						</div>
						<p className="text-sm text-zinc-500">
							mattbuchs25@gmail.com
						</p>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="py-6 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-zinc-500">
						© {currentYear} Matt Buchs. Tous droits réservés.
					</p>
					<nav className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
						{legal.map((item, idx) => (
							<span
								key={item.href}
								className="flex items-center gap-4"
							>
								<Link
									href={item.href}
									className="hover:text-amber-400 transition-colors"
								>
									{item.label}
								</Link>
								{idx < legal.length - 1 && (
									<span className="text-zinc-700">•</span>
								)}
							</span>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}
