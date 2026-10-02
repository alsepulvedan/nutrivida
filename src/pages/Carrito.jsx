import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function Carrito() {
  const { cart, updateQuantity, removeFromCart, totalPrecio, clearCart } = useCart();

  const handleCheckout = () => {
    alert('¡Gracias por tu compra en NutriVida! En breve recibirás la confirmación de tu pedido.');
    clearCart();
  };

  return (
    <main>
      <section className="carrito-container">
        <h2>Carrito de Compras</h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              Tu carrito de compras está vacío actualmente.
            </p>
            <Link to="/productos" className="btn">
              Explorar Catálogo de Productos
            </Link>
          </div>
        ) : (
          <>
            <table className="tabla-carrito">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const subtotal = item.product.precio * item.cantidad;
                  return (
                    <tr key={item.product.id}>
                      <td className="prod-td">
                        <img src={item.product.imagen} alt={item.product.nombre} />
                        <span>{item.product.nombre}</span>
                      </td>
                      <td>{formatPrice(item.product.precio)}</td>
                      <td>
                        <input
                          type="number"
                          value={item.cantidad}
                          min="1"
                          className="cant-input"
                          onChange={(e) =>
                            updateQuantity(item.product.id, e.target.value)
                          }
                        />
                      </td>
                      <td>{formatPrice(subtotal)}</td>
                      <td>
                        <button
                          className="btn-eliminar"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="resumen-carrito">
              <p>
                <strong>Total:</strong>{' '}
                <span id="total-precio">{formatPrice(totalPrecio)}</span>
              </p>
              <div className="acciones-carrito">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                >
                  Limpiar Carrito
                </button>
                <Link to="/productos" className="btn">
                  Seguir comprando
                </Link>
                <Link
                  to="/checkout"
                  id="btn-checkout"
                  className="btn btn-success text-white"
                  style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                >
                  Comprar ahora →
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
