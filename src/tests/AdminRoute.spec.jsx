// Pruebas de la ruta protegida del panel de administración
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import AdminRoute from '../components/AdminRoute';
import { dataService } from '../services/dataService';
import { resetStorage } from './helpers';

function renderAdmin() {
  return render(
    <DataProvider>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<h1>Panel Admin</h1>} />
          </Route>
          <Route path="/login" element={<h1>Pantalla Login</h1>} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </MemoryRouter>
    </DataProvider>
  );
}

describe('AdminRoute (acceso por rol)', () => {
  beforeEach(() => resetStorage());

  it('sin sesión redirige a /login', () => {
    renderAdmin();
    expect(screen.getByText('Pantalla Login')).toBeTruthy();
  });

  it('un cliente es redirigido al Home', () => {
    dataService.login('pedro.hacker20@example.com', 'password123');
    renderAdmin();
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('un administrador puede ver el panel', () => {
    dataService.login('admin@nutrivida.cl', 'admin');
    renderAdmin();
    expect(screen.getByText('Panel Admin')).toBeTruthy();
  });
});
