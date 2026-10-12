// Pruebas de lógica: CRUD del archivo de datos simulado (dataService.js)
import { dataService, formatPrice } from '../services/dataService';
import { resetStorage } from './helpers';

describe('dataService (CRUD con persistencia en localStorage)', () => {
  beforeEach(() => resetStorage());

  it('lee los productos semilla (Read)', () => {
    const productos = dataService.getProducts();
    expect(productos.length).toBe(6);
    expect(dataService.getProductById(1).nombre).toBe('Proteína Suero Whey 1kg');
  });

  it('crea un producto con id correlativo y calcula el precio de oferta (Create)', () => {
    const nuevo = dataService.createProduct({
      nombre: 'Barra Proteica', categoria: 'Proteínas / Recuperación',
      precio: 2000, stock: 10, enOferta: true, descuento: 50
    });
    expect(nuevo.id).toBe(7);
    expect(nuevo.precioOferta).toBe(1000);
    expect(dataService.getProducts().length).toBe(7);
  });

  it('actualiza un producto existente y retorna null si no existe (Update)', () => {
    const actualizado = dataService.updateProduct(2, { stock: 50 });
    expect(actualizado.stock).toBe(50);
    expect(dataService.getProductById(2).stock).toBe(50);
    expect(dataService.updateProduct(999, { stock: 1 })).toBeNull();
  });

  it('elimina un producto (Delete)', () => {
    dataService.deleteProduct(1);
    expect(dataService.getProductById(1)).toBeNull();
    expect(dataService.getProducts().length).toBe(5);
  });

  it('identifica productos con stock crítico y productos en oferta', () => {
    const criticos = dataService.getCriticalProducts().map((p) => p.id);
    expect(criticos).toEqual([2, 4, 6]);
    expect(dataService.getOfferProducts().every((p) => p.enOferta)).toBeTrue();
  });

  it('login: éxito con credenciales válidas y mensajes de error si fallan', () => {
    expect(dataService.login('admin@nutrivida.cl', 'admin').success).toBeTrue();
    expect(dataService.getCurrentUser().rol).toBe('admin');
    expect(dataService.login('noexiste@x.cl', '123').message).toContain('no encontrado');
    expect(dataService.login('admin@nutrivida.cl', 'mala').message).toBe('Contraseña incorrecta.');
  });

  it('al crear una orden completada descuenta el stock de los productos', () => {
    const stockAntes = dataService.getProductById(1).stock;
    dataService.createOrder({ items: [{ id: 1, cantidad: 3 }], total: 0 });
    expect(dataService.getProductById(1).stock).toBe(stockAntes - 3);
    expect(dataService.getOrders().length).toBe(2);
  });

  it('formatPrice formatea en pesos chilenos', () => {
    expect(formatPrice(24990)).toBe('$24.990');
    expect(formatPrice(undefined)).toBe('$0');
  });

  // MOCK: se simula una falla de localStorage para probar el manejo de errores
  it('usa los datos por defecto si localStorage falla (mock con spyOn)', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Storage bloqueado');
    spyOn(console, 'error');
    const productos = dataService.getProducts();
    expect(productos.length).toBe(6);
    expect(console.error).toHaveBeenCalled();
  });
});
