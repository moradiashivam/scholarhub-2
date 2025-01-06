import React, { useState } from 'react';
import { FileStorage, FileStorageStats } from '../types';
import FileUploader from '../components/files/FileUploader';
import FileList from '../components/files/FileList';

const Files = () => {
  const [files, setFiles] = useState<FileStorage[]>([]);
  const [stats, setStats] = useState<FileStorageStats>({
    usedSpace: 0,
    totalSpace: 100 * 1024 * 1024, // 100MB
    fileCount: 0,
  });

  const handleUpload = async (file: File) => {
    // In a real app, you would upload to a server here
    const newFile: FileStorage = {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.name.split('.').pop() as FileStorage['fileType'],
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file),
    };

    setFiles((prev) => [...prev, newFile]);
    setStats((prev) => ({
      ...prev,
      usedSpace: prev.usedSpace + file.size,
      fileCount: prev.fileCount + 1,
    }));
  };

  const handleDownload = (file: FileStorage) => {
    // In a real app, you would download from the server
    window.open(file.url, '_blank');
  };

  const handleDelete = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setStats((prev) => ({
      ...prev,
      usedSpace: prev.usedSpace - file.fileSize,
      fileCount: prev.fileCount - 1,
    }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Files</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload and manage your research documents
        </p>
      </div>

      <div className="max-w-3xl">
        <FileUploader onUpload={handleUpload} stats={stats} />
        <div className="mt-8">
          <FileList
            files={files}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Files;