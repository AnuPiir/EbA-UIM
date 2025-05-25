UPDATE validation
SET name_et='Kirjeldus, mil määral on eeltingimus täidetud ',name_en='To what extent the preconditions are met  '
WHERE id=9;

UPDATE validation
SET tooltip_et='Millised sidusrühmad on selle funktsiooniga seotud või sellest oluliselt mõjutatud? Vt EbA meetodi juhend: Etapp 2.',
    tooltip_en='Which stakeholders are involved in each feature or are significantly affected by it? See EbA Method Guide: Step 2.'
WHERE id = 12;