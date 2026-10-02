import React, { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contenido: ''
  });
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim().toLowerCase();
    const contenido = formData.contenido.trim();

    // Reglas de validación según pauta y main.js
    if (nombre === '') {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    if (nombre.length > 100) {
      alert('El nombre no puede superar los 100 caracteres.');
      return;
    }

    if (correo === '') {
      alert('Por favor, ingresa tu correo.');
      return;
    }
    if (correo.length > 100) {
      alert('El correo no puede superar los 100 caracteres.');
      return;
    }

    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    const dominioValido = dominiosPermitidos.some((dominio) => correo.endsWith(dominio));
    if (!dominioValido) {
      alert('El correo debe pertenecer a uno de los dominios permitidos: @duoc.cl, @profesor.duoc.cl o @gmail.com');
      return;
    }

    if (contenido === '') {
      alert('Por favor, escribe tu mensaje.');
      return;
    }
    if (contenido.length > 500) {
      alert('El mensaje no puede superar los 500 caracteres.');
      return;
    }

    // Éxito
    alert('¡Mensaje enviado con éxito!');
    setMensajeExito(true);
    setFormData({ nombre: '', correo: '', contenido: '' });
    setTimeout(() => setMensajeExito(false), 4000);
  };

  return (
    <main>
      <section className="form-container">
        <h2>FORMULARIO DE CONTACTOS</h2>

        {mensajeExito && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
              borderRadius: '4px',
              textAlign: 'center'
            }}
          >
            ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
          </div>
        )}

        <form id="form-contacto" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contacto-nombre">NOMBRE COMPLETO</label>
            <input
              type="text"
              id="contacto-nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contacto-correo">CORREO</label>
            <input
              type="email"
              id="contacto-correo"
              name="correo"
              placeholder="ejemplo@duoc.cl"
              value={formData.correo}
              onChange={handleChange}
              maxLength={100}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="contacto-contenido">CONTENIDO</label>
            <textarea
              id="contacto-contenido"
              name="contenido"
              rows={4}
              cols={50}
              value={formData.contenido}
              onChange={handleChange}
              maxLength={500}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              ENVIAR MENSAJE
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
