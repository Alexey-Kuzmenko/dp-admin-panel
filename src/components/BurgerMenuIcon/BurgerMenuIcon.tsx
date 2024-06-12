import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box } from '@mui/material';

import styles from './BurgerMenuIcon.module.scss';

interface BurgerMenuIconProps {
    isMenuOpen: boolean
    setIsMenuOpen: (state: boolean) => void
    type: 'default' | 'open'
}

export const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = ({ isMenuOpen, setIsMenuOpen, type }) => {

    const handleClick = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    let icon: JSX.Element = (
        <Box sx={{ display: 'flex' }} onClick={handleClick}>
            <MenuIcon className={styles.BurgerMenuIcon} sx={{ fontSize: '2rem' }} />
        </Box>
    );

    if (type === 'open') {
        icon = (
            <Box sx={{ display: 'flex' }} onClick={handleClick}>
                <MenuOpenIcon className={styles.BurgerMenuIcon} sx={{ fontSize: '2rem' }} />
            </Box>
        );
    }

    return icon;
};