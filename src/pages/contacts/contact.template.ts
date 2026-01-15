import { ContactModel } from '../../models/contact.model';

export const contactTemplate: Omit<ContactModel, '_id'> = {
    label: '',
    body: '',
    href: '',
    iconType: 'email',
    atl: ''
};
