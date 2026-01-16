import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { Content, ContentModel } from '../models/content.model';
import { CreateContentDto } from '../dto/content.dto';
import { ResponseError } from '../types/response-error.type';
import excludeObjectValues from '../utils/excludeObjectValues';
import { ERROR_MSG_TEMPLATE } from '../constants';
import { RootState } from '.';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

const createContentSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface ContentSate {
    content: Array<ContentModel>,
    loading: boolean | null
    error: ResponseError
}

export const initialState: ContentSate = {
    content: [],
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

const contentSlice = createContentSlice({
    name: 'content',
    initialState,
    selectors: {
        selectContent: (state) => state.content,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        deletePageContentLocally: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.content = state.content.filter((c) => c._id !== payload);
        }),
        fetchPagesContent: create.asyncThunk(async () => {
            const response: AxiosResponse<ContentModel[]> = await axios.get(`${API_URL}/content`, {
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
                    const data = excludeObjectValues<ContentModel>(['createdAt', 'updatedAt', '__v'], payload);
                    state.content.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Content slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addPageContent: create.asyncThunk(async (dto: CreateContentDto) => {
            const response: AxiosResponse<ContentModel> = await axios.post(`${API_URL}/content/create`, dto, {
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
                    const data = excludeObjectValues<ContentModel>(['createdAt', 'updatedAt', '__v'], [payload]);
                    state.content.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Content slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deletePageContent: create.asyncThunk(async (id: string, thunkApi) => {
            await axios.delete(`${API_URL}/content/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            thunkApi.dispatch(deletePageContentLocally(id));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Content slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        editContent: create.asyncThunk(async (payload: { content: Content, formValue: string }, thunkApi) => {
            const [type, lang]: Array<string> = payload.formValue.replace(/\s+/g, '').split('|');
            const state = thunkApi.getState() as RootState;
            const pageContent = state.content.content.find((c) => c.type === type);

            if (pageContent) {
                const { _id } = pageContent;
                const response: AxiosResponse<ContentModel> = await axios.patch(`${API_URL}/content/${_id}/${lang}`,
                    payload.content,
                    {
                        headers: {
                            'Authorization': `Bearer ${JWT_TOKEN}`
                        }
                    }
                );
                return { type, lang, data: response.data };
            }
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    if (payload) {
                        const pageContent = state.content.find((c) => c.type === payload.type);

                        if (pageContent) {
                            const pageContentIndex = state.content.indexOf(pageContent);
                            const contentCopy = [...state.content];
                            payload.lang === 'eng' ?
                                pageContent.eng = payload.data.eng : pageContent.ua = payload.data.ua;

                            contentCopy[pageContentIndex] = pageContent;
                            state.content = contentCopy;
                        }
                    }
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Content slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectContent, selectLoading, selectError } = contentSlice.selectors;

export const {
    deletePageContentLocally,
    fetchPagesContent,
    addPageContent,
    deletePageContent,
    editContent
} = contentSlice.actions;

export default contentSlice.reducer;
