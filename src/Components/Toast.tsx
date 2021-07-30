import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

interface Props {
	show: boolean;
	message: string;
	variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

const Toast: React.FC<Props> = ({ show, message, variant }) => {
	return (
		<Fade in={show}>
			<div className='position-absolute' style={{ top: '30px', right: '30px' }}>
				<Alert variant={variant} show={show}>
					{message}
				</Alert>
			</div>
		</Fade>
	);
};

export default Toast;
