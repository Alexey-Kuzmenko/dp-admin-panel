import React from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className={styles.Container}>
            {children}
        </div>
    );
};