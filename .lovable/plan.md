

## Plan: New Presentation "Сотворение мира" (Creation of the World)

A large-scale, drama-style presentation about the six days of creation — first in the Summer Seminar 2026 collection. ~35-40 slides across 6 sections with 3 new slide types, 10+ generated images, and a lifespan diagram.

---

### New Slide Types (3)

| Type | Description |
|------|-------------|
| `creation-day` | Full-screen day title with giant day number (Д Е Н Ь 1), what was created as subtitle, cosmic gradient background unique per day, animated number reveal |
| `creation-crawl` | Star Wars-style text crawl on starfield background — perspective-transformed text scrolling upward |
| `creation-diagram` | Bar chart slide for lifespan data (before/after flood). Animated horizontal bars with names and ages, color-coded pre-flood (green) vs post-flood (amber) |

### Reused Slide Types
`drama-scripture`, `drama-parallel`, `drama-scene`, `drama-image`, `story-image`, `intro-image`, `conclusion`, `reflection`

---

### Presentation Structure (~38 slides)

**Section 1: Пролог — Из Ничего** (5 slides)
- `creation-crawl` — Star Wars crawl: "В начале сотворил Бог небо и землю..."
- `intro-image` — Title slide with creation thumbnail
- `drama-scene` — "Ex Nihilo": God creates from nothing (Евр. 11:3, Рим. 4:17)
- `drama-scripture` — Быт. 1:1-2, Евр. 11:3
- `reflection` — "Что значит, что Бог не нуждается в материале?"

**Section 2: Шесть буквальных дней** (6 slides)
- `drama-scene` — Why 6 literal days, not millions
- `drama-scripture` — Exodus 20:11 (Sabbath law proof)
- `drama-parallel` — Left: "6 дней работы / 1 день покоя для людей" vs Right: "6 дней творения / 1 день покоя для Бога"
- `drama-scene` — God creates things mature (Adam adult, wine aged)
- `drama-scripture` — John 2:9-10 (water to aged wine)
- `drama-parallel` — Left: "Выглядит старым" vs Right: "Сотворено зрелым" (Adam, wine, universe)

**Section 3: Дни 1-2 — Свет и Твердь** (8 slides)
- `creation-day` — День 1: Свет
- `drama-scene` — Light before the sun; God Himself is the light
- `drama-scripture` — Откровение 21:23 (no need for sun in new creation)
- `drama-parallel` — Left: "Первое творение" vs Right: "Новое творение" (both lit by God)
- `creation-day` — День 2: Твердь (Небо)
- `drama-scene` — Water canopy above the sky: greenhouse effect, high pressure, protection
- `story-image` — Dinosaurs and giant sequoias under water canopy (generated image)
- `drama-scene` — Water canopy destroyed during the Flood

**Section 4: Дни 3-6 — Жизнь и Человек** (11 slides)
- `creation-day` — День 3: Суша и растения
- `creation-day` — День 4: Солнце, луна, звёзды
- `drama-scene` — Light existed from Day 1, luminaries from Day 4
- `creation-day` — День 5: Рыбы и птицы
- `creation-day` — День 6: Животные и человек
- `drama-scene` — Only humans made in God's image
- `drama-scripture` — Быт. 1:26-27, Быт. 2:7
- `drama-scene` — First surgery with anesthesia (Eve from Adam's rib; anesthesia invented 19th century)
- `drama-scripture` — Быт. 2:21-23
- `drama-parallel` — Left: "Люди" (fruit + herbs) vs Right: "Животные" (herbs only) — original vegetarian diet
- `drama-scripture` — Быт. 1:29-30

**Section 5: Последствия — До и После Потопа** (5 slides)
- `drama-scene` — The Flood destroyed the water canopy
- `creation-diagram` — Lifespan chart: Adam 930, Methuselah 969, Noah 950 → Shem 600, Abraham 175, Moses 120
- `drama-scripture` — Быт. 6:17, 7:11 (windows of heaven opened)
- `drama-parallel` — Left: "До потопа" (long life, no radiation, giant creatures) vs Right: "После потопа" (short life, radiation, smaller creatures)
- `reflection` — "Почему Бог допустил потоп?"

**Section 6: Заключение** (3 slides)
- `drama-scene` — Summary: God's creative power and sovereignty
- `conclusion` — Key takeaways (6 literal days, ex nihilo, water canopy, image of God)
- `drama-scripture` — Пс. 33:6,9

---

### Generated Images (10)

| Filename | Prompt |
|----------|--------|
| `creation-thumbnail.png` | Cosmic explosion of light from darkness, galaxies forming, divine creation energy |
| `creation-day1-light.png` | Pure brilliant light emerging from total darkness, no sun or stars, just divine radiance |
| `creation-day2-firmament.png` | Cross-section diagram showing sky dome with water layer above and below, Earth in center |
| `creation-dinosaurs-canopy.png` | Giant dinosaurs under lush vegetation with a shimmering water canopy visible in sky |
| `creation-sequoia.png` | Enormous ancient sequoia trees in primordial forest, towering scale |
| `creation-day3-land.png` | Land rising from ocean waters, first plants and trees appearing |
| `creation-day4-stars.png` | Sun moon and stars appearing in a sky that already has light |
| `creation-day5-sea.png` | Ocean teeming with sea creatures, birds filling the sky |
| `creation-adam-eve.png` | Adam and Eve in Garden of Eden, surrounded by lush paradise |
| `creation-flood.png` | The great flood — water canopy collapsing, rain from sky, fountains of deep breaking |

---

### Files to Create/Edit

| File | Action |
|------|--------|
| `src/data/creation.ts` | **Create** — All slide data, interfaces, sections (~400 lines) |
| `src/components/CreationDaySlide.tsx` | **Create** — Day title component |
| `src/components/CreationCrawlSlide.tsx` | **Create** — Star Wars crawl component |
| `src/components/CreationDiagramSlide.tsx` | **Create** — Lifespan bar chart component |
| `src/types/slides.ts` | **Edit** — Add 3 new types to UniversalSlide union |
| `src/components/SlideRenderer.tsx` | **Edit** — Add 3 new cases |
| `src/components/SlideCardRenderer.tsx` | **Edit** — Add card rendering for new types |
| `src/data/presentations.ts` | **Edit** — Add "creation" presentation (first in list) |
| `src/data/collections.ts` | **Edit** — Add "creation" to summer-seminar-2026 presentationIds (first position) |
| `src/assets/creation-*.png` | **Create** — 10 generated images |

