import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { CopyFiled, Alert } from '../../components';
import { AlertState } from '../../types/alert-state.type';
import { ALERT_COPY_MSG } from '../../constants/constants';
import { Link } from 'react-router-dom';

import styles from './UserProfile.module.scss';

// * temporary data
const userData = {
    userEmail: 'example@gmail.com',
    passwordHash: '12ddfj23r0dasfcses213',
    jwtToken: 'Token'
};

export const UserProfile: React.FC = () => {
    const [alertState, setAlertState] = useState<AlertState>({ type: 'info', message: ALERT_COPY_MSG, isOpen: false });

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
                                value={userData.userEmail}
                                alertState={alertState}
                                setAlertState={setAlertState}
                            />
                        </div>

                        <div className={styles.UserProfile__dataItem}>
                            <Typography component='h1' variant='h5' sx={{ marginBottom: '20px' }}>
                                User password hash
                            </Typography>
                            <CopyFiled
                                value={userData.passwordHash}
                                alertState={alertState}
                                setAlertState={setAlertState}
                            />
                        </div>

                        <div className={styles.UserProfile__dataItem}>
                            <Typography component='h1' variant='h5' sx={{ marginBottom: '20px' }}>
                                JWT token
                            </Typography>
                            <CopyFiled
                                value={userData.jwtToken}
                                alertState={alertState}
                                setAlertState={setAlertState}
                            />
                        </div>

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