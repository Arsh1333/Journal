import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Daily Journal App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Keep track of your thoughts and memories. Sign in or register to start
          journaling!
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
