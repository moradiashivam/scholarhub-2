import React from 'react';
import { Calendar, Tag, FileText, Trash2, Edit3, FileType } from 'lucide-react';
import { JournalSubmission, DOCUMENT_TYPES } from '../../types/journal';
import { format } from 'date-fns';

interface SubmissionCardProps {
  submission: JournalSubmission;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: JournalSubmission['status']) => void;
  onEdit: (submission: JournalSubmission) => void;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  onDelete,
  onUpdateStatus,
  onEdit
}) => {
  const statusColors = {
    'submitted': 'bg-blue-100 text-blue-800',
    'under-review': 'bg-yellow-100 text-yellow-800',
    'accepted': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'published': 'bg-purple-100 text-purple-800'
  };

  const documentType = DOCUMENT_TYPES.find(type => type.value === submission.documentType)?.label;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {submission.title}
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={submission.status}
            onChange={(e) => onUpdateStatus(submission.id, e.target.value as JournalSubmission['status'])}
            className={`text-sm font-medium px-3 py-1 rounded-full border-0 ${statusColors[submission.status]}`}
          >
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={() => onEdit(submission)}
            className="p-1 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Edit submission"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(submission.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete submission"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Submitted: {format(new Date(submission.submissionDate), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <FileText className="w-4 h-4 mr-2" />
          <span>{submission.journalName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Tag className="w-4 h-4 mr-2" />
          <span>{submission.indexingPlatform}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <FileType className="w-4 h-4 mr-2" />
          <span>{documentType}</span>
        </div>
      </div>

      {submission.notes && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="line-clamp-2">{submission.notes}</p>
        </div>
      )}
    </div>
  );
};

export default SubmissionCard;