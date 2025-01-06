import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import DatabaseSetup from './components/DatabaseSetup';
import AdminSetup from './components/AdminSetup';
import InstallationProgress from './components/InstallationProgress';
import CompletionPage from './components/CompletionPage';

const Installer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [adminEmail, setAdminEmail] = useState('');

  const steps = [
    { component: WelcomePage },
    { component: DatabaseSetup },
    { component: AdminSetup },
    { component: InstallationProgress },
    { component: CompletionPage }
  ];

  const handleNext = () => {
    setCurrentStep(current => current + 1);
  };

  const handleBack = () => {
    setCurrentStep(current => current - 1);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          adminEmail={adminEmail}
          siteUrl={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Installer;