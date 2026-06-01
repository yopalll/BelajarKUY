# 🗂️ BelajarKUY — Rencana Pembaruan Seluruh Set Dokumentasi (Blade → React + Inertia)

> **Deliverable:** D3 (`Rencana_Update_Dok`) untuk fitur `react-inertia-redesign`.
> **Tujuan:** Memetakan **setiap berkas dan folder** pada `Set_Dokumentasi` (`BelajarKUY_docs/`) ke tepat satu `Status_Tindakan` ∈ {`Update`, `Supersede`, `New`, `No-Change`}, lengkap dengan alasan dan instruksi perbaikan, agar seluruh dokumentasi selaras dengan `Kode_Nyata` sebagai sumber kebenaran setelah adopsi React + Inertia.
> **Tanggal:** 31 Mei 2026 · **Pemilik:** Yosua (PM)
>
> **Sumber kebenaran nilai:** `.kiro/specs/react-inertia-redesign/verified-facts.md` (versi dependensi, route, prop Inertia, dan inventaris `Set_Dokumentasi`). Seluruh angka versi pada dokumen ini dikutip **verbatim** dari `composer.json`/`package.json` via `verified-facts.md`, **bukan** dari dokumen lama.
>
> **Catatan scope (R7):** Dokumen ini hanya merencanakan pembaruan berkas Markdown. Tidak ada perubahan model, route, controller, request validation, middleware peran, skema database, atau integrasi (Midtrans/Cloudinary/Reverb/Meilisearch/Socialite). Lihat [`MASTER_PLAN_REACT_INERTIA.md`](./MASTER_PLAN_REACT_INERTIA.md) untuk strategi migrasi dan [`SCREEN_MAPPING_STITCH_REACT.md`](./SCREEN_MAPPING_STITCH_REACT.md) untuk pemetaan layar.

---

## Daftar Isi

1. [Tabel Registry Master](#1-tabel-registry-master) — setiap berkas & folder `Set_Dokumentasi` tepat satu kali (R3.2)
2. [Detail per Status_Tindakan](#2-detail-per-status_tindakan) (R3.3–R3.6)
3. [Konflik Blade vs Inertia & Tabel Ketidaksesuaian Versi/Teknologi](#3-konflik-blade-vs-inertia--tabel-ketidaksesuaian-versiteknologi) (R3.7, R3.8, R8.7)
4. [Penugasan Pembaruan Spesifik R6](#4-penugasan-pembaruan-spesifik-r6) (R6.1–R6.9)
5. [Tabel Koreksi Atribut/Sintaks & Rujukan Tak Valid](#5-tabel-koreksi-atributsintaks--rujukan-tak-valid) (R8.6, R8.8)
6. [Validasi Kelengkapan Registry (V2 & V3)](#6-validasi-kelengkapan-registry-v2--v3) (R3.2, R8.1, R8.7)

---

## 1. Tabel Registry Master

> **Invarian (R3.2):** setiap berkas dan folder pada `Set_Dokumentasi` muncul **tepat satu kali**. Total = **70 baris** = **8 folder** + **62 berkas** (57 berkas yang sudah ada + 5 deliverable baru fitur ini). `Tipe` ∈ {`file`, `folder`}.
>
> Inventaris acuan: `verified-facts.md` §6. Lima deliverable baru (D1, D2, D3, D4, D5) kini berada di bawah `BelajarKUY_docs/` sehingga ikut tercatat sebagai item `Set_Dokumentasi` berstatus `New`.

| # | Path (relatif `BelajarKUY_docs/`) | Tipe | Status_Tindakan | Ringkasan Alasan |
|---|---|---|---|---|
| 1 | `00_INDEX.md` | file | **Update** | Tech stack & indeks menyebut Laravel 12, Tailwind v4, Alpine, Filament v5; harus selaras React+Inertia + daftar dokumen baru + status `ADR-002` (R6.7) |
| 2 | `CHANGELOG.md` | file | **Update** | Tambah entri migrasi React+Inertia, adopsi `ADR-008` (supersede `ADR-002`), koreksi tech stack (R6.8) |
| 3 | `PRD_BelajarKUY.md` | file | **Update** | Tech stack PRD: Laravel 12, Filament v5, Blade+Tailwind v4+Alpine — tidak sesuai `Kode_Nyata`; frontend menjadi React+Inertia, Filament dihapus |
| 4 | `01_guides/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 5 | `01_guides/AGENT_GUIDELINES.md` | file | **Update** | Menyebut "Laravel 12" & "Admin Panel: Custom Blade"; selaraskan ke Laravel `^13.7` + admin React+Inertia |
| 6 | `01_guides/CODING_STANDARDS.md` | file | **Update** | Judul "Coding Standards (Laravel 12)" stale; tambah konvensi komponen React/JSX + Inertia |
| 7 | `01_guides/GIT_WORKFLOW.md` | file | No-Change | Proses Git agnostik terhadap stack; tetap akurat |
| 8 | `01_guides/GLOSSARY.md` | file | No-Change | Terminologi peran `user`/`instructor`/`admin` tetap akurat (sumber R8.2) |
| 9 | `01_guides/SECURITY_GUIDELINES.md` | file | No-Change | Panduan keamanan backend/umum (validasi, authz, CSRF) tetap berlaku; tanpa fakta versi stale |
| 10 | `01_guides/SETUP_GUIDE.md` | file | **Update** | Tambah langkah setup React+Inertia (3 bagian) sesuai `Kode_Nyata` (R6.2) |
| 11 | `01_guides/TESTING_STRATEGY.md` | file | **Update** | "Pest (default Laravel 12)" stale → Laravel `^13.7` |
| 12 | `01_guides/UI_UX_GUIDELINES.md` | file | **Update** | Workflow "Laravel 12 + TailwindCSS v4 + Alpine.js" → alur komponen React; pertahankan Konteks_A/B (R6.4) |
| 13 | `02_architecture/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 14 | `02_architecture/API_ROUTES.md` | file | No-Change | Route backend dipertahankan utuh; dokumen tetap akurat terhadap `routes/*.php` |
| 15 | `02_architecture/DATABASE_SCHEMA.md` | file | No-Change | Skema DB tidak berubah (scope presentasi saja); tetap akurat |
| 16 | `02_architecture/FOLDER_STRUCTURE.md` | file | **Update** | Tambah `resources/js/Pages`, `resources/js/Components`, root view `app` (R6.3) |
| 17 | `02_architecture/TECH_STACK.md` | file | **Update** | Sumber utama inkonsistensi versi/teknologi (Laravel 12, Filament v5, Tailwind v4, paket Cloudinary salah) (R6.1) |
| 18 | `02_architecture/ADR/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 19 | `02_architecture/ADR/README.md` | file | **Update** | Tambah baris indeks `ADR-008`; ubah Status `ADR-002` → `Superseded by ADR-008` (R5.5/D7) |
| 20 | `02_architecture/ADR/ADR-001-midtrans-payment-gateway.md` | file | No-Change | ADR immutable & akurat (Midtrans tetap dipakai) |
| 21 | `02_architecture/ADR/ADR-002-frontend-blade-not-livewire.md` | file | **Supersede** | Di-supersede oleh `ADR-008`; field Status diperbarui (D6) |
| 22 | `02_architecture/ADR/ADR-003-denormalized-instructor-in-orders.md` | file | No-Change | Keputusan skema backend; tetap berlaku |
| 23 | `02_architecture/ADR/ADR-004-sandbox-only-midtrans.md` | file | No-Change | Keputusan integrasi Midtrans; tetap berlaku |
| 24 | `02_architecture/ADR/ADR-005-payout-out-of-scope.md` | file | No-Change | Keputusan scope; tetap berlaku |
| 25 | `02_architecture/ADR/ADR-006-instructor-auto-active.md` | file | No-Change | Keputusan domain; tetap berlaku |
| 26 | `02_architecture/ADR/ADR-007-role-naming.md` | file | No-Change | Penamaan peran (user/student) tetap berlaku & selaras R8.2 |
| 27 | `02_architecture/REACT_INERTIA_BENEFITS.md` | file | **New** | D2 — dokumen keunggulan React+Inertia (R2) |
| 28 | `02_architecture/ADR/ADR-008-frontend-react-inertia.md` | file | **New** | D5 — ADR adopsi React+Inertia, supersede `ADR-002` (R5) |
| 29 | `03_features/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 30 | `03_features/F01_AUTH_SYSTEM.md` | file | No-Change | Perilaku auth backend (Breeze/Socialite) dipertahankan; view masih akurat |
| 31 | `03_features/F02_LANDING_PAGE.md` | file | No-Change | Perilaku fitur backend tetap; migrasi presentasi dilacak terpusat di Master_Plan/Peta_Layar |
| 32 | `03_features/F03_COURSE_MANAGEMENT.md` | file | No-Change | Logika kursus backend tetap akurat; presentasi dilacak terpusat |
| 33 | `03_features/F04_CATEGORY_SYSTEM.md` | file | No-Change | Logika kategori backend tetap akurat |
| 34 | `03_features/F05_CART_WISHLIST.md` | file | No-Change | Logika cart/wishlist backend tetap akurat |
| 35 | `03_features/F06_PAYMENT_MIDTRANS.md` | file | No-Change | Alur pembayaran Midtrans (backend) tetap akurat |
| 36 | `03_features/F07_ADMIN_PANEL.md` | file | **Update** | Ditulis berbasis **Filament v5** yang **tidak ada** di `composer.json`; admin panel menjadi halaman React+Inertia |
| 37 | `03_features/F08_INSTRUCTOR_PANEL.md` | file | No-Change | Logika panel instruktur backend tetap akurat; presentasi dilacak terpusat |
| 38 | `03_features/F09_STUDENT_PANEL.md` | file | No-Change | Logika panel student backend tetap akurat; presentasi dilacak terpusat |
| 39 | `03_features/F10_REVIEW_RATING.md` | file | No-Change | Logika review/rating backend tetap akurat |
| 40 | `03_features/F11_COUPON_SYSTEM.md` | file | No-Change | Logika kupon backend tetap akurat |
| 41 | `03_features/F12_SITE_SETTINGS.md` | file | No-Change | Logika site settings backend tetap akurat |
| 42 | `03_features/F13_COURSE_PLAYER.md` | file | No-Change | Logika course player backend tetap akurat; presentasi dilacak terpusat |
| 43 | `03_features/F14_NOTIFICATIONS.md` | file | No-Change | Logika notifikasi (Reverb) backend tetap akurat |
| 44 | `04_plans/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 45 | `04_plans/MASTER_ROADMAP.md` | file | **Update** | Tambah ≥3 fase migrasi React+Inertia selaras Master_Plan (R6.6) |
| 46 | `04_plans/SPRINT_PLAN.md` | file | **Update** | Tambah ≥3 sprint migrasi React+Inertia dengan exit criteria (R6.6) |
| 47 | `04_plans/TASK_DISTRIBUTION.md` | file | **Update** | "Init Laravel 12" stale; tambah alokasi tugas migrasi frontend React+Inertia |
| 48 | `04_plans/MASTER_PLAN_REACT_INERTIA.md` | file | **New** | D1 — master plan migrasi (R1, R7) |
| 49 | `04_plans/DOCS_UPDATE_PLAN_REACT_INERTIA.md` | file | **New** | D3 — dokumen ini (R3, R6, R8) |
| 50 | `04_plans/SCREEN_MAPPING_STITCH_REACT.md` | file | **New** | D4 — peta layar Stitch → React (R4) |
| 51 | `05_prompts/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 52 | `05_prompts/PROMPT_ADMIN_PANEL.md` | file | **Update** | Prompt admin berbasis Blade/Filament → halaman admin React+Inertia |
| 53 | `05_prompts/PROMPT_AUTH.md` | file | **Update** | "senior Laravel 12 developer" stale → Laravel `^13.7`; auth view Breeze → halaman React |
| 54 | `05_prompts/PROMPT_FRONTEND.md` | file | **Update** | Hapus "Blade + Tailwind v4"; instruksi React+Inertia (R6.5) |
| 55 | `05_prompts/PROMPT_MIDTRANS.md` | file | **Update** | "senior Laravel 12 developer" stale → Laravel `^13.7` (backend Midtrans tetap) |
| 56 | `05_prompts/PROMPT_MIGRATIONS.md` | file | **Update** | "Laravel 12" stale → Laravel `^13.7` (migration anonymous class tetap berlaku) |
| 57 | `05_prompts/PROMPT_MODELS.md` | file | **Update** | "senior Laravel 12 developer" stale → Laravel `^13.7` |
| 58 | `05_prompts/PROMPT_SETUP_PROJECT.md` | file | **Update** | Hapus "BUKAN Inertia"; ganti instruksi React+Inertia; Laravel `^13.7` (R6.5) |
| 59 | `05_prompts/STITCH_REDESIGN_PROMPTS.md` | file | **Update** | Prompt redesign harus menargetkan komponen React+Inertia, bukan Blade |
| 60 | `06_reports/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 61 | `06_reports/PROGRESS_TRACKER.md` | file | **Update** | Tracker hidup (bukan laporan bertanggal); entri 19 Mei usang → disinkronkan ke kondisi kode nyata + status migrasi React/Inertia |
| 62 | `06_reports/REPORT_2026-05-13_DATABASE_LAYER.md` | file | No-Change | Laporan bertanggal (rekaman titik-waktu); tidak ditulis ulang |
| 63 | `06_reports/REPORT_2026-05-14_DOCS_AUDIT_CLEANUP.md` | file | No-Change | Laporan bertanggal; rekaman historis |
| 64 | `06_reports/REPORT_2026-05-14_SEEDERS_FACTORIES.md` | file | No-Change | "Laravel 12" pada laporan ini adalah **judul kursus** seed (bukan versi framework); tetap akurat |
| 65 | `06_reports/REPORT_2026-05-17_AUTH_SYSTEM.md` | file | No-Change | Laporan bertanggal; rekaman historis |
| 66 | `06_reports/REPORT_2026-05-19_PHASE1_COMPLETION.md` | file | No-Change | Laporan penyelesaian Phase 1 (Blade) bertanggal; rekaman historis |
| 67 | `07_extras/` | folder | No-Change | Folder/kategori; tindakan berlaku pada berkas di dalamnya |
| 68 | `07_extras/AUDIT_DOCS_REVIEW.md` | file | No-Change | Audit bertanggal (rekaman titik-waktu); temuannya ditindaklanjuti maju di dokumen live |
| 69 | `07_extras/ERD_BelajarKUY.html` | file | No-Change | Berkas `.html` non-`.md` yang sudah ada; ERD skema DB tidak berubah (bukan deliverable fitur ini, R7.1) |
| 70 | `07_extras/TECH_STACK_EXTRAS.md` | file | **Update** | Menyebut Laravel 12, TailwindCSS v4, Alpine; selaraskan ke `Kode_Nyata` + catatan React+Inertia |

### 1.1 Rekap per Status_Tindakan

| Status_Tindakan | Jumlah | Komposisi |
|---|---|---|
| **New** | 5 | 5 berkas (D1, D2, D3, D4, D5) |
| **Supersede** | 1 | `ADR-002` |
| **Update** | 25 | 25 berkas |
| **No-Change** | 39 | 31 berkas + 8 folder |
| **Total** | **70** | **62 berkas + 8 folder** |

> Verifikasi silang: 5 New + 1 Supersede + 25 Update + 31 No-Change (berkas) = **62 berkas**; ditambah **8 folder** (semua No-Change) = **70 baris**. Sesuai inventaris `verified-facts.md` §6.3 (57 berkas lama + 5 deliverable baru = 62 berkas; 8 folder).

### 1.2 Tambahan pasca-snapshot (operasional, di luar registry inti 70 baris)

> Berkas berikut dibuat **setelah** snapshot `verified-facts.md` §6 sebagai artefak operasional tindak lanjut (prompt penyelesaian per anggota + jadwal migrasi). Dicatat di sini agar invarian "setiap berkas `Set_Dokumentasi` tercatat" tetap terjaga. Status: **New**.

| Path (relatif `BelajarKUY_docs/`) | Tipe | Status | Tujuan & ringkasan |
|---|---|---|---|
| `05_prompts/PROMPT_INSTRUCTOR_PANEL.md` | file | **New** | Prompt penyelesaian pekerjaan Albariqi: instructor Course/Section/Lecture CRUD, Course Player (F13), email kursus — React+Inertia |
| `05_prompts/PROMPT_COMMERCE.md` | file | **New** | Prompt penyelesaian pekerjaan Ray: Cart, Wishlist, Coupon, Midtrans Snap end-to-end + Enrollment |
| `05_prompts/PROMPT_ADMIN_REACT_MIGRATION.md` | file | **New** | Prompt penyelesaian pekerjaan Quinsha: migrasi admin Blade → halaman `Pages/Admin/*` (Inertia) |
| `04_plans/MIGRATION_SCHEDULE_REACT_INERTIA.md` | file | **New** | Jadwal pengerjaan + rencana push/PR per bagian per anggota (fase 1–3 + polish) |

> **Total `Set_Dokumentasi` kini:** 70 baris inti + 4 tambahan = **66 berkas + 8 folder = 74 baris**. (Catatan: berkas kode React Fase 1 di `resources/js/**` **bukan** bagian `Set_Dokumentasi` — itu kode aplikasi di luar `BelajarKUY_docs/`.)

---

## 2. Detail per Status_Tindakan

### 2.1 Berkas berstatus `Update` (R3.3 — ≥1 perubahan spesifik + alasan)

> Instruksi pembaruan terperinci untuk 10 berkas yang diwajibkan R6 ada di [§4](#4-penugasan-pembaruan-spesifik-r6). Berikut ringkasan perubahan untuk **seluruh** 24 berkas `Update`. Setiap nilai versi dikutip verbatim dari `verified-facts.md`.

#### `00_INDEX.md` (R6.7)
- **Perubahan:** Ganti baris tech stack `Laravel 12 + … + TailwindCSS v4 + Alpine.js` → `Laravel ^13.7 + PHP ^8.3 + React ^19.2.6 + @inertiajs/react ^3.3.0 + inertiajs/inertia-laravel ^3.1 + tailwindcss ^3.1.0`. **Alasan:** menyesuaikan ke `Kode_Nyata`.
- **Perubahan:** Hapus klaim "Filament v5 terinstall" pada baris fase P4. **Alasan:** tidak ada `filament/filament` di `composer.json`.
- **Perubahan:** Tambah entri navigasi untuk `MASTER_PLAN_REACT_INERTIA.md`, `REACT_INERTIA_BENEFITS.md`, `DOCS_UPDATE_PLAN_REACT_INERTIA.md`, `SCREEN_MAPPING_STITCH_REACT.md`, `ADR-008`; tandai `ADR-002` `Superseded`. **Alasan:** indeks harus mencantumkan dokumen baru & status ADR (R6.7).

#### `CHANGELOG.md` (R6.8)
- **Perubahan:** Tambah satu entri tertanggal (mis. `[2026-05-31] — Adopsi React + Inertia (Frontend)`) yang merujuk D1/D2/D3/D4/D5, perubahan tech stack ke React+Inertia, dan adopsi `ADR-008` yang men-supersede `ADR-002`. **Alasan:** mencatat keputusan & artefak baru (R6.8).
- **Perubahan:** Pada entri lama "Filament v5 Admin Panel Integration", tambahkan catatan koreksi (bukan menghapus histori) bahwa Filament **tidak** ada pada `composer.json` `Kode_Nyata`. **Alasan:** menjaga akurasi tanpa memalsukan histori.

#### `PRD_BelajarKUY.md`
- **Perubahan:** Tech stack `Laravel 12.x` → `Laravel ^13.7`; `Blade + TailwindCSS v4 + Alpine.js (TALL…)` → `React ^19.2.6 + @inertiajs/react ^3.3.0 (via inertiajs/inertia-laravel ^3.1)`. **Alasan:** selaras `Kode_Nyata`.
- **Perubahan:** Hapus baris `Admin Panel | Filament v5.x` dan seluruh narasi `FilamentUser`/`UserResource`/`ProductResource`/`/admin/products/*`. **Alasan:** Filament tidak terpasang; admin panel = halaman React+Inertia (lihat tabel rujukan tak valid §5.2).

#### `01_guides/AGENT_GUIDELINES.md`
- **Perubahan:** "menggunakan **Laravel 12**" & "Konvensi Laravel 12" → Laravel `^13.7`. **Alasan:** versi stale.
- **Perubahan:** Baris "Admin Panel | Custom Blade (bukan Filament)" → "Admin Panel | Halaman React + Inertia (`resources/js/Pages/Admin/*`)". **Alasan:** lapisan presentasi pindah ke React (Filament memang tidak ada — bagian "(bukan Filament)" sudah benar).

#### `01_guides/CODING_STANDARDS.md`
- **Perubahan:** Judul "Coding Standards (Laravel 12)" → "Coding Standards (Laravel ^13.7)". **Alasan:** versi stale.
- **Perubahan:** Tambah subbagian konvensi komponen React/JSX + Inertia (penamaan `Pages/`/`Components/`, props dari `Inertia::render`, penggunaan `<Link>`), berdampingan dengan konvensi Blade yang tersisa. **Alasan:** frontend resmi = React+Inertia (`ADR-008`).

#### `01_guides/SETUP_GUIDE.md` (R6.2)
- **Perubahan:** Tambah langkah setup React+Inertia (tiga bagian: instalasi dependensi React verbatim, konfigurasi `@vitejs/plugin-react`, entry point Inertia resolve `resources/js/Pages` + root view `app`). **Alasan:** memenuhi R6.2 (detail di §4).

#### `01_guides/TESTING_STRATEGY.md`
- **Perubahan:** "Pest (default Laravel 12)" → "Pest (default Laravel ^13.7)". **Alasan:** versi stale. Pengujian backend (Pest/PHPUnit `^12.5.12`) tidak berubah; pengujian komponen React adalah pekerjaan terpisah (di luar scope).

#### `01_guides/UI_UX_GUIDELINES.md` (R6.4)
- **Perubahan:** "Laravel 12 + TailwindCSS v4 + Alpine.js" → "React (via Inertia) + tailwindcss ^3.1.0"; alur Figma→codebase mengacu komponen React (`resources/js/Components`). **Alasan:** R6.4. Konteks_A & Konteks_B **tidak** diubah.

#### `02_architecture/FOLDER_STRUCTURE.md` (R6.3)
- **Perubahan:** Tambah `resources/js/Pages/` (halaman Inertia), `resources/js/Components/` (komponen React), `resources/views/app.blade.php` (root view `app`). **Alasan:** R6.3 (detail di §4).

#### `02_architecture/TECH_STACK.md` (R6.1)
- **Perubahan:** Lihat instruksi lengkap di §4 (R6.1) + tabel koreksi §5.1. Mencakup: Laravel `^12.0`→`^13.7`, hapus `filament/filament ^5.6`, tambah blok React+Inertia, koreksi paket Cloudinary, dan seluruh versi npm/composer ke nilai verbatim `Kode_Nyata`. **Alasan:** dokumen ini sumber utama inkonsistensi.

#### `02_architecture/ADR/README.md` (R5.5 / D7)
- **Perubahan:** Tambah baris indeks `ADR-008` (sudah dikerjakan pada D7); pastikan Status `ADR-002` = `Superseded by ADR-008`. **Alasan:** R5.5.

#### `03_features/F07_ADMIN_PANEL.md`
- **Perubahan:** Judul & isi "Filament v5" → admin panel sebagai halaman React+Inertia di `resources/js/Pages/Admin/*` (mengonsumsi route `admin.*` yang sudah ada). **Alasan:** Filament tidak terpasang.
- **Perubahan:** Hapus/koreksi rujukan kelas & berkas tak valid (`FilamentUser`, `app/Providers/Filament/AdminPanelProvider.php`, `app/Filament/Resources/**`, `UserResource`, `ProductResource`). **Alasan:** tidak ada pada `Kode_Nyata` (lihat §5.2).

#### `04_plans/MASTER_ROADMAP.md` (R6.6)
- **Perubahan:** Tambah ≥3 fase migrasi frontend React+Inertia berurutan, selaras fase Master_Plan, masing-masing dengan nama & exit criteria terverifikasi; "Init Laravel 12" → Laravel `^13.7`. **Alasan:** R6.6.

#### `04_plans/SPRINT_PLAN.md` (R6.6)
- **Perubahan:** Tambah ≥3 sprint migrasi React+Inertia dengan exit criteria; "Project Laravel 12 tersetup" → Laravel `^13.7`. **Alasan:** R6.6.

#### `04_plans/TASK_DISTRIBUTION.md`
- **Perubahan:** "Init Laravel 12 project" → Laravel `^13.7`; tambah baris alokasi tugas migrasi frontend (porting Pages, komponen reusable, deaktivasi Blade) selaras Master_Plan. **Alasan:** dokumen alokasi tugas forward-looking harus mencerminkan pekerjaan React+Inertia.

#### `05_prompts/PROMPT_SETUP_PROJECT.md` (R6.5)
- **Perubahan:** Hapus baris `Frontend: Blade + TailwindCSS (BUKAN Livewire, BUKAN Inertia)` → `Frontend: React + Inertia (@inertiajs/react ^3.3.0, inertiajs/inertia-laravel ^3.1)`; "Laravel 12" → `^13.7`. **Alasan:** R6.5 (hapus "BUKAN Inertia").

#### `05_prompts/PROMPT_FRONTEND.md` (R6.5)
- **Perubahan:** "Laravel 12 + Blade + TailwindCSS v4" → "Laravel ^13.7 + React + Inertia + tailwindcss ^3.1.0"; ganti instruksi membuat Blade view → membuat halaman `resources/js/Pages` + komponen `resources/js/Components`. **Alasan:** R6.5.

#### `05_prompts/PROMPT_ADMIN_PANEL.md`
- **Perubahan:** Instruksi membangun admin (Blade) → halaman admin React+Inertia (`Pages/Admin/*`) yang memakai route `admin.*`. **Alasan:** lapisan presentasi pindah ke React; admin bukan Filament.

#### `05_prompts/STITCH_REDESIGN_PROMPTS.md`
- **Perubahan:** Target output prompt redesign Stitch → komponen/halaman React di `resources/js/Pages` & `resources/js/Components` (lihat `SCREEN_MAPPING_STITCH_REACT.md`), bukan partial Blade. **Alasan:** menyelaraskan redesign dengan `ADR-008`.

#### `05_prompts/PROMPT_AUTH.md`
- **Perubahan:** "senior Laravel 12 developer" → "senior Laravel ^13.7 developer"; auth scaffolding Breeze me-render halaman React (`Pages/Auth/*`) via Inertia. **Alasan:** versi stale + lapisan presentasi React.

#### `05_prompts/PROMPT_MODELS.md`
- **Perubahan:** "senior Laravel 12 developer" → "senior Laravel ^13.7 developer". **Alasan:** versi stale (logika model backend tidak berubah).

#### `05_prompts/PROMPT_MIDTRANS.md`
- **Perubahan:** "senior Laravel 12 developer" → "senior Laravel ^13.7 developer". **Alasan:** versi stale (integrasi Midtrans backend tidak berubah, `midtrans/midtrans-php ^2.6`).

#### `05_prompts/PROMPT_MIGRATIONS.md`
- **Perubahan:** "Laravel 12" (3 kemunculan) → "Laravel ^13.7"; "anonymous class migration (Laravel 12 style)" → "(Laravel ^13.7 style)". **Alasan:** versi stale (gaya migration tetap valid).

#### `06_reports/PROGRESS_TRACKER.md`
- **Perubahan:** Sinkronkan Summary, daftar SELESAI/SEDANG/BELUM, dan tambah Session 9; entri 19 Mei (overall 30%) usang vs kode nyata (~55%). **Alasan:** tracker hidup harus mencerminkan kondisi `Kode_Nyata` saat ini, termasuk status migrasi React/Inertia (0% di kode) dan gap commerce/instructor/player. (Laporan bertanggal `REPORT_*` tetap `No-Change`.)

#### `07_extras/TECH_STACK_EXTRAS.md`
- **Perubahan:** "Laravel 12", "TailwindCSS v4", "Alpine.js" pada ringkasan tech stack → nilai `Kode_Nyata` (`^13.7`, `tailwindcss ^3.1.0` + `@tailwindcss/vite ^4.0.0`, Alpine diturunkan); catatan broadcasting "Built-in Laravel 12" → Laravel `^13.7`. **Alasan:** selaras `Kode_Nyata`.

### 2.2 Berkas berstatus `Supersede` (R3.4 — pengganti + alasan)

#### `02_architecture/ADR/ADR-002-frontend-blade-not-livewire.md`
- **Dokumen pengganti:** [`ADR-008-frontend-react-inertia.md`](../02_architecture/ADR/ADR-008-frontend-react-inertia.md).
- **Alasan supersede:** `ADR-002` memutuskan Blade + Alpine.js dan **menolak** Inertia, padahal `Kode_Nyata` sudah memasang `inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`, `react ^19.2.6`, dan middleware `HandleInertiaRequests.php` (`rootView = 'app'`). Premis "overhead setup ecosystem" pada `ADR-002` tidak berlaku karena scaffolding sudah selesai.
- **Tindakan berkas:** Hanya field `Status` diubah menjadi `Superseded by ADR-008` (sudah dikerjakan pada D6); Context, Decision, Consequences, dan Alternatives Considered **tidak** diubah (ADR immutable).

### 2.3 Berkas berstatus `New` (R3.5 — tujuan + ringkasan isi)

| Berkas | Tujuan | Ringkasan Isi |
|---|---|---|
| `04_plans/MASTER_PLAN_REACT_INERTIA.md` (D1) | Peta jalan bertahap migrasi presentasi Blade → React+Inertia | Scope (presentasi saja) + pelestarian backend; baseline scaffolding; ≥3 fase berurutan (tujuan, view Blade, exit criteria, deactivation); coexistence; ≥5 risiko; rollback per fase; catatan out-of-scope |
| `02_architecture/REACT_INERTIA_BENEFITS.md` (D2) | Justifikasi manfaat adopsi React+Inertia | 5 aspek (DX, reusabilitas, UX SPA, ekosistem React, keselarasan Aset_Redesign) + ≥1 klaim teknis berujuk kode (`auth.user`/`flash`, `@inertiajs/react ^3.3.0`) + ≥2 trade-off & mitigasi |
| `04_plans/DOCS_UPDATE_PLAN_REACT_INERTIA.md` (D3) | Registry tindakan untuk seluruh `Set_Dokumentasi` | Dokumen ini: registry 70 baris, detail per status, konflik Blade vs Inertia, tabel ketidaksesuaian versi, penugasan R6, tabel koreksi & rujukan tak valid |
| `04_plans/SCREEN_MAPPING_STITCH_REACT.md` (D4) | Pemetaan 41 layar Stitch → halaman/komponen React | Definisi layar; tabel pemetaan (peran, konteks, route, status); 0 layar tak terpetakan; daftar komponen reusable |
| `02_architecture/ADR/ADR-008-frontend-react-inertia.md` (D5) | ADR yang mengadopsi React+Inertia & men-supersede `ADR-002` | Header (Accepted/Date/Decision By), Context, Decision, pernyataan supersede `ADR-002`, Consequences (positif/negatif), Alternatives Considered |

### 2.4 Berkas & folder berstatus `No-Change` (R3.6 — alasan tetap akurat)

**Folder (8)** — `01_guides/`, `02_architecture/`, `02_architecture/ADR/`, `03_features/`, `04_plans/`, `05_prompts/`, `06_reports/`, `07_extras/`: kategori penampung; `Status_Tindakan` berlaku pada berkas di dalamnya, bukan pada folder. Tidak ada konten folder yang berubah.

**Berkas (32):**

| Berkas | Alasan tetap akurat terhadap `Kode_Nyata` |
|---|---|
| `01_guides/GIT_WORKFLOW.md` | Alur Git agnostik terhadap stack presentasi |
| `01_guides/GLOSSARY.md` | Definisi peran `user`/`instructor`/`admin` tetap cocok `RoleMiddleware.php` (sumber R8.2) |
| `01_guides/SECURITY_GUIDELINES.md` | Panduan keamanan (validasi, authz, CSRF, escaping) berlaku lintas stack; tanpa fakta versi stale |
| `02_architecture/API_ROUTES.md` | Route backend dipertahankan utuh; cocok `routes/web.php`/`routes/auth.php` |
| `02_architecture/DATABASE_SCHEMA.md` | Skema DB di luar scope; tidak berubah |
| `02_architecture/ADR/ADR-001..ADR-007` (kecuali 002) | ADR immutable; keputusan backend/domain (Midtrans, denormalisasi, sandbox, payout, instructor auto-active, role naming) tetap berlaku |
| `03_features/F01..F06, F08..F14` (kecuali F07) | Mendeskripsikan perilaku fitur backend yang dipertahankan; view Blade saat ini masih ada & akurat; migrasi presentasi dilacak terpusat di Master_Plan/Peta_Layar, tidak diduplikasi per-fitur |
| 5 `06_reports/REPORT_*.md` (bertanggal) | Laporan bertanggal (rekaman titik-waktu); tidak ditulis ulang. "Laravel 12" di `REPORT_2026-05-14_SEEDERS_FACTORIES.md` adalah judul kursus seed, bukan versi framework. (Catatan: `PROGRESS_TRACKER.md` adalah tracker hidup → berstatus **Update**, lihat §2.1) |
| `07_extras/AUDIT_DOCS_REVIEW.md` | Audit bertanggal; temuan ditindaklanjuti maju pada dokumen live (bukan dengan menulis ulang audit) |
| `07_extras/ERD_BelajarKUY.html` | Berkas `.html` yang sudah ada; ERD skema DB tidak berubah; bukan deliverable fitur ini (R7.1) |

> Catatan (R7.1): `07_extras/ERD_BelajarKUY.html` adalah satu-satunya item non-`.md` pada `Set_Dokumentasi`. Ia **sudah ada** sebelum fitur ini dan tetap dicatat di registry, namun **tidak** dijadikan deliverable baru dan tidak diubah.

---

## 3. Konflik Blade vs Inertia & Tabel Ketidaksesuaian Versi/Teknologi

### 3.1 Identifikasi Konflik "Blade vs Inertia" (R3.7)

**Pernyataan konflik:** Dokumentasi lama menyatakan lapisan frontend adalah **Blade + Alpine.js** dan secara eksplisit **menolak Inertia** (`ADR-002`, serta `PROMPT_SETUP_PROJECT.md` yang menulis "BUKAN Inertia"). Namun `Kode_Nyata` **sudah memasang dan mengaktifkan** Inertia + React:

```json
// composer.json → require (verbatim)
"inertiajs/inertia-laravel": "^3.1"
```

```json
// package.json → dependencies (verbatim)
"@inertiajs/react": "^3.3.0",
"react": "^19.2.6",
"react-dom": "^19.2.6"
```

```php
// app/Http/Middleware/HandleInertiaRequests.php (verbatim)
protected $rootView = 'app';
```

**Tindakan penyelesaian (selaraskan dokumen → `Kode_Nyata` sebagai sumber kebenaran):**

| Berkas terdampak konflik | Status_Tindakan | Tindakan penyelesaian |
|---|---|---|
| `02_architecture/ADR/ADR-002-...md` | **Supersede** | Status → `Superseded by ADR-008`; keputusan Blade digantikan React+Inertia |
| `02_architecture/ADR/ADR-008-...md` | **New** | ADR baru yang mengadopsi React+Inertia (sumber keputusan) |
| `05_prompts/PROMPT_SETUP_PROJECT.md` | **Update** | Hapus "BUKAN Inertia"; ganti instruksi React+Inertia |
| `05_prompts/PROMPT_FRONTEND.md` | **Update** | "Blade + Tailwind v4" → React+Inertia |
| `02_architecture/TECH_STACK.md` | **Update** | Frontend "Blade + Tailwind v4 + Alpine (TALL)" → React+Inertia |
| `PRD_BelajarKUY.md` | **Update** | Tech stack & narasi frontend → React+Inertia |
| `00_INDEX.md` | **Update** | Baris tech stack & status `ADR-002` |
| `01_guides/UI_UX_GUIDELINES.md` | **Update** | Workflow implementasi → komponen React |
| `01_guides/AGENT_GUIDELINES.md` | **Update** | "Admin Panel: Custom Blade" → React+Inertia |
| `07_extras/TECH_STACK_EXTRAS.md` | **Update** | Ringkasan stack → React+Inertia |
| `05_prompts/PROMPT_ADMIN_PANEL.md`, `05_prompts/STITCH_REDESIGN_PROMPTS.md` | **Update** | Target output → komponen React+Inertia |

> Catatan kontradiksi internal (R8.5): dokumen lama **saling bertentangan** soal Filament — `TECH_STACK.md`/`PRD_BelajarKUY.md`/`F07_ADMIN_PANEL.md`/`CHANGELOG.md` menyatakan **Filament v5 terpasang**, sedangkan `AGENT_GUIDELINES.md` menyatakan **"Custom Blade (bukan Filament)"**. `Kode_Nyata` (`composer.json`) **tidak memuat** paket `filament/*`. Resolusi: selaraskan **semua** ke `Kode_Nyata` → Filament dihapus dari tech stack; admin panel dibangun sebagai halaman React+Inertia.

### 3.2 Tabel Ketidaksesuaian Versi/Teknologi — model `VersionDiscrepancy` (M2) (R3.8, R8.7)

> `codeValue` dikutip **verbatim** dari `composer.json`/`package.json` (via `verified-facts.md`).

| # | Item | Nilai Dokumen Lama (`docValue`) | Nilai `Kode_Nyata` (`codeValue`, verbatim) | Sumber | Koreksi spesifik |
|---|---|---|---|---|---|
| 1 | **Laravel** | `12.x` / `^12.0` | `^13.7` | `composer.json` → `laravel/framework` | Ganti **semua** sebutan "Laravel 12" → `^13.7` (TECH_STACK, PRD, 00_INDEX, CHANGELOG, guides, prompts, plans) |
| 2 | **Filament** | terpasang (`filament/filament ^5.6`, "Filament v5") | **tidak ada** pada `require`/`require-dev` | `composer.json` | Hapus Filament dari tech stack & narasi admin; admin panel = halaman React+Inertia (`Pages/Admin/*`) |
| 3 | **Tailwind CSS** | `v4` (`tailwindcss ^4.0`) | `tailwindcss ^3.1.0` (paket inti) **+** `@tailwindcss/vite ^4.0.0` (plugin Vite) | `package.json` → `devDependencies` | Tulis **kedua** nilai apa adanya; jelaskan dualitas: paket inti v`^3.1.0`, plugin Vite v`^4.0.0`. Jangan "membulatkan" jadi v4 |
| 4 | **Alpine.js (peran)** | pustaka interaktivitas utama (TALL) | `alpinejs ^3.15.12` di `devDependencies`, **bukan** lapisan presentasi utama | `package.json` | Turunkan Alpine dari pustaka frontend utama; React+Inertia menjadi lapisan presentasi |
| 5 | **Frontend stack** | Blade + Alpine.js; Inertia ditolak (`ADR-002`) | `inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`, `react ^19.2.6`, `react-dom ^19.2.6` | `composer.json`, `package.json`, `HandleInertiaRequests.php` | Ganti narasi frontend → React+Inertia; `ADR-002` di-supersede `ADR-008` |
| 6 | **Paket Cloudinary** | `cloudinary-labs/cloudinary-laravel ^2.0` | `cloudinary/cloudinary_php ^3.1` | `composer.json` → `require` | Koreksi nama paket **dan** versi; paket lama tidak ada di `composer.json` (lihat §5.2) |
| 7 | **laravel/scout** | `^10.0` | `^11.1` | `composer.json` | Koreksi versi |
| 8 | **laravel/tinker** | `^2.9` | `^3.0` | `composer.json` | Koreksi versi |
| 9 | **laravel/breeze** | `^2.0` | `^2.4` | `composer.json` → `require-dev` | Koreksi versi |
| 10 | **laravel/socialite** | `^5.0` | `^5.27` | `composer.json` | Koreksi versi |
| 11 | **intervention/image** | `^3.0` | `^4.0` | `composer.json` | Koreksi versi |
| 12 | **midtrans/midtrans-php** | `^2.5` | `^2.6` | `composer.json` | Koreksi versi |
| 13 | **meilisearch/meilisearch-php** | `^1.0` | `^1.16` | `composer.json` | Koreksi versi |
| 14 | **laravel/pint** | `^1.18` | `^1.27` | `composer.json` → `require-dev` | Koreksi versi |
| 15 | **nunomaduro/collision** | `^8.0` | `^8.6` | `composer.json` → `require-dev` | Koreksi versi |
| 16 | **phpunit/phpunit** | `^11.0` | `^12.5.12` | `composer.json` → `require-dev` | Koreksi versi |
| 17 | **vite** | `^6.0` | `^8.0.0` | `package.json` → `devDependencies` | Koreksi versi |
| 18 | **laravel-vite-plugin** | `^1.0` | `^3.1` | `package.json` → `devDependencies` | Koreksi versi |
| 19 | **axios** | `^1.7` (devDependencies) | `^1.16.0` (**dependencies**) | `package.json` | Koreksi versi **dan** blok (pindah ke `dependencies`) |
| 20 | **laravel-echo** | `^1.0` | `^2.3.4` | `package.json` → `dependencies` | Koreksi versi |
| 21 | **pusher-js** | `^8.0` | `^8.5.0` | `package.json` → `dependencies` | Koreksi versi |
| 22 | **sweetalert2** | `^11.0` | `^11.26.24` | `package.json` → `dependencies` | Koreksi versi |
| 23 | **alpinejs (versi)** | `^3.0` (dependencies) | `^3.15.12` (**devDependencies**) | `package.json` | Koreksi versi **dan** blok |
| 24 | **postcss** | `^8.4` | `^8.4.31` | `package.json` → `devDependencies` | Koreksi versi |
| 25 | **autoprefixer** | `^10.4` | `^10.4.2` | `package.json` → `devDependencies` | Koreksi versi |

> **Dependensi yang HILANG dari dokumen lama** dan harus **ditambahkan** ke `TECH_STACK.md` (semua verbatim dari `Kode_Nyata`): `php ^8.3`, `inertiajs/inertia-laravel ^3.1`, `laravel/reverb ^1.10`, `laravel/pail ^1.2.5`, `laravel/pao ^1.0.6`, `fakerphp/faker ^1.23`, `mockery/mockery ^1.6` (composer); `@headlessui/react ^2.2.10`, `@inertiajs/react ^3.3.0`, `@vitejs/plugin-react ^6.0.2`, `lucide-react ^1.17.0`, `react ^19.2.6`, `react-dom ^19.2.6` (deps), `@tailwindcss/forms ^0.5.2`, `concurrently ^9.0.1` (devDeps).

---

## 4. Penugasan Pembaruan Spesifik R6

> Setiap berkas berikut **WAJIB** berstatus `Update` (R6.1–R6.8). Verifikasi keberadaan: **seluruh** berkas R6 terkonfirmasi **ADA** pada `Set_Dokumentasi` (`verified-facts.md` §6.2), sehingga tidak ada yang dialihkan ke `New` (fallback R6.9 tidak terpicu).

### R6.1 — `02_architecture/TECH_STACK.md` → `Update`
Wajib mencantumkan (verbatim): `react ^19.2.6`, `@inertiajs/react ^3.3.0`, `inertiajs/inertia-laravel ^3.1`, `@vitejs/plugin-react ^6.0.2`, Laravel `^13.7`, PHP `^8.3`. Koreksi entri lama yang tidak konsisten beserta alasan:
- `laravel/framework ^12.0` → `^13.7` (versi salah vs `composer.json`).
- Hapus `filament/filament ^5.6` (tidak ada di `composer.json`).
- Turunkan Alpine.js: dari "JS Interactivity utama (TALL)" → "tercatat di `devDependencies` (`alpinejs ^3.15.12`), bukan lapisan presentasi utama".
- Koreksi paket & versi lain pada tabel §3.2 (Cloudinary, Scout, Tinker, Breeze, Socialite, Image, Midtrans, Meilisearch, Pint, Collision, PHPUnit, Vite, plugin Vite, dll.).

### R6.2 — `01_guides/SETUP_GUIDE.md` → `Update`
Wajib memuat langkah setup React+Inertia dengan **tepat tiga bagian**:
1. **Instalasi dependensi React** sesuai versi `Kode_Nyata`:
   ```bash
   npm install @inertiajs/react@^3.3.0 react@^19.2.6 react-dom@^19.2.6 \
     @vitejs/plugin-react@^6.0.2 @headlessui/react@^2.2.10 lucide-react@^1.17.0
   ```
2. **Konfigurasi `@vitejs/plugin-react`** pada `vite.config.js`:
   ```js
   import react from '@vitejs/plugin-react';
   export default defineConfig({ plugins: [laravel({ /* ... */ }), react()] });
   ```
3. **Entry point Inertia** yang me-resolve halaman dari `resources/js/Pages` dengan root view `app`:
   ```js
   // resources/js/app.jsx
   import { createInertiaApp } from '@inertiajs/react';
   createInertiaApp({
     resolve: (name) => import(`./Pages/${name}.jsx`),
     // root view Blade 'app' sesuai HandleInertiaRequests::$rootView
   });
   ```

### R6.3 — `02_architecture/FOLDER_STRUCTURE.md` → `Update`
Wajib memuat: direktori halaman React `resources/js/Pages/`, direktori komponen React `resources/js/Components/`, dan berkas root view `resources/views/app.blade.php` (root view `app`).

### R6.4 — `01_guides/UI_UX_GUIDELINES.md` → `Update`
Alur implementasi mengacu komponen **React** (bukan Blade + Alpine.js). **Pertahankan** Konteks_A (gradien Indigo→Purple, aksen Amber/Orange, Poppins, kartu `rounded-3xl`) dan Konteks_B (krem + slate-blue, Inter) **tanpa perubahan**.

### R6.5 — `05_prompts/PROMPT_SETUP_PROJECT.md` & `05_prompts/PROMPT_FRONTEND.md` → `Update`
Hapus **setiap** pernyataan "BUKAN Inertia" (mis. `PROMPT_SETUP_PROJECT.md`: `Frontend: Blade + TailwindCSS (BUKAN Livewire, BUKAN Inertia)`) dan ganti dengan instruksi React+Inertia (`@inertiajs/react ^3.3.0`, halaman di `resources/js/Pages`, root view `app`).

### R6.6 — `04_plans/MASTER_ROADMAP.md` & `04_plans/SPRINT_PLAN.md` → `Update`
Muat **minimal tiga fase/sprint** migrasi frontend React+Inertia **berurutan**, selaras fase Master_Plan, masing-masing dengan **nama** dan **exit criteria** terverifikasi (mis. "0 referensi `@extends` pada halaman publik", "semua route `admin.*` me-render `Inertia::render`").

### R6.7 — `00_INDEX.md` → `Update`
Cantumkan **setiap** dokumen baru (`MASTER_PLAN_REACT_INERTIA.md`, `REACT_INERTIA_BENEFITS.md`, `DOCS_UPDATE_PLAN_REACT_INERTIA.md`, `SCREEN_MAPPING_STITCH_REACT.md`, `ADR-008`), perubahan tech stack ke React+Inertia, dan status baru `ADR-002` (`Superseded`).

### R6.8 — `CHANGELOG.md` → `Update`
Catat **satu entri** yang merujuk dokumen baru yang dihasilkan, perubahan tech stack ke React+Inertia, dan adopsi `ADR-008` yang men-supersede `ADR-002`.

### R6.9 — Fallback (tidak terpicu)
Jika sebuah berkas R6.1–R6.8 **tidak ditemukan**, entrinya ditandai `New` + tujuan + ringkasan. **Status verifikasi:** semua 10 berkas R6 **ADA**; fallback tidak digunakan.

---

## 5. Tabel Koreksi Atribut/Sintaks & Rujukan Tak Valid

### 5.1 Tabel Koreksi Atribut/Sintaks (R8.6)

> Nilai/atribut/sintaks **salah** pada dokumen lama beserta koreksi yang benar (selain versi murni pada §3.2). Penanda blok kode juga dikoreksi agar sesuai isi (R8.4).

| Lokasi (dokumen lama) | Atribut/Sintaks salah | Koreksi yang benar |
|---|---|---|
| `TECH_STACK.md` → tabel Core Stack | `Frontend \| Blade + TailwindCSS \| v4` | `Frontend \| React (via Inertia) \| react ^19.2.6` + baris `tailwindcss ^3.1.0` (paket inti) & `@tailwindcss/vite ^4.0.0` (plugin) |
| `TECH_STACK.md` → tabel Core Stack | `Admin Panel \| Filament \| v5.x` | Hapus baris; admin = halaman React+Inertia (`Pages/Admin/*`) |
| `TECH_STACK.md` → blok `require` | `"cloudinary-labs/cloudinary-laravel": "^2.0"` | `"cloudinary/cloudinary_php": "^3.1"` |
| `TECH_STACK.md` → blok `require` | `"filament/filament": "^5.6"` | Hapus baris (tidak ada di `composer.json`) |
| `TECH_STACK.md` → blok npm `dependencies` | `"alpinejs": "^3.0"` di `dependencies` | Pindah ke `devDependencies` dengan `"alpinejs": "^3.15.12"` |
| `TECH_STACK.md` → blok npm | `axios` di `devDependencies` `^1.7` | Pindah ke `dependencies` dengan `"axios": "^1.16.0"` |
| `TECH_STACK.md` → blok npm | tidak ada blok `dependencies` React | Tambah `dependencies`: `react`, `react-dom`, `@inertiajs/react`, `@vitejs/plugin-react`, `@headlessui/react`, `lucide-react` (versi verbatim) |
| `PRD_BelajarKUY.md` | `Frontend \| Blade + TailwindCSS v4 + Alpine.js v3 (TALL, tanpa Livewire — ADR-002)` | `Frontend \| React + Inertia (@inertiajs/react ^3.3.0) — ADR-008` |
| `PROMPT_SETUP_PROJECT.md` | `Frontend: Blade + TailwindCSS (BUKAN Livewire, BUKAN Inertia)` | `Frontend: React + Inertia (@inertiajs/react ^3.3.0, inertiajs/inertia-laravel ^3.1)` |
| `PROMPT_FRONTEND.md` | `Laravel 12 + Blade + TailwindCSS v4` | `Laravel ^13.7 + React + Inertia + tailwindcss ^3.1.0` |
| `F07_ADMIN_PANEL.md` | `class User … implements FilamentUser` + `canAccessPanel()` | Hapus; kontrol akses admin tetap via `RoleMiddleware` (`role:admin`) yang sudah ada |
| `UI_UX_GUIDELINES.md` | "stack modern: Laravel 12 + TailwindCSS v4 + Alpine.js" | "React (via Inertia) + tailwindcss ^3.1.0" |
| `TECH_STACK_EXTRAS.md` | "Tech Stack: Laravel 12, … TailwindCSS v4, Alpine.js" | "Laravel ^13.7, … tailwindcss ^3.1.0 (+ @tailwindcss/vite ^4.0.0), React+Inertia" |

### 5.2 Tabel Rujukan Tak Valid (R8.8)

> Rujukan ke **berkas/route/kelas** pada dokumen lama yang **tidak ada** pada `Kode_Nyata`. Semua bersumber dari klaim Filament; `composer.json` tidak memuat paket `filament/*` (`verified-facts.md` §1.4).

| Rujukan tak valid (dokumen lama) | Tipe | Dokumen sumber | Status pada `Kode_Nyata` | Tindakan |
|---|---|---|---|---|
| `app/Providers/Filament/AdminPanelProvider.php` | berkas | `CHANGELOG.md`, `F07_ADMIN_PANEL.md` | Tidak ada (Filament tak terpasang) | Hapus rujukan |
| `app/Filament/Resources/Users/UserResource.php` | berkas | `CHANGELOG.md`, `F07_ADMIN_PANEL.md` | Tidak ada | Hapus rujukan |
| `app/Filament/Resources/Products/ProductResource.php` | berkas | `CHANGELOG.md`, `F07_ADMIN_PANEL.md` | Tidak ada | Hapus rujukan |
| `public/js/filament/`, `public/css/filament/`, `public/fonts/filament/` | berkas/dir | `CHANGELOG.md` | Tidak ada | Hapus rujukan |
| `FilamentUser` (interface `Filament\Models\Contracts\FilamentUser`) | kelas/interface | `F07_ADMIN_PANEL.md`, `PRD_BelajarKUY.md` | Tidak ada | Hapus; akses admin via `RoleMiddleware` `role:admin` |
| `Filament\Panel`, `canAccessPanel(Panel $panel)` | kelas/method | `F07_ADMIN_PANEL.md` | Tidak ada | Hapus |
| `UserResource`, `ProductResource` (Filament Resource) | kelas | `PRD_BelajarKUY.md` | Tidak ada | Hapus |
| `cloudinary-labs/cloudinary-laravel` | paket Composer | `TECH_STACK.md` | Tidak ada (yang ada: `cloudinary/cloudinary_php ^3.1`) | Koreksi nama paket |
| route `/admin/products/*` (`admin.products.*`) | route | `PRD_BelajarKUY.md` | Tidak ada pada `routes/web.php` (yang ada: `admin.categories.*`, `admin.courses.*`, `admin.users.index`, dll.) | Hapus/koreksi ke route admin yang nyata |

> Catatan: rujukan route lain pada dokumen lama (mis. `admin.dashboard`, `admin.categories.index`, `student.my-courses`) **valid** terhadap `routes/web.php` (`verified-facts.md` §5) dan tidak perlu dikoreksi.

---

## 6. Validasi Kelengkapan Registry (V2 & V3)

### 6.1 V2 — Kelengkapan Registry (R3.2)

Registry §1 dibandingkan terhadap inventaris `Set_Dokumentasi` (`verified-facts.md` §6):

| Kategori | Inventaris (verified-facts) | Baris di registry | Cocok? |
|---|---|---|---|
| Folder | 8 | 8 | ✅ |
| Berkas akar | 3 (`00_INDEX`, `CHANGELOG`, `PRD`) | 3 | ✅ |
| `01_guides/` | 8 | 8 | ✅ |
| `02_architecture/` (non-ADR) | 4 + 2 baru (`REACT_INERTIA_BENEFITS`) | 4 lama + 1 baru | ✅ |
| `02_architecture/ADR/` | 8 + 1 baru (`ADR-008`) | 8 lama + 1 baru | ✅ |
| `03_features/` | 14 | 14 | ✅ |
| `04_plans/` | 3 + 3 baru (D1, D3, D4) | 3 lama + 3 baru | ✅ |
| `05_prompts/` | 8 | 8 | ✅ |
| `06_reports/` | 6 | 6 | ✅ |
| `07_extras/` | 3 (termasuk `.html`) | 3 | ✅ |
| **Total** | **57 lama + 5 baru = 62 berkas + 8 folder = 70** | **70** | ✅ |

**Hasil V2:** Setiap item `Set_Dokumentasi` muncul **tepat satu kali**; selisih (registry △ inventaris) = **∅**. **LULUS.**

### 6.2 V3 — Akurasi Versi Verbatim (R8.1, R8.7)

Nilai versi yang dikutip dokumen ini dicocokkan karakter-demi-karakter dengan `composer.json`/`package.json` (`verified-facts.md`):

| Nilai dikutip | Sumber | Cocok verbatim? |
|---|---|---|
| `^8.3` (php) | composer require | ✅ |
| `^13.7` (laravel/framework) | composer require | ✅ |
| `^3.1` (inertiajs/inertia-laravel) | composer require | ✅ |
| `^3.1` (cloudinary/cloudinary_php) | composer require | ✅ |
| `^19.2.6` (react, react-dom) | package dependencies | ✅ |
| `^3.3.0` (@inertiajs/react) | package dependencies | ✅ |
| `^6.0.2` (@vitejs/plugin-react) | package dependencies | ✅ |
| `^2.2.10` (@headlessui/react) | package dependencies | ✅ |
| `^1.17.0` (lucide-react) | package dependencies | ✅ |
| `^1.16.0` (axios) | package dependencies | ✅ |
| `^3.1.0` (tailwindcss) | package devDependencies | ✅ |
| `^4.0.0` (@tailwindcss/vite) | package devDependencies | ✅ |
| `^3.15.12` (alpinejs) | package devDependencies | ✅ |
| `^8.0.0` (vite) | package devDependencies | ✅ |
| `^3.1` (laravel-vite-plugin) | package devDependencies | ✅ |
| `^12.5.12` (phpunit) | composer require-dev | ✅ |

**Hasil V3:** Seluruh nilai versi pada dokumen ini cocok karakter-demi-karakter dengan `Kode_Nyata`. Nilai dokumen **lama** yang tidak cocok telah dicatat sebagai koreksi pada §3.2 & §5.1 (R8.7). **LULUS.**

---

*Akhir Rencana_Update_Dok. Dokumen ini adalah deliverable D3 fitur `react-inertia-redesign`; seluruh tindakan bersifat perencanaan Markdown dan tidak mengeksekusi perubahan kode/backend.*
