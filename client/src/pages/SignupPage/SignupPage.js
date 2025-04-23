import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function register(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://dee-blog-app-api.vercel.app/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        alert("Registration Successful!!!");
        window.location.href = '/login';
      } else {
        alert("Registration failed01!!!");
      }
    } catch (err) {
      alert("An error occurred during registration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form_wrapper'>
      <form className='form' onSubmit={register}>
        <div>
          <label>Username</label><br />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            minLength="8"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label><br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>
        <button className='button' type='submit' disabled={loading}>
          <span>{loading ? 'Registering...' : 'Register'}</span>
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
