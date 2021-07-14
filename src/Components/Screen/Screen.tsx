import React from 'react';
// import s from './Screen.module.css';
import Container from 'react-bootstrap/Container';

import Navy from '../NavBar/NavBar';

const Screen: React.FC = ({ children }) => {
    return (
        <>
            <Container fluid>
                <Navy />
                {children}
            </Container>
        </>
    );
};

export default Screen;
