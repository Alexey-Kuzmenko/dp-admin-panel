import { AlertState } from '../types';

type SetAlertState = (state: AlertState) => void;

export default function hideAlertAutomatically(
    state: AlertState,
    setState: SetAlertState,
    timeout = 3_000
): void {
    setTimeout(() => {
        setState({
            ...state,
            isOpen: false
        });
    }, timeout);
}
