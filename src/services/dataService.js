/**
 * Servicio de datos simulado (Base de datos en JavaScript con persistencia en localStorage)
 * NutriVida - Evaluación 2 (DSY1104)
 *
 * Implementa operaciones CRUD completas sobre Productos, Categorías, Usuarios y Órdenes.
 */

const STORAGE_KEYS = {
  PRODUCTS: 'nutrivida_products',
  CATEGORIES: 'nutrivida_categories',
  USERS: 'nutrivida_users',
  ORDERS: 'nutrivida_orders',
  CURRENT_USER: 'nutrivida_current_user'
};

// --- DATOS SEMILLA INICIALES ---
const INITIAL_CATEGORIES = [
  {
    id: 'proteinas',
    nombre: 'Proteínas / Recuperación',
    descripcion: 'Suplementos para recuperación muscular y aporte proteico de alto valor biológico.',
    imagen: '/assets/img/producto1.jpg'
  },
  {
    id: 'fuerza',
    nombre: 'Fuerza / Rendimiento',
    descripcion: 'Fórmulas puras y creatinas para potenciar entrenamientos de alta exigencia.',
    imagen: '/assets/img/producto2.jpg'
  },
  {
    id: 'bienestar',
    nombre: 'Salud / Bienestar',
    descripcion: 'Multivitamínicos y micronutrientes para el cuidado del sistema inmune.',
    imagen: '/assets/img/producto3.jpg'
  },
  {
    id: 'cardiovascular',
    nombre: 'Salud Cardiovascular',
    descripcion: 'Ácidos grasos esenciales destilados para proteger corazón y cerebro.',
    imagen: '/assets/img/producto4.jpg'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    nombre: 'Proteína Suero Whey 1kg',
    categoria: 'Proteínas / Recuperación',
    categoriaId: 'proteinas',
    precio: 24990,
    imagen: '/assets/img/producto1.jpg',
    descripcion:
      'Suplemento alimenticio a base de proteína concentrada de suero de leche de alta calidad. Ideal para favorecer la recuperación muscular post-entrenamiento.',
    stock: 18,
    stockCritico: 5,
    enOferta: true,
    descuento: 15,
    precioOferta: 21240
  },
  {
    id: 2,
    nombre: 'Creatina Monohidratada 300g',
    categoria: 'Fuerza / Rendimiento',
    categoriaId: 'fuerza',
    precio: 18990,
    imagen: '/assets/img/producto2.jpg',
    descripcion:
      'Creatina monohidratada pura de alta absorción. Ayuda a incrementar la fuerza muscular y potencia el rendimiento en entrenamientos de alta intensidad.',
    stock: 4, // Estado crítico para demostración en módulo administrativo
    stockCritico: 5,
    enOferta: false,
    descuento: 0,
    precioOferta: 18990
  },
  {
    id: 3,
    nombre: 'Multivitamínico Adulto 90 caps',
    categoria: 'Salud / Bienestar',
    categoriaId: 'bienestar',
    precio: 12500,
    imagen: '/assets/img/producto3.jpg',
    descripcion:
      'Complejo multivitamínico y mineral completo diseñado para cubrir las necesidades diarias de adultos activos. Apoya el sistema inmunológico.',
    stock: 25,
    stockCritico: 5,
    enOferta: true,
    descuento: 20,
    precioOferta: 10000
  },
  {
    id: 4,
    nombre: 'Omega 3 Ultra 120 caps',
    categoria: 'Salud Cardiovascular',
    categoriaId: 'cardiovascular',
    precio: 14990,
    imagen: '/assets/img/producto4.jpg',
    descripcion:
      'Ácidos grasos esenciales EPA y DHA destilados molecularmente. Promueve una función cardiovascular saludable y protege la vista.',
    stock: 3, // Estado crítico para demostración
    stockCritico: 5,
    enOferta: false,
    descuento: 0,
    precioOferta: 14990
  },
  {
    id: 5,
    nombre: 'BCAA 2:1:1 Polvo 300g',
    categoria: 'Proteínas / Recuperación',
    categoriaId: 'proteinas',
    precio: 16990,
    imagen: '/assets/img/producto1.jpg',
    descripcion:
      'Aminoácidos de cadena ramificada micronizados para acelerar la síntesis proteica y disminuir el catabolismo durante el ejercicio.',
    stock: 12,
    stockCritico: 5,
    enOferta: true,
    descuento: 10,
    precioOferta: 15290
  },
  {
    id: 6,
    nombre: 'Colágeno Hidrolizado + Vit C 300g',
    categoria: 'Salud / Bienestar',
    categoriaId: 'bienestar',
    precio: 15990,
    imagen: '/assets/img/producto3.jpg',
    descripcion:
      'Colágeno hidrolizado tipo I y III enriquecido con Vitamina C pura. Promueve la salud articular, firmeza en la piel y fortalecimiento de tendones.',
    stock: 2, // Estado crítico
    stockCritico: 5,
    enOferta: false,
    descuento: 0,
    precioOferta: 15990
  }
];

const INITIAL_USERS = [
  {
    id: 1,
    nombre: 'Administrador',
    apellidos: 'NutriVida',
    correo: 'admin@nutrivida.cl',
    password: 'admin',
    rol: 'admin',
    telefono: '+56 9 1234 5678',
    calle: 'Av. Andrés Bello',
    depto: 'Oficina 1002',
    region: 'rm',
    comuna: 'santiago',
    indicaciones: 'Entregar en recepción'
  },
  {
    id: 2,
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro.hacker20@example.com',
    password: 'password123',
    rol: 'cliente',
    telefono: '+56 9 8765 4321',
    calle: 'Los Crisantemos, Edificio Norte',
    depto: 'Depto 603',
    region: 'rm',
    comuna: 'cerrillos',
    indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
  }
];

const INITIAL_ORDERS = [
  {
    id: '20240705',
    fecha: '2024-07-05 14:32',
    cliente: {
      nombre: 'Pedro',
      apellidos: 'Hacker',
      correo: 'pedro.hacker20@example.com',
      telefono: '+56 9 8765 4321',
      calle: 'Los Crisantemos, Edificio Norte',
      depto: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
      indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
    },
    items: [
      {
        id: 1,
        nombre: 'Proteína Suero Whey 1kg',
        precio: 21240,
        cantidad: 1,
        subtotal: 21240,
        imagen: '/assets/img/producto1.jpg'
      },
      {
        id: 2,
        nombre: 'Creatina Monohidratada 300g',
        precio: 18990,
        cantidad: 1,
        subtotal: 18990,
        imagen: '/assets/img/producto2.jpg'
      }
    ],
    total: 40230,
    estado: 'completada',
    metodoPago: 'Tarjeta de Débito / WebPay'
  }
];

// --- FUNCIONES AUXILIARES DE ALMACENAMIENTO ---
function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Inicialización automática de datos semilla
export function initSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    setStoredData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStoredData(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    setStoredData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }
}

// ==========================================
// 1. CRUD DE PRODUCTOS
// ==========================================
export const dataService = {
  // Inicialización
  init() {
    initSeedData();
  },

  // LEER PRODUCTOS
  getProducts() {
    return getStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find((p) => String(p.id) === String(id)) || null;
  },

  getCriticalProducts() {
    return this.getProducts().filter((p) => Number(p.stock) <= Number(p.stockCritico));
  },

  getOfferProducts() {
    return this.getProducts().filter((p) => p.enOferta === true);
  },

  getProductsByCategory(categoriaIdOrName) {
    const products = this.getProducts();
    return products.filter(
      (p) =>
        p.categoriaId === categoriaIdOrName ||
        p.categoria.toLowerCase() === categoriaIdOrName.toLowerCase()
    );
  },

  // CREAR PRODUCTO
  createProduct(productData) {
    const products = this.getProducts();
    const newId = products.length > 0 ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1 : 1;
    const newProduct = {
      ...productData,
      id: newId,
      stock: Number(productData.stock) || 0,
      stockCritico: Number(productData.stockCritico) || 5,
      precio: Number(productData.precio) || 0,
      enOferta: Boolean(productData.enOferta),
      descuento: Number(productData.descuento) || 0,
      precioOferta: productData.enOferta
        ? Math.round(Number(productData.precio) * (1 - (Number(productData.descuento) || 0) / 100))
        : Number(productData.precio)
    };
    products.push(newProduct);
    setStoredData(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  },

  // ACTUALIZAR PRODUCTO
  updateProduct(id, updatedData) {
    const products = this.getProducts();
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return null;

    const precio = updatedData.precio !== undefined ? Number(updatedData.precio) : products[index].precio;
    const enOferta = updatedData.enOferta !== undefined ? Boolean(updatedData.enOferta) : products[index].enOferta;
    const descuento = updatedData.descuento !== undefined ? Number(updatedData.descuento) : products[index].descuento || 0;
    const precioOferta = enOferta ? Math.round(precio * (1 - descuento / 100)) : precio;

    products[index] = {
      ...products[index],
      ...updatedData,
      id: products[index].id,
      precio,
      enOferta,
      descuento,
      precioOferta,
      stock: updatedData.stock !== undefined ? Number(updatedData.stock) : products[index].stock,
      stockCritico: updatedData.stockCritico !== undefined ? Number(updatedData.stockCritico) : products[index].stockCritico
    };

    setStoredData(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  },

  // ELIMINAR PRODUCTO
  deleteProduct(id) {
    const products = this.getProducts();
    const filtered = products.filter((p) => String(p.id) !== String(id));
    setStoredData(STORAGE_KEYS.PRODUCTS, filtered);
    return filtered;
  },

  // ==========================================
  // 2. CRUD DE CATEGORÍAS
  // ==========================================
  getCategories() {
    return getStoredData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  getCategoryById(id) {
    const categories = this.getCategories();
    return categories.find((c) => String(c.id) === String(id)) || null;
  },

  createCategory(categoryData) {
    const categories = this.getCategories();
    const id = categoryData.id || categoryData.nombre.toLowerCase().replace(/\s+/g, '-');
    const newCategory = { ...categoryData, id };
    categories.push(newCategory);
    setStoredData(STORAGE_KEYS.CATEGORIES, categories);
    return newCategory;
  },

  updateCategory(id, updatedData) {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => String(c.id) === String(id));
    if (index === -1) return null;

    categories[index] = { ...categories[index], ...updatedData, id: categories[index].id };
    setStoredData(STORAGE_KEYS.CATEGORIES, categories);
    return categories[index];
  },

  deleteCategory(id) {
    const categories = this.getCategories();
    const filtered = categories.filter((c) => String(c.id) !== String(id));
    setStoredData(STORAGE_KEYS.CATEGORIES, filtered);
    return filtered;
  },

  // ==========================================
  // 3. CRUD DE USUARIOS & SESIÓN
  // ==========================================
  getUsers() {
    return getStoredData(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find((u) => String(u.id) === String(id)) || null;
  },

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find((u) => u.correo.toLowerCase() === email.toLowerCase()) || null;
  },

  createUser(userData) {
    const users = this.getUsers();
    const newId = users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1;
    const newUser = {
      ...userData,
      id: newId,
      rol: userData.rol || 'cliente'
    };
    users.push(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  updateUser(id, updatedData) {
    const users = this.getUsers();
    const index = users.findIndex((u) => String(u.id) === String(id));
    if (index === -1) return null;

    users[index] = { ...users[index], ...updatedData, id: users[index].id };
    setStoredData(STORAGE_KEYS.USERS, users);

    // Si el usuario actualizado es el usuario logueado actualmente, actualizar sesión
    const currentUser = this.getCurrentUser();
    if (currentUser && String(currentUser.id) === String(id)) {
      this.setCurrentUser(users[index]);
    }

    return users[index];
  },

  deleteUser(id) {
    const users = this.getUsers();
    const filtered = users.filter((u) => String(u.id) !== String(id));
    setStoredData(STORAGE_KEYS.USERS, filtered);
    return filtered;
  },

  // Sesión y autenticación
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  },

  login(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado con ese correo.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }
    this.setCurrentUser(user);
    return { success: true, user };
  },

  logout() {
    this.setCurrentUser(null);
  },

  // ==========================================
  // 4. CRUD DE ÓRDENES / BOLETAS DE COMPRA
  // ==========================================
  getOrders() {
    return getStoredData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find((o) => String(o.id) === String(id)) || null;
  },

  getOrdersByUserEmail(email) {
    const orders = this.getOrders();
    return orders.filter((o) => o.cliente?.correo?.toLowerCase() === email.toLowerCase());
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    // Generar código de orden similar a #20240705 o correlativo numérico
    const newId = String(Math.floor(10000000 + Math.random() * 90000000));
    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newOrder = {
      ...orderData,
      id: orderData.id || newId,
      fecha: orderData.fecha || fechaStr,
      estado: orderData.estado || 'completada'
    };

    orders.unshift(newOrder); // Las más recientes primero
    setStoredData(STORAGE_KEYS.ORDERS, orders);

    // Descontar inventario/stock de los productos comprados si la compra fue exitosa
    if (newOrder.estado === 'completada' && Array.isArray(newOrder.items)) {
      const currentProducts = this.getProducts();
      newOrder.items.forEach((item) => {
        const prodIndex = currentProducts.findIndex((p) => String(p.id) === String(item.id || item.product?.id));
        if (prodIndex !== -1) {
          const qty = Number(item.cantidad) || 1;
          currentProducts[prodIndex].stock = Math.max(0, currentProducts[prodIndex].stock - qty);
        }
      });
      setStoredData(STORAGE_KEYS.PRODUCTS, currentProducts);
    }

    return newOrder;
  }
};

// Formateador de moneda en pesos chilenos
export const formatPrice = (price) => {
  return `$${Number(price || 0).toLocaleString('es-CL')}`;
};

// Inicializar al cargar el script
initSeedData();
