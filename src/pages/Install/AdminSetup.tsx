import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AdminSetupProps {
  initialConfig: {
    name: string;
    email: string;
    password: string;
  };
  onNext: (config: AdminSetupProps['initialConfig']) => void;
  onBack: () => void;
}

const AdminSetup: React.FC<AdminSetupProps> = ({ initialConfig, onNext, onBack }) => {
  const [config, setConfig] = useState(initialConfig);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (config.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (config.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    onNext(config);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Create Admin Account</h2>
        <p className="text-gray-600 mt-1">Set up your administrator account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={config.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={config.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={config.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSetup;