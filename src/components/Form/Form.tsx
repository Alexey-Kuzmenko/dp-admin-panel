import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import styles from './Form.module.scss';
import { Typography } from '@mui/material';

interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    title: string
}

export const Form: React.FC<FormProps> = ({ title, ...props }) => {
    return (
        <form className={styles.Form} {...props}>
            <Typography variant='h4' component='h2' textAlign='center'>{title}</Typography>

            <div className={styles.Form__textFields}>
            </div>

        </form>
    );
};