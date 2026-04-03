import cn from 'classnames';

import { ServiceStatusWidgetContent } from './components/ServiceStatusWidgetContent';
import { CheckServiceStatus } from '../../hooks/useCheckServiceStatus';

import styles from './ServiceStatusWidget.module.scss';

export type ServiceStatusWidgetLabel = 'api' | 'site';
type ServiceStatusWidgetDirection = 'left' | 'right';

interface Props {
    status: CheckServiceStatus
    label: ServiceStatusWidgetLabel
    direction?: ServiceStatusWidgetDirection
}

export const ServiceStatusWidget: React.FC<Props> = ({ status, label, direction = 'left' }) => {

    return (
        <div className={cn(styles.ServiceStatusWidget, {
            [styles.ServiceStatusWidget_reverse]: direction === 'right'
        })}>
            <ServiceStatusWidgetContent status={status} label={label} />
        </div>
    );
};
