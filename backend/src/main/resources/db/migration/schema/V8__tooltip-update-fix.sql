UPDATE validation
SET tooltip_et='Jagage toote/teenuse lahenduse kirjeldus  väiksemateks osadeks, nii et igal funktsiooni väljal oleks kirjeldatud ühte tegevust, kasutuslugu või toote eriomadust. (Vt EbA meetodi juhend: Etapp 1.)',
    tooltip_en='Organise the description of the product or service solution into smaller sections, ensuring that each feature field focuses on a single activity, use case, or unique product attribute. (See EbA Method Guide: Step 1.)'
WHERE id=5;

UPDATE validation
SET tooltip_et='Väljad „Kas + Sidusrühm +  Funktsiooni eeltingimus“ loovad kokku küsimuse, millele te sisuliselt hakkategi vastust otsima.',
    tooltip_en='“Do + Stakeholder + Feature precondition” together create a question, which is essentially what you’ll be trying to answer.'
WHERE id=6;

UPDATE validation
SET tooltip_et='Millised lõppkasutajad ja seotud isikud on selle funktsiooniga seotud või sellest oluliselt mõjutatud? (Vt EbA meetodi juhend: Etapp 2.)',
    tooltip_en='Which end users and stakeholders are involved with or significantly impacted by this feature? (See EbA Method Guide: Step 2.)'
WHERE id=12;

UPDATE validation
SET tooltip_et='Milliseid oskuseid, teadmisi, hoiakuid, tegevusi, ressursse ja vahendeid eeldad eeltingimusena eelnimetatud sidusrühmadelt, et see funktsioon toimiks? (Vt EbA meetodi juhend: Etapp 2.)',
    tooltip_en='What skills, knowledge, attitudes, actions, resources, and tools do you consider as preconditions for this feature to function, with regard to the above-mentioned stakeholders? (See EbA Method Guide: Step 2.)',
    name_en='Feature precondition'
WHERE id=13;

UPDATE validation
SET name_et='Võrdluseks sobiv näide',
    tooltip_et='Võrdluseks sobiva näite leidmiseks vaadake esmalt, millele oli teie eeltingimus suunatud ja püüdke nüüd leida näide samasugusest olukorrast, kuid selline, mida see sidusrühm on varasemalt kogenud. Kui ühtegi näidet ei leia, valige “Näidet ei ole”.  (Vt EbA meetodi juhend: Etapp 3.)',
    tooltip_en='To find a suitable example for comparison, first consider what your precondition was aimed at. Then, try to identify a similar situation that the stakeholder has previously experienced. If no such example can be found, select “No example found”. (See EbA Method Guide: Step 3.)',
    name_en='Comparison example'
WHERE id=7;

UPDATE validation
SET tooltip_et='Kas eeltingimuses nimetatud sidusrühm ja näite sidusrühm kattuvad? (Vt EbA meetodi juhend: Etapp 4.1)',
    tooltip_en='Do the stakeholders mentioned in the precondition and in the example overlap? (See EbA Method Guide: Step 4.1)'
WHERE id=1;

UPDATE validation
SET tooltip_et='Kas eeltingimuses silmas peetud kontekst kattub näites kirjeldatud kontekstiga? Näiteks, kas tehnoloogia, kasutuseesmärk, vahendid, aeg või sotsiaalne, kultuuriline ja organisatsiooniline keskkond jm on sama? (Vt EbA meetodi juhend: Etapp 4.2)',
    tooltip_en='Does the context described in the precondition matches the context described in the example? For instance, are the technology, intended use, tools, time, or the social, cultural, and organisational environment the same? (See EbA Method Guide: Step 4.2)'
WHERE id=2;

UPDATE validation
SET tooltip_et='Hinnake, kas teie võrdluseks toodud näites tegutses sidusrühm ettenähtud viisil, või mil määral oli neil eeldatud oskus, teadmine, hoiak või ressursid olemas. (Vt EbA meetodi juhend: Etapp 4.3)',
    tooltip_en='Evaluate whether the stakeholder in your comparison example acted as expected, or how well they had the necessary skills, knowledge, attitudes, or resources. (See EbA Method Guide: Step 4.3)'
WHERE id=3;

UPDATE validation
SET tooltip_et='Kas teie toodud näites oli sidusrühm tegevust tehes rahul? Või milline oli nende rahulolu sellega, et nad pidid näitesituatsioonis midagi teada, oskama, või et neil pidi olema teatud vahendid või ressursid. (Vt EbA meetodi juhend: Etapp 4.4)',
    tooltip_en='In your comparison example, was the stakeholder satisfied while performing the activity? Or how satisfied were they with having to know something, possess certain skills, or have access to specific tools or resources in that situation? (See EbA Method Guide: Step 4.4)'
WHERE id=4;

UPDATE validation
SET tooltip_et='Kui olete ühele eeltingimusele toonud mitu näidet, valige nendest kõige asjakohasem, mida edaspidises analüüsis kasutada. (Vt EbA meetodi juhend: Etapp 5.)',
    tooltip_en='If you have provided multiple examples for one precondition, select the most relevant one to use in the subsequent analysis. (See EbA Method Guide: Step 5.)'
WHERE id=8;

UPDATE validation
SET tooltip_et='EbA meetod formuleerib lause, mis indikeerib, kuivõrd vastab sidusrühma tegutsemine neile ootustele, mida märkisite eeltingimuses. Vastust kuvatakse pärast kõigile neljale eelnevale küsimusele vastamist. (Vt EbA meetodi juhend: Etapp 6.)',
    tooltip_en='The EbA method generates a sentence that indicates how well the stakeholder''s actions align with the expectations set out in the preconditions. The answer will be shown after all four questions have been completed. (See EbA Method Guide: Step 6.)'
WHERE id=9;

UPDATE validation
SET name_et='Järeldused ja tegevuskava',
    tooltip_et='Kas eeltingimused on lahenduse edukaks toimimiseks piisavalt olemas? Kui ei ole, siis milliseid täiendusi võiks loodava toote lahendusse teha, et eeltingimused oleksid toetatud? (Vt EbA meetodi juhend: Etapp 7.)',
    tooltip_en='Are the preconditions sufficiently met to ensure the successful functioning of the solution? If not, what improvements or modifications could be made to the product solution to better support these preconditions? (See EbA Method Guide: Step 7.)'
WHERE id=11;
