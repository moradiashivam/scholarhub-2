/*
  # Fix ID Types

  1. Changes
    - Update all user_id columns to use UUID type to match users table
    - Ensure consistent ID types across all tables
    - Drop and recreate foreign key constraints with correct types

  2. Security
    - Maintains existing RLS policies
    - No data loss - only type adjustments
*/

-- Drop existing foreign key constraints
ALTER TABLE job_applications DROP CONSTRAINT IF EXISTS job_applications_user_id_fkey;
ALTER TABLE files DROP CONSTRAINT IF EXISTS files_user_id_fkey;
ALTER TABLE notes DROP CONSTRAINT IF EXISTS notes_user_id_fkey;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_user_id_fkey;
ALTER TABLE research_references DROP CONSTRAINT IF EXISTS research_references_user_id_fkey;

-- Update column types to UUID
ALTER TABLE job_applications ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE files ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE notes ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE projects ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE research_references ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

-- Recreate foreign key constraints
ALTER TABLE job_applications 
  ADD CONSTRAINT job_applications_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE files 
  ADD CONSTRAINT files_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE notes 
  ADD CONSTRAINT notes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE projects 
  ADD CONSTRAINT projects_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE research_references 
  ADD CONSTRAINT research_references_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;