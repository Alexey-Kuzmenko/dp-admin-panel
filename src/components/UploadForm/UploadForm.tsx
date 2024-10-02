import React, { ChangeEventHandler, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import styles from './UploadForm.module.scss';
import { Button } from '../Button/Button';

interface UploadFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    onChange: React.FormEventHandler
}

export const UploadForm: React.FC<UploadFormProps> = ({ onChange, ...props }) => {
    return (
        <form {...props} className={styles.UploadForm}>
            <input className={styles.UploadForm__input} type="file" accept="image/*" onChange={onChange} />
            <Button variant='outlined' type='reset'>Reset</Button>
        </form>
    );
};