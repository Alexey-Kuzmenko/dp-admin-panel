import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectJwtToken } from '../../store/authSlice';

export const ProtectedLayout: React.FC = () => {
    const token = useAppSelector(selectJwtToken);

    if (!token) {
        return <Navigate to='/auth/login' replace />;
    }

    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    );
};