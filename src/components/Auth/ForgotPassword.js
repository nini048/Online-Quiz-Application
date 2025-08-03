import { useState, useEffect } from 'react';
import './Login.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation()

    const handleChangePassword = () => {
        
    }
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="title col-2 mx-auto fw-bold">
                    Forgot Password
                </div>

                <div className="content-form col-2 mx-auto">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => {handleChangePassword()}}
                        >
                            Send Reset Link
                        </button>
                    </div>

                    <div className="text-center">
                        <span
                            className="back"
                            onClick={() => navigate('/login')}
                        >
                            &#60;&#60; Back to Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
