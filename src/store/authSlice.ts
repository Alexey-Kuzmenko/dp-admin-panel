import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserDto } from '../dto/user.dto';
import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '../types/response-error.type';
import { ENV_VAR_IS_NOT_DEFINED, ERROR_MSG_TEMPLATE } from '../constants';
import { UserModel } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { AppDispatch } from '.';

const API_URL = import.meta.env.VITE_API_URL;
const SESSION_EXPIRATION_TIME = import.meta.env.VITE_SESSION_EXPIRATION;
const SESSION_EXPIRATION_DATE = new Date(new Date().getTime() + Number(SESSION_EXPIRATION_TIME) * 1_000);

if (!API_URL) {
    throw new Error(`API_URL ${ENV_VAR_IS_NOT_DEFINED} authSlice`);
}

if (!SESSION_EXPIRATION_TIME) {
    throw new Error(`SESSION_EXPIRATION_TIME ${ENV_VAR_IS_NOT_DEFINED} authSlice`);
}

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface AuthState {
    token: string | null
    userEmail: string
    loading: boolean | null
    error: ResponseError
}

const initialState: AuthState = {
    token: null,
    userEmail: '',
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
        selectUserEmail: (state) => state.userEmail,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        login: create.asyncThunk(async (dto: CreateUserDto, thunkApi) => {
            const dispatch = thunkApi.dispatch as AppDispatch;
            const response: AxiosResponse<LoginModel> = await axios.post(`${API_URL}/auth/login`, dto);
            const { access_token } = response.data;

            dispatch(saveSession({ token: access_token, email: dto.email }));
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
        register: create.asyncThunk(async (dto: CreateUserDto, thunkApi) => {
            const dispatch = thunkApi.dispatch as AppDispatch;
            const register: AxiosResponse<UserModel> = await axios.post(`${API_URL}/auth/register`, dto);
            const { email } = register.data;
            const login: AxiosResponse<LoginModel> = await axios.post(
                `${API_URL}/auth/login`,
                { email, password: dto.password }
            );
            const { access_token } = login.data;

            dispatch(saveSession({ token: access_token, email: dto.email }));
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
        saveSession: create.reducer((state, { payload }: PayloadAction<
            { token: string, email: string }
        >) => {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('email', payload.email);

            state.token = payload.token;
            state.userEmail = payload.email;
        }),
        logout: create.reducer((state) => {
            state.token = null;
            state.userEmail = '';

            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }),
        autoLogout: create.asyncThunk(async (_, thunkApi) => {
            const dispatch = thunkApi.dispatch as AppDispatch;
            const expiresInTimeout = +SESSION_EXPIRATION_TIME * 1_000;

            setTimeout(() => {
                dispatch(logout());
            }, expiresInTimeout);
        }),
        keepSession: create.asyncThunk(async (_, thunkApi) => {
            const dispatch = thunkApi.dispatch as AppDispatch;
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('email');

            if (!token && !userEmail) {
                dispatch(logout());

                return;
            }

            if (SESSION_EXPIRATION_DATE <= new Date()) {
                dispatch(logout());

                return;
            }

            if (token && userEmail) {
                dispatch(saveSession({ token, email: userEmail }));
                dispatch(autoLogout());
            }
        }),
        resetResponseError: create.reducer(({ error }) => {
            error.exists = false;
            error.message = null;
        })
    }),
});

export const {
    selectJwtToken,
    selectUserEmail,
    selectLoading,
    selectError
} = authSlice.selectors;

export const {
    login,
    register,
    autoLogout,
    logout,
    keepSession,
    saveSession,
    resetResponseError
} = authSlice.actions;

export default authSlice.reducer;
