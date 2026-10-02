import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function CompraError() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useData();

  const orden = location.state?.orden;

  return (
    <main>
      <div className="bg-white p-4 border rounded shadow-sm mb-4">
        {/* Cabecera de error (Figura 8 del Anexo) */}
        <div className="d-flex align-items-center gap-2 border-bottom pb-3 mb-4">
          <i className="bi bi-x-circle-fill text-danger fs-2"></i>
          <div>
            <h2 className="mb-0 fs-3 text-danger">
              No se pudo realizar el pago. nro #{orden?.id || '20240705'}
            </h2>
            <small className="text-muted">
              {orden?.motivoError || 'La entidad financiera ha rechazado la operación.'}
            </small>
          </div>
        </div>

        {/* Botón destacado "VOLVER A REALIZAR EL PAGO" (como en la Figura 8) */}
        <div className="text-center my-4">
          <Link
            to="/checkout"
            className="btn btn-success btn-lg px-5 py-3 fw-bold"
            style={{ backgroundColor: '#28a745', borderColor: '#28a745', fontSize: '1.2rem' }}
          >
            VOLVER A REALIZAR EL PAGO
          </Link>
        </div>

        {orden && (
          <>
            <h5 className="border-bottom pb-2 mb-3">Detalle del intento de compra</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold mb-0">Nombre</label>
                <div className="p-2 bg-light border rounded">
                  {orden.cliente?.nombre}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold mb-0">Apellidos</label>
                <div className="p-2 bg-light border rounded">
                  {orden.cliente?.apellidos}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold mb-0">Correo</label>
                <div className="p-2 bg-light border rounded">
                  {orden.cliente?.correo}
                </div>
              </div>
            </div>

            <h5 className="border-bottom pb-2 mb-3">Dirección de entrega de los productos</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-8">
                <label className="form-label text-muted small fw-bold mb-0">Calle</label>
                <div className="p-2 bg-light border rounded">
                  {orden.cliente?.calle}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold mb-0">Departamento</label>
                <div className="p-2 bg-light border rounded">
                  {orden.cliente?.depto || '-'}
                </div>
              </div>
            </div>

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

            <div className="text-end p-3 bg-light border rounded">
              <span className="fs-5 me-3">Total adeudado:</span>
              <strong className="fs-3 text-danger">{formatPrice(orden.total)}</strong>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
