import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, currentUser, logout } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!correo.trim() || !password.trim()) {
      setErrorMsg('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    const res = login(correo.trim(), password.trim());
    if (!res.success) {
      setErrorMsg(res.message || 'Credenciales inválidas.');
      return;
    }

    alert(`¡Bienvenido a NutriVida, ${res.user.nombre}!`);

    if (res.user.rol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  if (currentUser) {
    return (
      <main>
        <section className="form-container text-center">
          <h2>Sesión Activa</h2>
          <div className="alert alert-success">
            Has iniciado sesión como <strong>{currentUser.nombre} {currentUser.apellidos}</strong> ({currentUser.correo})
            <br />
            <span className="badge bg-primary mt-2">Rol: {currentUser.rol.toUpperCase()}</span>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-3">
            {currentUser.rol === 'admin' && (
              <Link to="/admin" className="btn btn-warning">
                Ir al Panel Admin ⚙️
              </Link>
            )}
            <button className="btn btn-danger" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="form-container">
        <h2>Iniciar sesión</h2>

        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form id="form-login" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-correo">CORREO ELECTRÓNICO</label>
            <input
              type="email"
              id="login-correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com o admin@nutrivida.cl"
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
              placeholder="admin / password123"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              INGRESAR
            </button>
          </div>

          <div className="mt-3 p-2 bg-light border rounded text-center small text-muted">
            <strong>Cuentas de prueba:</strong>
            <br />
            Admin: <code>admin@nutrivida.cl</code> / <code>admin</code>
            <br />
            Cliente: <code>pedro.hacker20@example.com</code> / <code>password123</code>
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
