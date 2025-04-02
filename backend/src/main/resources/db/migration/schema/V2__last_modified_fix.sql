ALTER table questionnaire drop column last_modified;
ALTER TABLE questionnaire add column last_modified datetime;
UPDATE questionnaire SET last_modified = CURRENT_TIMESTAMP WHERE last_modified IS NULL;