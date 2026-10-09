import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

export default function AdminOrdenDetalle() {
  const { id } = useParams();
  const { orders, formatPrice } = useData();
  const orden = orders.find((o) => String(o.id) === String(id));

  if (!orden) {
    return (
      <div className="container py-4">
        <AdminNav />
        <div className="alert alert-warning">
          No existe la orden #{id}. <Link to="/admin/ordenes">Volver al listado</Link>
        </div>
      </div>
    );
  }

  const c = orden.cliente || {};

  return (
    <div className="container py-4">
      <AdminNav />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/admin/ordenes" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i> Volver a órdenes
        </Link>
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => window.print()}>
          <i className="bi bi-printer me-1"></i> Imprimir boleta
        </button>
      </div>

      <div className="bg-white border rounded p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2 border-bottom pb-3 mb-3">
          <div>
            <h3 className="fw-bold mb-0">Boleta orden #{orden.id}</h3>
            <small className="text-muted">Fecha: {orden.fecha}</small>
          </div>
          <div className="text-end">
            <span className={`badge ${orden.estado === 'completada' ? 'bg-success' : 'bg-danger'}`}>
              {orden.estado}
            </span>
            <div><small className="text-muted">{orden.metodoPago}</small></div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <h6 className="text-muted">Cliente</h6>
            <div>{c.nombre} {c.apellidos}</div>
            <div>{c.correo}</div>
            {c.telefono && <div>{c.telefono}</div>}
          </div>
          <div className="col-md-6">
            <h6 className="text-muted">Dirección de entrega</h6>
            <div>{c.calle}{c.depto ? `, ${c.depto}` : ''}</div>
            <div>{c.comuna}, {c.region}</div>
            {c.indicaciones && <small className="text-muted">{c.indicaciones}</small>}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(orden.items || []).map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td className="text-end">{formatPrice(item.precio)}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end">{formatPrice(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">Total</th>
                <th className="text-end">{formatPrice(orden.total)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
