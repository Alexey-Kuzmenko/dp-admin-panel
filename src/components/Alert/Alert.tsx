import { Alert as MuiAlert } from '@mui/material';
import cn from 'classnames';
import { AlertState } from '../../types/alert-state.type';

import styles from './Alert.module.scss';

interface AlertProps extends AlertState {
    onClose: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, isOpen, onClose }) => {
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