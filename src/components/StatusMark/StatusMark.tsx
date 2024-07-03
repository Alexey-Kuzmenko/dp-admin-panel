import { Typography } from '@mui/material';
import cn from 'classnames';
import { theme } from '../../theme/ThemeRegistry';
import { Mark } from '../../utils/check-status-code';

import styles from './StatusMark.module.scss';

interface StatusMarkProps {
    status: number
    mark: Mark
    label: 'api' | 'site'
    direction?: 'left' | 'right'
}

export const StatusMark: React.FC<StatusMarkProps> = ({ status, mark, label, direction = 'left' }) => {
    return (
        <div className={cn(styles.StatusMark, {
            [styles.StatusMark_reverse]: direction === 'right'
        })}>

            <div className={cn(styles.StatusMark__status, {
                [styles.StatusMark__status_error]: mark === 'serverError',
                [styles.StatusMark__status_success]: mark === 'successful'
            })}>
                <p className={cn(styles.StatusMark__statusText, {
                    [styles.StatusMark__statusText_error]: mark === 'serverError',
                    [styles.StatusMark__statusText_success]: mark === 'successful'
                })}>
                    {String(status)}
                </p>
            </div>

            <div className={styles.StatusMark__content}>
                {
                    label === 'api'
                        ?
                        <Typography variant='h5'>API status</Typography>
                        :
                        <Typography variant='h5'>Site status</Typography>
                }

                {
                    mark === 'successful'
                        ?
                        <Typography
                            textTransform='uppercase'
                            variant='h5'
                            color={theme.palette.success.main}
                            sx={{ fontWeight: 400 }}
                        >alive</Typography>
                        :
                        <Typography
                            textTransform='uppercase'
                            variant='h5'
                            color={theme.palette.error.main}
                            sx={{ fontWeight: 400 }}
                        >down</Typography>
                }
            </div>

        </div>
    );
};
