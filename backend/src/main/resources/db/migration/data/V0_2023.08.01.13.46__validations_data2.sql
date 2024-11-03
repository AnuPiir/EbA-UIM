INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Feature description','Tunnuse kirjeldus',1);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Features prerequisties', 'TO-BE eeldustingimused ehk käitumiseeldused
(vaikimisi lisatud küsisõna "Kas")', 2);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Comparable examples stakeholders have experienced', 'Analoognäited varasemast tegevusest', 3);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Prioritize  examples ', 'Valideeri näited', 4);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Description of behavior by example', 'Käitumiskirjeldus näite kaupa', 9);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Conclusions by Feature', 'Conclusions by Feature', 10);

INSERT INTO validation
(name_en, name_et, weight)
VALUES ('Conclusions and action plan', 'Conclusions and action plan', 11);

UPDATE validation
SET weight = 5,
    name_et = 'Kas kasutajad on samad?'
WHERE
        name_en = 'The same stakeholders?';

UPDATE validation
SET weight = 6,
    name_et = 'Kas kasutuskontekst (nt aeg, tehnoloogia, eesmärk) on sama?'
WHERE
        name_en = 'The same context? (time, technology, purpose)';

UPDATE validation
SET weight = 7,
    name_et = 'Kas kasutajad on osanud tegutseda analoognäites vastavalt eesmärgile?'
WHERE
        name_en = 'Purposeful use by the stakeholders?';

UPDATE validation
SET weight = 8,
    name_et = 'Kas kasutajad on analoogse lahendusega olnud rahul?'
WHERE
        name_en = 'Satisfied with the solution in a comparable situation?';
