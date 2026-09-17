import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { logout } from '../../store/authSlice';
import { closeMenu } from '../../store/menuSlice';

export const Logout: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logout());
        dispatch(closeMenu());
    }, [dispatch]);

    return (
        <Navigate to='/' replace />
    );
};
