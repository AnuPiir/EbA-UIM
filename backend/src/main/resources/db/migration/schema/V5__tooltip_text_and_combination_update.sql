UPDATE validation
SET name_et='Funktsiooni kirjeldus',
    tooltip_et='Jagage toote/teenuse lahenduse kirjeldus  väiksemateks iseseisvateks osadeks, nt funktsioonide kaupa, ja sisestage siia nende kirjeldused. Valige need, mis kirjeldavad kavandatavat lahendust ja kus on sidusrühmad kaasatud.

               Vt Eba meetodi juhend: Etapp 1.',
    tooltip_en='Divide the description of the planned solution into features and split each feature into a separate row. Take features that describe the planned solution and where the stakeholders are involved.

               See EbA Method Guide: Step 1.'
WHERE id = 5;

UPDATE validation
SET tooltip_et='Väljad „Kas + Sidusrühm +  Funktsiooni eeltingimus“ loovad kokku küsimuse, millele aitab EbA meetod vastust leida.',
    tooltip_en='“Do + Stakeholder + Feature precondition” together create a question to which the EbA method helps to find an answer.'
WHERE id = 6;

UPDATE validation
SET tooltip_et='Millised sidusrühmad on selle funktsiooniga seotud või sellest oluliselt mõjutatud?

               Vt EbA meetodi juhend: Etapp 2.',
    tooltip_en='Which stakeholders are involved in each feature or are significantly affected by it?

               See EbA Method Guide: Step 2.'
WHERE id = 12;

UPDATE validation
SET name_et='Funktsiooni eeltingimus',
    tooltip_et='Milliseid oskuseid, teadmisi, hoiakuid, tegevusi, ressursse ja vahendeid eeldad eeltingimusena nendelt sidusrühmadelt, et see funktsioon toimiks. Sõnastage eeltingimused eesmärki toetavalt ehk positiivses sõnastuses.

               Vt EbA meetodi juhend: Etapp 2.',
    tooltip_en='What skills, knowledge, attitudes, activities, resources, and means are expected from the stakeholders as preconditions within this specific feature to make the feature efficient. Formulate the preconditions in a supportive way.

               See EbA Method Guide: Step 2.'
WHERE id = 13;

UPDATE validation
SET tooltip_et='Leidke igale eeltingimusele võimalikult sarnane situatsioon, mida sidusrühm on varem kogenud ja kus ilmneb sidusrühma samasugune toiming, nagu on kirjeldatud eeltingimuses. Kui ühtegi võrreldavat näidet ei leia, valige “Situatsiooni ei ole”.

               Vt EbA meetodi juhend: Etapp 3.',
    tooltip_en='For each precondition, find an example of a situation that the stakeholder has experienced in the past and correlates with the situation described in the precondition. If no comparable example can be found, select "No situation".

               See EbA Method Guide: Step 3.'
WHERE id = 7;

UPDATE validation
SET tooltip_et='Kas eeltingimuses nimetatud sidusrühm on sama, keda peate silmas näites kirjeldatud situatsioonis?

               Vt EbA meetodi juhend: Etapp 4.1.',
    tooltip_en='Is the stakeholder named in the feature precondition the same one you have in mind in the situation described in the example?

               See EbA Method Guide: Step 4.1.'
WHERE id = 1;

UPDATE validation
SET tooltip_et='Kas eeltingimuses mõeldud kontekst on sama, mida peate silmas näitena kirjeldatud situatsioonis? Nt kas aeg, tehnoloogia, kasutuseesmärk, vahendid,  sotsiaalne, kultuuriline ja organisatsiooniline keskkond jm on sama?

               Vt EbA meetodi juhend: Etapp 4.2.',
    tooltip_en='Is the context intended in the prerequisite the same as what you mean in the situation described in the comparable example situation? For example, are the time, technology, purpose of use, resources, social, cultural and organisational environment, etc. the same?

               See EbA Method Guide: Step 4.2.'
WHERE id = 2;

UPDATE validation
SET name_et='Tegevus eesmärgikohane?',
    tooltip_et='Kas näite situatsioonis tegutses selles näites silmas peetud sidusrühm ettenähtud viisil või mil määral oli neil eeldatud oskus, teadmine, hoiak või ressursid olemas? Hinnake võrreldava situatsiooni näites sama aspekti, mida pidasite silmas eeltingimuses.

               Vt EbA meetodi juhend: Etapp 4.3.',
    tooltip_en='Did the stakeholder act in the comparable example situation as expected and according to the purpose or to what extent they had the expected skill, knowledge, attitude or resources. In the comparable example situation, the same aspect that was focused on in the precondition must be assessed.

               See EbA Method Guide: Step 4.3.',
    name_en='Purposeful action?'
WHERE id = 3;

UPDATE validation
SET name_et='Sidusrühma rahulolu?',
    tooltip_et='Kas selles näites silmas peetud sidusrühm oli näite situatsioonis rahulolev temalt eeldatud tegevust tehes või siis sellega, et tal pidi olema eeldatud oskus, teadmine, hoiak või vahendid?

               Vt EbA meetodi juhend: Etapp 4.4.',
    tooltip_en='Was the stakeholder mentioned in this example situation satisfied with doing the activity expected of them or that they had to have the expected skill, knowledge, attitude, or resources.

               See EbA Method Guide: Step 4.4.',
    name_en='Stakeholder satisfaction?'
WHERE id = 4;

UPDATE validation
SET tooltip_et='Olete eeltingimuse kohta toonud mitu näidet. Valige nendest kõige asjakohasem, mida edaspidises analüüsis kasutada.

               Vt EbA meetodi juhend: Etapp 5.',
    tooltip_en='You have multiple examples for a precondition. Please select the most relevant example to be used in future analysis.

               See EbA Method Guide: Step 5.'
WHERE id = 8;

UPDATE validation
SET tooltip_et='EbA meetod formuleerib lause, mis indikeerib, kuivõrd vastab sidusrühma tegutsemine neile ootustele, mida märkisite eeltingimuses. Vastust kuvatakse pärast kõigile neljale eelnevale küsimusele vastamist.

               Vt EbA meetodi juhend: Etapp 6.',
    tooltip_en='The EbA method formulates a sentence indicating to what extent the stakeholder''s actions correspond to the expectations mentioned in the preconditions. The answer will be displayed after answering all four questions.

               See EbA Method Guide: Step 6.'
WHERE id = 9;

UPDATE validation
SET tooltip_et='Eelnevalt saadud vastuse põhjal otsustage, kas eeldused on lahenduse edukaks toimimiseks piisavad või kui mitte, siis kaaluge, mida teha, et olukorda parandada. Kui tegevuskava koostamise järel on soov saada ülevaadet, mis tüüpi tegevusi on vaja teha, kasutage tähenduse ja värvide abil kategoriseerimist.

               Vt EbA meetodi juhend: Etapp 7.',
    tooltip_en='Based on the answers, decide whether the preconditions are met sufficiently for the solution to work successfully. If this is not the case, decide how to improve the situation. If you need an overview of what types of activities need to be performed, you can label them by content and color based on what type of action plan is needed.

               See EbA Method Guide: Step 7.'
WHERE id = 11;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes tegutseb eesmärgikohaselt, kuid me ei tea, kas ka'
WHERE id=3;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes tegutseb eesmärgikohaselt, kuid me ei tea, kas ka'
WHERE id=4;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes veidi teises kontekstis tegutseb eesmärgikohaselt, kuid me ei tea, kas ka'
WHERE id=7;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes veidi teises kontekstis tegutseb eesmärgikohaselt, kuid me ei tea, kas ka'
WHERE id=8;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes ühes teises kontekstis tegutseb eesmärgikohaselt, aga me ei tea, kas'
WHERE id=11;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes ühes teises kontekstis tegutseb eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=12;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes mingisuguses teadmata kontekstis tegutseb eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=15;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes mingisuguses teadmata kontekstis tegutseb eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=16;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes mõningal määral tegutseb eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=19;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes mõningal määral tegutseb eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=20;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes veidi teises kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=23;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes veidi teises kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=24;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes ühes teises kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=27;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes ühes teises kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=28;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes mingisuguses teadmata kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=31;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes mingisuguses teadmata kontekstis tegutseb mõningal määral eesmärgikohaselt, kuid me ei tea, kas'
WHERE id=32;

UPDATE validation_combination_result
SET result_et='Ühel teisel sidusrühmal esineb rahulolematust selle eeltingimusega, kuid nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=67;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kellel esineb rahulolematust selle eeltingimusega, kuid nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=68;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, but in that slightly different context,',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis'
WHERE id=69;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, but in that slightly different context, some',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis osad'
WHERE id=70;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition, but their action outcome in that slightly different context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=71;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition, but their action outcome in that slightly different context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=72;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition. However, in that different context,',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis'
WHERE id=73;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition. However, in that different context, some',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis osad'
WHERE id=74;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is somewhat dissatisfied with this precondition, but their action outcome in that different context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=75;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is somewhat dissatisfied with this precondition, but their action outcome in that different context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=76;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition. However, in that unknown context,',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis'
WHERE id=77;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition. However, in that unknown context, some',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis osad'
WHERE id=78;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition, but their action outcome in that unknown context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=79;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition, but their action outcome in that unknown context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis nad tegutsevad eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=80;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kellel esineb rahulolematust selle eeltingimusega, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=83;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kellel esineb rahulolematust selle eeltingimusega, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=84;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, but in that slightly different context, to an extent,',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis mõningal määral'
WHERE id=85;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, but in that slightly different context, to an extent, some',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis mõningal määral osad'
WHERE id=86;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=87;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel veidi teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=88;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition, but in that different context, to an extent,',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis mõningal määral'
WHERE id=89;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition, but in that different context, to an extent, some',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis mõningal määral osad'
WHERE id=90;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is somewhat dissatisfied with this precondition, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=91;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is somewhat dissatisfied with this precondition, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel ühes teises kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=92;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition, but in that unknown context, to an extent,',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis mõningal määral'
WHERE id=93;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition, but in that unknown context, to an extent, some',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, kuid tolles teadmata kontekstis mõningal määral osad'
WHERE id=94;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kellel mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=95;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kellel mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=96;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, and the action outcome in that slightly different context is incorrect. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus tolles veidi teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=101;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is somewhat dissatisfaction with this precondition, and the action outcome in that slightly different context is incorrect. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus tolles veidi teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=102;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition and whose action outcome in that slightly different context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne ja tolles veidi teistsuguses kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=103;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is somewhat dissatisfied with this precondition and whose action outcome in that slightly different context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne ja tolles veidi teistsuguses kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=104;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition, and the action outcome in that different context is incorrect. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus tolles teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=105;

UPDATE validation_combination_result
SET result_en='In a different context, there is somewhat dissatisfaction with this precondition, and the action outcome in that different context is incorrect. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus tolles teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=106;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is somewhat dissatisfied with this precondition and whose action outcome in that different context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne ja tolles teistsuguses kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=107;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is somewhat dissatisfied with this precondition and whose action outcome in that different context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne ja tolles teistsuguses kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=108;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition, and the action outcome in that unknown context is incorrect. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus  tolles teadmata kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=109;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is somewhat dissatisfaction with this precondition, and the action outcome in that unknown context is incorrect. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis esineb rahulolematust selle eeltingimusega ja tegutsemise tulemus  tolles teadmata kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=110;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition and whose action outcome in that unknown context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne ja  tolles teadmata kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=111;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is somewhat dissatisfied with this precondition and whose action outcome in that unknown context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne ja  tolles teadmata kontekstis esineb neil rahulolematust selle eeltingimusega. Siiski ei ole meil teada, kas'
WHERE id=112;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the action outcome is unknown, but in that slightly different context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus veidi teises kontekstis ei ole teada, kuid tolles veidi teistsuguses kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=117;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the action outcome is unknown, but in that slightly different context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus veidi teises kontekstis ei ole teada, kuid tolles veidi teistsuguses kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=118;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in a slightly different context is unknown, but we have noticed, in that slightly different context, they are somewhat dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis ei ole teada, kuid tolles veidi teistsuguses kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=119;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in a slightly different context is unknown, but we have noticed they are somewhat dissatisfied with that precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis ei ole teada, kuid tolles veidi teistsuguses kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=120;

UPDATE validation_combination_result
SET result_en='In a different context, the action outcome is unknown, but in that different context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus ühes teises kontekstis ei ole teada, kuid tolles teistsuguses kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=121;

UPDATE validation_combination_result
SET result_en='In a different context, the action outcome is unknown, but in that different context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus ühes teises kontekstis ei ole teada, kuid tolles teistsuguses kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=122;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in a different context is unknown, but we have noticed, in that different context, they are somewhat dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis ei ole teada, kuid tolles teistsuguses kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=123;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in a different context is unknown, but we have noticed, in that different context, they are somewhat dissatisfied with this precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis ei ole teada, kuid tolles teistsuguses kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=124;

UPDATE validation_combination_result
SET result_en='In an unknown context, the action outcome is unknown, but in that unknown context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus mingisuguses teadmata kontekstis ei ole teada, kuid tolles teadmata kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=125;

UPDATE validation_combination_result
SET result_en='In an unknown context, the action outcome is unknown, but in that unknown context, we have noticed somewhat dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus mingisuguses teadmata kontekstis ei ole teada, kuid tolles teadmata kontekstis on täheldatud rahulolematust selle eeltingimusega. Meil pole alust eeldada, et'
WHERE id=126;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in an unknown context is unknown, but we have noticed, in that unknown context, they are somewhat dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis ei ole teada, kuid tolles teadmata kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=127;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in an unknown context is unknown, but we have noticed, in that unknown context, they are somewhat dissatisfied with this precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis ei ole teada, kuid tolles teadmata kontekstis on täheldatud nende rahulolematust selle eeltingimusega. Samuti ei ole meil teada, kas'
WHERE id=128;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes tegutseb eesmärgikohaselt, aga pole eeltingimusega rahul. Meil siiski ei ole teada, kas'
WHERE id=131;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes tegutseb eesmärgikohaselt, aga pole eeltingimusega rahul. Meil siiski ei ole teada, kas'
WHERE id=132;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, but in that slightly different context,',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis'
WHERE id=133;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, but in that slightly different context, some',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis osad'
WHERE id=134;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is dissatisfied with this precondition, but their action outcome in that slightly different context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes veidi teises kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=135;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is dissatisfied with this precondition, but their action outcome in that slightly different context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes veidi teises kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=136;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, but in that different context,',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis'
WHERE id=137;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, but in that different context, some',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis osad'
WHERE id=138;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is dissatisfied with this precondition, but their action outcome in that different context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes ühes teises kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad tolles teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=139;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is dissatisfied with this precondition, but their action outcome in that different context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes ühes teises kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad tolles teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=140;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, but in that unknown context,',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul, kuid tolles teadmata kontekstis'
WHERE id=141;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, but in that unknown context, some',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul, kuid tolles teadmata kontekstis osad'
WHERE id=142;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is dissatisfied with this precondition, but their action outcome in that unknown context is purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes mingisuguses teadmata kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad  tolles teadmata kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=143;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is dissatisfied with this precondition, but their action outcome in that unknown context is purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes mingisuguses teadmata kontekstis pole selle eeltingimusega rahul, kuid nad tegutsevad  tolles teadmata kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=144;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes pole selle eeltingimusega rahul, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=147;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes pole selle eeltingimusega rahul, aga mõningal määral tegutseb eesmärgikohaselt. Siiski ei ole meil teada, kas'
WHERE id=148;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, but in that slightly different context, to an extent,',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis mõningal määral'
WHERE id=149;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, but in that slightly different context, to an extent, some',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis mõningal määral osad'
WHERE id=150;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is dissatisfied with this precondition, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes veidi teises kontekstis pole selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=151;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is dissatisfied with this precondition, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes veidi teises kontekstis pole selle eeltingimusega rahul, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=152;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, but in that different context, to an extent,',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis mõningal määral'
WHERE id=153;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, but in that different context, to an extent, some',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis mõningal määral osad'
WHERE id=154;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is dissatisfied with this precondition, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes ühes teises kontekstis pole selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=155;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is dissatisfied with this precondition, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes ühes teises kontekstis pole selle eeltingimusega rahul, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=156;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, but in that unknown context, to an extent,',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul, kuid tolles teadmata kontekstis mõningal määral'
WHERE id=157;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, but in that unknown context, to an extent, some',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul, kuid tolles teadmata kontekstis mõningal määral osad'
WHERE id=158;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is dissatisfied with this precondition, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kes mingisuguses teadmata kontekstis pole selle eeltingimusega rahul, kuid tolles teadmata kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=159;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is dissatisfied with this precondition, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kes mingisuguses teadmata kontekstis pole selle eeltingimusega rahul, kuid tolles teadmata kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=160;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, and the action outcome in that slightly different context is incorrect. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus tolles veidi teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=165;

UPDATE validation_combination_result
SET result_en='In a slightly different context, there is dissatisfaction with this precondition, and the action outcome in that slightly different context is incorrect. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus tolles veidi teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=166;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a slightly different context, is dissatisfied with this precondition and whose action outcome in that slightly different context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne ja tolles veidi teistsuguses kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=167;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a slightly different context, is dissatisfied with this precondition and whose action outcome in that slightly different context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne ja tolles veidi teistsuguses kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=168;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, and the action outcome in that different context is incorrect. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus tolles teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=169;

UPDATE validation_combination_result
SET result_en='In a different context, there is dissatisfaction with this precondition, and the action outcome in that different context is incorrect. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus tolles teistsuguses kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=170;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in a different context, is dissatisfied with this precondition and whose action outcome in that different context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne ja tolles teistsuguses kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=171;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in a different context, is dissatisfied with this precondition and whose action outcome in that different context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne ja tolles teistsuguses kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=172;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, and the action outcome in that unknown context is incorrect. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus  tolles teadmata kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=173;

UPDATE validation_combination_result
SET result_en='In an unknown context, there is dissatisfaction with this precondition, and the action outcome in that unknown context is incorrect. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis ei olda selle eeltingimusega rahul ja tegutsemise tulemus  tolles teadmata kontekstis on ebakorrektne. Meil pole alust eeldada, et'
WHERE id=174;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder who, in an unknown context, is dissatisfied with this precondition and whose action outcome in that unknown context is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne ja  tolles teadmata kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=175;

UPDATE validation_combination_result
SET result_en='There is a stakeholder who, in an unknown context, is dissatisfied with this precondition and whose action outcome in that unknown context is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne ja  tolles teadmata kontekstis pole nad selle eeltingimusega rahul. Siiski ei ole meil teada, kas'
WHERE id=176;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the action outcome is unknown, but in that slightly different context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et tolles veidi teistsuguses kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=181;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the action outcome is unknown, but in that slightly different context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Veidi teises kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et tolles veidi teistsuguses kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=182;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in a slightly different context is unknown, but we have noticed, in that slightly different context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis pole teada, kuid on teada, et tolles veidi teistsuguses kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=183;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in a slightly different context is unknown, but we have noticed, in that slightly different context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis pole teada, kuid on teada, et tolles veidi teistsuguses kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=184;

UPDATE validation_combination_result
SET result_en='In a different context, the action outcome is unknown, but in that different context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et tolles teistsuguses kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=185;

UPDATE validation_combination_result
SET result_en='In a different context, the action outcome is unknown, but in that different context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Ühes teises kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et tolles teistsuguses kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=186;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in a different context is unknown, but we have noticed, in that different context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis pole teada, kuid on teada, et tolles teistsuguses kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=187;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in a different context is unknown, but we have noticed, in that different context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis pole teada, kuid on teada, et tolles teistsuguses kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=188;

UPDATE validation_combination_result
SET result_en='In an unknown context, the action outcome is unknown, but in that unknown context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et  tolles teadmata kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=189;

UPDATE validation_combination_result
SET result_en='In an unknown context, the action outcome is unknown, but in that unknown context, we have noticed dissatisfaction with this precondition. Therefore, we cannot assume that',
    result_et='Mingisuguses teadmata kontekstis ei ole tegutsemise tulemus teada, kuid on teada, et  tolles teadmata kontekstis ei olda eeltingimusega rahul. Meil pole alust eeldada, et'
WHERE id=190;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose action outcome in an unknown context is unknown, but we have noticed, in that unknown context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis pole teada, kuid on teada, et  tolles teadmata kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=191;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose action outcome in an unknown context is unknown, but we have noticed, in that unknown context, they are dissatisfied with this precondition. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis pole teada, kuid on teada, et  tolles teadmata kontekstis pole nad selle eeltingimusega rahul. Samuti ei ole meil teada, kas'
WHERE id=192;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kes tegutseb eesmärgikohaselt, aga nende rahulolu eeltingimusega pole teada. Samuti pole meil teada, kas'
WHERE id=195;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kes tegutseb eesmärgikohaselt, aga nende rahulolu eeltingimusega pole teada. Samuti pole meil teada, kas'
WHERE id=196;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the satisfaction with this precondition is unknown, but in that slightly different context,',
    result_et='Veidi teises kontekstis pole eeltingimusega rahulolu teada, kuid tolles veidi teistsuguses kontekstis'
WHERE id=197;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the satisfaction with this precondition is unknown, but in that slightly different context, some',
    result_et='Veidi teises kontekstis pole eeltingimusega rahulolu teada, kuid tolles veidi teistsuguses kontekstis osad'
WHERE id=198;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in a slightly different context is unknown, but whose action outcome is, in that slightly different context, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega veidi teises kontekstis pole teada, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=199;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in a slightly different context is unknown, but whose action outcome is, in that slightly different context, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega veidi teises kontekstis pole teada, kuid nad tegutsevad tolles veidi teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=200;

UPDATE validation_combination_result
SET result_en='In a different context, the satisfaction with this precondition is unknown, but in that different context,',
    result_et='Ühes teises kontekstis pole eeltingimusega rahulolu teada, kuid tolles teistsuguses kontekstis'
WHERE id=201;

UPDATE validation_combination_result
SET result_en='In a different context, the satisfaction with this precondition is unknown, but in that different context, some',
    result_et='Ühes teises kontekstis pole eeltingimusega rahulolu teada, kuid tolles teistsuguses kontekstis osad'
WHERE id=202;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in a different context is unknown, but whose action outcome is, in that different context, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega ühes teises kontekstis pole teada, kuid nad tegutsevad tolles teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=203;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in a different context is unknown, but whose action outcome is, in that different context, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega ühes teises kontekstis pole teada, kuid nad tegutsevad tolles teistsuguses kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=204;

UPDATE validation_combination_result
SET result_en='In an unknown context, the satisfaction with this precondition is unknown, but in that unknown context,',
    result_et='Mingisuguses teadmata kontekstis pole eeltingimusega rahulolu teada, kuid tolles teadmata kontekstis'
WHERE id=205;

UPDATE validation_combination_result
SET result_en='In an unknown context, the satisfaction with this precondition is unknown, but in that unknown context, some',
    result_et='Mingisuguses teadmata kontekstis pole eeltingimusega rahulolu teada, kuid tolles teadmata kontekstis osad'
WHERE id=206;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in an unknown context is unknown, but whose action outcome is, in that unknown context, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega mingisuguses teadmata kontekstis pole teada, kuid nad tegutsevad  tolles teadmata kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=207;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in an unknown context is unknown, but whose action outcome is, in that unknown context, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega mingisuguses teadmata kontekstis pole teada, kuid nad tegutsevad  tolles teadmata kontekstis eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=208;

UPDATE validation_combination_result
SET result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega pole teada, aga kes mõningal määral tegutseb eesmärgikohaselt. Siiski pole meil teada, kas'
WHERE id=211;

UPDATE validation_combination_result
SET result_et='On mingi sidusrühm, kelle rahulolu eeltingimusega pole teada, aga kes mõningal määral tegutseb eesmärgikohaselt. Siiski pole meil teada, kas'
WHERE id=212;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the satisfaction with this precondition is unknown, but in that slightly different context, to an extent,',
    result_et='Veidi teises kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles veidi teistsuguses kontekstis mõningal määral'
WHERE id=213;

UPDATE validation_combination_result
SET result_en='In a slightly different context, the satisfaction with this precondition is unknown, but in that slightly different context, to an extent, some',
    result_et='Veidi teises kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles veidi teistsuguses kontekstis mõningal määral osad'
WHERE id=214;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition, in a slightly different context, is unknown, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega veidi teises kontekstis pole teada, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=215;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition, in a slightly different context, is unknown, but their action outcome in that slightly different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega veidi teises kontekstis pole teada, kuid tolles veidi teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=216;

UPDATE validation_combination_result
SET result_en='In a different context, the satisfaction with this precondition is unknown, but in that different context, to an extent,',
    result_et='Ühes teises kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles teistsuguses kontekstis mõningal määral'
WHERE id=217;

UPDATE validation_combination_result
SET result_en='In a different context, the satisfaction with this precondition is unknown, but in that different context, to an extent, some',
    result_et='Ühes teises kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles teistsuguses kontekstis mõningal määral osad'
WHERE id=218;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition, in a different context, is unknown, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega ühes teises kontekstis pole teada, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=219;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition, in a different context, is unknown, but their action outcome in that different context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega ühes teises kontekstis pole teada, kuid tolles teistsuguses kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=220;

UPDATE validation_combination_result
SET result_en='In an unknown context, the satisfaction with this precondition is unknown, but in that unknown context, to an extent,',
    result_et='Mingisuguses teadmata kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles teadmata kontekstis mõningal määral'
WHERE id=221;

UPDATE validation_combination_result
SET result_en='In an unknown context, the satisfaction with this precondition is unknown, but in that unknown context, to an extent, some',
    result_et='Mingisuguses teadmata kontekstis pole rahulolu selle eeltingimusega teada, kuid tolles teadmata kontekstis mõningal määral osad'
WHERE id=222;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition, in an unknown context, is unknown, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle rahulolu selle eeltingimusega mingisuguses teadmata kontekstis pole teada, kuid tolles teadmata kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=223;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition, in an unknown context, is unknown, but their action outcome in that unknown context is, to an extent, purposeful. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle rahulolu selle eeltingimusega mingisuguses teadmata kontekstis pole teada, kuid tolles teadmata kontekstis nad tegutsevad mõningal määral eesmärgikohaselt. Meil siiski ei ole teada, kas'
WHERE id=224;

UPDATE validation_combination_result
SET result_en='The action outcome, in a slightly different context, is incorrect, and satisfaction with this precondition is, in a slightly different context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus veidi teises kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega tolles veidi teistsuguses kontekstis. Meil pole alust eeldada, et'
WHERE id=229;

UPDATE validation_combination_result
SET result_en='The action outcome, in a slightly different context, is incorrect, and satisfaction with this precondition is, in a slightly different context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus veidi teises kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega tolles veidi teistsuguses kontekstis. Meil pole alust eeldada, et'
WHERE id=230;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in a slightly different context is unknown, but whose action outcome, in that slightly different context, is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega tolles veidi teistsuguses kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=231;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in a slightly different context is unknown, but whose action outcome, in that slightly different context, is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus veidi teises kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega tolles veidi teistsuguses kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=232;

UPDATE validation_combination_result
SET result_en='The action outcome, in a different context, is incorrect, and satisfaction with this precondition is, in that different context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus ühes teises kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega tolles teistsuguses kontekstis. Meil pole alust eeldada, et'
WHERE id=233;

UPDATE validation_combination_result
SET result_en='The action outcome, in a different context, is incorrect, and satisfaction with this precondition is, in that different context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus ühes teises kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega tolles teistsuguses kontekstis. Meil pole alust eeldada, et'
WHERE id=234;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in a different context is unknown, but whose action outcome, in that different context, is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega tolles teistsuguses kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=235;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in a different context is unknown, but whose action outcome, in that different context, is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus ühes teises kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega tolles teistsuguses kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=236;

UPDATE validation_combination_result
SET result_en='The action outcome in an unknown context is incorrect, and satisfaction with this precondition is, in that unknown context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega  tolles teadmata kontekstis. Meil pole alust eeldada, et'
WHERE id=237;

UPDATE validation_combination_result
SET result_en='The action outcome in an unknown context is incorrect, and satisfaction with this precondition is, in that unknown context, unknown. Therefore, we cannot assume that',
    result_et='Tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne, lisaks pole teada, milline on rahulolu eeltingimusega  tolles teadmata kontekstis. Meil pole alust eeldada, et'
WHERE id=238;

UPDATE validation_combination_result
SET result_en='There is a different stakeholder whose satisfaction with this precondition in an unknown context is unknown, but whose action outcome, in that unknown context, is incorrect. However, we don''t know whether',
    result_et='On üks teine sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega  tolles teadmata kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=239;

UPDATE validation_combination_result
SET result_en='There is a stakeholder whose satisfaction with this precondition in an unknown context is unknown, but whose action outcome, in that unknown context, is incorrect. However, we don''t know whether',
    result_et='On mingi sidusrühm, kelle tegutsemise tulemus mingisuguses teadmata kontekstis on ebakorrektne, kuid nende rahulolu eeltingimusega  tolles teadmata kontekstis pole teada. Samuti ei ole meil teada, kas'
WHERE id=240;