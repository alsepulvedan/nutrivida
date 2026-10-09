import React from 'react';
import { NavLink } from 'react-router-dom';

const SECCIONES = [
  { to: '/admin', label: 'Resumen', icon: 'bi-speedometer2', end: true },
  { to: '/admin/productos', label: 'Productos', icon: 'bi-box-seam' },
  { to: '/admin/categorias', label: 'Categorías', icon: 'bi-tags' },
  { to: '/admin/ordenes', label: 'Órdenes', icon: 'bi-receipt' },
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'bi-people' }
];

// Se usa <div> y no <nav> porque style.css aplica estilos globales a "nav a"
export default function AdminNav() {
  return (
    <div className="nav nav-pills flex-wrap gap-2 mb-4" role="navigation" aria-label="Secciones de administración">
      {SECCIONES.map(({ to, label, icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `nav-link border ${isActive ? 'active' : 'bg-white text-dark'}`
          }
        >
          <i className={`bi ${icon} me-1`}></i>
          {label}
        </NavLink>
      ))}
    </div>
  );
}
