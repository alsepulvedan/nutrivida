import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  // 1. Obtenemos los datos del contexto global
  const { products, orders, users, categories, currentUser } = useData();

  // 2. Calculamos métricas en tiempo real
  // Total de ingresos sumando el total de todas las órdenes
  const totalVentas = orders.reduce((acc, order) => acc + (order.total || 0), 0);

  // Productos con stock crítico (menor o igual a su stockCritico, normalmente 5)
  const productosCriticos = products.filter(
    (p) => p.stock <= (p.stockCritico || 5)
  );

  return (
    <div className="container py-4">
      {/* Encabezado del Dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-0">Panel de Administración</h2>
          <p className="text-muted mb-0">
            Bienvenido, {currentUser?.nombre || 'Administrador'} (NutriVida)
          </p>
        </div>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-shop me-1"></i> Ir a la Tienda
        </Link>
      </div>

      {/* 3. Tarjetas de Métricas (Figura 9 de la pauta) */}
      <div className="row g-3 mb-4">
        {/* Total Ventas */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-white-50">Ventas Totales</h6>
                  <h4 className="card-title fw-bold mb-0">
                    ${totalVentas.toLocaleString('es-CL')}
                  </h4>
                  <small className="text-white-50">{orders.length} órdenes</small>
                </div>
                <i className="bi bi-cart-check fs-1 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Productos en Catálogo */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-white-50">Productos</h6>
                  <h4 className="card-title fw-bold mb-0">{products.length}</h4>
                  <small className="text-white-50">En {categories.length} categorías</small>
                </div>
                <i className="bi bi-box-seam fs-1 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Usuarios Registrados */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 bg-warning text-dark h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Usuarios</h6>
                  <h4 className="card-title fw-bold mb-0">{users.length}</h4>
                  <small className="text-muted">Clientes y personal</small>
                </div>
                <i className="bi bi-people fs-1 text-black-50"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Alerta de Stock Crítico */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className={`card shadow-sm border-0 text-white h-100 ${
              productosCriticos.length > 0 ? 'bg-danger' : 'bg-secondary'
            }`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-white-50">Stock Crítico</h6>
                  <h4 className="card-title fw-bold mb-0">{productosCriticos.length}</h4>
                  <small className="text-white-50">Por reponer</small>
                </div>
                <i className="bi bi-exclamation-triangle fs-1 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Módulos de Gestión (Accesos rápidos) */}
      <h4 className="fw-bold mb-3">Módulos de Gestión</h4>
      <div className="row g-3">
        {/* Gestión de Productos */}
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border">
            <div className="card-body text-center p-4">
              <i className="bi bi-boxes fs-1 text-success mb-2 d-block"></i>
              <h5 className="card-title fw-bold">Productos</h5>
              <p className="card-text text-muted small">
                Crear, editar, eliminar y revisar alertas de stock crítico del catálogo.
              </p>
              <Link to="/admin/productos" className="btn btn-outline-success w-100">
                Administrar Productos
              </Link>
            </div>
          </div>
        </div>

        {/* Órdenes / Ventas */}
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border">
            <div className="card-body text-center p-4">
              <i className="bi bi-receipt fs-1 text-primary mb-2 d-block"></i>
              <h5 className="card-title fw-bold">Órdenes y Boletas</h5>
              <p className="card-text text-muted small">
                Seguimiento de compras realizadas por clientes y visualización de comprobantes.
              </p>
              <Link to="/admin/ordenes" className="btn btn-outline-primary w-100">
                Ver Órdenes ({orders.length})
              </Link>
            </div>
          </div>
        </div>

        {/* Gestión de Usuarios */}
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border">
            <div className="card-body text-center p-4">
              <i className="bi bi-person-gear fs-1 text-warning mb-2 d-block"></i>
              <h5 className="card-title fw-bold">Usuarios y Roles</h5>
              <p className="card-text text-muted small">
                Administración de cuentas registradas: Administradores, Nutricionistas y Clientes.
              </p>
              <Link to="/admin/usuarios" className="btn btn-outline-warning w-100 text-dark">
                Administrar Usuarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}