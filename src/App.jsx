import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Customize from "./pages/Customize";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import WhatsappButton from "./components/WhatsappButton";
import AddOffer from "./pages/AddOffer";
import { NotFoundPage } from "./pages/Error"; // Adjust path if needed

axios.defaults.withCredentials = true;

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/admin/add-offer" element={<AddOffer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/whatsapp" element={<WhatsappButton />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 Admin Panel Protection */}
        <Route
          path="/admin-panel22250040"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" replace />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
