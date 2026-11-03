import Card from 'react-bootstrap/Card'

function ProductoCard({ producto }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Subtitle>${producto.precio}</Card.Subtitle>
        {/* <Card.Subtitle className="mb-2 text-muted">{producto.descripcion}</Card.Subtitle> */}
        <Card.Text>
          {producto.descripcion}
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link> */}
        <Card.Link href="#">Comprar ahora</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard
