import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navBar.scss'

const NavBar = () => {
  return (
    <nav className='mainNavBar'>
      <a className='logo' href="http://www.pwc.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cutewallpaper.org/24/pwc-logo-png/pwc.png" alt="" />
      </a>
      <Link to='/tabla-custom'>Lista de clientes</Link>
      <Link to='/'>Formulario</Link>
      <Link to='/reporte'>Dashboard</Link>
    </nav>
  )
}

export default NavBar