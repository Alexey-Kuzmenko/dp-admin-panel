export enum IconType {
    TELEGRAM = 'telegram',
    EMAIL = 'email',
    LINKED_IN = 'linkedIn',
    INSTAGRAM = 'instagram'
}

export interface ContactModel {
    label: string;
    body: string;
    href: string;
    iconType: IconType;
    atl?: string;
}