import { query, transaction } from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User, AuthResponse } from '../../types/auth';

const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  return transaction(async (connection) => {
    // Check if user exists
    const [existingUser] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const user = {
      id: (result as any).insertId.toString(),
      email,
      name
    };

    const token = generateToken(user);
    return { user, token };
  });
};

export const validateLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const users = await query<User & { password: string }>(
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

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token
  };
};

export const verifyAuthToken = async (token: string): Promise<User | null> => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string; email: string };
    const users = await query<User>(
      'SELECT id, email, name FROM users WHERE id = ?',
      [decoded.id]
    );
    return users[0] || null;
  } catch (error) {
    return null;
  }
};