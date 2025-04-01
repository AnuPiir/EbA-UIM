CREATE TABLE preference (
    type VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255)
);

INSERT INTO preference (type, value)
VALUES ('LANGUAGE', 'et');