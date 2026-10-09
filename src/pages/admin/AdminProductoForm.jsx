import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminNav from '../../components/AdminNav';
import { IMAGENES } from '../../data/imagenes';

function validar(form) {
  const errores = {};
  if (!form.nombre.trim()) errores.nombre = 'Ingresa el nombre del producto.';
  if (!form.categoriaId) errores.categoriaId = 'Selecciona una categoría.';

  const precio = Number(form.precio);
  if (form.precio === '' || !Number.isInteger(precio) || precio <= 0) {
    errores.precio = 'El precio debe ser un número entero mayor a 0.';
  }

  const stock = Number(form.stock);
  if (form.stock === '' || !Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un número entero, 0 o más.';
  }

  const critico = Number(form.stockCritico);
  if (form.stockCritico === '' || !Number.isInteger(critico) || critico < 0) {
    errores.stockCritico = 'El stock crítico debe ser un número entero, 0 o más.';
  }

  if (form.enOferta) {
    const descuento = Number(form.descuento);
    if (form.descuento === '' || !Number.isInteger(descuento) || descuento < 1 || descuento > 90) {
      errores.descuento = 'El descuento debe ser un entero entre 1 y 90.';
    }
  }

  if (!form.descripcion.trim()) errores.descripcion = 'Ingresa una descripción.';
  return errores;
}

export default function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, addProduct, editProduct, formatPrice } = useData();

  const editando = id !== undefined;
  const producto = editando ? products.find((p) => String(p.id) === String(id)) : null;

  const [form, setForm] = useState(() => ({
    nombre: producto?.nombre ?? '',
    categoriaId: producto?.categoriaId ?? categories[0]?.id ?? '',
    precio: producto?.precio ?? '',
    stock: producto?.stock ?? '',
    stockCritico: producto?.stockCritico ?? 5,
    enOferta: producto?.enOferta ?? false,
    descuento: producto?.descuento ? producto.descuento : '',
    descripcion: producto?.descripcion ?? '',
    imagen: producto?.imagen ?? IMAGENES[0].src
  }));
  const [errores, setErrores] = useState({});

  if (editando && !producto) {
    return (
      <div className="container py-4">
        <AdminNav />
        <div className="alert alert-warning">
          No existe un producto con id {id}.{' '}
          <Link to="/admin/productos">Volver al listado</Link>
        </div>
      </div>
    );
  }

  const opcionesImagen = IMAGENES.some((i) => i.src === form.imagen)
    ? IMAGENES
    : [...IMAGENES, { label: 'Imagen actual', src: form.imagen }];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    const categoria = categories.find((c) => c.id === form.categoriaId);
    const datos = {
      nombre: form.nombre.trim(),
      categoriaId: categoria.id,
      categoria: categoria.nombre,
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico),
      enOferta: form.enOferta,
      descuento: form.enOferta ? Number(form.descuento) : 0,
      descripcion: form.descripcion.trim(),
      imagen: form.imagen
    };

    if (editando) {
      editProduct(producto.id, datos);
    } else {
      addProduct(datos);
    }
    navigate('/admin/productos');
  };

  const campo = (name) => `form-control ${errores[name] ? 'is-invalid' : ''}`;

  const precioFinal =
    form.enOferta && Number(form.precio) > 0 && Number(form.descuento) > 0
      ? Math.round(Number(form.precio) * (1 - Number(form.descuento) / 100))
      : null;

  return (
    <div className="container py-4">
      <AdminNav />

      <h2 className="fw-bold mb-3">{editando ? `Editar producto #${producto.id}` : 'Nuevo producto'}</h2>

      <form onSubmit={handleSubmit} noValidate className="bg-white border rounded p-4">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className={campo('nombre')} value={form.nombre} onChange={handleChange} />
            <div className="invalid-feedback">{errores.nombre}</div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="categoriaId" className="form-label">Categoría</label>
            <select
              id="categoriaId"
              name="categoriaId"
              className={`form-select ${errores.categoriaId ? 'is-invalid' : ''}`}
              value={form.categoriaId}
              onChange={handleChange}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errores.categoriaId}</div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="precio" className="form-label">Precio (CLP)</label>
            <input id="precio" name="precio" type="number" min="1" className={campo('precio')} value={form.precio} onChange={handleChange} />
            <div className="invalid-feedback">{errores.precio}</div>
          </div>

          <div className="col-6 col-md-4">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input id="stock" name="stock" type="number" min="0" className={campo('stock')} value={form.stock} onChange={handleChange} />
            <div className="invalid-feedback">{errores.stock}</div>
          </div>

          <div className="col-6 col-md-4">
            <label htmlFor="stockCritico" className="form-label">Stock crítico</label>
            <input id="stockCritico" name="stockCritico" type="number" min="0" className={campo('stockCritico')} value={form.stockCritico} onChange={handleChange} />
            <div className="invalid-feedback">{errores.stockCritico}</div>
          </div>

          <div className="col-12 col-md-4">
            <div className="form-check mt-md-4">
              <input id="enOferta" name="enOferta" type="checkbox" className="form-check-input" checked={form.enOferta} onChange={handleChange} />
              <label htmlFor="enOferta" className="form-check-label">Producto en oferta</label>
            </div>
          </div>

          {form.enOferta && (
            <div className="col-12 col-md-4">
              <label htmlFor="descuento" className="form-label">Descuento (%)</label>
              <input id="descuento" name="descuento" type="number" min="1" max="90" className={campo('descuento')} value={form.descuento} onChange={handleChange} />
              <div className="invalid-feedback">{errores.descuento}</div>
              {precioFinal !== null && (
                <div className="form-text">Precio con oferta: {formatPrice(precioFinal)}</div>
              )}
            </div>
          )}

          <div className="col-12 col-md-4">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <select id="imagen" name="imagen" className="form-select" value={form.imagen} onChange={handleChange}>
              {opcionesImagen.map((i) => (
                <option key={i.label} value={i.src}>{i.label}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <img src={form.imagen} alt="Vista previa" width="72" height="72" style={{ objectFit: 'cover', borderRadius: 4 }} />
          </div>

          <div className="col-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows="3" className={campo('descripcion')} value={form.descripcion} onChange={handleChange} />
            <div className="invalid-feedback">{errores.descripcion}</div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-success">
            {editando ? 'Guardar cambios' : 'Crear producto'}
          </button>
          <Link to="/admin/productos" className="btn btn-outline-secondary">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
