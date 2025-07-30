import { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
// import { doLogin } from '../../redux/reducer/userReducer';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account);

    useEffect(() => {
        if (account?.role) {
            if (account.role === 'ADMIN') {
                navigate('/admin/manager-user');
            } else if (account.role === 'USER') {
                navigate('/user/quiz');
            }
            else {
                navigate('/');
            }
        }
    }, [account.role]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);

    }
    const handleLogin = async () => {
        setIsLoading(true);
        let data = await postLogin(email, password);
        console.log('data: ', data);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success('Success!');

            setIsLoading(false);




        } else
            if (data && +data.EC !== 0) {
                toast.error(data.EM);
                setIsLoading(false);
            }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className="login-content">
                <div className="title col-2 mx-auto fw-bold">
                    LOG IN
                </div>

                <div className="content-form col-2 mx-auto">
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
                    <span className='forgot-password'>Forgot password?</span>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => { handleLogin() }}
                            disabled={isLoading}
                        >
                            {isLoading && <AiOutlineLoading3Quarters className='loader-icon' />}
                            <span>Login</span>

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
export default Login