// src/components/WhatsappButton.jsx
import React from "react";

const WhatsappButton = ({ message = "Hi, I’d like to customize..." }) => {
  const phoneNumber = "919858100244"; // ✅ Replace with your number

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center gap-2 z-50"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        className="w-5 h-5"
      />
      Need help? Chat with us
    </button>
  );
};

export default WhatsappButton;
