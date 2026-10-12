// Pruebas del DataContext: conecta el CRUD de dataService con el estado de React
import { render, screen, fireEvent } from '@testing-library/react';
import { DataProvider, useData } from '../context/DataContext';
import { resetStorage } from './helpers';

// Componente auxiliar que usa las funciones del contexto
function PanelDePrueba() {
  const { categories, users, addCategory, removeCategory, register, editUser, removeUser } = useData();
  return (
    <div>
      <span data-testid="cats">{categories.length}</span>
      <span data-testid="users">{users.map((u) => u.nombre).join(',')}</span>
      <button onClick={() => addCategory({ nombre: 'Snacks Saludables' })}>add-cat</button>
      <button onClick={() => removeCategory('fuerza')}>del-cat</button>
      <button onClick={() => {
        const r = register({ nombre: 'Ana', correo: 'admin@nutrivida.cl', password: '123456' });
        document.title = r.message || 'ok';
      }}>reg-dup</button>
      <button onClick={() => register({ nombre: 'Ana', correo: 'ana@duoc.cl', password: '123456' })}>reg</button>
      <button onClick={() => editUser(2, { nombre: 'Pedrito' })}>edit-user</button>
      <button onClick={() => removeUser(2)}>del-user</button>
    </div>
  );
}

describe('DataContext (CRUD conectado a React)', () => {
  beforeEach(() => resetStorage());

  it('agrega y elimina categorías actualizando la interfaz', () => {
    render(<DataProvider><PanelDePrueba /></DataProvider>);
    expect(screen.getByTestId('cats').textContent).toBe('4');
    fireEvent.click(screen.getByText('add-cat'));
    expect(screen.getByTestId('cats').textContent).toBe('5');
    fireEvent.click(screen.getByText('del-cat'));
    expect(screen.getByTestId('cats').textContent).toBe('4');
  });

  it('registra un usuario nuevo y rechaza un correo duplicado', () => {
    render(<DataProvider><PanelDePrueba /></DataProvider>);
    fireEvent.click(screen.getByText('reg-dup'));
    expect(document.title).toBe('Ya existe una cuenta con este correo electrónico.');
    fireEvent.click(screen.getByText('reg'));
    expect(screen.getByTestId('users').textContent).toContain('Ana');
  });

  it('edita y elimina usuarios', () => {
    render(<DataProvider><PanelDePrueba /></DataProvider>);
    fireEvent.click(screen.getByText('edit-user'));
    expect(screen.getByTestId('users').textContent).toContain('Pedrito');
    fireEvent.click(screen.getByText('del-user'));
    expect(screen.getByTestId('users').textContent).not.toContain('Pedrito');
  });
});
