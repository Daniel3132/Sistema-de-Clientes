import React, { useEffect, useState } from 'react'
import { url } from '../helpers/api';
import '../styles/list.scss'


const List = () => {
  // para poder usar la tabla 
  const FilterableTable = require('react-filterable-table');

  //estado con el array de los clientes
  const [Clientes, setClientes] = useState([]);

  useEffect(() => {
    //fetch a la api para traer los clientes y mandarlos al estado
    const getData = async () => {
      const resp = await fetch(url);
      const data = await resp.json();
      setClientes(data);
    }
    getData()
  }, [])


  //cabecero de la tabla, validar si son buscables u ordenables
  const fields = [
    { name: 'nombre', displayName: "Nombre", inputFilterable: true, sortable: true },
    { name: 'apellido', displayName: "Apellido", inputFilterable: true, sortable: true },
    { name: 'telefono', displayName: "Telefono", inputFilterable: true, sortable: true },
    { name: 'correo', displayName: "Correo Electronico", inputFilterable: true, sortable: true },
    { name: 'fecha', displayName: "Fecha de nacimiento", inputFilterable: true, sortable: true },
  ];


  return (
    <section className='listCont'>
      <h2>Lista de Clientes</h2>
      <div className="tableCont">

        <FilterableTable
          namespace="Clientes"
          initialSort="nombre"
          data={Clientes}
          fields={fields}
          pageSizes={[1, 5, 10, 15]}
          noRecordsMessage="No hay clientes para mostrar"
          noFilteredRecordsMessage="No se encontró nada referente a la busqueda"
        />

      </div>
    </section>
  )
}

export default List