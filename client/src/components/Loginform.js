import React, { useState } from 'react';
import './App.css';
import { useHistory } from "react-router-dom";

function Loginform(props) {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    function validate() {
      return username.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      if(username === 'admin' && password === 'testing1'){
          setUsername('success!')
          setPassword('')
          history.push('/home')
          
      } else {
          setUsername('incorrect username/password')
          setPassword('')
      }
      event.preventDefault();
    }

    return (
        <div className='header'>
           <h4 className='white-text'> Korean Database Management System  </h4>
        
        <div className='login-form'>
            <div className='login-text'>
                <h5>Enter Details</h5>
            </div>
            <div className='username-password'> 
               <h6>Username</h6></div>
            <div>
                  <input
                    className='login-input'
                    id='username'
                    name='username'
                    placeholder='type username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  ></input>
            </div>
            <div className='username-password'> 
               <h6>Password</h6></div>
            <div>
                  <input
                  className='login-input'
                  id='password'
                  name='password'
                  placeholder='minimum 8 characters'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  ></input>
            </div>
            <div className='center'>
                <button
                className='login-button'
                type='button'
                Go homepage
                disabled={username === '' || password === ''}
                onClick={handleSubmit}>
                    Login
                </button>
            </div>
            </div>
            </div>
    );

};

export default Loginform;