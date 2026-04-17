"use client";

import {
	Calendar,
	CheckCircle,
	Download,
	ExternalLink,
	FileCode,
	Link,
	Star,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function VersionManager() {
	const [versions, setVersions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	// Form state
	const [version, setVersion] = useState("");
	const [releaseNotes, setReleaseNotes] = useState("");
	const [downloadUrl, setDownloadUrl] = useState("");
	const [fileSize, setFileSize] = useState("");

	useEffect(() => {
		fetchVersions();
	}, []);

	const fetchVersions = async () => {
		try {
			const res = await fetch("/api/admin/versions");
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!downloadUrl || !version || !releaseNotes || !fileSize) {
			alert("Tous les champs sont requis");
			return;
		}

		// Convertir la taille en bytes (input en MB)
		const fileSizeBytes = Math.round(parseFloat(fileSize) * 1024 * 1024);

		if (isNaN(fileSizeBytes) || fileSizeBytes <= 0) {
			alert("Taille de fichier invalide");
			return;
		}

		setSubmitting(true);

		try {
			const res = await fetch("/api/admin/versions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					version,
					releaseNotes,
					downloadUrl,
					fileSize: fileSizeBytes,
				}),
			});

			if (res.ok) {
				alert("Version ajoutée avec succès !");
				setVersion("");
				setReleaseNotes("");
				setDownloadUrl("");
				setFileSize("");
				fetchVersions();
			} else {
				const error = await res.json();
				alert(error.error || "Erreur lors de l'ajout");
			}
		} catch (error) {
			console.error("Erreur:", error);
			alert("Erreur lors de l'ajout");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (versionId, fileName) => {
		if (
			!confirm(
				`Êtes-vous sûr de vouloir supprimer la version ${fileName} ?`,
			)
		) {
			return;
		}

		try {
			const res = await fetch(`/api/admin/versions?id=${versionId}`, {
				method: "DELETE",
			});

			if (res.ok) {
				alert("Version supprimée avec succès");
				fetchVersions();
			} else {
				const error = await res.json();
				alert(error.error || "Erreur lors de la suppression");
			}
		} catch (error) {
			console.error("Erreur suppression:", error);
			alert("Erreur lors de la suppression");
		}
	};

	const handleSetLatest = async (versionId) => {
		if (
			!confirm(
				"Êtes-vous sûr de vouloir définir cette version comme la dernière version ?",
			)
		) {
			return;
		}

		try {
			const res = await fetch("/api/admin/versions", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ versionId }),
			});

			if (res.ok) {
				alert("Version mise à jour avec succès");
				fetchVersions();
			} else {
				const error = await res.json();
				alert(error.error || "Erreur lors de la mise à jour");
			}
		} catch (error) {
			console.error("Erreur mise à jour:", error);
			alert("Erreur lors de la mise à jour");
		}
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
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (loading) {
		return (
			<div className="text-center py-8">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Formulaire d'ajout */}
			<div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-6">
				<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
					<Link className="w-6 h-6 text-amber-400" />
					Ajouter une nouvelle version
				</h3>

				<div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
					<p className="text-blue-300 text-sm">
						<strong>Instructions :</strong> Uploadez d'abord votre
						fichier .exe sur{" "}
						<a
							href="https://github.com/MattBuchs/Portfolio/releases/new"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline inline-flex items-center gap-1"
						>
							GitHub Releases <ExternalLink className="w-3 h-3" />
						</a>
						, puis copiez l'URL de téléchargement direct du fichier.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-semibold text-zinc-300 mb-2">
								Numéro de version *
							</label>
							<input
								type="text"
								value={version}
								onChange={(e) => setVersion(e.target.value)}
								placeholder="1.0.0"
								className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none"
								required
							/>
							<p className="text-xs text-zinc-500 mt-1">
								Format: X.Y.Z (ex: 1.2.3)
							</p>
						</div>

						<div>
							<label className="block text-sm font-semibold text-zinc-300 mb-2">
								Taille du fichier (MB) *
							</label>
							<input
								type="number"
								step="0.01"
								min="0"
								value={fileSize}
								onChange={(e) => setFileSize(e.target.value)}
								placeholder="120.5"
								className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none"
								required
							/>
							<p className="text-xs text-zinc-500 mt-1">
								Taille en mégaoctets (ex: 120.5)
							</p>
						</div>
					</div>

					<div>
						<label className="block text-sm font-semibold text-zinc-300 mb-2">
							URL de téléchargement GitHub *
						</label>
						<input
							type="url"
							value={downloadUrl}
							onChange={(e) => setDownloadUrl(e.target.value)}
							placeholder="https://github.com/MattBuchs/Portfolio/releases/download/v1.0.0/GameMasterOS_v1.0.0_Setup.exe"
							className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none"
							required
						/>
						<p className="text-xs text-zinc-500 mt-1">
							Lien direct vers le fichier .exe sur GitHub Releases
						</p>
					</div>

					<div>
						<label className="block text-sm font-semibold text-zinc-300 mb-2">
							Notes de version (Markdown) *
						</label>
						<textarea
							value={releaseNotes}
							onChange={(e) => setReleaseNotes(e.target.value)}
							placeholder="## Nouveautés
- Nouvelle fonctionnalité X
- Amélioration Y

## Corrections
- Correction du bug Z"
							className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none font-mono text-sm"
							rows={8}
							required
						/>
					</div>

					<button
						type="submit"
						disabled={submitting}
						className="w-full md:w-auto px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 disabled:bg-zinc-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
					>
						{submitting ? (
							<>
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								Ajout en cours...
							</>
						) : (
							<>
								<Link className="w-5 h-5" />
								Ajouter cette version
							</>
						)}
					</button>
				</form>
			</div>

			{/* Liste des versions */}
			<div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-6">
				<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
					<FileCode className="w-6 h-6 text-amber-400" />
					Versions existantes ({versions.length})
				</h3>

				{versions.length === 0 ? (
					<p className="text-zinc-500 text-center py-8">
						Aucune version disponible
					</p>
				) : (
					<div className="space-y-4">
						{versions.map((v) => (
							<div
								key={v.id}
								className={`border rounded-xl p-4 ${
									v.isLatest
										? "border-green-500/50 bg-green-500/10"
										: "border-zinc-700/50 bg-zinc-900/30"
								}`}
							>
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center gap-3">
										<div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
											<FileCode className="w-6 h-6 text-amber-400" />
										</div>
										<div>
											<div className="flex items-center gap-2">
												<h4 className="text-lg font-bold text-white">
													Version {v.version}
												</h4>
												{v.isLatest && (
													<span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
														<CheckCircle className="w-3 h-3" />
														Dernière version
													</span>
												)}
											</div>
											<p className="text-sm text-zinc-500">
												{v.fileName} •{" "}
												{formatFileSize(v.fileSize)}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-2">
										{!v.isLatest && (
											<button
												onClick={() =>
													handleSetLatest(v.id)
												}
												className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
												title="Définir comme dernière version"
											>
												<Star className="w-5 h-5" />
											</button>
										)}
										<a
											href={v.downloadUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
											title="Voir sur GitHub"
										>
											<ExternalLink className="w-5 h-5" />
										</a>
										{!v.isLatest && (
											<button
												onClick={() =>
													handleDelete(
														v.id,
														v.version,
													)
												}
												className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
												title="Supprimer"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										)}
									</div>
								</div>

								<div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
									<span className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										{formatDate(v.releaseDate)}
									</span>
									<span className="flex items-center gap-1">
										<Download className="w-4 h-4" />
										{v.downloadCount} téléchargements
									</span>
								</div>

								<div className="bg-zinc-900/50 rounded-xl p-3 text-sm text-zinc-300">
									<p className="font-semibold mb-2 text-zinc-200">
										Notes de version :
									</p>
									<div>
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												h1: ({ node, ...props }) => (
													<h1
														className="text-2xl font-bold text-white mb-3 mt-4"
														{...props}
													/>
												),
												h2: ({ node, ...props }) => (
													<h2
														className="text-xl font-bold text-white mb-2 mt-3"
														{...props}
													/>
												),
												h3: ({ node, ...props }) => (
													<h3
														className="text-lg font-bold text-white mb-2 mt-3"
														{...props}
													/>
												),
												p: ({ node, ...props }) => (
													<p
														className="text-zinc-300 mb-2 leading-relaxed"
														{...props}
													/>
												),
												ul: ({ node, ...props }) => (
													<ul
														className="list-disc list-inside mb-3 space-y-1"
														{...props}
													/>
												),
												ol: ({ node, ...props }) => (
													<ol
														className="list-decimal list-inside mb-3 space-y-1"
														{...props}
													/>
												),
												li: ({ node, ...props }) => (
													<li
														className="text-zinc-300 ml-4"
														{...props}
													/>
												),
												a: ({ node, ...props }) => (
													<a
														className="text-amber-400 hover:text-amber-300 underline"
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
												em: ({ node, ...props }) => (
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
															className="bg-zinc-800 px-1 py-0.5 rounded text-xs font-mono text-amber-400"
															{...props}
														/>
													) : (
														<code
															className="block bg-zinc-950 text-zinc-100 p-3 rounded-lg overflow-x-auto font-mono text-xs mb-3"
															{...props}
														/>
													),
												blockquote: ({
													node,
													...props
												}) => (
													<blockquote
														className="border-l-4 border-amber-500/50 pl-3 italic text-zinc-400 my-3"
														{...props}
													/>
												),
												table: ({ node, ...props }) => (
													<div className="overflow-x-auto my-3">
														<table
															className="w-full border-collapse text-xs"
															{...props}
														/>
													</div>
												),
												thead: ({ node, ...props }) => (
													<thead
														className="bg-zinc-800"
														{...props}
													/>
												),
												tbody: ({ node, ...props }) => (
													<tbody {...props} />
												),
												tr: ({ node, ...props }) => (
													<tr
														className="border-b border-zinc-700"
														{...props}
													/>
												),
												th: ({ node, ...props }) => (
													<th
														className="px-3 py-2 text-left font-semibold text-amber-400 border border-zinc-700"
														{...props}
													/>
												),
												td: ({ node, ...props }) => (
													<td
														className="px-3 py-2 text-zinc-300 border border-zinc-700"
														{...props}
													/>
												),
											}}
										>
											{v.releaseNotes}
										</ReactMarkdown>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
