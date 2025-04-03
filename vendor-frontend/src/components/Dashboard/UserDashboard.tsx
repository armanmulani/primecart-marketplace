import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Welcome to your Dashboard!</h2>
            <p className="text-gray-600">
              You have successfully logged in to your account.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Your Profile</h3>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Your Orders</h3>
              <p className="text-gray-600">View your order history and track deliveries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;