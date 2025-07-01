import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🆕 Search state
  const [filters, setFilters] = useState({
    type: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    discountOnly: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://shop-backend-5re8.onrender.com/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to load products", err);
    }
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = existingCart.find((item) => item._id === product._id);
    if (exists) {
      exists.quantity += 1;
    } else {
      existingCart.push({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        discount: product.discount,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("✅ Product added to cart!");
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const finalPrice = product.price - (product.price * product.discount) / 100;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesSearch &&
        (filters.type === "" || product.type === filters.type) &&
        (filters.color === "" || product.color === filters.color) &&
        (filters.minPrice === "" || finalPrice >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || finalPrice <= Number(filters.maxPrice)) &&
        (!filters.isNew || product.isNew === true) &&
        (!filters.discountOnly || product.discount > 0)
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🛍 All Products
      </h1>

      {/* 🔍 Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded border shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* ✅ Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <select
            className="border p-2 rounded text-sm"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Mug">Mug</option>
            <option value="Frame">Frame</option>
          </select>

          <select
            className="border p-2 rounded text-sm"
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded text-sm"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded text-sm"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(e) => setFilters({ ...filters, isNew: e.target.checked })}
            />
            <span className="text-black font-semibold">New Only</span>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(e) => setFilters({ ...filters, discountOnly: e.target.checked })}
            />
            <span className="text-black font-semibold">Discounted Only</span>
          </label>
        </div>
      </div>

      {/* ✅ Product Grid */}
      {getFilteredProducts().length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getFilteredProducts().map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition"
            >
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : "/default.jpg"
                }
                alt={product.name}
                className="w-full h-48 font-bold object-cover rounded"
              />
              <h2 className="text-2xl  font-bold mt-3">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-600 font-bold text-lg">
                  ₹{product.price - (product.price * product.discount) / 100}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Add to Cart
                </button>
              </div>
              {product.discount > 0 && (
                <p className="text-sm text-red-500 mt-1">-{product.discount}% OFF</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
