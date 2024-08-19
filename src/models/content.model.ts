export type ContentType = 'about' | 'contacts' | 'services' | 'projects';

export type ContentLang = 'ua' | 'eng';

export const contentModelKeys: Array<string> = ['_id', 'type', 'eng', 'ua', 'title'];

interface Link {
    label: string;
    href: string;
}

export interface Content {
    _id?: string
    title: string;
    body?: string;
    image?: string;
    links?: Array<Link>;
}

export interface ContentModel {
    _id: string
    type: ContentType;
    eng: Content;
    ua: Content;
}

