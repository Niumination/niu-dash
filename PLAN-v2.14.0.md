# PLAN: Halaman Completed / Production-Ready (v2.14.0)

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

### Phase B — View ⏳
1. Sidebar nav item + badge counter
2. Released page HTML/CSS
3. Card rendering + filter tabs
4. Stats summary

### Phase C — Management ⏳
1. Add form (dropdown + status + notes)
2. Edit / Remove functionality
3. Suggestion panel (like unlisted)
4. "Mark all from suggestions" button

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

*Draft: 2026-06-08 — Menunggu persetujuan sebelum eksekusi.*
