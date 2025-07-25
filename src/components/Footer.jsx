import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import AdBanner from "./AdBanner";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Studio Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-blue-400 mb-3 tracking-tight">
            NewAge Versatile Studio
          </h2>
          <p className="text-sm text-gray-400">
            Premium products delivered with love. Customize your style, shop with comfort.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/newage_versatile_studio?igsh=YmFsd2h3aWVmOHA1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-lg" />
            </a>
            <p className="text-sm text-gray-400">
              <span className="block">See product videos or order directly</span>
              <a
                href="https://www.instagram.com/newage_versatile_studio?igsh=YmFsd2h3aWVmOHA1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Visit Instagram Page
              </a>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400">Products</Link></li>
            <li><Link to="/offers" className="hover:text-blue-400">Offers</Link></li>
            <li><Link to="/customize" className="hover:text-blue-400">Customize</Link></li>
            <li><Link to="/admin-login" className="hover:text-blue-400">Admin</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400">Your Cart</Link></li>
            <li>
              <a
                href="https://yasirhamid.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Portfolio (Yasir Hamid)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Contact Info
          </h3>
          <p className="text-sm text-gray-400">📧 uzairmursaleen8@gmail.com</p>
          <p className="text-sm text-gray-400">📞 +91-9858100244</p>
          <p className="text-sm text-gray-400">📍 Srinagar, Kashmir</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-gray-400 text-center text-sm py-4 border-t border-gray-700">
        <p>© {new Date().getFullYear()} NewAge Versatile Studio. All rights reserved.</p>
        <p className="mt-1">
          Designed & Created by{" "}
          <a
            href="https://yasirhamid.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Yasir Hamid
          </a>
        </p>
      </div>
      <AdBanner />
    </footer>
  );
};

export default Footer;
