import { memo } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="card group animate-fadeIn">
      <div className="relative overflow-hidden bg-gray-200 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="flex items-center space-x-1"
            disabled={product.stock === 0}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;