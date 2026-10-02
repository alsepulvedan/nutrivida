import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`¡Gracias por suscribirte con ${email}! Pronto recibirás nuestras novedades.`);
    setEmail('');
  };

  return (
    <footer>
      <div className="footer-container">
        {/* Nombre de la tienda */}
        <div className="footer-logo">
          <p>Clínica Nutricional NutriVida</p>
        </div>

        {/* Categorías */}
        <div className="footer-categories">
          <Link to="/productos">Recuperación</Link> |{' '}
          <Link to="/productos">Rendimiento</Link> |{' '}
          <Link to="/productos">Bienestar</Link>
        </div>

        {/* Suscripción a Newsletter */}
        <div className="footer-newsletter">
          <p>Mantente en Contacto! Recibe nuestras Últimas Noticias</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Ingresar Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribirse</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
