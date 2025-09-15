import { loginApi, registerApi, logoutApi, getUserProfileApi } from '../api/index.js';

// Authentication service layer
export class AuthService {
  static async login(credentials) {
    try {
      const response = await loginApi(credentials);
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await registerApi(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await logoutApi();
      
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const response = await getUserProfileApi();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
}
