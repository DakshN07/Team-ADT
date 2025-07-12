import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, User, Plus, LogOut, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            {isAuthenticated && (
              <Link to="/add-item" className="text-gray-700 hover:text-green-600 transition-colors">
                Add Item
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600 transition-colors">
                Admin Panel
              </Link>
            )}
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user?.points || 0} points</span>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-4 pb-6 space-y-4">
          <Link to="/browse" className="block text-gray-700 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>
            Browse Items
          </Link>
          {isAuthenticated && (
            <Link to="/add-item" className="block text-gray-700 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>
              Add Item
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="block text-gray-700 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>
              Admin Panel
            </Link>
          )}
          <hr />
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
                <span className="ml-auto text-xs text-gray-500">{user?.points || 0} pts</span>
              </div>
              <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 mt-2" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block w-full text-left text-gray-700 hover:text-green-600 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 