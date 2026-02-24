import { ContactModel } from '@alexey-kuzmenko/ok-apps-sdk';

export const contactTemplate: Omit<ContactModel, '_id'> = {
    label: '',
    body: '',
    href: '',
    iconType: 'email',
    atl: ''
};
