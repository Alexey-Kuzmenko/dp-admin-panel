import React, { useId, useState } from 'react';
import { BurgerMenuIcon } from '../BurgerMenuIcon/BurgerMenuIcon';
import cn from 'classnames';
import { Backdrop, Box } from '@mui/material';
import { MenuLink } from '../MenuLink/MenuLink';
import { MenuLinkModel } from '../../models/menu-link.model';
import Logo from '../../assets/Logo.svg';

import styles from './Menu.module.scss';

interface MenuProps {
    menuLinks: Array<MenuLinkModel>
}

export const Menu: React.FC<MenuProps> = ({ menuLinks }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleBackdropClick = (): void => {
        setIsMenuOpen(false);
    };

    const renderLinks = (): JSX.Element[] => {
        return menuLinks.map((link: MenuLinkModel) => {
            return (
                <li key={useId()}>
                    <MenuLink setIsMenuOpen={setIsMenuOpen} href={link.href} label={link.label} />
                </li>
            );
        });
    };

    return (
        <>
            <div className={styles.Menu}>

                <BurgerMenuIcon type='default' isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                <nav className={cn(styles.Menu__body, {
                    [styles.Menu__body_open]: isMenuOpen === true
                })}>

                    <Box component='div'>
                        <div className={styles.Menu__controls}>
                            <img src={Logo} alt='Logo' />
                            <BurgerMenuIcon type='open' isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                        </div>

                        <ul className={styles.Menu__list}>
                            {renderLinks()}
                        </ul>
                    </Box>

                    <p className={styles.Menu__logoutBtn}>Log out</p>
                </nav>
            </div>

            <Backdrop open={isMenuOpen} sx={{ 'zIndex': '5' }} onClick={handleBackdropClick} />
        </>
    );
};