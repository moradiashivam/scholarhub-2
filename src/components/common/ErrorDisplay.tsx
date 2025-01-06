import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="p-8 rounded-lg bg-red-50 dark:bg-red-900/20">
    <div className="flex items-center gap-3">
      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  </div>
);

export default ErrorDisplay;