import { ContactModel } from '../models/contact.model';

export interface ContactDto extends Omit<ContactModel, '_id'> { }