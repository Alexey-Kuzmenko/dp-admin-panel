/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageModel } from '../models/image.model';

const staticFilesUrl = import.meta.env.VITE_STATIC_FILES_URL;

interface ImageSate {
    imagesList: Array<ImageModel>
}

// * temporary data
const initialState: ImageSate = {
    imagesList: [
        {
            url: `${staticFilesUrl}/quiz-app/quiz-app_img.svg`,
            name: 'quiz-app_img.svg'
        },
        {
            url: `${staticFilesUrl}/quiz-app/quiz-app_img.webp`,
            name: 'quiz-app_img.webp'
        },
        {
            url: `${staticFilesUrl}/budget-app/budget-app_img.svg`,
            name: 'budget-app_img.svg'
        },
        {
            url: `${staticFilesUrl}/budget-app/budget-app_img.webp`,
            name: 'budget-app_img.webp'
        },
        {
            url: `${staticFilesUrl}/cleaning-x/cleaning-x_img.svg`,
            name: 'cleaning-x_img.svg'
        },
        {
            url: `${staticFilesUrl}/cleaning-x/cleaning-x_img.webp`,
            name: 'cleaning-x_img.webp'
        },
        {
            url: `${staticFilesUrl}/home-page/home-page_oleksii_kuzmenko.svg`,
            name: 'home-page_oleksii_kuzmenko.svg'
        },
        {
            url: `${staticFilesUrl}/home-page/home-page_oleksii_kuzmenko.webp`,
            name: 'home-page_oleksii_kuzmenko.webp'
        },
        {
            url: `${staticFilesUrl}/home-page/home-page_github_preview.svg`,
            name: 'home-page_github_preview.svg'
        },
        {
            url: `${staticFilesUrl}/home-page/home-page_github_preview.webp`,
            name: 'home-page_github_preview.webp'
        },
    ],
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    selectors: {
        selectImages: (state) => state.imagesList
    },
    reducers: (create) => ({
        addImage: create.reducer((state, { payload }: PayloadAction<string>) => {
            // * temporary solution
            console.log(payload);
        }),
        deleteImage: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.imagesList = state.imagesList.filter((img) => img.url !== payload);
        }),
        deleteDir: create.reducer((state, { payload }: PayloadAction<string>) => {
            // * temporary solution
            console.log(payload);
        })
    }),
});

export const { selectImages } = imageSlice.selectors;

export const { addImage, deleteImage, deleteDir } = imageSlice.actions;

export default imageSlice.reducer;