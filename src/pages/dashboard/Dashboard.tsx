import { ServiceStatusWidget } from '../../components';
import { useCheckServiceStatus } from '../../hooks/useCheckServiceStatus';
import styles from './Dashboard.module.scss';

const SWAGGER_DOCS_URL = import.meta.env.VITE_SWAGGER_DOCS;
const API_URL = import.meta.env.VITE_API_URL;
const PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_URL;
const PORTFOLIO_REQUEST_CONFIG: RequestInit = { headers: { 'x-app-status-check': 'true' } };

export const Dashboard: React.FC = () => {
    const apiStatus = useCheckServiceStatus(API_URL);
    const websiteStatus = useCheckServiceStatus(`${PORTFOLIO_URL}/app-status`, PORTFOLIO_REQUEST_CONFIG);

    return (
        <div className={styles.Dashboard}>
            <div className={styles.Dashboard__statusMarks}>
                <ServiceStatusWidget label='api' status={apiStatus} />
                <ServiceStatusWidget label='site' status={websiteStatus} direction='right' />
            </div>

            <iframe src={SWAGGER_DOCS_URL} className={styles.Dashboard__iframe}></iframe>
        </div>
    );
};
