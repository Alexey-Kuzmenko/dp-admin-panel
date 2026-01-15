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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Navigate to='/' replace />
    );
};
