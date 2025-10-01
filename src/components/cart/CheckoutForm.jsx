import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { orderService } from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        cartItems: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalPrice()
      };
console.log(orderData);
console.log(cart);
      const response = await orderService.placeOrder(orderData);
      
      showToast(response.message, 'success');
      clearCart();
      setFormData({ firstName: '', lastName: '', address: '' });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      showToast(error.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
      
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        error={errors.firstName}
        placeholder="John"
      />
      
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        error={errors.lastName}
        placeholder="Doe"
      />
      <Input
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
        placeholder="john.doe@example.com"
      />
      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        error={errors.phone}
        placeholder="123-456-7890"
      />
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows="3"
          placeholder="123 Main Street, City, State, PIN Code"
          className={`input-field resize-none ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loading || cart.length === 0}
        className="w-full"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
};

export default CheckoutForm;