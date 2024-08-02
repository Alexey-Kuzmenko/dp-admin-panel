import React, { useId } from 'react';
import { BurgerMenuIcon } from '../BurgerMenuIcon/BurgerMenuIcon';
import cn from 'classnames';
import { Backdrop, Box } from '@mui/material';
import { MenuLink } from '../MenuLink/MenuLink';
import { MenuLinkModel } from '../../types/menu-link.type';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { closeMenu } from '../../store/menuSlice';

import Logo from '../../assets/Logo.svg';
import styles from './Menu.module.scss';

interface MenuProps {
    menuLinks: Array<MenuLinkModel>
}

export const Menu: React.FC<MenuProps> = ({ menuLinks }) => {
    const dispatch = useAppDispatch();
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);

    const handleBackdropClick = (): void => {
        dispatch(closeMenu());
    };

    const renderLinks = (): JSX.Element[] => {
        return menuLinks.map((link: MenuLinkModel) => {
            return (
                <li key={useId()}>
                    <MenuLink href={link.href} label={link.label} />
                </li>
            );
        });
    };

    return (
        <>
            <div className={styles.Menu}>

                <BurgerMenuIcon type='default' />

                <nav className={cn(styles.Menu__body, {
                    [styles.Menu__body_open]: isMenuOpen === true
                })}>

                    <Box component='div'>
                        <div className={styles.Menu__controls}>
                            <img src={Logo} alt='Logo' />
                            <BurgerMenuIcon type='open' />
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