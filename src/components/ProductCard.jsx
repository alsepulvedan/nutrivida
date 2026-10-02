import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, showButton = true }) {
  return (
    <article className="producto-card position-relative">
      {product.enOferta && (
        <span
          className="badge bg-danger position-absolute top-0 end-0 m-2"
          style={{ zIndex: 1 }}
        >
          -{product.descuento}%
        </span>
      )}
      <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.imagen} alt={product.nombre} />
        <h4>{product.nombre}</h4>
      </Link>
      <p>{product.categoria}</p>
      <div className="precio">
        {product.enOferta ? (
          <>
            <span
              style={{
                textDecoration: 'line-through',
                color: '#888',
                fontSize: '0.8rem',
                marginRight: '6px'
              }}
            >
              {formatPrice(product.precio)}
            </span>
            <span style={{ color: '#28a745' }}>{formatPrice(product.precioOferta)}</span>
          </>
        ) : (
          formatPrice(product.precio)
        )}
      </div>
      {showButton && (
        <Link to={`/productos/${product.id}`} className="btn">
          Ver detalle
        </Link>
      )}
    </article>
  );
}
