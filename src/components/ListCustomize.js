import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import getData, { url } from '../helpers/api';
import FormEdit from '../helpers/FormEdit';
import '../styles/list.scss'


const ListCustomize = () => {

  //estado con el array de los clientes
  const [Clientes, setClientes] = useState([]);
  const [EditData, setEditData] = useState([]);
  const [Modal, setModal] = useState(false);



  useEffect(() => {
    //obtener los datos y ponerlos en el estado
    const get = async () => {
      setClientes(await getData())
    }
    get()

  }, [])

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
          getData()
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
      <h2>Lista de Clientes</h2>
      <div className="tableCont">

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
              Clientes.map((c, index) =>
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

      </div>

      {
        Modal ?
          <div className='modalCustom'>
            <button onClick={() => setModal(false)} >X</button>

              <FormEdit cliente={EditData} />

          </div>
          : null
      }

    </section>
  )
}

export default ListCustomize