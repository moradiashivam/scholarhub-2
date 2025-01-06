/*
  # Add demo user account
  
  1. Changes
    - Insert demo user into auth.users
    - Create corresponding profile record
    
  2. Security
    - Password is hashed using Supabase auth
    - Demo account has standard user permissions
*/

-- Create demo user in auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo@scholarhub.com',
  crypt('Demo123!@#', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Demo User"}',
  now(),
  now(),
  'authenticated'
) ON CONFLICT DO NOTHING;

-- Create profile for demo user
INSERT INTO profiles (
  id,
  name,
  institution,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Demo User',
  'Demo University',
  now(),
  now()
) ON CONFLICT DO NOTHING;