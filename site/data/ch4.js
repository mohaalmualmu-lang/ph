// Unit 4 — source: "EMS313 Ch04(1).pdf" (Cleaning, Disinfection, and Sterilization; 32 slides)
export default {
  id: 'ch4', n: 4,
  title: 'Cleaning, Disinfection & Sterilization',
  ar: 'التنظيف والتطهير والتعقيم',
  file: 'EMS313 Ch04(1).pdf',
  sections: [
    {
      id: 's1', title: 'Key definitions', src: 'Slides 3–6',
      blocks: [
        { t: 'p', x: 'Used equipment can carry pathogens to the next patient, and hands move pathogens between equipment and people. **Cleaning removes contamination. Disinfection kills remaining susceptible organisms.** Include stretcher rails, monitor controls, cables and door handles.' },
        { t: 'table', cap: 'Key definitions (don\'t mix them up)', quiz: true, head: ['Term', 'Meaning', 'Example'], rows: [
          ['{cleaning|Cleaning}', 'Removes soil and many microorganisms by **physical action**', 'Detergent and friction'],
          ['{disinfection|Disinfection}', 'Destroys many or all pathogens, **usually excluding bacterial spores**', 'Approved surface disinfectant'],
          ['{sterilization|Sterilization}', 'Destroys **all microbial life, including bacterial spores**', 'Validated steam cycle'],
          ['{decontamination|Decontamination}', 'Makes an item **safe to handle, use, or discard**', 'A combination of appropriate methods']] },
        { t: 'note', k: 'key', x: 'The required method depends on **how the item will be used**.' },
        { t: 'table', cap: 'Antiseptic vs disinfectant', quiz: true, head: ['Agent', 'Where it is used', 'Example'], rows: [
          ['{antiseptic|Antiseptic}', 'Living tissue, especially skin', 'A skin preparation before IV insertion'],
          ['{disinfectant|Disinfectant}', 'Equipment and environmental surfaces', 'A product for a stretcher or monitor']] },
        { t: 'p', x: 'The chemical name alone does not tell you the correct use. **Check the product label.**' },
        { t: 'table', cap: 'Microorganisms and disinfectant terms', quiz: true, head: ['Term', 'Simple meaning'], rows: [
          ['{vegetative|Vegetative bacteria}', 'Bacteria in their growing, active form'],
          ['{spore|Bacterial spore}', 'A resistant survival form produced by some bacteria'],
          ['Bactericidal / virucidal / fungicidal', 'Kills bacteria / viruses / fungi'],
          ['{tuberculocidal|Tuberculocidal}', 'Kills Mycobacterium tuberculosis under the stated conditions'],
          ['{sporicidal|Sporicidal}', 'Kills bacterial spores under the stated conditions']] },
        { t: 'note', k: 'warn', x: 'A product that kills ordinary bacteria **may still leave bacterial spores**.' }
      ],
      recall: [
        { q: 'Disinfection vs sterilization: what is the difference?', a: 'Disinfection destroys many or all pathogens, usually NOT bacterial spores. Sterilization destroys all microbial life including spores.' },
        { q: 'Define decontamination.', a: 'Makes an item safe to handle, use, or discard (a combination of appropriate methods).' },
        { q: 'Antiseptic vs disinfectant?', a: 'Antiseptic: living tissue/skin (skin prep before IV). Disinfectant: equipment and surfaces (stretcher, monitor).' }
      ]
    },
    {
      id: 's2', title: 'Spaulding classification', src: 'Slides 7–10',
      blocks: [
        { t: 'svg', id: 'spaulding' },
        { t: 'table', cap: '{spaulding|Spaulding classification}', quiz: true, head: ['Item class', 'Body contact', 'Minimum processing', 'EMS example'], rows: [
          ['{critical|Critical}', 'Sterile tissue or the bloodstream', 'Must be sterile', 'Single-use IV cannula'],
          ['{semicritical|Semicritical}', 'Mucous membranes or non-intact skin', 'High-level disinfection', 'Reusable laryngoscope blade'],
          ['{noncritical|Noncritical}', 'Intact skin', 'Low-level disinfection', 'Blood-pressure cuff']] },
        { t: 'note', k: 'key', x: '**Clean reusable items before** the required disinfection or sterilization process.' },
        { t: 'twocol', a: { h: 'Critical items', items: ['Enter sterile tissue or the bloodstream', 'Examples: IV cannulas and intraosseous (IO) needles', 'Must be sterile before use', 'Check the sealed package, expiry date and single-use label', '**Discard single-use devices after use. Do not use a wet or damaged sterile package.**'] }, b: { h: 'Semicritical items', items: ['Contact mucous membranes or broken skin', 'Examples: reusable laryngoscope blades and some endoscopes', 'Clean first, then **at least high-level disinfection**', 'A surface wipe alone does not meet this requirement', 'Follow the blade\'s instructions; they may require sterilization'] } },
        { t: 'p', x: '**Noncritical items** contact intact skin: blood-pressure cuffs and stethoscopes. Clean and disinfect between patients as directed, with a compatible product and the **full labelled contact time**. Cuffs and stethoscopes usually need low-level disinfection; blood or specific pathogens may require a different disinfectant.' },
        { t: 'sort', id: 'c4-spaulding' }
      ],
      recall: [
        { q: 'Spaulding: three classes with body contact and minimum processing?', a: 'Critical: sterile tissue/bloodstream → sterile. Semicritical: mucous membranes/non-intact skin → high-level disinfection. Noncritical: intact skin → low-level disinfection.' },
        { q: 'EMS example for each Spaulding class?', a: 'Critical: single-use IV cannula (also IO needles). Semicritical: reusable laryngoscope blade. Noncritical: BP cuff (stethoscope).' },
        { q: 'Is a surface wipe enough for a laryngoscope blade?', a: 'No. Clean, then at least high-level disinfection (or sterilize if instructions require).' }
      ]
    },
    {
      id: 's3', title: 'Cleaning comes first', src: 'Slides 11–12',
      blocks: [
        { t: 'chain', items: ['Blood and tissue left on an item', 'Shield microorganisms + reduce disinfectant activity', 'Disinfectant cannot reach / works less', 'So clean first, promptly'] },
        { t: 'ul', items: ['Water, detergent and friction remove contamination.', '**Clean promptly**: dried material is harder to remove.', '**{enzymatic|Enzymatic cleaners}** help break down organic material. **Disinfection is still required.**', 'Brushing helps remove soil from instrument surfaces and joints.'] },
        { t: 'order', id: 'c4-clean' },
        { t: 'table', cap: 'Steps in cleaning reusable equipment', quiz: true, head: ['Step', 'What to do'], rows: [
          ['1. Preparation', 'Wear appropriate PPE. Separate dirty equipment from clean supplies'],
          ['2. Disassembly', 'Open joints and separate removable parts as the instructions allow'],
          ['3. Cleaning', 'Use the specified detergent and friction. Reach hinges and accessible channels'],
          ['4. Rinsing and inspection', 'Remove cleaning residue and check for remaining soil or damage'],
          ['5. Next stage', 'Proceed to the required disinfection or sterilization, then dry and store as directed']] }
      ],
      recall: [
        { q: 'Why must items be cleaned before disinfection?', a: 'Blood and tissue shield microorganisms, and organic material reduces disinfectant activity.' },
        { q: 'Five steps of cleaning reusable equipment?', a: 'Preparation → Disassembly → Cleaning → Rinsing and inspection → Next stage (disinfection/sterilization, dry, store).' },
        { q: 'Do enzymatic cleaners replace disinfection?', a: 'No. They help break down organic material; disinfection is still required.' }
      ]
    },
    {
      id: 's4', title: 'Levels of disinfection, contact time and choosing a product', src: 'Slides 13–15',
      blocks: [
        { t: 'table', cap: 'Levels of disinfection', quiz: true, head: ['Level', 'Expected action', 'Typical application'], rows: [
          ['{lld|Low-level}', 'Kills most vegetative bacteria, some fungi, and some viruses', 'Noncritical equipment'],
          ['{ild|Intermediate-level}', 'Also kills mycobacteria and most viruses and fungi. **Does not reliably kill spores**', 'Selected contaminated surfaces'],
          ['{hld|High-level}', 'Kills all microorganisms **except potentially large numbers of bacterial spores**', 'Semicritical equipment']] },
        { t: 'p', x: 'Sterilization destroys all microbial life, including spores, through a **validated process**.' },
        { t: 'h', x: '{contacttime|Contact time} for surface disinfection' },
        { t: 'ul', items: ['Read the product label before use.', 'Apply enough disinfectant to wet the required surface.', '**Keep it wet for the full labelled contact time.**', 'If it dries early, reapply as the label directs.', 'Example only: a 3-minute contact time means **3 full minutes of wet contact**.'] },
        { t: 'h', x: 'Selection of a disinfectant' },
        { t: 'ol', items: ['Identify the item class and the required level of disinfection.', 'Check the product\'s claims against the expected pathogen.', 'Confirm compatibility with the device material.', 'Follow the labelled dilution, contact time, temperature, and use-life.', 'Check required PPE, ventilation, rinsing, and storage.'] },
        { t: 'note', k: 'warn', x: 'A chemical name or a "**kills 99.9%**" claim does not establish suitability for every device.' }
      ],
      recall: [
        { q: 'Which disinfection level kills mycobacteria but does not reliably kill spores?', a: 'Intermediate-level.' },
        { q: 'High-level disinfection kills everything except…?', a: 'Potentially large numbers of bacterial spores.' },
        { q: 'What does a "3-minute contact time" mean?', a: '3 full minutes of wet contact; reapply if it dries early.' }
      ]
    },
    {
      id: 's5', title: 'Chemical agents', src: 'Slides 16–21',
      blocks: [
        { t: 'twocol', a: { h: 'Alcohols (ethanol, isopropyl)', items: ['Act rapidly against many bacteria, fungi and viruses', '**Do not kill bacterial spores**', 'Unsuitable for sterilization or high-level disinfection of a laryngoscope blade', 'Rapid evaporation can prevent adequate contact time', 'Repeated use may damage some plastics and rubber; flammable'] }, b: { h: 'Chlorine compounds', items: ['**Sodium hypochlorite** is the active ingredient in many bleach products', 'Appropriate formulations act against a broad range of microorganisms', 'Used for **blood spills** or specific pathogen contamination', 'Blood and organic material can reduce activity', 'Irritates skin and eyes, bleaches fabric, corrodes metal', '**Never mix bleach with acids, ammonia, or other cleaning chemicals**'] } },
        { t: 'h', x: '{quats|Quaternary ammonium compounds} ("quats")' },
        { t: 'ul', items: ['Occur in many products for **noncritical equipment and surfaces**.', 'Typical formulations act against **vegetative bacteria and enveloped viruses**.', 'Basic quats have **limited activity against spores, mycobacteria and many non-enveloped viruses**.', 'Combination products may have different claims. Check the label.', 'Enveloped viruses have an outer lipid layer; non-enveloped viruses often resist more agents.'] },
        { t: 'table', cap: 'Agents for high-level disinfection', quiz: true, head: ['Agent', 'Main role', 'Important limitation'], rows: [
          ['{glutaraldehyde|Glutaraldehyde}', 'High-level disinfection with correct exposure; active against mycobacteria', 'Can fix protein to equipment; irritating vapour'],
          ['{opa|Ortho-phthalaldehyde (OPA)}', 'High-level disinfection of compatible reusable devices', 'Can stain protein and irritate eyes; limited sporicidal activity'],
          ['{peracetic|Peracetic acid systems}', 'Controlled processing of compatible devices', 'Strong oxidizer; requires a validated system and cycle']] },
        { t: 'p', x: 'These agents require **trained staff, appropriate PPE, and the complete processing instructions**.' },
        { t: 'table', cap: 'Hydrogen peroxide formulations', quiz: true, head: ['Formulation', 'Use', 'Key point'], rows: [
          ['Hydrogen peroxide', 'Surface disinfection or high-level disinfection, depending on the product', 'Concentration and labelled conditions determine the level'],
          ['Improved / accelerated hydrogen peroxide', 'Formulations with additives that improve antimicrobial action', 'Claims and contact times vary by product']] },
        { t: 'note', k: 'warn', x: 'An ordinary household peroxide bottle **does not automatically qualify** as a high-level disinfectant.' },
        { t: 'table', cap: 'Other chemical agents', quiz: true, head: ['Agent', 'Main point', 'Limitation'], rows: [
          ['{formaldehyde|Formaldehyde}', 'An older disinfectant and chemical sterilant in specific applications', 'Hazardous fumes and carcinogenicity limit its healthcare use'],
          ['{iodophor|Iodophors}', 'Iodine combined with a carrier. Products exist for skin or surfaces', 'Skin and surface formulations are not interchangeable'],
          ['{phenolics|Phenolics}', 'Some products disinfect noncritical surfaces', 'Unsuitable for high-level disinfection. Special precautions around neonates']] },
        { t: 'sort', id: 'c4-agent' }
      ],
      recall: [
        { q: 'Why is alcohol unsuitable for a laryngoscope blade?', a: 'It does not kill spores, evaporates fast (short contact time); unsuitable for sterilization or HLD of a blade.' },
        { q: 'Active ingredient of bleach, and one safety rule?', a: 'Sodium hypochlorite. Never mix bleach with acids, ammonia or other cleaning chemicals.' },
        { q: 'Three high-level disinfection agents?', a: 'Glutaraldehyde, ortho-phthalaldehyde (OPA), peracetic acid systems.' },
        { q: 'What limits formaldehyde?', a: 'Hazardous fumes and carcinogenicity.' }
      ]
    },
    {
      id: 's6', title: 'Other methods, endoscopes and sterilization', src: 'Slides 22–26',
      blocks: [
        { t: 'table', cap: 'Other methods of microbial control', quiz: true, head: ['Method', 'How it works', 'Limitation'], rows: [
          ['Antimicrobial metals', 'Some metal ions inhibit or kill microorganisms', 'Specialized application. Does not replace routine processing'],
          ['{uvc|Ultraviolet C (UV-C)}', 'Controlled exposure can inactivate microorganisms', 'Shadows and soil reduce action. Equipment and dose matter'],
          ['{pasteurization|Pasteurization}', 'Hot-water treatment reduces microorganisms', '**Does not reliably destroy spores. It is not sterilization**']] },
        { t: 'p', x: 'Additional technologies do **not remove the need for the required cleaning process**.' },
        { t: 'h', x: 'Endoscopes and internal channels' },
        { t: 'ul', items: ['A **{lumen|lumen}** is a channel inside a device; blood, secretions and microorganisms can remain in it.', 'A **bronchoscope** contacts airway mucosa and needs **at least high-level disinfection**.', 'Scopes that enter **sterile tissue require sterilization**.', '**Cleaning must reach the channels.** Disinfecting only the outside is insufficient.'] },
        { t: 'h', x: 'Sterilization' },
        { t: 'ul', items: ['Destroys all forms of microbial life, including bacterial spores.', 'Critical reusable devices require a **validated** sterilization process.', '**Steam is preferred** for compatible items that tolerate heat and moisture.', 'Heat-sensitive devices need a compatible **low-temperature method**.', 'Safe packaging and storage protect the item after processing. A damaged or wet sterile package compromises safe use.'] },
        { t: 'p', x: '**{autoclave|Autoclave}**: uses **steam under pressure**; steam transfers heat and destroys microorganisms. Common cycles use **121°C or 132°C**; the required time varies. Steam must reach every item during the validated cycle. Follow the cycle specified for the device, packaging and load.' },
        { t: 'table', cap: 'Low-temperature sterilization', quiz: true, head: ['Method', 'Typical application', 'Key consideration'], rows: [
          ['{eto|Ethylene oxide (EtO)}', 'Compatible items that cannot tolerate steam', 'Toxic gas. Requires controlled processing and aeration'],
          ['Hydrogen peroxide vapour / gas plasma', 'Compatible heat-sensitive devices', 'Material and lumen restrictions vary by system'],
          ['Liquid chemical sterilant systems', 'Selected immersible devices under validated conditions', 'Rinsing and immediate-use requirements may limit storage']] },
        { t: 'p', x: 'Select the method from the **device\'s validated instructions**.' }
      ],
      recall: [
        { q: 'Autoclave: what does it use and at what temperatures?', a: 'Steam under pressure; common cycles 121°C or 132°C (time varies).' },
        { q: 'Which low-temperature sterilant is a toxic gas that needs aeration?', a: 'Ethylene oxide (EtO).' },
        { q: 'Is pasteurization sterilization?', a: 'No. Hot water reduces microorganisms but does not reliably destroy spores.' },
        { q: 'A bronchoscope needs at least…?', a: 'High-level disinfection (it contacts airway mucosa); cleaning must reach the channels.' }
      ]
    },
    {
      id: 's7', title: 'Why processing fails, safety and the EMS case', src: 'Slides 27–31',
      blocks: [
        { t: 'table', cap: 'Factors that reduce effectiveness', quiz: true, head: ['Factor', 'Why it matters'], rows: [
          ['Soil or a high microbial load', 'Material shields organisms and may consume the chemical'],
          ['Hinges, crevices, and lumens', 'The agent may not reach every contaminated surface'],
          ['Resistant organisms or {biofilm|biofilm}', 'Some organisms and protective layers resist the process'],
          ['Wrong concentration or expired solution', 'The product may no longer achieve its labelled effect'],
          ['Incorrect time, temperature, or pH', 'The process falls outside its validated working conditions']] },
        { t: 'h', x: 'Safe work practices' },
        { t: 'ul', items: ['Wear gloves and add gown, eye and face protection when splash exposure is likely.', 'Use ventilation required by the product and processing system.', 'Keep chemicals labelled and follow their **safety data sheets**.', '**Never mix chemicals or improvise concentrations.**', 'Separate dirty equipment from clean equipment, then perform hand hygiene.', 'Gloves for patient care may not provide adequate protection against every chemical.'] },
        { t: 'h', x: 'EMS case: after a patient transport' },
        { t: 'table', cap: 'Identify the class, choose the action, explain one failure', quiz: true, head: ['Item', 'Appropriate action', 'Common failure'], rows: [
          ['Reusable laryngoscope blade (secretions and dried blood around the hinge)', 'Clean the hinge and all surfaces. Apply at least high-level disinfection, or sterilize as instructed', 'Only wiping the visible surface'],
          ['Wet IV cannula package (unopened, lay in a pool of fluid)', 'Remove it from use and discard the compromised single-use device', 'Assuming a closed pack is still sterile'],
          ['BP cuff and stretcher (patient vomited)', 'Remove vomit. Use a compatible approved product with the necessary pathogen claim and full contact time', 'Wrong product or early drying']] },
        { t: 'note', k: 'key', x: '**Critical: sterile. Semicritical: at least high-level disinfection. Noncritical: usually low-level disinfection.** Follow device instructions, the product label and the service\'s infection-control procedure.' }
      ],
      recall: [
        { q: 'Name five factors that reduce effectiveness of disinfection/sterilization.', a: 'Soil/high microbial load · hinges, crevices, lumens · resistant organisms/biofilm · wrong concentration/expired · incorrect time, temperature or pH.' },
        { q: 'A sealed IV cannula package is wet. What do you do?', a: 'Remove it from use and discard it. A wet package is no longer sterile.' },
        { q: 'Common failure when processing a laryngoscope blade?', a: 'Only wiping the visible surface (hinge not cleaned; no HLD).' }
      ]
    }
  ],

  orders: [
    { id: 'c4-clean', sec: 's3', src: 'Slide 12', title: 'Steps in cleaning reusable equipment', steps: ['Preparation: PPE, separate dirty from clean', 'Disassembly: open joints, separate parts', 'Cleaning: detergent and friction, hinges and channels', 'Rinsing and inspection', 'Next stage: disinfection or sterilization, then dry and store'] }
  ],
  sorts: [
    { id: 'c4-spaulding', sec: 's2', src: 'Slides 7–10, 23', title: 'Spaulding class for each item', cats: ['Critical', 'Semicritical', 'Noncritical'],
      items: [['Single-use IV cannula', 0], ['Intraosseous (IO) needle', 0], ['Reusable laryngoscope blade', 1], ['Bronchoscope (airway mucosa)', 1], ['Blood-pressure cuff', 2], ['Stethoscope', 2], ['Scope that enters sterile tissue', 0], ['Item that contacts non-intact skin', 1]] },
    { id: 'c4-agent', sec: 's5', src: 'Slides 16–21', title: 'Match the agent to its main use/limit', cats: ['High-level disinfection', 'Surfaces / noncritical', 'Limited by fumes / toxicity'],
      items: [['Glutaraldehyde', 0], ['Ortho-phthalaldehyde (OPA)', 0], ['Peracetic acid system', 0], ['Quaternary ammonium compounds', 1], ['Phenolics', 1], ['Formaldehyde', 2]] }
  ],

  questions: [
    { id: 'c4q1', sec: 's1', q: 'Which process destroys ALL microbial life, including bacterial spores?', o: ['Sterilization', 'Disinfection', 'Cleaning', 'Decontamination'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c4q2', sec: 's1', q: 'Disinfection destroys many or all pathogens, usually EXCLUDING:', o: ['Bacterial spores', 'Enveloped viruses', 'Vegetative bacteria', 'Fungi'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c4q3', sec: 's1', q: 'Cleaning removes soil and many microorganisms by:', o: ['Physical action (detergent and friction)', 'A validated steam cycle under pressure at 121°C', 'Chemical killing of spores', 'Ultraviolet exposure'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c4q4', sec: 's1', q: '"Makes an item safe to handle, use, or discard" defines:', o: ['Decontamination', 'Sterilization', 'Antisepsis', 'Pasteurization'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c4q5', sec: 's1', q: 'A skin preparation before IV insertion is an example of:', o: ['An antiseptic', 'A disinfectant', 'A sterilant', 'A detergent'], x: 'Slide 5: antiseptic = living tissue.', src: 'Slide 5' },
    { id: 'c4q6', sec: 's1', q: '"Tuberculocidal" means the product:', o: ['Kills Mycobacterium tuberculosis under the stated conditions', 'Kills bacterial spores', 'Kills all viruses', 'Prevents TB from spreading through the air in the ambulance compartment'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c4q7', sec: 's1', q: 'A bacterial spore is:', o: ['A resistant survival form produced by some bacteria', 'Bacteria in their growing, active form, easily killed by alcohol', 'A virus without an envelope', 'A fungal cell wall'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c4q8', sec: 's2', q: 'In the Spaulding classification, a reusable laryngoscope blade is:', o: ['Semicritical: at least high-level disinfection', 'Critical: must be sterile', 'Noncritical: low-level disinfection', 'Single-use only'], x: 'Slides 7, 9.', src: 'Slides 7, 9' },
    { id: 'c4q9', sec: 's2', q: 'Items that enter sterile tissue or the bloodstream are:', o: ['Critical', 'Semicritical', 'Noncritical', 'Environmental'], x: 'Slide 7.', src: 'Slide 7' },
    { id: 'c4q10', sec: 's2', q: 'A blood-pressure cuff is a ______ item requiring ______.', o: ['Noncritical; low-level disinfection', 'Semicritical; high-level disinfection', 'Critical; sterilization', 'Noncritical; sterilization'], x: 'Slides 7, 10.', src: 'Slides 7, 10' },
    { id: 'c4q11', sec: 's2', q: 'Semicritical items contact:', o: ['Mucous membranes or non-intact skin', 'Intact skin only', 'Sterile tissue or the bloodstream', 'Environmental surfaces only'], x: 'Slide 7.', src: 'Slide 7' },
    { id: 'c4q12', sec: 's2', q: 'Which is an example of a critical item?', o: ['Intraosseous (IO) needle', 'Stethoscope', 'Laryngoscope blade', 'Stretcher rail'], x: 'Slide 8: IV cannulas and IO needles.', src: 'Slide 8' },
    { id: 'c4q13', sec: 's2', q: 'Before using a critical item, you should check:', o: ['Sealed package, expiry date and single-use label', 'Only the colour of the package', 'That it was wiped with a surface disinfectant for the full contact time', 'The contact time of the disinfectant'], x: 'Slide 8.', src: 'Slide 8' },
    { id: 'c4q14', sec: 's3', q: 'Why must reusable items be cleaned before disinfection?', o: ['Blood and tissue shield microorganisms and reduce disinfectant activity', 'Cleaning sterilizes the item', 'Disinfectants only work on wet items', 'Cleaning shortens the disinfectant contact time required by the label to zero'], x: 'Slides 7, 11.', src: 'Slide 11' },
    { id: 'c4q15', sec: 's3', q: 'Enzymatic cleaners:', o: ['Help break down organic material, but disinfection is still required', 'Replace the need for disinfection because they remove all organic material', 'Sterilize heat-sensitive devices', 'Are used only on intact skin'], x: 'Slide 11.', src: 'Slide 11' },
    { id: 'c4q16', sec: 's3', q: 'In cleaning reusable equipment, which step comes right after disassembly?', o: ['Cleaning with detergent and friction', 'Rinsing and inspection', 'Preparation and PPE', 'Sterilization'], x: 'Slide 12: preparation → disassembly → cleaning → rinsing/inspection → next stage.', src: 'Slide 12' },
    { id: 'c4q17', sec: 's3', q: 'Why clean promptly after use?', o: ['Dried material is harder to remove', 'Disinfectants expire within minutes', 'Spores multiply only when dry', 'Steam cannot reach wet items'], x: 'Slide 11.', src: 'Slide 11' },
    { id: 'c4q18', sec: 's4', q: 'Which disinfection level kills mycobacteria but does NOT reliably kill spores?', o: ['Intermediate-level', 'Low-level', 'High-level', 'Sterilization'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c4q19', sec: 's4', q: 'High-level disinfection kills all microorganisms except:', o: ['Potentially large numbers of bacterial spores', 'Enveloped viruses such as influenza, HIV and herpes simplex', 'Mycobacteria', 'Vegetative bacteria'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c4q20', sec: 's4', q: 'Low-level disinfection is typically used for:', o: ['Noncritical equipment', 'Semicritical equipment', 'Critical equipment', 'Sterile tissue'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c4q21', sec: 's4', q: 'A disinfectant has a 3-minute contact time, but the surface dries after 1 minute. You should:', o: ['Reapply as the label directs to keep it wet for 3 minutes', 'Accept it, because one application is enough whatever the label says', 'Wipe it dry immediately', 'Switch to plain water'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c4q22', sec: 's4', q: 'Which is the FIRST step when selecting a disinfectant?', o: ['Identify the item class and required level of disinfection', 'Choose the cheapest product', 'Choose any product whose label says it "kills 99.9%" of germs', 'Check the colour of the product'], x: 'Slide 15.', src: 'Slide 15' },
    { id: 'c4q23', sec: 's5', q: 'Which statement about alcohols as disinfectants is correct?', o: ['They do not kill bacterial spores', 'They are suitable for sterilizing laryngoscope blades', 'They provide long contact time because they evaporate slowly', 'They protect plastics and rubber'], x: 'Slide 16.', src: 'Slide 16' },
    { id: 'c4q24', sec: 's5', q: 'The active ingredient in many bleach products is:', o: ['Sodium hypochlorite', 'Glutaraldehyde', 'Isopropyl alcohol', 'Ortho-phthalaldehyde'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c4q25', sec: 's5', q: 'Which is a safety rule for chlorine compounds?', o: ['Never mix bleach with acids or ammonia', 'Always mix bleach with ammonia for strength', 'Bleach is safe on all metals', 'Bleach works better in blood'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c4q26', sec: 's5', q: 'Typical quaternary ammonium formulations act against:', o: ['Vegetative bacteria and enveloped viruses', 'Bacterial spores and mycobacteria', 'Non-enveloped viruses only', 'All microorganisms including spores'], x: 'Slide 18.', src: 'Slide 18' },
    { id: 'c4q27', sec: 's5', q: 'Which high-level disinfectant can fix protein to equipment and has an irritating vapour?', o: ['Glutaraldehyde', 'Peracetic acid', 'Ortho-phthalaldehyde (OPA)', 'Hydrogen peroxide'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c4q28', sec: 's5', q: 'Which agent is a strong oxidizer requiring a validated system and cycle?', o: ['Peracetic acid systems', 'Glutaraldehyde', 'Phenolics', 'Quats'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c4q29', sec: 's5', q: 'Ortho-phthalaldehyde (OPA) has which limitation?', o: ['Can stain protein, irritate eyes; limited sporicidal activity', 'Can fix protein to equipment and gives off an irritating vapour', 'Toxic gas requiring aeration', 'Unsuitable around neonates'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c4q30', sec: 's5', q: 'Which agent is unsuitable for high-level disinfection and needs special precautions around neonates?', o: ['Phenolics', 'Glutaraldehyde', 'Peracetic acid', 'Ortho-phthalaldehyde'], x: 'Slide 21.', src: 'Slide 21' },
    { id: 'c4q31', sec: 's5', q: 'What limits formaldehyde\'s healthcare use?', o: ['Hazardous fumes and carcinogenicity', 'It cannot kill vegetative bacteria', 'It is inactivated by water', 'It is too expensive'], x: 'Slide 21.', src: 'Slide 21' },
    { id: 'c4q32', sec: 's5', q: 'Regarding hydrogen peroxide, which is correct?', o: ['Concentration and labelled conditions determine the level', 'A household bottle is always a high-level disinfectant', 'It is only used for skin antisepsis', 'All products have the same contact time'], x: 'Slide 20.', src: 'Slide 20' },
    { id: 'c4q33', sec: 's6', q: 'Pasteurization:', o: ['Reduces microorganisms but does not reliably destroy spores', 'Is a form of sterilization that destroys all spores with hot water', 'Uses ultraviolet light', 'Uses ethylene oxide gas'], x: 'Slide 22.', src: 'Slide 22' },
    { id: 'c4q34', sec: 's6', q: 'UV-C action is reduced by:', o: ['Shadows and soil', 'Steam and pressure', 'Detergent residue only', 'Room temperature'], x: 'Slide 22.', src: 'Slide 22' },
    { id: 'c4q35', sec: 's6', q: 'A bronchoscope contacts airway mucosa. It needs at least:', o: ['High-level disinfection', 'Low-level disinfection', 'Cleaning only', 'Intermediate-level disinfection'], x: 'Slide 23.', src: 'Slide 23' },
    { id: 'c4q36', sec: 's6', q: 'The preferred sterilization method for items that tolerate heat and moisture is:', o: ['Steam', 'Ethylene oxide', 'Hydrogen peroxide gas plasma', 'Liquid chemical sterilant'], x: 'Slide 24.', src: 'Slide 24' },
    { id: 'c4q37', sec: 's6', q: 'Common autoclave cycles use:', o: ['121°C or 132°C', '60°C or 95°C', '37°C or 50°C', '200°C or 250°C'], x: 'Slide 25.', src: 'Slide 25' },
    { id: 'c4q38', sec: 's6', q: 'Which low-temperature method is a toxic gas that requires aeration?', o: ['Ethylene oxide (EtO)', 'Hydrogen peroxide gas plasma', 'Liquid chemical sterilant', 'Steam'], x: 'Slide 26.', src: 'Slide 26' },
    { id: 'c4q39', sec: 's6', q: 'For devices with internal channels (lumens), which statement is correct?', o: ['Cleaning must reach the channels; disinfecting only the outside is insufficient', 'Wiping the outside is enough', 'Lumens never hold secretions', 'Lumens only need low-level disinfection, because secretions cannot enter internal channels'], x: 'Slide 23.', src: 'Slide 23' },
    { id: 'c4q40', sec: 's7', q: 'An unopened IV cannula package is wet after lying in a pool of fluid. What do you do?', o: ['Remove it from use and discard it', 'Use it because the package is still closed', 'Dry it and return it to stock', 'Wipe it with alcohol and use it'], x: 'Slides 8, 30: common failure = assuming a closed pack is still sterile.', src: 'Slides 8, 30' },
    { id: 'c4q41', sec: 's7', q: 'Which factor reduces effectiveness because "the agent may not reach every contaminated surface"?', o: ['Hinges, crevices and lumens', 'Wrong concentration', 'Incorrect pH', 'Expired solution'], x: 'Slide 27.', src: 'Slide 27' },
    { id: 'c4q42', sec: 's7', q: 'After a patient vomits on the stretcher and BP cuff, the common failure is:', o: ['Wrong product or early drying', 'Using too much contact time', 'Sterilizing the cuff', 'Discarding the stretcher'], x: 'Slide 30.', src: 'Slide 30' },
    { id: 'c4q43', sec: 's7', q: 'Which is a safe work practice when processing equipment?', o: ['Never mix chemicals or improvise concentrations', 'Patient-care gloves protect against every chemical', 'Store dirty and clean equipment together', 'Skip ventilation if the room is small'], x: 'Slide 28.', src: 'Slide 28' }
  ],

  cards: [
    { sec: 's1', f: 'Cleaning vs disinfection vs sterilization vs decontamination', b: 'Cleaning: removes soil (physical action). Disinfection: kills many/all pathogens, usually not spores. Sterilization: all life incl. spores. Decontamination: safe to handle/use/discard.' },
    { sec: 's1', f: 'Antiseptic vs disinfectant', b: 'Antiseptic: living tissue/skin (IV skin prep). Disinfectant: equipment/surfaces (stretcher, monitor).' },
    { sec: 's1', f: 'Vegetative bacteria vs bacterial spore', b: 'Vegetative: growing, active form. Spore: resistant survival form.' },
    { sec: 's1', f: 'Tuberculocidal / sporicidal', b: 'Kills M. tuberculosis / kills bacterial spores (under stated conditions).' },
    { sec: 's2', f: 'Spaulding: critical', b: 'Sterile tissue/bloodstream → must be sterile (single-use IV cannula, IO needle).' },
    { sec: 's2', f: 'Spaulding: semicritical', b: 'Mucous membranes / non-intact skin → at least high-level disinfection (laryngoscope blade).' },
    { sec: 's2', f: 'Spaulding: noncritical', b: 'Intact skin → low-level disinfection (BP cuff, stethoscope).' },
    { sec: 's3', f: 'Cleaning reusable equipment: 5 steps', b: 'Preparation → Disassembly → Cleaning → Rinsing & inspection → Next stage.' },
    { sec: 's4', f: 'Low / intermediate / high-level disinfection', b: 'Low: most vegetative bacteria, some fungi/viruses (noncritical). Intermediate: + mycobacteria, most viruses/fungi, not reliably spores. High: all except large numbers of spores (semicritical).' },
    { sec: 's4', f: 'Contact time', b: 'Keep the surface wet for the full labelled time; reapply if it dries early.' },
    { sec: 's5', f: 'Alcohols (disinfectant use)', b: 'Rapid; no spores; evaporate fast; damage plastics/rubber; flammable; not for blade HLD/sterilization.' },
    { sec: 's5', f: 'Chlorine (bleach)', b: 'Sodium hypochlorite; broad; blood spills; reduced by organic matter; irritates, bleaches, corrodes; never mix with acids/ammonia.' },
    { sec: 's5', f: 'Quats (disinfectant use)', b: 'Noncritical surfaces; vegetative bacteria + enveloped viruses; limited vs spores, mycobacteria, non-enveloped viruses.' },
    { sec: 's5', f: 'HLD agents and limits', b: 'Glutaraldehyde (fixes protein, vapour) · OPA (stains, eye irritation, limited sporicidal) · Peracetic acid (strong oxidizer, validated system).' },
    { sec: 's5', f: 'Formaldehyde / iodophors / phenolics', b: 'Formaldehyde: fumes, carcinogenic. Iodophors: iodine + carrier, skin vs surface not interchangeable. Phenolics: noncritical surfaces, not HLD, neonates.' },
    { sec: 's6', f: 'Autoclave', b: 'Steam under pressure, 121°C or 132°C; steam must reach every item; validated cycle.' },
    { sec: 's6', f: 'Low-temperature sterilization methods', b: 'EtO (toxic gas, aeration) · H₂O₂ vapour/gas plasma (material & lumen limits) · liquid chemical sterilant (immediate use).' },
    { sec: 's6', f: 'Pasteurization / UV-C / antimicrobial metals', b: 'Pasteurization: hot water, not sterilization. UV-C: shadows/soil reduce action. Metals: specialized, not routine.' },
    { sec: 's7', f: 'Factors that reduce effectiveness', b: 'Soil/high load · hinges, crevices, lumens · resistant organisms/biofilm · wrong concentration/expired · wrong time, temperature, pH.' }
  ]
};
