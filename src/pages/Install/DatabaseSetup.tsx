import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { testDatabaseConnection } from '../../lib/api/install';

interface DatabaseSetupProps {
  initialConfig: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  onNext: (config: DatabaseSetupProps['initialConfig']) => void;
}

const DatabaseSetup: React.FC<DatabaseSetupProps> = ({ initialConfig, onNext }) => {
  const [config, setConfig] = useState(initialConfig);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
    setError('');
  };

  const handleTest = async () => {
    setTesting(true);
    setError('');

    try {
      await testDatabaseConnection(config);
      onNext(config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <Database className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Database Configuration</h2>
        <p className="text-gray-600 mt-1">Configure your MySQL database connection</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleTest(); }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Host
          </label>
          <input
            type="text"
            name="host"
            value={config.host}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Port
          </label>
          <input
            type="text"
            name="port"
            value={config.port}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={config.username}
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Database Name
          </label>
          <input
            type="text"
            name="database"
            value={config.database}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={testing}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {testing ? 'Testing Connection...' : 'Test & Continue'}
        </button>
      </form>
    </div>
  );
};

export default DatabaseSetup;