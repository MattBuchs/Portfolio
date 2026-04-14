"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, Check, Download, FileText } from "lucide-react";
import { useState } from "react";

export default function DownloadCV() {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const handleDownload = () => {
		if (isDownloading || isComplete) return;

		setIsDownloading(true);

		// Simulate download delay for visual feedback
		setTimeout(() => {
			const link = document.createElement("a");
			link.href = "/files/CV-MattBuchs.pdf";
			link.download = "CV_Matt_Buchs.pdf";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			setIsDownloading(false);
			setIsComplete(true);

			// Reset after 2 seconds
			setTimeout(() => setIsComplete(false), 2000);
		}, 600);
	};

	return (
		<motion.button
			onClick={handleDownload}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 400, damping: 25 }}
			className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-transparent border-2 border-amber-500/50 text-amber-400 font-semibold rounded-xl overflow-hidden hover:border-amber-400 hover:bg-amber-500/5 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)] will-change-transform cursor-pointer"
			style={{
				transition:
					"border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
			}}
			aria-label="Télécharger mon CV en PDF"
			disabled={isDownloading}
		>
			{/* Background glow effect on hover */}
			<div className="absolute inset-0 bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

			{/* Icon with animation */}
			<AnimatePresence mode="wait">
				{isComplete ? (
					<motion.div
						key="check"
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						exit={{ scale: 0 }}
						className="relative z-10"
					>
						<Check size={20} className="text-green-400" />
					</motion.div>
				) : isDownloading ? (
					<motion.div
						key="loading"
						animate={{ y: [0, 4, 0] }}
						transition={{ duration: 0.5, repeat: Infinity }}
						className="relative z-10"
					>
						<ArrowDownToLine size={20} className="text-amber-400" />
					</motion.div>
				) : (
					<motion.div
						key="file"
						className="relative z-10"
						whileHover={{ rotate: [0, -10, 10, 0] }}
						transition={{ duration: 0.4 }}
					>
						<FileText size={20} />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Text */}
			<span className="relative z-10">
				{isComplete
					? "Téléchargé !"
					: isDownloading
						? "Téléchargement..."
						: "Mon CV"}
			</span>

			{/* Download icon */}
			{!isComplete && !isDownloading && (
				<motion.div
					className="relative z-10"
					animate={{ y: [0, 2, 0] }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Download
						size={18}
						className="opacity-70 group-hover:opacity-100 transition-opacity"
					/>
				</motion.div>
			)}

			{/* Shine effect */}
			<motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
		</motion.button>
	);
}
