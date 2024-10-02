import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            Daily Journal
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Add Post
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
