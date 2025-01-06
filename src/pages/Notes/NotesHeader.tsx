import React from 'react';
import { Plus } from 'lucide-react';

interface NotesHeaderProps {
  onNewNote: () => void;
}

const NotesHeader: React.FC<NotesHeaderProps> = ({ onNewNote }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Research Notes</h1>
      <p className="text-gray-600 mt-2">Organize and manage your research notes</p>
    </div>
    <button
      onClick={onNewNote}
      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      <Plus className="w-5 h-5 mr-2" />
      New Note
    </button>
  </div>
);

export default NotesHeader;