import { StatusMark } from '../../components';
import checkStatusCode from '../../utils/checkStatusCode';

import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    const swaggerDocsUrl = import.meta.env.VITE_SWAGGER_DOCS;
    // ! testing
    const test = checkStatusCode(207);
    console.log(test);

    return (
        <div className={styles.Dashboard}>
            <div className={styles.Dashboard__statusMarks}>
                <StatusMark label='api' status={200} mark='successful' />
                <StatusMark label='site' status={200} mark='successful' direction='right' />
            </div>

            <iframe src={swaggerDocsUrl} className={styles.Dashboard__iframe}></iframe>

        </div>
    );
};
