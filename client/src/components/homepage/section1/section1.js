import React from 'react'
import "./section1.css"
import { Link } from 'react-router-dom'

const section1 = () => {
  return (
    <div className='section1'>
      <div className='sec1_heading'>Unlock Your Creativity: Discover the Art of Blogging</div>
      <div className='sec1_main'>"Words have the power to change the world. Embrace your voice and share your passion with the world through blogging."</div>
      <Link to="/create" className='button sec1_button'><span>
        Create Your Blog
        </span></Link>
    </div>
  )
}

export default section1
