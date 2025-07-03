import React, { useEffect, useState } from "react";
import axios from "axios";

const CallbackPopup = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 10000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://shop-backend-irpl.onrender.com/api/forms/submit", {
        formType: "callback",
        data: formData,
      });

     alert(`📞 Callback Request Submitted!

Thank you, ${formData.name}! We’ve received your callback request.

📍 Address: ${formData.address}
📱 Contact Number: ${formData.contact}
📝 Message: ${formData.message}

Our team will reach out to you within 48 hours. Please keep your phone available.

✅ Your request has been successfully submitted!`);

      setFormData({
        name: "",
        contact: "",
        address: "",
        message: "",
      });
      setShow(false);
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Failed to submit callback request.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📞 Request a Callback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            className="w-full border px-3 py-2 rounded"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            className="w-full border px-3 py-2 rounded"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border px-3 py-2 rounded"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-gray-600 hover:text-red-600"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallbackPopup;
