// Pruebas de la vista Carrito: renderizado condicional y eventos
import { screen, fireEvent } from '@testing-library/react';
import Carrito from '../pages/Carrito';
import { renderWithProviders, productoMock } from './helpers';

function precargarCarrito(items) {
  localStorage.setItem('nutrivida_cart', JSON.stringify(items));
}

describe('Carrito', () => {
  beforeEach(() => localStorage.clear());

  it('muestra un mensaje cuando el carrito está vacío', () => {
    renderWithProviders(<Carrito />);
    expect(screen.getByText(/Tu carrito de compras está vacío/)).toBeTruthy();
  });

  it('lista los productos y calcula el total', () => {
    precargarCarrito([
      { product: { ...productoMock, precio: 8000 }, cantidad: 2 },
      { product: { ...productoMock, id: 100, nombre: 'Otro', precio: 1000 }, cantidad: 1 }
    ]);
    const { container } = renderWithProviders(<Carrito />);
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
    expect(container.querySelector('#total-precio').textContent).toBe('$17.000');
  });

  it('al hacer clic en "Eliminar" quita el producto de la tabla', () => {
    precargarCarrito([{ product: { ...productoMock, precio: 8000 }, cantidad: 1 }]);
    renderWithProviders(<Carrito />);
    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.getByText(/Tu carrito de compras está vacío/)).toBeTruthy();
  });

  it('cambiar la cantidad actualiza el subtotal', () => {
    precargarCarrito([{ product: { ...productoMock, precio: 8000 }, cantidad: 1 }]);
    const { container } = renderWithProviders(<Carrito />);
    fireEvent.change(container.querySelector('.cant-input'), { target: { value: '3' } });
    expect(container.querySelector('#total-precio').textContent).toBe('$24.000');
  });
});
