import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const storedTotal = localStorage.getItem("cartTotal");
    const total = storedTotal ? parseFloat(storedTotal) : 0;
    setCartTotal(total);
    const finalAmount = paymentMethod === "online" ? total - 6 : total;
    setAmount(finalAmount);
  }, [paymentMethod]);

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
      paymentMethod: paymentMethod === "online" ? "Online Payment" : "Cash on Delivery",
      admin_email: "uzairmursaleen8@gmail.com",
      to_email: `${shippingInfo.email}, uzairmursaleen8@gmail.com`,
    };

    emailjs
      .send("service_z6hmua4", "template_uw14p0k", templateParams, "IXVT9qvmERZ6nzyVN")
      .then(
        (result) => console.log("📧 Email sent:", result.text),
        (error) => console.error("❌ Email failed:", error.text)
      );
  };

  const showSuccessToast = () => {
    toast.success(
      `✅ Order Placed Successfully!

📦 Order Details:
👤 Name: ${shippingInfo.name}
📧 Email: ${shippingInfo.email}
📞 Contact: ${shippingInfo.contact}
🏠 Address: ${shippingInfo.address}
🏙️ District: ${shippingInfo.district}
📍 Pincode: ${shippingInfo.pincode}
📌 Landmark: ${shippingInfo.landmark}
💰 Amount: ₹${amount.toFixed(2)}
🛒 Payment: ${paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}

📸 Please take a screenshot and send it to the admin:
📩 Email: uzairmursaleen8@gmail.com
📞 WhatsApp: +91-9858100244`,
      {
        position: "top-center",
        autoClose: false,
        className: "bg-white border-l-4 border-green-600 text-black whitespace-pre-wrap",
      }
    );
  };

  const handleCOD = async () => {
    try {
      await axios.post("https://shop-backend-1-4ypi.onrender.com/api/forms/submit", {
        formType: "checkout",
        data: {
          ...shippingInfo,
          paymentMethod: "Cash on Delivery",
          amount,
        },
      });

      sendEmail();
      showSuccessToast();
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
      console.error("❌ COD submission failed:", err);
      toast.error("❌ Failed to place COD order.");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      const { data } = await axios.post("https://shop-backend-1-4ypi.onrender.com/api/payment/create-order", {
        amount,
      });

      const options = {
        key: "rzp_live_L2IYg6rIX1anLD",
        amount: data.amount,
        currency: data.currency,
        name: "Newageversatilestudio",
        description: "Online Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          toast.success("✅ Payment successful: " + response.razorpay_payment_id);

          await axios.post("https://shop-backend-1-4ypi.onrender.com/api/forms/submit", {
            formType: "checkout",
            data: {
              ...shippingInfo,
              razorpayPaymentId: response.razorpay_payment_id,
              paymentMethod: "Online Payment",
              amount,
            },
          });

          sendEmail();
          showSuccessToast();

          setShippingInfo({
            name: "",
            email: "",
            contact: "",
            address: "",
            district: "",
            pincode: "",
            landmark: "",
          });
        },
        prefill: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          contact: shippingInfo.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error("❌ Payment failed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(shippingInfo.contact)) {
      return toast.warn("📱 Contact number must be 10 digits.");
    }
    if (paymentMethod === "cod") handleCOD();
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

        {["name", "email", "contact", "address", "district", "pincode", "landmark"].map(
          (field, idx) => (
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
          )
        )}

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Payment Method</label>
          <div className="space-y-2">
            <label className="flex text-blue-500 items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mr-2"
              />
              Cash on Delivery (₹{cartTotal.toFixed(2)})
            </label>
            <label className="flex text-blue-700 items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                className="mr-2"
              />
              Pay Online (₹{(cartTotal - 6).toFixed(2)} with ₹6 discount)
            </label>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold text-center text-gray-800">
          Total Payable Amount: ₹{amount.toFixed(2)}
        </div>

        {paymentMethod === "online" ? (
          <button
            type="button"
            onClick={handleOnlinePayment}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Pay with Razorpay
          </button>
        ) : (
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Place COD Order
          </button>
        )}
      </form>
    </div>
  );
};

export default Checkout;
