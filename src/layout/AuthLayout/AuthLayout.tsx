import { Navigate, Outlet } from 'react-router-dom';
import { Main } from '../Main/Main';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectJwtToken } from '../../store/authSlice';

import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => {
    const token = useAppSelector(selectJwtToken);

    if (token) {
        return <Navigate to='/' replace />;
    }

    return (
        <Main customClassName={styles.AuthLayoutMain}>
            <Outlet />
        </Main>
    );
};