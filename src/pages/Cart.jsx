  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  const Cart = () => {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    // ✅ Load cart from localStorage
    const fetchCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
      calculateSubtotal(storedCart);
    };

    // ✅ Subtotal calculation
    const calculateSubtotal = (cartItems) => {
      let total = 0;
      cartItems.forEach((item) => {
        const priceAfterDiscount =
          item.price - (item.price * item.discount) / 100;
        total += item.quantity * priceAfterDiscount;
      });
      setSubtotal(total);
    };

    // ✅ Remove from localStorage cart
    const removeItem = (productId) => {
      const updatedCart = cart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
      alert("🗑️ Item removed from cart");
    };

    const handleBuyNow = () => {
      navigate("/checkout");
    };

    useEffect(() => {
      fetchCart();
    }, []);

    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🛒 Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded shadow-md flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-700">
                      ₹{item.price - (item.price * item.discount) / 100}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl font-bold text-gray-800">Subtotal: ₹{subtotal}</p>
              <button
                onClick={handleBuyNow}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  export default Cart;
