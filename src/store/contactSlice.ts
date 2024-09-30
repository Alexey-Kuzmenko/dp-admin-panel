import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ContactModel } from '../models/contact.model';
import { ContactDto } from '../dto/contact.dto';

interface ContactState {
    contacts: Array<ContactModel>
}

// * state with temporary data. This value exported for only for tests
export const initialState: ContactState = {
    contacts: [
        {
            _id: '65f1899dd7226661102dede3',
            label: 'Telegram',
            body: '@test_ua',
            href: 'https://t.me/test',
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
            href: 'https://www.linkedin.com/',
            iconType: 'linkedIn',
        },
        {
            _id: '65f18e2ed7226661102dedf4',
            label: 'Instagram',
            body: 'user',
            href: 'https://www.instagram.com/',
            iconType: 'instagram',
        }
    ]
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    selectors: {
        selectContacts: (state) => state.contacts
    },
    reducers: (create) => ({
        addContact: create.reducer((state, { payload }: PayloadAction<ContactDto>) => {
            const newContact: ContactModel = {
                _id: uuidv4(),
                ...payload
            };

            state.contacts.push(newContact);
        }),

        deleteContact: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((c) => c._id !== payload);
        }),

        editContact: create.reducer((state, { payload }: PayloadAction<ContactModel>) => {
            const contact = state.contacts.find((c) => c._id === payload._id);

            if (contact) {
                const contactIndex = state.contacts.indexOf(contact);
                const contactsCopy = [...state.contacts];
                contactsCopy[contactIndex] = payload;
                state.contacts = contactsCopy;
            }
        })
    })
});

export const { selectContacts } = contactSlice.selectors;

export const { addContact, deleteContact, editContact } = contactSlice.actions;

export default contactSlice.reducer;
