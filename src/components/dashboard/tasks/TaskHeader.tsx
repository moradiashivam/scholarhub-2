import React from 'react';
import { Task } from '../../../types';

interface TaskHeaderProps {
  tasks: Task[];
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg sm:text-xl font-semibold">Tasks</h2>
      <span className="text-sm text-gray-500">
        {completedTasks}/{tasks.length} completed
      </span>
    </div>
  );
};

export default TaskHeader;