import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navBar.scss'

const NavBar = () => {
  return (
    <nav>
      <Link to='/tabla-clientes'>Lista de clientes</Link>
      <Link to='/'>Formulario</Link>
      <Link to='/reporte'>Dashboard</Link>
    </nav>
  )
}

export default NavBar