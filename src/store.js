import { configureStore } from "@reduxjs/toolkit";
import tabs from "./features/tabs";
import darkMode from "./features/darkMode";

export const store = configureStore({
    reducer: {
        tabs,
        darkMode,
    },
});
