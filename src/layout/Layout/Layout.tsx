import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
// ! testing
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useEffect } from 'react';
import { keepSession } from '../../store/authSlice';

export const Layout = () => {
    // ! testing
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(keepSession());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    );
};