import { useState, useEffect } from 'react';
import { orderService } from '../services/api';

export const useOrders = (email) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setOrdersError(null);
      if (!email) throw new Error("Email is required to fetch orders");

      const response = await orderService.getOrdersByEmail(email);
      setOrders(response.data.orders || []);
    } catch (err) {
      setOrdersError(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (email) fetchOrders();
  }, [email]);

  return { orders, loadingOrders, ordersError, refetchOrders: fetchOrders };
};

