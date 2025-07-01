export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};