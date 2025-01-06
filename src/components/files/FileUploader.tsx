import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { FileStorage, FileStorageStats } from '../../types';

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  stats: FileStorageStats;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/epub+zip'
];

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, stats }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Invalid file type. Only PDF, Word, and EPUB files are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 100MB limit.';
    }
    if (stats.usedSpace + file.size > stats.totalSpace) {
      return 'Not enough storage space.';
    }
    return null;
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    const error = validateFile(file);
    if (error) {
      setError(error);
      return;
    }

    try {
      await onUpload(file);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    }
  }, [onUpload, stats.usedSpace, stats.totalSpace]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setError(error);
      return;
    }

    try {
      await onUpload(file);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    }
  };

  const usedSpacePercent = (stats.usedSpace / stats.totalSpace) * 100;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(usedSpacePercent)}% used
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${usedSpacePercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {(stats.usedSpace / 1024 / 1024).toFixed(1)}MB of {(stats.totalSpace / 1024 / 1024).toFixed(0)}MB used
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
              Drop your file here, or{' '}
              <span className="text-indigo-600 dark:text-indigo-400">browse</span>
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.epub"
              onChange={handleFileInput}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            PDF, Word, or EPUB up to 100MB
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;