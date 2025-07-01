import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-400 mb-2">The NewAge Versatile Studio Store</h2>
          <p className="text-sm text-gray-400">
            Premium products delivered with love. Customize your style, shop with comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/offers" className="hover:text-white">Offers</Link></li>
            <li><Link to="/customize" className="hover:text-white">Customize</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-sm text-gray-400">Email: uzairmursaleen8@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +91-9858100244</p>
          <p className="text-sm text-gray-400">Location: Srinagar, Kashmir</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-4">
        <p>© {new Date().getFullYear()} &trade; The New Generation Versatile Studio Store. All rights reserved.</p>
        <p className="mt-1">
          Designed &amp; Created by <a href="https://yasirhamid.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 font-semibold">Yasir Hamid</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
