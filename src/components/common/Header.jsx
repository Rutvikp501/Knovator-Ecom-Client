import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Store, Package } from 'lucide-react';

const Header = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
                   <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <img src="/Knovator.svg" alt="My Logo" className="w-100 h-100" />
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition ${
                location.pathname === '/'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </Link>

            <Link
              to="/orders"
              className={`font-medium transition flex items-center space-x-1 ${
                location.pathname === '/orders'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>My Orders</span>
            </Link>
            
            <Link
              to="/cart"
              className="relative btn-primary flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                               font-bold rounded-full w-6 h-6 flex items-center justify-center
                               animate-bounce-slow">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;