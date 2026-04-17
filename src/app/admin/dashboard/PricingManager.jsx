"use client";

import { motion } from "framer-motion";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	DollarSign,
	RefreshCw,
	Tag,
	TrendingDown,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PricingManager() {
	const [pricing, setPricing] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editingPlan, setEditingPlan] = useState(null);
	const [editForm, setEditForm] = useState({
		currentPrice: "",
		isOnSale: false,
		saleEndDate: "",
	});
	const [saveLoading, setSaveLoading] = useState(false);
	const [message, setMessage] = useState({ type: "", text: "" });

	const fetchPricing = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/admin/pricing");
			const data = await res.json();
			setPricing(data);
		} catch (error) {
			console.error("Error fetching pricing:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchPricing();
	}, []);

	const handleEdit = (plan) => {
		setEditingPlan(plan.plan);
		setEditForm({
			currentPrice: plan.currentPrice.toString(),
			isOnSale: plan.isOnSale,
			saleEndDate: plan.saleEndDate
				? new Date(plan.saleEndDate).toISOString().split("T")[0]
				: "",
		});
		setMessage({ type: "", text: "" });
	};

	const handleSave = async (plan) => {
		setSaveLoading(true);
		setMessage({ type: "", text: "" });

		try {
			const res = await fetch("/api/admin/pricing", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					plan: plan,
					currentPrice: parseFloat(editForm.currentPrice),
					isOnSale: editForm.isOnSale,
					saleEndDate: editForm.saleEndDate || null,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				await fetchPricing();
				setEditingPlan(null);
				setMessage({
					type: "success",
					text: "Prix mis à jour avec succès !",
				});
				setTimeout(() => setMessage({ type: "", text: "" }), 3000);
			} else {
				setMessage({
					type: "error",
					text: data.error || "Erreur lors de la mise à jour",
				});
			}
		} catch (error) {
			setMessage({
				type: "error",
				text: "Erreur lors de la mise à jour",
			});
		}
		setSaveLoading(false);
	};

	const handleReset = async (plan) => {
		if (
			!confirm(
				"Êtes-vous sûr de vouloir réinitialiser ce prix au prix de base ?",
			)
		) {
			return;
		}

		try {
			const res = await fetch("/api/admin/pricing", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plan }),
			});

			if (res.ok) {
				await fetchPricing();
				setMessage({
					type: "success",
					text: "Prix réinitialisé avec succès !",
				});
				setTimeout(() => setMessage({ type: "", text: "" }), 3000);
			}
		} catch (error) {
			console.error("Error resetting pricing:", error);
		}
	};

	const calculateDiscount = (basePrice, currentPrice) => {
		if (basePrice === currentPrice) return 0;
		return Math.round(((basePrice - currentPrice) / basePrice) * 100);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h2 className="text-2xl font-bold text-white flex items-center gap-2">
						<DollarSign className="w-6 h-6 text-amber-400" />
						Gestion des Prix
					</h2>
					<p className="text-zinc-400 text-sm mt-1">
						Définissez les prix et promotions pour vos plans
					</p>
				</div>
			</div>

			{/* Message */}
			{message.text && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`p-4 rounded-xl border flex items-start gap-3 ${
						message.type === "success"
							? "bg-green-500/10 border-green-500/20"
							: "bg-red-500/10 border-red-500/20"
					}`}
				>
					{message.type === "success" ? (
						<CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
					) : (
						<AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
					)}
					<p
						className={`text-sm ${
							message.type === "success"
								? "text-green-400"
								: "text-red-400"
						}`}
					>
						{message.text}
					</p>
				</motion.div>
			)}

			{/* Pricing Cards */}
			<div className="grid md:grid-cols-2 gap-6">
				{loading ? (
					<div className="col-span-2 p-8 text-center">
						<div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
					</div>
				) : (
					pricing.map((plan) => {
						const isEditing = editingPlan === plan.plan;
						const discount = calculateDiscount(
							plan.basePrice,
							plan.currentPrice,
						);
						const isExpired =
							plan.saleEndDate &&
							new Date(plan.saleEndDate) < new Date();

						return (
							<motion.div
								key={plan.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50"
							>
								{/* Plan Header */}
								<div className="flex justify-between items-start mb-6">
									<div>
										<h3 className="text-xl font-bold text-white">
											Plan {plan.plan}
										</h3>
										<p className="text-sm text-zinc-400 mt-1">
											Prix de base: {plan.basePrice}€
										</p>
									</div>
									{plan.isOnSale && !isExpired && (
										<span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-semibold flex items-center gap-1">
											<TrendingDown className="w-3 h-3" />
											PROMO
										</span>
									)}
								</div>

								{isEditing ? (
									/* Edit Mode */
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-semibold text-zinc-300 mb-2">
												Prix actuel (€)
											</label>
											<input
												type="number"
												step="0.01"
												value={editForm.currentPrice}
												onChange={(e) =>
													setEditForm({
														...editForm,
														currentPrice:
															e.target.value,
													})
												}
												className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
											/>
										</div>

										<div>
											<label className="flex items-center gap-2 cursor-pointer">
												<input
													type="checkbox"
													checked={editForm.isOnSale}
													onChange={(e) =>
														setEditForm({
															...editForm,
															isOnSale:
																e.target
																	.checked,
														})
													}
													className="w-4 h-4 text-amber-500 bg-zinc-900 border-zinc-700 rounded focus:ring-amber-500/50"
												/>
												<span className="text-sm font-semibold text-zinc-300">
													Marquer comme promotion
												</span>
											</label>
										</div>

										{editForm.isOnSale && (
											<div>
												<label className="block text-sm font-semibold text-zinc-300 mb-2">
													Date de fin de promotion
												</label>
												<input
													type="date"
													value={editForm.saleEndDate}
													onChange={(e) =>
														setEditForm({
															...editForm,
															saleEndDate:
																e.target.value,
														})
													}
													className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
												/>
												<p className="text-xs text-zinc-500 mt-1">
													Laisser vide pour pas de
													date de fin
												</p>
											</div>
										)}

										<div className="flex gap-3 pt-2">
											<button
												onClick={() =>
													setEditingPlan(null)
												}
												className="flex-1 px-4 py-2 border border-zinc-700 text-zinc-300 rounded-xl font-semibold hover:bg-zinc-700/50 transition-colors cursor-pointer"
											>
												Annuler
											</button>
											<button
												onClick={() =>
													handleSave(plan.plan)
												}
												disabled={saveLoading}
												className="flex-1 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
											>
												{saveLoading
													? "Enregistrement..."
													: "Enregistrer"}
											</button>
										</div>
									</div>
								) : (
									/* Display Mode */
									<div className="space-y-4">
										<div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
											<div className="flex justify-between items-baseline mb-2">
												<span className="text-sm text-zinc-400">
													Prix actuel
												</span>
												<div className="text-right">
													<span className="text-3xl font-bold text-amber-400">
														{plan.currentPrice}€
													</span>
													{discount > 0 && (
														<div className="text-sm text-green-400 font-semibold mt-1">
															-{discount}% de
															réduction
														</div>
													)}
												</div>
											</div>
										</div>

										{plan.saleEndDate && (
											<div className="flex items-center gap-2 text-sm text-zinc-400">
												<Calendar className="w-4 h-4" />
												<span>
													{isExpired
														? "Promotion expirée le"
														: "Promotion jusqu'au"}{" "}
													{new Date(
														plan.saleEndDate,
													).toLocaleDateString(
														"fr-FR",
													)}
												</span>
											</div>
										)}

										<div className="flex gap-3 pt-2">
											<button
												onClick={() => handleEdit(plan)}
												className="flex-1 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
											>
												<Tag className="w-4 h-4" />
												Modifier
											</button>
											{plan.currentPrice !==
												plan.basePrice && (
												<button
													onClick={() =>
														handleReset(plan.plan)
													}
													className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-xl font-semibold hover:bg-zinc-700/50 transition-colors flex items-center gap-2 cursor-pointer"
												>
													<RefreshCw className="w-4 h-4" />
													Réinitialiser
												</button>
											)}
										</div>
									</div>
								)}
							</motion.div>
						);
					})
				)}
			</div>

			{/* Info Box */}
			<div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
				<div className="flex items-start gap-3">
					<AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
					<div className="text-sm text-amber-300">
						<p className="font-semibold mb-1">
							💡 Comment ça marche ?
						</p>
						<ul className="space-y-1 list-disc list-inside text-zinc-400">
							<li>
								Modifiez le prix actuel pour appliquer une
								réduction
							</li>
							<li>
								Les clients verront automatiquement le nouveau
								prix sur le site
							</li>
							<li>
								Activez "Promotion" pour afficher un badge PROMO
							</li>
							<li>
								Définissez une date de fin pour une promotion
								temporaire
							</li>
							<li>
								Les codes promo s'appliquent en plus des
								réductions de prix
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
