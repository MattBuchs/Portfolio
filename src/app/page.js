import Footer from "../components/Footer";
import NavBar from "../components/Header/NavBar";
import About from "../components/Home/About";
import Certifications from "../components/Home/Certifications";
import CTA from "../components/Home/CTA";
import Presentation from "../components/Home/Presentation";
import Projects from "../components/Home/Projects";
import Services from "../components/Home/Services";
import Technos from "../components/Home/Technos";

// Les métadonnées sont déjà définies dans layout.js
// Pas besoin de les redéfinir ici car ce sont les métadonnées par défaut

export default function Home() {
	return (
		<>
			<NavBar />
			<main className="overflow-x-hidden">
				<Presentation />
				<About />
				<Services />
				<Projects />
				<Certifications />
				<Technos />
				<CTA />
			</main>
			<Footer />
		</>
	);
}
