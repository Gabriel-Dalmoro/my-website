# Redesign discovery notes

Running record of what we've learned. Updated as answers come in.

## Audience
- Primary now: future clients, collaborators, possible future employers, network.
- Later: adventure / personal brand audience, brand partnerships, sponsored content.
- Not for: chefs (the chef SaaS gets its own site).
- Tone: professional first, but not mostly professional. Must feel like Gabriel, not a portfolio template.
- Primary action: not decided yet. Starts professional.

## Languages (site)
- Site launches in English and French.

## Languages (Gabriel)
- English: native / fully fluent
- Portuguese: native / fully fluent
- Spanish: professional
- French: professional (not fluent)
- German: complete beginner, learning now
- Italian: next (zero for now)

## Projects to show
- Elisa Batch Cooking — elisabatchcooking.com (girlfriend; private chef in Annecy; live, with automations)
- Sabrina Carlier — sabrinacarlier.fr (mother-in-law; sommelière, radio, trainer, Lyon)
- Lantern Clinic: first automation client (real work, not the demo page)
- Chef SaaS (later, once ready)
- NOT the clinic demo pages

## Round 1 feedback
- Needs much better composition, flow between sections, and overall beauty.
- Likes from A: cartographic / map feel, the elegant italic "handwritten" serif.
- Likes from C: the idea of a little version of Gabriel doing different things as you scroll. Must be fun and interactive but fit the site's design.
- Dislikes from C: the island execution. Too game-like, gimmicky.

## Photos received (batch 1–2)
1. Café desk: laptop + iPad second screen, coffee, breakfast bowl
2. Coworking (Uncommon): same laptop + iPad + JLab keyboard rig
3. Gabriel (seated, beard, cardigan) helping someone at a laptop. Candid, natural light.
4. Office desk: laptop, monitor, iPad, chimarrão gourd, light lamp, Notion task list
5. Surfing at golden hour, cliffs behind, glassy green wave (Gabriel)
6. Summit selfie, Canadian Rockies, arm sweeping toward the range
7. Snowboarding selfie-stick shot, Canadian Rockies
8. Ridge hike selfie, Brazilian coast at sunset, same arm sweep
9. Surfing, turquoise water, jungle hill
10. Snowboarder with arms wide above an Alpine valley

## Signatures noticed
- The "look at this" open-arm sweep shows up on summits (photos 6, 8). Candidate pose for the avatar.
- The work rig: laptop + iPad as second screen + vertical mouse + black keyboard.
- Chimarrão, Brazil flag sticker, Garmin watch, breakfast bowls.
- Photo palette: alpine blue, snow white, Atlantic-forest green, turquoise sea, golden-hour light.
- New facet: snowboarding (Rockies and the Alps).

## Three words
creative · adventurous · multipotentialite

## Photos received (batch 3)
11. Piano + Telecaster at home
12. Acoustic guitar on the porch, cowboy hat
13. Telecaster, glasses, gold chain
14. Gym mirror selfie
15. Machu Picchu selfie

Photos are saved in design/photos/ (permission given).

## From the journals (kept out of the repo)
- Writes by hand (Supernote) and in Notion; mixes PT/EN/ES.
- Entry format: date + place header; "Aprendizados" (lessons) after each stretch; monthly retros.
- Signature divider drawn between entries: —— // ——
- Systems thinker in life: habit tiers, ideal-day schedule, budgets, pros/cons lists.
- 260-day route: Calgary → Colombia → Ecuador → Peru → Bolivia → Chile → Brazil → Annecy.
- Career thesis (Dec 2024): tech + people/communication + money.
- Learned salsa and Spanish on the road (handwritten grammar notes).
- Private journal content stays off the site. The journal shapes tone and structure only.

## Round 2 answers
- Biggest wave: 2.3 m (Santinho, Florianópolis).
- Extra project to show: FITtoExcel (fittoexcel.com), fitness-tech startup Gabriel is helping his dad launch in Canada.
- Chef SaaS grew out of automating Elisa's business; they build it together. OK to say publicly.
- Do NOT name the city he lives in. Say "France".
- Faith: small touches only, never front and center.
- Diving: leave out for now.
- Handwriting: Gabriel will fill in the sample sheet (design/handwriting/handwriting-sheet.pdf).

## Round 2 prototype
- design/prototype/index.html (standalone page, not wired into Next.js yet).
- Handwriting crops from the journal: place names, the // divider, Spanish notes, a blessing line.
- 3D: layered-paper topographic model; little Gabriel moves through 9 scenes.

## Still open
- Lantern Clinic details (what was built, results, OK to name?).
- Avatar style sign-off.

## Round 3
- Feedback: balance journal (paper, handwriting) with atlas (map, route). Use the // divider more.
  Map should be the main stage for the route; draw the route on scroll; 3D character on top.
  Smoother 3D (no pixel steps), better animation. Mum gave him music; dad gave him training.
  Route order: Brazil → Calgary → South America → France. Add a short "what this site is" note.
  Languages: flags / real paper. Footer: "bênção." on its own centered line.
  Brand must last: explore type, colour and paper; be able to switch between options.
- Built: design/prototype/round3.html (Design lab: 6 type systems, 6 palettes, 4 papers, 7 presets).
- Handwriting sheet received (vector export used: clean ink layer).
  Font "Gabriel Hand" built from it: design/handwriting/font/ (102 glyphs, no "&" or "¡").
  Phrase crops in design/prototype/assets/hand/g/.

## Round 4
- Feedback: keep the Design lab for comparing. Map labels pixelate on zoom. Character always carried
  guitar + kettlebell. Split the site into pages (like sabrinacarlier.fr) so an automation lead lands on
  a focused page. Handwritten nav looked childish. Languages page: loved.
- Built: design/site/ (multi-page; edit src/ then run build.py).
  Pages: Home (index), Studio (automation, no personal content), Work, Journey (3D atlas), About (story,
  parents, languages), Contact (form; #studio/#brand/#hire/#collab/#hi preselect the topic).
- Map is now vector (world-atlas 50m) with DOM labels: crisp at any zoom.
- Studio uses the real testimonials from the current site (Zach Hodder / Harpia, Elisa Curtelin).
- Open: 3D character from AI (see options in chat), Lantern Clinic details.
