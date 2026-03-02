
import api from './api.js';


class EcommerceService {
  // Auth
  static async register(data) {
    const response = await api.post('/api/Auth/register', data);
    return response.data;
  }

  static async login(data) {
    const response = await api.post('/api/Auth/login', data);
    return response.data;
  }

  // Products
  static async getAllProducts() {
    const response = await api.get('/api/Product/all');
    return response.data;
  }

  static async getActiveProducts(filters = {}) {
    const response = await api.post('/api/Product/active', filters);
    return response.data;
  }

  static async getProductById(id) {
    const response = await api.get(`/api/Product/${id}`);
    return response.data;
  }

  static async createProduct(data) {
    const response = await api.post('/api/Product/create', data);
    return response.data;
  }

  static async updateProduct(data) {
    const response = await api.post('/api/Product/update', data);
    return response.data;
  }

  static async deleteProduct(id) {
    const response = await api.post(`/api/Product/delete/${id}`);
    return response.data;
  }

  static async addToCart(data) {
    const response = await api.post('/api/Product/add-to-cart', data);
    return response.data;
  }

  static async removeFromCart(id) {
    const response = await api.post(`/api/Product/remove-from-cart/${id}`);
    return response.data;
  }

  static async clearCart() {
    const response = await api.post('/api/Product/clear-cart');
    return response.data;
  }

  static async placeOrder() {
    const response = await api.post('/api/Product/place-order');
    return response.data;
  }

  static async getMyProducts() {
    const response = await api.get('/api/Product/my-products');
    return response.data;
  }

  static async getMyOrders() {
    const response = await api.get('/api/Product/my-orders');
    return response.data;
  }

  static async getMyCart() {
    const response = await api.get('/api/Product/my-cart');
    return response.data;
  }

  // User
  static async getProfile() {
    const response = await api.get('/api/User/profile');
    return response.data;
  }

  static async getBalance() {
    const response = await api.get('/api/User/balance');
    return response.data;
  }

  static async updateBalance(amount) {
    await api.post(`/api/User/updateBalance?amount=${amount}`);
  }
}

export default EcommerceService;
