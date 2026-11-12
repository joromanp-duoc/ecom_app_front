import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const [username, setUsername] = useState('alumno');
    const [password, setPassword] = useState('');
    const { login, cargando, error, isAuthenticated, usuario } = useAuth();
    const navigate = useNavigate();

    const ingresar = async (e) => {
        e.preventDefault();
        const ok = await login(username, password);
        if (ok) {
            navigate('/');
        }
    };

    if (isAuthenticated) {
        return (
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <Card.Title>Sesion iniciada</Card.Title>
                        <Card.Text>Usuario: {usuario}</Card.Text>
                        <Button variant="secondary" onClick={() => navigate('/')}>Ir a la tienda</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-4" style={{ maxWidth: '420px' }}>
            <Card>
                <Card.Body>
                    <Card.Title>Iniciar sesion</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ingresar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="alumno"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="demo123"
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" disabled={cargando}>
                            {cargando ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
