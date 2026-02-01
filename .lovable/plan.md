

## Plan: Improve Main Page Layout, Card Sizes, and Game Images

### Overview
This plan addresses four issues:
1. Main content section needs max-width matching the navbar (max-w-7xl)
2. Presentation cards need to be larger with more spacing
3. Card borders are being clipped on hover due to overflow:hidden on parent
4. Games need thumbnail images

---

### 1. Add max-width container to main content

**File: `src/pages/Index.tsx`**

Wrap the content rows in a container with `max-w-7xl mx-auto` to match the navbar width:

```tsx
// Current:
<main className="min-h-screen gradient-warm pt-8 pb-16">
  <ContentRow ...>

// Updated:
<main className="min-h-screen gradient-warm pt-8 pb-16">
  <div className="max-w-7xl mx-auto">
    <ContentRow ...>
```

---

### 2. Increase card size and spacing

**File: `src/components/CompactCard.tsx`**

Increase card width from 160px/200px to 200px/260px:

```tsx
// Current:
"flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer group"

// Updated:
"flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer group"
```

**File: `src/components/ContentRow.tsx`**

Increase gap between cards from 3/4 to 4/6:

```tsx
// Current:
className="flex gap-3 md:gap-4 overflow-x-auto ..."

// Updated:
className="flex gap-4 md:gap-6 overflow-x-auto ..."
```

---

### 3. Fix border clipping on hover

The issue is that the parent container has `overflow-hidden` which clips the card when it scales on hover. 

**File: `src/components/CompactCard.tsx`**

Move `overflow-hidden` inside the image container only, and add padding to allow space for scale:

```tsx
// Current:
<motion.div
  className="flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer group"
  whileHover={{ scale: 1.05 }}
>
  <div className="relative rounded-lg overflow-hidden bg-card shadow-lg ...">

// Updated:
<motion.div
  className="flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer group p-2"
  whileHover={{ scale: 1.05 }}
>
  <div className="relative rounded-xl overflow-hidden bg-card shadow-lg ...">
```

This adds padding around the card so it has room to scale without clipping, and uses `rounded-xl` for more pronounced rounded corners.

---

### 4. Generate images for game cards

**Action: Generate AI images for games**

Create two game thumbnail images:

| Game | Image Prompt |
|------|--------------|
| Bible Master | "A dramatic quiz show stage with glowing golden Bible on a podium, two teams facing each other, dramatic spotlights, competition atmosphere. Rich blue and gold colors. Premium game thumbnail style. Ultra high resolution." |
| Scroll Keeper | "Ancient mysterious library with infinite bookshelves, glowing ancient scrolls, magical keys floating in golden light, mystical atmosphere. Deep purple and gold colors. Fantasy game thumbnail style. Ultra high resolution." |

Save as:
- `src/assets/bible-master-thumbnail.png`
- `src/assets/scroll-keeper-thumbnail.png`

**File: `src/data/games.ts`**

Import and assign thumbnails:

```typescript
import bibleMasterImg from "@/assets/bible-master-thumbnail.png";
import scrollKeeperImg from "@/assets/scroll-keeper-thumbnail.png";

export const games: Game[] = [
  {
    id: "bible-master",
    thumbnail: bibleMasterImg,
    ...
  },
  {
    id: "scroll-keeper",
    thumbnail: scrollKeeperImg,
    ...
  }
];
```

---

### Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Add max-w-7xl container |
| `src/components/CompactCard.tsx` | Increase size, add padding for hover, improve rounding |
| `src/components/ContentRow.tsx` | Increase gap between cards |
| `src/assets/bible-master-thumbnail.png` | Generate AI image |
| `src/assets/scroll-keeper-thumbnail.png` | Generate AI image |
| `src/data/games.ts` | Import and assign game thumbnails |

---

### Visual Result

- Content rows align with navbar (max-w-7xl)
- Cards are larger (260px on desktop vs 200px before)
- More spacing between cards (24px on desktop vs 16px before)
- Card borders visible on hover (padding creates space for scale)
- Games have attractive AI-generated thumbnails

