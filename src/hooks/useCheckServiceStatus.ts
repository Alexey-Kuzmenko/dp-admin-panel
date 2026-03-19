import { useEffect, useState } from 'react';

import { ServiceStatus } from '../types';
import { SERVICE_STATUS_CHECK_ERROR } from '../constants';

export interface CheckServiceStatus {
    statusCode: null | number
    serviceStatus: ServiceStatus | null
    error: null | string
}

export const useCheckServiceStatus = (url: string, requestConfig?: RequestInit): CheckServiceStatus => {
    const [statusCode, setStatusCode] = useState<null | number>(null);
    const [serviceStatus, setServiceStatus] = useState<null | ServiceStatus>(null);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                setServiceStatus('loading');

                const response = await fetch(url, {
                    method: 'GET',
                    ...requestConfig
                });

                setStatusCode(response.status);
                setServiceStatus(response.ok ? 'available' : 'unavailable');
            } catch (error) {
                setServiceStatus('unavailable');

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(SERVICE_STATUS_CHECK_ERROR);
                }
            }
        };

        checkStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return {
        statusCode,
        serviceStatus,
        error
    };
};
