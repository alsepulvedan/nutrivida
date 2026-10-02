import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function Blogs() {
  return (
    <main>
      <section className="blogs-container">
        <h2>NOTICIAS IMPORTANTES</h2>

        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <div className="blog-texto">
              <h3>{blog.titulo}</h3>
              <p>{blog.resumen}</p>
              <Link to={`/blogs/${blog.id}`} className="btn">
                VER ARTICULO
              </Link>
            </div>
            <img src={blog.imagen} alt={blog.titulo} />
          </article>
        ))}
      </section>
    </main>
  );
}
