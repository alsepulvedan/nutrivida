import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

export default function AdminOrdenes() {
  const { orders, formatPrice } = useData();
  const [busqueda, setBusqueda] = useState('');

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => {
      const cliente = `${o.cliente?.nombre ?? ''} ${o.cliente?.apellidos ?? ''} ${o.cliente?.correo ?? ''}`;
      return String(o.id).includes(q) || cliente.toLowerCase().includes(q);
    });
  }, [orders, busqueda]);

  return (
    <div className="container py-4">
      <AdminNav />

      <div className="mb-3">
        <h2 className="fw-bold mb-0">Órdenes y boletas</h2>
        <p className="text-muted mb-0">{orders.length} órdenes registradas.</p>
      </div>

      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por número de orden, nombre o correo del cliente"
        aria-label="Buscar orden"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {filtradas.length === 0 ? (
        <div className="alert alert-info">No se encontraron órdenes.</div>
      ) : (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>N° orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th className="text-end">Total</th>
                <th>Estado</th>
                <th className="text-end">Boleta</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((o) => (
                <tr key={o.id}>
                  <td className="fw-semibold">#{o.id}</td>
                  <td>{o.fecha}</td>
                  <td>
                    {o.cliente?.nombre} {o.cliente?.apellidos}
                    <div><small className="text-muted">{o.cliente?.correo}</small></div>
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
      )}
    </div>
  );
}
