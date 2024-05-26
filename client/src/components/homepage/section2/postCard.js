import React from 'react'
import './postCard.css'
import {format} from "date-fns";

const PostCard = (props) => {
  return (
    <div className='post_card'>
        <img alt='postcard' src='https://www.discoverypoint.com/wp-content/uploads/2020/05/shutterstock_401702698-scaled.jpg'></img>
      <div className='post_card_content'>
        <div className='post_card_date'>{format(new Date(props.createdAt), 'MMM d, yyyy HH:mm')}</div>
        <div className='post_card_title'>{props.title}</div>
        <div className='post_card_description'>{props.summary}HERO ELECTRIC SUFFERS RS 2,000 CR LOSS, BENLING AXES 50% JOBS POST FAME II SUBSIDY DELISTING</div>
    </div>
    </div>
  )
}

export default PostCard
