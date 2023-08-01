import React from 'react'
import Header from './header/header'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div className='App'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default layout
