import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => (
  <div className="flex items-center space-x-6 ml-6">
    <Link
      to="/login"
      className="px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
    >
      Sign In
    </Link>
    <Link
      to="/register"
      className="px-6 py-3 text-lg font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Get Started
    </Link>
  </div>
);

export default AuthButtons;