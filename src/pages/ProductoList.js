

import React, { useState, useEffect } from 'react';

import ProductoCard from '../components/ProductoCard';
import ProductoService from '../services/ProductoService';

import { Row, Col } from 'react-bootstrap';

const ProductoList = () => {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetchProductos()
    }, []);

    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
        }).catch(error => {
            console.log('Error fetching products:', error);
        });
    }

    return (
        <div className="container mt-4">
            <Row md={3} className="d-flex justify-content-center">
                {productos.map((prod, index) => (
                    <Col key={index} className="mb-4 d-flex justify-content-between align-items-stretch">
                        <ProductoCard producto={prod}></ProductoCard>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductoList;