// Pruebas de estado: lógica del carrito (CartContext)
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { productoMock } from './helpers';

// Componente auxiliar que expone el estado del carrito en el DOM
function CarritoDePrueba() {
  const { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrecio } = useCart();
  return (
    <div>
      <span data-testid="items">{totalItems}</span>
      <span data-testid="total">{totalPrecio}</span>
      <span data-testid="lineas">{cart.length}</span>
      <button onClick={() => addToCart(productoMock)}>agregar</button>
      <button onClick={() => addToCart({ ...productoMock, id: 100, enOferta: false })}>agregar-otro</button>
      <button onClick={() => removeFromCart(productoMock.id)}>quitar</button>
      <button onClick={clearCart}>vaciar</button>
    </div>
  );
}

describe('CartContext (estado del carrito)', () => {
  beforeEach(() => localStorage.clear());

  it('agrega un producto usando el precio de oferta', () => {
    render(<CartProvider><CarritoDePrueba /></CartProvider>);
    fireEvent.click(screen.getByText('agregar'));
    expect(screen.getByTestId('items').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('8000');
  });

  it('suma cantidad si el producto ya está en el carrito (no duplica la línea)', () => {
    render(<CartProvider><CarritoDePrueba /></CartProvider>);
    fireEvent.click(screen.getByText('agregar'));
    fireEvent.click(screen.getByText('agregar'));
    expect(screen.getByTestId('lineas').textContent).toBe('1');
    expect(screen.getByTestId('items').textContent).toBe('2');
  });

  it('elimina un producto y vacía el carrito', () => {
    render(<CartProvider><CarritoDePrueba /></CartProvider>);
    fireEvent.click(screen.getByText('agregar'));
    fireEvent.click(screen.getByText('agregar-otro'));
    fireEvent.click(screen.getByText('quitar'));
    expect(screen.getByTestId('lineas').textContent).toBe('1');
    fireEvent.click(screen.getByText('vaciar'));
    expect(screen.getByTestId('items').textContent).toBe('0');
  });

  it('persiste el carrito en localStorage', () => {
    render(<CartProvider><CarritoDePrueba /></CartProvider>);
    fireEvent.click(screen.getByText('agregar'));
    const guardado = JSON.parse(localStorage.getItem('nutrivida_cart'));
    expect(guardado[0].product.id).toBe(99);
  });

  it('lanza un error si useCart se usa fuera del CartProvider', () => {
    spyOn(console, 'error'); // React registra el error en consola; se silencia
    expect(() => render(<CarritoDePrueba />)).toThrowError(/CartProvider/);
  });
});
