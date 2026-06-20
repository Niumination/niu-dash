---
name: Niu-Dash
description: Dark web glitch dashboard — project portfolio tracker untuk ekosistem Niumination
colors:
  neon-cyan: "#00fff2"
  danger-red: "#ff0040"
  success-green: "#00ff88"
  warning-amber: "#ffaa00"
  accent-magenta: "#b000ff"
  glitch-blue: "#0066ff"
  bg-deepest: "#050508"
  bg-secondary: "#0a0a14"
  bg-card: "#0d0d1a"
  bg-card-hover: "#12122a"
  border-default: "#1a1a3a"
  text-primary: "#e8e8f0"
  text-secondary: "#8888aa"
  text-muted: "#55557a"
  text-detail: "#b0b0d0"
  text-bright: "#f0f0f8"
  text-topic: "#bb88ee"
  text-warn: "#ffbb33"
typography:
  display:
    fontFamily: "Orbitron, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Orbitron, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "9px"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
  utility:
    fontFamily: "Rajdhani, sans-serif"
    fontWeight: 500
    usage: "Utility class .font-rajdhani — semi-condensed sans for dense metric readouts"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "6px"
  xl: "7px"
  2xl: "8px"
  3xl: "10px"
  4xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "24px"
  chip-bg: "rgba(80,80,160,0.15)"
  chip-border: "rgba(80,80,160,0.2)"
  topic-bg: "rgba(176,0,255,0.1)"
  topic-border: "rgba(176,0,255,0.25)"
components:
  button-primary:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "rgba(0,255,242,0.06)"
    textColor: "{colors.neon-cyan}"
  button-primary-active:
    backgroundColor: "rgba(0,255,242,0.1)"
    textColor: "{colors.neon-cyan}"
  button-action:
    backgroundColor: "rgba(0,255,242,0.08)"
    textColor: "{colors.neon-cyan}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    typography: "{typography.label}"
  button-action-hover:
    backgroundColor: "rgba(0,255,242,0.18)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0"
    size: "30px"
  button-ghost-hover:
    textColor: "{colors.neon-cyan}"
    backgroundColor: "rgba(0,255,242,0.08)"
  input:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
  chip:
    backgroundColor: "rgba(80,80,160,0.15)"
    textColor: "#9090b8"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  status-badge:
    backgroundColor: "rgba(0,255,136,0.12)"
    textColor: "{colors.success-green}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
---

# Design System: Niu-Dash

## 1. Overview

**Creative North Star: "Dark Nexus Command Center"**

Niu-Dash hadir sebagai stasiun komando visual untuk seluruh ekosistem digital Niumination. Bukan dashboard biasa — ini adalah terminal yang hidup, dengan jiwa neon dan ketepatan teknis. Setiap elemen dirancang untuk memberikan kesadaran penuh terhadap keadaan ekosistem: berapa proyek yang aktif, mana yang stalled, repo GitHub baru apa yang terdeteksi, dan rilis apa yang sudah production.

Estetika ini berakar pada budaya cyber/glitch — scanlines, grid overlay, partikel neon, dan efek glitch yang semuanya punya alasan fungsional. Boot sequence yang dramatis, clock widget yang berdenyut, dan pulse animation pada indikator status adalah bagian dari bahasa visual yang konsisten. Tapi tidak ada yang dekoratif tanpa tujuan: setiap efek memperkuat metafora "command center."

Sistem ini secara eksplisit menolak estetika dashboard SaaS generik — tidak ada card shadow bulat, tidak ada navbar biru kalem, tidak tombol rounded-full dengan gradient. Sebaliknya, Niu-Dash memilih permukaan flat yang dipisahkan oleh border tipis, aksen neon yang hemat namun berdampak, dan tipografi monospace yang dominan.

**Key Characteristics:**
- Latar belakang hitam pekat (#050508) sebagai fondasi — kegelapan sebagai kanvas
- Satu aksen primer dominan (Neon Cyan #00fff2) — jarang, konsisten, berisi
- Empat aksen semantik (hijau/amber/merah/magenta) untuk status dan kategori
- Tipografi monospace (JetBrains Mono) sebagai suara UI utama — bukan pilihan biasa untuk dashboard, dan itu disengaja
- Flat secara default; depth dari glow dan interaksi, bukan dari shadow
- Glitch dan efek neon sebagai vocabulary visual yang koheren, bukan tempelan

## 2. Colors

Palet ini dibangun di atas kegelapan murni dengan aksen neon yang kontras tinggi — stasiun komando cyber untuk satu orang operator.

### Primary
- **Neon Cyan** (#00fff2 / oklch(0.88 0.15 197)): Aksen primer. Navigasi aktif, state terpilih, glow indikator, link, pulse clock. Muncul pada ≤10% dari layar — kerapatan adalah kekuatannya.

### Secondary
- **Accent Magenta** (#b000ff / oklch(0.58 0.29 307)): Aksen kedua. Digunakan untuk kategori Config, topic tag GitHub, dan elemen yang perlu dibedakan dari cyan. Tidak pernah bersaing dengan cyan dalam konteks yang sama.

### Tertiary (Status Semantic)
- **Success Green** (#00ff88 / oklch(0.82 0.25 163)): Status Active, kategori Ready, indikator OK, badge production.
- **Warning Amber** (#ffaa00 / oklch(0.77 0.18 72)): Kategori Ideas, unlisted repo, rate limit warning, paused state.
- **Danger Red** (#ff0040 / oklch(0.52 0.28 32)): Alert, error, glitch overlay, tombol close/danger, badge legacy danger.
- **Glitch Blue** (#0066ff): Glitch artifact, penggunaan sangat terbatas.

### Neutral
- **Deepest Background** (#050508 / oklch(0.03 0.01 260)): Body, app root, boot overlay. Hampir hitam murni, dengan sedikit sentuhan biru.
- **Secondary Surface** (#0a0a14 / oklch(0.05 0.015 260)): Sidebar, panel detail — satu langkah lebih terang dari background.
- **Card Surface** (#0d0d1a / oklch(0.06 0.02 260)): Feed cards, form, komponen yang perlu naik satu level.
- **Card Hover** (#12122a / oklch(0.08 0.025 260)): Hover state untuk card dan surface interaktif.
- **Border Default** (#1a1a3a / oklch(0.1 0.04 260)): Semua border — pemisah permukaan flat.
- **Primary Text** (#e8e8f0 / oklch(0.85 0.02 260)): Heading, nama proyek, label utama.
- **Secondary Text** (#8888aa / oklch(0.6 0.04 260)): Konten sekunder, metadata, tombol default.
- **Muted Text** (#55557a / oklch(0.4 0.04 260)): Label kecil, placeholder, submuted, caption.

### The Dim Theme
Varian kedua (`[data-theme="dim"]`) menaikkan nilai L pada semua warna background (~+0.06–0.10) dan menurunkan saturasi aksen. Ini opsi "lebih terang" untuk kenyamanan mata — tanpa meninggalkan karakter dark. Semua variable name sama; hanya nilai yang berubah.

### Semantic Text Tokens
Selain variable warna utama, ada token semantik untuk pewarnaan teks spesifik:
- **Text Detail** (`--text-detail` / #b0b0d0): Teks konten di panel detail — deskripsi, paragraf, list items, recommendation cards. Satu level di atas text-muted untuk keterbacaan.
- **Text Bright** (`--text-bright` / #f0f0f8): Judul card dan heading penting — feed card nama proyek, detail panel nama proyek, release card title. Hampir putih dengan sedikit sentuhan biru.
- **Text Topic** (`--text-topic` / #bb88ee): Tag GitHub topic — dibedakan dari tag biasa untuk menunjukkan asal dari GitHub topics API.
- **Text Warn** (`--text-warn` / #ffbb33): Teks peringatan — toast warn, auto-detected badge, paused status.

### Background Tokens
- **Chip Background** (`--chip-bg` / rgba(80,80,160,0.15)): Background default untuk tag dan chip element.
- **Chip Border** (`--chip-border` / rgba(80,80,160,0.2)): Border untuk tag biasa.
- **Topic Background** (`--topic-bg` / rgba(176,0,255,0.1)): Background untuk GitHub topic tag.
- **Topic Border** (`--topic-border` / rgba(176,0,255,0.25)): Border untuk GitHub topic tag.

### Named Rules
**The Rarity Rule.** Neon Cyan digunakan pada ≤10% dari setiap layar. Kelangkaannya adalah inti kekuatannya — jika cyan ada di mana-mana, tidak ada yang menonjol.

**The Glow Rule.** Glow hanya muncul pada elemen stateful: indikator aktif, pulse clock, hover action, alert. Tidak ada glow dekoratif. Setiap glow punya alasan.

## 3. Typography

**Display Font:** Orbitron (sans-serif geometric, letter-spacing long)
**Body Font:** Inter (sans-serif humanist)
**UI/Mono Font:** JetBrains Mono (monospace coding, ligatures)
**Utility Font:** Rajdhani (semi-condensed sans, dense metric readouts)

**Character:** Empat keluarga font dengan kontras yang jelas — Orbitron untuk identitas display yang futuristik, JetBrains Mono untuk seluruh antarmuka fungsional (memberikan nuansa terminal/developer), Inter hanya untuk konten prosa yang membutuhkan keterbacaan lebih panjang, dan Rajdhani sebagai opsi semi-condensed untuk dense metric readouts. Keputusan tidak konvensional untuk dashboard, dan itu disengaja: Niu-Dash bukan dashboard biasa.

### Hierarchy
- **Display** (Orbitron 800, clamp(24px, 4vw, 28px), 1.1, -0.04em): Judul halaman, logo sidebar. Hanya 1-2 elemen per layar.
- **Headline** (Orbitron 800, 16px/14px, 1, -0.03em): Angka statistik besar, logo feed. Sangat jarang.
- **Title** (JetBrains Mono 700, 12–14px, 1.3): Nama proyek di card, judul di detail panel. Elemen label terpenting.
- **Body** (Inter 400, 11–12px, 1.7): Deskripsi proyek, paragraf konten di detail panel. Max line length ~65ch.
- **Label** (JetBrains Mono 600, 7–10px, 1.2, 0.05–0.1em, uppercase): Tombol, status badge, tag, metadata, statistik, section header. Elemen UI yang paling sering dilihat.
- **Utility** (Rajdhani 500, 11–14px, 1.1): Aksesori teks semi-condensed — versi number, metrik padat, konten yang perlu displai padat dalam ruang sempit. Dapat diakses via class `.font-rajdhani`.

### Named Rules
**The Monospace UI Rule.** Semua antarmuka fungsional menggunakan JetBrains Mono — sidebar, card, tombol, tag, stats, toast. Inter hanya untuk blok prosa di detail panel. Ini membedakan Niu-Dash dari dashboard lain yang menggunakan sans-serif untuk UI.

**The No-Headline-Overshoot Rule.** Heading display tidak pernah melebihi 28px pada desktop dan 22px pada mobile. Dashboard tidak perlu berteriak — informasi adalah produknya.

## 4. Elevation

Sistem ini menggunakan pemisahan border ketimbang shadow untuk hierarki permukaan. Semua permukaan flat secara default — depth dikomunikasikan melalui luminance contrast, bukan bayangan.

**Border-Separated:** Setiap permukaan (sidebar, card, panel, form) dipisahkan oleh border 1px solid #1a1a3a. Tidak ada permukaan yang saling tumpang tindih; semuanya berdampingan dalam satu bidang.

**Glow sebagai Depth Signal:** Saat elemen berinteraksi, glow muncul sebagai pengganti shadow — hover feed-card mendapat translateY(-2px) + box-shadow cyan glow, bukan drop shadow. Indikator status (clock pulse, token status, sync dot) menggunakan glow sebagai isyarat state, bukan depth.

**Tagline: "Flat at rest, glow on response."**

### Named Rules
**The Flat-By-Default Rule.** Tidak ada box-shadow pada keadaan diam. Card, sidebar, panel — semuanya flat. Depth hanya muncul sebagai respons terhadap interaksi (hover, active, selected).

**The No-Layered-Modal Rule.** Form relis (rl-form-overlay) adalah satu-satunya overlay bertingkat. Tidak ada nested dialog, tooltip, atau popover yang bertumpuk. Setiap lapisan baru adalah pertimbangan serius.

## 5. Components

### Buttons
- **Shape:** Ujung tegas persegi dengan radius kecil (8px default, 6px untuk status, 7px untuk action). Tidak ada pill shape.
- **Primary (Nav):** Background card-surface (#0d0d1a), border 1px solid #1a1a3a, text secondary (#8888aa), padding 10px 14px. Hover: border neon-cyan 20%, text cyan. Active: border neon-cyan solid, text cyan, bg cyan 10%.
- **Action (CTA):** Background cyan 8%, border cyan 25%, text cyan, padding 8px 20px. Hover: bg cyan 18%, glow-box-cyan, translateY(-1px).
- **Ghost (Toggle):** Transparent background, border 1px solid #1a1a3a, text secondary, 30×28px square. Hover: border cyan, bg cyan 8%, text cyan.
- **Spring Utility:** Transform transition dengan cubic-bezier(0.175, 0.885, 0.32, 1.275) — hover scale(1.05), active scale(0.95). Hanya untuk tombol aksi.

### Chips / Tags
- **Style:** Background rgba(80,80,160,0.15), text #9090b8, border 1px solid rgba(80,80,160,0.2), radius 4px, padding 2px 8px. Font JetBrains Mono 9px.
- **Topic Tag (gh-topic):** Background rgba(176,0,255,0.1), text #bb88ee, border rgba(176,0,255,0.25) — dibedakan untuk tag dari GitHub topics.
- **Tag Filter (interactive):** Lebih besar (padding 3px 10px), radius 8px. Active state: bg cyan 12%, border cyan solid, text cyan.
- **Hover:** Semua tag mendapatkan hover treatment cyan — konsisten dengan sistem interaksi.

### Cards / Feed Cards
- **Corner Style:** Radius 12px — membedakan card dari elemen UI lainnya.
- **Background:** Linear-gradient(145deg, rgba(18,18,38,0.92), rgba(12,12,28,0.85)).
- **Border:** 1px solid #1a1a3a.
- **Shadow Strategy:** Tidak ada shadow diam. Hover: translateY(-2px), border berubah ke neon-cyan 15%, glow-box-cyan.
- **Selected State:** Background cyan 6%, border cyan solid, glow-box-cyan.
- **Internal Padding:** 16px 20px.
- **Category Strip:** Left border 3px berwarna sesuai kategori (green/cyan/amber/magenta/muted).
- **Entry Animation:** cardFade — opacity 0→1, translateY(12px→0), 0.4s ease.

### Inputs / Fields
- **Style:** Background rgba(13,13,26,0.8), border 1px solid #1a1a3a, radius 8px. Font JetBrains Mono 12px.
- **Focus:** Border neon-cyan solid, box-shadow cyan glow 0 0 20px rgba(0,255,242,0.15).
- **Placeholder:** #55557a (text-muted) — kontras cukup untuk terbaca, tidak terlalu terang.
- **Form Select:** Sama dengan input, arrow bawaan browser dipertahankan.

### Status Badges
- **Active:** Background rgba(0,255,136,0.12), text success-green, border 1px solid rgba(0,255,136,0.25), radius 4px.
- **Staging:** Background rgba(0,255,242,0.12), text neon-cyan, border rgba(0,255,242,0.2).
- **Paused:** Background rgba(255,255,0,0.08), text #ffd000, border rgba(255,255,0,0.15).
- **Released Badge:** Production: green scheme; Completed: cyan scheme.
- **Font:** JetBrains Mono 8–9px, uppercase, letter-spacing 0.8px, weight 600.

### Navigation (Sidebar)
- **Style:** Fixed sidebar 260px lebar, background rgba(8,8,20,0.97), border-right 1px solid #1a1a3a.
- **Section Headers:** JetBrains Mono 9px, text-muted, uppercase, letter-spacing 2px.
- **Nav Buttons:** Seperti button-primary di atas, dengan tambahan badge counter di kanan.
- **Category Badges:** Warna badge mengikuti warna kategori (green/cyan/amber/purple/dim).
- **Mobile:** Sidebar slide-in dengan transform translateX, overlay semi-transparan di belakang.

### Detail Panel
- **Style:** Fixed panel 380px lebar (100vw di mobile), background rgba(8,8,20,0.95), border-left 1px solid #1a1a3a.
- **Header:** Sticky, backdrop-filter blur(12px), border-bottom.
- **Timeline:** Gradient vertical line cyan-to-transparent, dot indicators untuk setiap entry.
- **Recommendations:** Cards dengan top border warna prioritas (red=high, magenta=mid, cyan=low).

### Scrollbar (Custom)
- **Width:** 4px.
- **Track:** Transparent.
- **Thumb:** rgba(0,255,242,0.15), radius 2px. Hover: opacity 0.3.

### Boot Overlay
- **Style:** Fullscreen fixed overlay z-index var(--z-boot), background deepest.
- **Sequence:** Logo (Orbitron 32px 900, cyan + amber bolt), gradient underline, progress bar (linear-gradient cyan→magenta), status text (JetBrains Mono 11px muted).
- **Transition:** Fade out (opacity/visibility) 0.8s after load complete.
- **Glitch Effect:** Hover-triggered glitch text overlay pada logo (translasi acak setiap frame, opacity 0.15).

### Toast
- **Style:** Fixed bottom-right stack, JetBrains Mono 11px, radius 6px, backdrop-filter blur(8px), border 1px solid.
- **Colors:** Error (red bg 15%, text #ff4466), Warn (amber bg 12%, text #ffbb33), Success (green bg 10%, text #00ff88), Info (cyan bg 10%, text neon-cyan).
- **Animation:** toast-in (opacity 0→1, translateY 20px→0) 0.3s ease; toast-out kebalikannya.

## 6. Do's and Don'ts

### Do:
- **Do** gunakan Neon Cyan (#00fff2) secara hemat — ≤10% permukaan. Biarkan kegelapan yang bicara.
- **Do** gunakan JetBrains Mono untuk semua elemen UI fungsional — sidebar, tombol, tag, stats.
- **Do** gunakan border 1px solid #1a1a3a sebagai pemisah permukaan — flat dan bersih.
- **Do** gunakan cardFade animation (opacity + translateY) untuk entry card — konsisten dan halus.
- **Do** gunakan spring curve cubic-bezier(0.175, 0.885, 0.32, 1.275) untuk tombol aksi — responsif.
- **Do** pertahankan konsistensi hover → neon-cyan di semua elemen interaktif.
- **Do** gunakan semantic color untuk kategori (green=ready, cyan=dev, amber=ideas, magenta=config, muted=legacy).
- **Do** pastikan setiap efek glitch/neon punya alasan fungsional — boot sequence, status indication, atmospheric depth.

### Don't:
- **Don't** gunakan box-shadow pada permukaan diam — flat by default.
- **Don't** gunakan gradient text (`background-clip: text`) — satu warna solid untuk keterbacaan.
- **Don't** tampilkan Generic SaaS dashboard elements — rounded-full buttons, card shadows, muted blue navbars, Bootstrap-style form controls.
- **Don't** buat dashboard yang terlihat seperti Linear, Notion, atau Stripe — ini stasiun komando, bukan productivity startup.
- **Don't** gunakan warna biru/navy korporat sebagai tema — ini dark/cyber/glitch, bukan enterprise dashboard.
- **Don't** overused cards — card adalah pilihan termalas. Gunakan card grid yang identik hanya saat benar-benar tepat.
- **Don't** gunakan side-stripe borders (border-left/right > 1px sebagai aksen) — gunakan full border, full background tint, atau tidak sama sekali. Satu-satunya pengecualian: category strip (3px) pada feed card.
- **Don't** tambahkan glassmorphism dekoratif — backdrop-filter hanya untuk header sticky dan toast.
- **Don't** gunakan font display (Orbitron) untuk elemen UI fungsional — hanya untuk identitas (logo, page title).
- **Don't** gunakan scrollbar non-default di luar yang sudah ditentukan — 4px cyan thumb saja.
- **Don't** animasi layout properti (width, height, top, left) — gunakan transform/opacity untuk performa.
