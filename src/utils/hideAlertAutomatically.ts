import { AlertState } from '../types';

export default function hideAlertAutomatically(
    setState: React.Dispatch<React.SetStateAction<AlertState>>,
    timeout = 3_000
): void {
    setTimeout(() => {
        setState((currentSate) => ({
            ...currentSate,
            isOpen: false
        }));
    }, timeout);
}
