import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

const esCritico = (p) => Number(p.stock) <= Number(p.stockCritico);

export default function AdminProductos({ soloCriticos = false }) {
  const { products, categories, removeProduct, formatPrice } = useData();
  const [busqueda, setBusqueda] = useState('');
  const [categoriaId, setCategoriaId] = useState('todas');

  const totalCriticos = products.filter(esCritico).length;

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!soloCriticos || esCritico(p)) &&
        (categoriaId === 'todas' || p.categoriaId === categoriaId) &&
        (q === '' || p.nombre.toLowerCase().includes(q))
    );
  }, [products, soloCriticos, categoriaId, busqueda]);

  const handleEliminar = (p) => {
    if (window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) {
      removeProduct(p.id);
    }
  };

  return (
    <div className="container py-4">
      <AdminNav />

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="fw-bold mb-0">
            {soloCriticos ? 'Productos con stock crítico' : 'Productos'}
          </h2>
          <p className="text-muted mb-0">
            {soloCriticos
              ? 'Productos que llegaron o bajaron del stock mínimo definido.'
              : 'Crea, edita y elimina los productos del catálogo.'}
          </p>
        </div>
        <div className="d-flex gap-2">
          {soloCriticos ? (
            <Link to="/admin/productos" className="btn btn-outline-secondary">
              Ver todos
            </Link>
          ) : (
            <Link to="/admin/productos/criticos" className="btn btn-outline-danger">
              <i className="bi bi-exclamation-triangle me-1"></i>
              Stock crítico ({totalCriticos})
            </Link>
          )}
          <Link to="/admin/productos/nuevo" className="btn btn-success">
            <i className="bi bi-plus-lg me-1"></i>
            Nuevo producto
          </Link>
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por nombre"
            aria-label="Buscar producto por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="alert alert-info">
          {soloCriticos
            ? 'No hay productos con stock crítico.'
            : 'No se encontraron productos con esos filtros.'}
        </div>
      ) : (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      width="48"
                      height="48"
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                  </td>
                  <td className="fw-semibold">{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td className="text-end">
                    {p.enOferta ? (
                      <>
                        <small className="text-muted text-decoration-line-through me-1">
                          {formatPrice(p.precio)}
                        </small>
                        <span className="text-success fw-semibold">
                          {formatPrice(p.precioOferta)}
                        </span>
                      </>
                    ) : (
                      formatPrice(p.precio)
                    )}
                  </td>
                  <td className="text-center">
                    {Number(p.stock) === 0 ? (
                      <span className="badge bg-danger">Agotado</span>
                    ) : esCritico(p) ? (
                      <span className="badge bg-warning text-dark">{p.stock} (crítico)</span>
                    ) : (
                      <span className="badge bg-success">{p.stock}</span>
                    )}
                  </td>
                  <td className="text-end text-nowrap">
                    <Link
                      to={`/admin/productos/${p.id}/editar`}
                      className="btn btn-sm btn-outline-primary me-1"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(p)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
