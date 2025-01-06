import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_USER } from '../../config/demoUser';

const DemoLoginButton: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login(DEMO_USER.email, DEMO_USER.password);
    } catch (error) {
      console.error('Demo login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDemoLogin}
      disabled={loading}
      className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
    >
      {loading ? 'Logging in...' : 'Try Demo Account'}
    </button>
  );
};

export default DemoLoginButton;