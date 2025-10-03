import { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/api.js'; // assumed service for API calls

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const fetchOrders = async () => {
      
      if (!email) {
        setOrders([]);
        return;
      }
      try {
        const response = await orderService.getOrdersByEmail(email);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [email]);

  const saveEmail = (userEmail) => {
    localStorage.setItem('userEmail', userEmail);
    setEmail(userEmail);
  };

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
    if (order.user?.email) {
      saveEmail(order.user.email);
    }
  };

  const getOrderById = (orderId) => orders.find(order => order.orderId === orderId);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, email, setEmail: saveEmail }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
