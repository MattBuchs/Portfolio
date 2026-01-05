import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

export default function DownloadCV() {
    const handleDownload = () => {
        // Créer un lien temporaire pour télécharger le CV
        const link = document.createElement("a");
        link.href = "/files/CV-MattBuchs.pdf";
        link.download = "CV_Matt_Buchs.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Télécharger mon CV en PDF"
        >
            <FileText size={20} aria-hidden="true" />
            <span>Télécharger mon CV</span>
            <Download size={20} aria-hidden="true" />
        </motion.button>
    );
}
