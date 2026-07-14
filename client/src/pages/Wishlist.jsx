import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <Link to="/" className="text-primary font-medium hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <div className="bg-white rounded-lg shadow p-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-primary font-semibold mt-1">₹{item.price}</p>
            </div>

            <button
              onClick={() => addToCart(item, 1)}
              className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={() => removeFromWishlist(item._id)}
              className="text-red-600 hover:text-red-800 text-sm ml-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;