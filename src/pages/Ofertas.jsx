import React from 'react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Ofertas() {
  const { getOfferProducts, formatPrice } = useData();
  const ofertas = getOfferProducts();

  return (
    <main>
      {/* Banner de Ofertas */}
      <section
        className="p-4 mb-4 rounded border text-center"
        style={{
          background: 'linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%)',
          borderColor: '#ffeeba'
        }}
      >
        <span className="badge bg-danger fs-6 mb-2">🔥 PROMOCIONES ESPECIALES</span>
        <h2 className="text-dark fw-bold">Ofertas de la Semana en NutriVida</h2>
        <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          Aprovecha descuentos exclusivos en suplementos deportivos, vitaminas y nutrición clínica.
          ¡Stock limitado hasta agotar existencias!
        </p>
      </section>

      {/* Listado de Productos en Oferta */}
      <section className="productos-lista">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Productos con Descuento ({ofertas.length})</h3>
          <Link to="/productos" className="btn btn-sm btn-outline-secondary">
            Ver catálogo completo →
          </Link>
        </div>

        {ofertas.length === 0 ? (
          <div className="alert alert-warning text-center py-4">
            No hay productos en oferta actualmente. Vuelve a consultar pronto.
          </div>
        ) : (
          <div className="grid-productos">
            {ofertas.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
