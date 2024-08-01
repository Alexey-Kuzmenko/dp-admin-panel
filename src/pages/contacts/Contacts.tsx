import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import { CodeBlock, SelectionForm, Form, Button } from '../../components';
import { theme } from '../../theme/ThemeRegistry';
import { modelsCodeBlocks } from '../../models/models-code-blocks';
import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { VIEWPORT_MIN_WIDTH } from '../../constants/constants';
import generateCodeBlock from '../../utils/generateCodeBlock';
import { deleteContact, editContacts } from '../../store/contactSlice';
import { contactModelKeys } from '../../models/contact.model';

import styles from './Contacts.module.scss';

export const Contacts = () => {
    const contacts = useAppSelector((store) => store.contacts.contacts);
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);
    const dispatch = useAppDispatch();
    const [contactId, setContactId] = useState<string>('');
    const [jsonEditorData, setJsonEditorData] = useState<object>(contacts);

    const contactsIds = contacts.map((c) => c._id);
    const contact = contacts.find((c) => c._id === contactId);

    const viewportWidth = window.innerWidth;

    const handleDelete = (): void => {
        dispatch(deleteContact(contactId));
    };

    const handleSave = (): void => {
        dispatch(editContacts(jsonEditorData));
    };

    const handleReset = (): void => {
        setJsonEditorData(contacts);
    };

    return (
        <div className={styles.Contacts}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="dto-preview-accordion-content"
                    id="dto-preview-accordion-header"
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

            {/* JSON editor accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="json-editor-accordion-content"
                    id="json-editor-accordion-header"
                >
                    <Typography component='h1' variant='h5'>All contacts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                *JSON editor not available on current screen width. Please rotate
                                your device and reload the page, or log in from another device.
                            </Typography>
                            :
                            <JsonEditor
                                data={jsonEditorData}
                                className={styles.Contacts__jsonEditor}
                                theme='githubDark'
                                onUpdate={({ newData }) => {
                                    setJsonEditorData(newData);
                                }}
                                restrictEdit={({ key }) => key === '_id'}
                                restrictAdd={({ parentData }) => parentData !== null}
                                restrictDelete={({ key }) => contactModelKeys.includes(key as string)}
                                restrictTypeSelection={({ path, value }) => {
                                    if (path.includes('iconType')) return ['string'];
                                    if (typeof value === 'boolean') return false;
                                    if (typeof value === 'string') return ['string'];
                                    return ['string', 'object'];
                                }}
                            />
                    }

                    <div className={styles.Contacts__jsonEditorControls}>
                        <Button onClick={handleSave}>Save changes</Button>
                        <Button variant='outlined' onClick={handleReset}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Add contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="json-preview-header"
                >
                    <Typography component='h1' variant='h5'>Add contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Form title='Add contact' />
                </AccordionDetails>
            </Accordion>

            {/* Delete contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="delete-contact-accordion-content"
                    id="delete-contact-accordion-header"
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
                        setId={setContactId}
                        onDelete={handleDelete}
                    />

                    {
                        !contact
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Contact ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(contact)}
                                    lang='typescript'
                                />
                            </Box>
                    }

                </AccordionDetails>
            </Accordion>

        </div>
    );
};