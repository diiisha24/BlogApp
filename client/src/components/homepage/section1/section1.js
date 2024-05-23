import React, { useEffect, useContext } from 'react';
import "./section1.css";
import { userContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';

const Section1 = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to fetch user profile.');
    })
    .then(userInfo => {
      setUserInfo(userInfo);
    })
    .catch(error => {
      console.error(error);
    });
  }, [setUserInfo]);

  const user = userInfo?.username;

  return (
    <div className='section1'>
      <div className='sec1_heading'>Unlock Your Creativity: Discover the Art of Blogging</div>
      <div className='sec1_main'>"Words have the power to change the world. Embrace your voice and share your passion with the world through blogging."</div>
      <Link to={user ? "/create" : "/login"} className='button sec1_button'>
        <span>Create Your Blog</span>
      </Link>
    </div>
  );
};

export default Section1;
