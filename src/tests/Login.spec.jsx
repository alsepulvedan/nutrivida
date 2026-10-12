// Pruebas de formulario: estado, eventos, renderizado condicional y mocks (Login)
import { screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import { renderWithProviders, resetStorage } from './helpers';

function llenarYEnviar(container, correo, password) {
  fireEvent.change(container.querySelector('#login-correo'), { target: { value: correo } });
  fireEvent.change(container.querySelector('#login-password'), { target: { value: password } });
  fireEvent.submit(container.querySelector('#form-login'));
}

describe('Login', () => {
  beforeEach(() => {
    resetStorage();
    spyOn(window, 'alert'); // MOCK: evita que el alert bloquee el navegador de pruebas
  });

  it('actualiza el estado de los inputs cuando el usuario escribe', () => {
    const { container } = renderWithProviders(<Login />);
    const input = container.querySelector('#login-correo');
    fireEvent.change(input, { target: { value: 'test@duoc.cl' } });
    expect(input.value).toBe('test@duoc.cl');
  });

  it('NO muestra mensaje de error al cargar el formulario', () => {
    renderWithProviders(<Login />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('muestra error si la contraseña es incorrecta', () => {
    const { container } = renderWithProviders(<Login />);
    llenarYEnviar(container, 'admin@nutrivida.cl', 'incorrecta');
    expect(screen.getByRole('alert').textContent).toBe('Contraseña incorrecta.');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('con credenciales de admin muestra bienvenida y redirige a /admin', () => {
    const { container } = renderWithProviders(<Login />, {
      route: '/login', path: '/login',
      extraRoutes: <Route path="/admin" element={<h1>Panel Admin</h1>} />
    });
    llenarYEnviar(container, 'admin@nutrivida.cl', 'admin');
    expect(window.alert).toHaveBeenCalledWith('¡Bienvenido a NutriVida, Administrador!');
    expect(screen.getByText('Panel Admin')).toBeTruthy();
  });
});
