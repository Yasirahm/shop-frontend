import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Basic hardcoded admin check
    if (
      (email === "uzairmursaleen8@gmail.com" && password === "Mehuza@6389#peace") ||
      (email === "ratherseenu16@gmail.com" && password === "yasir")
    ) {
      localStorage.setItem("isAdmin", "true");
      alert("✅ Admin login successful!");
      navigate("/admin-panel22250040");
    } else {
      alert("❌ Invalid admin credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-lg w-full max-w-xs"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
