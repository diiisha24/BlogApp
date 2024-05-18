import React, { useEffect } from 'react'
import './section2.css'
import PostCard from './postCard'
import { Link } from 'react-router-dom'

const Section2 = () => {
  useEffect(() => {
    fetch('http://localhost:4000/posts').then(res => {
      res.json(posts=>{
        console.log(posts);
      });
    });
  }, []);
  return (
    <div className='section2'>
        <div className='postcard_wrapper'>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
            <Link to="/login" className='button sec2_button'><span>
              Join Us!!
              </span></Link>
    </div>
  )
}

export default Section2
