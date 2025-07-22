import { DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';

import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TextField, Typography, InputAdornment } from '@mui/material';
import { Button } from '../Button/Button';
import { EyeIconButton } from './EyeIconButton/EyeIconButton';

import extractSecrets from '../../utils/extractSecrets';
import { PASSWORD_INPUT_HELPER_TEXT, SECRET_INPUT_HELPER_TEXT } from '../../constants/constants';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { login, register } from '../../store/authSlice';

import Logo from '../../assets/Logo.svg';
import styles from './Form.module.scss';

interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    title: string
    type: 'login' | 'register'
}

interface FromValues {
    email: string
    password: string
    secret: string
}

const secrets = extractSecrets(import.meta.env.VITE_SECRET_WORDS);

export const Form: React.FC<FormProps> = ({ title, type, ...props }) => {
    const [showSecret, setShowSecret] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const {
        control,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
        getValues
    } = useForm<FromValues>({
        defaultValues: {
            email: '',
            password: '',
            secret: ''
        },
        mode: 'onBlur'
    });

    const handleFromSubmit: SubmitHandler<FromValues> = ({ email, password }): void => {
        if (type === 'login') {
            dispatch(login({ email, password }));
            setShowPassword(false);
        }

        if (type === 'register') {
            dispatch(register({ email, password }));
            setShowSecret(false);
        }

        reset();
    };

    const handleShowSecretClick = (): void => {
        setShowSecret((show) => !show);
    };

    const handleShowPasswordClick = (): void => {
        setShowPassword((show) => !show);
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
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <EyeIconButton
                                            isValueShown={showPassword}
                                            ariaLabelValues={{
                                                shown: 'hide the password',
                                                hidden: 'display the password'
                                            }}
                                            onClick={handleShowPasswordClick} />
                                    </InputAdornment>
                                )
                            }}
                            id='user-password'
                            label='Password'
                            variant='filled'
                            type={showPassword ? 'text' : 'password'}
                            helperText={errors.password?.message ?
                                errors.password?.message : PASSWORD_INPUT_HELPER_TEXT}
                            error={errors.password ? true : false}
                            {...field}
                        />
                    }
                />

                {/* Secret word input */}
                {
                    type === 'register' ?
                        <Controller
                            name='secret'
                            control={control}
                            rules={{
                                required: { value: true, message: 'This field is required' },
                                validate: () => {
                                    return secrets.includes(getValues('secret'));
                                }
                            }}
                            render={({ field }) =>
                                <TextField
                                    FormHelperTextProps={{ className: styles.HelperText }}
                                    sx={{ width: '100%' }}
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <EyeIconButton
                                                    isValueShown={showSecret}
                                                    ariaLabelValues={{
                                                        shown: 'hide the secret',
                                                        hidden: 'display the secret'
                                                    }}
                                                    onClick={handleShowSecretClick} />
                                            </InputAdornment>
                                        )
                                    }}
                                    id='secret-word'
                                    label='Secret word'
                                    variant='filled'
                                    type={showSecret ? 'text' : 'password'}
                                    helperText={errors.secret?.message ?
                                        errors.secret?.message : SECRET_INPUT_HELPER_TEXT}
                                    error={errors.secret ? true : false}
                                    {...field}
                                />
                            }
                        />
                        :
                        null
                }
            </div>

            {/* From controls */}
            {
                type === 'register' ?
                    <Button variant='contained' type='submit' disabled={!isValid}>Create account</Button>
                    :
                    <div className={styles.Form__controls}>
                        <Button variant='outlined' type='submit' disabled={!isValid}>Login</Button>
                        <Button variant='contained' role='link' href='/auth/register' target='_self'>Register</Button>
                    </div>
            }
        </form>
    );
};