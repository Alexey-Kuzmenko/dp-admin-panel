import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ContactModel } from '@alexey-kuzmenko/ok-apps-sdk';
import { ContactDto } from '@alexey-kuzmenko/ok-apps-sdk';
import type { RootState } from './types';
import { ResponseError } from '../types';
import excludeObjectValues from '../utils/excludeObjectValues';
import { ENV_VAR_IS_NOT_DEFINED, ERROR_MSG_TEMPLATE, JWT_TOKEN_IS_MISSING_IN_STORE } from '../constants';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_URL) throw new Error(`API_URL ${ENV_VAR_IS_NOT_DEFINED} contactSlice`);
if (!API_KEY) throw new Error(`API_KEY ${ENV_VAR_IS_NOT_DEFINED} contactSlice`);

const createContactSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface ContactState {
    contacts: Array<ContactModel>
    loading: boolean | null
    error: ResponseError
}

export const initialState: ContactState = {
    contacts: [],
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

const contactSlice = createContactSlice({
    name: 'contacts',
    initialState,
    selectors: {
        selectContacts: (state) => state.contacts,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        deleteContactLocally: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((c) => c._id !== payload);
        }),
        fetchContacts: create.asyncThunk(async () => {
            const response: AxiosResponse<ContactModel[]> = await axios.get(`${API_URL}/contacts`, {
                headers: {
                    'Api-key': API_KEY
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const data = excludeObjectValues<ContactModel>(['createdAt', 'updatedAt', '__v'], payload);
                    state.contacts = data;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Contacts slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addContact: create.asyncThunk(async (dto: ContactDto, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const token = state.authentication.token;

            if (!token) throw new Error(JWT_TOKEN_IS_MISSING_IN_STORE);

            const response: AxiosResponse<ContactModel> = await axios.post(`${API_URL}/contacts`, dto, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const data = excludeObjectValues<ContactModel>(['createdAt', 'updatedAt', '__v'], [payload]);
                    state.contacts.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Contacts slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteContact: create.asyncThunk(async (id: string, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const token = state.authentication.token;

            if (!token) throw new Error(JWT_TOKEN_IS_MISSING_IN_STORE);

            await axios.delete(`${API_URL}/contacts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            thunkApi.dispatch(deleteContactLocally(id));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Contacts slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        editContact: create.asyncThunk(async (contact: ContactModel, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            // * this type cast added to fix circular definition error for contactReducer alias
            const token = state.authentication.token as string | null;

            if (!token) throw new Error(JWT_TOKEN_IS_MISSING_IN_STORE);

            const response = await axios.patch(`${API_URL}/contacts/${contact._id}`, contact, {
                headers: {
                    // 'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const contact = state.contacts.find((c) => c._id === payload._id);
                    const [data] = excludeObjectValues<ContactModel>(['createdAt', 'updatedAt', '__v'], [payload]);

                    if (contact) {
                        const contactIndex = state.contacts.indexOf(contact);
                        const contactsCopy = [...state.contacts];
                        contactsCopy[contactIndex] = data;
                        state.contacts = contactsCopy;
                    }
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Contacts slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectContacts, selectLoading, selectError } = contactSlice.selectors;

export const {
    deleteContactLocally,
    fetchContacts,
    addContact,
    deleteContact,
    editContact
} = contactSlice.actions;

export default contactSlice.reducer;
