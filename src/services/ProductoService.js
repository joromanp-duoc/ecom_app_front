import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/productos';

class ProductoService {
    getAllProductos() {
        return axios.get(BASE_URL);
    }
    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }
    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }
    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}
export default new ProductoService();