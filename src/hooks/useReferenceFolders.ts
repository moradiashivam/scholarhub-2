import { useState, useEffect } from 'react';

const STORAGE_KEY = 'reference_folders';

export const useReferenceFolders = () => {
  const [folders, setFolders] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['Default'];
  });

  const [selectedFolder, setSelectedFolder] = useState(folders[0] || 'Default');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
  }, [folders]);

  const addFolder = (name: string) => {
    if (!folders.includes(name)) {
      setFolders(prev => [...prev, name]);
    }
  };

  const deleteFolder = (name: string) => {
    if (name === 'Default') return; // Prevent deleting default folder
    setFolders(prev => prev.filter(f => f !== name));
    if (selectedFolder === name) {
      setSelectedFolder('Default');
    }
  };

  return {
    folders,
    selectedFolder,
    setSelectedFolder,
    addFolder,
    deleteFolder
  };
};