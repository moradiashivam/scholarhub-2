import React from 'react';
import { GraduationCap } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  return (
    <div className="text-center">
      <GraduationCap className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Welcome to ScholarHub</h1>
      <p className="text-gray-600 mb-8">
        This wizard will guide you through the installation process of ScholarHub,
        your comprehensive research management platform.
      </p>
      <button
        onClick={onNext}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Begin Installation
      </button>
    </div>
  );
};

export default WelcomePage;