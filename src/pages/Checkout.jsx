import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

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

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedTotal = localStorage.getItem("cartTotal");
    const total = storedTotal ? parseFloat(storedTotal) : 0;
    setAmount(total);
  }, []);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const sendEmail = () => {
    const templateParams = {
      name: shippingInfo.name,
      email: shippingInfo.email,
      contact: shippingInfo.contact,
      address: shippingInfo.address,
      district: shippingInfo.district,
      pincode: shippingInfo.pincode,
      landmark: shippingInfo.landmark,
      amount: amount.toFixed(2),
      paymentMethod: "Cash on Delivery",
      to_email: `${shippingInfo.email}, uzairmursaleen8@gmail.com`,
    };

    emailjs.send(
      "service_z6hmua4",
      "template_uw14p0k",
      templateParams,
      "IXVT9qvmERZ6nzyVN"
    );
  };

  const showSuccessToast = () => {
    toast.success(
      `✅ Order Placed Successfully!

👤 Name: ${shippingInfo.name}
📧 Email: ${shippingInfo.email}
📞 Contact: ${shippingInfo.contact}
🏠 Address: ${shippingInfo.address}
🏙️ District: ${shippingInfo.district}
📍 Pincode: ${shippingInfo.pincode}
📌 Landmark: ${shippingInfo.landmark}
💰 Amount: ₹${amount.toFixed(2)}
🛒 Payment: Cash on Delivery

📩 Admin Email: uzairmursaleen8@gmail.com
📞 WhatsApp: +91-9858100244`,
      {
        position: "top-center",
        autoClose: false,
        className:
          "bg-white border-l-4 border-green-600 text-black whitespace-pre-wrap",
      }
    );
  };

  const resetForm = () => {
    setShippingInfo({
      name: "",
      email: "",
      contact: "",
      address: "",
      district: "",
      pincode: "",
      landmark: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(shippingInfo.contact)) {
      toast.warn("📱 Contact number must be exactly 10 digits.");
      return;
    }

    try {
      await axios.post(
        "https://shop-backend-45ip.onrender.com/api/forms/submit",
        {
          formType: "checkout",
          data: {
            ...shippingInfo,
            paymentMethod: "Cash on Delivery",
            amount,
          },
        }
      );

      sendEmail();
      showSuccessToast();
      resetForm();
    } catch (err) {
      console.error("❌ COD order failed:", err);
      toast.error("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <>
      {/* 🔔 Toast Container (REQUIRED) */}
      <ToastContainer />

      <div className="min-h-screen w-screen bg-gray-100 px-4 py-10 flex justify-center">
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
                type={
                  field === "contact" || field === "pincode"
                    ? "number"
                    : "text"
                }
                name={field}
                value={shippingInfo[field]}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="mt-6 text-lg font-semibold text-center text-gray-800">
            Total Payable Amount: ₹{amount.toFixed(2)}
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Place Order (Cash on Delivery)
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
