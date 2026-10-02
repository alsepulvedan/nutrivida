import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Página de Inicio - NutriVida</h1>
      <p>Servidor de React funcionando correctamente.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}