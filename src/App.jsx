import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/common/Header';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;