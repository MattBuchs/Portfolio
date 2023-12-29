import NavBar from "./NavBar";
import RightPart from "./RightPart";

export default function Header() {
    return (
        <header className="border-b h-20 fixed w-full">
            <nav className="flex justify-between items-center text-white h-full px-4">
                <h1 className="text-2xl mr-8 sm:mr-0 sm:text-3xl ">
                    Matt Buchs
                </h1>

                <NavBar />
                <RightPart />
            </nav>
        </header>
    );
}
