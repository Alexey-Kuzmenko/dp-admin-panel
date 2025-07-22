import { Container } from '../Container/Container';
import styles from './Main.module.scss';

interface MainProps {
    children: React.ReactNode | React.ReactNode[]
    customClassName?: string
}

export const Main: React.FC<MainProps> = ({ children, customClassName }) => {
    const stylesClass = customClassName || styles.Main;

    return (
        <main className={stylesClass}>
            <Container>
                {children}
            </Container>
        </main>
    );
};