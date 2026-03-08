

## Plan: Add Background Images to Creation Day Slides

Add full-screen background images to each of the 6 creation day title slides, using existing generated assets.

### Image Mapping

| Day | Image Asset | Already exists? |
|-----|------------|-----------------|
| 1 — Свет | `creation-day1-light.png` | Yes |
| 2 — Твердь | `creation-day2-firmament.png` | Yes |
| 3 — Суша и растения | `creation-day3-land.png` | Yes |
| 4 — Солнце, луна, звёзды | `creation-day4-stars.png` | Yes |
| 5 — Рыбы и птицы | `creation-day5-sea.png` | Yes |
| 6 — Животные и человек | `creation-adam-eve.png` | Yes |

### Files to Edit

| File | Change |
|------|--------|
| `src/data/creation.ts` | Add optional `image` field to `CreationDaySlide` interface; add image imports to each of the 6 day slides |
| `src/components/CreationDaySlide.tsx` | Add full-screen background image layer (behind gradient overlay), with Ken Burns zoom animation; keep gradient as semi-transparent overlay on top |

No new images needed — all 6 assets already exist.

