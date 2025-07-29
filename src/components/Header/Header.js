import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router';
import { useSelector , useDispatch} from 'react-redux';
import { persistor } from '../../redux/store';
import { doLogout } from '../../redux/action/userAction';
import default_avatar from './default-avatar.png'
const Header = () => {
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
    const handleLogout = async() => {
        dispatch(doLogout());
        await persistor.purge(); 
        navigate('/')
        
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='/' className='navbar-brand'>QUIZZZZ</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/user' className='nav-link'>User</NavLink>
                        <NavLink to='/admin' className='nav-link'>Admin</NavLink>

                    </Nav>

                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => { handleLogin() }}>Log in</button>
                                <button className='btn-signup' onClick={() => { handleRegister() }}> Sign up </button>
                            </>
                            :

                            <NavDropdown
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
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item
                                onClick={()=>{handleLogout()}}>Log out</NavDropdown.Item>
                            </NavDropdown>

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;
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