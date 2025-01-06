import React from 'react';
import { Circle, CheckCircle2, Clock, Trash2, AlertCircle } from 'lucide-react';
import { Deadline } from '../../../types';
import { formatDistanceToNow, isPast } from 'date-fns';

interface DeadlineItemProps {
  deadline: Deadline;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DeadlineItem: React.FC<DeadlineItemProps> = ({
  deadline,
  onToggleComplete,
  onDelete
}) => {
  const priorityColors = {
    high: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800'
    },
    medium: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800'
    },
    low: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800'
    }
  };

  const colors = priorityColors[deadline.priority];
  const isOverdue = isPast(new Date(deadline.dueDate)) && !deadline.completed;

  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 
        ${colors.bg} ${colors.border}
        ${deadline.completed ? 'opacity-75' : ''}
        hover:shadow-md hover:scale-[1.01] group`}
    >
      <button
        onClick={() => onToggleComplete(deadline.id)}
        className={`flex-shrink-0 transition-colors duration-200 ${colors.text}`}
      >
        {deadline.completed ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-medium truncate
            ${deadline.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}
          >
            {deadline.title}
          </h3>
          {isOverdue && (
            <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
          )}
        </div>
        <div className="flex items-center text-xs mt-1 space-x-2">
          <span className={`flex items-center ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            <Clock className="w-3 h-3 mr-1" />
            {isOverdue ? 'Overdue by ' : 'Due '}
            {formatDistanceToNow(new Date(deadline.dueDate))}
            {isOverdue ? '' : ' from now'}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.text} ${colors.bg}`}>
            {deadline.priority}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(deadline.id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 
          rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform 
          hover:scale-110"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DeadlineItem;