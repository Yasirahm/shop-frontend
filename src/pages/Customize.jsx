import { useState } from "react";
import axios from "axios";

const Customize = () => {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    size: "",
    color: "",
    quantity: "",
    imageUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://shop-backend-45ip.onrender.com/api/forms/submit", {
        formType: "customize",
        data: form,
      });

      alert(`🛠️ Thank you, ${form.name || "Customer"}!

Your request to customize the product "${form.productName}" (Quantity: ${form.quantity}) has been submitted.

🎨 Color: ${form.color}
📏 Size: ${form.size}
📝 Description: ${form.description}

Our team will get in touch within 48 hours to discuss the details.

✅ We look forward to crafting your perfect product!`);

      setForm({
        productName: "",
        description: "",
        size: "",
        color: "",
        quantity: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-10 border border-blue-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">
           Customize Your Product
        </h2>

        <div className="grid  gap-6 sm:grid-cols-2">
          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full bg-white text-black placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
          />
          <input
            name="size"
            placeholder="Size (e.g., M, L, XL)"
            value={form.size}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full bg-white text-black placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
          />
          <input
            name="color"
            placeholder="Preferred Color"
            value={form.color}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full bg-white text-black placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full text-black bg-white placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
          />
          <input
            name="imageUrl"
            placeholder="Reference Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="p-3 rounded-md w-full col-span-full bg-white text-black placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe your customization..."
          value={form.description}
          onChange={handleChange}
          required
          rows="4"
          className="mt-6 w-full p-3 rounded-md text-black bg-white placeholder:text-black shadow-lg outline-none border border-transparent focus:border-blue-500 transition"
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-900 font-semibold py-3 rounded-md shadow-xl border border-blue-300 hover:border-blue-500 transition-all duration-300"
        >
           Submit Customization Request
        </button>
      </form>
    </div>
  );
};

export default Customize;
