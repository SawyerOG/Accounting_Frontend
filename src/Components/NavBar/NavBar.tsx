import React, { memo } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

import UserInfo from './UserInfo';

const Navy = memo(() => {
    return (
        <Navbar expand='lg'>
            <Navbar.Brand>A Clever Name</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav justify className='mr-auto' variant='pills'>
                    <Nav.Link as={NavLink} to='/' exact>
                        Reports
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/uploads'>
                        Uploads
                    </Nav.Link>
                    <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Item>Another action</NavDropdown.Item>
                        <NavDropdown.Item>Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <UserInfo />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
});

export default Navy;
