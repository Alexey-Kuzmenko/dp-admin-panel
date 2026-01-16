import { ContentModel } from '../../models/content.model';

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
