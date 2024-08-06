import { createSlice } from '@reduxjs/toolkit';
import { ContactModel } from '../models/contact.model';

interface ContactState {
    contacts: Array<ContactModel>
}

// * state with temporary data
const initialState: ContactState = {
    contacts: [
        {
            _id: '65f1899dd7226661102dede3',
            label: 'Telegram',
            body: '@ok_dev_ua',
            href: 'https://t.me/ok_dev_ua',
            iconType: 'telegram',
        },
        {
            _id: '65f18a39d7226661102dede6',
            label: 'Email',
            body: 'o.kuzmenko@ok-dev.pp.ua',
            href: 'o.kuzmenko@ok-dev.pp.ua',
            iconType: 'email',

        },
        {
            _id: '65f18ac9d7226661102dede9',
            label: 'LinkedIn',
            body: 'Oleksii Kuzmenko',
            href: 'https://www.linkedin.com/in/oleksii-kuzmenko-0aba34243',
            iconType: 'linkedIn',
        },
        {
            _id: '65f18e2ed7226661102dedf4',
            label: 'Instagram',
            body: 'kuzmenko.js',
            href: 'https://www.instagram.com/kuzmenko.js?igsh=MTI1Mmx3dzJtN2s2aA==',
            iconType: 'instagram',
        }
    ]
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, { payload }) => {
            state.contacts.push(payload);
        },
        deleteContact: (state, { payload }) => {
            state.contacts = state.contacts.filter((c) => c._id !== payload);
        },
        editContact: (state, { payload }) => {
            state.contacts = payload;
        }
    }
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;

export default contactSlice.reducer;

