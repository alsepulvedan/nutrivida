// Pruebas de props y renderizado condicional: ProductCard
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productoMock } from './helpers';

const renderCard = (props) =>
  render(<MemoryRouter><ProductCard {...props} /></MemoryRouter>);

describe('ProductCard (props)', () => {
  it('muestra nombre, categoría e imagen recibidos por props', () => {
    renderCard({ product: productoMock });
    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
    expect(screen.getByText('Proteínas / Recuperación')).toBeTruthy();
    expect(screen.getByAltText('Producto de Prueba')).toBeTruthy();
  });

  it('si está en oferta muestra el badge de descuento y ambos precios', () => {
    renderCard({ product: productoMock });
    expect(screen.getByText('-20%')).toBeTruthy();
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(screen.getByText('$8.000')).toBeTruthy();
  });

  it('si NO está en oferta no muestra badge y solo muestra el precio normal', () => {
    renderCard({ product: { ...productoMock, enOferta: false } });
    expect(screen.queryByText('-20%')).toBeNull();
    expect(screen.queryByText('$8.000')).toBeNull();
  });

  it('el botón "Ver detalle" se oculta con showButton={false} y enlaza al detalle', () => {
    const { unmount } = renderCard({ product: productoMock });
    expect(screen.getByText('Ver detalle').getAttribute('href')).toBe('/productos/99');
    unmount();
    renderCard({ product: productoMock, showButton: false });
    expect(screen.queryByText('Ver detalle')).toBeNull();
  });
});
