import { Form } from '../../components';
import { Main } from '../../layout';

export const Login: React.FC = () => {
    return (
        <Main>
            <Form title='Login into app' type='login' id='login-form' name='login-form' />
        </Main>
    );
};