import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkMode";
import moon from "/lune.png";
import sun from "/soleil.png";

export default function RightPart() {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(true);

    function handleClick() {
        setToggle(!toggle);
        dispatch(toggleDarkMode());
    }

    return (
        <ul className="flex items-center">
            <li className="mr-2 ml-2 sm:ml-0">
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
                    toggle
                        ? "bg-violet-900 border-slate-500"
                        : "bg-violet-400 border-slate-200"
                } border w-12 h-5 rounded-full relative cursor-pointer select-none`}
            >
                <div
                    className={`w-7 h-7 rounded-full -mt-1 flex justify-center items-center absolute ${
                        toggle ? "-right-1 bg-slate-900" : "-left-1 bg-blue-500"
                    }`}
                >
                    <img
                        src={toggle ? moon : sun}
                        alt="Toggle dark mode"
                        className="w-4 h-4"
                    />
                </div>
            </li>
        </ul>
    );
}
