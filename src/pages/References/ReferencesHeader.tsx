import React from 'react';
import { Plus } from 'lucide-react';
import FolderManager from '../../components/references/FolderManager';
import { useReferenceFolders } from '../../hooks/useReferenceFolders';

interface ReferencesHeaderProps {
  onNewReference: () => void;
}

const ReferencesHeader: React.FC<ReferencesHeaderProps> = ({ onNewReference }) => {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    addFolder,
    deleteFolder
  } = useReferenceFolders();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">References Library</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your research references and citations</p>
        </div>
        <button
          onClick={onNewReference}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Reference
        </button>
      </div>

      <FolderManager
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onAddFolder={addFolder}
        onDeleteFolder={deleteFolder}
      />
    </div>
  );
};

export default ReferencesHeader;