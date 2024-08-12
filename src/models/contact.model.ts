export type ContactIconType = 'telegram' | 'email' | 'linkedIn' | 'instagram';
export const contactModelKeys: Array<string> = ['_id', 'label', 'body', 'href', 'iconType', 'alt'];

export interface ContactModel {
    _id: string;
    label: string;
    body: string;
    href: string;
    iconType: ContactIconType;
    atl?: string;
}