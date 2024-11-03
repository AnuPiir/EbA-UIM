CREATE TABLE "questionnaire" (
                              "id"	INTEGER NOT NULL UNIQUE,
                              "name"	TEXT UNIQUE,
                              PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "validation_answer" (
                                 "id"	INTEGER NOT NULL UNIQUE,
                                 "answer"	TEXT UNIQUE,
                                 "row_id" INTEGER NOT NULL,
                                 "questionnaire_id"	INTEGER NOT NULL,
                                 FOREIGN KEY("questionnaire_id") REFERENCES "questionnaire"("id"),
                                 PRIMARY KEY("id" AUTOINCREMENT)
);
