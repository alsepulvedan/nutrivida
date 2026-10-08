import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import tienda from '../assets/img/tienda.jpg';

export default function Home() {
  const { products } = useData();

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
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/productos" className="btn">
              ver productos
            </Link>
            <Link to="/ofertas" className="btn" style={{ backgroundColor: '#ffc107', borderColor: '#d39e00' }}>
              ver ofertas 🔥
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={tienda} alt="Imagen de la tienda" />
        </div>
      </section>

      {/* 2. Sección de Productos */}
      <section id="productos" className="productos-lista">
        <h3>Nuestros Productos</h3>
        <div className="grid-productos">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
