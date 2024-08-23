import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './menuSlice';
import contactSlice from './contactSlice';
import contentSlice from './contentSlice';

const store = configureStore({
    reducer: {
        menu: menuSlice,
        contacts: contactSlice,
        content: contentSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;