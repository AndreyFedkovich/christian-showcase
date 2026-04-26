## Plan: Increase Crawl Travel Distance

The crawl text currently stops fading around the middle of the screen. Need to make it travel further up (toward the top) before disappearing into the distance.

### Change in `src/components/CreationCrawlSlide.tsx`

**1. Increase translation distance in `@keyframes creationCrawl`:**
- Change `translateY(-260%)` → `translateY(-400%)` so text continues receding well past the middle, all the way toward the top vanishing point.

**2. Reduce top fade height to let text remain visible higher up:**
- Change top gradient `height: '55%'` → `height: '30%'` so the fade-to-black zone only covers the top portion of the screen rather than half of it.
- Adjust gradient stops so text stays clearly visible until it's near the top of the viewport.

**3. Optionally extend animation duration slightly** (e.g., 60s → 75s) to keep the upward pace cinematic given the longer travel distance.
