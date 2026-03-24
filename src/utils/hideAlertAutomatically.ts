// ! Refactor this code
import { AlertState, AlertType } from '../types';

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
