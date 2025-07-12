import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Package, Users, Clock, Star } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    pendingRequests: 0,
    pendingItemRequests: 0,
    points: user?.points || 0
  });

  useEffect(() => {
    // TODO: Fetch dashboard stats
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Dashboard</h1>
        <p className="text-gray-600 text-sm md:text-base">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Package className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Item Requests</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.pendingItemRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Star className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Points</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm md:text-base">
            Add New Item
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base">
            View Requests
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm md:text-base">
            Browse Items
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm md:text-base">Dashboard features coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard; 