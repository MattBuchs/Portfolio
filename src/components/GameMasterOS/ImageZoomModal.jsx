"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function ImageZoomModal({ zoomedImage, onClose }) {
	return (
		<AnimatePresence>
			{zoomedImage && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
				>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
						aria-label="Fermer"
					>
						<X className="w-6 h-6 text-white" />
					</button>

					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
						className="relative max-w-6xl w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl cursor-default border border-zinc-700"
					>
						<div className="relative aspect-video">
							<Image
								src={zoomedImage.src}
								alt={zoomedImage.alt}
								fill
								sizes="(max-width: 1280px) 100vw, 1280px"
								className="object-contain"
							/>
						</div>
						<div className="p-6 border-t border-zinc-800">
							<h3 className="text-xl font-bold text-white mb-2">
								{zoomedImage.label}
							</h3>
							<p className="text-zinc-400">
								{zoomedImage.description}
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
