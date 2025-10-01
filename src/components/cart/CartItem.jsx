import { memo } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const CartItem = memo(({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm animate-slideIn">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center bg-primary-600 text-white rounded-full hover:bg-primary-700 transition"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-gray-900">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </p>
      </div>
      
      <button
        onClick={handleRemove}
        className="text-red-600 hover:text-red-700 transition"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;