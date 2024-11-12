import { Main } from '../../../layout';
import { Form } from '../../../components';

export const Register: React.FC = () => {
    return (
        <Main>
            <Form title='Create new account' type='register' id='register-form' />
        </Main>
    );
};