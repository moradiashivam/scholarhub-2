import React from 'react';
import { JobApplication } from '../../types/job';
import JobCard from './JobCard';

interface JobListProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ applications, onEdit, onDelete }) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No job applications found
        </p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          Start tracking your applications using the button above
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {applications.map(application => (
        <JobCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JobList;