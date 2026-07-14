import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const justPlacedOrderId = location.state?.justPlacedOrderId;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders',err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">You have no orders yet</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`bg-white rounded-lg shadow p-6 ${
              order._id === justPlacedOrderId ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus]}`}
              >
                {order.orderStatus}
              </span>
            </div>

          <div className="border-t border-gray-100 pt-3 mb-3 space-y-2">
  {order.orderItems.map((item) => (
    <div key={item.product} className="flex items-center gap-3 text-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover rounded"
      />
      <span className="flex-1">
        {item.name} × {item.quantity}
      </span>
      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
    </div>
  ))}
</div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-bold text-primary">₹{order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;