// Unit 2 — source: "EMS313 Ch02(1).pdf" (Hand Hygiene, 33 slides)
// Slides marked "ADDED FOR EMS 313" in the lecture itself are still lecture content.
export default {
  id: 'ch2', n: 2,
  title: 'Hand Hygiene',
  ar: 'نظافة اليدين',
  file: 'EMS313 Ch02(1).pdf',
  sections: [
    {
      id: 's1', title: 'Why hand hygiene comes first', src: 'Slides 3–5',
      blocks: [
        { t: 'p', x: '{hh|Hand hygiene} is **the most effective way to prevent the spread of infection**. It is recommended by the **CDC (2002)** and the **WHO (2009)** as the first line of infection prevention.' },
        { t: 'ul', items: [
          'The chapter follows **Category {ia|IA} and {ib|IB}** recommendations, the strongest level.',
          'IA: strongly recommended, supported by strong studies. IB: strongly recommended, supported by some studies and strong reasoning.',
          'Both are **equally binding**. The letter shows the strength of the evidence, not the strength of the rule.',
          'Hand hygiene protects **two people: the patient and the provider**.'] },
        { t: 'stat', n: '40%', x: 'average hand hygiene compliance of healthcare workers in observational studies (range 5% to 81%)' },
        { t: 'h', x: 'Hands touch everything' },
        { t: 'ul', items: [
          'Hands touch the patient, the equipment, and you. Every contact can pick up or leave microorganisms.',
          'Microorganisms **survive on hands for several minutes**, long enough to reach the next surface or patient.',
          '**Moisture increases transfer**: wet hands and wet skin areas move more microorganisms than dry ones.',
          '**More contacts per hour = more risk**: busy shifts create more opportunities and lower compliance.'] },
        { t: 'note', k: 'ems', x: 'A patient with a chest infection coughs inside the ambulance for 20 minutes. Droplets land on the rails, the monitor, the oxygen tubing and your hands. Every surface you touch afterwards becomes part of the transmission route.' },
        { t: 'h', x: '1847: General Hospital of Vienna' },
        { t: 'table', cap: '1847 hand-washing intervention', head: ['Doctors\' ward', 'Midwives\' ward'], rows: [
          ['Doctors came directly from the autopsy room to deliver babies → **high death rate** of mothers after childbirth.', 'Midwives did not perform autopsies → **much lower death rate**.']] },
        { t: 'p', x: '**The intervention:** hand washing with an **antiseptic solution** was made compulsory before entering the ward, and deaths fell sharply. This was the **first intervention trial comparing an antiseptic against plain soap**. The evidence has been clear for more than 170 years. The difficulty is **behaviour, not knowledge**.' }
      ],
      recall: [
        { q: 'Which two organizations recommend hand hygiene as the first line of infection prevention, and in which years?', a: 'CDC (2002) and WHO (2009).' },
        { q: 'What is the difference between Category IA and IB?', a: 'IA: supported by strong studies. IB: supported by some studies and strong reasoning. Both are strongly recommended and equally binding.' },
        { q: 'Average hand hygiene compliance in observational studies?', a: '40% (range 5% to 81%).' },
        { q: 'What did the 1847 Vienna intervention make compulsory?', a: 'Hand washing with an antiseptic solution before entering the ward. Deaths fell sharply.' }
      ]
    },
    {
      id: 's2', title: 'Skin flora and how hands carry germs', src: 'Slides 6–7',
      blocks: [
        { t: 'table', cap: 'Transient vs resident flora (don\'t mix them up)', quiz: true, head: ['', '{transient|Transient flora}', '{resident|Resident flora}'], rows: [
          ['Where', 'Surface layers of the skin', 'Attached to deeper layers'],
          ['Removed by hand hygiene?', 'Yes, easily removed by hand washing', 'Difficult to remove'],
          ['Link to {hai|healthcare-associated infection}', 'Most often the cause', 'Less often the cause'],
          ['In EMS terms', 'Picked up from the last patient, the stretcher or the monitor', 'Your own permanent skin bacteria; normal and protective']] },
        { t: 'note', k: 'key', x: 'Transient flora is **easy to remove and the most dangerous**.' },
        { t: 'p', x: '**What increases transfer of transient flora?** The type of microorganism · the number present · the level of moisture. Highest-risk body areas for colonisation: **perineal and groin area**, then armpits, trunk and upper limbs.' },
        { t: 'h', x: 'Five steps for transmission through hands' },
        { t: 'order', id: 'c2-hands' },
        { t: 'chain', items: ['Microorganisms on patient/surfaces/equipment', 'Transfer to provider\'s hands', 'Survive on hands for minutes', 'Hand hygiene missed, done badly or with wrong agent', 'Next patient contaminated'] },
        { t: 'note', k: 'key', x: '**Step 4 is the only step the provider fully controls.** Break it, and the chain stops.' }
      ],
      recall: [
        { q: 'Which flora is most often the cause of healthcare-associated infection?', a: 'Transient flora: on the surface layers, easily removed.' },
        { q: 'Three things that increase transfer of transient flora?', a: 'Type of microorganism, number present, level of moisture.' },
        { q: 'Which of the 5 transmission steps does the provider fully control?', a: 'Step 4: hand hygiene (missed, done badly or with the wrong agent).' }
      ]
    },
    {
      id: 's3', title: 'Methods and agents', src: 'Slides 8–10, 13–14',
      blocks: [
        { t: 'table', cap: 'Hand hygiene is one term with several methods', quiz: true, head: ['Method', 'What it is', 'Effect'], rows: [
          ['{handwash|Hand washing}', 'Plain (non-antimicrobial) soap and water', 'Removes dirt and transient flora; **does not kill**'],
          ['{antisepticwash|Antiseptic hand wash}', 'Soap containing an antiseptic agent, with water', 'Removes and kills'],
          ['{handrub|Antiseptic hand rub}', 'Alcohol-based product rubbed on all surfaces until dry. No water', 'Fast, kills, no sink needed'],
          ['{surgical|Surgical hand antisepsis}', 'Antiseptic wash or rub of hands **and forearms** before sterile procedures', 'Removes transient flora and **reduces resident flora**']] },
        { t: 'note', k: 'warn', x: '**{soiled|Visibly soiled} hands** (dirt you can see, or blood/body fluids such as faeces or urine) **need soap and water. An alcohol rub is not enough.**' },
        { t: 'p', x: 'Hand-hygiene agents differ in **effectiveness, safety, {residual|residual activity} and skin tolerance**.' },
        { t: 'h', x: 'Plain soap' },
        { t: 'twocol', a: { h: 'What it does', items: ['Works by **detergent (cleaning) action, not by killing**', 'Removes dirt, soil and organic material such as blood', 'Can remove transient flora', 'The correct choice when hands are visibly soiled'] }, b: { h: 'Limitations', items: ['Little or no antimicrobial activity', 'May fail to remove pathogens', 'Repeated washing can paradoxically **increase** bacterial counts on the skin', 'Skin irritation and dryness with frequent use'] } },
        { t: 'note', k: 'ems', x: 'A trauma patient bleeds onto your gloves and wrist. After removing gloves, use soap and water first. The soap will not kill what is there, but it removes the blood, and blood must be removed before any antiseptic can work properly.' },
        { t: 'h', x: 'Alcohol-based hand rub: how it works' },
        { t: 'chain', items: ['Ethanol or isopropanol', '{denature|Denatures} (breaks down) microbial proteins', 'Needs water for the reaction', 'Effective at 60%–95%'] },
        { t: 'ul', items: [
          'Effective concentration: **60% to 95%** alcohol mixed with water.',
          '**Above 95% is LESS effective** because the reaction needs water. Without water, alcohol evaporates before it can denature proteins.',
          'The most effective agent for routine hand hygiene by healthcare personnel.',
          'Kills (laboratory data): gram-positive and gram-negative bacteria including {mdro|multidrug-resistant organisms}, Mycobacterium tuberculosis, many fungi, most {enveloped|enveloped viruses} (influenza, HIV, herpes simplex).',
          'Hepatitis B and C are enveloped, but the evidence at 60–70% alcohol is less certain.'] },
        { t: 'why', q: 'Which is stronger for hand hygiene: 70% alcohol or 99% alcohol? Why?', a: '70%. Above 95% is less effective because the reaction needs water. Without water, alcohol evaporates before it can denature proteins.' },
        { t: 'h', x: 'Other hand hygiene agents' },
        { t: 'table', cap: 'Other agents (1 of 2)', quiz: true, head: ['Agent', 'Advantages', 'Disadvantages', 'FDA / cautions'], rows: [
          ['{chg|Chlorhexidine gluconate (CHG)}', 'Works well against gram-positive; effective against enveloped viruses; **substantial residual activity**; minimally affected by organic material such as blood', 'Less effective against gram-negative, fungi, non-enveloped viruses; minimally effective against M. tuberculosis; does not kill spores; inactivated by natural soaps and hand creams (anionic emulsifying agents)', 'Conjunctivitis and severe corneal damage reported with 1% chlorhexidine; keep away from the eyes'],
          ['{pcmx|Chloroxylenol (PCMX)}', 'Good activity against gram-negative, mycobacteria and certain viruses; only minimally affected by organic matter', 'Contradictory data; needs a longer time to work; less residual activity than chlorhexidine; neutralised by non-ionic surfactants', 'FDA: not enough information to classify as safe and effective'],
          ['{hexachlorophene|Hexachlorophene}', '{bacteriostatic|Bacteriostatic}; good activity against S. aureus; cumulative effect with repeated use; residual activity', 'Less effective against gram-negative, fungi and mycobacteria; only modestly effective after a single use; toxic, absorbed through the skin', 'FDA: not generally recognised as safe and effective, especially for infant bathing']] },
        { t: 'table', cap: 'Other agents (2 of 2)', quiz: true, head: ['Agent', 'Advantages', 'Disadvantages', 'FDA / notes'], rows: [
          ['{iodophor|Iodine and iodophors}', 'Effective against gram-positive and gram-negative, some spore-forming bacteria, mycobacteria, viruses and fungi; most formulations contain **7.5% to 10% povidone-iodine**', 'Iodine causes skin irritation and discolouration; iodophor effectiveness depends on pH, temperature, exposure time and inorganic material', 'Widely used; iodophors are less irritating than free iodine'],
          ['{quats|Quaternary ammonium compounds}', 'More effective against gram-negative; some activity against lipophilic viruses', 'Less effective against gram-positive; minimally effective against mycobacteria and fungi; decreased by organic matter such as blood; not compatible with anionic detergents', 'FDA: several compounds have insufficient data to be classified as safe and effective'],
          ['{triclosan|Triclosan}', 'Non-ionic, colourless, **0.2% to 2%** in antimicrobial soaps; most effective against gram-positive including MRSA; reasonably effective against mycobacteria and Candida; some persistent activity; not substantially affected by organic matter', 'Less effective against gram-negative, especially Pseudomonas aeruginosa; affected by pH, surfactants, emollients, humectants and ionic properties', 'FDA 1994: insufficient data to classify as safe and effective; FDA inquiry into safety and efficacy']] },
        { t: 'p', x: '**How to compare any agent:** what is its spectrum, how fast does it act, does it keep working after application (residual activity), and does blood or organic material stop it?' },
        { t: 'note', k: 'ems', x: 'For EMS practice (added for EMS 313 in the lecture): **chlorhexidine is the agent to remember, for its residual activity**. Povidone-iodine is used for skin preparation before injections and needs contact time; wiping and injecting immediately wastes it.' }
      ],
      recall: [
        { q: 'Which method removes dirt and transient flora but does not kill?', a: 'Hand washing with plain (non-antimicrobial) soap and water.' },
        { q: 'Effective alcohol concentration range, and why is >95% worse?', a: '60%–95%. The reaction needs water; above 95% alcohol evaporates before it denatures proteins.' },
        { q: 'Which agent is "the one to remember" for EMS and why?', a: 'Chlorhexidine (CHG), for its residual (persistent) activity.' },
        { q: 'Which agents have residual/persistent activity? Which has none?', a: 'CHG (substantial), hexachlorophene, triclosan (some), PCMX (less than CHG). Alcohol has none.' },
        { q: 'Povidone-iodine concentration in most hand-hygiene formulations?', a: '7.5% to 10%.' }
      ]
    },
    {
      id: 's4', title: 'Alcohol rub vs soap and water', src: 'Slides 11–12, 15',
      blocks: [
        { t: 'twocol', a: { h: 'Alcohol: advantages', items: ['Fast: works in seconds', 'More effective than other agents for routine hand hygiene', 'Best option against multidrug-resistant organisms', 'Covers gram-positive, gram-negative, fungi and TB', 'No sink needed, so it suits the field'] }, b: { h: 'Alcohol: limitations', items: ['Poor against **bacterial spores ({cdiff|C. difficile})**, protozoan cysts and **{nonenveloped|non-enveloped viruses}** (e.g. {norovirus|norovirus})', 'No persistent or residual activity: the effect ends when hands are dry', 'Less effective when blood or organic material is present', 'Flammable and volatile, a storage issue in a hot ambulance'] } },
        { t: 'note', k: 'key', x: '**Three situations where alcohol fails:** visibly soiled hands · C. difficile · non-enveloped viruses such as norovirus. In all three, use **soap and water**.' },
        { t: 'table', cap: 'Alcohol-based hand rub vs soap and water: not interchangeable', quiz: true, head: ['', 'Alcohol-based hand rub', 'Soap and water'], rows: [
          ['Speed', '20 to 30 seconds; no sink needed', '40 to 60 seconds; needs sink and towels'],
          ['Kills or removes?', 'Kills most bacteria, fungi, enveloped viruses', 'Removes mechanically; plain soap does not kill'],
          ['Spores and non-enveloped viruses', 'Poor (C. difficile, norovirus)', 'Removed by washing and rinsing'],
          ['Visibly soiled hands', 'Not effective; blood reduces activity', 'Required'],
          ['Residual activity', 'None', 'None (plain soap)'],
          ['Skin', 'Less irritating than frequent washing', 'Dryness and irritation with repeated use'],
          ['In EMS', 'Between routine patient contacts; at the point of care; pocket bottle', 'After blood or body-fluid contact; diarrhoea calls; when hands are visibly dirty']] },
        { t: 'note', k: 'key', x: '**Default in the field: alcohol-based hand rub.** Switch to soap and water when hands are visibly soiled, or after C. difficile or norovirus exposure.' },
        { t: 'sort', id: 'c2-method' }
      ],
      recall: [
        { q: 'Name the three situations where alcohol fails.', a: 'Visibly soiled hands, C. difficile (spores), non-enveloped viruses such as norovirus.' },
        { q: 'How long does a hand rub take vs a hand wash?', a: 'Rub 20–30 seconds; wash 40–60 seconds.' },
        { q: 'Does alcohol have residual activity?', a: 'No. The effect ends when the hands are dry.' }
      ]
    },
    {
      id: 's5', title: 'Technique: the six rubbing steps', src: 'Slides 16–18',
      blocks: [
        { t: 'p', x: 'Hand rub and hand wash share the **same six rubbing steps (steps 2 to 7)** from the WHO "How to handrub / How to handwash" posters.' },
        { t: 'twocol', a: { h: 'Alcohol-based hand rub · 20–30 s', items: ['1a, 1b: Apply a palmful of the product in a cupped hand and cover all surfaces', '2 to 7: The six rubbing steps, then keep rubbing until the hands are dry'] }, b: { h: 'Soap and water · 40–60 s', items: ['0, 1: Wet hands with water, then apply enough soap to cover all surfaces', '2 to 7: The same six rubbing steps', '8, 9, 10: Rinse with water, dry thoroughly with a single-use towel, use the towel to turn off the tap'] } },
        { t: 'order', id: 'c2-six' },
        { t: 'order', id: 'c2-wash' },
        { t: 'twocol', a: { h: 'Most often missed', items: ['Fingertips and under the nails (step 7)', 'Thumbs (step 6)', 'Between the fingers (steps 3 and 4)', 'Backs of the hands and wrists'] }, b: { h: 'Hand rub: two rules', items: ['**If your hands are dry in 10 seconds, you used too little.**', 'Never wipe or shake the hands to speed up drying. The product must finish working.'] } },
        { t: 'p', x: '**Why steps 9 and 10 matter (handwash):** wet hands transfer far more microorganisms than dry hands, so dry thoroughly with a single-use towel. You touched the tap with contaminated hands before washing, so use the towel to turn it off or the contamination comes back.' },
        { t: 'note', k: 'conflict', x: '**The numbers you will see:** hand rub **20–30 seconds, until dry (WHO)**; handwash **40–60 seconds** for the whole procedure (WHO). **At least 15 seconds** of rubbing is the **CDC minimum** quoted in the source deck (slide 17). Slide 29 gives the fix for rubbing too fast as "about 30 seconds".' },
        { t: 'h', x: 'Spot the mistake (slide 18)' },
        { t: 'mistakes', intro: 'Ahmed finishes a trauma call. There is blood on his gloves. Tap each line that contains a hand-hygiene error.', lines: [
          ['He removes the gloves and wipes his hands with an alcohol wipe.', true, 'Blood = visibly soiled → soap and water first; alcohol does not work through blood.'],
          ['He dries his hands on his uniform trousers.', true, 'Dry thoroughly with a single-use towel.'],
          ['He picks up his personal phone and writes the patient report.', true, 'Phone stays out of the patient compartment, or is disinfected after every patient.'],
          ['At the next call he puts on new gloves and begins the assessment.', true, 'Hand hygiene is needed before putting on gloves (glove sequence).'],
          ['After the shift he refills the half-empty hand-rub bottle in the ambulance drawer.', true, 'Never top up a partly full dispenser: contamination risk. Use pre-filled bottles.']] }
      ],
      recall: [
        { q: 'Which areas are most often missed?', a: 'Fingertips/under the nails (step 7), thumbs (step 6), between the fingers (steps 3–4), backs of hands and wrists.' },
        { q: 'Your hands are dry 10 seconds after a rub. What does that mean?', a: 'You used too little product.' },
        { q: 'Why use the towel to turn off the tap?', a: 'You touched the tap with contaminated hands before washing; otherwise the contamination comes back.' }
      ]
    },
    {
      id: 's6', title: 'Surgical hand antisepsis', src: 'Slides 19–20',
      blocks: [
        { t: 'p', x: '**{surgical|Surgical hand antisepsis}** is pre-operative cleansing of the **hands and forearms** with antiseptic agents. It **removes transient flora and reduces resident flora**.' },
        { t: 'ul', items: [
          'Most effective products: formulations of **60% to 95% alcohol alone**; **50% to 95% alcohol combined** with a quaternary ammonium compound, hexachlorophene or chlorhexidine gluconate; waterless, alcohol-based rubs.',
          '**Why add chlorhexidine?** Alcohol kills fast but stops working when dry. A long operation inside a warm, moist glove lets resident flora regrow. Chlorhexidine keeps working for hours.',
          'Before putting on sterile gloves, use an **antimicrobial soap or an alcohol-based hand rub with persistent activity** [CDC and WHO, IB].'] },
        { t: 'table', cap: 'Key recommendations', quiz: true, head: ['Recommendation', 'Source'], rows: [
          ['Artificial nails are prohibited in settings that require surgical hand antisepsis', 'WHO IB'],
          ['Brushes are not recommended', 'WHO IB'],
          ['Scrub hands and forearms for the length of time suggested by the manufacturer', 'CDC and WHO IB'],
          ['Long scrub times are not necessary', 'CDC and WHO IB'],
          ['Before an alcohol-based surgical scrub with persistent activity, prewash hands and forearms with non-antimicrobial soap, then dry them', 'CDC IB'],
          ['Use enough alcohol-based hand rub to keep hands and forearms wet throughout the procedure', 'WHO IB'],
          ['After applying the alcohol-based product, dry hands and forearms thoroughly before putting on sterile gloves', 'CDC and WHO IB'],
          ['Use an antimicrobial soap or alcohol-based hand rub with persistent activity before putting on sterile gloves', 'CDC and WHO IB']] },
        { t: 'chain', items: ['Brushes / long scrubs', 'Damage the skin', 'Bring resident flora up from deeper layers', 'Bacterial count rises instead of falling'] },
        { t: 'note', k: 'key', x: 'The product\'s **contact time** does the work, not scrubbing.' }
      ],
      recall: [
        { q: 'Surgical hand antisepsis covers which body areas, and what does it do to flora?', a: 'Hands and forearms. Removes transient flora and reduces resident flora.' },
        { q: 'Why add chlorhexidine to a surgical rub?', a: 'Alcohol stops working when dry; resident flora regrows in a warm, moist glove; chlorhexidine keeps working for hours.' },
        { q: 'Why are brushes and long scrubs not recommended?', a: 'They damage skin and bring resident flora up from deeper layers, so the count rises.' }
      ]
    },
    {
      id: 's7', title: 'Choosing products, and gloves', src: 'Slides 21–23',
      blocks: [
        { t: 'table', cap: 'Choose an agent that staff will use', quiz: true, head: ['Rule', 'Why', 'Category'], rows: [
          ['Low potential for irritation', 'Even when used many times per shift', 'IB'],
          ['Ask the staff', 'Feel, fragrance and skin tolerance decide whether people use it', 'IB'],
          ['Cost is not the main factor', 'A cheap product that dries the skin lowers compliance and costs more', 'CDC IB · WHO II'],
          ['**Never top up a partly full dispenser**', 'Contamination risk. Use pre-filled bags or bottles', 'IA'],
          ['Provide hand lotion or cream', 'Skin protection is part of infection control, but the cream must be compatible with the agent', 'IA'],
          ['Teach skin care', 'Education programmes should include how to reduce irritation and damage', 'IB']] },
        { t: 'p', x: 'Product compatibility: ask the manufacturer about the risk of product contamination [WHO IB] and about using hand lotions, creams or alcohol-based antiseptics together [CDC IB, WHO II]. EMS: a pocket-sized bottle per provider; bottles are never refilled in the ambulance drawer; a compatible hand cream is stocked at the station in dry, hot weather.' },
        { t: 'h', x: 'Gloves do not replace hand hygiene' },
        { t: 'order', id: 'c2-gloves' },
        { t: 'twocol', a: { h: 'Why gloves are not enough', items: ['Gloves can have tiny holes you cannot see', 'Hands become contaminated while removing gloves', 'The warm, moist space inside a glove lets bacteria multiply on your skin', '**WHO Category IB: the use of gloves does not reduce the need for hand hygiene**'] }, b: { h: 'Four glove rules (CDC and WHO, IB)', items: ['Remove gloves after caring for the patient', 'Dispose of gloves after use', '**Never use the same pair for more than one patient**', '**Never wash gloves for re-use**', 'Also: no artificial nails or extenders when in direct contact with patients (IB)'] } }
      ],
      recall: [
        { q: 'What is the correct glove sequence?', a: 'Hand hygiene → put on gloves → patient care → remove gloves → hand hygiene.' },
        { q: 'Give three reasons gloves are not enough.', a: 'Tiny invisible holes; hands contaminated during removal; warm moist glove lets bacteria multiply.' },
        { q: 'What is the rule about a partly full dispenser, and its category?', a: 'Never top it up (contamination risk); use pre-filled bags/bottles. Category IA.' }
      ]
    },
    {
      id: 's8', title: 'The ambulance, compliance and the five moments', src: 'Slides 24–28',
      blocks: [
        { t: 'p', x: '**Indirect transmission in the ambulance:** Patient → paramedic hand → monitor → paramedic hand → next patient.' },
        { t: 'p', x: '**{hightouch|High-touch surfaces}:** monitor and cables · stretcher rails and straps · BP cuff and stethoscope · radio and tablet · door handles and grab rails · your personal phone. Consecutive patients in the same vehicle share every surface you touched between them, unless the surfaces were cleaned and your hands were too.' },
        { t: 'note', k: 'ems', x: '**The phone problem:** a phone touched during patient care is rarely cleaned and goes home with you. Keep it out of the patient compartment, or disinfect it after every patient.' },
        { t: 'h', x: 'Why compliance fails (average 40%, range 5–81%)' },
        { t: 'table', cap: 'Barriers', quiz: true, head: ['System', 'Beliefs', 'Culture'], rows: [
          ['Sinks far away or too few · lack of soap and paper towels · lack of time · understaffed or overcrowded wards · agents that irritate and dry the skin', '"Gloves are enough" · patient seen as low risk · lack of knowledge of guidelines · forgetfulness · scepticism about the value · disagreement with the policy', 'No role model among peers or supervisors · no feedback · no institutional priority · no active promotion · no safety climate']] },
        { t: 'ul', items: [
          'Compliance is **lower before patient contact than after**. Providers protect themselves more than the patient.',
          'Compliance **falls as the number of opportunities per hour rises**, which is when it matters most.',
          'Compliance is **lower at night** than by day, **lower among physicians** than nurses, and **lower after a clean task** than a dirty one.'] },
        { t: 'h', x: 'What improves compliance' },
        { t: 'table', cap: 'Improvement strategies', quiz: true, head: ['Strategy', 'Detail', 'Category'], rows: [
          ['Monitor and give feedback', 'Monitor compliance with hand-hygiene practices and policies and feed results back to staff', 'CDC and WHO IA'],
          ['Institutional priority', 'Administrative support and funding', 'CDC and WHO IB'],
          ['Education that targets the barriers', 'Address the factors that influence compliance, not only the products', 'WHO IA'],
          ['Multimodal, with senior executives', 'Multi-faceted, multimodal, with support from senior executives', 'WHO IA'],
          ['Multidisciplinary programmes', 'Include easy access to alcohol-based hand rub', 'CDC IA'],
          ['Product where care happens', 'Hand rub at the room entrance, bedside, pocket-sized containers; dispensers at the point of care', 'CDC IA · WHO IB/IA']] },
        { t: 'note', k: 'ems', x: 'In EMS the **point of care is the side of the stretcher**: a pocket bottle for every provider and a dispenser mounted in the patient compartment, not in a cabinet in the cab.' },
        { t: 'h', x: 'When should a paramedic perform hand hygiene?' },
        { t: 'twocol', a: { h: 'Before', items: ['Patient contact', 'IV insertion', 'Medication preparation', 'Airway procedures', 'Handling clean equipment'] }, b: { h: 'After', items: ['Patient contact', 'Blood or body-fluid exposure', 'Removing gloves', 'Touching contaminated equipment', 'Cleaning the ambulance', 'Contact with the patient environment'] } },
        { t: 'order', id: 'c2-moments' },
        { t: 'table', cap: 'Right method · right timing · right technique', head: ['Right method', 'Right timing', 'Right technique'], rows: [
          ['Rub by default; wash when soiled, after C. difficile or norovirus', 'Before as much as after; five moments, every call', 'The six rubbing steps; until dry for the rub, 40 to 60 seconds at the sink']] },
        { t: 'note', k: 'key', x: 'You cannot control what the patient carries or how long microorganisms survive on skin. **You can always control step 4.**' }
      ],
      recall: [
        { q: 'List the WHO five moments.', a: '1 Before touching the patient · 2 Before a clean/aseptic procedure · 3 After body-fluid exposure risk · 4 After touching the patient · 5 After touching the patient\'s surroundings.' },
        { q: 'Is compliance higher before or after patient contact? Why?', a: 'After. Providers protect themselves more than the patient.' },
        { q: 'Where is the "point of care" in EMS?', a: 'The side of the stretcher: pocket bottle per provider + dispenser in the patient compartment.' }
      ]
    },
    {
      id: 's9', title: 'Common EMS mistakes and scenarios', src: 'Slides 29–33',
      blocks: [
        { t: 'table', cap: 'Common EMS hand-hygiene mistakes and fixes', quiz: true, head: ['Mistake', 'Fix'], rows: [
          ['Changing gloves without hand hygiene', 'Hand hygiene before and after every pair'],
          ['Alcohol rub on visibly bloody hands', 'Soap and water first; alcohol does not work through blood'],
          ['Touching a personal phone during patient care', 'Phone stays out of the patient compartment, or is disinfected after every patient'],
          ['Rubbing while walking, dry in 10 seconds', 'Enough product, all surfaces, until dry: about 30 seconds'],
          ['Wiping gloves to keep them on for the next task', 'Gloves are single use: remove, discard, hand hygiene'],
          ['Refilling half-empty bottles; storing rub in a hot cabin', 'Pre-filled bottles only; store away from heat']] },
        { t: 'h', x: 'Practical scenarios (slide 30)' },
        { t: 'ul', items: [
          '**Respiratory patient:** pneumonia, continuous cough during a 20-minute transport; you adjust his oxygen mask twice and hold the rail. Which moments apply? Which surfaces need cleaning?',
          '**IV insertion in a moving ambulance:** stable patient, no sink, hands not visibly soiled. Which method, when, and what about gloves before and after?',
          '**Needlestick during a trauma call:** the needle pricks your finger through the glove. Immediate actions in the first minute, and what follows?'] },
        { t: 'h', x: 'Key takeaways' },
        { t: 'ul', items: ['Hand hygiene is one of the most important infection-prevention practices.', 'Hand hygiene protects the patient and the provider.', 'Alcohol-based hand rub and soap and water are not interchangeable in every situation.', 'Gloves do not replace hand hygiene.', 'Hands and equipment can transmit microorganisms between patients.', 'Hand hygiene is a clinical patient-safety intervention, not just a routine task.'] }
      ],
      recall: [
        { q: 'Fix for "rubbing while walking, dry in 10 seconds"?', a: 'Enough product, all surfaces, until dry: about 30 seconds.' },
        { q: 'Fix for "wiping gloves to keep them on"?', a: 'Gloves are single use: remove, discard, hand hygiene.' }
      ]
    }
  ],

  orders: [
    { id: 'c2-hands', sec: 's2', src: 'Slide 7', title: 'Five steps for transmission through hands', steps: ['Microorganisms on the patient\'s skin, surfaces or equipment', 'They transfer to the provider\'s hands', 'They survive on the hands for at least several minutes', 'Hand hygiene is missed, done badly or with the wrong agent', 'Contaminated hands touch the next patient or equipment'] },
    { id: 'c2-six', sec: 's5', src: 'Slide 16', title: 'The six rubbing steps (2 to 7)', steps: ['Palm to palm', 'Right palm over the back of the left hand, fingers interlaced (and vice versa)', 'Palm to palm with fingers interlaced', 'Backs of fingers against the opposite palm, fingers interlocked', 'Rotational rubbing of each thumb held in the other palm', 'Rotational rubbing of the fingertips in the opposite palm'] },
    { id: 'c2-wash', sec: 's5', src: 'Slide 16', title: 'Hand washing with soap and water: whole procedure', steps: ['Wet hands with water', 'Apply enough soap to cover all hand surfaces', 'Six rubbing steps (2 to 7)', 'Rinse hands with water', 'Dry thoroughly with a single-use towel', 'Use the towel to turn off the tap'] },
    { id: 'c2-gloves', sec: 's7', src: 'Slide 22', title: 'The correct glove sequence, every time', steps: ['Hand hygiene', 'Put on gloves', 'Patient care', 'Remove gloves', 'Hand hygiene'] },
    { id: 'c2-moments', sec: 's8', src: 'Slide 27', title: 'WHO five moments, in order', steps: ['Before touching the patient', 'Before a clean or aseptic procedure', 'After body-fluid exposure risk', 'After touching the patient', 'After touching the patient\'s surroundings'] }
  ],
  sorts: [
    { id: 'c2-method', sec: 's4', src: 'Slides 11–12, 15', title: 'Alcohol rub or soap and water?', cats: ['Alcohol-based hand rub', 'Soap and water'],
      items: [['Between routine patient contacts, hands look clean', 0], ['Blood on your wrist after removing gloves', 1], ['Patient with known C. difficile, hands look clean', 1], ['Norovirus outbreak call', 1], ['Before an IV in a moving ambulance, no sink, hands not soiled', 0], ['Diarrhoea call', 1], ['After touching the stretcher rail (no visible soil)', 0], ['Hands visibly dirty with faeces', 1]] }
  ],

  questions: [
    { id: 'c2q1', sec: 's1', q: 'Which organizations recommend hand hygiene as the first line of infection prevention?', o: ['CDC (2002) and WHO (2009)', 'APIC (2002) and CBIC (2009)', 'FDA (1994) and CDC (2007)', 'WHO (2002) and NIOSH (2009)'], x: 'Slide 3.', src: 'Slide 3' },
    { id: 'c2q2', sec: 's1', q: 'What is the average hand hygiene compliance of healthcare workers in observational studies?', o: ['40%', '81%', '5%', '60%'], x: 'Slide 3: 40% (range 5% to 81%).', src: 'Slide 3' },
    { id: 'c2q3', sec: 's1', q: 'Category IB means a recommendation is:', o: ['Strongly recommended, supported by some studies and strong reasoning', 'Strongly recommended, supported by strong studies', 'Optional, based only on expert opinion and local preference rather than evidence', 'Less binding than a Category IA recommendation'], x: 'Slide 3. IA and IB are equally binding; the letter shows the strength of evidence.', src: 'Slide 3' },
    { id: 'c2q4', sec: 's1', q: 'In the 1847 Vienna hospital, why was the death rate higher on the doctors\' ward?', o: ['Doctors came directly from the autopsy room to deliver babies', 'Midwives performed autopsies before deliveries and did not wash their hands', 'The ward used plain soap instead of water', 'Mothers on that ward were not vaccinated'], x: 'Slide 5. Midwives did not perform autopsies.', src: 'Slide 5' },
    { id: 'c2q5', sec: 's1', q: 'According to the lecture, the main difficulty with hand hygiene today is:', o: ['Behaviour, not knowledge', 'Lack of evidence', 'Cost of alcohol rub', 'Lack of approved agents'], x: 'Slide 5: the evidence has been clear for more than 170 years.', src: 'Slide 5' },
    { id: 'c2q6', sec: 's1', q: 'Which statement about microorganisms on hands is correct?', o: ['Wet hands transfer more microorganisms than dry hands', 'Microorganisms die within a few seconds on the dry skin of the hands', 'More contacts per hour lower the risk', 'Moisture reduces transfer between surfaces'], x: 'Slide 4: moisture increases transfer.', src: 'Slide 4' },
    { id: 'c2q7', sec: 's2', q: 'Transient flora is:', o: ['On the surface layers, easily removed, most often the cause of HAI', 'Attached to the deeper skin layers, difficult to remove, and normal and protective', 'Normal and protective permanent skin bacteria', 'Removed only by surgical scrubbing with brushes'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c2q8', sec: 's2', q: 'Which body area carries the highest risk for colonisation?', o: ['Perineal and groin area', 'Armpits', 'Upper limbs', 'Trunk'], x: 'Slide 6: perineal and groin area, then armpits, trunk and upper limbs.', src: 'Slide 6' },
    { id: 'c2q9', sec: 's2', q: 'Which of the five steps of hand transmission does the provider fully control?', o: ['Step 4: hand hygiene', 'Step 1: organisms on the patient', 'Step 3: survival on the hands', 'Step 2: transfer to the hands'], x: 'Slide 7: break step 4 and the chain stops.', src: 'Slide 7' },
    { id: 'c2q10', sec: 's2', q: 'Which factor is NOT listed as increasing transfer of transient flora?', o: ['The age of the provider', 'The type of microorganism', 'The number present', 'The level of moisture'], x: 'Slide 6 lists type, number and moisture.', src: 'Slide 6' },
    { id: 'c2q11', sec: 's3', q: 'Hand washing with plain soap and water:', o: ['Removes dirt and transient flora but does not kill', 'Kills spores and non-enveloped viruses that alcohol cannot reach', 'Has substantial residual activity', 'Reduces resident flora for hours'], x: 'Slides 8–9: detergent action, not killing.', src: 'Slides 8–9' },
    { id: 'c2q12', sec: 's3', q: 'Surgical hand antisepsis differs from routine hand hygiene because it:', o: ['Includes the forearms and reduces resident flora', 'Uses plain soap only', 'Is done after removing sterile gloves, at the end of the operation', 'Uses brushes for long scrub times'], x: 'Slides 8 and 19.', src: 'Slides 8, 19' },
    { id: 'c2q13', sec: 's3', q: 'What is the effective alcohol concentration for hand rubs?', o: ['60% to 95%', '30% to 50%', '95% to 100%', '10% to 30%'], x: 'Slide 10.', src: 'Slide 10' },
    { id: 'c2q14', sec: 's3', q: 'Why is alcohol above 95% LESS effective?', o: ['The protein-denaturing reaction needs water', 'It is too irritating to use', 'It has residual activity that blocks action', 'It is inactivated by hand creams'], x: 'Slide 10: without water alcohol evaporates before it can denature proteins.', src: 'Slide 10' },
    { id: 'c2q15', sec: 's3', q: 'Which agent has SUBSTANTIAL residual activity and is minimally affected by blood?', o: ['Chlorhexidine gluconate', 'Alcohol', 'Plain soap', 'Quaternary ammonium compounds'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c2q16', sec: 's3', q: 'Chlorhexidine can be inactivated by:', o: ['Natural soaps and hand creams (anionic emulsifying agents)', 'Blood and other organic material such as body fluids on the hands', 'Water used to rinse', 'Non-ionic surfactants'], x: 'Slide 13. (Non-ionic surfactants neutralise PCMX.)', src: 'Slide 13' },
    { id: 'c2q17', sec: 's3', q: 'Which agent is toxic, absorbed through the skin and not recognised by the FDA as safe for infant bathing?', o: ['Hexachlorophene', 'Triclosan', 'Chloroxylenol (PCMX)', 'Povidone-iodine'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c2q18', sec: 's3', q: 'Most iodophor hand-hygiene formulations contain:', o: ['7.5% to 10% povidone-iodine', '0.2% to 2% povidone-iodine', '60% to 95% povidone-iodine', '1% povidone-iodine'], x: 'Slide 14. (0.2–2% is triclosan.)', src: 'Slide 14' },
    { id: 'c2q19', sec: 's3', q: 'Triclosan is LESS effective against:', o: ['Gram-negative organisms, especially Pseudomonas aeruginosa', 'Gram-positive organisms including MRSA', 'Mycobacteria and Candida', 'Any organism when organic matter such as blood is present on the skin'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c2q20', sec: 's3', q: 'Quaternary ammonium compounds (as hand agents) are:', o: ['More effective against gram-negative, less against gram-positive', 'Highly effective against mycobacteria and fungi, and unaffected by blood', 'Unaffected by blood and organic matter', 'Compatible with anionic detergents'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c2q21', sec: 's3', q: 'Conjunctivitis and severe corneal damage have been reported with:', o: ['1% chlorhexidine', '70% alcohol', '10% povidone-iodine', '2% triclosan'], x: 'Slide 13: keep chlorhexidine away from the eyes.', src: 'Slide 13' },
    { id: 'c2q22', sec: 's3', q: 'Chloroxylenol (PCMX) compared with chlorhexidine:', o: ['Has less residual activity and needs a longer time to work', 'Has more residual activity than chlorhexidine and acts faster on the skin', 'Is the FDA\'s preferred surgical agent', 'Is inactivated by blood'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c2q23', sec: 's4', q: 'Alcohol-based hand rub is POOR against:', o: ['C. difficile spores and norovirus', 'MRSA and other MDROs', 'Mycobacterium tuberculosis', 'Influenza, HIV and other enveloped viruses'], x: 'Slide 11.', src: 'Slide 11' },
    { id: 'c2q24', sec: 's4', q: 'An elderly patient with C. difficile is transported; your hands look clean after removing gloves. Best action?', o: ['Wash hands with soap and water', 'Apply alcohol-based hand rub for 20 seconds', 'Apply alcohol-based hand rub twice', 'No hand hygiene is needed because gloves were worn'], x: 'Knowledge check 1 (slide 12): alcohol fails against C. difficile spores. (Answer derived from slides 11 and 15; speaker notes not in file.)', src: 'Slides 11–12' },
    { id: 'c2q25', sec: 's4', q: 'Which statement about alcohol-based hand rub is correct?', o: ['It has no residual activity; the effect ends when hands are dry', 'It is the best choice when hands are visibly soiled with blood or faeces', 'It removes spores by mechanical action', 'Its activity is increased by blood on the hands'], x: 'Slide 11.', src: 'Slide 11' },
    { id: 'c2q26', sec: 's4', q: 'How long does a complete soap-and-water hand wash take (WHO)?', o: ['40 to 60 seconds', '20 to 30 seconds', '10 to 15 seconds', '2 to 3 minutes'], x: 'Slides 15 and 17.', src: 'Slides 15, 17' },
    { id: 'c2q27', sec: 's4', q: 'The default hand hygiene method in the field is:', o: ['Alcohol-based hand rub', 'Plain soap and water', 'Antiseptic hand wash', 'Surgical hand antisepsis'], x: 'Slide 15: default = rub; switch to soap and water when soiled or after C. difficile/norovirus.', src: 'Slide 15' },
    { id: 'c2q28', sec: 's5', q: 'If your hands are dry 10 seconds after a hand rub, it means:', o: ['You used too little product', 'The product worked very fast', 'You must rinse with water', 'The alcohol concentration was too low'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c2q29', sec: 's5', q: 'Which area is MOST often missed during hand hygiene?', o: ['Fingertips and under the nails', 'The palms', 'The front of the wrist only', 'The forearms'], x: 'Slide 17: fingertips/nails (step 7), thumbs, between fingers, backs of hands and wrists.', src: 'Slide 17' },
    { id: 'c2q30', sec: 's5', q: 'In soap-and-water hand washing, why use the towel to turn off the tap?', o: ['You touched the tap with contaminated hands before washing', 'Wet taps damage the towel dispenser', 'It speeds up drying of the hands', 'The paper towel adds residual antiseptic activity to the clean hands'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c2q31', sec: 's5', q: 'What is the CDC minimum rubbing time quoted in the source deck?', o: ['At least 15 seconds', 'At least 60 seconds', 'At least 5 seconds', 'At least 2 minutes'], x: 'Slide 17. (WHO: rub 20–30 s; wash 40–60 s.)', src: 'Slide 17' },
    { id: 'c2q32', sec: 's6', q: 'Why add chlorhexidine to an alcohol surgical hand rub?', o: ['It keeps working for hours as resident flora regrows inside gloves', 'It speeds up drying of the hands', 'It removes visible soil and blood from the forearms before the alcohol is applied', 'It replaces the need for a prewash'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c2q33', sec: 's6', q: 'A surgical team needs skin protection through a three-hour operation inside sterile gloves. Which property matters most?', o: ['Residual (persistent) activity, for example from chlorhexidine', 'Fast onset of action', 'A pleasant fragrance', 'The highest possible alcohol concentration, ideally above 95% (99%)'], x: 'Final knowledge check Q4 (slide 32). Answer derived from slide 19.', src: 'Slides 19, 32' },
    { id: 'c2q34', sec: 's6', q: 'Why are brushes and long scrub times NOT recommended for surgical antisepsis?', o: ['They damage skin and bring resident flora up, so counts rise', 'They remove too much transient flora, leaving the hands without protection', 'They inactivate chlorhexidine', 'They take longer than manufacturers allow'], x: 'Slide 20.', src: 'Slide 20' },
    { id: 'c2q35', sec: 's6', q: 'In settings that require surgical hand antisepsis, artificial nails are:', o: ['Prohibited (WHO IB)', 'Allowed if short', 'Allowed with double gloving', 'Allowed after a 5-minute scrub'], x: 'Slide 20.', src: 'Slide 20' },
    { id: 'c2q36', sec: 's7', q: 'Never top up a partly full hand-rub dispenser. This is Category:', o: ['IA', 'IB', 'II', 'IC'], x: 'Slide 21: contamination risk; use pre-filled bags or bottles.', src: 'Slide 21' },
    { id: 'c2q37', sec: 's7', q: 'A paramedic removes gloves between two patients and immediately puts on a new pair without hand hygiene. This is:', o: ['Not acceptable: hand hygiene is required after removing gloves and before new ones', 'Acceptable, because the new gloves are clean', 'Acceptable, because the first patient had no known infection and the gloves looked clean', 'Acceptable if the first pair was worn less than ten minutes'], x: 'Knowledge check 2 (slide 23). Correct sequence: HH → gloves → care → remove → HH.', src: 'Slides 22–23' },
    { id: 'c2q38', sec: 's7', q: 'Which is one of the four glove rules (CDC and WHO, IB)?', o: ['Never wash gloves for re-use', 'Wash gloves with alcohol between tasks', 'One pair may be used for two patients from the same family', 'Gloves may replace hand hygiene for short contacts'], x: 'Slide 22.', src: 'Slide 22' },
    { id: 'c2q39', sec: 's7', q: 'Why does cost NOT come first when choosing a hand-hygiene product?', o: ['A cheap product that dries the skin lowers compliance', 'Expensive products always contain more alcohol', 'Cost is set by the FDA', 'Cheap products usually have more residual activity than expensive ones'], x: 'Slide 21 (CDC IB · WHO II).', src: 'Slide 21' },
    { id: 'c2q40', sec: 's8', q: 'Observation studies show hand hygiene compliance is LOWER:', o: ['Before patient contact than after', 'Among nurses than physicians', 'By day than at night', 'After a dirty task than a clean one'], x: 'Slide 25: providers protect themselves more than the patient.', src: 'Slide 25' },
    { id: 'c2q41', sec: 's8', q: '"Gloves are enough" is classified as which type of barrier to compliance?', o: ['Beliefs', 'System', 'Culture', 'Product'], x: 'Slide 25.', src: 'Slide 25' },
    { id: 'c2q42', sec: 's8', q: 'You unload the stretcher, wipe the rails and adjust monitor cables but never touch the patient. Is hand hygiene required before the next call?', o: ['Yes, contact with the patient\'s surroundings and equipment requires it', 'No, because there was no direct patient contact', 'No, because the rails were wiped with disinfectant before you touched the cables', 'Only if the patient had a known infection'], x: 'Knowledge check 3 (slide 31); WHO moment 5.', src: 'Slides 27, 31' },
    { id: 'c2q43', sec: 's8', q: 'WHO moment 5 is:', o: ['After touching the patient\'s surroundings', 'Before touching the patient', 'Before a clean or aseptic procedure', 'After body-fluid exposure risk'], x: 'Slide 27.', src: 'Slide 27' },
    { id: 'c2q44', sec: 's8', q: 'Which improvement strategy is WHO Category IA?', o: ['Education that targets the barriers to compliance', 'Choosing the cheapest product', 'Storing hand rub in the cab', 'Replacing hand rub with gloves for all short patient contacts'], x: 'Slide 26.', src: 'Slide 26' },
    { id: 'c2q45', sec: 's9', q: 'A colleague buys 99% alcohol believing it is stronger than the unit\'s 70% hand rub. What should you tell him?', o: ['Concentrations above 95% are less effective because alcohol needs water', 'He is right; a higher alcohol concentration always kills more microorganisms faster', 'Both work the same; the difference is only price', '99% is better only for visibly soiled hands'], x: 'Final knowledge check Q5 (slide 32); slide 10.', src: 'Slides 10, 32' },
    { id: 'c2q46', sec: 's9', q: 'The fix for "rubbing while walking, dry in 10 seconds" is:', o: ['Enough product, all surfaces, until dry: about 30 seconds', 'Rub for 5 seconds, then shake or wipe the hands dry to save time between calls', 'Switch to wiping hands on a towel', 'Use 99% alcohol so it dries faster'], x: 'Slide 29.', src: 'Slide 29' },

    { id: 'c2q47', sec: 's9', q: 'The fix for "wiping gloves to keep them on for the next task" is:', o: ['Gloves are single use: remove, discard, then hand hygiene', 'Wipe them with alcohol rub and continue with the next task', 'Wash them with soap and water between tasks', 'Put a second clean pair over the first pair'], x: 'Slide 29.', src: 'Slide 29' },
    { id: 'c2q48', sec: 's9', q: 'Which statement is one of the chapter\'s key takeaways?', o: ['Hand hygiene is a patient-safety intervention, not just a routine task', 'Gloves can replace hand hygiene for short patient contacts', 'Alcohol-based hand rub and soap and water are interchangeable in every situation', 'Equipment cannot transmit microorganisms between patients'], x: 'Slide 33.', src: 'Slide 33' },
    { id: 'c2q49', sec: 's9', q: 'The fix for "refilling half-empty bottles; storing rub in a hot cabin" is:', o: ['Pre-filled bottles only; store away from heat', 'Top up the bottle only at the station, never in the ambulance', 'Refill only when the bottle is less than a quarter full', 'Store the rub in the cab so it stays close to the crew'], x: 'Slides 21 and 29: never top up a partly full dispenser (IA).', src: 'Slides 21, 29' },

    // Past questions — Quiz 1 , ch 1&2 (45).pdf
    { id: 'p1q2', sec: 's3', q: 'Chlorhexidine gluconate is only minimally affected by the presence of blood and other organic materials.', o: ['True', 'False'], fix: true, x: 'True (slide 13).', src: 'Slide 13', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 2 } },
    { id: 'p1q3', sec: 's3', q: 'Formulations with a 100% alcohol content have the most effective antimicrobial properties.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Above 95% is less effective because the reaction needs water (slide 10).', src: 'Slide 10', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 3 } },
    { id: 'p1q6', sec: 's3', q: 'Alcohols have antimicrobial properties because they denature proteins that are in the pathogens.', o: ['True', 'False'], fix: true, x: 'True (slide 10).', src: 'Slide 10', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 6 } },
    { id: 'p1q9', sec: 's3', q: 'All of the following hand hygiene agents have some persistent activity after handwashing EXCEPT:', o: ['Alcohols', 'Hexachlorophene', 'Chlorhexidine gluconate', 'Triclosan'], x: 'Alcohol has no persistent or residual activity (slide 11). CHG, hexachlorophene and triclosan do (slides 13–14).', src: 'Slides 11, 13–14', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 9 } }
  ],

  cards: [
    { sec: 's1', f: 'Hand hygiene is recommended as the first line of infection prevention by…', b: 'CDC (2002) and WHO (2009).' },
    { sec: 's1', f: 'IA vs IB', b: 'IA: strongly recommended, strong studies. IB: strongly recommended, some studies + strong reasoning. Equally binding.' },
    { sec: 's1', f: 'Average HCW hand hygiene compliance', b: '40% (range 5%–81%).' },
    { sec: 's1', f: '1847 Vienna: what happened?', b: 'Doctors came from autopsies → high maternal deaths. Compulsory antiseptic hand washing → deaths fell sharply. First trial of antiseptic vs plain soap.' },
    { sec: 's2', f: 'Transient flora', b: 'Surface layers, easily removed, most often causes HAI, picked up from last patient/stretcher/monitor.' },
    { sec: 's2', f: 'Resident flora', b: 'Deeper layers, difficult to remove, less often causes HAI, normal and protective.' },
    { sec: 's2', f: 'Highest-risk body area for colonisation', b: 'Perineal and groin area (then armpits, trunk, upper limbs).' },
    { sec: 's3', f: 'Plain soap: kills or removes?', b: 'Removes (detergent action). Does not kill. Correct choice for visibly soiled hands.' },
    { sec: 's3', f: 'Alcohol: mechanism and effective range', b: 'Denatures microbial proteins; 60%–95% with water. >95% less effective (needs water).' },
    { sec: 's3', f: 'Chlorhexidine (CHG): key points', b: 'Gram-positive, enveloped viruses; substantial residual activity; minimally affected by blood; inactivated by natural soaps/hand creams; keep away from eyes.' },
    { sec: 's3', f: 'PCMX (chloroxylenol)', b: 'Gram-negative, mycobacteria; minimal effect of organic matter; slower; less residual than CHG; neutralised by non-ionic surfactants; FDA: not enough info.' },
    { sec: 's3', f: 'Hexachlorophene', b: 'Bacteriostatic, good vs S. aureus, cumulative + residual; toxic, absorbed through skin; FDA: not safe (infant bathing).' },
    { sec: 's3', f: 'Iodophors', b: 'Broad (incl. some spore-formers); 7.5–10% povidone-iodine; less irritating than free iodine; depends on pH, temp, time.' },
    { sec: 's3', f: 'Triclosan', b: '0.2–2%, non-ionic, colourless; best vs gram-positive incl. MRSA; weak vs gram-negative (Pseudomonas); some persistent activity.' },
    { sec: 's3', f: 'Quats as hand agents', b: 'Better vs gram-negative; weak vs gram-positive, mycobacteria, fungi; reduced by blood; not compatible with anionic detergents.' },
    { sec: 's4', f: 'Three situations where alcohol fails', b: 'Visibly soiled hands · C. difficile · non-enveloped viruses (norovirus) → soap and water.' },
    { sec: 's4', f: 'Hand rub time vs hand wash time', b: 'Rub 20–30 s (until dry). Wash 40–60 s. (CDC minimum ≥15 s of rubbing.)' },
    { sec: 's5', f: 'Most often missed areas', b: 'Fingertips/under nails (step 7), thumbs (step 6), between fingers (steps 3–4), backs of hands and wrists.' },
    { sec: 's6', f: 'Surgical hand antisepsis', b: 'Hands + forearms; removes transient, reduces resident flora; no brushes, no long scrubs; persistent-activity product before sterile gloves.' },
    { sec: 's7', f: 'Glove sequence', b: 'Hand hygiene → put on gloves → patient care → remove gloves → hand hygiene.' },
    { sec: 's7', f: 'Why gloves are not enough', b: 'Tiny holes; contamination during removal; warm moist glove lets bacteria multiply. WHO IB: gloves do not reduce the need for HH.' },
    { sec: 's8', f: 'WHO five moments', b: 'Before patient · before clean/aseptic procedure · after body-fluid risk · after patient · after patient surroundings.' },
    { sec: 's8', f: 'Compliance is lower…', b: 'Before contact (vs after), with more opportunities/hour, at night, among physicians, after a clean task.' }
  ]
};
