import React, { useState } from 'react';
import { Circle, CheckCircle2, Clock } from 'lucide-react';
import { Task } from '../../../types';
import TaskActions from './TaskActions';
import TaskEditForm from './TaskEditForm';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (newTitle: string) => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskEditForm
        initialTitle={task.title}
        onSave={handleEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm sm:text-base truncate ${
          task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
        }`}>
          {task.title}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock className="w-3 h-3 mr-1" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <TaskActions
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
};

export default TaskItem;