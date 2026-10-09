import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

const COLOR_ROL = { admin: 'bg-danger', nutricionista: 'bg-info text-dark', cliente: 'bg-secondary' };

export default function AdminUsuarios() {
  const { users, orders, currentUser, removeUser } = useData();
  const [busqueda, setBusqueda] = useState('');

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.nombre} ${u.apellidos} ${u.correo}`.toLowerCase().includes(q)
    );
  }, [users, busqueda]);

  const comprasDe = (correo) =>
    orders.filter((o) => o.cliente?.correo?.toLowerCase() === correo.toLowerCase()).length;

  const handleEliminar = (u) => {
    if (window.confirm(`¿Eliminar al usuario ${u.nombre} ${u.apellidos}?`)) {
      removeUser(u.id);
    }
  };

  return (
    <div className="container py-4">
      <AdminNav />

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="fw-bold mb-0">Usuarios</h2>
          <p className="text-muted mb-0">{users.length} cuentas registradas.</p>
        </div>
        <Link to="/admin/usuarios/nuevo" className="btn btn-success">
          <i className="bi bi-plus-lg me-1"></i> Nuevo usuario
        </Link>
      </div>

      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por nombre o correo"
        aria-label="Buscar usuario"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {filtrados.length === 0 ? (
        <div className="alert alert-info">No se encontraron usuarios.</div>
      ) : (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th className="text-center">Compras</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => {
                const esYo = currentUser && String(currentUser.id) === String(u.id);
                return (
                  <tr key={u.id}>
                    <td className="fw-semibold">
                      {u.nombre} {u.apellidos}
                      {esYo && <span className="badge bg-light text-dark border ms-2">Tú</span>}
                    </td>
                    <td>{u.correo}</td>
                    <td>
                      <span className={`badge ${COLOR_ROL[u.rol] || 'bg-secondary'}`}>{u.rol}</span>
                    </td>
                    <td className="text-center">{comprasDe(u.correo)}</td>
                    <td className="text-end text-nowrap">
                      <Link to={`/admin/usuarios/${u.id}/compras`} className="btn btn-sm btn-outline-secondary me-1">
                        Compras
                      </Link>
                      <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-primary me-1">
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={esYo}
                        title={esYo ? 'No puedes eliminar tu propia cuenta' : undefined}
                        onClick={() => handleEliminar(u)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
