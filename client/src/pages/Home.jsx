import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  // Re-fetch products whenever keyword or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const { data } = await api.get('/products', {
          params: { keyword, category },
        });
        setProducts(data);
      } catch (err) {
        setError('Failed to load products ',err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to MERN Shop</h1>

      <div className="mb-6">
        <SearchBar onSearch={setKeyword} />
      </div>

      <div className="mb-8">
        <CategoryFilter selectedCategory={category} onCategoryChange={setCategory} />
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;