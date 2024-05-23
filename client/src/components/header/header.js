import React, { useEffect,useContext } from 'react';
import './header.css';
import { userContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const Header = () => {
  // const [user, setUser] = useState(null);
  const {setUserInfo,userInfo} = useContext(userContext);

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
      // setUser(data.username);
      setUserInfo(userInfo);
    })
    .catch(error => {
      console.error(error);
    });
  }, [setUserInfo]);

  const logout = () => {
    // Send a logout request to the server
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    })
    .then(() => {
      // setUser(null); // Update user state on successful logout
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
