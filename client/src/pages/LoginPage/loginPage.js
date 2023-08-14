import React, { useContext, useState } from 'react'
import { userContext } from '../../context/userContext'
import { Navigate } from 'react-router-dom'
import './loginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(userContext);

  async function login(e){
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (response.ok){
      // console.log("Login Successful!!!");
      response.json().then(data => {
        setUserInfo(data);
        setRedirect(true);
      })
    }
    else{
      alert("Invalid Creditails!!!");
    }
  }
  if(redirect){
    return <Navigate to='/'/>
  }

  return (
    <div className='form_wrapper'>
      <form className='form' onSubmit={login} action="">
        <div>
          <label>Username</label><br/>
          <input type="text" placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" placeholder="Password" 
          value={password}
          onChange={e=> setPassword(e.target.value)}/>
        </div>
          <button><span>Login</span></button>
      </form>
    </div>

  )
}

export default LoginPage
