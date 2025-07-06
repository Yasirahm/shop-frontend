import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [filters, setFilters] = useState({
    discountRange: "",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    discountOnly: false,
  });

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://shop-backend-1-4ypi.onrender.com/api/products");
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

    toast.success(
      <div className="flex justify-between items-center">
        <span>✅ Added to cart</span>
        <button
          onClick={() => navigate("/cart")}
          className="ml-4 text-blue-600 underline text-sm"
        >
          View Cart
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
      }
    );
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

  const filteredProducts = getFilteredProducts();
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🛍 All Products</h1>

      {/* 🔍 Search Bar */}
      <div className="flex items-center border rounded max-w-3xl mx-auto mb-6 bg-white shadow-sm p-3">
        <FiSearch className="text-gray-400 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(6); // reset on search
          }}
          className="w-full bg-white outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ✅ Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-600">
          <select
            className="border p-2 rounded bg-white"
            value={filters.discountRange}
            onChange={(e) => {
              setFilters({ ...filters, discountRange: e.target.value });
              setVisibleCount(6); // reset on filter
            }}
          >
            <option value="">All Discounts</option>
            <option value="0-100">₹0 - ₹100 OFF</option>
            <option value="101-300">₹101 - ₹300 OFF</option>
            <option value="301+">₹301+ OFF</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded bg-white"
            value={filters.minPrice}
            onChange={(e) => {
              setFilters({ ...filters, minPrice: e.target.value });
              setVisibleCount(6); // reset on filter
            }}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded bg-white"
            value={filters.maxPrice}
            onChange={(e) => {
              setFilters({ ...filters, maxPrice: e.target.value });
              setVisibleCount(6); // reset on filter
            }}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(e) => {
                setFilters({ ...filters, isNew: e.target.checked });
                setVisibleCount(6); // reset on filter
              }}
            />
            <span className="font-semibold">New Only</span>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(e) => {
                setFilters({ ...filters, discountOnly: e.target.checked });
                setVisibleCount(6); // reset on filter
              }}
            />
            <span className="font-semibold">Discounted Only</span>
          </label>
        </div>
      </div>

      {/* 🚚 Product Grid or Loader */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>🚧 Our servers are currently facing a delay. Please check back shortly.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleProducts.map((product) => {
              const finalPrice = product.price - product.discount;
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition"
                >
                  <img
                    src={product.image.startsWith("http") ? product.image : "/default.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-2xl text-gray-700 font-bold mt-3">{product.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-bold text-lg">₹{finalPrice}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                  {product.discount > 0 && (
                    <p className="text-sm text-red-500 mt-1">₹{product.discount} OFF</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
                </div>
              );
            })}
          </div>

          {/* Read More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Read More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
