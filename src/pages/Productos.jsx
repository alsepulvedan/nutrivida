import React from 'react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  const { products } = useData();

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
