import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.scss';
import { MenuLinkModel } from '../../models/menu-link.model';
import React from 'react';

interface MenuLinkProps extends MenuLinkModel {
    setIsMenuOpen: (state: boolean) => void
}

export const MenuLink: React.FC<MenuLinkProps> = ({ href, label, setIsMenuOpen }) => {

    const handleClick = (): void => {
        setIsMenuOpen(false);
    };

    return (
        <NavLink
            onClick={handleClick}
            className={({ isActive }) =>
                isActive ? `${styles.MenuLink} ${styles.MenuLink_active}` : `${styles.MenuLink}`}
            to={href}>{label}
        </NavLink>
    );
};