import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

import { useHistory } from 'react-router-dom';

import { socket } from '../../Config/URL';

import { AuthContext } from './authcontext';

interface UserData {
    userName: string;
    employeeID: string;
    authIDs: number[];
}

const Auth = () => {
    const [userName, setUserName] = useState('');
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
        socket.on('USER_ACCEPTED', (data) => {
            const parsedData: UserData = JSON.parse(data);
            const { userName, employeeID, authIDs } = parsedData;
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
            <Fade in={error}>
                <div className='position-absolute' style={{ top: '30px', right: '30px' }}>
                    <Alert variant='danger' show={error}>
                        Your email or password was incorrect
                    </Alert>
                </div>
            </Fade>
            <h1>Accounting n' Shit</h1>
            <Form
                style={{ width: '50%' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    socket.emit('LOG_IN_USER', { userName: userName, password: password });
                }}
                onMouseEnter={reconnectAttempt}
            >
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
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
