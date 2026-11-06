# Little Gabriel: AI 3D character plan

Researched November 2026. Goal: a small 3D figure that looks like Gabriel, with animations for
every scene, made by AI, with no 3D skills and no hired artist.

## The split

| Step | Who | Tool | Time |
|---|---|---|---|
| 1. Character design sheet | Gabriel | ChatGPT image generation (paste the prompt below + 3–4 photos) | ~10 min |
| 2. Image → rigged 3D model | Gabriel | **Tripo** (first choice) or **Meshy** | ~10 min |
| 3. Animation clips | Gabriel | **Mixamo** (free, Adobe ID) | ~10 min |
| 4. Clean-up, style, retarget, bake, compress | Claude | Blender 5.2 running headless in this environment (`bpy`), gltf-transform | — |
| 5. Into the site | Claude | three.js AnimationMixer, crossfades per scene | — |

Gabriel never opens Blender. Everything after the downloads happens in code.

## Why these tools

- **Tripo vs Meshy.** Both turn images into a 3D model, auto-rig it and export GLB/FBX.
  An independent 2026 stress test found Tripo gives the cleanest geometry and leads on
  multi-view input; Meshy leads on single-image textures. So: multi-view sheet → Tripo first;
  if the likeness or texture is weak, run the single front view through Meshy.
  Free tiers exist (Meshy: 100 credits/month, free models are CC BY 4.0; Tripo also has free
  monthly credits). Free-tier licences may need a credit line in the footer; a one-month paid
  plan (~$20) gives a private licence if wanted.
- **Mixamo** is still free and royalty-free in 2026 (unmaintained, humanoids only). It has the
  everyday clips we need. Meshy also has a large preset library if Mixamo misbehaves.
- **Blender + AI agents (Blender MCP, Claude/ChatGPT connectors).** Real and useful in 2026,
  but reviews say they are strongest at staged scenes and props and weak at organic characters
  and animation timing. We don't need the MCP route: Claude can run Blender directly here.
- **Open-source (Hunyuan3D 2.1/3.x, Microsoft TRELLIS.2).** Good models, but no rigging and
  heavy GPU needs or research-only terms. Not worth it for this.

## Environments

Keep the code-built contour dioramas. They are light, match the paper/map style, and change
with the Design lab palette. AI-generated scenes would be heavy and clash. Props (surfboard,
guitar, tent, llama, desk) can be AI-generated in Tripo/Meshy later and restyled by Claude.

## Step 1: prompt for ChatGPT

Attach 3–4 clear photos (face front, face three-quarter, full body). Then paste:

> Using these photos of me as reference, design a small stylized 3D collectible figure of me,
> like a matte vinyl toy or clay figurine. Simple, rounded shapes, slightly big head (about a
> quarter of the body height), no tiny details. Keep my likeness: my hair, my short beard, my
> face shape, my glasses. Outfit: plain cream knit sweater, dark navy trousers, white sneakers.
> Pose: neutral A-pose, arms straight and angled about 45 degrees away from the body, legs
> slightly apart, facing forward, calm friendly expression, mouth closed.
> Make a character turnaround sheet: front, left side, back and three-quarter views, side by
> side, same scale, orthographic, even soft studio light, no shadows, plain light grey
> background, no text, no props.

Then ask for one more image: "Now only the front view, full body, centred, same style."

## Step 2: Tripo (or Meshy)

1. New → Multi-view to 3D → upload front / side / back crops (or the single front image).
2. Generate. If the face is off, regenerate once or try Meshy with the front view.
3. Rig → Humanoid / Auto-rig.
4. Export **GLB**, T-pose or A-pose, with textures. Send it over.

## Step 3: Mixamo clips

Upload the rigged model (or the FBX from Tripo). Download each clip as FBX, "without skin",
30 fps. Search terms: Typing · Sitting Idle · Waving · Walking · Guitar Playing (sitting) ·
Idle · Pointing / Looking Around · Jumping (for hops between scenes).
Surf and snowboard stances, the summit arm-sweep and kettlebell swing: Claude keyframes these
in Blender from the existing pose code if Mixamo has no match.

## Step 4: what Claude does with the files

1. Import GLB + clips in headless Blender, retarget all clips onto one skeleton.
2. Reduce polygons (target < 15k tris), shrink textures (1024px), toon material + ink outline.
3. Bake into one GLB with named animations; compress with gltf-transform (meshopt).
4. Outfits per scene (wetsuit, ski jacket, hiking gear) as texture swaps; props as separate
   objects shown only in their scene.
5. Replace the capsule figure in `js/app.js`; crossfade clips when scenes change.
