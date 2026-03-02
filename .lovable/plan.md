

## Plan: Generate 4 Images as Static Assets

### Approach
Use the `google/gemini-3-pro-image-preview` model via an edge function to generate 4 images, then save them directly as static files in `src/assets/`, exactly like all existing images in the project.

### Steps

#### 1. Create edge function `generate-seminar-images`
A one-time edge function that generates 4 images using Lovable AI and returns them as base64.

**Prompts:**

| Filename | Prompt |
|----------|--------|
| `summer-seminar-thumbnail.png` | "A dramatic cosmic scene: a path of golden light leading through stars and galaxies toward a radiant cross, symbolizing faith as the bridge between creation and God. Rich deep blues, golds, warm light. Cinematic, photorealistic, 16:9, no text." |
| `fine-tuned-universe-thumbnail.png` | "Earth from space with the Moon perfectly aligned between Earth and the Sun showing precise cosmic proportions. Ocean tides visible on Earth. Deep space background with stars. Scientific, awe-inspiring, photorealistic, 16:9, no text." |
| `sin-thumbnail.png` | "A person standing alone in a vast dark abyss, heavy broken chains on the ground, atmosphere of isolation and weight. Dark reds and blacks with faint distant light above. Painterly, cinematic, 16:9, no text." |
| `salvation-way-thumbnail.png` | "A majestic figure of Christ on a throne of brilliant golden light, arms open wide, rays of light piercing through storm clouds. Overwhelming glory and power. Golds, whites, royal purples. Cinematic, photorealistic, 16:9, no text." |

#### 2. Create temporary page to trigger generation and save images
A `/generate-images` page that:
- Calls the edge function to generate all 4 images
- Receives base64 data
- Saves each as a static file in `src/assets/`

#### 3. Save 4 image files to `src/assets/`
Write the generated images directly as PNG files.

#### 4. Update data files with new imports
- `src/data/fine-tuned-universe.ts` — import `fine-tuned-universe-thumbnail.png`
- `src/data/sin.ts` — import `sin-thumbnail.png`
- `src/data/salvation-new.ts` — import `salvation-way-thumbnail.png`
- `src/data/collections.ts` — import `summer-seminar-thumbnail.png`
- `src/data/presentations.ts` — update thumbnail references

#### 5. Clean up
Remove the temporary `/generate-images` route and page after images are saved.

### Files

| File | Action |
|------|--------|
| `supabase/functions/generate-seminar-images/index.ts` | **Create** — AI image generation |
| `src/pages/GenerateImages.tsx` | **Create** (temporary) |
| `src/App.tsx` | **Edit** — add temp route |
| `src/assets/summer-seminar-thumbnail.png` | **Create** — generated image |
| `src/assets/fine-tuned-universe-thumbnail.png` | **Create** — generated image |
| `src/assets/sin-thumbnail.png` | **Create** — generated image |
| `src/assets/salvation-way-thumbnail.png` | **Create** — generated image |
| `src/data/fine-tuned-universe.ts` | **Edit** — new import |
| `src/data/sin.ts` | **Edit** — new import |
| `src/data/salvation-new.ts` | **Edit** — new import |
| `src/data/presentations.ts` | **Edit** — thumbnail refs |
| `src/data/collections.ts` | **Edit** — collection thumbnail |

