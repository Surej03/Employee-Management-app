import React, { useEffect, useState } from 'react';
import './LoginSignUp.css';
import gmail_icon from '../Assests/gmail.png';
import password_icon from '../Assests/padlock.png';
import logo_img from '../Assests/aivagam.png';
import { json, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [signInError, setSignInError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign in to Aivagam";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setSignInError(''); // Reset error on input change
    };

    const validateSignIn = () => {
        const newErrors = {};
        if (!values.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!values.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateSignIn()) {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:8000/auth/signin', {
                    email: values.email,
                    password: values.password,
                });
                if (response.data.success) {
                    // Store the JWT token in localStorage upon successful sign-in
                    console.log("user", response.data.user)
                    localStorage.setItem("token", response.data.accessToken);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    console.log("Welcome to Employee Management System")
                    // alert("Sign-in successful!");
                    navigate("/homepage");
                } else {
                    // Check if the error message indicates the user hasn't signed up
                    if (response.data.message === "User not found") {
                        alert("You need to sign up before signing in.");
                    } else {
                        setSignInError(response.data.message || "Invalid email or password.");
                    }
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setSignInError(error.response.data.message);
                } else {
                    setSignInError("An error occurred. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <main className='login-page'>
            <div className='container'>
                <header>
                    <a href='https://aivagam.topgrep.com/'><img className='logo' src={logo_img} alt='Aivagam Logo' /></a>
                </header>
                <div className="header">
                    <div className="text">Sign in to AIVAGAM</div>
                    <div className="underline"></div>
                </div>
                {signInError && <div className="error">{signInError}</div>}
                <div className="inputs">
                    <div className="input">
                        <img src={gmail_icon} alt="" />
                        <input type="email" id='email' name="email" placeholder='Email' value={values.email} onChange={handleChange} onKeyDown={handleKeyDown}/>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" id='password' name="password" placeholder='Password' value={values.password} onChange={handleChange} onKeyDown={handleKeyDown}/>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div className="forgot-pwd"><span><Link to="/forgotpassword" className='forgot-link'>Forgot your Password?</Link></span></div>
                <div className="submit-container">
                    <div className={`submit gray ${isLoading ? 'loading' : ''}`} onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </div>
                </div>
                <div className="redirect-text">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </main>
    );
};

export default SignIn;