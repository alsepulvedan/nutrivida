// Pruebas de validaciones del formulario de Registro
import { screen, fireEvent } from '@testing-library/react';
import Registro from '../pages/Registro';
import { renderWithProviders, resetStorage } from './helpers';

function escribir(container, name, value) {
  fireEvent.change(container.querySelector(`[name="${name}"]`), { target: { value } });
}

describe('Registro (validaciones)', () => {
  beforeEach(() => resetStorage());

  it('muestra error si el nombre está vacío', () => {
    const { container } = renderWithProviders(<Registro />);
    fireEvent.submit(container.querySelector('#form-registro'));
    expect(screen.getByRole('alert').textContent).toBe('Por favor, ingresa tu nombre.');
  });

  it('muestra error si los correos no coinciden', () => {
    const { container } = renderWithProviders(<Registro />);
    escribir(container, 'nombre', 'Ana');
    escribir(container, 'correo', 'ana@duoc.cl');
    escribir(container, 'correoConfirm', 'otra@duoc.cl');
    fireEvent.submit(container.querySelector('#form-registro'));
    expect(screen.getByRole('alert').textContent).toBe('Los correos electrónicos no coinciden.');
  });

  it('muestra error si la contraseña tiene menos de 6 caracteres', () => {
    const { container } = renderWithProviders(<Registro />);
    escribir(container, 'nombre', 'Ana');
    escribir(container, 'correo', 'ana@duoc.cl');
    escribir(container, 'correoConfirm', 'ana@duoc.cl');
    escribir(container, 'password', '123');
    fireEvent.submit(container.querySelector('#form-registro'));
    expect(screen.getByRole('alert').textContent).toContain('al menos 6 caracteres');
  });
});
