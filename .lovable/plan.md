

## Plan: Fix Nested Group Hover Conflict

### Problem
Both `ContentRow` and `CompactCard` use Tailwind's `group` class for hover effects. When nested, hovering anywhere on the content row triggers hover styles on ALL cards because they share the same group context.

### Root Cause
```
ContentRow (group) ← hover here affects all children with group-hover
  └── CompactCard (group) ← has group-hover:scale-105, group-hover:shadow-xl
  └── CompactCard (group) ← ALSO gets triggered
  └── CompactCard (group) ← ALSO gets triggered
```

### Solution
Use Tailwind's **named groups** feature (`group/name`) to create isolated hover contexts.

---

### File Changes

**File: `src/components/ContentRow.tsx`**

Rename the group to `group/row`:

| Line | Current | Updated |
|------|---------|---------|
| 26 | `"relative group py-6"` | `"relative group/row py-6"` |
| 36 | `group-hover:opacity-100` | `group-hover/row:opacity-100` |
| 44 | `group-hover:opacity-100` | `group-hover/row:opacity-100` |

**File: `src/components/CompactCard.tsx`**

Rename the group to `group/card`:

| Line | Current | Updated |
|------|---------|---------|
| 17 | `"... group p-2"` | `"... group/card p-2"` |
| 25 | `group-hover:shadow-xl group-hover:shadow-primary/10` | `group-hover/card:shadow-xl group-hover/card:shadow-primary/10` |
| 31 | `group-hover:scale-105` | `group-hover/card:scale-105` |
| 40 | `group-hover:opacity-90` | `group-hover/card:opacity-90` |

---

### Technical Explanation

Tailwind CSS supports named groups using the syntax `group/{name}`. This creates isolated hover contexts:

```tsx
// Before (broken):
<div className="group">           // ContentRow
  <div className="group">          // CompactCard - shares same context
    <img className="group-hover:scale-105" />  // triggers on ROW hover
  </div>
</div>

// After (fixed):
<div className="group/row">        // ContentRow - isolated context
  <div className="group/card">     // CompactCard - isolated context
    <img className="group-hover/card:scale-105" />  // only triggers on CARD hover
  </div>
</div>
```

---

### Files Summary

| File | Action |
|------|--------|
| `src/components/ContentRow.tsx` | Rename `group` to `group/row` |
| `src/components/CompactCard.tsx` | Rename `group` to `group/card` |

---

### Visual Result

- Hovering over a card only affects that specific card
- Hovering over the content row still shows navigation arrows
- No more "all cards hover at once" bug

