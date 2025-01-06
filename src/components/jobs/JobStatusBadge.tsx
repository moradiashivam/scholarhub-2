import React from 'react';
import { JobApplicationStatus } from '../../types/job';

interface JobStatusBadgeProps {
  status: JobApplicationStatus;
}

const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<JobApplicationStatus, { label: string; color: string }> = {
    'submission-complete': { 
      label: 'Submission Complete', 
      color: 'bg-blue-100 text-blue-800'
    },
    'security-check': { 
      label: 'Security Check', 
      color: 'bg-yellow-100 text-yellow-800'
    },
    'interview-phase': { 
      label: 'Interview Phase', 
      color: 'bg-purple-100 text-purple-800'
    },
    'selected': { 
      label: 'Selected', 
      color: 'bg-green-100 text-green-800'
    },
    'not-selected': { 
      label: 'Not Selected', 
      color: 'bg-red-100 text-red-800'
    },
    'process-completed': { 
      label: 'Process Completed', 
      color: 'bg-gray-100 text-gray-800'
    }
  };

  const { label, color } = statusConfig[status];

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {label}
    </span>
  );
};

export default JobStatusBadge;