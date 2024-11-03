CREATE TABLE "validation_autofill" (
                               "id"	INTEGER NOT NULL UNIQUE,
                               "placeholder" TEXT,
                               "validation_to_fill_id"	INTEGER NOT NULL,
                               "validation_filled_by_id"	INTEGER,
                               "type" TEXT,
                               "weight" INTEGER,
                               FOREIGN KEY("validation_to_fill_id") REFERENCES "validation"("id"),
                               FOREIGN KEY("validation_filled_by_id") REFERENCES "validation"("id"),
                               PRIMARY KEY("id" AUTOINCREMENT)
);
