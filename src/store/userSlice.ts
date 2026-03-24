import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { UserModel } from '@alexey-kuzmenko/ok-apps-sdk';
import { CreateUserDto, DeleteUserDto } from '@alexey-kuzmenko/ok-apps-sdk';
import type { RootState } from './types';
import { ResponseError } from '../types';
import excludeObjectValues from '../utils/excludeObjectValues';
import { ERROR_MSG_TEMPLATE, JWT_TOKEN_IS_MISSING_IN_STORE } from '../constants';

const API_URL = import.meta.env.VITE_API_URL;

const createUserSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface UserState {
    users: Array<UserModel>
    loading: boolean | null
    error: ResponseError
}

export const initialState: UserState = {
    users: [],
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

const userSlice = createUserSlice({
    name: 'users',
    initialState,
    selectors: {
        selectUsers: (state) => state.users,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        fetchUsers: create.asyncThunk(async (_, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const JWT_TOKEN = state.authentication.token;

            if (!JWT_TOKEN) {
                throw new Error(JWT_TOKEN_IS_MISSING_IN_STORE);
            }

            const response: AxiosResponse<UserModel[]> = await axios.get(`${API_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const data = excludeObjectValues<UserModel>(
                        ['createdAt', 'updatedAt', '__v', 'passwordHash'],
                        payload
                    );

                    state.users.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} User slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addUser: create.asyncThunk(async (dto: CreateUserDto) => {
            const response: AxiosResponse<UserModel> = await axios.post(`${API_URL}/auth/register`, dto);

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const [data] = excludeObjectValues<UserModel>(
                        ['createdAt', 'updatedAt', '__v', 'passwordHash'],
                        [payload]
                    );

                    state.users.push(data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} User slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteUser: create.asyncThunk(async (id: string, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const user = state.users.users.find((u) => u._id === id);
            const JWT_TOKEN = state.authentication.token;

            if (user) {
                const data: DeleteUserDto = {
                    userId: user._id,
                    userEmail: user.email
                };

                const response: AxiosResponse<UserModel> = await axios.delete(`${API_URL}/user`, {
                    data: data,
                    headers: {
                        'Authorization': `Bearer ${JWT_TOKEN}`
                    }
                });

                return response.data;
            }
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    if (payload) {
                        state.users = state.users.filter((u) => u._id !== payload._id);
                    }
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} User slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectUsers, selectLoading, selectError } = userSlice.selectors;

export const { fetchUsers, addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
