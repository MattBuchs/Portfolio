"use client";

import Footer from "@/components/Footer";
import {
    FeatureHighlights,
    FeaturesSection,
    FinalCTA,
    HeroSection,
    ImageZoomModal,
    InstallationSection,
    PricingSection,
    ScreenshotsGallery,
    UseCases,
} from "@/components/GameMasterOS";
import NavBar from "@/components/Header/NavBar";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function GameMasterOSPage() {
	const [pricing, setPricing] = useState(null);
	const [loadingPricing, setLoadingPricing] = useState(true);
	const [zoomedImage, setZoomedImage] = useState(null);
	const [latestVersion, setLatestVersion] = useState(null);
	const [loadingVersion, setLoadingVersion] = useState(true);
	const heroRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

	useEffect(() => {
		const fetchPricing = async () => {
			try {
				const res = await fetch("/api/pricing");
				const data = await res.json();
				setPricing(data);
			} catch (error) {
				console.error("Error fetching pricing:", error);
			}
			setLoadingPricing(false);
		};

		const fetchLatestVersion = async () => {
			try {
				const res = await fetch("/api/versions?latest=true");
				if (res.ok) {
					const data = await res.json();
					setLatestVersion(data);
				}
			} catch (error) {
				console.error("Error fetching version:", error);
			}
			setLoadingVersion(false);
		};

		fetchPricing();
		fetchLatestVersion();
	}, []);

	const handleImageClick = (image) => {
		setZoomedImage(image);
	};

	const handleCloseModal = () => {
		setZoomedImage(null);
	};

	return (
		<>
			<NavBar />
			<main className="min-h-screen">
				<HeroSection
					heroRef={heroRef}
					heroOpacity={heroOpacity}
					heroY={heroY}
					latestVersion={latestVersion}
					loadingVersion={loadingVersion}
				/>

				<FeatureHighlights />

				<FeaturesSection />

				<ScreenshotsGallery onImageClick={handleImageClick} />

				<UseCases />

				<PricingSection
					pricing={pricing}
					loadingPricing={loadingPricing}
					latestVersion={latestVersion}
				/>

				<InstallationSection />

				<FinalCTA latestVersion={latestVersion} />
			</main>

			<ImageZoomModal
				zoomedImage={zoomedImage}
				onClose={handleCloseModal}
			/>

			<Footer />
		</>
	);
}
