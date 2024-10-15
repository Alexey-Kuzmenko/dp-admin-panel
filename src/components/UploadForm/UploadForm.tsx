import React, { ChangeEventHandler, DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';
import styles from './UploadForm.module.scss';
import { Button } from '../Button/Button';
import { fileToDataString } from '../../utils/fileToDataString';

interface UploadFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    setValue: (state: string) => void
    reference: React.RefObject<HTMLFormElement>
}

export const UploadForm: React.FC<UploadFormProps> = ({ setValue, reference, ...props }) => {
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files as FileList;

        if (file.length) {
            setIsValid(false);

            try {
                const imgUrl = await fileToDataString(file?.[0]);
                setValue(imgUrl);
            } catch (error) {
                throw new Error(error as string);
            }
        }
    };

    return (
        <form {...props} ref={reference} className={styles.UploadForm}>
            <input className={styles.UploadForm__input} type='file' accept='image/*' onChange={handleChange} />
            <div className={styles.UploadForm__controls}>
                <Button variant='outlined' type='submit' disabled={isValid}>Submit</Button>
                <Button variant='contained' type='reset'>Reset</Button>
            </div>
        </form>
    );
};