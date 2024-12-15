import axios from "axios";

const CLIENTE_BASE_REST_API_URL = "http://192.168.1.2:8080/api/v1/clientes";

class ClienteService{
    //SERVICIOS:
    //Para obtener todos los clientes
    getAllClientes(){
        return axios.get(CLIENTE_BASE_REST_API_URL);
    }
    //Para crear un cliente
    createCliente(cliente){
        return axios.post(CLIENTE_BASE_REST_API_URL, cliente);
    }
    //Para obtener un cliente por ID 
    getClientebyId(clienteId){
        return axios.get(CLIENTE_BASE_REST_API_URL + '/' + clienteId);
    }
    //Para actuzalizar un cliente
    //Ese cliente con ese id, se le pasa el nuevo cliente
    updateCliente(clienteId, cliente){
        return axios.put(CLIENTE_BASE_REST_API_URL + '/' + clienteId,cliente);
    }

    //Para eliminar cliente
    deleteCliente(clienteId){
        return axios.delete(CLIENTE_BASE_REST_API_URL+ '/' +clienteId)
    }
}

export default new ClienteService();