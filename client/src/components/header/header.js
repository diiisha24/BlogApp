import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <div className='header'>
      <div className='header_wrapper'>
      <Link to='/' className='header_logo'>
          dee.<span>BLOG</span>
      </Link>
      <div className='header_nav'>
          <Link to="/login">Login</Link>
          <Link to='/signup'>Register</Link>
      </div>
      </div>
    </div>
  )
}

export default header
