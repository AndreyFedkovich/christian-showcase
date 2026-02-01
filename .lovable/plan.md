
## Plan: Redesign Hero Section Layout (Netflix-Style)

### Overview
Redesigning only the hero section of the presentation details page to match the reference image with a split layout - content on left, featured thumbnail on right.

---

### 1. Update Hero Section Layout

**File: `src/pages/PresentationDetails.tsx`**

Transform the centered hero into a split-layout design:

**Current Structure (centered):**
```text
┌─────────────────────────────────────────────┐
│         [← Back button]                     │
│            Title (centered)                 │
│          Description (centered)             │
│             Date                            │
│         [▶ Start button]                    │
└─────────────────────────────────────────────┘
```

**New Structure (split layout):**
```text
┌────────────────────────────────────────────────────────────────┐
│  [← Back]                                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────┐    ┌──────────────────────────┐  │
│  │                          │    │                          │  │
│  │  Title (large, bold)     │    │   [Featured Thumbnail]   │  │
│  │  X разделов • Y мин      │    │      aspect 16:9         │  │
│  │                          │    │      rounded-xl          │  │
│  │  Description text...     │    │      shadow-2xl          │  │
│  │                          │    │                          │  │
│  │  [▶ Начать просмотр]     │    │                          │  │
│  │                          │    │                          │  │
│  └──────────────────────────┘    └──────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Key Changes:**
- Use `flex flex-col lg:flex-row` for responsive split layout
- Left side (~60%): Title, metadata subtitle, description, CTA button
- Right side (~40%): Large thumbnail with 16:9 aspect ratio
- Left-align text content
- Add metadata line: "X разделов • Y мин" (or "X slides • Y min" for grid layouts)
- Remove `Calendar` icon and `createdAt` date
- Use language-aware title/description from presentation data
- Dark gradient background maintained

**Code structure:**
```tsx
<header className="relative py-12 px-6">
  <div className="relative max-w-7xl mx-auto">
    {/* Back button */}
    <Button onClick={() => navigate("/")} className="mb-8">
      <ArrowLeft /> {t('backToList')}
    </Button>
    
    {/* Split layout container */}
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      {/* Left: Content */}
      <div className="flex-1 text-left space-y-4">
        <h1>{title}</h1>
        <p className="text-primary/80">
          {sectionsCount} {t('sections')} • {duration} {t('minutes')}
        </p>
        <p className="text-muted-foreground">{description}</p>
        <Button onClick={handleStartPresentation}>
          <Play /> {t('startPresentation')}
        </Button>
      </div>
      
      {/* Right: Thumbnail */}
      <div className="w-full lg:w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl">
        <img src={presentation.thumbnail} />
      </div>
    </div>
  </div>
</header>
```

---

### 2. Add i18n Translations

**File: `src/lib/i18n.ts`**

Add new translation strings for the hero section:

```typescript
// Russian
backToList: "К списку",
startPresentation: "Начать просмотр",
sections: "разделов",

// English
backToList: "Back to list",
startPresentation: "Start watching",
sections: "sections",
```

Note: `minutes` already exists in translations.

---

### 3. Import Language Context

**File: `src/pages/PresentationDetails.tsx`**

- Import `useLanguage` hook from context
- Get `language` and `t` function
- Use `language === 'en' ? presentation.titleEn : presentation.title` for localized content
- Same pattern for description

---

### Files Summary

| File | Action |
|------|--------|
| `src/pages/PresentationDetails.tsx` | Redesign hero section with split layout |
| `src/lib/i18n.ts` | Add 3 new translation strings |

---

### Visual Result

- Split hero: content left, featured 16:9 image right
- Metadata line showing sections count and duration
- Left-aligned title and description
- Localized content (RU/EN)
- Responsive: stacks vertically on mobile
- Slides section below remains unchanged
