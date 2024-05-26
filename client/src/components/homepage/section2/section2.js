import React, {useEffect, useState} from 'react'
import './section2.css'
import PostCard from './postCard'
import { Link } from 'react-router-dom'

const Section2 = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/posts');
        const posts = await res.json();
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className='section2'>
        <div className='postcard_wrapper'>
            {/* <PostCard/>
            <PostCard/>
            <PostCard/> */}
            {posts.length === 0 ? (
              <p>Loading...</p>
            ) : (
              // posts.slice(0, 3).map((post) => (
              //   <div key={post.id}>
              //     <h2>{post.title}</h2>
              //     <p>{post.body}</p>
              //   </div>
              // ))
              posts.slice(0,3).map(post =>(
                <PostCard {...post}/> 
              ))
            )}
        </div>
        <div>
          <Link to="/login" className='button sec2_button'><span>
              Join Us!!
              </span></Link>
        </div>
    </div>
  )
}

export default Section2
