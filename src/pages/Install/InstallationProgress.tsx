import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { installSystem } from '../../lib/api/install';

interface InstallationProgressProps {
  dbConfig: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  adminConfig: {
    name: string;
    email: string;
    password: string;
  };
  onComplete: () => void;
}

interface Step {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

const InstallationProgress: React.FC<InstallationProgressProps> = ({
  dbConfig,
  adminConfig,
  onComplete
}) => {
  const [steps, setSteps] = useState<Step[]>([
    { id: 'database', label: 'Creating database schema', status: 'pending' },
    { id: 'admin', label: 'Creating admin account', status: 'pending' },
    { id: 'config', label: 'Saving configuration', status: 'pending' }
  ]);

  useEffect(() => {
    const runInstallation = async () => {
      try {
        await installSystem(dbConfig, adminConfig, (stepId: string) => {
          setSteps(current =>
            current.map(step =>
              step.id === stepId
                ? { ...step, status: 'running' }
                : step
            )
          );
        });
        
        setSteps(current =>
          current.map(step => ({ ...step, status: 'completed' }))
        );
        
        onComplete();
      } catch (error) {
        setSteps(current =>
          current.map(step =>
            step.status === 'running'
              ? { ...step, status: 'error' }
              : step
          )
        );
      }
    };

    runInstallation();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-8">Installing ScholarHub</h2>
      
      <div className="space-y-4">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border"
          >
            <span className="text-gray-700">{step.label}</span>
            <div>
              {step.status === 'running' && (
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              )}
              {step.status === 'completed' && (
                <div className="w-5 h-5 bg-green-500 rounded-full" />
              )}
              {step.status === 'error' && (
                <div className="w-5 h-5 bg-red-500 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstallationProgress;