import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

export default function Checkout() {
  const { cart, totalPrecio, clearCart } = useCart();
  const { currentUser, addOrder, formatPrice } = useData();
  const navigate = useNavigate();

  // Estado del formulario de cliente y despacho
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    calle: '',
    depto: '',
    region: 'rm',
    comuna: 'cerrillos',
    indicaciones: '',
    metodoPago: 'tarjeta',
    simularError: false
  });

  const [errorMsg, setErrorMsg] = useState('');

  // Requisito Anexo 1 (Pág. 6):
  // "Nota: Si el usuario ha iniciado sesión toda esta información se añadirá de forma automática."
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        nombre: currentUser.nombre || '',
        apellidos: currentUser.apellidos || '',
        correo: currentUser.correo || '',
        telefono: currentUser.telefono || '',
        calle: currentUser.calle || 'Los Crisantemos, Edificio Norte',
        depto: currentUser.depto || 'Depto 603',
        region: currentUser.region || 'rm',
        comuna: currentUser.comuna || 'cerrillos',
        indicaciones: currentUser.indicaciones || 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('No tienes productos en el carrito para realizar la compra.');
      return;
    }

    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.calle.trim()) {
      setErrorMsg('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    // Estructurar items comprados
    const itemsComprados = cart.map((item) => ({
      id: item.product.id,
      nombre: item.product.nombre,
      precio: item.product.precio,
      cantidad: item.cantidad,
      subtotal: item.product.precio * item.cantidad,
      imagen: item.product.imagen
    }));

    // Datos del cliente y despacho
    const ordenData = {
      cliente: {
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim(),
        calle: formData.calle.trim(),
        depto: formData.depto.trim(),
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones.trim()
      },
      items: itemsComprados,
      total: totalPrecio,
      metodoPago: formData.metodoPago === 'tarjeta' ? 'Tarjeta Débito/Crédito (WebPay)' : 'Transferencia Bancaria'
    };

    // Si se marcó simular error de pago (para probar vista de pago fallido)
    if (formData.simularError) {
      const ordenFallida = {
        ...ordenData,
        id: String(Math.floor(10000000 + Math.random() * 90000000)),
        estado: 'fallida',
        motivoError: 'Transacción rechazada por el banco emisor (Fondos insuficientes o límite excedido).'
      };
      // No vaciamos el carrito para que pueda reintentar
      navigate('/compra-error', { state: { orden: ordenFallida } });
      return;
    }

    // Flujo exitoso: registrar orden en base de datos simulada y vaciar carrito
    const nuevaOrden = addOrder({
      ...ordenData,
      estado: 'completada'
    });

    clearCart();
    navigate('/compra-exitosa', { state: { orden: nuevaOrden } });
  };

  if (cart.length === 0) {
    return (
      <main>
        <section className="form-container text-center">
          <h2>Checkout de Compra</h2>
          <div className="alert alert-warning">
            Tu carrito está vacío. Agrega productos antes de realizar el checkout.
          </div>
          <Link to="/productos" className="btn">
            Ir a la Tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Carrito de compra</h2>
        <span className="badge bg-primary fs-5 p-2">
          Total a pagar: {formatPrice(totalPrecio)}
        </span>
      </div>

      {currentUser ? (
        <div className="alert alert-info py-2 d-flex align-items-center justify-content-between">
          <span>
            <i className="bi bi-person-check-fill me-2"></i>
            Sesión iniciada como <strong>{currentUser.nombre} {currentUser.apellidos}</strong>. Datos autocompletados.
          </span>
          <span className="badge bg-success">Autocompletado Activo</span>
        </div>
      ) : (
        <div className="alert alert-light border py-2 d-flex align-items-center justify-content-between">
          <span>
            ¿Ya tienes cuenta? <Link to="/login" className="fw-bold">Inicia sesión</Link> para autocompletar tus datos.
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      {/* 1. Tabla Resumen de Productos (Figura 5 y 6 del Anexo) */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <strong>Resumen de Productos Seleccionados</strong>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end pe-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id}>
                  <td style={{ width: '70px' }}>
                    <img
                      src={item.product.imagen}
                      alt={item.product.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded border"
                    />
                  </td>
                  <td>
                    <strong>{item.product.nombre}</strong>
                    <div className="text-muted small">{item.product.categoria}</div>
                  </td>
                  <td>{formatPrice(item.product.precio)}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end pe-3 fw-bold">
                    {formatPrice(item.product.precio * item.cantidad)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Formulario de Datos y Envío (Figura 6 del Anexo) */}
      <form onSubmit={handlePagar} className="bg-white p-4 border rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-3">Información del cliente</h4>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label fw-bold">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Pedro"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Apellidos *</label>
            <input
              type="text"
              name="apellidos"
              className="form-control"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Ej: Hacker"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Correo electrónico *</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              placeholder="pedro.hacker20@example.com"
              required
            />
          </div>
        </div>

        <h4 className="border-bottom pb-2 mb-3">Dirección de entrega de los productos</h4>
        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-bold">Calle y número *</label>
            <input
              type="text"
              name="calle"
              className="form-control"
              value={formData.calle}
              onChange={handleChange}
              placeholder="Ej: Los Crisantemos, Edificio Norte"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Departamento / Casa (opcional)</label>
            <input
              type="text"
              name="depto"
              className="form-control"
              value={formData.depto}
              onChange={handleChange}
              placeholder="Ej: Depto 603"
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Región *</label>
            <select
              name="region"
              className="form-select"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="rm">Región Metropolitana de Santiago</option>
              <option value="valparaiso">Región de Valparaíso</option>
              <option value="biobio">Región del Biobío</option>
              <option value="araucania">Región de la Araucanía</option>
              <option value="nuble">Región de Ñuble</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Comuna *</label>
            <select
              name="comuna"
              className="form-select"
              value={formData.comuna}
              onChange={handleChange}
              required
            >
              <option value="cerrillos">Cerrillos</option>
              <option value="santiago">Santiago Centro</option>
              <option value="providencia">Providencia</option>
              <option value="las_condes">Las Condes</option>
              <option value="maipu">Maipú</option>
              <option value="concepcion">Concepción</option>
              <option value="linares">Linares</option>
              <option value="longavi">Longaví</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Indicaciones para la entrega (opcional)</label>
          <textarea
            name="indicaciones"
            rows="2"
            className="form-control"
            value={formData.indicaciones}
            onChange={handleChange}
            placeholder="Ej: El martes no estaremos en el depto, pero puede dejárselo con el conserje."
          ></textarea>
        </div>

        {/* Simulador de pasarela para evaluar ambos casos (Éxito y Error) */}
        <div className="p-3 mb-4 rounded border bg-light">
          <h6 className="fw-bold mb-2">Simulación de Pasarela de Pago:</h6>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="simularErrorSwitch"
              name="simularError"
              checked={formData.simularError}
              onChange={handleChange}
            />
            <label className="form-check-label text-danger fw-bold" htmlFor="simularErrorSwitch">
              Simular fallo en el pago (para visualizar pantalla de pago rechazado)
            </label>
          </div>
          <small className="text-muted d-block mt-1">
            {formData.simularError
              ? '⚠️ El pago será simulado como RECHAZADO por el banco emisor.'
              : '✅ El pago será simulado como EXITOSO y generará la boleta oficial.'}
          </small>
        </div>

        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <Link to="/carrito" className="btn btn-outline-secondary">
            ← Volver al carrito
          </Link>
          <button
            type="submit"
            className="btn btn-success btn-lg px-4"
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
          >
            Pagar ahora {formatPrice(totalPrecio)}
          </button>
        </div>
      </form>
    </main>
  );
}
