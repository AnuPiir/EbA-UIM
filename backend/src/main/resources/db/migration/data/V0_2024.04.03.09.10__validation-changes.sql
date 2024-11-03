UPDATE validation
SET name_et='Funktsionaalsuse kirjeldus'
WHERE id=5;
UPDATE validation
SET name_et='',name_en=''
WHERE id=6;
UPDATE validation
SET name_et='Funktsionaalsuse eeltingimus'
WHERE id=13;
UPDATE validation
SET name_et='',tooltip_et='Kui ühe eeltingimuse kohta olete toonud mitu näidet, palun valige nendest kõige asjakohasem näide.',tooltip_en='If there are multiple examples for one precondition, please prioritize what is the most relevant example.',name_en=''
WHERE id=8;
UPDATE validation
SET name_et='Kirjeldus, mil määral on eeltingimus täidetud',tooltip_et='EbA meetod formuleerib lause, mis indikeerib, kuivõrd vastab sidusrühma tegutsemine neile ootustele, mida nimetati eeltingimustes. Kombinatsioon saadakse järgmiselt: neljale küsimusele antud vastuste põhjal annab EbA meetod olukorra kirjelduse (vt "EbA meetod" ptk "Kombineeritud vastused"), millele liidetakse eespool sisestatud sidusrühm koos eeldusega. Vastust kuvatakse pärast seda, kui olete vastanud kõigile neljale küsimusele. ',tooltip_en='The EbA method formulates a sentence indicating how much the stakeholder''s acting corresponds to the expectations mentioned in the preconditions. Based on the answers given to the four questions asked, the EbA method gives the usability situation (see "EbA method" section "Combined answers") to which the stakeholder is added along with the precondition. The answer will be displayed after you have answered all four questions.',name_en='To what extent the preconditions are met'
WHERE id=9;
UPDATE validation
SET tooltip_et=null,name_et='',tooltip_en=null,name_en=''
WHERE id=10;
UPDATE validation
SET tooltip_et='Saadud vastuse põhjal otsustage, kas eeldused on lahenduse edukaks toimimiseks piisavad või kui mitte, siis otsustage, mida teha, et olukorda parandada. Looge tegevuskava.',tooltip_en='Based on the answers, decide whether the preconditions are met sufficiently for the solution to work successfully, or if not, decide what to do to improve the situation. Create an action plan.'
WHERE id=11;
UPDATE validation
SET name_et='',name_en=''
WHERE id=14;
UPDATE validation
SET name_et='',name_en=''
WHERE id=15;
