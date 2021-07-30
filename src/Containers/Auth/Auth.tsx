import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from '../../Components/Toast';

import { useHistory } from 'react-router-dom';

import { socket } from '../../Config/URL';

import { AuthContext } from './authcontext';

interface UserData {
	userName: string;
	employeeID: string;
	authIDs: number[];
}

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const auth = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false);
			}, 5000);
		}
	}, [error]);

	useEffect(() => {
		socket.on('USER_ACCEPTED', (data: UserData) => {
			console.log(data);
			const { userName, employeeID, authIDs } = data;
			auth.login(userName, employeeID, authIDs);
			history.push('/');
		});

		socket.on('USER_REJECTED', (data) => {
			setError(true);
			setPassword('');
		});

		return () => {
			socket.off('USER_ACCEPTED');
			socket.off('USER_REJECTED');
		};
	}, [history, auth]);

	const reconnectAttempt = () => {
		if (socket.disconnected) {
			socket.connect();
		}
	};

	return (
		<Container
			fluid
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ height: '100vh' }}
		>
			<Toast show={error} message='Your email or password was incorrect' variant='danger' />
			<h1>Accounting n' Shit</h1>
			<Form
				style={{ width: '50%' }}
				onSubmit={(e) => {
					e.preventDefault();
					socket.emit('LOG_IN_USER', { email: email, password: password });
				}}
				onMouseEnter={reconnectAttempt}
			>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Stay logged In' />
				</Form.Group>
				<Button variant='outline-info' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Auth;
