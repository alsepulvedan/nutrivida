import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

/**
 * Protege las rutas /admin/*: solo entra un usuario con sesión y rol "admin".
 * - Sin sesión → /login
 * - Con sesión pero sin rol admin → Home
 */
export default function AdminRoute() {
  const { currentUser, isLoading } = useData();
  const location = useLocation();

  // Mientras el DataProvider carga la sesión desde localStorage no decidimos nada
  if (isLoading) return null;

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (currentUser.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
