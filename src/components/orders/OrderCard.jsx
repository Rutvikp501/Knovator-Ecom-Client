import { Calendar, Package, MapPin, CreditCard } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-yellow-100 text-yellow-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card animate-fadeIn hover:shadow-xl transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.orderId}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(order.orderDate)}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Customer Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* If you have customer info on order.user, show it; otherwise, omit */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Customer Details</p>
              <p className="font-medium text-gray-900">
                {order.name || "Unknown"}
              </p>
              <p className="font-medium text-gray-900">
                {order.email || "Unknown"}
              </p>
              <p className="font-medium text-gray-900">
                {order.phone || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-1 text-gray-400 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{order.deliveryLocations[0]?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Package className="w-4 h-4 mr-1" />
            Order Items ({order.products.length})
          </h4>
          <div className="space-y-2">
            {order.products.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span className="font-medium text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Total Amount
            </span>
            <span className="text-xl font-bold text-primary-600">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="card animate-fadeIn hover:shadow-xl transition-shadow">
  //     <div className="p-6">
  //       {/* Header */}
  //       <div className="flex justify-between items-start mb-4">
  //         <div>
  //           <h3 className="text-lg font-semibold text-gray-900">
  //             Order #{order.orderId}
  //           </h3>
  //           <div className="flex items-center text-sm text-gray-600 mt-1">
  //             <Calendar className="w-4 h-4 mr-1" />
  //             {formatDate(order.orderDate)}
  //           </div>
  //         </div>
  //         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
  //           {order.status}
  //         </span>
  //       </div>

  //       {/* Customer Details */}
  //       <div className="bg-gray-50 rounded-lg p-4 mb-4">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //           <div>
  //             <p className="text-xs text-gray-500 mb-1">Customer Name</p>
  //             <p className="font-medium text-gray-900">
  //               {order.firstName} {order.lastName}
  //             </p>
  //           </div>
  //           {order.email && (
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Email</p>
  //               <p className="font-medium text-gray-900">{order.email}</p>
  //             </div>
  //           )}
  //           {order.phone && (
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Phone</p>
  //               <p className="font-medium text-gray-900">{order.phone}</p>
  //             </div>
  //           )}
  //           <div>
  //             <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
  //             <div className="flex items-start">
  //               <MapPin className="w-4 h-4 mr-1 text-gray-400 mt-0.5" />
  //               <p className="font-medium text-gray-900 text-sm">{order.address}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Order Items */}
  //       <div className="mb-4">
  //         <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
  //           <Package className="w-4 h-4 mr-1" />
  //           Order Items ({order.cartItems.length})
  //         </h4>
  //         <div className="space-y-2">
  //           {order.cartItems.map((item, index) => (
  //             <div key={index} className="flex justify-between items-center text-sm">
  //               <span className="text-gray-700">
  //                 {item.name} <span className="text-gray-500">x{item.quantity}</span>
  //               </span>
  //               <span className="font-medium text-gray-900">
  //                 ₹{(item.price * item.quantity).toLocaleString('en-IN')}
  //               </span>
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Total */}
  //       <div className="border-t pt-4">
  //         <div className="flex justify-between items-center">
  //           <span className="text-gray-700 font-medium flex items-center">
  //             <CreditCard className="w-4 h-4 mr-1" />
  //             Total Amount
  //           </span>
  //           <span className="text-xl font-bold text-primary-600">
  //             ₹{order.totalAmount.toLocaleString('en-IN')}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default OrderCard;