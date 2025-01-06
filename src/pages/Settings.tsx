import React from 'react';
import { User, Bell, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-8">
      {/* ... other settings content ... */}

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default Settings;