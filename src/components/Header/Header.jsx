import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkMode";
import NavBar from "./NavBar";

export default function Header() {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(true);

    function handleClick() {
        setToggle(!toggle);
        dispatch(toggleDarkMode());
    }

    return (
        <header className="border-b h-20 fixed w-full">
            <nav className="flex justify-between items-center text-white h-full px-4">
                <h1 className="text-3xl">Matt Buchs</h1>

                <NavBar />
                <ul className="flex items-center">
                    <li className="mr-2">
                        <a href="https://github.com/MattBuchs" target="_blanck">
                            <img
                                className="w-6"
                                src="/Logo-github.png"
                                alt="Logo Github"
                            />
                        </a>
                    </li>
                    <li className="mr-4">
                        <a
                            href="https://www.linkedin.com/in/matt-buchs"
                            target="_blanck"
                        >
                            <img
                                className="w-6"
                                src="/Logo-linkedin.png"
                                alt="Logo Github"
                            />
                        </a>
                    </li>
                    <li
                        onClick={handleClick}
                        className={`${
                            toggle ? "bg-blue-400" : "bg-slate-200"
                        } border w-12 h-5 rounded-full relative cursor-pointer select-none`}
                    >
                        <div
                            className={`bg-slate-100 border-8 border-slate-900  w-7 h-7 rounded-full -mt-1 absolute ${
                                toggle ? "-right-1" : "-left-1"
                            }`}
                        >
                            <img src="" alt="" />
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
