-- Enable UUID functions
CREATE FUNCTION IF NOT EXISTS uuid_v4()
RETURNS CHAR(36)
BEGIN
    RETURN LOWER(CONCAT(
        HEX(RANDOM_BYTES(4)), '-',
        HEX(RANDOM_BYTES(2)), '-4',
        SUBSTR(HEX(RANDOM_BYTES(2)), 2), '-',
        SUBSTR('89AB', 1 + (RAND() * 3), 1),
        SUBSTR(HEX(RANDOM_BYTES(2)), 2), '-',
        HEX(RANDOM_BYTES(6))
    ));
END;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  institution VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('planned', 'ongoing', 'completed') DEFAULT 'planned',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Project tags
CREATE TABLE IF NOT EXISTS project_tags (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  project_id CHAR(36) NOT NULL,
  name VARCHAR(50) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  user_id CHAR(36) NOT NULL,
  project_id CHAR(36),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- References table
CREATE TABLE IF NOT EXISTS research_references (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  user_id CHAR(36) NOT NULL,
  project_id CHAR(36),
  title VARCHAR(255) NOT NULL,
  type ENUM('paper', 'book', 'website', 'other') NOT NULL,
  url TEXT,
  doi VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Reference authors
CREATE TABLE IF NOT EXISTS reference_authors (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  reference_id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (reference_id) REFERENCES research_references(id) ON DELETE CASCADE
);

-- Deadlines table
CREATE TABLE IF NOT EXISTS deadlines (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  user_id CHAR(36) NOT NULL,
  project_id CHAR(36),
  title VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id CHAR(36) PRIMARY KEY DEFAULT (uuid_v4()),
  user_id CHAR(36) NOT NULL,
  project_id CHAR(36),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type ENUM('pdf', 'docx', 'epub') NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_project_id ON notes(project_id);
CREATE INDEX idx_research_references_user_id ON research_references(user_id);
CREATE INDEX idx_research_references_project_id ON research_references(project_id);
CREATE INDEX idx_deadlines_user_id ON deadlines(user_id);
CREATE INDEX idx_deadlines_project_id ON deadlines(project_id);
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_project_id ON files(project_id);