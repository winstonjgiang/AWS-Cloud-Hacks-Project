// Token storage and management utilities
import { oneHourFromNow } from './time';

const TOKEN_KEY = 'google_access_token';
const TOKEN_EXPIRY_KEY = 'google_token_expiry';

export const tokenManager = {
  // Store the token and its expiry
  setToken(token) {
    if (typeof window === 'undefined') return;
    
    const expiryTime = oneHourFromNow();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  },

  // Get the stored token
  getToken() {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    
    // Check if token exists and hasn't expired
    if (token && expiry && Date.now() < parseInt(expiry)) {
      return token;
    }
    
    // Token expired or doesn't exist
    this.clearToken();
    return null;
  },

  // Clear the stored token
  clearToken() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  // Check if token is valid
  isTokenValid() {
    return !!this.getToken();
  }
}; 