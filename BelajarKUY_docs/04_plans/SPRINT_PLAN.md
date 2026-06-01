# 📅 BelajarKUY — Sprint Plan

> Breakdown sprint mingguan.

---

## Sprint 1 (Hari 1-7): Foundation & Auth

### Goals:
- ✅ Project Laravel `^13.7` (+ React/Inertia) tersetup dan bisa diakses
- ✅ Semua tabel database ter-migrate
- ✅ Semua model ter-create
- ✅ Auth system berfungsi (login/register/role)
- ✅ Landing page dasar tampil

### Tasks:

| Task | PIC | Status |
|------|-----|--------|
| Init Laravel `^13.7` + Breeze | Yosua | ☐ |
| Setup TailwindCSS + Vite + React/Inertia | Yosua | ☐ |
| Create all migrations | Yosua | ☐ |
| Create all models | Yosua | ☐ |
| Create seeders | Yosua | ☐ |
| Implement RoleMiddleware | Albariqi | ☐ |
| Customize register (role selection) | Albariqi | ☐ |
| Post-login redirect by role | Albariqi | ☐ |
| Google OAuth setup | Albariqi | ☐ |
| Root view Inertia (`app.blade.php`) + entry `app.jsx` | Vascha & Quinsha | ☐ |
| Navbar component (React, `Components/AppHeader.jsx`) | Vascha & Quinsha | ☐ |
| Footer component (React) | Vascha & Quinsha | ☐ |
| Landing page (basic) — `Pages/Welcome.jsx` | Vascha & Quinsha | ☐ |

### Definition of Done:
- `php artisan migrate` berhasil tanpa error
- Login/register berfungsi untuk semua 3 role
- Landing page tampil di localhost:8000

---

## Sprint 2 (Hari 8-14): Core Features

### Goals:
- ✅ Course CRUD oleh instructor berfungsi
- ✅ Category/SubCategory CRUD oleh admin berfungsi
- ✅ Landing page lengkap dengan semua section
- ✅ Course detail page berfungsi

### Tasks:

| Task | PIC | Status |
|------|-----|--------|
| Course CRUD controller | Albariqi | ☐ |
| Course form views | Albariqi | ☐ |
| Section & Lecture CRUD | Albariqi | ☐ |
| Category CRUD (admin) | Quinsha & Vascha | ☐ |
| SubCategory CRUD (admin) | Quinsha & Vascha | ☐ |
| Admin layout + dashboard | Quinsha & Vascha | ☐ |
| Course card component | Vascha & Quinsha | ☐ |
| Hero slider section | Vascha & Quinsha | ☐ |
| Featured courses section | Vascha & Quinsha | ☐ |
| Course detail page | Vascha & Quinsha | ☐ |
| Cart add/remove (AJAX) | Ray | ☐ |
| Wishlist add/remove (AJAX) | Ray | ☐ |

### Definition of Done:
- Instructor bisa create, edit, delete course + sections + lectures
- Admin bisa manage categories
- Landing page menampilkan data real dari database
- Cart dan wishlist berfungsi

---

## Sprint 3 (Hari 15-21): Commerce & Panels

### Goals:
- ✅ Payment Midtrans berfungsi (sandbox)
- ✅ Order system lengkap
- ✅ Admin panel lengkap
- ✅ Student dashboard berfungsi

### Tasks:

| Task | PIC | Status |
|------|-----|--------|
| Cart page UI | Ray | ☐ |
| Checkout page | Ray | ☐ |
| Midtrans integration | Ray | ☐ |
| Payment callback handler | Ray | ☐ |
| Order creation | Ray | ☐ |
| Coupon system | Ray | ☐ |
| Admin course management | Quinsha & Vascha | ☐ |
| Admin order management | Quinsha & Vascha | ☐ |
| Admin instructor management | Quinsha & Vascha | ☐ |
| Admin user management | Quinsha & Vascha | ☐ |
| Student dashboard | Vascha & Quinsha | ☐ |
| Student enrolled courses | Vascha & Quinsha | ☐ |
| Instructor dashboard | Albariqi | ☐ |

### Definition of Done:
- Payment flow end-to-end berfungsi di sandbox
- Admin bisa manage semua entity
- Student bisa lihat kursus yang sudah dibeli

---

## Sprint 4 (Hari 22-30): Polish & Deploy

### Goals:
- ✅ Review system berfungsi
- ✅ Site settings lengkap
- ✅ UI responsive di mobile
- ✅ Bug fixes done
- ✅ Siap presentasi

### Tasks:

| Task | PIC | Status |
|------|-----|--------|
| Review & rating system | Quinsha & Vascha | ☐ |
| Admin review management | Quinsha & Vascha | ☐ |
| Site settings CRUD | Quinsha & Vascha | ☐ |
| Settings pages (SMTP, Midtrans, Google) | Quinsha & Vascha | ☐ |
| Slider/InfoBox/Partner CRUD | Quinsha & Vascha | ☐ |
| Responsive testing & fix | Vascha & Quinsha | ☐ |
| Profile pages semua role | Albariqi + Vascha | ☐ |
| Bug fixing | ALL | ☐ |
| Performance check | Yosua | ☐ |
| Final testing | ALL | ☐ |
| README + documentation | Yosua | ☐ |
| Demo preparation | ALL | ☐ |

### Definition of Done:
- SEMUA fitur berfungsi tanpa error fatal
- UI bersih dan responsive
- Payment Midtrans tested end-to-end
- Siap dipresentasikan

---

## 🚀 Sprint Migrasi Frontend React + Inertia (ADR-008)

> Tiga sprint **berurutan**, selaras dengan fase di `MASTER_PLAN_REACT_INERTIA.md` & `MASTER_ROADMAP.md` (Phase 6). Backend tidak berubah; hanya respons presentasi controller (`view` → `Inertia::render`).

### Sprint M1 — Fase 1: Fondasi & Halaman Publik
**Goal:** shell Inertia aktif + halaman publik (`welcome`, `home`, `course.detail`) jalan di React.
**Exit criteria (DoD):** semua route publik me-render via `Inertia::render`; **0** referensi `@extends` pada halaman publik; smoke test manual lulus.

### Sprint M2 — Fase 2: Autentikasi & Panel Student
**Goal:** auth (Breeze) + panel Student pindah ke React.
**Exit criteria (DoD):** login/registrasi/verifikasi berjalan via halaman React (`Pages/Auth/*`); dashboard & my-courses Student tampil dari `resources/js/Pages/Student/*`.

### Sprint M3 — Fase 3: Panel Instructor & Admin
**Goal:** panel Instructor & Admin pindah ke React.
**Exit criteria (DoD):** seluruh route `admin.*` & `instructor.*` me-render React; jumlah `.blade.php` presentasi yang masih dirujuk router = **0** (di luar root view `app.blade.php` & email).

---

*Update status (☐ → 🔄 → ✅) setelah setiap sesi kerja.*
