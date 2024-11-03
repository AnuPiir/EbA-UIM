UPDATE validation
SET name_et = 'Sama sidusrühm?',
    name_en = 'The same stakeholder?'
WHERE
        id = 1;
UPDATE validation
SET name_et = 'Sama kontekst?',
    name_en = 'The same context?'
WHERE
        id = 2;
UPDATE validation
SET name_et = 'Eesmärgipärane kasutus?',
    name_en = 'Purposeful use?'
WHERE
        id = 3;
UPDATE validation
SET name_et = 'Lahendusega rahul?',
    name_en = 'Satisfied with the solution?'
WHERE
        id = 4;

UPDATE validation
SET name_et = 'Kas',
    name_en = 'Do'
WHERE
        id = 6;

INSERT INTO validation(name_et, name_en, weight, type) VALUES('Sidusrühm','Stakeholder', 63, 'TEXT');
INSERT INTO validation(name_et, name_en, weight, type) VALUES('Tunnuse eeltingimus','Features precondition', 66, 'TEXT');

UPDATE validation
SET name_et = 'Võrreldav situatsioon',
    name_en = 'Comparable situation'
WHERE
        id = 7;

UPDATE validation
SET name_et = 'Kui vaja',
    name_en = 'If needed'
WHERE
        id = 8;

UPDATE validation
SET name_et = 'Kui vaja',
    name_en = 'If needed'
WHERE
        id = 8;

UPDATE validation
SET name_et = 'Kombinatsioon vastustest',
    name_en = 'Combination of answers'
WHERE
        id = 9;

INSERT INTO validation(name_et, name_en, weight, type) VALUES('Sidusrühm','Stakeholder', 93, 'FILL');
INSERT INTO validation(name_et, name_en, weight, type) VALUES('TO-BE eeldustingimus','Features precondition', 96, 'FILL');

UPDATE validation
SET name_et = 'Järeldus tunnuste järgi',
    name_en = 'Summary by feature'
WHERE
        id = 9;
UPDATE validation
SET name_et = 'Tee järeldused ja loo tegevuskava',
    name_en = 'Make a conclusions and create an action plan'
WHERE
        id = 10;
