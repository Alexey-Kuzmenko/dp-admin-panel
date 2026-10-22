import { NavLink } from 'react-router';
import styles from './MenuLink.module.scss';
import { MenuLink as MenuLinkProps } from '@alexey-kuzmenko/ok-apps-sdk';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { closeMenu } from '../../store/menuSlice';

export const MenuLink: React.FC<MenuLinkProps> = ({ href, label }) => {
    const dispatch = useAppDispatch();

    const handleClick = (): void => {
        dispatch(closeMenu());
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
