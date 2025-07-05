import heroImage from "../assets/Logo.jpg";
import CallbackPopup from "../components/CallbackPopup";
import WhatsappButton from "../components/WhatsappButton";
import Customize from "./Customize";
import Other from "./Other";
import Products from "./Products";
import Service from "./Service";
import "../App"

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
      <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden group hover:scale-105 transition duration-300 shadow-xl border-t-4 border-blue-600">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/tshirt.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-semibold mb-3 text-gray-500">Customized T-Shirts</h3>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden group hover:scale-105 transition duration-300 shadow-xl border-t-4 border-blue-600">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/frame.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-semibold mb-3 text-gray-700">Framed Art and Calligraphy</h3>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden group hover:scale-105 transition duration-300 shadow-xl border-t-4 border-blue-600">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/name.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-semibold mb-3 text-gray-700">Name Based Gifts</h3>
        </div>
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

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center">
      {/* Card 1 */}
      <div className="book mx-auto">
        <div className="cover">
          <img
            src="https://media.istockphoto.com/id/506840479/photo/frame-samples.webp?a=1&b=1&s=612x612&w=0&k=20&c=NJmoBb6nwTs_yEGVkZgEdLb6wMApIEh__XaW9mWTWQc="
            alt="Customer Review"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Areeba’s Custom Frame</h3>
          <p className="text-sm">
            “Absolutely loved the calligraphy frame I ordered for my father! Great quality and fast delivery.”
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="book mx-auto">
        <div className="cover">
          <img
            src="https://plus.unsplash.com/premium_photo-1673356301514-2cad91907f74?w=600"
            alt="Customer Review"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Yasir’s Branded Tees</h3>
          <p className="text-sm">
            “Ordered 10 personalized t-shirts for my team — amazing print quality and fits perfectly.”
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="book mx-auto">
        <div className="cover">
          <img
            src="https://images.unsplash.com/photo-1617902200814-abc4adc59011?w=600"
            alt="Customer Review"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Irfan’s Gift Combo</h3>
          <p className="text-sm">
            “Got a name mug + frame combo for my brother’s wedding. Everyone loved it!”
          </p>
        </div>
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
