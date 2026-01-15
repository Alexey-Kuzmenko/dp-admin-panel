import { render, screen } from '@testing-library/react';

import { Form, FormProps } from '../Form';
import { BrowserRouter } from 'react-router-dom';

const loginFormProps: FormProps = {
    title: 'Login into app',
    type: 'login',
    id: 'login-form',
    name: 'login-form'
};

const registerFormProps: FormProps = {
    title: 'Create new account',
    type: 'register',
    id: 'register-form',
    name: 'register-form'
};

describe('Login form component', () => {
    it('should renders Form component', () => {
        render(

            <BrowserRouter>
                <Form {...loginFormProps} />
            </BrowserRouter>
        );

        const form = screen.getByRole('form');

        expect(form).toBeInTheDocument();
        expect(screen.getByText('Login into app')).toBeInTheDocument();
        expect(form).toHaveAttribute('id', loginFormProps.id);
        expect(form).toHaveAttribute('name', loginFormProps.name);
    });

    it('should contain styles class', () => {
        render(
            <BrowserRouter>
                <Form {...loginFormProps} />
            </BrowserRouter>
        );

        expect(screen.getByRole('form')).toHaveClass('Form');
    });

    it('should have default values for inputs', () => {
        render(
            <BrowserRouter>
                <Form {...loginFormProps} />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
    });

    it('should have disabled attribute for submit button', () => {
        render(
            <BrowserRouter>
                <Form {...loginFormProps} />
            </BrowserRouter>
        );

        const button = screen.getByText('Login');

        expect(button).toHaveAttribute('disabled', '');
    });
});

describe('Register form component', () => {
    it('should renders Form component', () => {
        render(

            <BrowserRouter>
                <Form {...registerFormProps} />
            </BrowserRouter>
        );

        const form = screen.getByRole('form');

        expect(form).toBeInTheDocument();
        expect(screen.getByText('Create new account')).toBeInTheDocument();
        expect(form).toHaveAttribute('id', registerFormProps.id);
        expect(form).toHaveAttribute('name', registerFormProps.name);
    });

    it('should contain styles class', () => {
        render(
            <BrowserRouter>
                <Form {...registerFormProps} />
            </BrowserRouter>
        );

        expect(screen.getByRole('form')).toHaveClass('Form');
    });

    it('should have default values for inputs', () => {
        render(
            <BrowserRouter>
                <Form {...registerFormProps} />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const secretInput = screen.getByLabelText('Secret word');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(secretInput).toHaveValue('');
    });

    it('should have disabled attribute for submit button', () => {
        render(
            <BrowserRouter>
                <Form {...registerFormProps} />
            </BrowserRouter>
        );

        const button = screen.getByText('Create account');

        expect(button).toHaveAttribute('disabled', '');
    });
});
