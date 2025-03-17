CREATE TABLE excel_column (
  id INT PRIMARY KEY,
  name_et VARCHAR(255),
  name_en VARCHAR(255)
);

INSERT INTO excel_column (id, name_et, name_en)
VALUES
    (1, 'ID', 'ID'),
    (2, 'Funktsionaalsuse kirjeldus', 'Feature description'),
    (3, '', ''),
    (4, 'Sidusrühm', 'Stakeholder'),
    (5, 'Funktisonaalsuse eeltingimus', 'Features precondition'),
    (6, 'Võrreldav situatsioon', 'Comparable situation'),
    (7, 'Sama sidusrühm?', 'The same stakeholder?'),
    (8, 'Sama kontekst?', 'The same context?'),
    (9, 'Eesmärgipärane kasutus?', 'Purposeful use?'),
    (10, 'Lahendusega rahul?', 'Satisfied with the solution?'),
    (11, 'Prioritiseeri', 'Prioritize'),
    (12, 'Kirjeldus, mil määral on eeltingimus täidetud', 'To what extent the preconditions are met'),
    (13, '', ''),
    (14, '', ''),
    (15, 'Lause koond', 'Sentence summary'),
    (16, 'Tee järeldused ja loo tegevuskava', 'Conclusions and action plan');