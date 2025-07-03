import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    image: null,
  });

  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    tag: "",
    image: null,
  });

  const [submissions, setSubmissions] = useState([]);
  const [filteredType, setFilteredType] = useState("all");

  // ✅ Only one useEffect needed
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    } else {
      fetchSubmissions();
    }
  }, [isAdmin, navigate]);

  // ✅ Fetching submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("https://shop-backend-irpl.onrender.com/api/forms/all");
      setSubmissions(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch submissions:", err);
    }
  };

  // ✅ Handle input changes
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleOfferChange = (e) => {
    const { name, value, files } = e.target;
    setOfferForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Submit Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productForm).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      await axios.post("https://shop-backend-irpl.onrender.com/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("✅ Product added!");
      setProductForm({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        image: null,
      });
    } catch (err) {
      console.error("❌ Product upload failed:", err);
      alert("❌ Failed to add product.");
    }
  };

  // ✅ Submit Offer
  const handleAddOffer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(offerForm).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      await axios.post("https://shop-backend-irpl.onrender.com/api/offers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("✅ Offer added!");
      setOfferForm({ title: "", description: "", tag: "", image: null });
    } catch (err) {
      console.error("❌ Offer upload failed:", err);
      alert("❌ Failed to add offer.");
    }
  };

  // ✅ Delete Submission
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await axios.delete(`https://shop-backend-irpl.onrender.com/api/forms/${id}`, {
          withCredentials: true,
        });
        fetchSubmissions();
      } catch (err) {
        console.error("❌ Failed to delete:", err);
        alert("❌ Failed to delete submission.");
      }
    }
  };

  // ✅ Filtered Submissions
  const filteredSubmissions =
    filteredType === "all"
      ? submissions
      : submissions.filter((entry) => entry.formType === filteredType);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-10 space-y-14">
      {/* 🛒 Upload New Product */}
      <section className="bg-white p-6 rounded shadow max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🛒 Upload New Product</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "description", "price", "discount", "stock"].map((field) => (
            <input
              key={field}
              name={field}
              value={productForm[field]}
              onChange={handleProductChange}
              required
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border rounded px-3 py-2 w-full"
            />
          ))}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleProductChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="col-span-full mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </section>

      {/* 🎉 Add New Offer */}
      <section className="bg-white p-6 rounded shadow max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">🎉 Add New Offer</h2>
        <form onSubmit={handleAddOffer} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["title", "description", "tag"].map((field) => (
            <input
              key={field}
              name={field}
              value={offerForm[field]}
              onChange={handleOfferChange}
              required
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border rounded px-3 py-2 w-full"
            />
          ))}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleOfferChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="col-span-full mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Offer
          </button>
        </form>
      </section>

      {/* 📋 User Submissions */}
      <section className="bg-white p-6 rounded shadow max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-2xl font-bold text-red-600">📋 User Submissions</h2>
          <select
            value={filteredType}
            onChange={(e) => setFilteredType(e.target.value)}
            className="border px-4 py-2 rounded text-gray-200 w-full sm:w-auto"
          >
            <option value="all">All Forms</option>
            <option value="contact">Contact</option>
            <option value="callback">Callback</option>
            <option value="customize">Customize</option>
            <option value="checkout">Checkout</option>
          </select>
        </div>

        {filteredSubmissions.length === 0 ? (
          <p className="text-gray-500 text-center">
            No submissions found for selected filter.
          </p>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filteredSubmissions.map((entry) => (
              <div
                key={entry._id}
                className="p-4 border rounded bg-gray-50 relative group transition-all hover:shadow-md"
              >
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm hidden group-hover:inline"
                >
                  🗑️ Delete
                </button>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">📌 Type:</span> {entry.formType} <br />
                  <span className="font-semibold">📅 Date:</span>{" "}
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                  {Object.entries(entry.data).map(([key, val], i) => (
                    <li key={i}>
                      <strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {val}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
