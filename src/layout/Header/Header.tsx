import { Container } from '../Container/Container';
import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Menu } from '../../components';
import { MenuLinkModel } from '../../models/menu-link.model';
import generatePageTitle from '../../utils/generatePageTitile';
import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

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
    const { pathname } = useLocation();
    const pageTitle: string = generatePageTitle(pathname === '/' ? 'dashboard' : pathname);

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
                            {pageTitle}
                        </Typography>
                    </Box>

                    <PersonIcon className={styles.Header__profileIcon} sx={{ fontSize: '2rem' }} />
                </div>
            </Container>
        </header>
    );
}; 