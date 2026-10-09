import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';
import { IMAGENES } from '../../data/imagenes';

const slug = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const FORM_VACIO = { nombre: '', descripcion: '', imagen: IMAGENES[0].src };

export default function AdminCategorias() {
  const { categories, products, addCategory, editCategory, removeCategory, editProduct } = useData();
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');

  const contarProductos = (catId) => products.filter((p) => p.categoriaId === catId).length;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const limpiar = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setError('');
  };

  const handleEditar = (cat) => {
    setEditandoId(cat.id);
    setForm({ nombre: cat.nombre, descripcion: cat.descripcion || '', imagen: cat.imagen || IMAGENES[0].src });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    if (!nombre) {
      setError('Ingresa el nombre de la categoría.');
      return;
    }
    const repetida = categories.some(
      (c) => c.id !== editandoId && (c.nombre.toLowerCase() === nombre.toLowerCase() || c.id === slug(nombre))
    );
    if (repetida) {
      setError('Ya existe una categoría con ese nombre.');
      return;
    }

    const datos = { nombre, descripcion: form.descripcion.trim(), imagen: form.imagen };

    if (editandoId) {
      editCategory(editandoId, datos);
      // Los productos guardan el nombre de su categoría: lo mantenemos al día
      products
        .filter((p) => p.categoriaId === editandoId && p.categoria !== nombre)
        .forEach((p) => editProduct(p.id, { categoria: nombre }));
    } else {
      addCategory({ ...datos, id: slug(nombre) });
    }
    limpiar();
  };

  const handleEliminar = (cat) => {
    const total = contarProductos(cat.id);
    if (total > 0) {
      window.alert(
        `No se puede eliminar "${cat.nombre}": tiene ${total} producto(s) asociados. Muévelos a otra categoría primero.`
      );
      return;
    }
    if (window.confirm(`¿Eliminar la categoría "${cat.nombre}"?`)) {
      removeCategory(cat.id);
      if (editandoId === cat.id) limpiar();
    }
  };

  return (
    <div className="container py-4">
      <AdminNav />
      <h2 className="fw-bold mb-3">Categorías</h2>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <form onSubmit={handleSubmit} noValidate className="bg-white border rounded p-4">
            <h5 className="mb-3">{editandoId ? 'Editar categoría' : 'Nueva categoría'}</h5>

            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <div className="mb-3">
              <label htmlFor="cat-nombre" className="form-label">Nombre</label>
              <input id="cat-nombre" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="cat-descripcion" className="form-label">Descripción</label>
              <textarea id="cat-descripcion" name="descripcion" rows="3" className="form-control" value={form.descripcion} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="cat-imagen" className="form-label">Imagen</label>
              <select id="cat-imagen" name="imagen" className="form-select" value={form.imagen} onChange={handleChange}>
                {(IMAGENES.some((i) => i.src === form.imagen)
                  ? IMAGENES
                  : [...IMAGENES, { label: 'Imagen actual', src: form.imagen }]
                ).map((i) => (
                  <option key={i.label} value={i.src}>{i.label}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {editandoId ? 'Guardar cambios' : 'Crear categoría'}
              </button>
              {editandoId && (
                <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-7">
          {categories.length === 0 ? (
            <div className="alert alert-info">Aún no hay categorías. Crea la primera con el formulario.</div>
          ) : (
            <div className="table-responsive bg-white border rounded">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Categoría</th>
                    <th className="text-center">Productos</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="fw-semibold">{c.nombre}</div>
                        <small className="text-muted">{c.descripcion}</small>
                      </td>
                      <td className="text-center">{contarProductos(c.id)}</td>
                      <td className="text-end text-nowrap">
                        <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEditar(c)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(c)}>
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
      </div>
    </div>
  );
}
