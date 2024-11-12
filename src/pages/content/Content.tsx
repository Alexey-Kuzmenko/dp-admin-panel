import { useState, useRef } from 'react';

import { Accordion, AccordionSummary, Typography, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, Button, CodeBlock, SelectionForm } from '../../components';

import { JsonEditor } from 'json-edit-react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addPageContent, deletePageContent, editContent, selectContent } from '../../store/contentSlice';
import { selectMenuSlice } from '../../store/menuSlice';

import { dtoCodeBlocks } from '../../dto/dto-code-blocks';
import { ContentModel, Content as SubContent } from '../../models/content.model';
import { contentModelKeys } from '../../models/content.model';
import { AlertState } from '../../types/alert-state.type';

import validateValue from '../../utils/validateValue';
import generateCodeBlock from '../../utils/generateCodeBlock';
import generateContentFormValues from '../../utils/generateContentFormValues';
import findContent from '../../utils/findContent';
import hideAlertAutomatically from '../../utils/hideAlertAutomatically';

import {
    VIEWPORT_MIN_WIDTH,
    ALERT_SUCCESS_MGS,
    ALERT_ERROR_MGS, ALERT_RESET_MGS,
    JSON_EDITOR_WARN_MSG
} from '../../constants/constants';

import styles from './Content.module.scss';

const contentTemplate: Omit<ContentModel, '_id'> = {
    type: 'about',
    eng: {
        title: '',
        body: '',
        image: '',
        links: [],
    },
    ua: {
        title: '',
        body: '',
        image: '',
        links: [],
    }
};

const Content: React.FC = () => {
    const { isMenuOpen } = useAppSelector(selectMenuSlice);
    const content = useAppSelector(selectContent);
    const dispatch = useAppDispatch();
    const contentTypes = generateContentFormValues(content);
    const contentIds = content.map((c) => c._id);

    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });
    const [newContent, setNewContent] = useState<object | Omit<ContentModel, '_id'>>(contentTemplate);
    const [selectionFormValue, setSelectionFormValue] = useState<string>('');

    const [deletedContentId, setDeletedContentId] = useState<string>('');
    const deletedContent = content.find((c) => c._id === deletedContentId);

    const [editedContent, setEditedContent] = useState<object>();
    const editedContentCopy = useRef<SubContent>();

    const viewportWidth = window.innerWidth;

    const handleSave = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            if (validateValue((newContent as ContentModel).eng) === false && ((newContent as ContentModel).ua)) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error', alertState, setAlertState);
            } else {
                dispatch(addPageContent(newContent as ContentModel));
                setNewContent(contentTemplate);
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success', alertState, setAlertState);
            }
        }

        if (action === 'edit' && editedContent && selectionFormValue.length) {
            if (validateValue(editedContent) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error', alertState, setAlertState);
            } else {
                dispatch(editContent({ content: editedContent as SubContent, formValue: selectionFormValue }));
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success', alertState, setAlertState);
            }
        }
    };

    const handleReset = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            setNewContent(contentTemplate);
        }

        if (action === 'edit') {
            setEditedContent(editedContentCopy.current);
        }

        setAlertState({ type: 'warning', isOpen: true, message: ALERT_RESET_MGS });
        hideAlertAutomatically('warning', alertState, setAlertState);
    };

    const handleFind = (value: string): void => {
        const jsonEditorData = findContent(content, value);
        setSelectionFormValue(value);

        if (jsonEditorData) {
            setEditedContent(jsonEditorData);
            editedContentCopy.current = jsonEditorData;
        }
    };

    const handleDelete = (): void => {
        dispatch(deletePageContent(deletedContentId));
        setDeletedContentId('');

        setAlertState({ type: 'success', isOpen: true, message: 'Content successfully deleted' });
        hideAlertAutomatically('success', alertState, setAlertState);
    };

    const handleAlertClose = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

    return (
        <div className={styles.Content}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Content__accordion, {
                [styles.Content__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='content-dto-preview-accordion-content'
                    id='content-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={dtoCodeBlocks.content}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* All pages content accordion */}
            <Accordion className={cn(styles.Content__accordion, {
                [styles.Content__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='content-json-preview-accordion-content'
                    id='content-json-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Pages content</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={content}
                                className={styles.Content__jsonEditor}
                                theme='githubDark'
                                restrictEdit={({ fullData }) => fullData !== null}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ fullData }) => fullData !== null}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add content accordion */}
            <Accordion className={cn(styles.Content__accordion, {
                [styles.Content__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-content-json-editor-content'
                    id='add-content-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Add page content</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1' >
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <>
                                <JsonEditor
                                    data={newContent}
                                    className={styles.Content__jsonEditor}
                                    theme='githubDark'
                                    onUpdate={({ newData }) => {
                                        setNewContent(newData);
                                    }}
                                    restrictAdd={({ fullData }) => fullData !== null}
                                    restrictDelete={({ key }) => contentModelKeys.includes(key as string)}
                                    restrictTypeSelection={({ path, value }) => {
                                        if (path.includes('type')) return ['string'];
                                        if (typeof value === 'boolean') return false;
                                        if (typeof value === 'string') return ['string'];
                                        return ['string', 'object'];
                                    }}
                                />

                                <div className={styles.Content__jsonEditorControls}>
                                    <Button onClick={() => handleSave('add')}>Save changes</Button>
                                    <Button variant='outlined' onClick={() => handleReset('add')}>Reset state</Button>
                                </div>
                            </>
                    }
                </AccordionDetails>
            </Accordion>

            {/* Edit content accordion */}
            <Accordion className={cn(styles.Content__accordion, {
                [styles.Content__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='edit-content-json-editor-content'
                    id='edit-content-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Edit content by type and language</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={contentTypes}
                        label='Choose content type'
                        selectId='content-select'
                        labelId='content-select-label'
                        id='content-select-form'
                        onFind={handleFind}
                    />

                    {
                        !editedContent ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Content type is not selected
                            </Typography>
                            :
                            viewportWidth < VIEWPORT_MIN_WIDTH ?
                                <Typography component='h2' variant='body1' sx={{ marginTop: '30px' }}>
                                    {JSON_EDITOR_WARN_MSG}
                                </Typography>
                                :
                                <>
                                    <Box component='div' sx={{ marginTop: '20px' }}>
                                        <JsonEditor
                                            data={editedContent}
                                            className={styles.Content__jsonEditor}
                                            theme='githubDark'
                                            onUpdate={({ newData }) => {
                                                setEditedContent(newData);
                                            }}
                                            restrictDelete={({ key }) => contentModelKeys.includes(key as string)}
                                            restrictEdit={({ key }) => key === '_id'}
                                            restrictTypeSelection={({ value }) => {
                                                if (typeof value === 'boolean') return false;
                                                return ['string', 'array'];
                                            }}
                                            defaultValue={''}
                                        />
                                    </Box>

                                    <div className={styles.Content__jsonEditorControls}>
                                        <Button onClick={() => handleSave('edit')}>Save changes</Button>
                                        <Button variant='outlined' onClick={() => handleReset('edit')}>
                                            Reset state
                                        </Button>
                                    </div>
                                </>
                    }
                </AccordionDetails>
            </Accordion>

            {/* Delete content accordion */}
            <Accordion className={cn(styles.Content__accordion, {
                [styles.Content__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-content-accordion-content'
                    id='delete-content-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete content</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={contentIds}
                        label='Choose content id'
                        selectId='content-select'
                        labelId='content-select-label'
                        id='content-select-form'
                        onFind={setDeletedContentId}
                        onDelete={handleDelete}
                    />

                    {
                        !deletedContent
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Content ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(deletedContent)}
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

export default Content;