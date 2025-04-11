import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './index.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken) {
            navigate("/");
        }
    }, [navigate]);

    const onSubmitSuccess = (jwtToken) => {
        setShowSubmitError(false);
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        navigate('/') // Redirect to Home Route
    };

    const onSubmitFailure = errorMsg => {
        setShowSubmitError(true);
        setErrorMsg(errorMsg);
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const userDetails = { username, password };
        const url = "https://srinivas-nxt-trendz-backend-project.vercel.app/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(response);
        console.log(data);

        if (response.ok === true) {
            onSubmitSuccess(data.jwtToken);
        } else {
            onSubmitFailure(data.error_msg);
        }
    };

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const renderUsernameField = () => (
        <>
            <label className="input-label" htmlFor="username">
                USERNAME
            </label>
            <input
                type="text"
                id="username"
                className="username-input-field"
                value={username}
                onChange={onChangeUsername}
                placeholder="Username: srinu"
            />
        </>
    );

    const renderPasswordField = () => (
        <>
            <label className="input-label" htmlFor="password">
                PASSWORD
            </label>
            <input
                type="password"
                id="password"
                className="password-input-field"
                value={password}
                onChange={onChangePassword}
                placeholder="Password: srinu@2022"
            />
        </>
    );

    return (
        <div className="login-form-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="login-website-logo-mobile-img"
                alt="website logo"
            />
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-img"
                alt="website login"
            />
            <form className="form-container" onSubmit={submitForm}>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo-desktop-img"
                    alt="website logo"
                />
                <div className="input-container">{renderUsernameField()}</div>
                <div className="input-container">{renderPasswordField()}</div>
                <button type="submit" className="login-button">
                    Login
                </button>
                {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
        </div>
    )
}

export default LoginForm