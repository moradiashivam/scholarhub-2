import React from 'react';
import { JournalSubmission } from '../../types/journal';
import SubmissionCard from './SubmissionCard';

interface SubmissionListProps {
  submissions: JournalSubmission[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: JournalSubmission['status']) => void;
  onEdit: (submission: JournalSubmission) => void;
}

const SubmissionList: React.FC<SubmissionListProps> = ({
  submissions,
  onDelete,
  onUpdateStatus,
  onEdit
}) => {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No submissions found
        </p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          Add your first journal submission using the button above
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {submissions.map(submission => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default SubmissionList;