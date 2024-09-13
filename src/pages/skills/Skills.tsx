import { useRef, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Box } from '@mui/material';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, Button, CodeBlock, SelectionForm } from '../../components';

import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addSkill, deleteSkill, editSkill } from '../../store/skillSlice';

import { modelsCodeBlocks } from '../../models/models-code-blocks';
import { AlertState, AlertType } from '../../types/alert-state.type';
import { SkillModel, skillModelKeys } from '../../models/skill.model';

import generateCodeBlock from '../../utils/generateCodeBlock';
import { validateValue } from '../../utils/validateValue';

import {
    VIEWPORT_MIN_WIDTH,
    ALERT_SUCCESS_MGS,
    ALERT_ERROR_MGS,
    ALERT_RESET_MGS,
    JSON_EDITOR_WARN_MSG
} from '../../constants/constants';

import styles from './Skills.module.scss';

const skillTemplate: Omit<SkillModel, '_id'> = {
    slug: '',
    label: '',
    iconClass: ''
};

export const Skills = () => {
    const skills = useAppSelector((store) => store.skills.skills);
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);
    const dispatch = useAppDispatch();
    const skillsIds = skills.map((s) => s._id);

    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });
    const [newSkill, setNewSkill] = useState<object>(skillTemplate);

    const [deletedSkillId, setDeletedSkillId] = useState<string>('');
    const deletedSkill = skills.find((s) => s._id === deletedSkillId);

    const [editedSkill, setEditedSkill] = useState<object>();
    const editedSkillCopy = useRef<SkillModel>();

    const viewportWidth = window.innerWidth;

    const handleSave = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            if (validateValue(newSkill) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error');
            } else {
                dispatch(addSkill(newSkill as SkillModel));
                setNewSkill(skillTemplate);
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success');
            }
        }

        if (action === 'edit' && editedSkill) {
            if (validateValue(editedSkill) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error');
            } else {
                dispatch(editSkill(editedSkill as SkillModel));
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success');
            }
        }
    };

    const handleReset = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            setNewSkill(skillTemplate);
        }

        if (action === 'edit') {
            setEditedSkill(editedSkillCopy.current);
        }

        setAlertState({ type: 'warning', isOpen: true, message: ALERT_RESET_MGS });
        hideAlertAutomatically('warning');
    };

    const handleFind = (id: string): void => {
        const jsonEditorData = skills.find((s) => s._id === id);

        if (jsonEditorData) {
            setEditedSkill(jsonEditorData);
            editedSkillCopy.current = jsonEditorData;
        }
    };

    const handleDelete = (): void => {
        dispatch(deleteSkill(deletedSkillId));
        setAlertState({ type: 'success', isOpen: true, message: 'Skill successfully deleted' });
        hideAlertAutomatically('success');
    };

    const handleAlertClose = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

    function hideAlertAutomatically(type: AlertType, timeout = 3_000): void {
        setTimeout(() => {
            setAlertState({
                ...alertState,
                type,
                isOpen: false
            });
        }, timeout);
    }

    return (
        <div className={styles.Skills}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Skills__accordion, {
                [styles.Skills__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='skills-dto-preview-accordion-content'
                    id='skills-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={modelsCodeBlocks.skills}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* All skills accordion */}
            <Accordion className={cn(styles.Skills__accordion, {
                [styles.Skills__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='skills-json-preview-accordion-content'
                    id='skills-json-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>All skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={skills}
                                className={styles.Skills__jsonEditor}
                                theme='githubDark'
                                restrictEdit={({ fullData }) => fullData !== null}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ fullData }) => fullData !== null}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add skill accordion */}
            <Accordion className={cn(styles.Skills__accordion, {
                [styles.Skills__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-skill-json-editor-content'
                    id='add-skill-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Add skill</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={newSkill}
                                className={styles.Skills__jsonEditor}
                                theme='githubDark'
                                onUpdate={({ newData }) => {
                                    setNewSkill(newData);
                                }}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ key }) => skillModelKeys.includes(key as string)}
                                restrictTypeSelection={({ value }) => {
                                    if (typeof value === 'boolean') return false;
                                    if (typeof value === 'string') return ['string'];
                                    return ['string'];
                                }}
                            />
                    }

                    <div className={styles.Skills__jsonEditorControls}>
                        <Button onClick={() => handleSave('add')}>Save changes</Button>
                        <Button variant='outlined' onClick={() => handleReset('add')}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Edit skills accordion */}
            <Accordion className={cn(styles.Skills__accordion, {
                [styles.Skills__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='edit-skill-json-editor-content'
                    id='edit-skill-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Edit skill</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={skillsIds}
                        label='Choose skill id'
                        selectId='skill-select'
                        labelId='skill-select-label'
                        id='skill-select-form'
                        onFind={handleFind}
                    />

                    {
                        !editedSkill ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Skill ID is not selected
                            </Typography>
                            :
                            viewportWidth < VIEWPORT_MIN_WIDTH ?
                                <Typography component='h2' variant='body1' sx={{ marginTop: '30px' }}>
                                    {JSON_EDITOR_WARN_MSG}
                                </Typography>
                                :

                                <Box component='div' sx={{ marginTop: '20px' }}>
                                    <JsonEditor
                                        data={editedSkill}
                                        className={styles.Skills__jsonEditor}
                                        theme='githubDark'
                                        onUpdate={({ newData }) => {
                                            setEditedSkill(newData);
                                        }}
                                        restrictAdd={({ key }) => key in editSkill}
                                        restrictDelete={({ key }) => skillModelKeys.includes(key as string)}
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

                    <div className={styles.Skills__jsonEditorControls}>
                        <Button onClick={() => handleSave('edit')}>Save changes</Button>
                        <Button variant='outlined' onClick={() => handleReset('edit')}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Delete skill accordion */}
            <Accordion className={cn(styles.Skills__accordion, {
                [styles.Skills__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-skill-accordion-content'
                    id='delete-skill-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete skill</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={skillsIds}
                        label='Choose skill id'
                        selectId='skills-select'
                        labelId='skills-select-label'
                        id='skills-select-form'
                        onFind={setDeletedSkillId}
                        onDelete={handleDelete}
                    />

                    {
                        !deletedSkill
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Skill ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(deletedSkill)}
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