import React, {useState}from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  return (
    <div>
      <div className="forgot-header">
      <h1>Reset Password</h1>
      </div>
      <div className='forgot-para'>
      <p>Please enter your email address.You will receive a link to create a new password via email</p>
      </div>
      <div className='forgot-search-bar'>
        <label>Email Address *</label>
        <input type= "Search" placeholder="Enter your email here"/>
      </div>
      <div>
        <button className='forgot-pwd-btn'>GET NEW PASSWORD</button>
      </div>
    </div>
  )
}

export default ForgotPassword;
