import Button from 'react-bootstrap/Button';

export default function Carrito({
    items,
    cambiarCantidad,
    eliminar,
    total,
    confirmarCompra,
    procesando,
    mensaje
}) {
    return <section>
        <h2>Carrito de compras</h2>
        
        {items.length === 0 && <p>Tu carrito está vacío</p>}

        {items.map(p => 
        <div key={p.id}>
            <span className="me-5">
                <strong>{p.nombre}</strong> — ${Number(p.precio).toLocaleString("es-CL")}
            </span>
            
            <Button size="sm" onClick={() => cambiarCantidad(p.id, p.cantidad - 1)}
                disabled={p.cantidad <= 1}>-</Button>
            <span>{p.cantidad}</span>
            <Button size="sm" onClick={() => cambiarCantidad(p.id, p.cantidad + 1)}
                disabled={p.cantidad >= p.stock}>+</Button>
            <Button size="sm" onClick={() => eliminar(p.id)}>Eliminar</Button>
            <p>Subtotal: ${(Number(p.precio) * p.cantidad).toLocaleString("es-CL")}</p>
        </div>)}
        <h3>Total: ${total.toLocaleString("es-CL")}</h3>

        <Button
            variant="success"
            disabled={procesando || items.length === 0}
            onClick={confirmarCompra}
        >
            {procesando ? "Procesando..." : "Confirmar compra"}
        </Button>
        {mensaje && <p role="status">{mensaje}</p>}
    </section>;
}