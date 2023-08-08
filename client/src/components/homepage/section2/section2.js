import React from 'react'
import './section2.css'
import PostCard from './postCard'

const section2 = () => {
  return (
    <div className='section2'>
        <div className='postcard_wrapper'>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
            <button className='sec2_button'><span>
              Join Us!!
              </span></button>
    </div>
  )
}

export default section2
