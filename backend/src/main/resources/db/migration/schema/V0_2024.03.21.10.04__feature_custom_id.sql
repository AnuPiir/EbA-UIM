DROP TABLE "validation_answer";
DROP TABLE "feature";

CREATE TABLE feature (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      custom_id TEXT,
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
                                     "feature_id" INTEGER NOT NULL,
                                     "stakeholder_id" INTEGER,
                                     FOREIGN KEY("questionnaire_id") REFERENCES "questionnaire"("id"),
                                     FOREIGN KEY("validation_id") REFERENCES "validation"("id"),
                                     FOREIGN KEY("feature_group_id") REFERENCES "feature_group"("id"),
                                     FOREIGN KEY("feature_precondition_id") REFERENCES "feature_precondition"("id"),
                                     FOREIGN KEY("feature_id") REFERENCES "feature"("id"),
                                     FOREIGN KEY("stakeholder_id") REFERENCES "stakeholder"("id"),
                                     PRIMARY KEY("id" AUTOINCREMENT)
);


