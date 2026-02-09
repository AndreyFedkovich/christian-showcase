

## Plan: Fix Card Sizing and Missing Slide Cards

### Problem
After adding `flex flex-col` to page wrappers for the sticky footer, content areas became flex items that can shrink. At certain viewport widths (especially in the Lovable preview panel), this causes:
1. Cards to appear minimized/tiny across all pages
2. Slide cards to disappear on grid-layout presentation pages (Kings & Prophets, Know & Do)

### Root Cause
When a container has `display: flex; flex-direction: column`, its children become flex items with `flex-shrink: 1` by default. This means content can be compressed when there's not enough space, causing cards to collapse to minimal sizes.

### Solution
Add `flex-shrink-0` to prevent content sections from being compressed, and `flex-1` to main content areas so they fill available space properly.

### File Changes

**1. `src/pages/Index.tsx`** (line 135)

Add `flex-1` to main content area:
```
Before: <main className="min-h-screen gradient-warm pt-8 pb-16">
After:  <main className="flex-1 flex-shrink-0 min-h-screen gradient-warm pt-8 pb-16">
```

**2. `src/pages/PresentationDetails.tsx`**

Add `flex-shrink-0` to header (line 77) and `flex-1` to main (line 154):
```
Before: <header className="relative py-12 px-6">
After:  <header className="relative py-12 px-6 flex-shrink-0">

Before: <main className="max-w-7xl mx-auto px-6 pb-20">
After:  <main className="flex-1 flex-shrink-0 max-w-7xl mx-auto px-6 pb-20">
```

**3. `src/pages/GameDetails.tsx`**

Add `flex-shrink-0` to header (line 45) and halls section (line 102):
```
Before: <header className="relative py-12 px-6">
After:  <header className="relative py-12 px-6 flex-shrink-0">

Before: <section className="max-w-7xl mx-auto px-6 pb-16">
After:  <section className="flex-1 flex-shrink-0 max-w-7xl mx-auto px-6 pb-16">
```

**4. `src/pages/CollectionDetails.tsx`**

Add `flex-shrink-0` to header and `flex-1` to main content.

### Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Add `flex-1 flex-shrink-0` to main |
| `src/pages/PresentationDetails.tsx` | Add `flex-shrink-0` to header, `flex-1 flex-shrink-0` to main |
| `src/pages/GameDetails.tsx` | Add `flex-shrink-0` to header, `flex-1 flex-shrink-0` to section |
| `src/pages/CollectionDetails.tsx` | Add `flex-shrink-0` to header, `flex-1 flex-shrink-0` to main |

### Why This Fixes It
- `flex-shrink-0` prevents content from being compressed below its natural size
- `flex-1` ensures the main content area expands to fill available space
- Together they maintain the sticky footer behavior while preventing card collapse

