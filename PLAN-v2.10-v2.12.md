# NIU⚡DASH — Implementation Plan v2.10→v2.12

> **Repo:** `github.com/Niumination/niu-dash`
> **Current:** v2.9.2 — Auto-version pre-commit hook active
> **File:** `index.html` ~1670 lines, 126KB

---

## Feature A: 📰 Activity Feed — "What's New?" (v2.10)

**Goal:** Feed kronologis yang show repo aktivitas terbaru — push, new stars, new repos.

### Data
| Sumber | Field | Status |
|--------|-------|--------|
| GitHub API | `updated_at` | ✅ Already in `githubData[]` |
| GitHub API | `pushed_at` | ❌ Need to add |
| GitHub API | `created_at` | ❌ Need to add |
| GitHub API | `stargazers_count` | ✅ Already in |
| Existing | `detectUnlistedRepos()` | ✅ Already detects new |
| Existing | `enrichFromGitHub()` | ✅ Can extend |

### Design
```
┌──────────────────────────────────────┐
│ 📰 Activity — 8 updates this week  ▾ │  ← collapsible header
│──────────────────────────────────────│
│ TODAY                                 │  ← time group
│  ● niu-dash    pushed · 2h ago       │  ← icon + repo + action + time
│  ★ jcode       +3 stars · 5h ago     │
│  🆕 flame-code NEW repo · 8h ago     │  ← NEW badge utk unlisted
│──────────────────────────────────────│
│ THIS WEEK                             │
│  ● dotfiles    pushed · 2d ago       │
│  🏷️ skills     topics updated · 3d   │
│  ● Gayo-Mengaji pushed · 4d ago      │
└──────────────────────────────────────┘
```

### Implementation Steps
1. **Enrich GitHub data** — add `pushed_at`, `created_at` ke `enrichFromGitHub()`
2. **Create `buildActivityFeed()`** — scan `flatProjects` + `githubData[]`, filter by recent activity (7/14/30 days), sort chronologically
3. **Grouping logic** — "Today", "This Week", "This Month", "Older"
4. **Activity types:**
   - `🔄 pushed` — `pushed_at` < 7 days
   - `🆕 new repo` — `created_at` < 7 days && `_unlisted`
   - `★ trending` — `stargazers_count` > 0 && recent push
   - `🏷️ updated` — `updated_at` != `pushed_at` (topics/desc changed)
5. **HTML structure** — collapsible `<div class="activity-feed">` between page-header and tag-filter-bar
6. **CSS** — `.activity-feed` dark card, `.act-item` per row, `.act-time` right-aligned, `.act-badge-new` green glow
7. **Collapse state** — localStorage `niu-activity-collapsed`
8. **Render cycle** — call `buildActivityFeed()` after `enrichFromGitHub()` + `autoCategorize()`

### CSS Requirements
```css
.activity-feed { background: rgba(0,255,242,.03); border: 1px solid rgba(0,255,242,.1); border-radius: 8px; margin-bottom: 12px; }
.act-header { padding: 10px 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.act-body { padding: 0 14px 10px; }
.act-group { font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 4px; }
.act-item { display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 12px; }
.act-item .act-icon { width: 16px; text-align: center; }
.act-item .act-name { color: var(--cyan); font-weight: 500; }
.act-item .act-action { color: var(--text); }
.act-item .act-time { margin-left: auto; color: var(--text-muted); font-size: 10px; font-family: 'JetBrains Mono',monospace; }
.act-badge-new { background: rgba(0,255,0,.15); color: #00ff88; border: 1px solid rgba(0,255,0,.25); padding: 0 6px; border-radius: 3px; font-size: 8px; }
```

### Risk Notes
- **Performance:** Activity feed scans all 76+ projects. O(n) is fine, but avoid running on every re-render. Run only when GitHub data changes.
- **Empty state:** If no recent activity (all repos idle > 30 days), show subtle "No recent activity" or hide entirely.

---

## Feature B: ⚡ Virtual Scroll — Performance 100+ Cards (v2.11)

**Goal:** Smooth rendering at 100+ project cards tanpa lag, terutama di mobile.

### Approach: `content-visibility: auto` (Zero-JS)

**Why:** This is a native browser CSS property supported in Chrome 85+ (desktop + Android). It automatically skips rendering, painting, and hit-testing for off-screen elements. The browser handles everything — no JS overhead, no layout shifts, no complexity.

**How it works:**
```css
.feed-card {
    content-visibility: auto;
    contain-intrinsic-size: 200px;
}
```
- `content-visibility: auto` — browser skips rendering off-screen cards
- `contain-intrinsic-size: 200px` — reserves space so scrollbar is accurate

**Effect:**
- Initial load: only ~10-15 cards rendered instead of 76+
- Scrolling: browser renders new cards ~300ms before they enter viewport
- Memory: unused cards are garbage-collected by the browser
- No JS changes needed — pure CSS

| Browser | Support | Performance Gain |
|---------|---------|-----------------|
| Chrome 85+ | ✅ Full | **10-20x** faster initial render |
| Edge 85+ | ✅ Full | Same as Chrome |
| Firefox | ❌ No support | Falls back to normal (no harm) |
| Safari | ❌ No support | Falls back to normal (no harm) |
| Mobile Chrome | ✅ Full | **Crucial** for mid-range devices |

### Implementation (3 lines CSS)
```css
.feed-card {
    content-visibility: auto;
    contain-intrinsic-size: 200px;
}
```

### Alternative: IntersectionObserver (JS approach)
If CSS-only is insufficient (e.g., need progressive loading + counters):
1. Create `initVirtualScroll()` with IntersectionObserver
2. Buffer zone: 2 viewport heights above + below
3. `data-rendered` attribute to track which cards are in DOM
4. Swap `display: none` ↔ `display: block` as cards scroll in/out
5. Maintain scroll position with scroll anchoring

**Recommendation:** Start with CSS-only (3 lines). Test with 100+ cards. If still laggy, add IntersectionObserver fallback.

### Additional Performance Optimizations
1. **Card images** — lazy loading: `<img loading="lazy">`
2. **Animation** — `will-change: opacity, transform` only on visible cards
3. **Debounce search** — `setTimeout` 150ms on search input
4. **Reduce particle count** — scale by viewport width (mobile = fewer particles)

---

## Feature C: 🏷️ Unlisted Auto-Add — Smart Defaults (v2.12)

**Goal:** New repos detected from GitHub API are auto-processed and ready to add with one click — with smart defaults.

### Current Flow
```
detectUnlistedRepos() → renders in "Unlisted" section → user clicks "Add" per repo
```
**Problem:** User must manually add every new repo, one by one.

### Target Flow
```
detectUnlistedRepos() → auto-process each → show "2 new repos ready to add" prompt
                                                      ↓
                                            [Add All] [Review Each]
                                                      ↓
                                            Auto-fill PROJECTS entry
```

### Smart Defaults Logic
When a new repo is detected, auto-generate its PROJECTS entry:

| Field | Source | Fallback |
|-------|--------|----------|
| `name` | `repo.name` → formatted (e.g. "claw-code" → "Claw Code") | — |
| `repoName` | `repo.name` | — |
| `emoji` | Detect from topics: "flutter"→📱, "rust"→🦀, "python"→🐍, "html"→🌐, "discord"→🤖, dll | ⚡ |
| `category` | `autoCategorize()` logic: depends on activity + has_pages | 'dev' |
| `tags` | GitHub topics (max 4) + language | Language name |
| `desc` | GitHub `description` | '—' |
| `date` | GitHub `created_at` | Today |
| `path` | If `has_pages`: `https://niumination.github.io/${repoName}` | null |
| `website` | GitHub `homepage` | null |

### Emoji Detection Map
```js
var EMOJI_MAP = {
    flutter:'📱', dart:'🎯', rust:'🦀', python:'🐍', html:'🌐',
    css:'🎨', javascript:'📜', typescript:'📘', react:'⚛️', 
    nodejs:'🟢', docker:'🐳', discord:'🤖', ai:'🧠', 
    cli:'💻', terminal:'⌨️', game:'🎮', hackintosh:'🍎',
    linux:'🐧', windows:'🪟', dotfiles:'🔧', macos:'💻',
    default:'⚡'
};
```

### Implementation Steps

**Phase 1: Save to localStorage (no auto-add)**
1. Extend `detectUnlistedRepos()` → generate PROJECTS entry for each unlisted repo
2. Save to `niu-pending-adds[]` in localStorage
3. Show badge counter: `🆕 3 new repos — Add All?`
4. Button "Add All" → append to PROJECTS array, save to localStorage, re-render

**Phase 2: Auto-persist PROJECTS**
- Need to save modified PROJECTS to localStorage so additions persist across page loads
- Create `saveProjects()` function: serialize current PROJECTS to `niu-projects` in localStorage
- On `DOMContentLoaded`: check for `niu-projects` → merge with hardcoded PROJECTS
- This enables true persistence without editing the HTML file

### Risk Notes
- **PROJECTS persistence:** Currently PROJECTS is hardcoded in HTML. Auto-add needs a save mechanism (localStorage). Must merge: localStorage overrides hardcoded base.
- **Duplicate prevention:** Check `repoName` before adding to prevent dupes.
- **Rollback:** Keep "Reset to default PROJECTS" button that clears localStorage and reloads from HTML.

---

## Execution Order

| # | Feature | Version | Difficulty | Impact | Dependencies |
|---|---------|---------|------------|--------|-------------|
| 1 | 📰 Activity Feed | v2.10 | ⚡⚡⚡ | High | None |
| 2 | ⚡ Virtual Scroll | v2.11 | ⚡ | Medium | None |
| 3 | 🏷️ Unlisted Auto-Add | v2.12 | ⚡⚡⚡⚡ | High | Activity Feed (shares `pushed_at` data) |

**Recommended order:** 1 → 2 → 3

---

## File Change Summary
| File | Changes |
|------|---------|
| `index.html` | +Activity Feed HTML/CSS/JS (v2.10), +CSS 3 lines (v2.11), +Auto-Add JS (v2.12) |
| `update-version.js` | No changes needed (pre-commit hook already active) |
| `hooks/pre-commit` | No changes needed |
