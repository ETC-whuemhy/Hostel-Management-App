import React from 'react';
import './Register.css';
// import { Link } from 'react-router-dom';

const AdminReg = () => {
  return (
    <div className='container form__ --100vh'>
       <div className="form-container">
       <p className='title'>Create an Account</p>
        <form className='form'>
            <div className="--dir-column">
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" className='input' name='fullname' placeholder='Enter Your Full Name' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input type="email" className='input' name='email' placeholder='Enter Your Email' required />
            </div>

            <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <input type="password" className='input' name='password' placeholder='Enter Your Password' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="password">Confirm Password:</label>
                <input type="password" className='input' name='confirmPassword' placeholder='Comfirm Password' required />
            </div>

            <div className="card">
                <ul>
                    <li className="indicator"><span>&nbsp; Lowercase & Uppercase</span></li>
                    <li className="indicator"><span>&nbsp; Number (0 - 9)</span></li>
                    <li className="indicator"><span>&nbsp; Special Characters (!"£$^&*@~#)</span></li>
                    <li className="indicator"><span>&nbsp; Minimum of 6 characters</span></li>
                </ul>
            </div>
            <button className='--btn'>Create Account</button>
        </form>
        <p className='account'>Already have an account? </p>
       </div>
    </div>
  )
}
         
export default AdminReg