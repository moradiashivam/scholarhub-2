import React, { useState } from 'react';
import { Deadline } from '../../../types';
import DeadlineList from './DeadlineList';
import DeadlineForm from './DeadlineForm';

const DeadlineSection: React.FC = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  const handleAddDeadline = (deadline: Omit<Deadline, 'id'>) => {
    const newDeadline: Deadline = {
      ...deadline,
      id: Date.now().toString()
    };
    setDeadlines([...deadlines, newDeadline]);
  };

  const handleToggleComplete = (id: string) => {
    setDeadlines(deadlines.map(deadline =>
      deadline.id === id
        ? { ...deadline, completed: !deadline.completed }
        : deadline
    ));
  };

  const handleDelete = (id: string) => {
    setDeadlines(deadlines.filter(deadline => deadline.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <DeadlineForm onSubmit={handleAddDeadline} />
      <div className="flex-1 overflow-auto">
        <DeadlineList
          deadlines={deadlines}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeadlineSection;