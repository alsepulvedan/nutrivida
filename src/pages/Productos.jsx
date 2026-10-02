import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  return (
    <main>
      <section className="productos-lista">
        <h2>Catálogo de Productos</h2>

        <div className="grid-productos">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
