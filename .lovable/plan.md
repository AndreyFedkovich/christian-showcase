

## Plan: Custom Card Designs for Creation Slide Types

Currently, `creation-day`, `creation-crawl`, and `creation-diagram` all fall through to the generic gradient+icon card. Each deserves a unique visual treatment.

### 1. `creation-day` — Full-bleed image card with giant day number

- Background: the slide's `image` field (already set per day)
- Gradient overlay: cosmic dark-to-transparent
- Giant translucent day number centered (e.g. "1") as visual anchor
- Badge: "День" with Sun icon
- Title at bottom: "День 1: Свет"
- Similar pattern to `drama-image` cards but with the big number overlay

### 2. `creation-crawl` — Starfield card with perspective text preview

- Black background with CSS starfield dots (tiny white dots scattered via pseudo-elements or inline)
- Faint perspective-transformed text preview (first 2-3 lines from `lines[]`, styled with CSS perspective like the actual slide)
- Badge: "Пролог" with Star icon
- Title at bottom: reference text

### 3. `creation-diagram` — Chart preview card

- Dark gradient background (slate)
- Mini horizontal bar preview: render 3-4 thin colored bars (green for pre-flood, amber for post-flood) as simple divs
- Badge: "Диаграмма" with BarChart3 icon
- Title at bottom

### Files to Edit

| File | Change |
|------|--------|
| `src/components/SlideCardRenderer.tsx` | Add `getSlideImage()` case for `creation-day`; add 3 dedicated card render blocks before the generic fallback |

