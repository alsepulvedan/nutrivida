import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

export default function DetalleProducto() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  // Buscar el producto por id o usar el primero como fallback
  const product = products.find((p) => p.id === parseInt(id, 10)) || products[0];

  const handleAddToCart = () => {
    addToCart(product, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 3000);
  };

  return (
    <main>
      <div style={{ marginBottom: '15px' }}>
        <Link to="/productos" className="btn btn-volver">
          ← Volver al Catálogo
        </Link>
      </div>

      <section className="detalle-container">
        <div className="detalle-imagen">
          <img src={product.imagen} alt={product.nombre} />
        </div>

        <div className="detalle-info">
          <h2>{product.nombre}</h2>
          <p className="categoria">Categoría: {product.categoria}</p>
          <p className="precio">{formatPrice(product.precio)}</p>

          <p className="descripcion">{product.descripcion}</p>

          <div className="acciones-compra">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              min="1"
              max="99"
              onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
            <button id="btn-agregar" className="btn" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>

          {agregado && (
            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb',
                borderRadius: '4px'
              }}
            >
              ¡Producto añadido al carrito con éxito!{' '}
              <Link to="/carrito" style={{ fontWeight: 'bold', color: '#155724' }}>
                Ver carrito
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
