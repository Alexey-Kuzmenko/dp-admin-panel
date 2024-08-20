import { useRef, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import { theme } from '../../theme/ThemeRegistry';
import { CodeBlock, SelectionForm, Button, Alert } from '../../components';

import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addContact, deleteContact, editContact } from '../../store/contactSlice';

import { modelsCodeBlocks } from '../../models/models-code-blocks';
import { ContactModel, contactModelKeys } from '../../models/contact.model';
import { AlertState } from '../../types/alert-state.type';

import generateCodeBlock from '../../utils/generateCodeBlock';
import { validateValue } from '../../utils/validateValue';

import {
    VIEWPORT_MIN_WIDTH,
    ALERT_SUCCESS_MGS,
    ALERT_ERROR_MGS,
    ALERT_RESET_MGS,
    JSON_EDITOR_WARN_MSG
} from '../../constants/constants';

import styles from './Contacts.module.scss';

const contactTemplate: Omit<ContactModel, '_id'> = {
    label: '',
    body: '',
    href: '',
    iconType: 'email',
    atl: ''
};

export const Contacts = () => {
    const contacts = useAppSelector((store) => store.contacts.contacts);
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);
    const dispatch = useAppDispatch();
    const contactsIds = contacts.map((c) => c._id);

    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });
    const [newContact, setNewContact] = useState<object>(contactTemplate);

    const [deletedContactId, setDeletedContactId] = useState<string>('');
    const deletedContact = contacts.find((c) => c._id === deletedContactId);

    const [editedContact, setEditedContact] = useState<object>();
    const editedContactCopy = useRef<ContactModel>();

    const viewportWidth = window.innerWidth;

    const handleSave = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            if (validateValue(newContact) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
            } else {
                dispatch(addContact(newContact as ContactModel));
                setNewContact(contactTemplate);
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
            }
        }

        if (action === 'edit' && editedContact) {
            if (validateValue(editedContact) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
            } else {
                dispatch(editContact(editedContact as ContactModel));
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
            }
        }
    };

    const handleReset = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            setNewContact(contactTemplate);
        }

        if (action === 'edit') {
            setEditedContact(editedContactCopy.current);
        }

        setAlertState({ type: 'warning', isOpen: true, message: ALERT_RESET_MGS });
    };

    const handleFind = (id: string): void => {
        const jsonEditorData = contacts.find((c) => c._id === id);

        if (jsonEditorData) {
            setEditedContact(jsonEditorData);
            editedContactCopy.current = jsonEditorData;
        }
    };

    const handleDelete = (): void => {
        dispatch(deleteContact(deletedContactId));
        setAlertState({ type: 'success', isOpen: true, message: 'Contact successfully deleted' });
    };

    const handleAlertClose = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

    return (
        <div className={styles.Contacts}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='contacts-dto-preview-accordion-content'
                    id='contacts-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={modelsCodeBlocks.contacts}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* All contacts accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='contacts-json-preview-accordion-content'
                    id='contacts-json-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>All contacts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={contacts}
                                className={styles.Contacts__jsonEditor}
                                theme='githubDark'
                                restrictEdit={({ fullData }) => fullData !== null}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ fullData }) => fullData !== null}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-contact-json-editor-content'
                    id='add-contact-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Add contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={newContact}
                                className={styles.Contacts__jsonEditor}
                                theme='githubDark'
                                onUpdate={({ newData }) => {
                                    setNewContact(newData);
                                }}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ key }) => contactModelKeys.includes(key as string)}
                                restrictTypeSelection={({ value }) => {
                                    if (typeof value === 'boolean') return false;
                                    if (typeof value === 'string') return ['string'];
                                    return ['string'];
                                }}
                            />
                    }

                    <div className={styles.Contacts__jsonEditorControls}>
                        <Button onClick={() => handleSave('add')}>Save changes</Button>
                        <Button variant='outlined' onClick={() => handleReset('add')}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Edit contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='edit-contact-json-editor-content'
                    id='edit-contact-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Edit contact</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={contactsIds}
                        label='Choose contact id'
                        selectId='contacts-select'
                        labelId='contacts-select-label'
                        id='contacts-select-form'
                        onFind={handleFind}
                    />

                    {
                        !editedContact ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Contact ID is not selected
                            </Typography>
                            :
                            viewportWidth < VIEWPORT_MIN_WIDTH ?
                                <Typography component='h2' variant='body1' sx={{ marginTop: '30px' }}>
                                    {JSON_EDITOR_WARN_MSG}
                                </Typography>
                                :

                                <Box component='div' sx={{ marginTop: '20px' }}>
                                    <JsonEditor
                                        data={editedContact}
                                        className={styles.Contacts__jsonEditor}
                                        theme='githubDark'
                                        onUpdate={({ newData }) => {
                                            setEditedContact(newData);
                                        }}
                                        restrictAdd={({ key }) => key in editContact}
                                        restrictDelete={({ key }) => contactModelKeys.includes(key as string)}
                                        restrictEdit={({ key }) => key === '_id'}
                                        restrictTypeSelection={({ value }) => {
                                            if (typeof value === 'boolean') return false;
                                            if (typeof value === 'string') return ['string'];
                                            return ['string'];
                                        }}
                                        defaultValue={''}
                                    />
                                </Box>
                    }

                    <div className={styles.Contacts__jsonEditorControls}>
                        <Button onClick={() => handleSave('edit')}>Save changes</Button>
                        <Button variant='outlined' onClick={() => handleReset('edit')}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Delete contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-contact-accordion-content'
                    id='delete-contact-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete contact</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={contactsIds}
                        label='Choose contact id'
                        selectId='contacts-select'
                        labelId='contacts-select-label'
                        id='contacts-select-form'
                        onFind={setDeletedContactId}
                        onDelete={handleDelete}
                    />

                    {
                        !deletedContact
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Contact ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(deletedContact)}
                                    lang='typescript'
                                />
                            </Box>
                    }

                </AccordionDetails>
            </Accordion>

            {/* Alerts */}
            <Alert
                type={alertState.type}
                message={alertState.message}
                isOpen={alertState.isOpen}
                onClose={handleAlertClose}
            />

        </div>
    );
};