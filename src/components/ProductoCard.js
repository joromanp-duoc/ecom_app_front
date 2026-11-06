import Card from 'react-bootstrap/Card'

function ProductoCard({ producto, agregar }) {
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
        <Card.Link onClick={() => agregar(producto)} disabled={producto.stock <= 0}>Comprar ahora</Card.Link>
        {/* <button >
          Agregar al carrito
        </button> */}
      </Card.Body>
    </Card>
  );
}

export default ProductoCard
