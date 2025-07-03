import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi"; // Add this at the top


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    discountRange: "",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    discountOnly: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://shop-backend-irpl.onrender.com/api/products");
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
      const finalPrice = product.price - product.discount;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const discountMatch =
        filters.discountRange === "" ||
        (filters.discountRange === "0-100" && product.discount >= 0 && product.discount <= 100) ||
        (filters.discountRange === "101-300" && product.discount >= 101 && product.discount <= 300) ||
        (filters.discountRange === "301+" && product.discount > 300);

      return (
        matchesSearch &&
        discountMatch &&
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
      <div className="flex items-center border rounded max-w-3xl mx-auto mb-6 bg-white shadow-sm p-3">
    <FiSearch className="text-gray-400 text-xl mr-2" />
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-white outline-none text-gray-700 placeholder-gray-400"
    />
  </div>

      {/* ✅ Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-600">
          {/* 🔽 Discount Range */}
          <select
            className="border p-2 rounded bg-white"
            value={filters.discountRange}
            onChange={(e) => setFilters({ ...filters, discountRange: e.target.value })}
          >
            <option value="">All Discounts</option>
            <option value="0-100">₹0 - ₹100 OFF</option>
            <option value="101-300">₹101 - ₹300 OFF</option>
            <option value="301+">₹301+ OFF</option>
          </select>

          {/* 💰 Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded bg-white"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />

          {/* 💰 Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded bg-white"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />

          {/* 🆕 New Products */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(e) => setFilters({ ...filters, isNew: e.target.checked })}
            />
            <span className="font-semibold">New Only</span>
          </label>

          {/* 🎯 Discounted Only */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(e) =>
                setFilters({ ...filters, discountOnly: e.target.checked })
              }
            />
            <span className="font-semibold">Discounted Only</span>
          </label>
        </div>
      </div>

      {/* ✅ Product Grid */}
      {getFilteredProducts().length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
  🚧 Our servers are currently facing a delay. We're working on it — please check back shortly. Thank you for your patience!
</p>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getFilteredProducts().map((product) => {
            const finalPrice = product.price - product.discount;

            return (
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
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-2xl font-bold mt-3">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{finalPrice}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
                {product.discount > 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    ₹{product.discount} OFF
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Stock: {product.stock}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
