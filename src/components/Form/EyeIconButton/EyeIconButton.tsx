import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { theme } from '../../../theme/ThemeRegistry';

interface IconButtonProps {
    isValueShown: boolean
    onClick: React.MouseEventHandler
    ariaLabelValues: {
        shown: string,
        hidden: string
    }
    color?: string
}

const whiteColor = theme.palette.primary.contrastText;

export const EyeIconButton: React.FC<IconButtonProps> = ({
    isValueShown,
    onClick,
    ariaLabelValues,
    color = whiteColor
}) => {
    return (
        <IconButton
            // aria-label={isValueShown ? 'hide the password' : 'display the password'}
            aria-label={isValueShown ? ariaLabelValues.shown : ariaLabelValues.hidden}
            onClick={onClick}
        >
            {
                isValueShown ?
                    <VisibilityOffIcon sx={{ color }} />
                    :
                    <VisibilityIcon sx={{ color }} />
            }
        </IconButton>
    );
};