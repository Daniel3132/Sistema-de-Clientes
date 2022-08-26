import React, { useEffect, useState } from 'react'
import '../styles/dashboard.scss'
import BarChart from '../charts/BarChart'
import { url } from '../helpers/api'
import ChartEdad from '../charts/ChartEdad'

const Dashboard = () => {

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

  return (
    <section className='dashboard'>

      <div className='headDash'>
        <h3>Dashboard</h3>

        <div className="cardCount">
          <p>Clientes registrados:</p>
          <h2>{Clientes.length}</h2>
        </div>
      </div>

      <div className="graficosC">
        <div className="graficaCont">
          <BarChart Clientes={Clientes} />
        </div>

        <div className="graficaCont">
          <ChartEdad Clientes={Clientes} />
        </div>
      </div>

    </section>
  )
}

export default Dashboard