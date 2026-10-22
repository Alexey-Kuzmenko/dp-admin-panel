import { IconButton, SxProps, Theme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { theme } from '../../../theme/ThemeRegistry';

interface CopyIconProps {
    codeString: string
}

const iconButtonStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: theme.palette.primary.contrastText
};

const iconStyle: SxProps<Theme> = {
    color: theme.palette.primary.contrastText,
    fontSize: '20px'
};

export const CopyIcon: React.FC<CopyIconProps> = ({ codeString }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const resetCopyIconState = async (): Promise<void> => {
        setTimeout(() => {
            setIsCopied(false);
        }, 3_000);
    };

    const handleClick = (): void => {
        if (isCopied) return;

        setIsCopied(true);
        navigator.clipboard.writeText(codeString);
        resetCopyIconState();
    };

    return (
        <IconButton sx={iconButtonStyle} onClick={handleClick}>
            {isCopied ? <DoneIcon sx={iconStyle} /> : <ContentCopyIcon sx={iconStyle} />}
        </IconButton>
    );
};
