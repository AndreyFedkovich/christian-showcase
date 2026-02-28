

## Plan: Add Summer Seminar 2026 Collection with 3 Presentations

### Overview
Create a new collection "Летний семинар 2026 — Бог должен быть принят верой" containing 3 new presentations, each with only a title/introduction slide for now. Add the collection to the homepage.

---

### 1. Create 3 New Presentation Data Files

**New file: `src/data/fine-tuned-universe.ts`**

Single `introduction` slide for "Вселенная точно настроена":
- Title: "Вселенная точно настроена"
- Subtitle: "Факты тонкой настройки Вселенной"
- Content: description about fine-tuning evidence (moon tides, 400x size/distance coincidence, etc.)
- Uses `salvation-thumbnail.png` as placeholder image

**New file: `src/data/sin.ts`**

Single `introduction` slide for "Грех":
- Title: "Грех"
- Subtitle: "Главная проблема человека"
- Content: emphasis on understanding and realizing the gravity of sin

**New file: `src/data/salvation-new.ts`**

Single `introduction` slide for "Спасение":
- Title: "Спасение"
- Subtitle: "Христос — Спаситель и Царь"
- Content: exaltation of Christ as Savior and King

All three files follow the same pattern as `src/data/salvation.ts` — export slides array and sections array, using `SeminarSlide` / `SeminarSection` types from `seminar.ts`.

---

### 2. Register 3 New Presentations

**Edit: `src/data/presentations.ts`**

Add 3 new entries to the `presentations` array:

| id | title | category | slideCount | layout |
|----|-------|----------|------------|--------|
| `fine-tuned-universe` | Вселенная точно настроена | seminar | 1 | grid |
| `sin` | Грех | seminar | 1 | grid |
| `salvation-way` | Спасение | seminar | 1 | grid |

All use `salvation-thumbnail.png` as placeholder thumbnail, duration "25-30", createdAt "28.02.2026".

---

### 3. Add New Collection

**Edit: `src/data/collections.ts`**

Add second collection entry:

```typescript
{
  id: "summer-seminar-2026",
  title: "Летний семинар 2026 — Бог должен быть принят верой",
  titleEn: "Summer Seminar 2026 — God Must Be Accepted by Faith",
  description: "Три темы о вере: от тонкой настройки Вселенной через осознание греха к славе спасения во Христе",
  descriptionEn: "Three topics on faith: from fine-tuning of the Universe through awareness of sin to the glory of salvation in Christ",
  thumbnail: salvationImg,
  presentationIds: ["fine-tuned-universe", "sin", "salvation-way"],
  duration: "90",
  createdAt: "28.02.2026",
  category: 'seminar',
}
```

---

### Files Summary

| File | Action |
|------|--------|
| `src/data/fine-tuned-universe.ts` | **Create** — introduction slide for "Вселенная точно настроена" |
| `src/data/sin.ts` | **Create** — introduction slide for "Грех" |
| `src/data/salvation-new.ts` | **Create** — introduction slide for "Спасение" |
| `src/data/presentations.ts` | **Edit** — register 3 new presentations |
| `src/data/collections.ts` | **Edit** — add summer seminar collection |

No changes to Index.tsx, routing, or any other pages — the existing collection logic on the homepage will automatically pick up the new collection and display it.

