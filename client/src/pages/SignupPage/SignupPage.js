import React, { useState } from 'react'

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  async function register(e){
      e.preventDefault();
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword
        }),
        headers: {'Content-Type': 'application/json'}
      })
      if (response.status === 200){
        alert("Registration Successful!!!");
        window.location.href = '/login';
      }
      else{
        alert("Registration failed01!!!");
      }
  }
  return (
    <div className='form_wrapper'>
    <form className='form' onSubmit={register} action="">
      <div>
        <label>Username</label><br/>
        <input type="text" 
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="email" placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <label>Password</label><br/>
        <input minLength="8" type="password"
         placeholder="Password"
         value={password}
        onChange={e => setPassword(e.target.value)}/>
  
      </div>
      <div>
        <label>Confirm Password</label><br/>
        <input placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirm(e.target.value)}/>
  
      </div>
        <button className='button' type='submit'><span>Register</span></button>
    </form>
  </div>
  )
}

export default SignupPage
