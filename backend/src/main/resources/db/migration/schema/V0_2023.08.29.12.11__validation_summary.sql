CREATE TABLE "validation_summary" (
                              "id"	INTEGER NOT NULL UNIQUE,
                              "name_et"	TEXT UNIQUE,
                              "name_en"	TEXT UNIQUE,
                              "weight" INTEGER,
                              PRIMARY KEY("id" AUTOINCREMENT)
);
