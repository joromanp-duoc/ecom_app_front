

import React, { useState, useEffect } from 'react';

import ProductoCard from '../components/ProductoCard';
import ProductoService from '../services/ProductoService';
import PedidoService from '../services/PedidoService';

import { Row, Col } from 'react-bootstrap';

import { useCarrito } from "../hooks/useCarrito";
import Carrito from "../components/carrito.js";

const ProductoList = () => {
    const [productos, setProductos] = useState([])
    const [procesando, setProcesando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const {
        carrito,
        agregar,
        cambiarCantidad,
        eliminar,
        vaciarCarrito,
        total
    } = useCarrito();

    useEffect(() => {
        fetchProductos()
    }, []);

    const confirmarCompra = async () => {
        if (procesando || carrito.length === 0) return;

        setProcesando(true);
        setMensaje("");

        try {
            const items = carrito.map(p => ({
                productoId: p.id,
                cantidad: p.cantidad
            }));
            const { data } = await PedidoService.crearPedido(items);

            vaciarCarrito();
            setMensaje(
                `Pedido #${data.id} confirmado. Total: $${Number(data.total).toLocaleString("es-CL")}`
            );
            fetchProductos();
        } catch (error) {
            setMensaje(
                error.response?.data?.error || "No se pudo confirmar la compra"
            );
        } finally {
            setProcesando(false);
        }
    };

    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
        }).catch(error => {
            console.log('Error fetching products:', error);
        });
    }

    return (
        <div className="container mt-4">
            <div className="container mt-4">
                <Carrito
                    items={carrito}
                    cambiarCantidad={cambiarCantidad}
                    eliminar={eliminar}
                    total={total}
                    confirmarCompra={confirmarCompra}
                    procesando={procesando}
                    mensaje={mensaje}
                />
            </div>
            <Row md={3} className="d-flex justify-content-center">
                {productos.map((prod, index) => (
                    <Col key={index} className="mb-4 d-flex justify-content-between align-items-stretch">
                        <ProductoCard producto={prod} agregar={agregar} />
                    </Col>
                ))}
            </Row>
            
        </div>

    );
}

export default ProductoList;