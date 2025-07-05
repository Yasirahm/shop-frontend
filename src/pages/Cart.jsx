import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      const discountedPrice = Math.max(0, price - discount);
      const itemTotal = discountedPrice * (item.quantity || 1);
      return total + itemTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", subtotal);

    setCartItems([]);
    localStorage.removeItem("cart");

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {cartItems.map((item, idx) => {
                const price = parseFloat(item.price) || 0;
                const discount = parseFloat(item.discount) || 0;
                const discountedPrice = Math.max(0, price - discount);

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow p-5 flex gap-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <div className="mt-1">
                        <p className="text-blue-600 font-medium">
                          ₹{discountedPrice.toFixed(2)} × {item.quantity}
                        </p>
                        {discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{price.toFixed(2)} (−₹{discount})
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(idx)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-right">
              <h3 className="text-xl font-bold text-gray-800">
                Subtotal: ₹{subtotal.toFixed(2)}
              </h3>
              <button
                onClick={handleBuyNow}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
