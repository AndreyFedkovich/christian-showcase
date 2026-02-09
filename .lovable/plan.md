

## Plan: Sticky Footer on All Pages

### Problem
When page content is shorter than the viewport, the footer floats in the middle of the screen instead of staying at the bottom (visible on GameDetails "Bible Master" page and potentially others).

### Solution
Use a simple flexbox pattern (`min-h-screen flex flex-col` on the wrapper, `mt-auto` on the footer) to push the footer to the bottom on all pages. Extract the footer into a shared component to avoid duplication.

---

### 1. Create Shared Footer Component

**New file: `src/components/Footer.tsx`**

A simple reusable footer:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto py-8 text-center text-muted-foreground font-sans text-sm border-t border-border/50">
      <p>{t('footer')}</p>
    </footer>
  );
};

export default Footer;
```

The key class is `mt-auto` which pushes the footer to the bottom when used inside a flex-col container.

---

### 2. Update Pages to Use Flex Layout + Shared Footer

Each page's root `div` needs `min-h-screen flex flex-col`, and the inline footer replaced with the shared `<Footer />` component.

| Page | Root div change | Footer change |
|------|----------------|---------------|
| `src/pages/Index.tsx` | Already has `min-h-screen`, add `flex flex-col` | Replace inline footer with `<Footer />`, move outside `<main>` |
| `src/pages/GameDetails.tsx` | Already has `min-h-screen`, add `flex flex-col` | Replace inline footer with `<Footer />` |
| `src/pages/PresentationDetails.tsx` | Already has `min-h-screen`, add `flex flex-col` | Replace hardcoded footer with `<Footer />` |
| `src/pages/CollectionDetails.tsx` | Already has `min-h-screen`, add `flex flex-col` | Replace inline footer with `<Footer />` |

---

### Files Summary

| File | Action |
|------|--------|
| `src/components/Footer.tsx` | **Create** - shared footer component with `mt-auto` |
| `src/pages/Index.tsx` | **Update** - flex-col layout, use shared Footer |
| `src/pages/GameDetails.tsx` | **Update** - flex-col layout, use shared Footer |
| `src/pages/PresentationDetails.tsx` | **Update** - flex-col layout, use shared Footer (fixes hardcoded text) |
| `src/pages/CollectionDetails.tsx` | **Update** - flex-col layout, use shared Footer |

