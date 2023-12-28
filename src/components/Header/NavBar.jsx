import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTextColor, updateSelectedTab } from "../../features/tabs";

export default function NavBar() {
    const dispatch = useDispatch();
    const { tabs } = useSelector((state) => state.tabs);
    const focusRef = useRef();

    function handleClick(e, index) {
        dispatch(updateTextColor(index));
        dispatch(updateSelectedTab(index));

        const translate = e.target.offsetLeft - 9;
        focusRef.current.style.transform = `translateX(${translate}px)`;
        focusRef.current.style.width = e.target.clientWidth + "px";
    }

    return (
        <>
            <ul className="flex justify-between items-center bg-gray-800 h-12 rounded-full px-2 relative">
                {tabs.map((obj, index) => (
                    <li
                        key={index}
                        onClick={(e) => handleClick(e, index)}
                        className={`hover:bg-slate-100/70 hover:text-slate-950 rounded-full px-4 h-3/4 cursor-pointer flex justify-center items-center z-50 ${
                            obj.textColor
                        } ${obj.marginRight ? "mr-1" : ""}`}
                    >
                        {obj.name}
                    </li>
                ))}
                <div
                    ref={focusRef}
                    className="absolute bg-slate-100 w-[74.89px] h-3/4 rounded-full transition-transform ease-in-out"
                ></div>
            </ul>
        </>
    );
}
