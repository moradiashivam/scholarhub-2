import { Router } from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const router = Router();

// Test database connection
router.post('/test-db', async (req, res) => {
  const { host, port, username, password, database } = req.body;

  try {
    const connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user: username,
      password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    await connection.end();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create admin account
router.post('/create-admin', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'admin']
    );

    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Run database migrations
router.post('/database', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const schema = await fs.readFile(
      path.join(__dirname, '../../../db/schema.sql'),
      'utf8'
    );

    await connection.query(schema);
    await connection.end();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;