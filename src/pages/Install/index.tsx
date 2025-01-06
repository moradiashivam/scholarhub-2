import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import DatabaseSetup from './DatabaseSetup';
import AdminSetup from './AdminSetup';
import InstallationProgress from './InstallationProgress';
import CompletionPage from './CompletionPage';

type Step = 'database' | 'admin' | 'install' | 'complete';

const Install = () => {
  const [currentStep, setCurrentStep] = useState<Step>('database');
  const [dbConfig, setDbConfig] = useState({
    host: '',
    port: '3306',
    username: '',
    password: '',
    database: ''
  });
  const [adminConfig, setAdminConfig] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleDatabaseNext = (config: typeof dbConfig) => {
    setDbConfig(config);
    setCurrentStep('admin');
  };

  const handleAdminNext = (config: typeof adminConfig) => {
    setAdminConfig(config);
    setCurrentStep('install');
  };

  const handleInstallationComplete = () => {
    setCurrentStep('complete');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <GraduationCap className="w-16 h-16 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">ScholarHub Setup</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="relative">
              <div className="flex items-center justify-between">
                {['Database', 'Admin', 'Install', 'Complete'].map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                        ['database', 'admin', 'install', 'complete'][index] === currentStep
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
            </div>
          </div>

          {currentStep === 'database' && (
            <DatabaseSetup
              initialConfig={dbConfig}
              onNext={handleDatabaseNext}
            />
          )}

          {currentStep === 'admin' && (
            <AdminSetup
              initialConfig={adminConfig}
              onNext={handleAdminNext}
              onBack={() => setCurrentStep('database')}
            />
          )}

          {currentStep === 'install' && (
            <InstallationProgress
              dbConfig={dbConfig}
              adminConfig={adminConfig}
              onComplete={handleInstallationComplete}
            />
          )}

          {currentStep === 'complete' && (
            <CompletionPage
              adminEmail={adminConfig.email}
              siteUrl={window.location.origin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Install;