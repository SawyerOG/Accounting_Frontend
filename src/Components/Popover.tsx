import React, { ReactElement, JSXElementConstructor } from 'react';
import { Placement } from 'react-bootstrap/esm/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface Props {
    /**'top' |'botton' |'left' |'right'; */
    direction: Placement;
    /**number in milliseconds */
    delay: number;
    tooltipText: string;
    reportName: string;
    button: ReactElement<any, string | JSXElementConstructor<any>>;
}

const Popover: React.FC<Props> = ({ direction, delay, tooltipText, reportName, button }) => {
    return (
        <OverlayTrigger
            placement={direction}
            delay={{ show: delay, hide: 0 }}
            overlay={<Tooltip id={reportName}>{tooltipText}</Tooltip>}
        >
            {button}
        </OverlayTrigger>
    );
};

export default Popover;
