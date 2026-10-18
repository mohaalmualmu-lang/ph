// Unit 3 — source: "EMS313_Ch03.pdf" (Modes of Transmission, PPE, Isolation Precautions; 22 slides)
export default {
  id: 'ch3', n: 3,
  title: 'Modes of Transmission, PPE & Isolation',
  ar: 'طرق انتقال العدوى، معدات الوقاية الشخصية، والعزل',
  file: 'EMS313_Ch03.pdf',
  sections: [
    {
      id: 's1', title: 'Three routes: contact, droplet, airborne', src: 'Slides 3–6',
      blocks: [
        { t: 'note', k: 'ems', x: 'The patient for the whole lecture: **Ahmed, 34**, from shared workers\' accommodation. Cough for three weeks, fever, night sweats, weight loss. He coughs through a 25-minute transport. Before you touch him: no mask, a surgical mask, or an N95?' },
        { t: 'h', x: 'Contact' },
        { t: 'table', cap: 'Contact transmission', quiz: true, head: ['Type', 'How'], rows: [
          ['{direct|Direct}', 'Skin to skin. From the patient to you, and from you to the next patient.'],
          ['{indirect|Indirect}', 'Through a stretcher rail, a cuff, a monitor cable, or a hand that touched them.']] },
        { t: 'p', x: 'Indirect contact is the route that **hand hygiene (Chapter 2)** and **equipment cleaning (Chapter 4)** exist to break. Ahmed: before he coughs at all, his hands, his blanket and the rail he holds are contact routes.' },
        { t: 'svg', id: 'routes' },
        { t: 'h', x: 'Droplet' },
        { t: 'ul', items: [
          '**{droplet|Droplets}** are **larger than 5 µm**, made by coughing, sneezing and talking. They travel a short distance (**about 2 metres**) and drop.',
          'How far depends on: the **force** of the cough, the **density** of the drops, **temperature**, **humidity**, **air circulation**, and how long the germ stays infectious.',
          'Examples: **pertussis** (whooping cough), **influenza**, **rhinovirus**, **SARS coronavirus**, **group A streptococcus**, **Neisseria meningitidis**.'] },
        { t: 'note', k: 'ems', x: 'Stand two metres away and droplets never reach you. **In an ambulance you are never two metres away.** If Ahmed has influenza, his cough reaches everyone in the compartment. That alone needs a mask.' },
        { t: 'h', x: 'Airborne' },
        { t: 'ul', items: [
          '**{airborne|Airborne}** particles are **5 µm or smaller**: **{nuclei|droplet nuclei}**, the dried residue of droplets. Light enough to float and move with the air, across the room, along the corridor, **for hours**.',
          'Spread this way (Box 3.1): **tuberculosis, measles (rubeola), chickenpox (varicella)**.'] },
        { t: 'table', cap: 'Droplet vs airborne (don\'t mix them up)', quiz: true, head: ['', 'Droplet', 'Airborne'], rows: [
          ['Size', 'Larger than 5 µm', '5 µm or smaller'],
          ['Distance', 'About 2 metres, then falls', 'Far, stays suspended'],
          ['Your mask', '{surgicalmask|Surgical mask}', '{n95|N95 respirator}, {fittest|fit-tested}']] },
        { t: 'chain', items: ['3 weeks cough + night sweats + weight loss', 'Think tuberculosis', 'Airborne until proven otherwise', 'Surgical mask is not enough → N95'] },
        { t: 'note', k: 'conflict', x: 'Droplet distance: the lecture says **about 2 metres** (slides 3, 5, 6). A past quiz option says "3–6 feet" (Quiz 2, Q6). The site uses the lecture value. See the "Differences from the lecture" page.' }
      ],
      recall: [
        { q: 'Droplet vs airborne: particle size, distance and mask?', a: 'Droplet >5 µm, ~2 m then falls, surgical mask. Airborne ≤5 µm (droplet nuclei), far/stays suspended, fit-tested N95.' },
        { q: 'Name the airborne diseases in Box 3.1.', a: 'Tuberculosis, measles (rubeola), chickenpox (varicella).' },
        { q: 'Name the droplet examples on slide 5.', a: 'Pertussis, influenza, rhinovirus, SARS coronavirus, group A streptococcus, Neisseria meningitidis.' },
        { q: 'What factors decide how far droplets travel?', a: 'Force of the cough, density of the drops, temperature, humidity, air circulation, how long the germ stays infectious.' }
      ]
    },
    {
      id: 's2', title: 'PPE: when, and in what order', src: 'Slides 7–9',
      blocks: [
        { t: 'p', x: '{ppe|PPE} (gloves, gown, mask, eye protection) is a **barrier between the germ and your skin, airways and clothes**.' },
        { t: 'twocol', a: { h: 'Put it on', items: ['Whenever **blood or body fluids could reach you**.'] }, b: { h: 'Take it off', items: ['Take it off and throw it away **before you leave the patient\'s room**.', 'In the ambulance, the patient\'s room is the **patient compartment**. PPE comes off at the door, before the cab.'] } },
        { t: 'h', x: 'Putting on (donning): Gown → Mask → Eyes → Gloves' },
        { t: 'order', id: 'c3-don' },
        { t: 'table', cap: 'Donning details', quiz: true, head: ['Step', 'Item', 'How'], rows: [
          ['0', 'Hand hygiene', 'Hand hygiene first, before the gown'],
          ['1', 'Gown', 'Cover arms and front, neck to mid-thigh. Tie at neck and waist'],
          ['2', 'Mask or respirator', 'Ties at the crown and the neck. Fit the nose piece. Seal-check a respirator'],
          ['3', 'Goggles or face shield', 'Over the eyes, or the whole face'],
          ['4', 'Gloves', 'Pull the cuffs over the gown sleeves']] },
        { t: 'h', x: 'Taking off (doffing): the front of everything is contaminated' },
        { t: 'order', id: 'c3-doff' },
        { t: 'table', cap: 'Doffing details', quiz: true, head: ['Step', 'Item', 'How'], rows: [
          ['1', 'Gloves', 'Peel off without touching the outside'],
          ['2', 'Goggles or face shield', 'By the headband or ear pieces'],
          ['3', 'Gown', 'Untie, peel down from the shoulders, roll inside out'],
          ['4', 'Mask or respirator', 'By the ties. Do not touch the front'],
          ['5', 'Hand hygiene', 'Then, and only then, the cab and the report']] },
        { t: 'twocol', a: { h: 'Clean parts', items: ['Ties, ear loops, headband: you may touch them with bare hands'] }, b: { h: 'Contaminated parts', items: ['The front of the mask, the goggles, the shield, the gown, the gloves'] } },
        { t: 'mistakes', intro: 'Spot the mistake (slide 9): After handover, Khalid pulls his mask down under his chin, removes his gloves, then his gown, and walks to the cab to write the report. Tap each action to see what is wrong.', lines: [
          ['He pulls his mask down under his chin (first).', true, 'Gloves come off first; the mask comes off last, by the ties, without touching the front.'],
          ['He removes his gloves, then his gown.', true, 'Goggles/face shield are removed after gloves and before the gown.'],
          ['He walks to the cab to write the report.', true, 'Hand hygiene is the final step; only then the cab and the report.']] }
      ],
      recall: [
        { q: 'Donning order?', a: 'Hand hygiene → gown → mask/respirator → goggles/face shield → gloves.' },
        { q: 'Doffing order?', a: 'Gloves → goggles/face shield → gown → mask/respirator → hand hygiene.' },
        { q: 'Which parts are "clean" and may be touched with bare hands?', a: 'Ties, ear loops, headband.' },
        { q: 'In the ambulance, where does PPE come off?', a: 'At the door of the patient compartment, before the cab.' }
      ]
    },
    {
      id: 's3', title: 'Gloves, gowns, eye protection and masks', src: 'Slides 10–13',
      blocks: [
        { t: 'h', x: 'Gloves: latex or nitrile, never vinyl' },
        { t: 'p', x: 'Wear gloves whenever you could touch **blood or body fluids, mucous membranes, broken skin, or other infectious material** [IB/IC]. Gloves do not replace hand hygiene: hand hygiene before, hand hygiene after, a new pair for every patient.' },
        { t: 'h', x: 'Gowns' },
        { t: 'ul', items: [
          'An **isolation gown, not a lab coat or jacket**. Covers the arms and the front, from the neck to mid-thigh. Always with gloves.',
          '**Wear it [IB/IC]** when the task could soil your clothes, and for direct contact with a patient whose secretions are not contained.',
          '**Two rules people miss:** do not gown just for entering a high-risk unit [IB]; take the gown off and clean your hands before you leave the room [IB/IC].'] },
        { t: 'h', x: 'Eyes, nose and mouth' },
        { t: 'ul', items: [
          'Choose a mask, goggles, a face shield, or a combination, for the task and the risk [IB/IC].',
          '**Best eye protection: a {faceshield|face shield} from the top of the head to the chin.** It must be comfortable, adjustable, and not block your side vision (NIOSH).',
          '**{agp|Aerosol-generating procedures}: full protection every time**: bronchoscopy, suctioning the airway, endotracheal intubation.'] },
        { t: 'note', k: 'ems', x: 'If Ahmed needs suctioning or intubation on the way, the risk changes: **respirator, full face shield, gown, gloves**.' },
        { t: 'table', cap: 'Three kinds of mask, and only one stops airborne germs', quiz: true, head: ['', 'Surgical mask', 'Procedure / isolation mask', 'N95 respirator ("TB mask")'], rows: [
          ['FDA', 'Cleared by the FDA', 'Not cleared by the FDA', '—'],
          ['Property', 'Fluid-resistant', 'No fluid-resistance standard', 'Filters tiny particles; must be fit-tested'],
          ['Stops', 'Droplets and splashes', 'Droplet barrier', 'The only one for airborne germs: TB, measles, chickenpox']] },
        { t: 'note', k: 'key', x: 'After use the **front is contaminated**. Remove a mask by the ties or ear loops, with bare hands, **after the gloves are off**.' }
      ],
      recall: [
        { q: 'Which glove materials are acceptable?', a: 'Latex or nitrile, never vinyl.' },
        { q: 'When should you wear a gown?', a: 'When the task could soil your clothes, and for direct contact with a patient whose secretions are not contained.' },
        { q: 'Name the three aerosol-generating procedures on slide 12.', a: 'Bronchoscopy, suctioning the airway, endotracheal intubation.' },
        { q: 'Surgical vs procedure mask?', a: 'Surgical: FDA-cleared, fluid-resistant, stops droplets and splashes. Procedure/isolation: not FDA-cleared, droplet barrier, no fluid-resistance standard.' }
      ]
    },
    {
      id: 's4', title: 'Standard and transmission-based precautions', src: 'Slides 14–17',
      blocks: [
        { t: 'table', cap: 'Two tiers', quiz: true, head: ['', 'Tier 1: {standard|Standard precautions}', 'Tier 2: {tbp|Transmission-based precautions}'], rows: [
          ['Who', 'Every patient, every time', 'Patients who have, or are suspected to have, a highly transmissible or important pathogen'],
          ['What', 'Treat all blood, body fluids, secretions and excretions (**except sweat**), broken skin and mucous membranes as infectious', 'Contact, droplet or airborne']] },
        { t: 'note', k: 'key', x: '**Tier 2 is added to Tier 1, never instead of it.** Ahmed: standard precautions from the first touch; airborne precautions added the moment the history is heard.' },
        { t: 'table', cap: 'Contact · Droplet · Airborne precautions (don\'t mix them up)', quiz: true, head: ['', '{contactp|Contact}', '{dropletp|Droplet}', '{airbornep|Airborne}'], rows: [
          ['On you', 'Gown and gloves on entry, off before leaving', 'Surgical mask on entry [IB]', 'Fit-tested N95 or higher [IB]'],
          ['On the patient', '—', 'Surgical mask when moved, plus cough etiquette [IB]', 'Surgical mask until inside the room [IB/IC]'],
          ['Room', 'Single room if possible; room cleaned at least daily', 'Private room preferred; no special air handling, no respirator needed', 'Negative-pressure isolation room ({aiir|AIIR}); air out through {hepa|HEPA} or to the outside'],
          ['Equipment / staff', 'Equipment stays with the patient, or is cleaned between patients', '—', 'Non-immune staff stay away from measles, chickenpox, smallpox [IB]'],
          ['When / germs', 'Draining wounds, faecal incontinence, any discharge that could contaminate the environment', 'Pertussis, influenza, meningococcus, group A streptococcus', 'Tuberculosis, measles, chickenpox']] },
        { t: 'p', x: 'Contact precautions: all measures are **HICPAC/CDC Category IB**. Droplet spread needs close contact with respiratory secretions; the drops do not stay infectious over distance, so **the air itself is not the problem**. The **patient\'s mask matters as much as yours**: it stops droplets at the source.' },
        { t: 'note', k: 'ems', x: '**Umm Saad, 78**, long-term care facility, draining leg wound, notes say **{mrsa|MRSA}**: gown and gloves before the stretcher, a cuff that stays with her, the ambulance cleaned before the next call, MRSA stated at handover.' },
        { t: 'note', k: 'ems', x: 'If Ahmed had **influenza**: surgical mask on the crew, surgical mask on Ahmed, and you would be done.' },
        { t: 'note', k: 'warn', x: '**No isolation room available:** mask on the patient, and keep the room empty for **about an hour** afterwards [IB/IC]. **The ambulance has no negative pressure:** mask on Ahmed, N95 on the crew, exhaust fan on, hospital pre-alerted, compartment aired after.' },
        { t: 'note', k: 'conflict', x: 'Time a room stays contaminated: Ch3 slide 17 says keep the room empty for **about an hour**. The vaccines lecture (slide 24) says measles virus can remain infectious in the air for **up to 2 hours** after the patient leaves. Both are shown with their sources.' }
      ],
      recall: [
        { q: 'What does standard precautions treat as infectious? What is the exception?', a: 'All blood, body fluids, secretions and excretions, broken skin and mucous membranes, except sweat.' },
        { q: 'Contact precautions: four measures?', a: 'Single room if possible; gown and gloves on entry, off before leaving; equipment stays with patient or cleaned between patients; room cleaned at least daily.' },
        { q: 'Droplet precautions: what goes on you and on the patient?', a: 'Surgical mask on you on entry; surgical mask on the patient when moved, plus cough etiquette.' },
        { q: 'Airborne precautions: the room?', a: 'Negative-pressure AIIR; air exhausted through HEPA or to the outside.' }
      ]
    },
    {
      id: 's5', title: 'Which precaution? Isolation vs quarantine', src: 'Slides 18–21',
      blocks: [
        { t: 'sort', id: 'c3-which' },
        { t: 'note', k: 'added', x: 'The answers to slide 18 are "in the speaker notes", which are not in the PDF. The answers here link each clue to a disease using the vaccines lecture (whoop = pertussis, slide 28; fever + stiff neck + purple rash = meningococcal, slide 25; rash that begins on the face = measles, slide 23; itchy blistering rash = varicella, slides 15–16) and the precaution lists on Ch3 slides 15–17.' },
        { t: 'table', cap: 'Isolation is for the ill. Quarantine is for the exposed.', quiz: true, head: ['', '{isolation|Isolation}', '{quarantine|Quarantine}'], rows: [
          ['Who', 'The person is already **ill or diagnosed**', 'The person was **exposed and may become ill**'],
          ['Where / when', 'Usually **in hospital, during treatment**', 'For a well-defined group and a dangerous, highly contagious disease'],
          ['How long', 'As long as the patient is infectious', 'Contact with others is limited until it is clear they did not catch it']] },
        { t: 'note', k: 'ems', x: 'After the call: Ahmed\'s tuberculosis is confirmed. He is **isolated** in the hospital\'s negative-pressure room until no longer infectious. The crew were exposed; they are not ill, so they are **not isolated**. They are screened and followed up.' },
        { t: 'h', x: 'The system: none of this works unless the service pays for it and teaches it' },
        { t: 'twocol', a: { h: 'Administrators [IB/IC]', items: ['Put prevention of transmission into the safety objectives', 'Make it a priority, with the money and the people to run the programme'] }, b: { h: 'Education on PPE and precautions', items: ['Task-specific', 'At orientation, then updated', 'For everyone', 'Built on adult learning', 'In a language and reading level staff understand'] } },
        { t: 'p', x: 'Fit-testing, respirators in every vehicle, face shields at the stretcher, gowns that fit, someone whose job it is to check: **these are administrative decisions**.' },
        { t: 'table', cap: 'The whole chapter in five questions', head: ['Question', 'Answer'], rows: [
          ['How does it spread?', 'Contact, droplet or airborne. The route decides everything else.'],
          ['What barrier do I need?', 'Gloves, gown, mask or respirator, eye protection. Chosen for the task, removed in order.'],
          ['Which precaution?', 'Standard for everyone. Contact, droplet or airborne added on suspicion.'],
          ['Who is separated from whom?', 'Isolation for the ill, quarantine for the exposed, contact precautions for resistant organisms.'],
          ['What must the service provide?', 'Objectives, budget, equipment, fit-testing and training for everyone.']] },
        { t: 'note', k: 'key', x: '"**The precaution starts on suspicion, not on diagnosis.**"' }
      ],
      recall: [
        { q: 'Isolation vs quarantine in one line each?', a: 'Isolation: the ill/diagnosed, usually in hospital during treatment, as long as infectious. Quarantine: the exposed who may become ill, contact limited until clear.' },
        { q: 'When does a precaution start?', a: 'On suspicion, not on diagnosis.' },
        { q: 'What precautions are used for resistant organisms (e.g. MRSA, VRE)?', a: 'Contact precautions.' }
      ]
    }
  ],

  orders: [
    { id: 'c3-don', sec: 's2', src: 'Slide 8', title: 'Putting on PPE (donning)', steps: ['Hand hygiene', 'Gown', 'Mask or respirator', 'Goggles or face shield', 'Gloves'] },
    { id: 'c3-doff', sec: 's2', src: 'Slide 9', title: 'Taking off PPE (doffing)', steps: ['Gloves', 'Goggles or face shield', 'Gown', 'Mask or respirator', 'Hand hygiene'] }
  ],
  sorts: [
    { id: 'c3-which', sec: 's5', src: 'Slide 18 (+ vaccines slides 15–28)', title: 'Which precaution? Contact, droplet or airborne', cats: ['Contact', 'Droplet', 'Airborne'],
      items: [['A child with a barking cough and a whoop for two weeks', 1], ['A man with fever, stiff neck and a purple rash', 1], ['A care-home resident with faecal incontinence and a known VRE', 0], ['A student with fever, cough and a rash that began on the face', 2], ['An adult with fever, body aches and a dry cough in flu season', 1], ['An adult with a month of cough and a friend recently treated for TB', 2], ['A dialysis patient with a heavily draining catheter-site infection', 0], ['A young adult with an itchy blistering rash all over the body', 2]] },
    { id: 'c3-route', sec: 's1', src: 'Slides 4–6', title: 'Which route?', cats: ['Contact', 'Droplet', 'Airborne'],
      items: [['Tuberculosis', 2], ['Measles (rubeola)', 2], ['Chickenpox (varicella)', 2], ['Pertussis', 1], ['Influenza', 1], ['Neisseria meningitidis', 1], ['Group A streptococcus', 1], ['Rhinovirus', 1], ['A stretcher rail touched by the last patient', 0], ['Skin to skin from patient to provider', 0]] }
  ],

  questions: [
    { id: 'c3q1', sec: 's1', q: 'Which statement about droplets is correct?', o: ['They are larger than 5 µm and fall within about 2 metres', 'They are 5 µm or smaller and stay suspended for hours', 'They need negative-pressure rooms', 'They are stopped only by an N95 respirator'], x: 'Slide 5.', src: 'Slide 5' },
    { id: 'c3q2', sec: 's1', q: 'Droplet nuclei are:', o: ['The dried residue of droplets, 5 µm or smaller', 'Large drops produced by sneezing that fall within about 2 metres', 'Particles larger than 5 µm', 'Organisms on a stretcher rail'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c3q3', sec: 's1', q: 'Which group lists ONLY airborne diseases (Box 3.1)?', o: ['Tuberculosis, measles, chickenpox', 'Influenza, pertussis, measles', 'Tuberculosis, influenza, MRSA', 'Chickenpox, meningococcus, rhinovirus'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c3q4', sec: 's1', q: 'Which infection is spread by DROPLETS according to slide 5?', o: ['Neisseria meningitidis', 'Tuberculosis', 'Measles', 'Chickenpox'], x: 'Slide 5 droplet examples: pertussis, influenza, rhinovirus, SARS-CoV, group A strep, N. meningitidis.', src: 'Slide 5' },
    { id: 'c3q5', sec: 's1', q: 'Touching a stretcher rail that the last patient held is:', o: ['Indirect contact', 'Direct contact', 'Droplet transmission', 'Airborne transmission'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c3q6', sec: 's1', q: 'Ahmed: 3 weeks of cough, night sweats and weight loss. What respiratory protection does the crew need?', o: ['Fit-tested N95 respirator', 'Surgical mask', 'Procedure mask', 'No mask if 2 metres away'], x: 'Slide 6: think TB; airborne until proven otherwise; a surgical mask is not enough.', src: 'Slide 6' },
    { id: 'c3q7', sec: 's1', q: 'Which factor does NOT determine how far droplets travel?', o: ['The patient\'s blood type', 'Force of the cough', 'Humidity', 'Air circulation'], x: 'Slide 5 lists force, density, temperature, humidity, air circulation, infectious time.', src: 'Slide 5' },
    { id: 'c3q8', sec: 's2', q: 'PPE should be put on whenever:', o: ['Blood or body fluids could reach you', 'The patient has a confirmed diagnosis', 'You enter the ambulance cab', 'The patient requests it'], x: 'Slide 7.', src: 'Slide 7' },
    { id: 'c3q9', sec: 's2', q: 'The correct DONNING sequence after hand hygiene is:', o: ['Gown → mask → goggles → gloves', 'Gloves → gown → mask → goggles', 'Mask → gown → gloves → goggles', 'Goggles → mask → gown → gloves'], x: 'Slide 8.', src: 'Slide 8' },
    { id: 'c3q10', sec: 's2', q: 'The correct DOFFING sequence is:', o: ['Gloves → goggles → gown → mask → hand hygiene', 'Mask → gloves → gown → goggles → hand hygiene', 'Gown → gloves → mask → goggles → hand hygiene', 'Gloves → mask → gown → goggles → hand hygiene'], x: 'Slide 9.', src: 'Slide 9' },
    { id: 'c3q11', sec: 's2', q: 'Which part of PPE may be touched with bare hands during removal?', o: ['Ties, ear loops and headband', 'The front of the mask', 'The outside of the gloves', 'The front of the gown'], x: 'Slide 9: clean parts.', src: 'Slide 9' },
    { id: 'c3q12', sec: 's2', q: 'In the ambulance, PPE is removed:', o: ['At the patient compartment door, before the cab', 'In the cab, after writing the patient report and before hand hygiene', 'At the hospital entrance', 'After returning to the station'], x: 'Slide 7.', src: 'Slide 7' },
    { id: 'c3q13', sec: 's2', q: 'When donning gloves, the cuffs should be:', o: ['Pulled over the gown sleeves', 'Tucked under the gown sleeves', 'Folded back to the wrist', 'Taped to the gown'], x: 'Slide 8.', src: 'Slide 8' },
    { id: 'c3q14', sec: 's3', q: 'Which glove material should NOT be used?', o: ['Vinyl', 'Nitrile', 'Latex', 'Both latex and nitrile'], x: 'Slide 10: latex or nitrile, never vinyl.', src: 'Slide 10' },
    { id: 'c3q15', sec: 's3', q: 'Which statement about gowns is correct?', o: ['Do not gown just for entering a high-risk unit', 'A lab coat is an acceptable isolation gown', 'Gowns are kept on when leaving the room', 'Gowns are worn without gloves'], x: 'Slide 11 [IB].', src: 'Slide 11' },
    { id: 'c3q16', sec: 's3', q: 'The best eye protection according to NIOSH is:', o: ['A face shield from the top of the head to the chin', 'Prescription eyeglasses', 'A surgical mask with ear loops', 'Goggles or prescription glasses with no side protection, worn under a mask'], x: 'Slide 12.', src: 'Slide 12' },
    { id: 'c3q17', sec: 's3', q: 'Which is an aerosol-generating procedure listed on slide 12?', o: ['Endotracheal intubation', 'Blood pressure measurement', 'IV cannulation', 'Splinting'], x: 'Slide 12: bronchoscopy, suctioning the airway, endotracheal intubation.', src: 'Slide 12' },
    { id: 'c3q18', sec: 's3', q: 'Which mask is cleared by the FDA and fluid-resistant?', o: ['Surgical mask', 'Procedure/isolation mask', 'Cloth mask', 'Any mask with ear loops'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c3q19', sec: 's3', q: 'The only mask that protects against airborne germs is the:', o: ['N95 respirator, fit-tested', 'Surgical mask', 'Procedure mask', 'Isolation mask'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c3q20', sec: 's4', q: 'Standard precautions treat all body fluids as infectious EXCEPT:', o: ['Sweat', 'Saliva', 'Urine', 'Blood'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c3q21', sec: 's4', q: 'Transmission-based precautions are:', o: ['Added to standard precautions, never instead of them', 'Used instead of standard precautions', 'Used only after laboratory confirmation of the pathogen at the hospital', 'Applied to every patient every time'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c3q22', sec: 's4', q: 'Contact precautions include:', o: ['Gown and gloves on entry; equipment stays with the patient', 'An N95 respirator on entry', 'A negative-pressure room with air exhausted through a HEPA filter', 'A surgical mask on the patient only'], x: 'Slide 15.', src: 'Slide 15' },
    { id: 'c3q23', sec: 's4', q: 'For droplet precautions, which is correct?', o: ['No special air handling and no respirator are needed', 'A negative-pressure room with HEPA-filtered exhaust air is required', 'The patient wears an N95 respirator', 'Only gloves are needed'], x: 'Slide 16.', src: 'Slide 16' },
    { id: 'c3q24', sec: 's4', q: 'Airborne infection isolation rooms (AIIR) exhaust air:', o: ['Through HEPA filters or to the outside', 'Into the hospital corridor through the open door', 'Back into the same room', 'Into the ambulance bay'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c3q25', sec: 's4', q: 'If no isolation room is available for an airborne patient, what does slide 17 advise?', o: ['Mask the patient and keep the room empty for about an hour afterwards', 'Keep the door open so the corridor ventilates the room, and use droplet precautions', 'Use droplet precautions instead', 'Delay transport until a room is free'], x: 'Slide 17 [IB/IC].', src: 'Slide 17' },
    { id: 'c3q26', sec: 's4', q: 'Umm Saad (MRSA, draining leg wound) requires which precautions?', o: ['Contact', 'Droplet', 'Airborne', 'Standard only'], x: 'Slide 15.', src: 'Slide 15' },
    { id: 'c3q27', sec: 's4', q: 'Non-immune staff should stay away from patients with:', o: ['Measles, chickenpox, smallpox', 'Influenza, pertussis, MRSA', 'Hepatitis A and B', 'Group A streptococcus'], x: 'Slide 17 [IB].', src: 'Slide 17' },
    { id: 'c3q28', sec: 's5', q: 'A person who was exposed to a dangerous contagious disease and may become ill is placed in:', o: ['Quarantine', 'Isolation', 'Contact precautions', 'A negative-pressure operating room'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c3q29', sec: 's5', q: 'The crew who transported Ahmed (confirmed TB) are not ill. They are:', o: ['Screened and followed up, not isolated', 'Isolated in a negative-pressure room', 'Quarantined in hospital during treatment', 'Placed on contact precautions'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c3q30', sec: 's5', q: 'Fit-testing, respirators in every vehicle and gowns that fit are:', o: ['Administrative decisions', 'Personal choices of each paramedic', 'Patient responsibilities', 'Optional extras'], x: 'Slide 20.', src: 'Slide 20' },
    { id: 'c3q31', sec: 's5', q: 'A care-home resident with faecal incontinence and known VRE needs:', o: ['Contact precautions', 'Droplet precautions', 'Airborne precautions', 'Quarantine'], x: 'Slide 15: faecal incontinence / discharge that could contaminate the environment.', src: 'Slides 15, 18' },
    { id: 'c3q32', sec: 's5', q: 'According to the lecture, a precaution starts:', o: ['On suspicion, not on diagnosis', 'After laboratory confirmation', 'After hospital handover', 'Only when the patient has a fever'], x: 'Slide 21.', src: 'Slide 21' },

    // Past questions — Quiz 2, ch 2&3 (45).pdf
    { id: 'p2q1', sec: 's1', q: 'Which of the following is an example of direct transmission?', o: ['Skin-to-skin contact with the patient', 'Standing next to contaminated bed linens', 'Inhaling particles of infectious material', 'Releasing droplets into the air when sneezing'], x: 'Slide 4: direct = skin to skin, patient to you.', src: 'Slide 4', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 1, edit: 'Modified: the quiz\'s option "Contacting infectious blood with a wound" was replaced with the lecture\'s definition of direct contact ("skin to skin"), because the lecture does not classify blood-to-wound contact.' } },
    { id: 'p2q2', sec: 's1', q: 'The respiratory droplets involved in droplet transmission are ______ than the droplet nuclei (airborne) involved in airborne transmission.', o: ['bigger', 'smaller', 'the same', 'no different'], x: 'Droplets >5 µm; droplet nuclei ≤5 µm (slides 5–6).', src: 'Slides 5–6', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 2 } },
    { id: 'p2q3', sec: 's4', q: 'As a supervisor at an EMS centre during a disaster event, you are told a newly admitted patient requires Contact Precautions. What is the most appropriate placement?', o: ['In a single patient room', 'In a room with a decontamination station immediately outside the door', 'No specific type of room is preferred', 'In a room with negative pressure ventilation'], x: 'Slide 15: single room if possible. (Negative pressure is for airborne.)', src: 'Slide 15', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 3 } },
    { id: 'p2q4', sec: 's1', q: 'Which of the following statements are true about infectious droplets? i. The velocity and mechanism by which droplets are propelled may impact how far they travel. ii. The density of respiratory secretions may impact how far they travel. iii. Air circulation may impact how far they travel. iv. The force by which the susceptible host inhales may impact how far they travel.', o: ['I, II, and III', 'I, II, III, and IV', 'II, III, and IV'], fix: true, x: 'Slide 5: force of the cough, density, temperature, humidity, air circulation. Nothing about how hard the host inhales.', src: 'Slide 5', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 4, edit: 'Only three options were visible in the screenshot; the question uses those three.' } },
    { id: 'p2q5', sec: 's3', q: 'Your paramedic team suggests that all staff routinely wear gowns for every patient interaction in the ICU, regardless of diagnosis. Most appropriate response?', o: ['Do not support it: routine gowning in high-risk units is not recommended; gowns are for contact/transmission-based indications', 'Support it: it is unlikely to reduce infection but reassures staff', 'Do not support it: it is not cost-effective even though it reduces transmission', 'Support it: routine gowning in all high-risk environments is recommended by CDC and HICPAC'], x: 'Slide 11: do not gown just for entering a high-risk unit [IB].', src: 'Slide 11', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 5 } },
    { id: 'p2q7', sec: 's2', q: 'HICPAC recommends that personal protective equipment (PPE) be used when there is a potential for ______.', o: ['blood or body fluid exposure', 'water', 'soil and dirt spots', 'unclean surface'], x: 'Slide 7.', src: 'Slide 7', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 7 } },
    { id: 'p2q8', sec: 's5', q: 'Quarantine usually occurs in hospital while the patient is receiving treatment.', o: ['True', 'False'], a: 1, fix: true, x: 'False. That describes ISOLATION (slide 19).', src: 'Slide 19', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 8 } },
    { id: 'p2q9', sec: 's4', q: 'Standard precautions are used with every patient.', o: ['True', 'False'], fix: true, x: 'True: every patient, every time (slide 14).', src: 'Slide 14', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 9 } },
    { id: 'p2q11', sec: 's4', q: 'Diseases transmitted via droplet transmission require special air handling to avoid contamination of the ventilation system.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Droplet precautions: no special air handling (slide 16).', src: 'Slide 16', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 11 } },
    { id: 'p2q14', sec: 's1', q: 'Which of the following is an example of indirect transmission?', o: ['Contact with contaminated bed linens', 'Looking at infected patients with HIV', 'Releasing droplets into the air when sneezing', 'Inhalation of particles of infectious material'], x: 'Slide 4: indirect = through an object (rail, cuff, cable; Ahmed\'s blanket).', src: 'Slide 4', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 14 } },
    { id: 'p2q15', sec: 's4', q: 'Which type of transmission-based precautions should be implemented for patients infected with influenza virus, Neisseria meningitidis and group A Streptococcus (invasive disease)?', o: ['Droplet Precautions', 'Standard Precautions', 'Contact Precautions', 'Airborne Precautions'], x: 'Slides 5 and 16.', src: 'Slides 5, 16', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 15 } }
  ],

  cards: [
    { sec: 's1', f: 'Direct vs indirect contact', b: 'Direct: skin to skin. Indirect: through a rail, cuff, cable, or a hand that touched them.' },
    { sec: 's1', f: 'Droplet: size, distance, mask', b: '>5 µm · about 2 m then falls · surgical mask.' },
    { sec: 's1', f: 'Airborne: size, distance, mask', b: '≤5 µm droplet nuclei · far, stays suspended for hours · fit-tested N95.' },
    { sec: 's1', f: 'Airborne diseases (Box 3.1)', b: 'Tuberculosis, measles (rubeola), chickenpox (varicella).' },
    { sec: 's1', f: 'Droplet examples (slide 5)', b: 'Pertussis, influenza, rhinovirus, SARS-CoV, group A strep, N. meningitidis.' },
    { sec: 's2', f: 'Donning order', b: 'Hand hygiene → gown → mask/respirator → goggles/face shield → gloves (cuffs over sleeves).' },
    { sec: 's2', f: 'Doffing order', b: 'Gloves → goggles/face shield → gown → mask/respirator (by ties) → hand hygiene.' },
    { sec: 's2', f: 'When do you put PPE on / take it off?', b: 'On: whenever blood/body fluids could reach you. Off: before leaving the patient\'s room (ambulance: at the compartment door).' },
    { sec: 's3', f: 'Gloves: which materials?', b: 'Latex or nitrile, never vinyl. New pair for every patient; HH before and after.' },
    { sec: 's3', f: 'Gown: when, and two rules people miss', b: 'When clothes could be soiled / uncontained secretions. Don\'t gown just to enter a high-risk unit; take it off + HH before leaving.' },
    { sec: 's3', f: 'Aerosol-generating procedures (slide 12)', b: 'Bronchoscopy, suctioning the airway, endotracheal intubation → full protection.' },
    { sec: 's3', f: 'Surgical vs procedure vs N95', b: 'Surgical: FDA-cleared, fluid-resistant, droplets+splashes. Procedure: not FDA-cleared, droplet barrier. N95: fit-tested, airborne (TB, measles, chickenpox).' },
    { sec: 's4', f: 'Standard precautions', b: 'Every patient, every time. All blood, body fluids, secretions, excretions (except sweat), broken skin, mucous membranes = infectious.' },
    { sec: 's4', f: 'Contact precautions', b: 'Single room if possible; gown + gloves on entry; equipment stays/cleaned; room cleaned at least daily. Draining wounds, faecal incontinence. Category IB.' },
    { sec: 's4', f: 'Droplet precautions', b: 'Surgical mask on you; surgical mask on patient when moved + cough etiquette; private room preferred; no special air handling.' },
    { sec: 's4', f: 'Airborne precautions', b: 'Fit-tested N95+; mask on patient; negative-pressure AIIR (HEPA/outside); non-immune staff away from measles, chickenpox, smallpox.' },
    { sec: 's5', f: 'Isolation vs quarantine', b: 'Isolation: ill/diagnosed, in hospital during treatment, while infectious. Quarantine: exposed, may become ill, contact limited until clear.' }
  ]
};
