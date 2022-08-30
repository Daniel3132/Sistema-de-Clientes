import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import getData, { url } from '../helpers/api';
import FormEdit from '../helpers/FormEdit';
import '../styles/list.scss'


const ListCustomize = () => {

  const [Clientes, setClientes] = useState([]); //Clientes obtenidos de la api 
  const [ClientesFiltrados, setClientesFiltrados] = useState([]); //Copia de los clientes para filtrarlos sin perderlos en la tabla
  const [EditData, setEditData] = useState([]);  //Info del cliente enviada al modal de editar
  const [Modal, setModal] = useState(false);  //abrir y cerrar el modal
  const [Busqueda, setBusqueda] = useState('');   //controlar el input de busqueda

  //obtener los datos y ponerlos en el estado
  const get = async () => {
    setClientes(await getData())
    setClientesFiltrados(await getData())
  }

  useEffect(() => {
    get()
  }, [])

  const handleInputChange = (e) => {
    e.preventDefault();
    const Busqueda = e.target.value;
    setBusqueda(Busqueda); //controlar el input
    if (Busqueda !== '') {
      //filtrar segun la Busqueda 
      const condition = (atribute) => {
        atribute = atribute.toString()
        return atribute.toLowerCase().includes(Busqueda.toLowerCase())
      }
      const filtro = Clientes.filter(c =>
        condition(c.nombre) ||
        condition(c.apellido) ||
        condition(c.telefono) ||
        condition(c.fecha) ||
        condition(c.correo)
      );
      setClientesFiltrados(filtro)
    }
    else {
      setClientesFiltrados(Clientes)
    }
  }

  const handleEdit = (cliente) => {
    setEditData(cliente)
    setModal(true)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: "no se podrán revertir estos cambios!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url + '/' + id, {
          method: 'DELETE'
        }).then(response => {
          console.log(response)
          get()
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado',
            'success'
          )
        }).catch(error => {
          console.log(error);
          Swal.fire(
            'Error!',
            'Ocurrio un error al tratar de eliminar el Cliente',
            'error'
          )
        })
      }
    })
  }

  return (
    <section className='listCont'>
      {
        Clientes.length !== 0 ?
          <>
            <h2>Lista de Clientes</h2>
            <div className="tableCont">
              <div className="searchInput">
                <input
                  type="text"
                  name="busqueda"
                  placeholder='Buscar'
                  value={Busqueda}
                  onChange={handleInputChange}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>Correo Electronico</th>
                    <th>Fecha de nacimiento</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ClientesFiltrados.map((c, index) =>
                      <tr key={index}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.apellido}</td>
                        <td>{c.telefono}</td>
                        <td>{c.correo}</td>
                        <td>{c.fecha}</td>
                        <td>
                          <i onClick={() => handleEdit(c)} className="fas fa-edit"></i>
                        </td>
                        <td>
                          <i onClick={() => handleDelete(c.id)} className="fa-solid fa-trash-can"></i>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              {ClientesFiltrados.length === 0 ? <h3 disabled>No se encontró ningún cliente.</h3> : ''}
            </div>
            {
              Modal ?
                <div className='modalCustom'>
                  <button onClick={() => setModal(false)} >X</button>
                  <FormEdit cliente={EditData} get={get} />
                </div>
                : null
            }
          </>
          :
          <div className="custom-loader"></div>
      }
    </section>
  )
}

export default ListCustomize