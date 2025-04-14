ALTER TABLE validation_answer
    ADD COLUMN prioritized BOOLEAN;

ALTER TABLE validation_answer
    ADD COLUMN conclusion_changed BOOLEAN DEFAULT FALSE;