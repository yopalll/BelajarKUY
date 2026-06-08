# 📚 BelajarKUY — Dokumentasi Proyek (Master Index)

> **Project:** BelajarKUY — Platform E-Learning Indonesia (Udemy Clone)
> **Tech Stack:** Laravel `^13.7` + React `^19.2.6` (Inertia `@inertiajs/react ^3.3.0`) + MySQL/SQLite + Midtrans Sandbox + TailwindCSS `^3.1.0` + Cloudinary + Meilisearch + Laravel Reverb + Resend
> **Team:** 5 Anggota | **Deadline:** Tugas Besar Kuliah
> **Created:** 12 Mei 2026 | **Last Updated:** 31 Mei 2026

---

## 🎯 Quick Start untuk AI Agent / Developer Baru

**Wajib baca urutan ini:**

1. **`01_guides/AGENT_GUIDELINES.md`** — System prompt utama (v2.0)
2. **`01_guides/GLOSSARY.md`** — Terminologi (prevents ambiguity)
3. **`02_architecture/DATABASE_SCHEMA.md`** — Schema v2 canonical
4. **`02_architecture/ADR/`** — Architecture Decision Records
5. File spesifik feature di `03_features/` sesuai task

**Setelah itu:**
- Setup: `01_guides/SETUP_GUIDE.md`
- Git workflow: `01_guides/GIT_WORKFLOW.md`
- Coding style: `01_guides/CODING_STANDARDS.md`

---

## 🗂️ Struktur Folder Dokumentasi

```
BelajarKUY_docs/
│
├── 00_INDEX.md                          ← KAMU DI SINI
├── CHANGELOG.md                         ← 🆕 Log perubahan dokumentasi
│
├── 01_guides/                           📖 Panduan & Standards
│   ├── AGENT_GUIDELINES.md              ⭐ System prompt — WAJIB BACA
│   ├── GLOSSARY.md                      🆕 Terminologi (student/user, paid/enrolled, dll)
│   ├── SETUP_GUIDE.md                   Setup project dari nol
│   ├── GIT_WORKFLOW.md                  Branching & commit convention (simplified v2)
│   ├── CODING_STANDARDS.md              Konvensi kode Laravel ^13.7 + React/Inertia
│   ├── SECURITY_GUIDELINES.md           🆕 Security checklist
│   ├── TESTING_STRATEGY.md              🆕 Testing pyramid + patterns
│   └── UI_UX_GUIDELINES.md              Design workflow
│
├── 02_architecture/                     🏗️ Architecture & Design
│   ├── TECH_STACK.md                    Detail tech stack & versi (React+Inertia)
│   ├── REACT_INERTIA_BENEFITS.md        🆕 Keunggulan adopsi React + Inertia
│   ├── DATABASE_SCHEMA.md               ⭐ Schema v2 canonical (19 tabel)
│   ├── FOLDER_STRUCTURE.md              Struktur folder Laravel + resources/js
│   ├── API_ROUTES.md                    Semua routes & endpoint
│   └── ADR/                             🆕 Architecture Decision Records
│       ├── README.md                    Index ADR
│       ├── ADR-001-midtrans-payment-gateway.md
│       ├── ADR-002-frontend-blade-not-livewire.md   (⛔ Superseded by ADR-008)
│       ├── ADR-003-denormalized-instructor-in-orders.md
│       ├── ADR-004-sandbox-only-midtrans.md
│       ├── ADR-005-payout-out-of-scope.md
│       ├── ADR-006-instructor-auto-active.md
│       ├── ADR-007-role-naming.md
│       └── ADR-008-frontend-react-inertia.md        🆕 Adopsi React + Inertia
│
├── 03_features/                         🎁 Feature Specs
│   ├── F01_AUTH_SYSTEM.md               Register, Login, Multi-role, Google OAuth
│   ├── F02_LANDING_PAGE.md              Homepage, Slider, Info Boxes
│   ├── F03_COURSE_MANAGEMENT.md         CRUD Course (Instructor)
│   ├── F04_CATEGORY_SYSTEM.md           Kategori & Sub-kategori
│   ├── F05_CART_WISHLIST.md             Keranjang & Wishlist (Schema v2 aligned)
│   ├── F06_PAYMENT_MIDTRANS.md          Integrasi Midtrans Snap + auto-enrollment
│   ├── F07_ADMIN_PANEL.md               Admin Dashboard (scope: ADR-005, ADR-006)
│   ├── F08_INSTRUCTOR_PANEL.md          Instructor Dashboard
│   ├── F09_STUDENT_PANEL.md             Student Dashboard + links ke Course Player
│   ├── F10_REVIEW_RATING.md             Sistem Review & Rating
│   ├── F11_COUPON_SYSTEM.md             Kupon (Schema v2 aligned)
│   ├── F12_SITE_SETTINGS.md             Site settings (DB-backed only)
│   ├── F13_COURSE_PLAYER.md             🆕 Watch page + progress tracking
│   └── F14_NOTIFICATIONS.md             🆕 Email + real-time events
│
├── 04_plans/                            📅 Rencana Migrasi React + Inertia
│   ├── MASTER_PLAN_REACT_INERTIA.md     Master plan migrasi Blade → React+Inertia
│   ├── DOCS_UPDATE_PLAN_REACT_INERTIA.md Rencana pembaruan seluruh dokumentasi
│   ├── SCREEN_MAPPING_STITCH_REACT.md   Peta layar Stitch → halaman React
│   ├── MIGRATION_SCHEDULE_REACT_INERTIA.md Jadwal & push per bagian (per anggota)
│   └── URUTAN_KERJA_TIM_REACT_INERTIA.md Estafet langkah demi langkah (untuk diajarkan ke tim)
│
└── 07_extras/                           🎁 Extras & References
    ├── ERD_BelajarKUY.html              Visual ERD (HTML)
    └── TECH_STACK_EXTRAS.md             Additional tech details (Alpine, Reverb, dll)
```

> **Catatan cleanup (2026-06-07):** folder `05_prompts/` (prompt sekali-pakai), `06_reports/` (log progres bertanggal), serta plan v1 `MASTER_ROADMAP`/`SPRINT_PLAN`/`TASK_DISTRIBUTION` & `07_extras/AUDIT_DOCS_REVIEW.md` telah **dihapus** sebagai artefak v1 yang tak relevan. Lihat `docs/final-audit/05_CLEANUP_DOKUMENTASI.md`.

---

## 👥 Tim Pengembang

| # | Nama | Role | Tanggung Jawab Utama |
|---|------|------|---------------------|
| 1 | **Yosua Valentino** | Project Manager | Arsitektur, DB, integrasi, code review |
| 2 | **Albariqi Tarigan** | Backend Developer | Auth, course management, course player |
| 3 | **Ray Nathan** | Backend Developer | Payment (Midtrans), cart, wishlist, coupon |
| 4 | **Vascha U** | Frontend Developer | Landing page, course detail, student panel |
| 5 | **Quinsha Ilmi** | UI/UX Developer | Admin panel, frontend components, UI/UX |

---

## 📈 Current Status

> Status fitur jauh lebih maju dari catatan v1 (yang lama menyebut "~20%"). Semua modul inti (auth, commerce/Midtrans, admin/instructor/student panel React+Inertia) sudah ada. Untuk kondisi bug & yang perlu dibereskan terkini, lihat **`docs/final-audit/`** (2026-06-07) dan `LAPORAN_AUDIT/` (2026-06-06).

---

## ⚠️ ATURAN PENTING

1. **SELALU** baca `AGENT_GUIDELINES.md` sebelum mulai coding
2. **SELALU** baca `GLOSSARY.md` untuk terminologi yang ambigu
3. **JANGAN** modifikasi migration yang sudah dibuat tanpa persetujuan PM
4. **JANGAN** pakai Stripe — SELALU Midtrans Sandbox (ADR-001, ADR-004)
5. **JANGAN** upload ke `public/uploads/` — SELALU Cloudinary
6. **JANGAN** cek enrollment via `Order::where(...)` — pakai `Enrollment` table
7. **SELALU** commit sesuai Conventional Commits: `feat(module): ...`
8. **JANGAN** push ke `main` langsung — selalu via feature branch + PR
9. **JANGAN** bikin desain UI sendiri — selalu dari `BelajarKuy_Design_Revisi/.../code.html`
10. **SELALU** `npm run build` setelah menambah/ubah `resources/js/Pages/*.jsx`

---

## 🔗 Quick Links

- [📖 Glossary](./01_guides/GLOSSARY.md) — Terminology dictionary
- [🛡️ Security Guidelines](./01_guides/SECURITY_GUIDELINES.md) — Security checklist
- [🧪 Testing Strategy](./01_guides/TESTING_STRATEGY.md) — Testing patterns
- [🏛️ ADR Index](./02_architecture/ADR/README.md) — Decision records
- [🏛️ ADR-008](./02_architecture/ADR/ADR-008-frontend-react-inertia.md) — Adopsi React + Inertia (supersede ADR-002)
- [🚀 Master Plan React+Inertia](./04_plans/MASTER_PLAN_REACT_INERTIA.md) — Migrasi frontend bertahap
- [🧭 Urutan Kerja Tim](./04_plans/URUTAN_KERJA_TIM_REACT_INERTIA.md) — Estafet langkah demi langkah (siapa mulai dari mana)
- [🚀 React+Inertia Benefits](./02_architecture/REACT_INERTIA_BENEFITS.md) — Justifikasi adopsi
- [🗂️ Docs Update Plan](./04_plans/DOCS_UPDATE_PLAN_REACT_INERTIA.md) — Rencana pembaruan dokumentasi
- [🖼️ Screen Mapping](./04_plans/SCREEN_MAPPING_STITCH_REACT.md) — Layar Stitch → halaman React
- [🗃️ Database Schema](./02_architecture/DATABASE_SCHEMA.md) — v2 canonical
- [🎬 Course Player Spec](./03_features/F13_COURSE_PLAYER.md) — Core LMS feature
- [📢 Notifications Spec](./03_features/F14_NOTIFICATIONS.md) — Mail + real-time
- [📜 Changelog](./CHANGELOG.md) — Docs changelog

---

*Single source of truth untuk seluruh development BelajarKUY.*
