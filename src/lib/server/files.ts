import { query } from '../db';
import { FileStorage } from '../../types';

export const getFilesByUserId = async (userId: string) => {
  return query<FileStorage>(
    'SELECT * FROM files WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};

export const createFile = async (userId: string, file: Omit<FileStorage, 'id' | 'uploadDate'>) => {
  const result = await query<{ insertId: number }>(
    'INSERT INTO files (user_id, filename, original_filename, file_size, file_type, storage_path) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, file.fileName, file.fileName, file.fileSize, file.fileType, file.url]
  );
  
  return {
    id: result[0].insertId.toString(),
    ...file,
    uploadDate: new Date().toISOString()
  };
};