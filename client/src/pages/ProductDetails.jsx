import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  // Fetch product details and its reviews
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const [productRes, reviewsRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/${id}`),
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        setError('Failed to load product',err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');

    try {
      await api.post(`/reviews/${id}`, { rating, comment });
      setReviewSuccess('Review submitted!');
      setComment('');

      // Refresh reviews and product (to show updated rating)
      const [productRes, reviewsRes] = await Promise.all([
        api.get(`/products/${id}`),
        api.get(`/reviews/${id}`),
      ]);
      setProduct(productRes.data);
      setReviews(reviewsRes.data);
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain rounded-lg"
        />

        {/* Right: Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★ {product.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-primary mb-4">₹{product.price}</p>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <p className="text-sm mb-4">
            Stock:{' '}
            {product.stock > 0 ? (
              <span className="text-green-600">{product.stock} available</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="border border-gray-300 px-4 rounded hover:bg-gray-100"
            >
              ♥ Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500 mb-6">No reviews yet. Be the first to review!</p>
        )}

        <div className="space-y-4 mb-8">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user.name}</span>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Review Form - only for logged-in users */}
        {user ? (
          <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Write a Review</h3>

            {reviewError && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">
                {reviewError}
              </div>
            )}
            {reviewSuccess && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">
                {reviewSuccess}
              </div>
            )}

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-600">
            Please log in to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;