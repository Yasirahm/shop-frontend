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
      await axios.post("https://shop-backend-irpl.onrender.com/api/forms/submit", {
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


      // Reset form after submission
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Customize Your Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="size"
            placeholder="Size (e.g., M, L, XL)"
            value={form.size}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="color"
            placeholder="Preferred Color"
            value={form.color}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="imageUrl"
            placeholder="Reference Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="border px-3 py-2 rounded col-span-2"
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe your customization..."
          value={form.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full mt-4 border px-3 py-2 rounded"
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Customize;
