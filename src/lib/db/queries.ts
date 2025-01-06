import pool from './connection';
import { User, Project, Note, Reference } from '../../types';

export const userQueries = {
  findByEmail: async (email: string): Promise<User | null> => {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0] || null;
  },
  
  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
    return { ...user, id: (result as any).insertId };
  }
};

export const projectQueries = {
  findByUserId: async (userId: string): Promise<Project[]> => {
    const [rows] = await pool.execute(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows as Project[];
  }
};

export const noteQueries = {
  findByUserId: async (userId: string): Promise<Note[]> => {
    const [rows] = await pool.execute(
      'SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC',
      [userId]
    );
    return rows as Note[];
  }
};

export const referenceQueries = {
  findByUserId: async (userId: string): Promise<Reference[]> => {
    const [rows] = await pool.execute(
      'SELECT * FROM references WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows as Reference[];
  }
};