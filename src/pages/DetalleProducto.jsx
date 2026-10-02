import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { formatPrice } from '../services/dataService';
import { useCart } from '../context/CartContext';

export default function DetalleProducto() {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  // Buscar el producto por id o usar el primero como fallback
  const product = products.find((p) => String(p.id) === String(id)) || products[0];

  if (!product) {
    return (
      <main>
        <p>Cargando información del producto...</p>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
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
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-secondary">{product.categoria}</span>
            {product.enOferta && (
              <span className="badge bg-danger">¡Oferta {product.descuento}% OFF!</span>
            )}
            {product.stock <= product.stockCritico && product.stock > 0 && (
              <span className="badge bg-warning text-dark">¡Últimas {product.stock} unidades!</span>
            )}
            {isOutOfStock && <span className="badge bg-danger">Agotado</span>}
          </div>

          <p className="precio">
            {product.enOferta ? (
              <>
                <span className="text-decoration-line-through text-muted fs-5 me-2">
                  {formatPrice(product.precio)}
                </span>
                <span className="text-success">{formatPrice(product.precioOferta)}</span>
              </>
            ) : (
              formatPrice(product.precio)
            )}
          </p>

          <p className="descripcion">{product.descripcion}</p>

          <div className="acciones-compra">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              min="1"
              max={product.stock || 1}
              disabled={isOutOfStock}
              onChange={(e) =>
                setCantidad(
                  Math.min(
                    product.stock || 1,
                    Math.max(1, parseInt(e.target.value, 10) || 1)
                  )
                )
              }
            />
            <button
              id="btn-agregar"
              className="btn"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              style={isOutOfStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
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
