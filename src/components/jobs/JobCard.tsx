import React from 'react';
import { Calendar, MapPin, Building2, Briefcase, Edit3, Trash2 } from 'lucide-react';
import { JobApplication } from '../../types/job';
import { format } from 'date-fns';

interface JobCardProps {
  application: JobApplication;
  onEdit: (application: JobApplication) => void;
  onDelete: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ application, onEdit, onDelete }) => {
  const statusColors = {
    'draft': 'bg-gray-100 text-gray-800',
    'applied': 'bg-blue-100 text-blue-800',
    'interviewing': 'bg-yellow-100 text-yellow-800',
    'offered': 'bg-purple-100 text-purple-800',
    'accepted': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {application.position}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
            {application.status}
          </span>
          <button
            onClick={() => onEdit(application)}
            className="p-1 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Edit application"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{application.organization}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{application.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Briefcase className="w-4 h-4 mr-2" />
          <span>{application.type}</span>
        </div>
        {application.deadline && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Deadline: {format(new Date(application.deadline), 'MMM d, yyyy')}</span>
          </div>
        )}
      </div>

      {application.nextSteps && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-1">Next Steps:</p>
          <p className="line-clamp-2">{application.nextSteps}</p>
        </div>
      )}
    </div>
  );
};

export default JobCard;