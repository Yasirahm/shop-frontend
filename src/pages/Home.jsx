import heroImage from "../assets/Logo.jpg";
import CallbackPopup from "../components/CallbackPopup";
import WhatsappButton from "../components/WhatsappButton";
import Customize from "./Customize";
import Other from "./Other";
import Products from "./Products";
import Service from "./Service";

const Home = () => {
  return (
    <div className="bg-white">
      
      {/* ✅ Hero Image Banner */}
      <section className="w-full">
        <img
          src={heroImage}
          alt="NewAge Banner"
          className="w-full max-h-[400px] object-contain bg-yellow-300"
        />
      </section>

      {/* ✅ Intro Text Section with Yellow Background */}
      <section className="bg-yellow-300 py-12 px-6 md:px-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
            Personalize Your World with NewAge Versatile Studio Store
          </h1>
          <p className="text-gray-800 text-lg mb-6">
            Custom T-Shirts, Islamic Frames, Name Gifts & More – Made Just for You!
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products */}
      <Products />

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16 leading-tight">
            Why <span className="text-blue-600">Choose NewAge Versatile Studio?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white border-t-4 border-blue-600 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition">
              <img
                src="https://images.unsplash.com/photo-1627225925683-1da7021732ea?w=600"
                alt="Custom T-Shirts"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Customized T-Shirts</h3>
              <p className="text-gray-600">
                Add your name, quotes, or graphics on premium cotton tees. Perfect for gifts, events, and branding.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-t-4 border-green-500 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition">
              <img
                src="https://images.unsplash.com/photo-1700306692751-1fd5f2b88443?w=600"
                alt="Customized Frames"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Framed Art & Calligraphy</h3>
              <p className="text-gray-600">
                Choose from Islamic calligraphy, custom quotes, or family names in elegant wooden frames.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-t-4 border-purple-600 p-8 shadow-xl rounded-2xl text-center hover:scale-105 transition">
              <img
                src="https://media.istockphoto.com/id/1083524158/photo/woman-wrapping-christmas-gifts.webp?a=1&b=1&s=612x612&w=0&k=20&c=JZL59eRPw8fo1rk8XgHp69moGGQ8MBwdWRDL9knCGAU="
                alt="Name Gifts"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Name-Based Gifts</h3>
              <p className="text-gray-600">
                Surprise your loved ones with mugs, keychains, or wall hangings featuring their name in style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-20 tracking-tight">
            Real <span className="text-pink-600">Smiles</span> from Happy Customers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Story 1 */}
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition">
              <img
                src="https://media.istockphoto.com/id/506840479/photo/frame-samples.webp?a=1&b=1&s=612x612&w=0&k=20&c=NJmoBb6nwTs_yEGVkZgEdLb6wMApIEh__XaW9mWTWQc="
                alt="Customer Review"
                className="w-full h-60 object-cover rounded-xl mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Areeba’s Custom Frame</h3>
              <p className="text-gray-600 text-sm">
                “Absolutely loved the calligraphy frame I ordered for my father! Great quality and fast delivery.”
              </p>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-3xl p-6 border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition">
              <img
                src="https://plus.unsplash.com/premium_photo-1673356301514-2cad91907f74?w=600"
                alt="Customer Review"
                className="w-full h-60 object-cover rounded-xl mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Yasir’s Branded Tees</h3>
              <p className="text-gray-600 text-sm">
                “Ordered 10 personalized t-shirts for my team — amazing print quality and fits perfectly.”
              </p>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition">
              <img
                src="https://images.unsplash.com/photo-1617902200814-abc4adc59011?w=600"
                alt="Customer Review"
                className="w-full h-60 object-cover rounded-xl mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Irfan’s Gift Combo</h3>
              <p className="text-gray-600 text-sm">
                “Got a name mug + frame combo for my brother’s wedding. Everyone loved it!”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Sections */}
      <Service />
      <Other />
      <Customize />
      <WhatsappButton />
      <CallbackPopup />
    </div>
  );
};

export default Home;
