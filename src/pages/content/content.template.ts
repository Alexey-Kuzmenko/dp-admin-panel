import { ContentModel } from '@alexey-kuzmenko/ok-apps-sdk';

export const contentTemplate: Omit<ContentModel, '_id'> = {
    type: 'about',
    eng: {
        title: '',
        body: '',
        image: '',
        links: [],
    },
    ua: {
        title: '',
        body: '',
        image: '',
        links: [],
    }
};
