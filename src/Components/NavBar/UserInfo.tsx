import React, { useContext, memo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import s from './UserInfo.module.css';
import { ReactComponent as Avatar } from '../../Components/images/account.svg';

import { AuthContext } from '../../Containers/Auth/authcontext';
// import { socket } from '../../Config/URL';

const UserInfo: React.FC = memo(() => {
    const auth = useContext(AuthContext);

    // const [activeUsers, setActiveUsers] = useState(0);

    // socket.on('UPDATE_USER_COUNT', (data: { data: number }) => {
    //     console.log(data);
    //     setActiveUsers(data.data);
    // });

    // useEffect(() => {
    //     console.log(socket.connected);
    //     console.log(socket.id);
    // }, []);

    return (
        <Container>
            <Row>
                <Col lg='auto'>
                    <OverlayTrigger
                        placement='bottom'
                        trigger='click'
                        overlay={
                            <Popover id={'left'}>
                                <Popover.Title as='h3'>
                                    <strong>{auth.authName}</strong>
                                </Popover.Title>
                                <Popover.Content>
                                    <p>Some pertinent info about the user</p>
                                    <p>Some pertinent info about the user</p>
                                    <p>Some pertinent info about the user</p>
                                    <Button variant='secondary' onClick={() => auth.logout()}>
                                        Log Out
                                    </Button>
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <Avatar className={s.Avatar} />
                    </OverlayTrigger>
                </Col>
                <Col>
                    <i className='bi bi-cloud-lightning-rain-fill'></i>
                    <span className='position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle'>
                        {/* <span className='visually-hidden'>New alerts</span> */}
                    </span>
                </Col>
            </Row>
        </Container>
    );
});

export default UserInfo;
