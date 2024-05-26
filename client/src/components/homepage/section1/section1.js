import React, { useEffect, useContext } from 'react';
import './section1.css';
import { userContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';

const Section1 = () => {
  const { setUserInfo, userInfo } = useContext(userContext);
  const sec2background = './images/blog_opacity_reduce.png';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dee-blog-app-api.vercel.app/profile', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile.');
        }

        const text = await response.text();
        try {
          const userInfo = JSON.parse(text);
          setUserInfo(userInfo);
        } catch (error) {
          throw new Error('Failed to parse JSON: ' + error.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setUserInfo]);

  const user = userInfo?.username;

  return (
    <div
      className="section1"
      style={{
        backgroundImage: `url(${sec2background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="sec1_heading">Unlock Your Creativity: Discover the Art of Blogging</div>
      <div className="sec1_main">
        "Words have the power to change the world. Embrace your voice and share your passion with the world through blogging."
      </div>
      <Link to={user ? '/create' : '/login'} className="button sec1_button">
        <span>Create Your Blog</span>
      </Link>
    </div>
  );
};

export default Section1;
