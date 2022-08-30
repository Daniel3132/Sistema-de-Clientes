import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import getData, { url } from '../helpers/api';
import FormEdit from '../helpers/FormEdit';
import '../styles/list.scss'


const ListCustomize = () => {

  //estado con el array de los clientes
  const [Clientes, setClientes] = useState([]);
  const [ClientesFiltrados, setClientesFiltrados] = useState([]);
  const [EditData, setEditData] = useState([]);
  const [Modal, setModal] = useState(false);
  const [Busqueda, setBusqueda] = useState('');

  useEffect(() => {
    //obtener los datos y ponerlos en el estado
    const get = async () => {
      setClientes(await getData())
      setClientesFiltrados(await getData())
    }
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
    } else {
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
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado',
            'success'
          )
          window.location.reload()
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
                  <FormEdit cliente={EditData} />
                </div>
                : null
            }
          </>
          :
          <div className="spinner-grow text-danger" style={{ width: "7rem", height: "7rem" }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
      }
    </section>
  )
}

export default ListCustomize