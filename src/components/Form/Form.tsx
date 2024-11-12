import { DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';

import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';

import { theme } from '../../theme/ThemeRegistry';
import { IconButton, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '../Button/Button';

import extractSecrets from '../../utils/extractSecrets';
import { PASSWORD_INPUT_HELPER_TEXT, SECRET_INPUT_HELPER_TEXT } from '../../constants/constants';

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
const { palette } = theme;

export const Form: React.FC<FormProps> = ({ title, type, ...props }) => {
    const [showSecret, setShowSecret] = useState<boolean>(false);

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

    const handleFromSubmit: SubmitHandler<FromValues> = ({ email, password, secret }): void => {
        if (type === 'login') {
            // ! temporary solution
            console.group('login from values');
            console.log(`email: ${email}, password: ${password}`);
            console.groupEnd();
        }

        if (type === 'register') {
            // ! temporary solution
            console.group('register from values');
            console.log(`email: ${email}, password: ${password}, secret: ${secret}`);
            console.groupEnd();
        }

        reset();
        setShowSecret(false);
    };

    const handleShowSecretClick = (): void => {
        setShowSecret((show) => !show);
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
                                <div className={styles.Form__inputWrapper}>
                                    <TextField
                                        FormHelperTextProps={{ className: styles.HelperText }}
                                        sx={{ width: '100%' }}
                                        InputProps={{ disableUnderline: true }}
                                        id='secret-word'
                                        label='Secret word'
                                        variant='filled'
                                        type={showSecret ? 'text' : 'password'}
                                        helperText={errors.secret?.message ?
                                            errors.secret?.message : SECRET_INPUT_HELPER_TEXT}
                                        error={errors.secret ? true : false}
                                        {...field}
                                    />
                                    <IconButton
                                        aria-label={showSecret ? 'hide the secret' : 'display the secret'}
                                        onClick={handleShowSecretClick}
                                    >
                                        {
                                            showSecret ?
                                                <VisibilityOffIcon sx={{ color: palette.primary.contrastText }} />
                                                :
                                                <VisibilityIcon sx={{ color: palette.primary.contrastText }} />
                                        }
                                    </IconButton>
                                </div>
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
                        <Button variant='contained' role='link' href='login/register' target='_self'>Register</Button>
                    </div>

            }
        </form>
    );
};