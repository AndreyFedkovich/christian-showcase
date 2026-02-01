
## Plan: Netflix-Style Redesign for Game Pages

### Overview
Apply the same split-layout hero design (content left, featured thumbnail right) to game pages, matching the presentation details page style.

---

### Current Structure

| Game | Route | Current Design |
|------|-------|----------------|
| Bible Master | `/game/bible-master/play` | Goes directly to TeamSetup |
| Scroll Keeper | `/game/scroll-keeper/halls` | Centered hero with emoji, hall grid below |

---

### New Structure

Both games will have a dedicated details page with:
1. Split hero layout (matching PresentationDetails)
2. Content-specific sections below

---

### 1. Create Unified GameDetails Page

**New file: `src/pages/GameDetails.tsx`**

A new details page for games using the same Netflix-style split layout:

```text
┌────────────────────────────────────────────────────────────────┐
│  [← К списку]                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────┐    ┌──────────────────────────┐  │
│  │                          │    │                          │  │
│  │  Title (large, bold)     │    │   [Game Thumbnail]       │  │
│  │  2 команды • 15-30 мин   │    │      aspect 16:9         │  │
│  │                          │    │      rounded-xl          │  │
│  │  Description text...     │    │      shadow-2xl          │  │
│  │                          │    │                          │  │
│  │  [▶ Start Game]          │    │                          │  │
│  │                          │    │                          │  │
│  └──────────────────────────┘    └──────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
│  [Game-specific content below - halls for Scroll Keeper]       │
└────────────────────────────────────────────────────────────────┘
```

**Key features:**
- Uses `useParams` to get game ID
- Finds game from `games` array
- Split layout: text left, thumbnail right
- Metadata: player count • duration
- Localized content via `useLanguage`
- For `scroll-keeper`: renders hall cards below hero
- For `bible-master`: simpler layout, CTA goes to play

---

### 2. Update Routes

**File: `src/App.tsx`**

Add new route for game details:

```tsx
// Current:
<Route path="/game/:gameId/play" element={<GamePlay />} />
<Route path="/game/scroll-keeper/halls" element={<ScrollKeeperDetails />} />

// Updated:
<Route path="/game/:gameId" element={<GameDetails />} />
<Route path="/game/:gameId/play" element={<GamePlay />} />
```

---

### 3. Update Index Navigation

**File: `src/pages/Index.tsx`**

Change game card navigation to go to details page first:

```tsx
// Current:
const handleGameClick = (gameId: string) => {
  navigate(`/game/${gameId}/play`);
};

// Updated:
const handleGameClick = (gameId: string) => {
  navigate(`/game/${gameId}`);
};
```

---

### 4. Update ScrollKeeperDetails to Pure Halls View

**File: `src/pages/ScrollKeeperDetails.tsx`**

This file can be repurposed or removed since GameDetails will handle it. The hall grid can be moved into the GameDetails page as conditional content for scroll-keeper.

**Option chosen:** Integrate hall grid into GameDetails for scroll-keeper game.

---

### 5. Add i18n Translations

**File: `src/lib/i18n.ts`**

Add new translation strings:

```typescript
// Russian
startGame: "Начать игру",
startQuest: "Начать квест",
libraryHalls: "Залы Библиотеки",
gameRules: "Правила игры",
hall: "Зал",

// English  
startGame: "Start game",
startQuest: "Start quest",
libraryHalls: "Library Halls",
gameRules: "Game rules",
hall: "Hall",
```

---

### 6. Add English Translations to Hall Data

**File: `src/data/scroll-keeper.ts`**

Add English translations to halls:

```typescript
export interface Hall {
  type: HallType;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  keeperIntro: string;
  icon: string;
}
```

---

### Files Summary

| File | Action |
|------|--------|
| `src/pages/GameDetails.tsx` | Create - new unified game details page |
| `src/App.tsx` | Update - add `/game/:gameId` route |
| `src/pages/Index.tsx` | Update - change game navigation to details page |
| `src/pages/ScrollKeeperDetails.tsx` | Delete - replaced by GameDetails |
| `src/lib/i18n.ts` | Update - add game-specific translations |
| `src/data/scroll-keeper.ts` | Update - add English hall translations |
| `src/components/game/scroll-keeper/HallCard.tsx` | Update - support localized hall names |

---

### Visual Result

**Bible Master Details:**
- Split hero with quiz show thumbnail on right
- Player count and duration metadata
- "Start game" CTA button
- Clean dark background

**Scroll Keeper Details:**
- Split hero with library thumbnail on right  
- Player count and duration metadata
- "Start quest" CTA button
- Hall cards grid below (matching reference image)
- Each hall card shows localized name and description

---

### Technical Implementation Details

**GameDetails component structure:**

```tsx
export default function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const game = games.find(g => g.id === gameId);
  
  const title = language === 'en' ? game.titleEn : game.title;
  const description = language === 'en' ? game.descriptionEn : game.description;
  const playerCount = language === 'en' ? game.playerCountEn : game.playerCount;
  
  const handleStartGame = () => {
    navigate(`/game/${gameId}/play`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Split Layout */}
      <header className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          {/* Split flex container */}
          {/* Left: Title, metadata, description, CTA */}
          {/* Right: Thumbnail 16:9 */}
        </div>
      </header>
      
      {/* Game-specific content */}
      {gameId === 'scroll-keeper' && (
        <ScrollKeeperHalls />
      )}
    </div>
  );
}
```

**HallCard localization:**

```tsx
export function HallCard({ hall, hallNumber, onClick }: HallCardProps) {
  const { language, t } = useLanguage();
  const name = language === 'en' ? hall.nameEn : hall.name;
  const description = language === 'en' ? hall.descriptionEn : hall.description;
  
  return (
    // ... existing card structure with localized text
  );
}
```
