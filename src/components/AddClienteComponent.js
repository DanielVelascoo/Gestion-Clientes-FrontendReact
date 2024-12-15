import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AddClienteComponent = () => {

    const[nombre, setNombre] = useState('');
    const[apellido, setApellido] = useState('');
    const[email, setEmail] = useState('');
    const navigate = useNavigate();//Para agregar navegacion despues de una acción
    const {id} = useParams(); //Del parametro adquiero el id para posteriormente, tener acciones con el cliente con ese id

    //Si el cliente existe y se actualiza sino se crea el cliente
    const saveOrUpdateCliente = (e) => {
        e.preventDefault();
        const cliente = {nombre, apellido, email}; //Pasamos los valores que se guardan en la BD

        //Se define si existe, pues actualizar
        if (id) {
            ClienteService.updateCliente(id,cliente).then((response) =>{ //Toca pasar los parametros de id y cliente
                console.log(response.data);
                navigate('/clientes');
            }).catch(error =>{
                console.log(error);
            }) 
        //En caso contrario se crea el cliente
        }else{
            ClienteService.createCliente(cliente).then((response) =>{
                console.log(response.data);
                navigate('/clientes');
            }).catch(error =>{
                console.log(error);
            })
        }
        
    }
    
    //UseEffect para obtener los datos del cliente por el id y autorellenar los campos para actualizar
    useEffect(() => {
        ClienteService.getClientebyId(id).then((response) => {
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setEmail(response.data.email);
        }).catch(error =>{
            console.log(error)
        })
    },[])

    //Una constante de titulo para tenerlo dinamico 
    //En caso de crear o actualizar un cliente, cambia el titulo
    const title = () => {
        if (id) {
            return <h2 className='text-center'>Actualizar Cliente</h2>
        }else{
            return <h2 className='text-center'>Agregar Cliente</h2>
        }
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title()}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese su nombre'
                                    name='nombre'
                                    className='form-control'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Apellido</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese su apellido'
                                    name='apellido'
                                    className='form-control'
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='email'
                                    placeholder='Ingrese su Email'
                                    name='email'
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveOrUpdateCliente(e)}>Guardar</button>
                            {/* Esto da un espacio */}
                            &nbsp;&nbsp; 
                            <Link to='/clientes' className='btn btn-danger'>Cancelar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default AddClienteComponent
