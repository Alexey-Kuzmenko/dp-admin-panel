import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { CopyFiled, Alert } from '../../components';
import { AlertState } from '../../types/alert-state.type';
import { ALERT_COPY_MSG } from '../../constants';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux-hooks';
import { selectJwtToken, selectUserEmail } from '../../store/authSlice';

import styles from './UserProfile.module.scss';

export const UserProfile: React.FC = () => {
    const [alertState, setAlertState] = useState<AlertState>({ type: 'info', message: ALERT_COPY_MSG, isOpen: false });
    const email = useAppSelector(selectUserEmail);
    const token = useAppSelector(selectJwtToken);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlertState({ ...alertState, isOpen: false });
        }, 4_000);

        return () => clearTimeout(timeout);
    }, [alertState]);

    const handleAlertClose = (): void => {
        setAlertState({ ...alertState, isOpen: false });
    };

    return (
        <>
            <div className={styles.UserProfile}>
                <div className={styles.UserProfile__dataBox}>

                    <div className={styles.UserProfile__dataGroup}>
                        <div className={styles.UserProfile__dataItem}>
                            <Typography component='h1' variant='h5' sx={{ marginBottom: '20px' }}>
                                User email
                            </Typography>
                            <CopyFiled
                                value={email}
                                alertState={alertState}
                                setAlertState={setAlertState}
                            />
                        </div>

                        {
                            token && (
                                <div className={styles.UserProfile__dataItem}>
                                    <Typography component='h1' variant='h5' sx={{ marginBottom: '20px' }}>
                                        JWT token
                                    </Typography>
                                    <CopyFiled
                                        value={token}
                                        alertState={alertState}
                                        setAlertState={setAlertState}
                                    />
                                </div>
                            )
                        }

                        <Link to='/logout' className={styles.UserProfile__logoutBtn}>Logout</Link>
                    </div>

                </div>
            </div>

            <Alert
                {...alertState}
                onClose={handleAlertClose}
            />
        </>
    );
};
