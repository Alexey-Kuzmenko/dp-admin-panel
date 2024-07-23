import styles from './Button.module.scss';

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'contained' | 'outlined' | 'text'
    role?: 'button' | 'link'
    href?: string
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'contained', role = 'button', href, ...props }) => {
    return (
        <button {...props} className={cn(styles.Button, {
            [styles.Button_contained]: variant === 'contained',
            [styles.Button_outlined]: variant === 'outlined',
            [styles.Button_text]: variant === 'text',
        })}>
            {role === 'link' && href ? <Link to={href} target='_blank' >{children}</Link> : children}
        </button >
    );
};