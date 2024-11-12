import { AlertState, AlertType } from '../types/alert-state.type';

type SetAlertState = (state: AlertState) => void;

export default function hideAlertAutomatically(
    type: AlertType,
    state: AlertState,
    setState: SetAlertState,
    timeout = 3_000
): void {
    setTimeout(() => {
        setState({
            ...state,
            type,
            isOpen: false
        });
    }, timeout);
}