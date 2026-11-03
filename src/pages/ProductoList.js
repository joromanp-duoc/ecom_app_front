

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
        <div>
            <Row>
                    {productos.map(prod => (
                        <Col>
                            <ProductoCard producto={prod}></ProductoCard>
                        </Col>
                    ))}
                
            </Row>
        </div>
    );
}

export default ProductoList;