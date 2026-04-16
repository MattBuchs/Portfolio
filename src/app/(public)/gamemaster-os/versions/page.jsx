"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Calendar,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Download,
	FileCode,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function VersionsPage() {
	const [versions, setVersions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [expandedVersions, setExpandedVersions] = useState({});

	useEffect(() => {
		fetchVersions();
	}, []);

	const fetchVersions = async () => {
		try {
			const res = await fetch("/api/versions");
			if (res.ok) {
				const data = await res.json();
				setVersions(data);
			}
		} catch (error) {
			console.error("Erreur chargement versions:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = async (versionId, fileName) => {
		try {
			await fetch("/api/versions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ versionId }),
			});
		} catch (error) {
			console.error("Erreur incrémentation téléchargements:", error);
		}
		window.location.href = `/downloads/${fileName}`;
	};

	const toggleExpanded = (versionId) => {
		setExpandedVersions((prev) => ({
			...prev,
			[versionId]: !prev[versionId],
		}));
	};

	const formatFileSize = (bytes) => {
		const mb = Number(bytes) / (1024 * 1024);
		return `${mb.toFixed(2)} MB`;
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<>
			<NavBar />
			<main className="min-h-screen bg-zinc-900">
				{/* Hero Section */}
				<section className="relative pt-32 pb-16 px-6 overflow-hidden">
					{/* Background Effects */}
					<div className="absolute inset-0 -z-10 overflow-hidden">
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-zinc-900" />

						{/* Animated Gradient Orbs */}
						<motion.div
							className="absolute top-20 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl will-change-transform backface-hidden"
							style={{ transform: "translateZ(0)" }}
							animate={{
								x: [0, 50, 0],
								y: [0, 30, 0],
								opacity: [0.8, 1, 0.8],
							}}
							transition={{
								duration: 10,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute bottom-20 -right-32 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl will-change-transform backface-hidden"
							style={{ transform: "translateZ(0)" }}
							animate={{
								x: [0, -40, 0],
								y: [0, -20, 0],
								opacity: [0.8, 1, 0.8],
							}}
							transition={{
								duration: 12,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>

						{/* Grid Pattern */}
						<div
							className="absolute inset-0 opacity-[0.02]"
							style={{
								backgroundImage: `linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)`,
								backgroundSize: "60px 60px",
							}}
						/>
					</div>

					<div className="max-w-5xl mx-auto">
						<Link
							href="/gamemaster-os"
							className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold mb-6 transition-colors"
						>
							<ArrowLeft className="w-5 h-5" />
							Retour à GameMaster OS
						</Link>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center mt-12"
						>
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
								<Sparkles className="w-4 h-4" />
								Notes de mise à jour
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								<span className="text-white">
									Historique des{" "}
								</span>
								<span className="text-gradient-warm">
									versions
								</span>
							</h1>
							<p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
								Consultez toutes les versions de GameMaster OS
								et leurs notes de mise à jour
							</p>
						</motion.div>
					</div>
				</section>

				{/* Versions List */}
				<section className="py-16 px-6 relative">
					{/* Decorative line */}
					<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

					<div className="max-w-5xl mx-auto">
						{loading ? (
							<div className="text-center py-12">
								<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
								<p className="mt-4 text-zinc-400">
									Chargement des versions...
								</p>
							</div>
						) : versions.length === 0 ? (
							<div className="bg-zinc-800/50 rounded-2xl p-12 text-center border border-zinc-700/50">
								<FileCode className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
								<p className="text-xl text-zinc-400">
									Aucune version disponible
								</p>
							</div>
						) : (
							<div className="space-y-6">
								{versions.map((version, index) => (
									<motion.div
										key={version.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className={`bg-zinc-800/50 rounded-2xl border overflow-hidden transition-all ${
											version.isLatest
												? "border-amber-500/50"
												: "border-zinc-700/50"
										}`}
									>
										{/* Header */}
										<div className="p-6">
											<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
												<div className="flex items-center gap-4">
													<div className="bg-amber-500/10 p-3 rounded-xl">
														<FileCode className="w-8 h-8 text-amber-500" />
													</div>
													<div>
														<div className="flex items-center gap-3 flex-wrap">
															<h2 className="text-2xl font-bold text-white">
																Version{" "}
																{
																	version.version
																}
															</h2>
															{version.isLatest && (
																<span className="bg-amber-500 text-zinc-900 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
																	<CheckCircle className="w-3 h-3" />
																	Dernière
																	version
																</span>
															)}
														</div>
														<div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
															<span className="flex items-center gap-1">
																<Calendar className="w-4 h-4" />
																{formatDate(
																	version.releaseDate,
																)}
															</span>
															<span>
																{formatFileSize(
																	version.fileSize,
																)}
															</span>
														</div>
													</div>
												</div>

												<button
													onClick={() =>
														handleDownload(
															version.id,
															version.fileName,
														)
													}
													className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
												>
													<Download className="w-5 h-5" />
													Télécharger
												</button>
											</div>

											{/* Toggle Release Notes */}
											<button
												onClick={() =>
													toggleExpanded(version.id)
												}
												className="w-full flex items-center justify-between py-3 px-4 bg-zinc-700/50 hover:bg-zinc-700 rounded-xl transition-colors cursor-pointer"
											>
												<span className="font-semibold text-white">
													Notes de version
												</span>
												{expandedVersions[
													version.id
												] ? (
													<ChevronUp className="w-5 h-5 text-zinc-400" />
												) : (
													<ChevronDown className="w-5 h-5 text-zinc-400" />
												)}
											</button>
										</div>

										{/* Release Notes (Collapsible) */}
										{expandedVersions[version.id] && (
											<motion.div
												initial={{
													height: 0,
													opacity: 0,
												}}
												animate={{
													height: "auto",
													opacity: 1,
												}}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3 }}
												className="px-6 pb-6"
											>
												<div className="bg-zinc-700/30 rounded-xl p-6">
													<ReactMarkdown
														components={{
															h1: ({
																node,
																...props
															}) => (
																<h1
																	className="text-3xl font-bold text-white mb-4 mt-6"
																	{...props}
																/>
															),
															h2: ({
																node,
																...props
															}) => (
																<h2
																	className="text-2xl font-bold text-white mb-3 mt-5"
																	{...props}
																/>
															),
															h3: ({
																node,
																...props
															}) => (
																<h3
																	className="text-xl font-bold text-white mb-2 mt-4"
																	{...props}
																/>
															),
															p: ({
																node,
																...props
															}) => (
																<p
																	className="text-zinc-300 mb-3 leading-relaxed"
																	{...props}
																/>
															),
															ul: ({
																node,
																...props
															}) => (
																<ul
																	className="list-disc list-inside mb-4 space-y-1"
																	{...props}
																/>
															),
															ol: ({
																node,
																...props
															}) => (
																<ol
																	className="list-decimal list-inside mb-4 space-y-1"
																	{...props}
																/>
															),
															li: ({
																node,
																...props
															}) => (
																<li
																	className="text-zinc-300 ml-4"
																	{...props}
																/>
															),
															a: ({
																node,
																...props
															}) => (
																<a
																	className="text-amber-500 hover:text-amber-400 underline"
																	{...props}
																/>
															),
															strong: ({
																node,
																...props
															}) => (
																<strong
																	className="font-bold text-white"
																	{...props}
																/>
															),
															em: ({
																node,
																...props
															}) => (
																<em
																	className="italic"
																	{...props}
																/>
															),
															code: ({
																node,
																inline,
																...props
															}) =>
																inline ? (
																	<code
																		className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-amber-400"
																		{...props}
																	/>
																) : (
																	<code
																		className="block bg-zinc-800 text-zinc-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4"
																		{...props}
																	/>
																),
															blockquote: ({
																node,
																...props
															}) => (
																<blockquote
																	className="border-l-4 border-amber-500/50 pl-4 italic text-zinc-400 my-4"
																	{...props}
																/>
															),
														}}
													>
														{version.releaseNotes}
													</ReactMarkdown>
												</div>
											</motion.div>
										)}
									</motion.div>
								))}
							</div>
						)}
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 px-6 relative overflow-hidden">
					{/* Decorative lines */}
					<div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

					{/* Animated orbs */}
					<motion.div
						className="absolute top-10 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl will-change-transform backface-hidden"
						style={{ transform: "translateZ(0)" }}
						animate={{
							x: [0, 40, 0],
							y: [0, -25, 0],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>

					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="relative rounded-3xl overflow-hidden border border-zinc-700/50"
						>
							{/* Background */}
							<div className="absolute inset-0 bg-zinc-800" />
							<div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-orange-500/5" />

							<div className="relative p-12 text-center">
								<h2 className="text-3xl md:text-4xl font-bold mb-4">
									<span className="text-white">
										Vous n&apos;avez pas encore{" "}
									</span>
									<span className="text-gradient-warm">
										GameMaster OS ?
									</span>
								</h2>
								<p className="text-xl text-zinc-400 mb-8">
									Téléchargez la dernière version et découvrez
									toutes les fonctionnalités
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link
										href="/gamemaster-os"
										className="btn-warm-gmos flex items-center justify-center gap-2 px-8 py-4 text-lg"
									>
										En savoir plus
									</Link>
									<Link
										href="/gamemaster-os#pricing"
										className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
									>
										Voir les offres PRO
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
