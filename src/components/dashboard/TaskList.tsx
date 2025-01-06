import React from 'react';
import { Task } from '../../types/dashboard';
import TaskHeader from './tasks/TaskHeader';
import TaskInput from './tasks/TaskInput';
import TaskItem from './tasks/TaskItem';

interface TaskListProps {
  tasks?: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [], // Provide default empty array
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask
}) => {
  return (
    <div className="h-full flex flex-col">
      <TaskInput onAddTask={onAddTask} />
      
      <div className="flex-1 overflow-auto mt-4 space-y-2">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;