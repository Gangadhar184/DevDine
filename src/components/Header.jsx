import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <section className='flex items-center justify-between px-10 py-3 shadow-md'>
        <div className='flex items-center'>
            <img className='w-20' src="src/assets/logo.jpg" alt="logo" />
            <span className='ms-3 text-2xl font-bold'>DevDine</span>
        </div>
        <ul className='flex items-center justify-center gap-5'>
            <li><Link to = "/">Home</Link></li>
            <li><Link to="about">About</Link></li>
            <li><Link to="contact">Contact</Link></li>
            <li>Cart</li>
        </ul>
    </section>
  )
}

export default Header
