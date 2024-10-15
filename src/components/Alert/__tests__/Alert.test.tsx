import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert, AlertProps } from '../Alert';

const alertProps: AlertProps = {
    onClose: jest.fn(),
    type: 'success',
    isOpen: true,
    message: 'Test'
};

describe('Alert component', () => {
    it('component should renders', () => {
        render(<Alert {...alertProps} />);

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('component snapshot', () => {
        const alert = render(<Alert {...alertProps} />);

        expect(alert).toMatchSnapshot();
    });

    it('onClose handler should works', async () => {
        const user = userEvent.setup();
        render(<Alert {...alertProps} />);

        await user.click(screen.getByRole('button'));
        expect(alertProps.onClose).toHaveBeenCalled();
    });

    it('dynamic styles should be success', () => {
        render(<Alert {...alertProps} />);
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-colorSuccess');
    });

    it('dynamic styles should be warning', () => {
        render(
            <Alert
                onClose={alertProps.onClose}
                isOpen={alertProps.isOpen}
                message={alertProps.message}
                type='warning'
            />
        );

        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-colorWarning');
    });
});