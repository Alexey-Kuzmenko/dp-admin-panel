import { Typography } from '@mui/material';
import cn from 'classnames';

import { ServiceStatusWidgetLabel } from '../ServiceStatusWidget';
import { CheckServiceStatus } from '../../../hooks/useCheckServiceStatus';
import { theme } from '../../../theme/ThemeRegistry';
import { SERVICE_STATUS_WIDGET_ERROR_TEMPLATE } from '../../../constants';

import styles from './ServiceStatusWidgetContent.module.scss';

interface Props {
    status: CheckServiceStatus
    label: ServiceStatusWidgetLabel
}

export const ServiceStatusWidgetContent: React.FC<Props> = ({
    status: { statusCode, serviceStatus, error },
    label }
) => {

    if (serviceStatus === 'loading') {
        return (
            <Typography variant='h5'>Widget is loading...</Typography>
        );
    }

    if (error) {
        return (
            <Typography variant='h5' textAlign='center'>
                {`${SERVICE_STATUS_WIDGET_ERROR_TEMPLATE} ${error}`}
            </Typography>
        );
    }

    if (!statusCode) {
        return (
            <Typography variant='h5'>N/A</Typography>
        );
    }

    return (
        <>
            <div className={cn(styles.Status, {
                [styles.Status_error]: serviceStatus === 'unavailable',
                [styles.Status_success]: serviceStatus === 'available'
            })}>
                <p className={cn(styles.Status__text, {
                    [styles.Status__text_error]: serviceStatus === 'unavailable',
                    [styles.Status__text_success]: serviceStatus === 'available'
                })}>
                    {String(statusCode)}
                </p>
            </div>

            <div className={styles.StatusContent}>
                {
                    label === 'api'
                        ?
                        <Typography variant='h5' sx={{ cursor: 'default' }}>API status</Typography>
                        :
                        <Typography variant='h5' sx={{ cursor: 'default' }}>Site status</Typography>
                }

                {
                    serviceStatus === 'available'
                    &&
                    <Typography
                        textTransform='uppercase'
                        variant='h5'
                        color={theme.palette.success.main}
                        sx={{ fontWeight: 400, cursor: 'default' }}
                    >
                        {serviceStatus}
                    </Typography>
                }
                {
                    serviceStatus === 'unavailable'
                    &&
                    <Typography
                        textTransform='uppercase'
                        variant='h5'
                        color={theme.palette.error.main}
                        sx={{ fontWeight: 400, cursor: 'default' }}
                    >
                        {serviceStatus}
                    </Typography>
                }
            </div>
        </>

    );
};
