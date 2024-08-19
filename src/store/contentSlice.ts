import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content, ContentModel } from '../models/content.model';
import { v4 as uuidv4 } from 'uuid';

interface ContentSate {
    content: Array<ContentModel>
}

// * state with temporary data
const initialState: ContentSate = {
    content: [
        {
            _id: uuidv4(),
            type: 'about',
            eng: {
                _id: uuidv4(),
                title: 'About Me',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                image: 'https://api.ok-dev.pp.ua/img_1',
            },
            ua: {
                title: ''
            }
        },
        {
            _id: uuidv4(),
            type: 'contacts',
            eng: {
                _id: uuidv4(),
                title: 'Get in touch',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                image: 'https://api.ok-dev.pp.ua/img_2',
            },
            ua: {
                title: ''
            }
        },
        {
            _id: uuidv4(),
            type: 'services',
            eng: {
                _id: uuidv4(),
                title: 'Get in touch',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                image: 'https://api.ok-dev.pp.ua/img_2',
            },
            ua: {
                title: ''
            }
        }
    ]
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addPageContent: (state, { payload }: PayloadAction<Omit<ContentModel, '_id'>>) => {
            const newContent: ContentModel = {
                _id: uuidv4(),
                ...payload
            };

            state.content.push(newContent);
        },
        deletePageContent: (state, { payload }: PayloadAction<string>) => {
            state.content = state.content.filter((c) => c._id !== payload);
        },
        editContent: (state, { payload }: PayloadAction<{ content: Content, formValue: string }>) => {
            const [type, lang]: Array<string> = payload.formValue.replace(/\s+/g, '').split('|');
            const pageContent = state.content.find((c) => c.type === type);

            if (pageContent) {
                const pageContactIndex = state.content.indexOf(pageContent);
                const contentCopy = [...state.content];
                lang === 'eng' ? pageContent.eng = payload.content : pageContent.ua = payload.content;
                contentCopy[pageContactIndex] = pageContent;
                state.content = contentCopy;
            }
        }
    }
});

export const { addPageContent, deletePageContent, editContent } = contentSlice.actions;

export default contentSlice.reducer;