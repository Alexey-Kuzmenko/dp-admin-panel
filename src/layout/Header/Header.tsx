import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from '../Container/Container';
import { Menu } from '../../components';
import generatePageTitle from '../../utils/generatePageTitle';
import { navigationLinks } from './navigation-links';

import styles from './Header.module.scss';

export const Header = () => {
    const { pathname } = useLocation();
    const pageTitle: string = generatePageTitle(pathname === '/' ? 'dashboard' : pathname);

    return (
        <header className={styles.Header}>
            <Container>
                <div className={styles.Header__innerFlexContainer}>

                    <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                        <Menu menuLinks={navigationLinks} />
                        <Typography
                            component='h1'
                            variant='h5'
                            textTransform='uppercase'
                            sx={{ marginLeft: '10px' }}
                            className={styles.Header__title}>
                            {pageTitle}
                        </Typography>
                    </Box>

                    <Link to='user-profile'>
                        <PersonIcon className={styles.Header__profileIcon} sx={{ fontSize: '2rem' }} />
                    </Link>
                </div>
            </Container>
        </header>
    );
};
