import { Alert, Form, Loader } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { selectError, selectLoading, resetResponseError } from '../../store/authSlice';

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const { exists, message } = useAppSelector(selectError);

    const handleAlertClose = (): void => {
        dispatch(resetResponseError());
    };

    return (
        <>
            <Form title='Login into app' type='login' id='login-form' name='login-form' />

            {/* Alert */}
            <Alert
                type='error'
                message={message ? message : ''}
                isOpen={exists ? true : false}
                onClose={handleAlertClose}
            />

            {/* Loader */}
            {loading ? <Loader /> : null}
        </>
    );
};
