import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Logo.jpg"; // ✅ Make sure the path is correct

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-1 py-3 flex justify-between items-center">
        
        {/* ✅ Logo with image */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="NewAge Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="hidden sm:inline text-lg md:text-2xl font-bold text-blue-600">
            NewAge Versatile Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/offers" className="hover:text-blue-600">Offers</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/products" className="hover:text-blue-600">Shop</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl text-blue-600 cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-3 font-medium text-gray-700">
          <Link to="/" onClick={toggleMenu} className="block hover:text-blue-600">Home</Link>
          <Link to="/offers" onClick={toggleMenu} className="block hover:text-blue-600">Offers</Link>
          <Link to="/contact" onClick={toggleMenu} className="block hover:text-blue-600">Contact</Link>
          <Link to="/products" onClick={toggleMenu} className="block hover:text-blue-600">Shop</Link>
          <Link to="/cart" onClick={toggleMenu} className="block hover:text-blue-600">Cart</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
