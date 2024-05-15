import React, { useEffect } from 'react'
import './section2.css'
import PostCard from './postCard'

const Section2 = () => {
  // useEffect(() => {
  //   fetch('/create').then(res => {
  //     res.json().then(posts => {
  //       console.log(posts);
  //     })
  // }, [])
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

export default Section2
