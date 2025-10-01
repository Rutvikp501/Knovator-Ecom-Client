export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const MESSAGES = {
  ADD_TO_CART_SUCCESS: 'Product added to cart!',
  REMOVE_FROM_CART: 'Product removed from cart',
  ORDER_SUCCESS: 'Order placed successfully!',
  ORDER_ERROR: 'Failed to place order. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
};