import React from 'react'
import './loginPage.css'

const loginPage = () => {
  return (
    <div className='form_wrapper'>
      <form className='form' action="">
        <div>
          <label>Username</label><br/>
          <input type="text" placeholder="Username"/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" placeholder="Password"/>
        </div>
          <button><span>Login</span></button>
      </form>
    </div>

  )
}

export default loginPage
