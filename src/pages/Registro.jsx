import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    correoConfirm: '',
    password: '',
    passwordConfirm: '',
    telefono: '',
    region: '',
    comuna: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim();
    const correoConfirm = formData.correoConfirm.trim();
    const password = formData.password.trim();
    const passwordConfirm = formData.passwordConfirm.trim();
    const region = formData.region;
    const comuna = formData.comuna;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === '') {
      alert('Por favor, ingresa tu nombre completo.');
      return;
    }

    if (!regexEmail.test(correo)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (correo !== correoConfirm) {
      alert('Los correos electrónicos no coinciden.');
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (region === '') {
      alert('Por favor, selecciona una región.');
      return;
    }

    if (comuna === '') {
      alert('Por favor, selecciona una comuna.');
      return;
    }

    // Éxito
    alert('¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.');
    navigate('/login');
  };

  return (
    <main>
      <section className="form-container">
        <h2>Registro de usuario</h2>

        <form id="form-registro" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">NOMBRE COMPLETO</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">CORREO</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo-confirm">CONFIRMAR CORREO</label>
            <input
              type="email"
              id="correo-confirm"
              name="correoConfirm"
              value={formData.correoConfirm}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">CONTRASEÑA</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-confirm">CONFIRMAR CONTRASEÑA</label>
            <input
              type="password"
              id="password-confirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">TELÉFONO (opcional)</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Selectores de Región y Comuna según la pauta */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="region">Región</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione la región --</option>
                <option value="rm">Región Metropolitana de Santiago</option>
                <option value="araucania">Región de la Araucanía</option>
                <option value="nuble">Región de Ñuble</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comuna">Comuna</label>
              <select
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione la comuna --</option>
                <option value="linares">Linares</option>
                <option value="longavi">Longaví</option>
                <option value="concepcion">Concepción</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              REGISTRAR
            </button>
          </div>

          <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ color: '#4a3f2a', textDecoration: 'underline' }}>
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
