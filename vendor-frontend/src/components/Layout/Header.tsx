import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Vendor App</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-900 hover:text-gray-700 px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;