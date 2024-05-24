import React, { useEffect,useContext } from 'react';
import './header.css';
import { userContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const Header = () => {
  // const [user, setUser] = useState(null);
  const {setUserInfo,userInfo} = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dee-blog-app-api.vercel.app/profile', {
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user profile.');
        }
  
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  const logout = async () => {
    // Send a logout request to the server
    await fetch('https://dee-blog-app-api.vercel.app/logout', {
      credentials: 'include',
      method: 'POST'
    })
    .then(() => {
      // setUser(null); // Update user state on successful logout
      console.log('logged out!!!');
      setUserInfo(null);
      window.location.href = '/';
    })
    .catch(error => {
      console.error(error);
    });
  }
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
            <Link onClick={logout}>Logout</Link>
            {/* <div>{user}</div> */}
          </div>
        ) : (
          <div className='header_nav'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Register</Link>
          </div> 
        )
      }

      </div>
    </div>
  )
}

export default Header;
