import React, { useEffect } from 'react'
import Section1 from '../../components/homepage/section1/section1'
import Section2 from '../../components/homepage/section2/section2'
import './homepage.css'

const Homepage = () => {
  useEffect(() => {
    fetch('https://dee-blog-app-api.vercel.app/posts').then(res => {
      res.json(posts=>{
        console.log(posts);
      });
    });
  }, []);
  return (
    <div>
        <Section1/>
        <Section2/>
    </div>
  )
}

export default Homepage
