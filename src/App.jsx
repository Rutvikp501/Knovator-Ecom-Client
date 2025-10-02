import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/common/Header';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <OrderProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Routes>
                <Route path="/" element={<ProductListingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </div>
          </CartProvider>
        </OrderProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;