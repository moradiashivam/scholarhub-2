import { query } from '../db';
import { Project } from '../../types';

export const getProjectsByUserId = async (userId: string) => {
  return query<Project>(
    'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};

export const createProject = async (userId: string, project: Omit<Project, 'id'>) => {
  const result = await query<{ insertId: number }>(
    'INSERT INTO projects (user_id, title, description, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, project.title, project.description, project.status, project.startDate, project.endDate]
  );
  
  return {
    id: result[0].insertId.toString(),
    ...project
  };
};