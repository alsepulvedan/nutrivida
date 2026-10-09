import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminOrdenDetalle from './pages/admin/AdminOrdenDetalle';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm';
import AdminUsuarioCompras from './pages/admin/AdminUsuarioCompras';

import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import CompraError from './pages/CompraError';
import Nosotros from './pages/Nosotros';
import Carrito from './pages/Carrito';
import Blogs from './pages/Blogs';
import DetalleBlog from './pages/DetalleBlog';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';

export default function App() {
  return (
    <DataProvider>
      <CartProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
            <Route path="/compra-error" element={<CompraError />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<DetalleBlog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            {/* Rutas de administración: solo accesibles con rol admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/productos" element={<AdminProductos />} />
              <Route path="/admin/productos/criticos" element={<AdminProductos soloCriticos />} />
              <Route path="/admin/productos/nuevo" element={<AdminProductoForm key="nuevo" />} />
              <Route path="/admin/productos/:id/editar" element={<AdminProductoForm key="editar" />} />
              <Route path="/admin/categorias" element={<AdminCategorias />} />
              <Route path="/admin/ordenes" element={<AdminOrdenes />} />
              <Route path="/admin/ordenes/:id" element={<AdminOrdenDetalle />} />
              <Route path="/admin/usuarios" element={<AdminUsuarios />} />
              <Route path="/admin/usuarios/nuevo" element={<AdminUsuarioForm key="nuevo" />} />
              <Route path="/admin/usuarios/:id/editar" element={<AdminUsuarioForm key="editar" />} />
              <Route path="/admin/usuarios/:id/compras" element={<AdminUsuarioCompras />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </HashRouter>
      </CartProvider>
    </DataProvider>
  );
}