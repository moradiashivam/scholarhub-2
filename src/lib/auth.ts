import { query } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, AuthResponse } from '../types/auth';
import { handleError } from '../utils/error-handler';

const generateToken = (user: User): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT configuration error. Please contact support.');
  }
  
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // Check if user exists
    const existing = await query<User[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing && existing.length > 0) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await query<any>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    if (!result || !result[0] || !result[0].insertId) {
      throw new Error('Failed to create account. Please try again.');
    }

    const user = {
      id: result[0].insertId.toString(),
      email,
      name
    };

    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    throw handleError(error);
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const users = await query<(User & { password: string })[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };
  } catch (error) {
    throw handleError(error);
  }
};