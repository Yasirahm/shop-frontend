import { useEffect, useState } from "react";
import axios from "axios";

// 🧾 Static Offers
const staticOffers = [
  {
    id: 1,
    title: "50% OFF on T-Shirts",
    description: "Get half price on all cotton T-shirts for a limited time!",
    tag: "🔥 Trending",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free Mugs",
    description: "Perfect for your loved ones. Offer valid till this weekend.",
    tag: "🎁 BOGO",
    image:
      "https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "30% OFF on Custom Frames",
    description: "Decorate your home with personalized frames.",
    tag: "📸 Limited Time",
    image:
      "https://images.unsplash.com/photo-1573512443418-c6768862dda7?w=600&auto=format&fit=crop&q=60",
  },
];

const Offers = () => {
  const [dynamicOffers, setDynamicOffers] = useState([]);

  useEffect(() => {
    // ✅ Fetch offers from backend
    axios
      .get("https://shop-backend-45ip.onrender.com/api/offers")
      .then((res) => setDynamicOffers(res.data))
      .catch((err) => console.error("❌ Error loading dynamic offers", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">
      {/* ✅ Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">
          🎉 Exclusive Offers Just for You!
        </h1>
        <p className="text-gray-600 text-lg mt-4">
          Limited time deals on your favorite custom products. Hurry up!
        </p>
      </div>

      {/* ✅ Static Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16">
        {staticOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full mb-3">
                {offer.tag}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{offer.title}</h2>
              <p className="text-gray-600 mt-2 mb-4">{offer.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Divider */}
      {dynamicOffers.length > 0 && (
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          🎁 More Offers Just Added
        </h2>
      )}

      {/* ✅ Dynamic Offers from Backend */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {dynamicOffers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mb-3">
                {offer.tag || "🆕 Offer"}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{offer.title}</h2>
              <p className="text-gray-600 mt-2 mb-4">{offer.description}</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Footer CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold text-gray-700">
          More deals coming every week!
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Stay tuned and keep shopping ✨
        </p>
      </div>
    </div>
  );
};

export default Offers;
