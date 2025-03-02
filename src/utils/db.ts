import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';
import pool from '../config/database';

/**
 * Execute a SQL query with parameters
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Query results
 */
export async function query<T>(
  sql: string, 
  params?: any[]
): Promise<T[]> {
  try {
    const [rows]: [T[] | RowDataPacket[], FieldPacket[]] = await pool.execute(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute a SQL query that returns a single result
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Single query result or null
 */
export async function queryOne<T>(
  sql: string, 
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Execute an INSERT query and return the inserted ID
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Inserted ID
 */
export async function insert(
  sql: string, 
  params?: any[]
): Promise<number> {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

/**
 * Execute multiple queries in a transaction
 * @param callback Function that executes queries
 * @returns Transaction result
 */
export async function transaction<T>(
  callback: () => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback();
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  query,
  queryOne,
  insert,
  transaction
};
