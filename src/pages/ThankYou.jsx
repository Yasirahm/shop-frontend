import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-16">
      <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your order has been placed successfully. We've also sent a confirmation email to you.
        </p>
        <Link
          to="/"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
