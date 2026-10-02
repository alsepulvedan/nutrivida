import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <main>
      {/* 1. Banner Principal */}
      <section className="hero">
        <div className="hero-text">
          <h2>TIENDA ONLINE</h2>
          <p>
            Nuestra tienda ofrece productos de alta calidad pensados para tus necesidades
            diarias. Explora nuestro catálogo y descubre nuestras ofertas.
          </p>
          <Link to="/productos" className="btn">
            ver productos
          </Link>
        </div>
        <div className="hero-image">
          <img src="/assets/img/tienda.jpg" alt="Imagen de la tienda" />
        </div>
      </section>

      {/* 2. Sección de Productos */}
      <section id="productos" className="productos-lista">
        <h3>Nuestros Productos</h3>
        <div className="grid-productos">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
