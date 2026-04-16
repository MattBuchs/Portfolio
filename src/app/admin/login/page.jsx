"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
			});

			if (result?.error) {
				setError("Identifiants incorrects");
				setLoading(false);
			} else {
				router.push("/admin/dashboard");
				router.refresh();
			}
		} catch {
			setError("Une erreur est survenue");
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-zinc-900 flex items-center justify-center px-6 relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-orange-500/5" />
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md relative z-10"
			>
				<div className="bg-zinc-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-zinc-700/50">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
							<Lock className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Administration
						</h1>
						<p className="text-zinc-400">
							Connectez-vous pour accéder au tableau de bord
						</p>
					</div>

					{/* Error Message */}
					{error && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
						>
							<AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
							<p className="text-sm text-red-400">{error}</p>
						</motion.div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-semibold text-zinc-300 mb-2"
							>
								Email
							</label>
							<div className="relative">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
								<input
									type="email"
									id="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
									placeholder="admin@example.com"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-zinc-300 mb-2"
							>
								Mot de passe
							</label>
							<div className="relative">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
								<input
									type="password"
									id="password"
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
						>
							{loading ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Connexion...
								</>
							) : (
								<>
									<Lock className="w-5 h-5" />
									Se connecter
								</>
							)}
						</button>
					</form>

					<div className="mt-6 pt-6 border-t border-zinc-700/50 text-center">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour au site
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
