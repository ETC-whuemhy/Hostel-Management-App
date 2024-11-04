import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput/PasswordInput';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formValidMessage, setFormValidMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  
  const handleInputChange = () => {

  }
  
  const loginUser = () => {

  }

  return ( 
    <div className='container form__ --100vh'>
      <div className="form-container">
        <p className='title'>Admin Login</p>
        <form className='form' onSubmit={loginUser}>
          <div className='--dir-column'>
            <label htmlFor="email">Email:</label>
            <input type="email" className='input' name='email' placeholder='Enter Your Email' required value={formData.email} onChange={handleInputChange}/>
          </div>

          <div className='--dir-column'>
            <label htmlFor="password">Password:</label>
            <PasswordInput name='password' placeholder='Enter Your Password' required value={formData.password} onChange={handleInputChange}/>
          </div>

          <button className='--btn' disabled={isSubmitting}>{isSubmitting ? 'Signing In...' : 'Sign In'}</button>
        </form>
        {formValidMessage && (
          <p className='error-message'>{formValidMessage}</p>
        )}
        <p className='account'>Don't have an account yet? <Link to='/'>Sign Up</Link></p>
      </div>
    </div>
  )
}
