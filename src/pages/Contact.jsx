import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://shop-backend-45ip.onrender.com/api/forms/submit", {
        formType: "contact",
        data: form,
      });

      alert("📩 Thank you for reaching out We have received your message and our support team will get back to you shortly via the contact details you provided. Your query has been submitted successfully.");
      setForm({ name: "", contact: "", address: "", message: "" });
    } catch (err) {
      console.error("❌ Contact form submit failed:", err);
      alert("❌ Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Contact Us
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-gray-700">Contact</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
