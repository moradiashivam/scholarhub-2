import React, { useState } from 'react';
import { BarChart3, Plus } from 'lucide-react';
import MilestoneItem from './MilestoneItem';
import MilestoneForm from './MilestoneForm';
import { Milestone } from '../../../types';

const ResearchProgress: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  const handleProgressChange = (id: string, progress: number) => {
    setMilestones(milestones.map(milestone =>
      milestone.id === id ? { ...milestone, progress } : milestone
    ));
  };

  const handleDelete = (id: string) => {
    setMilestones(milestones.filter(milestone => milestone.id !== id));
  };

  const handleAddMilestone = (title: string) => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title,
      progress: 0
    };
    setMilestones([...milestones, newMilestone]);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setEditingMilestone(milestone);
  };

  const handleUpdateMilestone = (title: string) => {
    if (editingMilestone) {
      setMilestones(milestones.map(milestone =>
        milestone.id === editingMilestone.id ? { ...milestone, title } : milestone
      ));
      setEditingMilestone(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Research Progress</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Add milestone"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            onProgressChange={handleProgressChange}
            onDelete={handleDelete}
            onEdit={handleEditMilestone}
          />
        ))}
        {milestones.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No milestones added. Click the plus button to add one.
          </p>
        )}
      </div>

      {(showForm || editingMilestone) && (
        <MilestoneForm
          onSubmit={editingMilestone ? handleUpdateMilestone : handleAddMilestone}
          onClose={() => {
            setShowForm(false);
            setEditingMilestone(null);
          }}
          initialTitle={editingMilestone?.title}
        />
      )}
    </div>
  );
};

export default ResearchProgress;