CREATE TABLE "validation2" (
                               "id"	INTEGER NOT NULL UNIQUE,
                               "name_et"	TEXT,
                               "name_en"	TEXT,
                               "weight" INTEGER,
                               "type" TEXT,
                               "summary_id" INTEGER,
                               FOREIGN KEY("summary_id") REFERENCES "validation_summary"("id"),
                               PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO validation2 (id, name_et, name_en, weight, type) SELECT id, name_et, name_en, weight, type FROM validation;
DROP TABLE validation;
ALTER TABLE validation2 RENAME TO validation;
