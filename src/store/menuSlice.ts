import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isMenuOpen: boolean
}

export const initialState: MenuState = {
    isMenuOpen: false
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,

    selectors: {
        selectMenuSlice: (state) => state
    },
    reducers: (create) => ({
        toggleMenu: create.reducer((state) => {
            state.isMenuOpen = !state.isMenuOpen;
        }),

        closeMenu: create.reducer((state) => {
            state.isMenuOpen = false;
        })
    })
});

export const { selectMenuSlice } = menuSlice.selectors;

export const { toggleMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;