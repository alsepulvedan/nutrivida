import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

export default function AdminUsuarioCompras() {
  const { id } = useParams();
  const { users, orders, formatPrice } = useData();
  const usuario = users.find((u) => String(u.id) === String(id));

  if (!usuario) {
    return (
      <div className="container py-4">
        <AdminNav />
        <div className="alert alert-warning">
          No existe un usuario con id {id}. <Link to="/admin/usuarios">Volver al listado</Link>
        </div>
      </div>
    );
  }

  const compras = orders.filter(
    (o) => o.cliente?.correo?.toLowerCase() === usuario.correo.toLowerCase()
  );
  const totalGastado = compras
    .filter((o) => o.estado === 'completada')
    .reduce((acc, o) => acc + (o.total || 0), 0);

  return (
    <div className="container py-4">
      <AdminNav />

      <Link to="/admin/usuarios" className="btn btn-outline-secondary btn-sm mb-3">
        <i className="bi bi-arrow-left me-1"></i> Volver a usuarios
      </Link>

      <h2 className="fw-bold mb-0">Historial de compras</h2>
      <p className="text-muted">
        {usuario.nombre} {usuario.apellidos} · {usuario.correo}
      </p>

      {compras.length === 0 ? (
        <div className="alert alert-info">Este usuario aún no tiene compras.</div>
      ) : (
        <>
          <div className="table-responsive bg-white border rounded mb-3">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>N° orden</th>
                  <th>Fecha</th>
                  <th className="text-center">Productos</th>
                  <th className="text-end">Total</th>
                  <th>Estado</th>
                  <th className="text-end">Boleta</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((o) => (
                  <tr key={o.id}>
                    <td className="fw-semibold">#{o.id}</td>
                    <td>{o.fecha}</td>
                    <td className="text-center">
                      {(o.items || []).reduce((acc, i) => acc + (Number(i.cantidad) || 0), 0)}
                    </td>
                    <td className="text-end">{formatPrice(o.total)}</td>
                    <td>
                      <span className={`badge ${o.estado === 'completada' ? 'bg-success' : 'bg-danger'}`}>
                        {o.estado}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-primary">
                        Ver boleta
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fw-semibold">Total gastado en compras completadas: {formatPrice(totalGastado)}</p>
        </>
      )}
    </div>
  );
}
