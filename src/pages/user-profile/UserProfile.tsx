import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { CopyFiled, Alert, Button } from '../../components';
import { AlertState } from '../../types/alert-state.type';
import { ALERT_COPY_MSG } from '../../constants/constants';

import styles from './UserProfile.module.scss';

// * temporary data
const userData = {
    userEmail: 'example@gmail.com',
    passwordHash: '12ddfj23r0dasfcses213',
    jwtToken: 'Token'
};

export const UserProfile = () => {
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
                        <Button variant='text' role='link' href='/'>Logout</Button>
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