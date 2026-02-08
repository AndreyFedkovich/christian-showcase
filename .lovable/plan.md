

## Plan: Seminar Collection Page ("Зимний семинар 2026 - Бог правит")

### Overview
Introduce a new **Collection** concept that groups multiple presentations into a single entity. The four seminar presentations will be grouped into "Зимний семинар 2026 - Бог правит" and displayed as one card in the "Seminars" row on the homepage. Clicking it opens a premium collection details page with a split hero layout and a list of the included presentations. Breadcrumb navigation enables easy movement between pages.

---

### New Navigation Flow

```text
Home (/)
  └── Collection: /collection/winter-seminar-2026
        ├── Presentation: /presentation/god-exists
        ├── Presentation: /presentation/eternal-temporal
        ├── Presentation: /presentation/seminar
        └── Presentation: /presentation/salvation
```

---

### 1. Define Collection Data Model

**New file: `src/data/collections.ts`**

Create a `Collection` interface and export a `collections` array:

```typescript
export interface Collection {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;          // hero image for the collection
  presentationIds: string[];  // ordered list of presentation IDs
  duration: string;           // total approximate duration
  createdAt: string;
  category: 'seminar' | 'bible-study';
}
```

The first (and for now only) collection:

| Field | Value |
|-------|-------|
| id | `winter-seminar-2026` |
| title | Зимний семинар 2026 - Бог правит |
| titleEn | Winter Seminar 2026 - God Reigns |
| description | Четыре темы о Божьем владычестве: от существования Бога через вечность и зло к драме искупления |
| descriptionEn | Four topics on God's sovereignty: from God's existence through eternity and evil to the drama of redemption |
| thumbnail | reuse `salvation-thumbnail.png` (hero presentation image) |
| presentationIds | `["god-exists", "eternal-temporal", "seminar", "salvation"]` |
| duration | ~120 |
| category | `seminar` |

---

### 2. Create Collection Details Page

**New file: `src/pages/CollectionDetails.tsx`**

Premium page with the same split-hero layout as PresentationDetails and GameDetails:

```text
+---------------------------------------------------------------+
|  [<- К списку]                                                 |
+---------------------------------------------------------------+
|                                                                |
|  +---------------------------+    +-------------------------+  |
|  |                           |    |                         |  |
|  |  Зимний семинар 2026      |    |   [Collection           |  |
|  |  Бог правит               |    |    Thumbnail]           |  |
|  |                           |    |    aspect 16:9          |  |
|  |  4 презентации * ~120 мин |    |    rounded-xl           |  |
|  |                           |    |    shadow-2xl           |  |
|  |  Description...           |    |                         |  |
|  |                           |    |                         |  |
|  |  [> Начать с первой]      |    |                         |  |
|  |                           |    |                         |  |
|  +---------------------------+    +-------------------------+  |
|                                                                |
+---------------------------------------------------------------+
|                                                                |
|  Презентации                                                   |
|                                                                |
|  +--[ 1 ]------------------+  +--[ 2 ]------------------+     |
|  | God Exists thumbnail    |  | Eternal thumbnail        |     |
|  | Существует ли Бог?      |  | Вечное и временное       |     |
|  | 22 slides * 25-30 мин   |  | 36 slides * 25-30 мин   |     |
|  | [> Открыть]             |  | [> Открыть]             |     |
|  +-------------------------+  +-------------------------+     |
|                                                                |
|  +--[ 3 ]------------------+  +--[ 4 ]------------------+     |
|  | Joseph thumbnail        |  | Salvation thumbnail      |     |
|  | Бог превращает зло...   |  | Драма Искупления        |     |
|  | X slides * 25-30 мин    |  | Y slides * 35-40 мин    |     |
|  | [> Открыть]             |  | [> Открыть]             |     |
|  +-------------------------+  +-------------------------+     |
+---------------------------------------------------------------+
```

Each presentation card in the list is a horizontal card with:
- Numbered badge (1, 2, 3, 4)
- Thumbnail on the left (small, rounded)
- Title, slide count, duration on the right
- Click navigates to `/presentation/{id}` (with breadcrumb context)

---

### 3. Add Breadcrumb Navigation

**File: `src/pages/PresentationDetails.tsx`**

When a user arrives at a presentation from a collection, pass the collection context via URL search params (e.g., `?from=winter-seminar-2026`).

Add a breadcrumb bar at the top:

```text
Home  >  Зимний семинар 2026  >  Существует ли Бог?
```

- If `from` param is present, show breadcrumb with collection link
- If no `from` param (user came from homepage directly), show the existing "Back to list" button

This uses the existing `breadcrumb.tsx` UI component already in the project.

**File: `src/pages/CollectionDetails.tsx`**

Add breadcrumb:

```text
Home  >  Зимний семинар 2026
```

---

### 4. Update Homepage to Show Collection Instead of Individual Seminars

**File: `src/pages/Index.tsx`**

Changes to the "Seminars" content row:
- Import `collections` from the new data file
- Filter out presentations that belong to a collection from the individual seminar list
- Render collection cards alongside (or instead of) individual presentation cards
- Collection card navigates to `/collection/{collectionId}`

Logic:
```typescript
// Get all presentation IDs that are part of collections
const collectedIds = new Set(collections.flatMap(c => c.presentationIds));

// Seminars row shows: collections + standalone seminars
const seminarItems = [
  ...collections.filter(c => c.category === 'seminar'),
  ...presentations.filter(p => p.category === 'seminar' && !collectedIds.has(p.id))
];
```

Since all 4 seminars are in the collection, the Seminars row will show just 1 card.

---

### 5. Add Route for Collection Page

**File: `src/App.tsx`**

Add new route:

```tsx
<Route path="/collection/:collectionId" element={<CollectionDetails />} />
```

---

### 6. Add i18n Translations

**File: `src/lib/i18n.ts`**

New translation keys:

| Key (RU) | Key (EN) |
|----------|----------|
| `presentations` = "презентации" | `presentations` = "presentations" |
| `startFromFirst` = "Начать с первой" | `startFromFirst` = "Start from first" |
| `open` = "Открыть" | `open` = "Open" |
| `home` = "Главная" | `home` = "Home" |

---

### 7. Update Hero Presentation Handling

Since "Драма Искупления" (salvation) is still `isHero: true`, the hero section on the homepage continues to work as before. The hero feature and collection grouping are independent -- the hero auto-scrolls the presentation's slides regardless of collection membership.

---

### Files Summary

| File | Action |
|------|--------|
| `src/data/collections.ts` | **Create** - Collection data model and winter seminar data |
| `src/pages/CollectionDetails.tsx` | **Create** - Premium collection details page with split hero |
| `src/App.tsx` | **Update** - Add `/collection/:collectionId` route |
| `src/pages/Index.tsx` | **Update** - Show collection card instead of 4 individual seminars |
| `src/pages/PresentationDetails.tsx` | **Update** - Add breadcrumb when navigating from collection |
| `src/lib/i18n.ts` | **Update** - Add new translation strings |

---

### Technical Details

**Presentation list cards** inside the collection page will be rendered as horizontal cards in a responsive grid (1 column on mobile, 2 columns on desktop). Each card contains:
- Left: `w-32 aspect-video rounded-lg` thumbnail
- Right: Numbered title, metadata (slides + duration), description snippet
- Full card is clickable, navigates to `/presentation/{id}?from={collectionId}`

**Breadcrumb implementation** uses the existing `Breadcrumb` components from `src/components/ui/breadcrumb.tsx` with `Link` from react-router-dom for navigation.

**Search** on the homepage will also search within collection titles so users can still find individual presentations by name (the collection card will appear if any of its presentations match).

