import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router';
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
         setIsLoading(true);
        let data = await postRegister(email, username, password);
        console.log('data: ', data);
        if (data && data.EC === 0) {
            toast.success('Success!');
             setIsLoading(false);
            navigate('/')

        } else
            if (data && +data.EC !== 0) {
                toast.error(data.EM);
                 setIsLoading(false);
            }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);

    }

    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account?</span>
                <button onClick={() => { navigate('/login') }}>Log in</button>
            </div>
            <div className='register-content'>
                <div className="title col-2 mx-auto fw-bold">
                    SIGN UP
                </div>

                <div className="content-form col-2 mx-auto">

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type={"text"}
                            className='form-control'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type={"email"}
                            className='form-control'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-password">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <span onClick={() => handleShowPassword()}>
                                {!showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>






                    </div>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => { handleRegister() }}
                            disabled = {isLoading}
                        >
                            {isLoading && <AiOutlineLoading3Quarters className='loader-icon' /> }
                            <span>Sign up</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <span
                            className='back'
                            onClick={() => { navigate('/') }}
                        >

                            &#60;&#60; Go to Homepage
                        </span>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Register