import { ContactModel } from '../../models/contact.model';
import contactReducer, {
    addContact,
    editContact,
    deleteContact,
    initialState
} from '../contactSlice';

describe('contactSlice', () => {
    it('should return initial state when passed an empty action', () => {
        const result = contactReducer(undefined, { type: '' });

        expect(result).toEqual(initialState);
    });

    it('should add new contact item with "addContact" action', () => {
        const newContact: Omit<ContactModel, '_id'> = {
            label: 'Test',
            body: 'User',
            href: 'https://link-example.com',
            iconType: 'email'

        };

        const action = { type: addContact.type, payload: newContact };
        const result = contactReducer(initialState, action);
        const index = result.contacts.length - 1;

        expect(result.contacts[index].label).toBe<string>(newContact.label);
        expect(result.contacts[index].body).toBe<string>(newContact.body);
        expect(result.contacts[index].href).toBe<string>(newContact.href);
    });

    it('should edit contact item with "editContact" action', () => {
        const editedContact: ContactModel = {
            ...initialState.contacts[0],
            body: '@new_value'
        };

        const action = { type: editContact.type, payload: editedContact };
        const result = contactReducer(initialState, action);

        expect(result.contacts[0]).toBe<ContactModel>(editedContact);
    });

    it('should remove contact item with "deleteContact" action', () => {
        const deletedContactId = initialState.contacts[0]._id;
        const action = { type: deleteContact.type, payload: deletedContactId };
        const result = contactReducer(initialState, action);
        const updatedContacts = initialState.contacts.filter((c) => c._id !== deletedContactId);

        expect(result.contacts).toEqual(updatedContacts);
    });
});