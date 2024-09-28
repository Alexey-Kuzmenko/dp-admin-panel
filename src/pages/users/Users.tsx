import { useState } from 'react';

import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, Button, CodeBlock, SelectionForm, StyledTableCell, StyledTableRow } from '../../components';

import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addUser, deleteUser, selectUsers } from '../../store/userSlice';
import { selectMenuSlice } from '../../store/menuSlice';

import { modelsCodeBlocks } from '../../models/models-code-blocks';
import { AlertState, AlertType } from '../../types/alert-state.type';
import { UserModel } from '../../models/user.model';
import { CreateUserDto, createUserDtoKeys } from '../../dto/user.dto';

import generateCodeBlock from '../../utils/generateCodeBlock';
import { validateValue } from '../../utils/validateValue';

import {
    ALERT_ERROR_MGS,
    ALERT_RESET_MGS,
    ALERT_SUCCESS_MGS,
    JSON_EDITOR_WARN_MSG,
    VIEWPORT_MIN_WIDTH
} from '../../constants/constants';

import styles from './Users.module.scss';

const userTemplate: CreateUserDto = {
    password: '',
    email: ''
};

export const Users = () => {
    const users = useAppSelector(selectUsers);
    const { isMenuOpen } = useAppSelector(selectMenuSlice);
    const dispatch = useAppDispatch();
    const usersIds = users.map((u) => u._id);

    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });
    const [newUser, setNewUser] = useState<object>(userTemplate);

    const [deletedUserId, setDeletedUserId] = useState<string>('');
    const deletedUser = users.find((u) => u._id === deletedUserId);

    const viewportWidth = window.innerWidth;

    const renderTableRows = (users: Array<UserModel>): JSX.Element[] => {
        return users.map(({ _id, email, passwordHash }) => {
            return (
                <StyledTableRow
                    key={_id}
                >
                    <StyledTableCell>{_id}</StyledTableCell>
                    <StyledTableCell content='th' scope='row' align='right'>{email}</StyledTableCell>
                    <StyledTableCell content='th' scope='row' align='right'>{passwordHash}</StyledTableCell>
                </StyledTableRow>
            );
        });
    };

    const handleSave = (): void => {
        if (validateValue(newUser) === false) {
            setAlertState({ type: 'error', isOpen: true, message: ALERT_ERROR_MGS });
            hideAlertAutomatically('error');
        } else {
            dispatch(addUser(newUser as CreateUserDto));
            setNewUser(userTemplate);
            setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
            hideAlertAutomatically('success');
        }
    };

    const handleReset = (): void => {
        setNewUser(userTemplate);
        setAlertState({ type: 'warning', isOpen: true, message: ALERT_RESET_MGS });
        hideAlertAutomatically('warning');
    };

    const handleDelete = (): void => {
        dispatch(deleteUser(deletedUserId));
        setAlertState({ type: 'success', isOpen: true, message: 'Contact successfully deleted' });
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
        <div className={styles.Users}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Users__accordion, {
                [styles.Users__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='users-dto-preview-accordion-content'
                    id='users-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={modelsCodeBlocks.user}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* All users accordion (table view) */}
            <Accordion className={cn(styles.Users__accordion, {
                [styles.Users__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='users-table-preview-accordion-content'
                    id='users-table-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>All users (Table view)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table aria-label='users-data-table'>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>User ID</StyledTableCell>
                                    <StyledTableCell align='right'>User email</StyledTableCell>
                                    <StyledTableCell align='right'>Password hash</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {renderTableRows(users)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>

            {/* All users accordion (JSON view) */}
            <Accordion className={cn(styles.Users__accordion, {
                [styles.Users__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='users-json-preview-accordion-content'
                    id='users-json-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>All users (JSON view)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={users}
                                className={styles.Users__jsonEditor}
                                theme='githubDark'
                                restrictEdit={({ fullData }) => fullData !== null}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ fullData }) => fullData !== null}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add user accordion */}
            <Accordion className={cn(styles.Users__accordion, {
                [styles.Users__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-user-json-editor-content'
                    id='add-user-json-editor-header'
                >
                    <Typography component='h1' variant='h5'>Add user</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                {JSON_EDITOR_WARN_MSG}
                            </Typography>
                            :
                            <JsonEditor
                                data={newUser}
                                className={styles.Users__jsonEditor}
                                theme='githubDark'
                                onUpdate={({ newData }) => {
                                    setNewUser(newData);
                                }}
                                restrictAdd={({ fullData }) => fullData !== null}
                                restrictDelete={({ key }) => createUserDtoKeys.includes(key as string)}
                                restrictTypeSelection={({ value }) => {
                                    if (typeof value === 'boolean') return false;
                                    if (typeof value === 'string') return ['string'];
                                    return ['string'];
                                }}
                            />
                    }
                    <div className={styles.Users__jsonEditorControls}>
                        <Button onClick={() => handleSave()}>Save changes</Button>
                        <Button variant='outlined' onClick={() => handleReset()}>Reset state</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Delete user accordion */}
            <Accordion className={cn(styles.Users__accordion, {
                [styles.Users__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-user-accordion-content'
                    id='delete-user-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete user</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={usersIds}
                        label='Choose user id'
                        selectId='user-select'
                        labelId='user-select-label'
                        id='user-select-form'
                        onFind={setDeletedUserId}
                        onDelete={handleDelete}
                    />

                    {
                        !deletedUser
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                User ID is not selected
                            </Typography>
                            :
                            <Box component='div' sx={{ marginTop: '20px' }}>
                                <CodeBlock
                                    code={generateCodeBlock(deletedUser)}
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