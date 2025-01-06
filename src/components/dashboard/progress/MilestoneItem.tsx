import React from 'react';
import { Trash2, Pencil } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { Milestone } from '../../../types';

interface MilestoneItemProps {
  milestone: Milestone;
  onProgressChange: (id: string, progress: number) => void;
  onDelete: (id: string) => void;
  onEdit: (milestone: Milestone) => void;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  milestone,
  onProgressChange,
  onDelete,
  onEdit
}) => {
  return (
    <div className="group">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {milestone.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {milestone.progress}%
          </span>
          <button
            onClick={() => onEdit(milestone)}
            className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Edit milestone"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(milestone.id)}
            className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete milestone"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ProgressBar
        progress={milestone.progress}
        onChange={(value) => onProgressChange(milestone.id, value)}
      />
    </div>
  );
};

export default MilestoneItem;