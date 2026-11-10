# The Story page — rethink (v2 plan, not built yet)

## Why we're changing it
The map journey reads like a travel game. The page should be a professional piece with
personality: show how each move in Gabriel's life built a skill he now brings to clients.
Travel is the backdrop, not the point.

## Who it's for
- **Primary:** people deciding whether to work with Gabriel. Founders and business owners
  (France, Switzerland, the Alps, international), possible collaborators and employers.
- **Their question:** "Can I trust this person with my business, and what makes him different?"
- **What they should leave with:** he's technical *and* business-minded, he adapts fast,
  he works across languages and cultures, and he builds things that last.
- **Secondary (later):** brands and partners for outdoor / fitness collaborations.

## The thesis
> **Every move added something to the toolkit.**

Each chapter = a place + a period + what it built in him. A small "toolkit" ledger grows as
you scroll: languages (PT → +EN → +ES → +FR → DE learning) and skills
(curiosity → business → engineering → adaptability → client work). By the last chapter the
toolkit is full, and it's exactly what a client hires.

## Chapters (5)

| # | Chapter | Period | What happened | What it gave me (toolkit) |
|---|---|---|---|---|
| 1 | **Roots — Brasil** | childhood | Born and raised in Brazil. Mom gave him music. | Portuguese · curiosity · creativity |
| 2 | **Building — Canada** | 13 years | Grew up in Calgary. Started his first businesses. Studied business and management. Three years as a full-stack developer. Dad gave him discipline and training. | English · business · engineering · discipline |
| 3 | **Learning by doing — South America** | 2024–25 | One chapter, not a trip log: a year on the road, working remotely, learning Spanish, surfing, being uncomfortable on purpose. | Spanish · adaptability · self-direction |
| 4 | **Europe — France & the Alps** | 2025– | Moved to France. Learned French, started German. Mountains every weekend. Launched his career in Europe. | French · German (learning) · international work |
| 5 | **Now — what I build** | today | The automation studio, the chef SaaS with Elisa, FITtoExcel with his dad. International clients. | Everything above, applied → CTA |

Copy rule: each chapter is 2–3 short sentences, one photo, then a "What it gave me" line.
No itinerary, no day counts, no city lists.

## Visual direction for the 3D
**Drop the map and the islands.** Replace them with a *figurine on a pedestal*: a clean
museum / product-shot look.

- One round plinth (matte, a stone or paper tone), soft studio light, a soft floor shadow.
- On it: little Gabriel plus **2–3 props max** per chapter. No terrain, no trees everywhere.
- Behind: a quiet flat backdrop that tints per chapter (Brazil warm green, Canada cold blue,
  South America sand, Alps white, Now the brand green). One flat silhouette at most
  (e.g. a mountain line).
- Props come from the same pipeline as the figure (Gemini image → TRELLIS → Claude cleans
  in Blender), all in the same matte toy style, so everything matches.

## Transitions
- **Not scroll-scrubbed.** When a new chapter's text crosses the middle of the screen,
  a short timed transition plays (~0.9 s). Scrolling only decides *which* chapter is shown.
  That removes the jitter and size jumps.
- **The turntable:** the plinth spins half a turn. While his back faces the camera, the props
  and backdrop swap and his animation cross-fades. He comes round in the new chapter.
- **Ledger:** the new language / skill chip drops into the toolkit at the same moment.
- Phones: same scene, camera close on him; toolkit shown as a single row of chips.

## Scenes and animations

| Chapter | Pose / animation | Props on the plinth | Have it? |
|---|---|---|---|
| Brasil | Playing guitar (sitting if Mixamo has it, else standing) | acoustic guitar, low stool, chimarrão | Standing guitar: yes |
| Canada | **Explaining** (talking, gesturing at a board) | small whiteboard with a chart, laptop, mountain silhouette | Need |
| South America | Walking in place with a backpack (or Looking Around) | backpack, surfboard leaning | Yes |
| Europe / Alps | Snowboard stance (the skateboarding clip) | snowboard, Alps silhouette | Yes |
| Now | Typing at the desk → Thumbs up when tapped | desk, laptop + iPad, chimarrão, plus one small item from each earlier chapter (guitar, backpack, snowboard) | Yes |
| Transitions | Idle while the turntable spins | — | Yes |
| Contact button | Sit to stand + Wave | — | Yes |

### Animations still to download (Mixamo, same settings as before, "Without Skin")
1. **Explaining** (or "Talking" / "Pointing") — Canada.
2. **Guitar Playing, sitting** — only if it exists; otherwise keep the standing one.
3. Optional: **Cheering** — a small win moment for launching the studio.

### Props to generate
guitar, stool, chimarrão, whiteboard, laptop, backpack, surfboard, snowboard, desk, plinth.
Same toy style as the figure. Claude does the cleanup and placement.

## Where it lives on the site
- Rename **Journey → "Story"** (or "How I got here") in the nav.
- Home keeps one line + link: "From Brazil to the Alps, via Canada. Here's how I got here."
- The Studio page links to it as proof: "Why clients trust me with their business."

## Open questions for Gabriel
1. University: which school, which degree, which years?
2. The businesses you started in Canada: what were they (one line each), and can we name them?
3. Years for each chapter (moved to Canada at what age; full-stack years; when you moved to France).
4. Any photo from Canada that shows the business / university side (graduation, a team, a stall)?
5. Are you OK naming the skills directly ("business", "engineering", "adaptability"), or should they be shown only through the story?
