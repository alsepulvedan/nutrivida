import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dataService, formatPrice } from '../services/dataService';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos iniciales
  const refreshData = useCallback(() => {
    dataService.init();
    setProducts([...dataService.getProducts()]);
    setCategories([...dataService.getCategories()]);
    setUsers([...dataService.getUsers()]);
    setOrders([...dataService.getOrders()]);
    setCurrentUser(dataService.getCurrentUser());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // --- MÉTODOS CRUD DE PRODUCTOS ---
  const addProduct = (productData) => {
    const created = dataService.createProduct(productData);
    setProducts([...dataService.getProducts()]);
    return created;
  };

  const editProduct = (id, updatedData) => {
    const updated = dataService.updateProduct(id, updatedData);
    setProducts([...dataService.getProducts()]);
    return updated;
  };

  const removeProduct = (id) => {
    const remaining = dataService.deleteProduct(id);
    setProducts([...remaining]);
  };

  // --- MÉTODOS CRUD DE CATEGORÍAS ---
  const addCategory = (categoryData) => {
    const created = dataService.createCategory(categoryData);
    setCategories([...dataService.getCategories()]);
    return created;
  };

  const editCategory = (id, updatedData) => {
    const updated = dataService.updateCategory(id, updatedData);
    setCategories([...dataService.getCategories()]);
    return updated;
  };

  const removeCategory = (id) => {
    const remaining = dataService.deleteCategory(id);
    setCategories([...remaining]);
  };

  // --- MÉTODOS CRUD DE USUARIOS ---
  const addUser = (userData) => {
    const created = dataService.createUser(userData);
    setUsers([...dataService.getUsers()]);
    return created;
  };

  const editUser = (id, updatedData) => {
    const updated = dataService.updateUser(id, updatedData);
    setUsers([...dataService.getUsers()]);
    if (currentUser && String(currentUser.id) === String(id)) {
      setCurrentUser(updated);
    }
    return updated;
  };

  const removeUser = (id) => {
    const remaining = dataService.deleteUser(id);
    setUsers([...remaining]);
  };

  // --- MÉTODOS DE ÓRDENES Y CHECKOUT ---
  const addOrder = (orderData) => {
    const created = dataService.createOrder(orderData);
    setOrders([...dataService.getOrders()]);
    // Refrescar productos porque el stock disminuyó
    setProducts([...dataService.getProducts()]);
    return created;
  };

  // --- MÉTODOS DE AUTENTICACIÓN / SESIÓN ---
  const login = (email, password) => {
    const result = dataService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    dataService.logout();
    setCurrentUser(null);
  };

  const register = (userData) => {
    const existing = dataService.getUserByEmail(userData.correo);
    if (existing) {
      return { success: false, message: 'Ya existe una cuenta con este correo electrónico.' };
    }
    const newUser = dataService.createUser({ ...userData, rol: 'cliente' });
    setUsers([...dataService.getUsers()]);
    dataService.setCurrentUser(newUser);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // --- HELPERS Y CONSULTAS ---
  const getCriticalProducts = () => {
    return products.filter((p) => Number(p.stock) <= Number(p.stockCritico));
  };

  const getOfferProducts = () => {
    return products.filter((p) => p.enOferta === true);
  };

  const getProductsByCategory = (catIdentifier) => {
    return products.filter(
      (p) =>
        p.categoriaId === catIdentifier ||
        p.categoria.toLowerCase() === catIdentifier.toLowerCase()
    );
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        users,
        orders,
        currentUser,
        isLoading,
        refreshData,
        // Productos
        addProduct,
        editProduct,
        removeProduct,
        getCriticalProducts,
        getOfferProducts,
        getProductsByCategory,
        // Categorías
        addCategory,
        editCategory,
        removeCategory,
        // Usuarios
        addUser,
        editUser,
        removeUser,
        // Órdenes
        addOrder,
        // Sesión
        login,
        logout,
        register,
        // Utilidades
        formatPrice
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
