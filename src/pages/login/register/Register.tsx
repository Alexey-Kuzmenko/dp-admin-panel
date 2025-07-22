import { Alert, Form, Loader } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { resetResponseError, selectError, selectLoading } from '../../../store/authSlice';

export const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const { exists, message } = useAppSelector(selectError);

    const handleAlertClose = (): void => {
        dispatch(resetResponseError());
    };

    return (
        <>
            <Form title='Create new account' type='register' id='register-form' name='register-form' />

            {/* Alert */}
            <Alert
                type='error'
                message={message ? message : ''}
                isOpen={exists ? true : false}
                onClose={handleAlertClose}
            />
            {/* Loading */}
            {loading ? <Loader /> : null}
        </>
    );
};