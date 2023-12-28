import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkmode: true,
};

export const darkMode = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkmode = !state.isDarkmode;
        },
    },
});

export const { toggleDarkMode } = darkMode.actions;
export default darkMode.reducer;
