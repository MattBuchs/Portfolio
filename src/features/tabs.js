import { createSlice } from "@reduxjs/toolkit";
import Home from "../pages/Home/Home";
import Work from "../pages/Work/Work";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

const pages = {
    home: Home,
    work: Work,
    about: About,
    contact: Contact,
};

const initialState = {
    tabs: [
        {
            id: "1",
            name: "Home",
            url: "/",
            marginRight: true,
            textColor: "text-slate-950",
            bgColor: "bg-slate-100",
            pageKey: "home",
        },
        {
            id: "2",
            name: "Work",
            url: "/work",
            marginRight: true,
            textColor: "text-slate-100",
            bgColor: "",
            pageKey: "work",
        },
        {
            id: "3",
            name: "About",
            url: "/about",
            marginRight: true,
            textColor: "text-slate-100",
            bgColor: "",
            pageKey: "about",
        },
        {
            id: "4",
            name: "Contact",
            url: "/contact",
            marginRight: false,
            textColor: "text-slate-100",
            bgColor: "",
            pageKey: "contact",
        },
    ],
    selectedTab: 0,
};

export const tabs = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        updateTextColor: (state, action) => {
            state.tabs.map((obj, i) => {
                if (i === action.payload) {
                    obj.textColor = "text-slate-950";
                    obj.bgColor = "bg-slate-100";
                } else {
                    obj.textColor = "text-slate-100";
                    obj.bgColor = "";
                }
            });
        },
        updateSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
        },
    },
});

// Sélecteur pour récupérer le composant de la page à partir de la clé
export const selectPageComponent = (state, tabId) => {
    const pageKey = state.find((tab) => Number(tab.id) === tabId)?.pageKey;
    return pageKey ? pages[pageKey] : null;
};

export const { updateTextColor, updateSelectedTab } = tabs.actions;
export default tabs.reducer;
