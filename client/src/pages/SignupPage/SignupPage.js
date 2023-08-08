import React from 'react'

const SignupPage = () => {
  return (
    <div className='form_wrapper'>
    <form className='form' action="">
      <div>
        <label>Username</label><br/>
        <input type="text" placeholder="Username"/>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="email" placeholder="Email"/>
      </div>
      <div>
        <label>Password</label><br/>
        <input type="password" placeholder="Password"/>
      </div>
      <div>
        <label>Confirm Password</label><br/>
        <input placeholder="Confirm Password"/>
      </div>
        <button><span>Register</span></button>
    </form>
  </div>
  )
}

export default SignupPage
