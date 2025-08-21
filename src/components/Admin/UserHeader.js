import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../../redux/store';
import { doLogout } from '../../redux/action/userAction';
import default_avatar from '../../assets/default-avatar.png'
import { useEffect } from 'react';
const AdminHeader = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const dispatch = useDispatch()
    const account = useSelector(state => state.user.account);


    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    const handleLogout = async () => {
        dispatch(doLogout());
        await persistor.purge();
        navigate('/')

    }
    const handleSwitchUser = () => {
         navigate('/user/quiz');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='manager-user' className='navbar-brand'>QUIZZZZ</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='manager-user' className='nav-link'>Manager User</NavLink>
                        <NavLink to='manager-quiz' className='nav-link'>Manager Quiz</NavLink> */}

                    </Nav>

                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => { handleLogin() }}>Log in</button>
                                <button className='btn-signup' onClick={() => { handleRegister() }}> Sign up </button>
                            </>
                            :

                            <NavDropdown
                                className="dropdown-center"
                                title={
                                    < img className='avatar rounded-circle'
                                        src={account?.image
                                            ? `data:image/jpeg;base64,${account.image}`
                                            : default_avatar
                                        }
                                        alt='avatar'


                                    />
                                }
                                id="basic-nav-dropdown">
                                <NavDropdown.Header>
                                    <div><strong>{account.username}</strong></div>
                                    <div style={{ fontSize: '0.85rem', color: '#555' }}>{account.email}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#999' }}>Role: {account.role}</div>
                                </NavDropdown.Header>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleSwitchUser}>Switch: User</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>

                            </NavDropdown>

                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default AdminHeader;
// import Alert from 'react-bootstrap/Alert';

// const Header = () => {
//   return (
//     <>
//       {[
//         'primary',
//         'secondary',
//         'success',
//         'danger',
//         'warning',
//         'info',
//         'light',
//         'dark',
//       ].map((variant) => (
//         <Alert key={variant} variant={variant}>
//           This is a {variant} alert—check it out!
//         </Alert>
//       ))}
//     </>
//   );
// }

// export default Header;