import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isAdmin = true; // Replace with actual admin check logic

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className={`block px-4 py-2 rounded ${
              location.pathname === '/dashboard'
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Overview
          </Link>
          {isAdmin && (
            <>
              <Link
                to="/dashboard/products"
                className={`block px-4 py-2 rounded ${
                  location.pathname === '/dashboard/products'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Manage Products
              </Link>
              <Link
                to="/dashboard/users"
                className={`block px-4 py-2 rounded ${
                  location.pathname === '/dashboard/users'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Manage Users
              </Link>
            </>
          )}
          <Link
            to="/dashboard/profile"
            className={`block px-4 py-2 rounded ${
              location.pathname === '/dashboard/profile'
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;