import React, { useContext, useState } from 'react';
import { userContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(userContext);

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://dee-blog-app-api.vercel.app/login', {
        method: 'POST',
        body: JSON.stringify({
          identifier,
          password
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Login Successful!!!");
        const data = await response.json();
        setUserInfo(data);
        setRedirect(true);
      } else {
        alert("Invalid Credentials!");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className='form_wrapper'>
      <form className='form' onSubmit={login}>
        <div>
          <label>Username Or Email</label><br />
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='button' type='submit' disabled={loading}>
          <span>{loading ? 'Logging in...' : 'Login'}</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
