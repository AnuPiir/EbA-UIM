-- Add the lastModified column to the questionnaire table
ALTER TABLE questionnaire ADD COLUMN last_modified TIMESTAMP;

-- Set default values for existing records (current timestamp)
UPDATE questionnaire SET last_modified = CURRENT_TIMESTAMP;

-- Set a default value for the "Example-Eng" project (Jan 17, 2025)
UPDATE questionnaire SET last_modified = '2025-01-17 14:30:00' WHERE name LIKE '%Example ENG%';