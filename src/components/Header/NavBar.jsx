import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTextColor, updateSelectedTab } from "../../features/tabs";

export default function NavBar() {
    const dispatch = useDispatch();
    const { tabs } = useSelector((state) => state.tabs);
    const focusRef = useRef();
    const [isMenuActivated, setIsMenuActivated] = useState(false);
    console.log(isMenuActivated);

    function handleClickNavBar(e, index) {
        dispatch(updateTextColor(index));
        dispatch(updateSelectedTab(index));

        const translate = e.target.offsetLeft - 9;
        focusRef.current.style.transform = `translateX(${translate}px)`;
        focusRef.current.style.width = e.target.clientWidth + "px";
    }

    function handleClickArrow(e) {
        if (
            e.target.style.transform === "rotate(0deg)" ||
            e.target.style.transform === ""
        )
            e.target.style.transform = "rotate(180deg)";
        else e.target.style.transform = "rotate(0deg)";

        setIsMenuActivated(!isMenuActivated);
    }

    return (
        <>
            <ul
                className={`${
                    isMenuActivated
                        ? "bg-gray-800 absolute top-16 left-1/2 -translate-x-2/4 w-1/2 h-[250px] flex flex-col items-center justify-center rounded shadow"
                        : "hidden md:flex justify-between items-center bg-gray-800 h-12 rounded-full px-2 relative"
                }`}
            >
                {tabs.map((obj, index) => (
                    <li
                        key={index}
                        onClick={(e) => handleClickNavBar(e, index)}
                        className={`hover:bg-slate-100/70 hover:text-slate-950 rounded-full px-4 cursor-pointer flex justify-center items-center z-50 ${
                            obj.textColor
                        } ${obj.marginRight ? "mr-1" : ""} ${
                            isMenuActivated ? "w-1/2 text-2xl mb-2" : "h-3/4"
                        }`}
                    >
                        {obj.name}
                    </li>
                ))}
                <div
                    ref={focusRef}
                    className={`${
                        isMenuActivated
                            ? "hidden"
                            : "absolute bg-slate-100 w-[74.89px] h-3/4 rounded-full transition-transform ease-in-out"
                    }`}
                ></div>
            </ul>
            <button
                onClick={handleClickArrow}
                className="md:hidden absolute left-1/2 -translate-x-2/4"
            >
                <img src="/chevron.svg" alt="" className="w-6 h-6" />
            </button>
        </>
    );
}
