import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://shop-backend-svqa.onrender.com/api/auth/register", form);
      alert("✅ Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert("❌ Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {["name", "email", "password"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          required
          className="w-full border px-3 py-2 mb-4 rounded"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
};

export default Register;
