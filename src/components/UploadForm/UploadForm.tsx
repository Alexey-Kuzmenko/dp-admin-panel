import React, { ChangeEventHandler, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import styles from './UploadForm.module.scss';
import { Button } from '../Button/Button';

interface UploadFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    setValue: (state: File) => void
    formRef: React.RefObject<HTMLFormElement>
    isValid: boolean
    setIsValid: (state: boolean) => void
    onFormReset: () => void
    onFromSubmit: () => Promise<void>
}

export const UploadForm: React.FC<UploadFormProps> = ({
    setValue,
    formRef,
    isValid,
    setIsValid,
    onFromSubmit,
    onFormReset,
    ...props
}) => {

    const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

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
        <form {...props} ref={formRef} className={styles.UploadForm} onSubmit={handelSubmit}>
            <input
                className={styles.UploadForm__input}
                type='file'
                accept='image/*'
                onChange={handleChange}
            />

            <div className={styles.UploadForm__controls}>
                <Button variant='outlined' onClick={onFromSubmit} disabled={!isValid}>Submit</Button>
                <Button variant='contained' onClick={onFormReset} disabled={!isValid}>Reset</Button>
            </div>
        </form>
    );
};
