import { render, screen } from '@testing-library/react';

import { Alert, AlertProps } from '../Alert';

const alertProps: AlertProps = {
    onClose: jest.fn(),
    type: 'success',
    isOpen: true,
    message: 'Test'
};

describe('Alert component', () => {
    it('Alert component renders', () => {
        render(<Alert {...alertProps} />);

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('Alert snapshot', () => {
        const alert = render(<Alert {...alertProps} />);

        expect(alert).toMatchSnapshot();
    });
});