import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import contactReducer from './contactSlice';
import contentReducer from './contentSlice';
import skillReducer from './skillSlice';
import projectSlice from './projectSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        contacts: contactReducer,
        content: contentReducer,
        skills: skillReducer,
        projects: projectSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;