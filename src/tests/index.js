// Carga automáticamente todos los archivos *.spec.js / *.spec.jsx de esta carpeta
const context = import.meta.webpackContext('./', { recursive: true, regExp: /\.spec\.jsx?$/ });
context.keys().forEach(context);
