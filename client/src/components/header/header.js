import React, { useEffect, useContext } from 'react';
import './header.css';
import { userContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:4000/profile', {
        const response = await fetch('https://dee-blog-app-api.vercel.app/profile', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile.');
        }

        const text = await response.text();
        if (text) {
          const userInfo = JSON.parse(text);
          setUserInfo(userInfo);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [setUserInfo]);

  const logout = async () => {
    try {
      await fetch('https://dee-blog-app-api.vercel.app/logout', {
        
      // await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });

      setUserInfo(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const user = userInfo?.username;

  return (
    <div className='header'>
      <div className='header_wrapper'>
        <Link to='/' className='header_logo'>
          dee.<span>BLOG</span>
        </Link>
        {user ? (
          <div className='header_nav'>
            <Link to='/create'>Create new post</Link>
            <Link to='/' onClick={logout}>Logout</Link>
            {/* <div>{user}</div> */}
          </div>
        ) : (
          <div className='header_nav'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
