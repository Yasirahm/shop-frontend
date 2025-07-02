import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    district: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(shippingInfo.contact)) {
      return alert("📱 Contact number must be 10 digits.");
    }

    try {
      await axios.post("https://shop-backend-1-ydei.onrender.com/api/forms/submit", {
        formType: "checkout",
        data: shippingInfo,
      });

     alert("Thank you! Your order has been saved and will be processed shortly.");

      setShippingInfo({
        name: "",
        email: "",
        contact: "",
        address: "",
        district: "",
        pincode: "",
        landmark: "",
      });
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Failed to submit form. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Shipping Details
        </h2>

        {[
          "name",
          "email",
          "contact",
          "address",
          "district",
          "pincode",
          "landmark",
        ].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 capitalize">
              {field === "pincode" ? "Pin Code" : field}
            </label>
            <input
              type={field === "contact" || field === "pincode" ? "number" : "text"}
              name={field}
              value={shippingInfo[field]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
