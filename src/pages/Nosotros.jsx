import React from 'react';
import { Link } from 'react-router-dom';

export default function Nosotros() {
  return (
    <main>
      <section className="form-container" style={{ maxWidth: '850px' }}>
        <h2>Sobre Clínica Nutricional NutriVida</h2>

        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '15px' }}>
            En <strong>NutriVida</strong> somos una clínica nutricional y tienda especializada dedicada
            a promover hábitos de vida saludables, rendimiento deportivo y bienestar integral. Nuestro
            equipo multidisciplinario de profesionales de la salud acompaña a cada persona en su proceso
            de transformación física y nutricional.
          </p>

          <h3 style={{ marginTop: '25px', marginBottom: '10px' }}>Nuestra Misión</h3>
          <p style={{ marginBottom: '15px' }}>
            Brindar asesoría nutricional basada en evidencia científica y suplementos de la más alta
            calidad para que nuestros pacientes y clientes alcancen sus metas de salud y rendimiento de
            forma segura y sostenible.
          </p>

          <h3 style={{ marginTop: '25px', marginBottom: '10px' }}>Nuestra Visión</h3>
          <p style={{ marginBottom: '15px' }}>
            Ser el centro nutricional y plataforma digital de referencia a nivel nacional, reconocidos por
            la excelencia en atención clínica, innovación en servicios y productos de vanguardia.
          </p>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link to="/productos" className="btn" style={{ marginRight: '10px' }}>
              Ver Productos
            </Link>
            <Link to="/contacto" className="btn">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
