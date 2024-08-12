import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './menuSlice';
import contactSlice from './contactSlice';

const store = configureStore({
    reducer: {
        menu: menuSlice,
        contacts: contactSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;