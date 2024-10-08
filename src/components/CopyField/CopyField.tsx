import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

import { IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { theme } from '../../theme/ThemeRegistry';
import { AlertState } from '../../types/alert-state.type';

import styles from './CopyField.module.scss';

interface CopyFiledProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    value: string
    alertState?: AlertState
    setAlertState?: (state: AlertState) => void
}

const { primary, success } = theme.palette;

export const CopyFiled: React.FC<CopyFiledProps> = ({ value, alertState, setAlertState, ...props }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const resetState = async (timeout = 2_000): Promise<void> => {
        setTimeout(() => {
            setIsCopied(false);
        }, timeout);
    };

    const handleClick = async (): Promise<void> => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        await resetState();

        if (setAlertState && alertState) {
            setAlertState({ ...alertState, isOpen: true });
        }
    };

    const icon = !isCopied ?
        <ContentCopyIcon sx={{ color: primary.contrastText }} />
        :
        <DoneIcon sx={{ color: success.main }} />;

    return (
        <div className={styles.CopyField} {...props}>
            <Typography variant='body1' sx={{ overflow: 'auto' }}>
                {value}
            </Typography>

            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>
        </div>
    );
};