import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../store';

import contactSlice from '../store/contactSlice';
import menuSlice from '../store/menuSlice';
import contentSlice from '../store/contentSlice';

export const setupMockStore = (preloadedState?: RootState) => {
    return configureStore({
        reducer: {
            menu: menuSlice,
            contacts: contactSlice,
            content: contentSlice
        },
        preloadedState,
    });
};