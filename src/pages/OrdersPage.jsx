import { useState, useMemo } from 'react';
import { useOrders } from '../context/OrderContext.jsx';
import { Link } from 'react-router-dom';
import OrderCard from '../components/orders/OrderCard.jsx';
import { ShoppingBag, Search, Filter } from 'lucide-react';

const OrdersPage = () => {
  const localStoredEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const [email, setEmail] = useState(localStoredEmail ?? "");
  const [showPrompt, setShowPrompt] = useState(!localStoredEmail);
  const [emailInput, setEmailInput] = useState("");

  // Only fetch if email is set
  const { orders } = useOrders(email);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toString().includes(searchTerm) ||
        ((order.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }
    return filtered;
  }, [orders, searchTerm, filterStatus]);

  // Show "enter/change email" card
  if (showPrompt) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-3">Enter registered email</h2>
          <form onSubmit={e => {
            e.preventDefault();
            localStorage.setItem("userEmail", emailInput.trim());
            setEmail(emailInput.trim());
            setShowPrompt(false);
            window.location.reload();
          }}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Continue
            </button>
            {localStoredEmail && (
              <button
                type="button"
                onClick={() => setShowPrompt(false)}
                className="w-full mt-2 py-2 border border-gray-400 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">
            Start shopping and your orders will appear here
          </p>
          <Link to="/" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and Email Display */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Orders</h1>
          <p className="text-gray-600 mb-1">Track and manage your orders</p>
          <div className="text-sm text-primary-600 font-semibold flex items-center gap-2">
            <span>Signed in as: {email}</span>
            <button
              className="ml-2 underline text-primary-600 hover:text-primary-800"
              onClick={() => {
                setShowPrompt(true);
                setEmailInput("");
              }}
            >
              Change Email
            </button>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by order ID or name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        {/* Status Filter */}
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredOrders.length}</span> order
          {filteredOrders.length !== 1 ? 's' : ''}
        </p>
      </div>
      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map(order => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
