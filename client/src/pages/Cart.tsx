import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-4xl">This is not working at this time please get Courses and Notes particularly</div><br />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <Link to="">
              <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Proceed to Pay
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
