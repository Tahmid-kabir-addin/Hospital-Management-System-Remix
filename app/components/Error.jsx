import { Link } from "@remix-run/react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl text-red-500 font-bold mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong. Please try again later.
        </p>
        <Link to="/home">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
