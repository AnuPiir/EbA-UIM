CREATE TABLE feature_group (
                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                               name TEXT,
                               "questionnaire_id" INTEGER NOT NULL,
                               FOREIGN KEY("questionnaire_id") REFERENCES "questionnaire"("id")
);

DROP TABLE "validation_answer";

CREATE TABLE feature_precondition (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      answer TEXT
);

CREATE TABLE "validation_answer" (
                                     "id"	INTEGER NOT NULL UNIQUE,
                                     "answer" TEXT,
                                     "row_id" INTEGER NOT NULL,
                                     "type" TEXT NOT NULL,
                                     "questionnaire_id"	INTEGER NOT NULL,
                                     "validation_id" INTEGER NOT NULL,
                                     "feature_group_id" INTEGER NOT NULL,
                                     "feature_precondition_id" INTEGER NOT NULL,
                                     FOREIGN KEY("questionnaire_id") REFERENCES "questionnaire"("id"),
                                     FOREIGN KEY("validation_id") REFERENCES "validation"("id"),
                                     FOREIGN KEY("feature_group_id") REFERENCES "feature_group"("id"),
                                     FOREIGN KEY("feature_precondition_id") REFERENCES "feature_precondition"("id"),
                                     PRIMARY KEY("id" AUTOINCREMENT)
);


