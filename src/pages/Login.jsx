import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    alert(`¡Bienvenido a NutriVida, ${correo}!`);
    navigate('/');
  };

  return (
    <main>
      <section className="form-container">
        <h2>Iniciar sesión</h2>

        <form id="form-login" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-correo">CORREO ELECTRÓNICO</label>
            <input
              type="email"
              id="login-correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">CONTRASEÑA</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              INGRESAR
            </button>
          </div>

          <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
            ¿No tienes cuenta aún?{' '}
            <Link to="/registro" style={{ color: '#4a3f2a', textDecoration: 'underline' }}>
              Regístrate aquí
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
