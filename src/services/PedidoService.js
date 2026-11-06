import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/pedidos';

class PedidoService {
    crearPedido(items) {
        return axios.post(BASE_URL, { items });
    }
}

const pedidoService = new PedidoService();

export default pedidoService;
