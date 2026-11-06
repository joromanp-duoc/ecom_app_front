import { useEffect, useState } from "react";

export function useCarrito() {
    const [carrito, setCarrito] = useState(() => {
        try {
            const dato = JSON.parse(localStorage.getItem("carrito") || "[]");
            return Array.isArray(dato) ? dato : [];
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregar = (producto) => setCarrito(actual => {
        if (producto.stock <= 0) return actual;
        const existente = actual.find(p => p.id === producto.id);
        if (!existente) return [...actual, { ...producto, cantidad: 1 }];
        return actual.map(p => p.id === producto.id
            ? { ...p, cantidad: Math.min(p.cantidad + 1, p.stock) }
            : p);
    });
    
    const cambiarCantidad = (id, cantidad) => setCarrito(actual =>
        actual.map(p => p.id === id
            ? {
                ...p, cantidad: Math.max(1, Math.min(
                    Math.trunc(Number(cantidad)) || 1, p.stock))
            }
            : p));

    const eliminar = id => setCarrito(actual =>
        actual.filter(p => p.id !== id));

    const vaciarCarrito = () => setCarrito([]);

    const total = carrito.reduce((s, p) =>
        s + Number(p.precio) * p.cantidad, 0);
    return {
        carrito,
        agregar,
        cambiarCantidad,
        eliminar,
        vaciarCarrito,
        total
    };
}