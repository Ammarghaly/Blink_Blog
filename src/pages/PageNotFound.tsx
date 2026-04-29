import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-[var(--color-neutral)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
