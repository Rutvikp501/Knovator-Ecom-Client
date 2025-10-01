import { useMemo } from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { getTotalPrice } = useCart();
  
  const summary = useMemo(() => {
    const subtotal = getTotalPrice();
    const shipping = subtotal > 5000 ? 0 : 100;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [getTotalPrice]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{summary.subtotal.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {summary.shipping === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              `₹${summary.shipping}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax (18% GST)</span>
          <span>₹{summary.tax.toFixed(2)}</span>
        </div>
        
        {summary.subtotal > 0 && summary.subtotal < 5000 && (
          <p className="text-xs text-gray-500 italic">
            Add ₹{(5000 - summary.subtotal).toLocaleString('en-IN')} more for free shipping
          </p>
        )}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-primary-600">₹{summary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;