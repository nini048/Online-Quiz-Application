import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
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
                        <button
                            className='btn-login'
                            onClick={() => {handleLogin()}}
                        >
                            Log in
                        </button>
                        <button
                            className='btn-signup'
                            onClick={()=>{handleRegister()}}
                        >
                            Sign up
                        </button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Log in</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>

                        </NavDropdown> */}
                        

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
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