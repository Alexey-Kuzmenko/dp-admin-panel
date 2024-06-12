import { Container } from '../Container/Container';
import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Menu } from '../../components';

import styles from './Header.module.scss';
import { MenuLinkModel } from '../../models/menu-link.model';

const menuLinks: Array<MenuLinkModel> = [
    {
        href: '/',
        label: 'Dashboard'
    },
    {
        href: 'contacts',
        label: 'Contacts'
    },
    {
        href: 'content',
        label: 'Content'
    },
    {
        href: 'images',
        label: 'Images'
    },
    {
        href: 'projects',
        label: 'Projects'
    },
    {
        href: 'skills',
        label: 'Skills'
    },
    {
        href: 'users',
        label: 'Users'
    },
];

export const Header = () => {
    return (
        <header className={styles.Header}>
            <Container>
                <div className={styles.Header__innerFlexContainer}>

                    <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Wrapper for menu and page title */}
                        <Menu menuLinks={menuLinks} />
                        <Typography
                            component='h1'
                            variant='h5'
                            textTransform='uppercase'
                            sx={{ marginLeft: '10px' }}
                            className={styles.Header__title}>
                            Dashboard
                        </Typography>
                    </Box>

                    <PersonIcon className={styles.Header__profileIcon} sx={{ fontSize: '2rem' }} />
                </div>
            </Container>
        </header>
    );
}; 