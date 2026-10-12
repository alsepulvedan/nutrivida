// Pruebas de renderizado de listas: Productos, Ofertas y Categorías
import { screen, fireEvent } from '@testing-library/react';
import Productos from '../pages/Productos';
import Ofertas from '../pages/Ofertas';
import Categorias from '../pages/Categorias';
import { dataService } from '../services/dataService';
import { renderWithProviders, resetStorage } from './helpers';

describe('Vistas de listado', () => {
  beforeEach(() => resetStorage());

  it('Productos renderiza una tarjeta por cada producto del catálogo', () => {
    const { container } = renderWithProviders(<Productos />);
    expect(container.querySelectorAll('.producto-card').length).toBe(dataService.getProducts().length);
  });

  it('Ofertas muestra solo los productos en oferta', () => {
    const { container } = renderWithProviders(<Ofertas />);
    expect(container.querySelectorAll('.producto-card').length).toBe(3);
    expect(screen.getByText('Productos con Descuento (3)')).toBeTruthy();
  });

  it('Ofertas muestra un aviso cuando no hay ofertas (renderizado condicional)', () => {
    dataService.getProducts().forEach((p) => dataService.updateProduct(p.id, { enOferta: false }));
    renderWithProviders(<Ofertas />);
    expect(screen.getByText(/No hay productos en oferta/)).toBeTruthy();
  });

  it('Categorías filtra los productos al hacer clic en una categoría (evento + estado)', () => {
    const { container } = renderWithProviders(<Categorias />);
    expect(container.querySelectorAll('.producto-card').length).toBe(6);
    fireEvent.click(screen.getAllByText('Salud Cardiovascular')[0].closest('button'));
    expect(container.querySelectorAll('.producto-card').length).toBe(1);
  });
});
