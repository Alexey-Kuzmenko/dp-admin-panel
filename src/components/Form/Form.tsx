import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';
import { Button } from '../Button/Button';
import { PASSWORD_INPUT_HELPER_TEXT } from '../../constants/constants';

import Logo from '../../assets/Logo.svg';
import styles from './Form.module.scss';

interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    title: string
    type: 'login' | 'register'
}

interface FromValues {
    email: string
    password: string
}

export const Form: React.FC<FormProps> = ({ title, type, ...props }) => {
    const {
        control,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm<FromValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    });

    const handleFromSubmit: SubmitHandler<FromValues> = ({ email, password }): void => {
        if (type === 'login') {
            // ! testing solution
            console.group('login from values');
            console.log(`email: ${email}, password: ${password}`);
            console.groupEnd();
        }

        if (type === 'register') {
            // ! testing solution
            console.group('register from values');
            console.log(`email: ${email}, password: ${password}`);
            console.groupEnd();
        }

        reset();
    };

    return (
        <form className={styles.Form} {...props} onSubmit={handleSubmit(handleFromSubmit)}>
            {/* Logo */}
            <img src={Logo} alt='logo' className={styles.Form__logo} />

            {/* Title */}
            <Typography variant='h5' component='h1' textAlign='center'>{title}</Typography>

            <div className={styles.Form__textFields}>
                {/* Email input */}
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: { value: true, message: 'This field is required' },
                        pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email' }
                    }}
                    render={({ field }) =>
                        <TextField
                            sx={{ width: '100%' }}
                            InputProps={{ disableUnderline: true }}
                            id='user-email'
                            label='Email'
                            variant='filled'
                            type='email'
                            helperText={errors.email?.message ? errors.email?.message : ''}
                            error={errors.email ? true : false}
                            {...field}
                        />
                    }
                />

                {/* Password input */}
                <Controller
                    name='password'
                    control={control}
                    rules={{
                        required: { value: true, message: 'This field is required' },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
                            message: 'Unsecure password'
                        }
                    }}
                    render={({ field }) =>
                        <TextField
                            FormHelperTextProps={{ className: styles.HelperText }}
                            sx={{ width: '100%' }}
                            InputProps={{ disableUnderline: true }}
                            id='user-password'
                            label='Password'
                            variant='filled'
                            type='password'
                            helperText={errors.password?.message ?
                                errors.password?.message : PASSWORD_INPUT_HELPER_TEXT}
                            error={errors.password ? true : false}
                            {...field}
                        />
                    }
                />
            </div>

            {/* From controls */}
            {
                type === 'register' ?
                    <Button variant='contained' type='submit' disabled={!isValid}>Create account</Button>
                    :
                    <div className={styles.Form__controls}>
                        <Button variant='outlined' type='submit' disabled={!isValid}>Login</Button>
                        <Button variant='contained' role='link' href='login/register' target='_self'>Register</Button>
                    </div>

            }
        </form>
    );
};