import { useState, useEffect } from 'react';
import { Users, Package, Shield, BarChart3 } from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalSwaps: 0,
    pendingItems: 0
  });

  useEffect(() => {
    // TODO: Fetch admin stats
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Admin Panel</h1>
        <p className="text-gray-600 text-sm md:text-base">Manage the ReWear platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

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
            <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Swaps</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalSwaps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Shield className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">Pending Items</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.pendingItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">User Management</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              View All Users
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              Ban/Unban Users
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              User Statistics
            </button>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">Item Management</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              Pending Approvals
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              All Items
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-sm md:text-base">
              Item Statistics
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm md:text-base">Admin panel features coming soon...</p>
      </div>
    </div>
  );
};

export default AdminPanel; 