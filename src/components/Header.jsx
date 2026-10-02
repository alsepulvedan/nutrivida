import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

export default function Header() {
  const { totalItems, totalPrecio } = useCart();
  const { currentUser, logout, formatPrice } = useData();

  const getNavLinkClass = ({ isActive }) => (isActive ? 'active-link' : '');

  return (
    <header>
      <div className="top-bar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>NutriVida</h1>
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={getNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/categorias" className={getNavLinkClass}>
                Categorías
              </NavLink>
            </li>
            <li>
              <NavLink to="/ofertas" className={getNavLinkClass}>
                Ofertas 🔥
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={getNavLinkClass}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className={getNavLinkClass}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={getNavLinkClass}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={getNavLinkClass}>
                Contacto
              </NavLink>
            </li>
            {currentUser?.rol === 'admin' && (
              <li>
                <NavLink to="/admin" className={getNavLinkClass} style={{ color: '#b27b00', fontWeight: 'bold' }}>
                  ⚙️ Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="cart">
          <Link to="/carrito" className="btn btn-sm btn-outline-dark fw-bold">
            🛒 Carrito ({totalItems}) {totalPrecio > 0 && `• ${formatPrice(totalPrecio)}`}
          </Link>
        </div>
      </div>

      <div className="user-links d-flex justify-content-end align-items-center gap-2">
        {currentUser ? (
          <>
            <span>
              Hola, <strong>{currentUser.nombre}</strong> ({currentUser.rol})
            </span>
            {currentUser.rol === 'admin' && (
              <>
                | <Link to="/admin" className="text-warning-emphasis fw-bold">Panel de Administración</Link>
              </>
            )}
            | <button onClick={logout} className="btn btn-link btn-sm p-0 text-danger text-decoration-none">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link> |{' '}
            <Link to="/registro">Registrar usuario</Link>
          </>
        )}
      </div>
    </header>
  );
}
