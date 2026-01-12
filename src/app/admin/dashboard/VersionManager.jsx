"use client";

import { useState, useEffect } from "react";
import {
    Upload,
    Download,
    Trash2,
    Calendar,
    FileCode,
    CheckCircle,
    Star,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function VersionManager() {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [version, setVersion] = useState("");
    const [releaseNotes, setReleaseNotes] = useState("");
    const [file, setFile] = useState(null);

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

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file || !version || !releaseNotes) {
            alert("Tous les champs sont requis");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("version", version);
            formData.append("releaseNotes", releaseNotes);

            const res = await fetch("/api/admin/versions", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Version ajoutée avec succès !");
                setVersion("");
                setReleaseNotes("");
                setFile(null);
                fetchVersions();
            } else {
                const error = await res.json();
                alert(error.error || "Erreur lors de l'upload");
            }
        } catch (error) {
            console.error("Erreur upload:", error);
            alert("Erreur lors de l'upload");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (versionId, fileName) => {
        if (
            !confirm(
                `Êtes-vous sûr de vouloir supprimer la version ${fileName} ?`
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
                "Êtes-vous sûr de vouloir définir cette version comme la dernière version ?"
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
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Formulaire d'ajout */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Upload className="w-6 h-6 text-blue-600" />
                    Ajouter une nouvelle version
                </h3>

                <form onSubmit={handleUpload} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Numéro de version *
                            </label>
                            <input
                                type="text"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                placeholder="1.0.0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Format: X.Y.Z (ex: 1.2.3)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Fichier .exe *
                            </label>
                            <input
                                type="file"
                                accept=".exe"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            rows={8}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        {uploading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Upload en cours...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Ajouter cette version
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Liste des versions */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileCode className="w-6 h-6 text-blue-600" />
                    Versions existantes ({versions.length})
                </h3>

                {versions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        Aucune version disponible
                    </p>
                ) : (
                    <div className="space-y-4">
                        {versions.map((v) => (
                            <div
                                key={v.id}
                                className={`border rounded-lg p-4 ${
                                    v.isLatest
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <FileCode className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-lg font-bold text-gray-900">
                                                    Version {v.version}
                                                </h4>
                                                {v.isLatest && (
                                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Dernière version
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">
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
                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                                                title="Définir comme dernière version"
                                            >
                                                <Star className="w-5 h-5" />
                                            </button>
                                        )}
                                        <a
                                            href={`/downloads/${v.fileName}`}
                                            download
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                            title="Télécharger"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                        {!v.isLatest && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        v.id,
                                                        v.version
                                                    )
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(v.releaseDate)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        {v.downloadCount} téléchargements
                                    </span>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                                    <p className="font-semibold mb-2">
                                        Notes de version :
                                    </p>
                                    <div>
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ node, ...props }) => (
                                                    <h1
                                                        className="text-2xl font-bold text-gray-900 mb-3 mt-4"
                                                        {...props}
                                                    />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2
                                                        className="text-xl font-bold text-gray-900 mb-2 mt-3"
                                                        {...props}
                                                    />
                                                ),
                                                h3: ({ node, ...props }) => (
                                                    <h3
                                                        className="text-lg font-bold text-gray-900 mb-2 mt-3"
                                                        {...props}
                                                    />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p
                                                        className="text-gray-700 mb-2 leading-relaxed"
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
                                                        className="text-gray-700 ml-4"
                                                        {...props}
                                                    />
                                                ),
                                                a: ({ node, ...props }) => (
                                                    <a
                                                        className="text-blue-600 hover:text-blue-700 underline"
                                                        {...props}
                                                    />
                                                ),
                                                strong: ({
                                                    node,
                                                    ...props
                                                }) => (
                                                    <strong
                                                        className="font-bold text-gray-900"
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
                                                            className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-800"
                                                            {...props}
                                                        />
                                                    ) : (
                                                        <code
                                                            className="block bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-xs mb-3"
                                                            {...props}
                                                        />
                                                    ),
                                                blockquote: ({
                                                    node,
                                                    ...props
                                                }) => (
                                                    <blockquote
                                                        className="border-l-4 border-gray-300 pl-3 italic text-gray-600 my-3"
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
