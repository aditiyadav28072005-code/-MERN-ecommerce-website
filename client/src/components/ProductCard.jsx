import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent the <Link> from navigating when button is clicked
    addToCart(product, 1);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden block"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-55 object-contain bg-gray-50"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-lg font-bold text-primary mb-3">₹{product.price}</p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white text-sm py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="border border-gray-300 text-sm px-3 rounded hover:bg-gray-100"
          >
            ♥
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;