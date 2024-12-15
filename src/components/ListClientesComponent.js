import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClienteService from '../services/ClienteService';

const ListClientesComponent = () => {
    
    const [clientes, setClientes] = useState([]); //Obtenemos todos los clientes en este array

    //El useEffect para traer todo los datos de los clientes
    useEffect(() => {
        listarClientes();
    },[])

    const listarClientes = () =>{
        ClienteService.getAllClientes().then(response => {
            setClientes(response.data);
            console.log(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteCliente = (clienteId) => {
        ClienteService.deleteCliente(clienteId).then((response) => {
            listarClientes();
        }).catch(error =>{
            console.log(error)
        })
    }
  return (
    <div className='container'>
      <h2 className='text-center'>Lista de clientes</h2>
      <Link to='/add-cliente' className='btn btn-primary mb-2'>Agregar cliente</Link>
      <table className='table table-bordered table-striped'>
        <thead>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>

        </thead>
        <tbody>
            {/* Hacemos un mapeo en el array para mostrar todos los clientes, en este caso
            agrego todos los clientes en una variable cliente para poder sacar los valores 
            que lleva cada cliente. */}
            
            {
                clientes.map(
                    cliente =>
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.apellido}</td>
                        <td>{cliente.email}</td>
                        <td>
                            <Link className='btn btn-info' to={`/edit-cliente/${cliente.id}`}>Actualizar</Link>
                            <button className='btn btn-danger' onClick={() => deleteCliente(cliente.id)}>Eliminar</button>

                        </td>
                    </tr>
                )
            }
        </tbody>

      </table>
    </div>
  )
}

export default ListClientesComponent
