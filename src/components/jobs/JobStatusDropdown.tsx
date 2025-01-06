import React from 'react';
import { JobApplicationStatus } from '../../types/job';

interface JobStatusDropdownProps {
  status: JobApplicationStatus;
  onChange: (status: JobApplicationStatus) => void;
  className?: string;
}

const JobStatusDropdown: React.FC<JobStatusDropdownProps> = ({ 
  status, 
  onChange,
  className = ''
}) => {
  const statusOptions: Array<{ value: JobApplicationStatus; label: string }> = [
    { value: 'submission-complete', label: 'Submission Complete' },
    { value: 'security-check', label: 'Security Check' },
    { value: 'interview-phase', label: 'Interview Phase' },
    { value: 'selected', label: 'Selected' },
    { value: 'not-selected', label: 'Not Selected' },
    { value: 'process-completed', label: 'Process Completed' }
  ];

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as JobApplicationStatus)}
      className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 
        text-sm font-medium bg-white dark:bg-gray-800 focus:outline-none 
        focus:ring-2 focus:ring-indigo-500 ${className}`}
    >
      {statusOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default JobStatusDropdown;