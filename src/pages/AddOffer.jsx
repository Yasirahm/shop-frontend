import { useState } from "react";
import axios from "axios";

const AddOffer = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("tag", form.tag);
    data.append("image", form.image);

    try {
      await axios.post("https://shop-backend-irpl.onrender.com/api/offers", data);
      alert("✅ Offer added successfully");
    } catch (error) {
      alert("❌ Failed to add offer");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">📢 Add New Offer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Offer Title"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Offer Description"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="tag"
            placeholder="Offer Tag (e.g. 🔥 Trending)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
