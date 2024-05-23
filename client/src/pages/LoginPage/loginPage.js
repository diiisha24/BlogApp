import React, { useContext, useState } from 'react'
import { userContext } from '../../context/userContext'
import { Navigate } from 'react-router-dom'
import './loginPage.css'

const LoginPage = () => {
  // const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(userContext);

  async function login(e){
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({
        identifier,
        password
      }),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (response.ok){
      console.log("Login Successful!!!");
      response.json().then(data => {
        setUserInfo(data);
        setRedirect(true);
      })
  }
    else{
      alert("Invalid Creditails3!!!");
    }
  }

  if(redirect){
    return <Navigate to='/'/>
  }

  return (
    <div className='form_wrapper'>
      <form className='form' onSubmit={login} action="">
        <div>
          <label>Username Or Email</label><br/>
          <input type="text" placeholder="Username or Email"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" placeholder="Password" 
          value={password}
          onChange={e=> setPassword(e.target.value)}/>
        </div>
          <button className='button'><span>Login</span></button>
      </form>
    </div>
  )
}

export default LoginPage
