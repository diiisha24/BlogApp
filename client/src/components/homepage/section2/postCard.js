import React from 'react'
import './postCard.css'

const postCard = () => {
  return (
    <div className='post_card'>
        <img src='https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'></img>
      <div className='post_card_content'>
        <div className='post_card_date'>00-04-2023</div>
        <div className='post_card_description'>HERO ELECTRIC SUFFERS RS 2,000 CR LOSS, BENLING AXES 50% JOBS POST FAME II SUBSIDY DELISTING</div>
    </div>
    </div>
  )
}

export default postCard
