import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CompletionPageProps {
  adminEmail: string;
  siteUrl: string;
}

const CompletionPage: React.FC<CompletionPageProps> = ({ adminEmail, siteUrl }) => {
  return (
    <div className="text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Installation Complete!</h1>
      <p className="text-gray-600 mb-8">
        ScholarHub has been successfully installed and configured.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-2">Admin Login Details</h3>
        <p className="text-gray-600">Email: {adminEmail}</p>
        <p className="text-gray-600 mb-4">Password: (The one you set during installation)</p>
        <p className="text-sm text-gray-500">
          Please save these credentials in a secure location.
        </p>
      </div>

      <a
        href={siteUrl}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-block"
      >
        Go to Login Page
      </a>
    </div>
  );
};

export default CompletionPage;