import React, { useState } from 'react';
import { Plus, Calendar, Flag } from 'lucide-react';
import { Deadline } from '../../../types';

interface DeadlineFormProps {
  onSubmit: (deadline: Omit<Deadline, 'id'>) => void;
}

const DeadlineForm: React.FC<DeadlineFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Deadline['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && dueDate) {
      onSubmit({
        title: title.trim(),
        dueDate,
        priority,
        completed: false
      });
      setTitle('');
      setDueDate('');
      setPriority('medium');
    }
  };

  const priorityColors = {
    low: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    high: 'text-red-600 bg-red-50 dark:bg-red-900/20'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new deadline..."
            className="w-full pl-4 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 
              rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 
              dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
            transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 
              rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 
              dark:text-gray-100"
          />
        </div>

        <div className="relative w-40">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Flag className="w-4 h-4 text-gray-400" />
          </div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Deadline['priority'])}
            className={`w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 
              rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none
              ${priorityColors[priority]}`}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default DeadlineForm;