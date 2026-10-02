import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, showButton = true }) {
  return (
    <article className="producto-card">
      <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.imagen} alt={product.nombre} />
        <h4>{product.nombre}</h4>
      </Link>
      <p>{product.categoria}</p>
      <p className="precio">{formatPrice(product.precio)}</p>
      {showButton && (
        <Link to={`/productos/${product.id}`} className="btn">
          Ver detalle
        </Link>
      )}
    </article>
  );
}
