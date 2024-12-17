import React, { useState } from 'react';
import './LoginSignUp.css';
import user_icon from '../Assests/user.png';
import gmail_icon from '../Assests/gmail.png';
import password_icon from '../Assests/padlock.png';
import logo_img from '../Assests/aivagam.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateSignUp = () => {
        const newErrors = {};
        // First Name Validation
        if (!values.firstName) newErrors.firstName = "First Name is required.";
        if (!values.lastName) newErrors.lastName = "Last Name is required.";
        if (!values.userName) newErrors.userName = "User Name is required.";
        if (!values.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!values.password) {
            newErrors.password = "Password is required.";
        } else if (values.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }
    
        setErrors(newErrors); // Update the error state with validation errors.
        return Object.keys(newErrors).length === 0; // Return true if no errors exist.
    };
    
    const handleSubmit = async () => {
        if (validateSignUp()) {
            try {
                const response = await axios.post('http://localhost:8000/auth/signup', {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    userName: values.userName,
                    email: values.email,
                    password: values.password
                });
                // console.log("Sign Up successful:", response.data);
                // Example: Storing JWT token after successful signup
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/signin");
            } catch (error) {
                console.error("Error during signup:", error);
            }
        }
    };
    return (
        <main className='login-page'>
            <div className='container'>
                <header>
                    <a href='https://aivagam.topgrep.com/'><img className='logo' src={logo_img} alt='Aivagam Logo' /></a>
                </header>
                <div className="header">
                    <div className="text">Sign Up to AIVAGAM</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id='firstName' name="firstName" placeholder='First Name' value={values.firstName} onChange={handleChange} />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id='lastName' name="lastName" placeholder='Last Name' value={values.lastName} onChange={handleChange} />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id='userName' name="userName" placeholder='User Name' value={values.userName} onChange={handleChange} />
                        {errors.userName && <span className="error">{errors.userName}</span>}
                    </div>
                    <div className="input">
                        <img src={gmail_icon} alt="" />
                        <input type="email" id='email' name="email" placeholder='Email' value={values.email} onChange={handleChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" id='password' name="password" placeholder='Password' value={values.password} onChange={handleChange} />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div className="submit-container">
                    <div className="submit gray" onClick={handleSubmit}>Sign Up</div>
                </div>
                <div className="redirect-text">
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
            </div>
        </main>
    );
};

export default SignUp;