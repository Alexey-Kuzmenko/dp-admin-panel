import { StatusMark } from '../../components';
import checkStatusCode from '../../utils/check-status-code';


export const Dashboard = () => {
    // ! testing
    const test = checkStatusCode(207);
    console.log(test);

    return (
        <>
            <StatusMark label='api' status={200} mark='successful' />
            <StatusMark label='site' status={500} mark='serverError' direction='right' />
        </>
    );
};
