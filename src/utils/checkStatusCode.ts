export type Mark = 'serverError' | 'successful';

export default function checkStatusCode(statusCode: number): Mark {
    const serverErrors: Array<number> = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

    if (serverErrors.includes(statusCode) && Math.floor(statusCode / 100) !== 2) {
        return 'serverError';
    } else {
        return 'successful';
    }
}