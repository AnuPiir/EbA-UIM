UPDATE validation
SET "tooltip_et"='Jagage toote/teenuse lahenduse kirjeldus  väiksemateks iseseisvateks funktsionaalsusteks ja sisestage siia nende kirjeldused: nt. väited selle kohta, mida kasutajad saavad teha, kasutuslood, kasutusjuhtumid, stsenaariumid, eesmärgimudelite funktsionaalsed eesmärgid, protsesside kirjeldused, teekonna kaardistus, ärianalüüsi dokumendi info vm, mis kirjeldab kavandatavat lahendust ja kus on sidusrühmad kaasatud.',
    "tooltip_en"='Divide the solution of the product/e-service into features and type here the list of the descriptions: e.g.  statements about what the users can do, user stories, use cases, scenarios, functional goals of goal models, process descriptions, journey map data, business analysis document, or other similar models that describe the planned solution and the intended kinds of users.'
WHERE id=5;

UPDATE validation
SET "tooltip_et"='Väljad „Kas + Sidusrühmad +  Funktsionaalsuse eeltingimus“ loovad kokku küsimuse, millele hakataksegi vastust otsima.',
    "tooltip_en"='The fields “Do + Stakeholders + Features precondition” together create a question, which needs to be answered.'
WHERE id=6;

UPDATE validation
SET "tooltip_et"='Millised sidusrühmad on funktsionaalsusega seotud või funktsionaalsusest märkimisväärselt mõjutatud?',
    "tooltip_en"='Which stakeholders are involved or significantly affected by the feature?'
WHERE id=12;

UPDATE validation
SET "tooltip_et"='Milliseid olulisemaid teadmisi või teadlikkust, hoiakuid, oskuseid, emotsioone, vahendeid ja tegevusi te eeldate oma sidusrühmadelt, et see funktsionaalsus toimiks tõhusalt. Kirjeldage siia, mida sidusrühm peab eeltingimusena tegema, teadma või suutma teha. Mõelge ka sellistele eeldustele, mis ei ole toote/teenusega otseselt seotud, kuid mida ta oluliselt mõjutab. Sõnastage eeldused eesmärki toetaval viisil.',
    "tooltip_en"='What is the essential knowledge, attitudes, skills, awareness, emotions, means, compromises and activities expected from this stakeholder within this specific feature, to make this feature efficient. Describe here what the stakeholder must do, know or be able to do as a precondition. Also, think about assumptions that are not directly related to the product, but will be significantly affected by the feature. Write the preconditions in a way that supports the purpose.'
WHERE id=13;

UPDATE validation
SET "tooltip_et"='Eeltingimuses silmas peetud tegevus, oskus, suhtumine, vahendite olemasolu, seadmete kasutamine jms väljenduvad mingis situatsioonis ja mingisuguses käitumises. Leidke igale eeltingimusele võimalikult sarnane situatsioon, mida sidusrühm on varem kogenud ja kus ilmneb sidusrühma samasugune toiming, nagu on kirjeldatud eeltingimuses.
Kui ühtegi võrreldavat näidet ei leia, jätke väli tühjaks.',
    "tooltip_en"='Activity, skill, attitude, presence of the means, use of devices, etc., indicated in the precondition, are expressed in some situations in some kind of behavior. For each precondition, find the closest situation that the stakeholder has experienced in the past where the same behavior of the stakeholder has appeared as described in the precondition.
If you don''t find any comparable examples, leave the field unfilled.'
WHERE id=7;

UPDATE validation
SET "tooltip_et"='Kas eelduses nimetatud sidusrühm on sama, keda olete silmas pidanud näites kirjeldatud situatsioonis.',
    "tooltip_en"='Is the stakeholder of the feature precondition the same as the stakeholder in the comparable example situation?'
WHERE id=1;

UPDATE validation
SET "tooltip_et"='Kas eelduses nimetatud kontekst on sama, mida on peetud silmas näitena kirjeldatud situatsioonis.  Nt kas aeg, tehnoloogia, kasutuseesmärk, vahendid,  sotsiaalne, kultuuriline ja organisatsiooniline keskkond jm on sama?',
    "tooltip_en"='Is the context of the feature precondition the same as the context in the comparable example situation?  E.g. time, technology, purpose of use, means, social, cultural and organizational environments.'
WHERE id=2;

UPDATE validation
SET "tooltip_et"='Kas näitena toodud situatsioonis on sidusrühm tegutsenud ettenähtud ja oodatud viisil.',
    "tooltip_en"='Did the stakeholder act in the comparable example situation as expected and according to the purpose?'
WHERE id=3;

UPDATE validation
SET "tooltip_et"='Milline oli sidusrühma rahulolu, kui nad pidid näitena toodud situatsioonis tegutsema eesmärgipäraselt. Rahulolu tähendab (sagedast) kasutamist ilma kaebusteta.',
    "tooltip_en"='Evaluate the stakeholder''s satisfaction when they had to act on purpose in the example situation.  Satisfaction means (frequent) use without complaints.'
WHERE id=4;

UPDATE validation
SET "tooltip_et"='Eelnev kolmeosaline lause liidetakse üheks lauseks',
    "tooltip_en"='The previous three-part sentence is merged into one sentence.'
WHERE id=10;

UPDATE validation
SET "tooltip_et"='Saadud vastuse põhjal otsustage, kas eeldused on lahenduse edukaks toimimiseks piisavad või kui mitte, siis otsustage, mida teha, et olukorda parandada. Looge tegevuskava.
Kui tegevuskava koostamise järel on soov saada ülevaadet, mis tüüpi tegevusi on vaja teha, kasutage värvide abil kategoriseerimist.',
    "tooltip_en"='Based on the answers, decide whether the preconditions are met sufficiently for the solution to work successfully, or if not, decide what to do to improve the situation. Create an action plan.
 After creating an action plan, if you want an overview of what types of activities need to be done, use categorization with colors.'
WHERE id=11;
