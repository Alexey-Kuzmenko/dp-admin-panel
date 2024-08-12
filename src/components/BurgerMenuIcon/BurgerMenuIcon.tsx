import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { toggleMenu } from '../../store/menuSlice';

import styles from './BurgerMenuIcon.module.scss';

interface BurgerMenuIconProps {
    type: 'default' | 'open'
}

export const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = ({ type }) => {
    const dispatch = useAppDispatch();

    const handleClick = (): void => {
        dispatch(toggleMenu());
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