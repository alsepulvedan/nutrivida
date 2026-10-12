// Configuración de Karma: ejecuta las pruebas Jasmine en Chrome (modo headless)
// y genera el reporte de cobertura en /coverage.

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Punto de entrada único que importa todos los *.spec.jsx
    files: [{ pattern: 'src/tests/index.js', watched: false }],

    preprocessors: {
      'src/tests/index.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' },
            // El proyecto es "type": "module": permite imports sin extensión (igual que Vite)
            resolve: { fullySpecified: false }
          },
          // Imágenes y CSS no se necesitan en las pruebas: se tratan como recursos
          { test: /\.(png|jpe?g|gif|svg|webp)$/i, type: 'asset/inline' },
          { test: /\.css$/i, type: 'asset/resource' }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text', subdir: '.', file: 'coverage.txt' }
      ]
    },

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true,
    autoWatch: false
  });
};
