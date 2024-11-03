DROP TABLE "validation_answer";

CREATE TABLE "validation_answer" (
                                     "id"	INTEGER NOT NULL UNIQUE,
                                     "answer" TEXT,
                                     "row_id" INTEGER NOT NULL,
                                     "type" TEXT NOT NULL,
                                     "questionnaire_id"	INTEGER NOT NULL,
                                     "validation_id" INTEGER NOT NULL,
                                     FOREIGN KEY("questionnaire_id") REFERENCES "questionnaire"("id"),
                                     FOREIGN KEY("validation_id") REFERENCES "validation"("id"),
                                     PRIMARY KEY("id" AUTOINCREMENT)
);
