// Checkout.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import emailjs from "@emailjs/browser";

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

  const [cartTotal, setCartTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [gst, setGst] = useState(0);
  const [amount, setAmount] = useState(0); // amount with GST

  useEffect(() => {
    const storedTotal = localStorage.getItem("cartTotal");
    const total = storedTotal ? parseFloat(storedTotal) : 0;
    setCartTotal(total);

    const gstAmount = parseFloat((total * 0.01).toFixed(2));
    const finalAmount = parseFloat((total + gstAmount).toFixed(2));

    setGst(gstAmount);
    setAmount(finalAmount);
  }, [paymentMethod]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "✅ Order Placed Successfully!",
      icon: "success",
      html: `
        <div style="text-align: left;">
          <p><strong>Name:</strong> ${shippingInfo.name}</p>
          <p><strong>Email:</strong> ${shippingInfo.email}</p>
          <p><strong>Contact:</strong> ${shippingInfo.contact}</p>
          <p><strong>Address:</strong> ${shippingInfo.address}</p>
          <p><strong>District:</strong> ${shippingInfo.district}</p>
          <p><strong>Pincode:</strong> ${shippingInfo.pincode}</p>
          <p><strong>Landmark:</strong> ${shippingInfo.landmark}</p>
          <p><strong>Amount (incl. 1% GST):</strong> ₹${amount.toFixed(2)}</p>
          <p><strong>Payment:</strong> ${paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}</p>
          <hr/>
          <p>📸 Please take a screenshot and send it to:</p>
          <p>📩 uzairmursaleen8@gmail.com</p>
          <p>📞 WhatsApp: +91-9858100244</p>
        </div>
      `,
      confirmButtonText: "Okay",
    });
  };

  const showErrorAlert = (msg) => {
    Swal.fire("❌ Error", msg, "error");
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

      showSuccessAlert();
      sendEmail();

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
      showErrorAlert("Failed to place COD order.");
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
          await axios.post("https://shop-backend-1-4ypi.onrender.com/api/forms/submit", {
            formType: "checkout",
            data: {
              ...shippingInfo,
              razorpayPaymentId: response.razorpay_payment_id,
              paymentMethod: "Online Payment",
              amount,
            },
          });

          showSuccessAlert();
          sendEmail();

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
      showErrorAlert("Payment failed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(shippingInfo.contact)) {
      return showErrorAlert("📱 Contact number must be 10 digits.");
    }

    if (paymentMethod === "cod") {
      handleCOD();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 w-screen py-10 flex justify-center">
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
              Cash on Delivery (Incl. ₹{gst.toFixed(2)} GST)
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
              Pay Online (Incl. ₹{gst.toFixed(2)} GST)
            </label>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold text-center text-gray-800">
          Total Payable Amount (incl. GST): ₹{amount.toFixed(2)}
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
