import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

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
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={getNavLinkClass}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="cart">
          <Link to="/carrito">
            🛒 Carrito ({totalItems})
          </Link>
        </div>
      </div>

      <div className="user-links">
        <Link to="/login">Iniciar sesión</Link> |{' '}
        <Link to="/registro">Registrar usuario</Link>
      </div>
    </header>
  );
}
