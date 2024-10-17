import { useRef, useState } from 'react';

import { Accordion, AccordionSummary, Typography, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, Button, CodeBlock, SelectionForm } from '../../components';

import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { addProject, deleteProject, editProject, selectProjects } from '../../store/projectSlice';
import { selectMenuSlice } from '../../store/menuSlice';

import { dtoCodeBlocks } from '../../dto/dto-code-blocks';
import { AlertState, AlertType } from '../../types/alert-state.type';
import { ProjectModel, projectModelKeys } from '../../models/project.model';

import generateCodeBlock from '../../utils/generateCodeBlock';
import { validateValue } from '../../utils/validateValue';

import {
    ALERT_ERROR_MGS,
    ALERT_RESET_MGS,
    ALERT_SUCCESS_MGS,
    JSON_EDITOR_WARN_MSG,
    VIEWPORT_MIN_WIDTH
} from '../../constants/constants';

import styles from './Projects.module.scss';

const projectTemplate: Omit<ProjectModel, '_id'> = {
    name: '',
    tags: [],
    description: '',
    link: '',
    repoLink: '',
    image: '',
    body: '',
    technologies: []
};

const Projects: React.FC = () => {
    const projects = useAppSelector(selectProjects);
    const { isMenuOpen } = useAppSelector(selectMenuSlice);
    const dispatch = useAppDispatch();
    const projectsIds = projects.map((p) => p._id);

    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });
    const [newProject, setNewProject] = useState<object>(projectTemplate);

    const [deletedProjectId, setDeletedProjectId] = useState<string>('');
    const deletedProject = projects.find((p) => p._id === deletedProjectId);

    const [editedProject, setEditedProject] = useState<object>();
    const editedProjectCopy = useRef<ProjectModel>();

    const viewportWidth = window.innerWidth;

    const handleSave = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            if (validateValue(newProject) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error');
            } else {
                dispatch(addProject(newProject as ProjectModel));
                setNewProject(projectTemplate);
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success');
            }
        }

        if (action === 'edit' && editedProject) {
            if (validateValue(editedProject) === false) {
                setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
                hideAlertAutomatically('error');
            } else {
                dispatch(editProject(editedProject as ProjectModel));
                setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
                hideAlertAutomatically('success');
            }
        }
    };

    const handleReset = (action: 'edit' | 'add'): void => {
        if (action === 'add') {
            setNewProject(projectTemplate);
        }

        if (action === 'edit') {
            setEditedProject(editedProjectCopy.current);
        }

        setAlertState({ type: 'warning', isOpen: true, message: ALERT_RESET_MGS });
        hideAlertAutomatically('warning');
    };

    const handleFind = (id: string): void => {
        const jsonEditorData = projects.find((f) => f._id === id);

        if (jsonEditorData) {
            setEditedProject(jsonEditorData);
            editedProjectCopy.current = jsonEditorData;
        }
    };

    const handleDelete = (): void => {
        dispatch(deleteProject(deletedProjectId));
        setDeletedProjectId('');

        setAlertState({ type: 'success', isOpen: true, message: 'Project successfully deleted' });
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
        <div className={styles.Projects}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Projects__accordion, {
                [styles.Projects__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='projects-dto-preview-accordion-content'
                    id='projects-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={dtoCodeBlocks.projects}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* All projects accordion */}
            <Accordion className={cn(styles.Projects__accordion, {
                [styles.Projects__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='projects-json-preview-accordion-content'
                    id='projects-json-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>All projects</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={projects}
                                className={styles.Projects__jsonEditor}
                                theme='githubDark'
                                restrictEdit={({ fullData }) => fullData !== null}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ fullData }) => fullData !== null}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add projects accordion */}
            <Accordion className={cn(styles.Projects__accordion, {
                [styles.Projects__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-project-json-editor-content'
                    id='add-project-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Add project</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <>
                                <JsonEditor
                                    data={newProject}
                                    className={styles.Projects__jsonEditor}
                                    theme='githubDark'
                                    onUpdate={({ newData }) => {
                                        setNewProject(newData);
                                    }}
                                    restrictAdd={({ fullData }) => fullData !== null}
                                    restrictDelete={({ key }) => projectModelKeys.includes(key as string)}
                                    restrictTypeSelection={({ value }) => {
                                        if (typeof value === 'boolean') return false;
                                        if (typeof value === 'string') return ['string'];
                                        return ['string'];
                                    }}
                                />

                                <div className={styles.Projects__jsonEditorControls}>
                                    <Button onClick={() => handleSave('add')}>Save changes</Button>
                                    <Button variant='outlined' onClick={() => handleReset('add')}>Reset state</Button>
                                </div>
                            </>
                    }
                </AccordionDetails>
            </Accordion>

            {/* Edit project accordion */}
            <Accordion className={cn(styles.Projects__accordion, {
                [styles.Projects__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='edit-projects-json-editor-content'
                    id='edit-projects-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Edit project</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={projectsIds}
                        label='Choose project id'
                        selectId='projects-select'
                        labelId='projects-select-label'
                        id='projects-select-form'
                        onFind={handleFind}
                    />

                    {
                        !editedProject ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Project ID is not selected
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
                                            data={editedProject}
                                            className={styles.Projects__jsonEditor}
                                            theme='githubDark'
                                            onUpdate={({ newData }) => {
                                                setEditedProject(newData);
                                            }}
                                            restrictAdd={({ key }) => key !== 'technologies' && key !== 'tags'}
                                            restrictDelete={({ key }) => projectModelKeys.includes(key as string)}
                                            restrictEdit={({ key }) => key === '_id'}
                                            restrictTypeSelection={({ value }) => {
                                                if (typeof value === 'boolean') return false;
                                                return ['string', 'object'];
                                            }}
                                            defaultValue={''}
                                        />
                                    </Box>

                                    <div className={styles.Projects__jsonEditorControls}>
                                        <Button onClick={() => handleSave('edit')}>Save changes</Button>
                                        <Button variant='outlined' onClick={() => handleReset('edit')}>
                                            Reset state
                                        </Button>
                                    </div>
                                </>
                    }
                </AccordionDetails>
            </Accordion>

            {/* Delete project accordion */}
            <Accordion className={cn(styles.Projects__accordion, {
                [styles.Projects__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-project-accordion-content'
                    id='delete-project-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete project</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={projectsIds}
                        label='Choose project id'
                        selectId='projects-select'
                        labelId='projects-select-label'
                        id='projects-select-form'
                        onFind={setDeletedProjectId}
                        onDelete={handleDelete}
                    />

                    {
                        !deletedProject
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Project ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(deletedProject)}
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

export default Projects;