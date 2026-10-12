// Utilidades compartidas por las pruebas
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import { CartProvider } from '../context/CartContext';
import { dataService } from '../services/dataService';

// Deja localStorage limpio y con los datos semilla antes de cada prueba
export function resetStorage() {
  localStorage.clear();
  dataService.init();
}

// Renderiza un componente envuelto en los providers reales de la app y un router en memoria
export function renderWithProviders(ui, { route = '/', path = '*', extraRoutes = null } = {}) {
  return render(
    <DataProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
            {extraRoutes}
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </DataProvider>
  );
}

// Producto de prueba reutilizable
export const productoMock = {
  id: 99,
  nombre: 'Producto de Prueba',
  categoria: 'Proteínas / Recuperación',
  categoriaId: 'proteinas',
  precio: 10000,
  precioOferta: 8000,
  enOferta: true,
  descuento: 20,
  imagen: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
  stock: 10,
  stockCritico: 5
};
