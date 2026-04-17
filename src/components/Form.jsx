"use client";

import * as EmailValidator from "email-validator";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Send, X } from "lucide-react";
import { useState } from "react";

export default function Form() {
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);
	const [formData, setFormData] = useState({
		lastName: "",
		firstName: "",
		email: "",
		phone: "",
		society: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const resetForm = () => {
		setFormData({
			lastName: "",
			firstName: "",
			email: "",
			phone: "",
			society: "",
			message: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.lastName.trim() ||
			!formData.email.trim() ||
			!formData.message.trim()
		) {
			return setErrorMessage(
				"Veuillez remplir tous les champs obligatoires s'il vous plaît.",
			);
		}

		if (!EmailValidator.validate(formData.email.trim())) {
			return setErrorMessage("Le format de l'email n'est pas valide.");
		}

		setIsSubmitting(true);
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Erreur lors de l'envoi");
			}

			resetForm();
			setSuccessMessage(true);
			setTimeout(() => {
				setSuccessMessage(false);
			}, 5000);
		} catch (error) {
			setErrorMessage(
				error.message ||
					"Une erreur s'est produite. Veuillez réessayer.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputClasses =
		"w-full h-11 px-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none";
	const labelClasses = "text-zinc-300 font-medium mb-1.5 block";
	const optionalClasses = "ml-1 text-zinc-500 text-xs";

	return (
		<div className="relative">
			<AnimatePresence>
				{successMessage && (
					<motion.div
						initial={{ opacity: 0, y: -20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
						}}
						className="fixed top-4 right-4 z-50 bg-zinc-800 border border-green-500/30 shadow-xl rounded-xl px-5 py-4 max-w-md w-full flex items-center"
					>
						<div className="shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
							<CheckCircle className="w-5 h-5 text-green-400" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-white mb-0.5">
								Message envoyé !
							</h3>
							<p className="text-zinc-400 text-sm">
								Je vous répondrai dans les plus brefs délais.
							</p>
						</div>
						<button
							className="ml-2 text-zinc-500 hover:text-white p-1 transition-colors"
							onClick={() => setSuccessMessage(false)}
							aria-label="Fermer la notification"
						>
							<X className="w-5 h-5" />
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			<form onSubmit={handleSubmit} aria-label="Formulaire de contact">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<label htmlFor="last-name" className={labelClasses}>
							Nom <span className="text-amber-400">*</span>
						</label>
						<input
							type="text"
							id="last-name"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className={inputClasses}
							required
							aria-required="true"
						/>
					</div>
					<div>
						<label htmlFor="first-name" className={labelClasses}>
							Prénom
							<span className={optionalClasses}>(optionnel)</span>
						</label>
						<input
							type="text"
							id="first-name"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className={inputClasses}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<label htmlFor="email" className={labelClasses}>
							Email <span className="text-amber-400">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={inputClasses}
							required
							aria-required="true"
						/>
					</div>
					<div>
						<label htmlFor="phone" className={labelClasses}>
							Téléphone
							<span className={optionalClasses}>(optionnel)</span>
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className={inputClasses}
						/>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="society" className={labelClasses}>
						Société
						<span className={optionalClasses}>(optionnel)</span>
					</label>
					<input
						type="text"
						id="society"
						name="society"
						value={formData.society}
						onChange={handleChange}
						className={inputClasses}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="message" className={labelClasses}>
						Message <span className="text-amber-400">*</span>
					</label>
					<textarea
						name="message"
						id="message"
						value={formData.message}
						onChange={handleChange}
						className="w-full h-32 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none resize-none"
						required
						aria-required="true"
					></textarea>
				</div>

				{errorMessage && (
					<motion.div
						className="mb-4 px-4 py-3 bg-red-500/10 rounded-xl border border-red-500/30 flex items-start"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						role="alert"
						aria-live="assertive"
					>
						<AlertCircle className="w-5 h-5 text-red-400 mr-3 shrink-0 mt-0.5" />
						<p className="text-red-400 text-sm font-medium">
							{errorMessage}
						</p>
					</motion.div>
				)}

				<motion.button
					type="submit"
					disabled={isSubmitting}
					className={`btn-warm w-full flex justify-center items-center gap-2 ${
						isSubmitting
							? "opacity-70 cursor-not-allowed"
							: "cursor-pointer"
					}`}
					whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
					whileTap={!isSubmitting ? { scale: 0.98 } : {}}
					transition={{ type: "spring", stiffness: 400, damping: 25 }}
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>Envoi en cours...</span>
						</>
					) : (
						<>
							<Send className="w-5 h-5" />
							<span>Envoyer le message</span>
						</>
					)}
				</motion.button>
			</form>
		</div>
	);
}
