import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (e) => {
    updateCartQuantity(item._id, Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-25 h-25 object-contain rounded"
      />

      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-primary font-semibold mt-1">₹{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Qty:</label>
        <select
          value={item.quantity}
          onChange={handleQuantityChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {[...Array(Math.min(item.stock, 10)).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>
      </div>

      <p className="w-20 text-right font-semibold">
        ₹{(item.price * item.quantity).toFixed(2)}
      </p>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-600 hover:text-red-800 text-sm ml-4"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;