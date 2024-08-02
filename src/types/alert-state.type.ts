export type AlertType = 'error' | 'warning' | 'info' | 'success';

export interface AlertState {
    type: AlertType
    message: string
    isOpen: boolean
}