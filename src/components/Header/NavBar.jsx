import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTextColor, updateSelectedTab } from "../../features/tabs";

export default function NavBar() {
    const dispatch = useDispatch();
    const { tabs, selectedTab } = useSelector((state) => state.tabs);
    const focusRef = useRef();
    const menuRef = useRef();
    const ulRef = useRef();
    const [isMenuActivated, setIsMenuActivated] = useState(false);

    function focusTab(target) {
        const translate = target.offsetLeft - 9;
        focusRef.current.style.transform = `translateX(${translate}px)`;
        focusRef.current.style.width = target.clientWidth + "px";
    }

    function handleClickNavBar(e, index) {
        dispatch(updateTextColor(index));
        dispatch(updateSelectedTab(index));
        focusTab(e.target);

        if (isMenuActivated) {
            setIsMenuActivated(false);
            menuRef.current.style.transform = "rotate(0deg)";
        }
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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setIsMenuActivated(false);
                menuRef.current.style.transform = "rotate(0deg)";

                focusTab(ulRef.current.children[selectedTab]);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [selectedTab]);

    return (
        <>
            <ul
                ref={ulRef}
                className={`${
                    isMenuActivated
                        ? "absolute top-16 left-1/2 -translate-x-2/4 w-1/2 h-[250px] flex flex-col justify-center rounded shadow"
                        : "hidden md:flex justify-between h-12 rounded-full px-2 relative border border-slate-100/10 shadow shadow-slate-100/5"
                } items-center bg-gray-900`}
            >
                {tabs.map((obj, index) => (
                    <li
                        key={index}
                        onClick={(e) => handleClickNavBar(e, index)}
                        className={`hover:bg-slate-100/70 hover:text-slate-950 rounded-full px-4 cursor-pointer flex justify-center items-center z-50 ${
                            obj.textColor
                        } ${obj.bgColor} ${obj.marginRight ? "mr-1" : ""} ${
                            isMenuActivated ? "w-1/2 text-2xl mb-2" : "h-3/4"
                        }`}
                    >
                        {obj.name}
                    </li>
                ))}
                <li
                    ref={focusRef}
                    className={`${
                        isMenuActivated
                            ? "hidden"
                            : "absolute bg-slate-100 w-[74.89px] h-3/4 rounded-full transition-transform ease-in-out"
                    }`}
                ></li>
            </ul>
            <button
                onClick={handleClickArrow}
                className="md:hidden absolute left-1/2 -translate-x-2/4"
            >
                <img
                    src="/chevron.svg"
                    alt=""
                    ref={menuRef}
                    className="w-6 h-6"
                />
            </button>
        </>
    );
}
