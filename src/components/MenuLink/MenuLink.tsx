import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.scss';
import { MenuLinkModel } from '../../types/menu-link.type';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { closeMenu } from '../../store/menuSlice';

interface MenuLinkProps extends MenuLinkModel { }

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