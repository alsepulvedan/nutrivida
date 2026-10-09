import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';

const ROLES = ['cliente', 'nutricionista', 'admin'];
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminUsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, addUser, editUser } = useData();

  const editando = id !== undefined;
  const usuario = editando ? users.find((u) => String(u.id) === String(id)) : null;
  const esYo = Boolean(usuario && currentUser && String(currentUser.id) === String(usuario.id));

  const [form, setForm] = useState(() => ({
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    password: '',
    rol: usuario?.rol ?? 'cliente',
    telefono: usuario?.telefono ?? ''
  }));
  const [errores, setErrores] = useState({});

  if (editando && !usuario) {
    return (
      <div className="container py-4">
        <AdminNav />
        <div className="alert alert-warning">
          No existe un usuario con id {id}. <Link to="/admin/usuarios">Volver al listado</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validar = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'Ingresa el nombre.';
    if (!form.apellidos.trim()) errs.apellidos = 'Ingresa los apellidos.';

    const correo = form.correo.trim();
    if (!REGEX_CORREO.test(correo)) {
      errs.correo = 'Ingresa un correo válido.';
    } else if (
      users.some(
        (u) => u.correo.toLowerCase() === correo.toLowerCase() && String(u.id) !== String(usuario?.id)
      )
    ) {
      errs.correo = 'Ya existe un usuario con ese correo.';
    }

    if (!editando && !form.password) {
      errs.password = 'Define una contraseña.';
    } else if (form.password && form.password.length < 6) {
      errs.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    const datos = {
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim(),
      rol: form.rol,
      telefono: form.telefono.trim()
    };
    if (form.password) datos.password = form.password;

    if (editando) {
      editUser(usuario.id, datos);
    } else {
      addUser(datos);
    }
    navigate('/admin/usuarios');
  };

  const campo = (name) => `form-control ${errores[name] ? 'is-invalid' : ''}`;

  return (
    <div className="container py-4">
      <AdminNav />
      <h2 className="fw-bold mb-3">{editando ? `Editar usuario #${usuario.id}` : 'Nuevo usuario'}</h2>

      <form onSubmit={handleSubmit} noValidate className="bg-white border rounded p-4">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className={campo('nombre')} value={form.nombre} onChange={handleChange} />
            <div className="invalid-feedback">{errores.nombre}</div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="apellidos" className="form-label">Apellidos</label>
            <input id="apellidos" name="apellidos" className={campo('apellidos')} value={form.apellidos} onChange={handleChange} />
            <div className="invalid-feedback">{errores.apellidos}</div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input id="correo" name="correo" type="email" className={campo('correo')} value={form.correo} onChange={handleChange} />
            <div className="invalid-feedback">{errores.correo}</div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
            <input id="telefono" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="password" className="form-label">
              {editando ? 'Nueva contraseña' : 'Contraseña'}
            </label>
            <input id="password" name="password" type="password" autoComplete="new-password" className={campo('password')} value={form.password} onChange={handleChange} />
            <div className="invalid-feedback">{errores.password}</div>
            {editando && <div className="form-text">Déjala vacía para mantener la actual.</div>}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select id="rol" name="rol" className="form-select" value={form.rol} onChange={handleChange} disabled={esYo}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {esYo && <div className="form-text">No puedes cambiar tu propio rol.</div>}
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-success">
            {editando ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          <Link to="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
