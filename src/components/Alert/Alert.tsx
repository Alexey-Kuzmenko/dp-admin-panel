import { Alert as MuiAlert } from '@mui/material';
import cn from 'classnames';

import styles from './Alert.module.scss';

interface AlertProps {
    type?: 'error' | 'warning' | 'info' | 'success'
    message: string
    isOpen: boolean
    onClose: () => void
}

export const Alert: React.FC<AlertProps> = ({ type = 'success', message, isOpen, onClose }) => {
    return (
        <div className={cn(styles.Alert, {
            [styles.Alert_open]: isOpen === true
        })}>
            <MuiAlert variant='filled' severity={type} onClose={onClose} sx={{ width: '100%', maxWidth: '300px' }}>
                {message}
            </MuiAlert>
        </div>

    );
};