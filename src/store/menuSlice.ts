import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isMenuOpen: boolean
}

const initialState: MenuState = {
    isMenuOpen: false
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu(state) {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu(state) {
            state.isMenuOpen = false;
        }
    }
});

export const { toggleMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;