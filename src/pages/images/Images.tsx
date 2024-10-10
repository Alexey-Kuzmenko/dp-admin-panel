import { useRef, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, CodeBlock, SelectionForm, UploadForm } from '../../components';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addImage, deleteDir, deleteImage, selectImages } from '../../store/imageSlice';
import { selectMenuSlice } from '../../store/menuSlice';

import { dtoCodeBlocks } from '../../dto/dto-code-blocks';
import { AlertState, AlertType } from '../../types/alert-state.type';

import { ALERT_SUCCESS_MGS } from '../../constants/constants';
import { extractImgDirName } from '../../utils/extractImgDirName';

import styles from './Images.module.scss';

const Images: React.FC = () => {
    const imagesList = useAppSelector(selectImages);
    const { isMenuOpen } = useAppSelector(selectMenuSlice);
    const dispatch = useAppDispatch();
    const uploadForm = useRef<HTMLFormElement>(null);

    const [newImgUrl, setNewImgUrl] = useState<string>('');
    const [dirList, setDirList] = useState<string[]>(extractImgDirName(imagesList));
    const [deletedDirName, setDeletedDirName] = useState<string>('');
    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });

    const handleImageDelete = (imgUrl: string): void => {
        dispatch(deleteImage(imgUrl));
        setAlertState({ type: 'success', isOpen: true, message: 'Image successfully deleted' });
        hideAlertAutomatically('success');
    };

    const handelSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(addImage(newImgUrl));
        setNewImgUrl('');
        uploadForm.current?.reset();

        setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
        hideAlertAutomatically('success');
    };

    const handelReset = (): void => {
        setAlertState({ type: 'warning', isOpen: true, message: 'Input value was reset' });
        hideAlertAutomatically('warning');
    };

    const handleDirDelete = (): void => {
        // * temporary solution
        setDirList(dirList.filter((d) => d !== deletedDirName));
        dispatch(deleteDir(deletedDirName));
        setDeletedDirName('');

        setAlertState({ type: 'success', isOpen: true, message: 'Directory successfully deleted' });
        hideAlertAutomatically('success');
    };

    const handleAlertClose = (): void => {
        setAlertState({ ...alertState, isOpen: false });
    };

    const hideAlertAutomatically = (type: AlertType, timeout = 3_000): void => {
        setTimeout(() => {
            setAlertState({
                ...alertState,
                type,
                isOpen: false
            });
        }, timeout);
    };

    return (
        <div className={styles.Images}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Images__accordion, {
                [styles.Images__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='images-dto-preview-accordion-content'
                    id='images-dto-preview-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={dtoCodeBlocks.images}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* Delete images accordion */}
            <Accordion className={cn(styles.Images__accordion, {
                [styles.Images__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-image-accordion-content'
                    id='delete-image-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete image</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    {
                        !imagesList.length ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Images list is empty
                            </Typography>
                            :
                            <ImageList sx={{ width: '100%' }}>
                                {imagesList.map((img) => (
                                    <ImageListItem key={img.name}>
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            loading='lazy'
                                        />
                                        <ImageListItemBar
                                            title={`Image name: ${img.name}`}
                                            subtitle={`Image URL: ${img.url}`}
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: theme.palette.error.main }}
                                                    aria-label={`delete-image-${img.url}`}
                                                    onClick={() => handleImageDelete(img.url)}
                                                >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                    }

                </AccordionDetails>
            </Accordion>

            {/* Add image accordion */}
            <Accordion className={cn(styles.Images__accordion, {
                [styles.Images__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='add-image-accordion-content'
                    id='add-image-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Add image</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UploadForm
                        id='upload-image-form'
                        reference={uploadForm}
                        setValue={setNewImgUrl}
                        onSubmit={handelSubmit}
                        onReset={handelReset}
                    />
                </AccordionDetails>
            </Accordion>

            {/* Delete directory accordion */}
            <Accordion className={cn(styles.Images__accordion, {
                [styles.Images__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls='delete-directory-accordion-content'
                    id='delete-directory-accordion-header'
                >
                    <Typography component='h1' variant='h5'>Delete directory</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <SelectionForm
                        values={dirList}
                        label='Choose directory name'
                        selectId='directory-select'
                        labelId='directory-select-label'
                        id='directory-select-form'
                        onFind={setDeletedDirName}
                        onDelete={handleDirDelete}
                    />

                    {
                        !deletedDirName
                            ?
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Directory name is not selected
                            </Typography>
                            :
                            <Typography component='h2' variant='h5' sx={{ textAlign: 'center', marginTop: '30px' }}>
                                Selected directory name: {deletedDirName}
                            </Typography>
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

export default Images;