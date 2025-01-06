-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create update timestamp triggers for all tables
CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_projects_timestamp
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_notes_timestamp
    BEFORE UPDATE ON notes
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_references_timestamp
    BEFORE UPDATE ON references
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_deadlines_timestamp
    BEFORE UPDATE ON deadlines
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_files_timestamp
    BEFORE UPDATE ON files
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();