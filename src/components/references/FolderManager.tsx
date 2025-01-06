import React, { useState } from 'react';
import { Folder, X, Plus } from 'lucide-react';

interface FolderManagerProps {
  folders: string[];
  onAddFolder: (name: string) => void;
  onDeleteFolder: (name: string) => void;
  selectedFolder: string;
  onSelectFolder: (name: string) => void;
}

const FolderManager: React.FC<FolderManagerProps> = ({
  folders,
  onAddFolder,
  onDeleteFolder,
  selectedFolder,
  onSelectFolder
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setShowForm(false);
    }
  };

  return (
    <div className="mb-6">
      {showForm ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <Plus className="w-4 h-4" />
          New Folder
        </button>
      )}

      {folders.length > 0 && (
        <div className="mt-4 space-y-1">
          {folders.map((folder) => (
            <div
              key={folder}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                selectedFolder === folder
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => onSelectFolder(folder)}
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span className="text-sm">{folder}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder);
                }}
                className="p-1 text-gray-400 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderManager;