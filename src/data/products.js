export const products = [
  {
    id: 1,
    nombre: 'Proteína Suero Whey 1kg',
    categoria: 'Proteínas / Recuperación',
    precio: 24990,
    imagen: '/assets/img/producto1.jpg',
    descripcion:
      'Suplemento alimenticio a base de proteína concentrada de suero de leche de alta calidad. Ideal para favorecer la recuperación muscular post-entrenamiento y mantener el rendimiento físico óptimo.'
  },
  {
    id: 2,
    nombre: 'Creatina Monohidratada 300g',
    categoria: 'Fuerza / Rendimiento',
    precio: 18990,
    imagen: '/assets/img/producto2.jpg',
    descripcion:
      'Creatina monohidratada pura de alta absorción. Ayuda a incrementar la fuerza muscular, potencia el rendimiento en entrenamientos de alta intensidad y favorece la síntesis proteica.'
  },
  {
    id: 3,
    nombre: 'Multivitamínico Adulto 90 caps',
    categoria: 'Salud / Bienestar',
    precio: 12500,
    imagen: '/assets/img/producto3.jpg',
    descripcion:
      'Complejo multivitamínico y mineral completo diseñado para cubrir las necesidades diarias de adultos activos. Apoya el sistema inmunológico y aporta vitalidad.'
  },
  {
    id: 4,
    nombre: 'Omega 3 Ultra 120 caps',
    categoria: 'Salud Cardiovascular',
    precio: 14990,
    imagen: '/assets/img/producto4.jpg',
    descripcion:
      'Ácidos grasos esenciales EPA y DHA destilados molecularmente. Promueve una función cardiovascular saludable, protege la vista y apoya el funcionamiento cerebral.'
  }
];

export const formatPrice = (price) => {
  return `$${price.toLocaleString('es-CL')}`;
};
