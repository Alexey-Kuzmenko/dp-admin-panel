import { useEffect, useRef, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { theme } from '../../theme/ThemeRegistry';
import { Alert, CodeBlock, Loader, SelectionForm, UploadForm } from '../../components';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
    addImage,
    deleteDir,
    deleteImage,
    fetchImages,
    selectDirectories,
    selectImages,
    selectLoading
} from '../../store/imageSlice';
import { selectMenuSlice } from '../../store/menuSlice';

import { codeBlockDtoTemplates } from '../../constants/code-block-dto';
import { AlertState } from '../../types';

import { ALERT_SUCCESS_MGS } from '../../constants';
import hideAlertAutomatically from '../../utils/hideAlertAutomatically';

import styles from './Images.module.scss';

const STATIC_FILES_URL = import.meta.env.VITE_STATIC_FILES_URL;

export const Images: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const imagesList = useAppSelector(selectImages);
    const dirList = useAppSelector(selectDirectories);
    const loading = useAppSelector(selectLoading);
    const { isMenuOpen } = useAppSelector(selectMenuSlice);

    const uploadForm = useRef<HTMLFormElement>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [selectedImg, setSelectedImg] = useState<File>();
    const [deletedDirName, setDeletedDirName] = useState<string>('');
    const [alertState, setAlertState] = useState<AlertState>({ type: 'success', isOpen: false, message: '' });

    const handleImageDelete = async (imgUrl: string): Promise<void> => {
        const actionResult = await dispatch(deleteImage(imgUrl));

        if (deleteImage.rejected.match(actionResult)) {
            setAlertState({ type: 'error', isOpen: true, message: actionResult.error.message ?? '' });

            return;
        }

        setAlertState({ type: 'success', isOpen: true, message: 'Image successfully deleted' });
        hideAlertAutomatically(alertState, setAlertState);
    };

    const handelSubmit = async (): Promise<void> => {
        const formData = new FormData();

        if (selectedImg) {
            formData.append('image', selectedImg);
            const actionResult = await dispatch(addImage(formData));

            uploadForm.current?.reset();
            setIsFormValid(false);

            if (addImage.rejected.match(actionResult)) {
                setAlertState({ type: 'error', isOpen: true, message: actionResult.error.message ?? '' });

                return;
            }

            setAlertState({ type: 'success', isOpen: true, message: ALERT_SUCCESS_MGS });
            hideAlertAutomatically(alertState, setAlertState);
        }
    };

    const handelReset = (): void => {
        uploadForm.current?.reset();
        setIsFormValid(false);
        setAlertState({ type: 'warning', isOpen: true, message: 'Input value was reset' });
        hideAlertAutomatically(alertState, setAlertState);
    };

    const handleDirDelete = async (): Promise<void> => {
        const actionResult = await dispatch(deleteDir(deletedDirName));
        setDeletedDirName('');

        if (deleteDir.rejected.match(actionResult)) {
            setAlertState({ type: 'error', isOpen: true, message: actionResult.error.message ?? '' });

            return;
        }

        setAlertState({ type: 'success', isOpen: true, message: 'Directory successfully deleted' });
        hideAlertAutomatically(alertState, setAlertState);
    };

    const handleAlertClose = (): void => {
        setAlertState({ ...alertState, isOpen: false });
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
                        code={codeBlockDtoTemplates.images}
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
                                            src={`${STATIC_FILES_URL}/${img.url}`}
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
                        formRef={uploadForm}
                        setValue={setSelectedImg}
                        isValid={isFormValid}
                        setIsValid={setIsFormValid}
                        onFromSubmit={handelSubmit}
                        onFormReset={handelReset}
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

            {loading && <Loader />}

        </div>
    );
};
