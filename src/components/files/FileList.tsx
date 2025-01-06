import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { FileStorage } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface FileListProps {
  files: FileStorage[];
  onDownload: (file: FileStorage) => void;
  onDelete: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDownload, onDelete }) => {
  const getFileIcon = (type: FileStorage['fileType']) => {
    return <FileText className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No files uploaded yet</p>
        <p className="text-sm mt-1">Upload files using the form above</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="text-gray-500 dark:text-gray-400">
              {getFileIcon(file.fileType)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {file.fileName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(file.fileSize)} • Uploaded{' '}
                {formatDistanceToNow(new Date(file.uploadDate))} ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDownload(file)}
              className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(file.id)}
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;