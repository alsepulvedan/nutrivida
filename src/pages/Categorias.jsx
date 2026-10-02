import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

export default function Categorias() {
  const { categories, products } = useData();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? products
      : products.filter(
          (p) =>
            p.categoriaId === categoriaSeleccionada ||
            p.categoria.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
        );

  return (
    <main>
      <section className="mb-4">
        <h2 className="mb-3">Explorar por Categorías</h2>
        <p className="text-muted">
          Selecciona una categoría para filtrar nuestro catálogo de suplementos y productos nutricionales.
        </p>

        {/* Botones / Tarjetas de selección de categoría (Inspirado en Figura 4 del Anexo) */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <button
              type="button"
              className={`btn w-100 p-3 h-100 text-center ${
                categoriaSeleccionada === 'todas' ? 'btn-dark' : 'btn-outline-dark bg-white'
              }`}
              onClick={() => setCategoriaSeleccionada('todas')}
            >
              <i className="bi bi-grid-fill d-block fs-3 mb-1"></i>
              <strong>Todas las categorías</strong>
              <small className="d-block text-muted">({products.length} productos)</small>
            </button>
          </div>

          {categories.map((cat) => {
            const totalEnCat = products.filter(
              (p) =>
                p.categoriaId === cat.id ||
                p.categoria.toLowerCase().includes(cat.nombre.toLowerCase())
            ).length;

            const isSelected = categoriaSeleccionada === cat.id;

            return (
              <div key={cat.id} className="col-6 col-md-3">
                <button
                  type="button"
                  className={`btn w-100 p-3 h-100 text-center ${
                    isSelected ? 'btn-dark' : 'btn-outline-dark bg-white'
                  }`}
                  onClick={() => setCategoriaSeleccionada(cat.id)}
                >
                  <i className="bi bi-tag-fill d-block fs-3 mb-1 text-success"></i>
                  <strong>{cat.nombre}</strong>
                  <small className="d-block text-muted">({totalEnCat} productos)</small>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grilla de productos filtrados */}
      <section className="productos-lista">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>
            {categoriaSeleccionada === 'todas'
              ? 'Todos los Productos'
              : categories.find((c) => c.id === categoriaSeleccionada)?.nombre || 'Categoría seleccionada'}
          </h3>
          <span className="badge bg-secondary fs-6">
            {productosFiltrados.length} encontrados
          </span>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            No se encontraron productos en esta categoría por el momento.
          </div>
        ) : (
          <div className="grid-productos">
            {productosFiltrados.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
