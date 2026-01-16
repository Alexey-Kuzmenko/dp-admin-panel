import React, { ChangeEventHandler, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import styles from './UploadForm.module.scss';
import { Button } from '../Button/Button';

interface UploadFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    setValue: (state: File) => void
    formRef: React.RefObject<HTMLFormElement>
    isValid: boolean
    setIsValid: (state: boolean) => void
}

export const UploadForm: React.FC<UploadFormProps> = ({ setValue, formRef, isValid, setIsValid, ...props }) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files as FileList;

        if (file.length) {
            setIsValid(true);

            try {
                setValue(file?.[0]);
            } catch (error) {
                throw new Error(error as string);
            }
        }
    };

    return (
        <form {...props} ref={formRef} className={styles.UploadForm}>
            <input
                className={styles.UploadForm__input}
                type='file'
                accept='image/*'
                onChange={handleChange}
            />

            <div className={styles.UploadForm__controls}>
                <Button variant='outlined' type='submit' disabled={!isValid}>Submit</Button>
                <Button variant='contained' type='reset'>Reset</Button>
            </div>
        </form>
    );
};
