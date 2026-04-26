## Plan: True Star Wars Perspective for Creation Crawl Slide

The current "Пролог" slide in the "Сотворение мира" presentation has two problems visible in the screenshot:

1. **No real perspective** — text reads almost flat because the perspective viewport is too short (`perspective: 400px` on a small inner container) and the text's recession isn't tied to the tilt.
2. **Text flies off the top** — the animation translates the `bottom` CSS property, so the text travels off the top of the viewport instead of receding into the distance and dissolving.
3. Text could be **larger** for the cinematic feel.

### Root cause
The current implementation rotates the text plane by `rotateX(20deg)` but animates it via the `bottom` property, which moves the entire (already-tilted) plane straight up the screen. There's no sense of depth because the perspective container is constrained to `80vh` with very mild perspective and the text isn't translating along the tilted plane.

### Fix
Rewrite `src/components/CreationCrawlSlide.tsx` to use the proven Star Wars technique used in `StoryImageSlide` / `index.css`:

| Aspect | Before | After |
|--------|--------|-------|
| Perspective container | 80vh inner box, `perspective: 400px` | Full-screen viewport, `perspective: 300px`, `perspective-origin: 50% 100%` (viewer at bottom) |
| Tilt | `rotateX(20deg)` | `rotateX(25deg)` (stronger recession) |
| Animation | `bottom: -80% → 120%` | `transform: translateY(0) → translateY(-260%)` along the **already-tilted plane** — so text physically recedes into the distance |
| Text size | `text-3xl md:text-4xl` | `clamp(2.5rem, 5vw, 5rem)` — much larger, scales with viewport |
| Top fade | Hard `h-32` black gradient | Tall (55% of height) gradient that simulates atmospheric dissolve at the vanishing point |
| Duration | 35s | 60s (matches longer perceived travel; slower = more cinematic) |
| Stars | 120 dots | 160 dots, slightly brighter |
| Glow | none | Subtle amber `text-shadow` for cinematic feel |

### Key technical insight
By translating the plane along its own Y axis **after** the `rotateX` transform (in the same `transform` chain), the upward translation happens along the tilted plane, which the perspective camera then projects as movement *away from the viewer*. This is what produces the genuine "receding into the stars" effect, instead of the current flat upward scroll.

### Files to edit
| File | Change |
|------|--------|
| `src/components/CreationCrawlSlide.tsx` | Full rewrite of the perspective container, animation keyframes, and text sizing |

No data, asset, or other component changes needed.
