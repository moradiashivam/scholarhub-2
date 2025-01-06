import React from 'react';
import { Deadline } from '../../../types';
import DeadlineItem from './DeadlineItem';

interface DeadlineListProps {
  deadlines: Deadline[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DeadlineList: React.FC<DeadlineListProps> = ({
  deadlines,
  onToggleComplete,
  onDelete
}) => {
  const sortedDeadlines = [...deadlines].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  if (deadlines.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        <p>No upcoming deadlines</p>
        <p className="text-sm mt-1">Add a deadline using the form above</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-auto">
      {sortedDeadlines.map((deadline) => (
        <DeadlineItem
          key={deadline.id}
          deadline={deadline}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DeadlineList;