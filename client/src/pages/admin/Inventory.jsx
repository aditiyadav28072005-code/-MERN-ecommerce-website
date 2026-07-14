import { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await api.get('/products/inventory/all');
        setProducts(data);
      } catch (err) {
        setError('Failed to load inventory',err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const getStockLabel = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', className: 'bg-red-100 text-red-700' };
    if (stock <= 10) return { text: 'Low Stock', className: 'bg-yellow-100 text-yellow-700' };
    return { text: 'In Stock', className: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
      <AdminSidebar />

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Inventory</h1>

        {loading && <LoadingSpinner />}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Stock Remaining</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const stockLabel = getStockLabel(product.stock);
                  return (
                    <tr key={product._id} className="border-t border-gray-100">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        {product.name}
                      </td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3 font-medium">{product.stock}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${stockLabel.className}`}
                        >
                          {stockLabel.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {products.length === 0 && (
              <p className="text-center text-gray-500 py-8">No products yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;