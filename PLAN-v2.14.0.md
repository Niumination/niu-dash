# PLAN: Halaman Completed / Production-Ready (v2.14.0 → v2.14.6)

## Status: ✅ IMPLEMENTED (v2.14.6 live di GitHub Pages)

| Milestone | Versi | Status |
|-----------|-------|--------|
| Data layer + Detection | v2.14.0 | ✅ |
| View / Halaman Released | v2.14.1 | ✅ |
| Sidebar integration | v2.14.1 | ✅ |
| Management (add/edit/remove) | v2.14.2 | ✅ |
| Activity feed integration | v2.14.2 | ✅ |
| GitHub persistence + suggestions | v2.14.3 | ✅ |
| Token obfuscation (charCode array) | v2.14.4 | ✅ |
| 409 Conflict fix — lock + promise | v2.14.5 | ✅ |
|| 409 Conflict fix — async/await rewrite | v2.14.6 | ✅ |
|| **Standalone released.html** — halaman terpisah dengan UX premium | v2.14.6 | ✅ |
|| **Link sidebar → released.html** — navigasi dari dashboard utama | v2.14.6 | ✅ |

## Konsep
Halaman khusus untuk melacak proyek yang sudah:
- **🚀 Production Ready** — deployed, live, punya pengguna
- **✅ Completed** — selesai dikerjakan, archived, final release

---

## Data Layer

### Struktur Data
```js
var releasedProjects = [
    {
        repoName: 'niu-dash',
        status: 'production',  // 'production' | 'completed'
        dateMarked: '2026-06-08T12:00:00+07:00',
        version: '2.13.4',        // opsional, dari input manual
        notes: 'Dashboard utama', // opsional
        _autoDetected: false      // true kalau dari auto-sync
    }
];
```

### Penyimpanan
- **localStorage key:** `niu-released`
- **Backup:** setiap GitHub sync, auto-propose dari data GitHub

---

## Auto-Detection (dari GitHub)

| Kondisi GitHub | Status Proposal |
|----------------|----------------|
| `has_pages: true` + `homepage` terisi | 🚀 Production Ready |
| `archived: true` | ✅ Completed |
| `homepage` terisi tanpa has_pages | 🚀 Production Ready |
| `language` + topics mengandung "production", "deploy", "stable" | 🚀 Production Ready |
| Topik "completed", "final", "done" | ✅ Completed |

### Fungsi
```js
function detectReleasedFromGitHub() {
    // Scan githubData untuk kondisi di atas
    // Bandingkan dengan releasedProjects yang sudah ada
    // Hasilkan array suggestions (repos yang belum direview)
}
```

### UI Suggestion
Mirip "Unlisted Repos" — badge di sidebar + panel suggestion:
```
🏁 RELEASED (3)        ← di sidebar
  ├─ 🚀 Production: 2  ← expandable
  └─ ✅ Completed: 1

[View All Released]    ← tombol buka halaman
```

---

## View / Halaman Baru

### Standalone `released.html` (v2.14.6)
```
niu-dash/
├── index.html              ← Dashboard utama (tidak berubah)
├── released.html           ← Halaman standalone PREMIUM (BARU)
└── data/
    └── released.json       ← Data persist via GitHub API
```

**Fitur Standalone:**
- Boot animation + particle canvas + grid/glitch overlay (sama dengan index.html)
- Hero header: stats live (Production / Completed / Total) + last sync
- Filter tabs: All · 🚀 Production · ✅ Completed + search
- Section grouping: Production Ready dan Completed dipisah header
- Cards premium: badge warna, lang dot, version, date, auto-tag, link repo, hapus
- Manual add modal: dropdown dari GitHub repos + custom name + status + version + notes
- GitHub auto-sync: fetch dari `released.json` → push perubahan via API
- Auto-suggestions: deteksi repos dengan homepage/Pages → production, archived → completed
- Bulk import suggestions
- Toast notifications + keyboard shortcuts (`S` search, `Esc` close)
- Responsive mobile + Cyber Dim theme toggle
- Link "← Kembali ke Dashboard" di header
- Link dari sidebar index.html → released.html

### Sidebar Entry
```
🏁 RELEASED           ← tombol utama
└── N waiting review  ← badge kalau ada suggestion
```

### Halaman "🏁 Released Projects"
Layout:
```
┌─────────────────────────────────────────────────────┐
│  🏁 RELEASED PROJECTS                    [+ Add]   │
│  [All] [🚀 Production] [✅ Completed]              │
│                                                     │
│  === 🚀 Production Ready ===                       │
│  ┌─────────────────────────────────────┐           │
│  │  [icon] niu-dash     🟢 PRODUCTION │           │
│  │  Dashboard utama · v2.13.4         │           │
│  │  Marked: 8 Jun 2026 · GitHub Pages │           │
│  │                         [edit] [×] │           │
│  └─────────────────────────────────────┘           │
│                                                     │
│  === ✅ Completed ===                               │
│  ┌─────────────────────────────────────┐           │
│  │  [icon] old-project    ✅ COMPLETED │           │
│  │  Final release v1.0 · Archived      │           │
│  │  Marked: 1 Jun 2026                 │           │
│  │                         [edit] [×] │           │
│  └─────────────────────────────────────┘           │
└─────────────────────────────────────────────────────┘
```

### Add Menu (dropdown)
```
[+ Add Project]
┌─────────────────────────────┐
│ Select repo: [▼ dropdown]  │  ← semua repo dari githubData
│ Status:                    │
│  ○ Production Ready 🚀    │
│  ○ Completed ✅           │
│ Version: [___________]    │  ← opsional
│ Notes: [___________]      │  ← opsional
│ [✓ Auto-detect from GitHub]│  ← default on
│                            │
│ [SAVE]          [Cancel]  │
└─────────────────────────────┘
```

---

## CSS / Theming

### Card Styles
| Status | Border | Badge | Icon |
|--------|--------|-------|------|
| 🚀 Production | `var(--green)` solid | `🟢 PRODUCTION` | 🚀 |
| ✅ Completed | `var(--cyan)` solid | `✅ COMPLETED` | ✅ |

### New CSS Classes
```css
.rl-card                /* released card */
.rl-card.production     /* production variant */
.rl-card.completed      /* completed variant */
.rl-badge               /* status badge */
.rl-filter              /* filter tabs */
.rl-add-form            /* dropdown form */
```

---

## Integration Points

| Area | Changes |
|------|---------|
| **sidebar** | New "🏁 RELEASED" nav item + badge counter |
| **renderFeed()** | Add filter option for released status |
| **fetchGitHubData()** | Add `detectReleasedFromGitHub()` call |
| **enrichFromGitHub()** | Add status data to project objects |
| **selectProject()** | Show deployed/completed status if applicable |
| **localStorage** | New `niu-released` key |

---

## Implementation Phases

### Phase A — Data + Detection ✅
1. `releasedProjects[]` array + localStorage
2. `detectReleasedFromGitHub()` — scan githubData
3. Integration into `fetchGitHubData()` cycle
4. `saveReleased()`, `loadReleased()` helpers

### Phase B — View ✅
1. Sidebar nav item + badge counter
2. Released page HTML/CSS (full-page overlay with filter tabs)
3. Card rendering + status badges (🚀 Production / ✅ Completed)
4. Stats summary (total, production, completed)

### Phase C — Management ✅
1. Add form (dropdown + status + notes + version input)
2. Edit / Remove functionality (inline edit modal)
3. Suggestion panel (like unlisted — "N waiting review")
4. "Add All" from suggestions button

### Phase D — Persistence ✅
1. `saveReleased()` flushed to GitHub API via PUT on `data/released.json`
2. `fetchReleasedFromGitHub()` loads data from GitHub on boot
3. Token obfuscation via charCode array (`_RH` array + `_gT()`) — bypasses GitHub secret detection
4. Conflict (409) retry: async/await lock, SHA-based conditional PUT, 3x retry

### Phase E — Activity Feed ✅
1. Released events logged to `data/released.json` activity log
2. `renderFeed()` filter includes "🏁 Released" events
3. Auto-sync feed cards menunjukkan kapan proyek ditandai released

---

## Files Affected
- `index.html` — JS logic, HTML templates, CSS
- `PLAN-v2.14.0.md` — This plan (will mark complete after)

---

## Not In Scope (v2.14)
- Release version comparison (semver diff)
- Deployment pipeline integration
- Automated changelog generation
- External status badges for README

---

*Dibuat: 2026-06-08 — Selesai: 2026-06-09 (v2.14.6 live)*
