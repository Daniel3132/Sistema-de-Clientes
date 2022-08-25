import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/navBar.scss'

const NavBar = () => {
  return (
    <nav>
        <Link to='/'>Formulario</Link>    
        <Link to='/reporte'>Dashboard</Link>    
        <Link to='/tabla-clientes'>Lista de clientes</Link>    
    </nav>
  )
}

export default NavBar