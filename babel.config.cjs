// Babel solo se usa para las pruebas (Vite sigue compilando la app normal).
// babel-plugin-istanbul instrumenta el código para medir la cobertura.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { chrome: '100' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  env: {
    test: {
      plugins: [['istanbul', { exclude: ['src/tests/**', 'node_modules/**'] }]]
    }
  }
};
