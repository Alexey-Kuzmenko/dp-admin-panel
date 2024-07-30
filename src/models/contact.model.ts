export type IconType = 'telegram' | 'email' | 'linkedIn' | 'instagram';

export interface ContactModel {
    _id: string;
    label: string;
    body: string;
    href: string;
    iconType: IconType;
    atl?: string;
}