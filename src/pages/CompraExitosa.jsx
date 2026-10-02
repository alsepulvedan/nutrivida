import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function CompraExitosa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice, orders } = useData();

  // Obtener orden desde el router state o tomar la última generada
  const orden = location.state?.orden || orders[0];

  if (!orden) {
    return (
      <main>
        <section className="form-container text-center">
          <h2>No se encontró información de la compra</h2>
          <Link to="/" className="btn mt-3">
            Volver al Inicio
          </Link>
        </section>
      </main>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    alert(`Boleta digital enviada exitosamente a ${orden.cliente?.correo}`);
  };

  return (
    <main>
      <div className="bg-white p-4 border rounded shadow-sm mb-4">
        {/* Cabecera de la boleta / orden (Figura 7 del Anexo) */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill text-success fs-2"></i>
            <div>
              <h2 className="mb-0 fs-3 text-success">
                Se ha realizado la compra. nro #{orden.id}
              </h2>
              <small className="text-muted">Fecha de emisión: {orden.fecha}</small>
            </div>
          </div>
          <span className="badge bg-light text-dark border p-2">
            Código orden: ORDER-{orden.id}
          </span>
        </div>

        {/* Datos del Cliente y Despacho */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label text-muted small fw-bold mb-0">Nombre</label>
            <div className="p-2 bg-light border rounded fw-semibold">
              {orden.cliente?.nombre}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label text-muted small fw-bold mb-0">Apellidos</label>
            <div className="p-2 bg-light border rounded fw-semibold">
              {orden.cliente?.apellidos}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label text-muted small fw-bold mb-0">Correo</label>
            <div className="p-2 bg-light border rounded fw-semibold">
              {orden.cliente?.correo}
            </div>
          </div>
        </div>

        <h5 className="border-bottom pb-2 mb-3">Dirección de entrega de los productos</h5>
        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label text-muted small fw-bold mb-0">Calle</label>
            <div className="p-2 bg-light border rounded">
              {orden.cliente?.calle || 'Los Crisantemos, Edificio Norte'}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label text-muted small fw-bold mb-0">Departamento (opcional)</label>
            <div className="p-2 bg-light border rounded">
              {orden.cliente?.depto || 'Depto 603'}
            </div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold mb-0">Región</label>
            <div className="p-2 bg-light border rounded">
              {orden.cliente?.region === 'rm' ? 'Región Metropolitana de Santiago' : orden.cliente?.region}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold mb-0">Comuna</label>
            <div className="p-2 bg-light border rounded text-capitalize">
              {orden.cliente?.comuna}
            </div>
          </div>
        </div>

        {orden.cliente?.indicaciones && (
          <div className="mb-4">
            <label className="form-label text-muted small fw-bold mb-0">Indicaciones para la entrega</label>
            <div className="p-2 bg-light border rounded fst-italic">
              "{orden.cliente.indicaciones}"
            </div>
          </div>
        )}

        {/* Tabla de Productos Comprados */}
        <h5 className="border-bottom pb-2 mb-3">Detalle de Productos</h5>
        <div className="table-responsive mb-4">
          <table className="table align-middle">
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
              {orden.items?.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ width: '60px' }}>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                      className="rounded border"
                    />
                  </td>
                  <td><strong>{item.nombre}</strong></td>
                  <td>{formatPrice(item.precio)}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end pe-3">{formatPrice(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Pagado */}
        <div className="text-end p-3 bg-light border rounded mb-4">
          <span className="fs-5 me-3">Total pagado:</span>
          <strong className="fs-3 text-success">{formatPrice(orden.total)}</strong>
        </div>

        {/* Botones de Acción (Figura 7 del Anexo) */}
        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-danger px-4"
            onClick={handlePrint}
          >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Imprimir boleta en PDF
          </button>
          <button
            type="button"
            className="btn btn-outline-dark px-4"
            onClick={handleSendEmail}
          >
            <i className="bi bi-envelope me-2"></i>
            Enviar boleta por email
          </button>
          <Link to="/" className="btn btn-secondary px-4">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}
