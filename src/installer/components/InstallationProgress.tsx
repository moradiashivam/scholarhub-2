import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface InstallationProgressProps {
  onComplete: () => void;
}

interface Step {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

const InstallationProgress: React.FC<InstallationProgressProps> = ({ onComplete }) => {
  const [steps, setSteps] = useState<Step[]>([
    { id: 'database', label: 'Creating database schema', status: 'pending' },
    { id: 'admin', label: 'Setting up admin account', status: 'pending' },
    { id: 'config', label: 'Generating configuration files', status: 'pending' }
  ]);

  useEffect(() => {
    const runInstallation = async () => {
      for (const step of steps) {
        setSteps(current =>
          current.map(s =>
            s.id === step.id ? { ...s, status: 'running' } : s
          )
        );

        try {
          await fetch(`/api/installer/${step.id}`, { method: 'POST' });
          setSteps(current =>
            current.map(s =>
              s.id === step.id ? { ...s, status: 'completed' } : s
            )
          );
        } catch (error) {
          setSteps(current =>
            current.map(s =>
              s.id === step.id ? { ...s, status: 'error' } : s
            )
          );
          return;
        }
      }

      onComplete();
    };

    runInstallation();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Installing ScholarHub</h2>
      
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