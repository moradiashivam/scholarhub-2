import React, { useState } from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const renderForm = () => {
    switch (mode) {
      case 'register':
        return <RegisterForm />;
      case 'forgot':
        return <ForgotPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case 'register':
        return 'Create Account';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Sign In';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back to Website Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Website
      </Link>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            ScholarHub
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {renderTitle()}
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderForm()}

          <div className="mt-6">
            {mode === 'login' && (
              <div className="text-sm text-center space-y-2">
                <button
                  onClick={() => setMode('forgot')}
                  className="text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </button>
                <div>
                  <span className="text-gray-500">Don't have an account? </span>
                  <button
                    onClick={() => setMode('register')}
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
            {(mode === 'register' || mode === 'forgot') && (
              <div className="text-sm text-center">
                <button
                  onClick={() => setMode('login')}
                  className="text-primary-600 hover:text-primary-500"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;