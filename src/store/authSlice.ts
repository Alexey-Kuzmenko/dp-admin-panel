import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserDto } from '../dto/user.dto';
import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '../types/response-error.type';
import { ERROR_MSG_TEMPLATE } from '../constants/constants';
import { UserModel } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { AppDispatch, RootState } from '.';

const API_URL = import.meta.env.VITE_API_URL;
const SESSION_EXPIRATION = Number.parseInt(import.meta.env.VITE_SESSION_EXPIRATION);

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface AuthState {
    token: string | null
    userEmail: string
    password: string
    expiresIn: number
    loading: boolean | null
    error: ResponseError
}

const initialState: AuthState = {
    token: null,
    userEmail: '',
    password: '',
    expiresIn: SESSION_EXPIRATION,
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

const authSlice = createAuthSlice({
    name: 'authentication',
    initialState,
    selectors: {
        selectJwtToken: (state) => state.token,
        selectUserData: ({ userEmail, password }) => ({ email: userEmail, password }),
        selectExpiration: (state) => state.expiresIn,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        login: create.asyncThunk(async (dto: CreateUserDto, thunkApi) => {
            const dispatch = thunkApi.dispatch as AppDispatch;
            const response: AxiosResponse<LoginModel> = await axios.post(`${API_URL}/auth/login`, dto);

            dispatch(saveSession({ token: response.data.access_token, email: dto.email, password: dto.password }));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state) => {
                    state.error.exists = null;
                    state.error.message = null;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Authentication slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        register: create.asyncThunk(async (dto: CreateUserDto) => {
            const register: AxiosResponse<UserModel> = await axios.post(`${API_URL}/auth/register`, dto);
            const { email } = register.data;
            const login: AxiosResponse<LoginModel> = await axios.post(
                `${API_URL}/auth/login`,
                { email, password: dto.password }
            );

            return login.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    state.token = payload.access_token;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Authentication slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        autoLogout: create.asyncThunk(async (_, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const dispatch = thunkApi.dispatch as AppDispatch;
            const expiresIn = state.authentication.expiresIn;

            setTimeout(() => {
                dispatch(logout());
            }, 10_000);
        }),
        logout: create.reducer((state) => {
            state.token = null;
            state.userEmail = '';
            state.password = '';

            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }),
        keepSession: create.asyncThunk(async (_, thunkApi) => {
            const { authentication } = thunkApi.getState() as RootState;
            const dispatch = thunkApi.dispatch as AppDispatch;

            const { expiresIn } = authentication;
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('email');
            const password = localStorage.getItem('password');

            if (!token && !userEmail) {
                dispatch(logout());
            } else {
                const expirationDate = new Date(String(expiresIn));

                if (expirationDate <= new Date()) {
                    dispatch(logout());
                } else {
                    if (token && userEmail && password) {
                        dispatch(saveSession({ token, email: userEmail, password }));
                        dispatch(autoLogout());
                    }
                }
            }
        }),
        saveSession: create.reducer((state, { payload }: PayloadAction<
            { token: string, email: string, password: string }
        >) => {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('password', payload.password);

            state.token = payload.token;
            state.userEmail = payload.email;
            state.password = payload.password;
        }),
        resetResponseError: create.reducer(({ error }) => {
            error.exists = false;
            error.message = null;
        })
    }),
});

export const { selectJwtToken, selectUserData, selectExpiration, selectLoading, selectError } = authSlice.selectors;

export const { login, register, autoLogout, logout, keepSession, saveSession, resetResponseError } = authSlice.actions;

export default authSlice.reducer;