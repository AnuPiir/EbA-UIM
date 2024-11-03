CREATE TABLE "validation" (
                              "id"	INTEGER NOT NULL UNIQUE,
                              "name_et"	TEXT UNIQUE,
                              "name_en"	TEXT UNIQUE,
                              PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE "validation_value" (
                                    "name"	TEXT NOT NULL,
                                    PRIMARY KEY("name")
);

CREATE TABLE "validation_combination_result" (
                                          "id"	INTEGER NOT NULL UNIQUE,
                                          "result_en"	TEXT NOT NULL,
                                          "result_et"	TEXT NOT NULL,
                                          PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "validation_combination" (
                                          "id"	INTEGER NOT NULL UNIQUE,
                                          "validation_combination_result_id"	INTEGER NOT NULL,
                                          "validation_id"	INTEGER NOT NULL,
                                          "validation_value"	TEXT,
                                          FOREIGN KEY("validation_value") REFERENCES "validation_value"("name"),
                                          FOREIGN KEY("validation_id") REFERENCES "validation"("id"),
                                          FOREIGN KEY("validation_combination_result_id") REFERENCES "validation_combination_result"("id"),
                                          PRIMARY KEY("id" AUTOINCREMENT)
);
