import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function DetalleBlog() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id, 10)) || blogs[0];

  return (
    <main>
      <div style={{ marginBottom: '15px' }}>
        <Link to="/blogs" className="btn btn-volver">
          ← Volver a Blogs
        </Link>
      </div>

      <section className="detalle-container">
        <div className="detalle-imagen">
          <img src={blog.imagen} alt={blog.titulo} />
        </div>
        <div className="detalle-info">
          <h2>{blog.titulo}</h2>
          <div className="descripcion" style={{ whiteSpace: 'pre-line' }}>
            {blog.parrafos.map((parrafo, idx) => (
              <p key={idx} style={{ marginBottom: '12px' }}>
                {parrafo}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
