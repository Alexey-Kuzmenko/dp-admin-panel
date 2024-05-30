import { Container } from '../Container/Container';
import styles from './Main.module.scss';

interface MainProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className={styles.Main}>
            <Container>
                {children}
            </Container>
        </main>
    );
};
