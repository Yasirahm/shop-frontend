import { Link } from "react-router-dom";

const Other = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600891963935-cd93f0f7cf0e?auto=format&fit=crop&w=1350&q=80')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">Customized Products for Every Need</h1>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">We Specialize In</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Restaurant Menu Cards",
              desc: "Beautiful, durable, and custom-designed menu cards for restaurants.",
              img: "https://images.unsplash.com/photo-1557499305-bd68d0ad468d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lbnUlMjBjYXJkc3xlbnwwfHwwfHx8MA%3D%3D"
            },
            {
              title: "Restaurant T-Shirts",
              desc: "Custom staff uniforms printed with your restaurant's logo and theme.",
              img: "https://images.unsplash.com/photo-1729678753860-bf38e4db039e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnQlMjB0JTIwc2hpcnRzfGVufDB8fDB8fHww"
            },
            {
              title: "Cricket Team Jerseys",
              desc: "Design your dream cricket team t-shirts with names, numbers, and sponsors.",
              img: "https://images.unsplash.com/photo-1595210382266-2d0077c1f541?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D"
            },
            {
              title: "Custom Printed Mugs",
              desc: "Gift your loved ones or promote your brand with personalized mugs.",
              img: "https://images.unsplash.com/photo-1614940403522-a8c829e7eb82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVnc3xlbnwwfHwwfHx8MA%3D%3D"
            },
            {
              title: "Branded Keychains",
              desc: "Create stylish and meaningful keychains for personal or promotional use.",
              img: "https://images.unsplash.com/photo-1725826474457-d4dc3d6d8abf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGtleWNoYWluc3xlbnwwfHwwfHx8MA%3D%3D"
            },
            {
              title: "Event Printing",
              desc: "From weddings to business events, get custom t-shirts, banners and more.",
              img: "https://images.unsplash.com/photo-1712903276040-c99b32a057eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnQlMjBwcmludHxlbnwwfHwwfHx8MA%3D%3D"
            },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.desc}</p>
                <Link
                  to="/contact"
                  className="inline-block text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded"
                >
                  Contact to Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Have an idea for a custom product?</h3>
        <p className="mb-6">We love bringing your designs to life. Get in touch today!</p>
        <Link to="/contact" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow-md hover:bg-gray-100">
          Get a Quote
        </Link>
      </div>
    </div>
  );
};

export default Other;
