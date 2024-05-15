import React from 'react'
import Header from './header/header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'

const layout = () => {
  return (
    <div className='App'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default layout
