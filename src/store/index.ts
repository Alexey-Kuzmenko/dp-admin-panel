import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import contactReducer from './contactSlice';
import contentReducer from './contentSlice';
import skillReducer from './skillSlice';
import projectReducer from './projectSlice';
import userReducer from './userSlice';
import imageReducer from './imageSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        contacts: contactReducer,
        content: contentReducer,
        skills: skillReducer,
        projects: projectReducer,
        users: userReducer,
        image: imageReducer,
        authentication: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
