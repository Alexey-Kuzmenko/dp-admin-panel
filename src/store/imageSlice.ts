import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ImageModel } from '../models/image.model';
import { DeleteImageDto } from '@alexey-kuzmenko/ok-apps-sdk';
import { ResponseError } from '../types';
import { ERROR_MSG_TEMPLATE } from '../constants';
import { extractImgDirName } from '../utils/extractImgDirName';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

const createImageSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface ImageSate {
    imagesList: Array<ImageModel>
    dirList: Array<string>,
    loading: boolean | null,
    error: ResponseError
}

const initialState: ImageSate = {
    imagesList: [],
    dirList: [],
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

const imageSlice = createImageSlice({
    name: 'image',
    initialState,
    selectors: {
        selectImages: (state) => state.imagesList,
        selectDirectories: (state) => state.dirList,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        deleteImageLocally: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.imagesList = state.imagesList.filter((img) => img.url !== payload);
        }),
        fetchImages: create.asyncThunk(async () => {
            const response: AxiosResponse<ImageModel[]> = await axios.get(`${API_URL}/images`, {
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
                    state.imagesList.push(...payload);

                    const directories = extractImgDirName(payload);
                    state.dirList.push(...directories);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Image slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addImage: create.asyncThunk(async (img: FormData) => {
            const response: AxiosResponse<ImageModel[]> = await axios.post(`${API_URL}/images/upload`, img, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    state.imagesList.push(...payload);

                    const directory = extractImgDirName(payload);
                    state.dirList.push(...directory);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Image slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteImage: create.asyncThunk(async (imgUrl: string, thunkApi) => {
            const dto: DeleteImageDto = {
                imgPath: imgUrl
            };

            await axios.delete(`${API_URL}/images/delete`, {
                data: dto,
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            thunkApi.dispatch(deleteImageLocally(imgUrl));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Image slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteDir: create.asyncThunk(async (dirName: string) => {
            await axios.delete(`${API_URL}/images/delete/${dirName}`, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            return dirName;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    state.dirList = state.dirList.filter((d) => d !== payload);
                    state.imagesList = state.imagesList.filter((i) => !i.name.includes(payload));
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Image slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectImages, selectDirectories, selectLoading, selectError } = imageSlice.selectors;

export const { deleteImageLocally, fetchImages, addImage, deleteImage, deleteDir } = imageSlice.actions;

export default imageSlice.reducer;
