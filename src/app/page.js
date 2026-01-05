import NavBar from "../components/Header/NavBar";
import Presentation from "../components/Home/Presentation";
import About from "../components/Home/About";
import Technos from "../components/Home/Technos";
import Footer from "../components/Footer";
import Services from "../components/Home/Services";
import Certifications from "../components/Home/Certifications";
import CTA from "../components/Home/CTA";

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
                <Certifications />
                <Technos />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
