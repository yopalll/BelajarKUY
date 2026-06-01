# Implementation Plan: react-inertia-redesign

## Overview

Fitur ini adalah **sistem penghasil dokumentasi**: seluruh deliverable berupa berkas Markdown (`.md`) yang merencanakan migrasi lapisan presentasi BelajarKUY dari Blade + Alpine.js ke React.js via Inertia.js, menyelaraskan dokumentasi terhadap `Kode_Nyata` sebagai sumber kebenaran, dan memetakan layar redesign Google Stitch ke halaman React.

Karena tidak ada kode produksi, controller, route, model, migrasi, atau perubahan skema database yang dihasilkan, **tidak ada pemilihan bahasa pemrograman**: setiap task menulis/memperbarui berkas Markdown. Sesuai keputusan pada `design.md` (Testing Strategy), fitur ini **tidak** memakai property-based testing dan **tidak** memiliki bagian Correctness Properties; validasi dilakukan melalui **acceptance checklist V1–V9** (sub-task validasi opsional, ditandai `*`).

Urutan implementasi: (1) ekstraksi fakta dari kode sebagai fondasi, (2) penulisan deliverable independen (Master_Plan, Dok_Keunggulan, Peta_Layar, ADR-008 + pembaruan ADR), (3) penyusunan Rencana_Update_Dok yang merujuk seluruh dokumen baru, (4) validasi konsistensi & integritas scope.

## Tasks

- [x] 1. Fondasi: ekstraksi fakta terverifikasi dari Kode_Nyata dan Aset_Redesign
  - [x] 1.1 Susun catatan fakta terverifikasi (verified-facts reference)
    - Baca dan kutip verbatim versi dependensi dari `BelajarKUY/BelajarKUY/composer.json` (`require`/`require-dev`) dan `BelajarKUY/BelajarKUY/package.json` (`dependencies`/`devDependencies`): mis. `^13.7`, `^8.3`, `^3.1`, `^3.3.0`, `^19.2.6`, `^6.0.2`, `^2.2.10`, `^1.17.0`, `^3.1.0`, `^4.0.0`; konfirmasi tidak ada Filament pada `require`
    - Baca `app/Http/Middleware/HandleInertiaRequests.php` (rootView `app`, prop `auth.user` & `flash`) dan `app/Http/Middleware/RoleMiddleware.php` (enum `user`/`instructor`/`admin`)
    - Catat nama route nyata dari `routes/web.php` dan `routes/auth.php` (mis. `dashboard`, `profile.edit`, `admin.*`, `instructor.dashboard`, `student.*`, `home`, `course.detail`, `cart.index`, `checkout`, `payment.success`, `payment.failed`)
    - Enumerasi `Set_Dokumentasi` (setiap berkas & folder di `BelajarKUY_docs/`) dan konfirmasi `ADR-001`..`ADR-007` ada serta `ADR-008` belum ada
    - Enumerasi folder layar valid `Aset_Redesign` (folder yang memuat `code.html` DAN `screen.png`); kecualikan folder non-layar (`rocket_growth_modern/`, folder `*.jpeg/` tanpa `code.html`)
    - Tulis hasil ke `.kiro/specs/react-inertia-redesign/verified-facts.md` (di luar `BelajarKUY_docs/`, sebagai rujukan internal — tidak masuk registry)
    - _Requirements: 8.1, 8.2, 8.3, 4.1_

- [x] 2. Buat D1 — Master_Plan (`BelajarKUY_docs/04_plans/MASTER_PLAN_REACT_INERTIA.md`)
  - [x] 2.1 Tulis MASTER_PLAN_REACT_INERTIA.md sesuai kontrak konten C1
    - Judul & metadata; Scope Statement (migrasi hanya lapisan presentasi, mengecualikan `Lapisan_Backend`)
    - Pernyataan pelestarian backend eksplisit: nama model, route, controller, skema database, dan middleware peran dipertahankan utuh
    - Baseline scaffolding React+Inertia (kutip nilai verbatim dari catatan fakta task 1.1)
    - Phased approach minimal tiga fase berurutan (nama, tujuan, daftar view/halaman Blade, ≥1 exit criteria terukur per fase)
    - Deactivation sequence lapisan Blade per fase; Coexistence Strategy (WHERE diperlukan)
    - Risk Register minimal lima risiko (skala {Rendah, Sedang, Tinggi} untuk dampak & kemungkinan, ≥1 mitigasi tiap risiko)
    - Rollback Strategy per fase (kondisi pemicu + langkah berurutan); catatan Out-of-Scope untuk usulan yang menyentuh backend
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 7.6, 7.7_
  - [x] 2.2 Validasi Master_Plan terhadap checklist V1
    - Verifikasi ≥3 fase, ≥5 risiko lengkap, rollback & deactivation per fase, scope & pelestarian backend hadir
    - _Requirements: 1.3, 1.4, 1.5, 1.7_

- [x] 3. Buat D2 — Dok_Keunggulan (`BelajarKUY_docs/02_architecture/REACT_INERTIA_BENEFITS.md`)
  - [x] 3.1 Tulis REACT_INERTIA_BENEFITS.md sesuai kontrak konten C2
    - Pengantar manfaat untuk BelajarKUY
    - Lima aspek (developer experience, reusabilitas komponen, UX gaya SPA, ekosistem React, keselarasan dengan `Aset_Redesign`), masing-masing ≥1 manfaat konkret
    - Minimal satu klaim teknis dikaitkan ke rujukan kode konkret (mis. prop `auth.user`/`flash` pada `HandleInertiaRequests.php`, `@inertiajs/react ^3.3.0`, `@headlessui/react`/`lucide-react`)
    - Minimal dua trade-off/konsekuensi negatif, masing-masing dengan mitigasi
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [x] 3.2 Validasi Dok_Keunggulan terhadap checklist V1 & V4
    - Verifikasi kelima aspek terisi, rujukan kode konkret valid terhadap `Kode_Nyata`, ≥2 trade-off + mitigasi
    - _Requirements: 2.2, 2.4, 8.3_

- [x] 4. Buat D4 — Peta_Layar (`BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md`)
  - [x] 4.1 Tulis SCREEN_MAPPING_STITCH_REACT.md sesuai kontrak konten C4
    - Definisi layar (folder dengan `code.html` + `screen.png`)
    - Tabel pemetaan: satu baris per layar dengan kolom `Folder Layar`, `Halaman React (resources/js/Pages/...)`, `Peran` ∈ {Student, Instructor, Admin, publik}, `Konteks Desain` ∈ {Konteks_A, Konteks_B}, `Route nyata (jika ada)`, `Status (Existing/Usulan baru)`
    - Pastikan 0 layar tak terpetakan; tepat satu peran & satu konteks per layar; route nyata dikutip jika ada
    - Daftar komponen reusable (dipakai ≥2 layar) beserta daftar layar pemakainya; tandai layar tanpa route sebagai "usulan baru"
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 4.2 Validasi Peta_Layar terhadap checklist V1 & V4
    - Verifikasi jumlah layar tak terpetakan = 0; rujukan route valid terhadap `routes/web.php`/`routes/auth.php`
    - _Requirements: 4.2, 8.3_

- [x] 5. Buat D5 (ADR-008) dan terapkan pembaruan ADR (D6, D7)
  - [x] 5.1 Tulis `BelajarKUY_docs/02_architecture/ADR/ADR-008-frontend-react-inertia.md` sesuai kontrak konten C5
    - Guard nomor: pastikan `ADR-008` belum ada; jika ada, jangan timpa dan laporkan konflik nomor ADR
    - Header (`Status: Accepted`, Date, Decision By); Context; Decision (adopsi React+Inertia menggantikan Blade+Alpine.js pada `ADR-002`)
    - Pernyataan supersede `ADR-002` eksplisit + ≥1 alasan; Consequences (positif & negatif); Alternatives Considered
    - Pola penamaan & lokasi berkas mengikuti `ADR-001`..`ADR-007`
    - _Requirements: 5.1, 5.2, 5.3, 5.6, 5.7_
  - [x] 5.2 Perbarui field Status pada `BelajarKUY_docs/02_architecture/ADR/ADR-002-frontend-blade-not-livewire.md`
    - Ubah `Status` menjadi `Superseded by ADR-008`; jangan ubah Context, Decision, Consequences, Alternatives Considered
    - _Requirements: 5.4_
  - [x] 5.3 Perbarui indeks `BelajarKUY_docs/02_architecture/ADR/README.md`
    - Tambah satu baris indeks `ADR-008` (nomor, judul, status, tanggal); ubah kolom Status baris `ADR-002` menjadi `Superseded by ADR-008`
    - _Requirements: 5.5_
  - [x] 5.4 Validasi integritas ADR terhadap checklist V9
    - Verifikasi `ADR-002` hanya berubah pada Status; baris `ADR-008` ada di README; `ADR-008` tidak menimpa berkas lama
    - _Requirements: 5.4, 5.5, 5.7_

- [x] 6. Checkpoint — pastikan deliverable D1, D2, D4, D5/D6/D7 lengkap
  - Pastikan semua pemeriksaan/validasi lolos, tanyakan kepada pengguna jika muncul pertanyaan.

- [x] 7. Buat D3 — Rencana_Update_Dok (`BelajarKUY_docs/04_plans/DOCS_UPDATE_PLAN_REACT_INERTIA.md`)
  - [x] 7.1 Tulis tabel registry master (model M1 `DocUpdateEntry`)
    - Satu baris untuk setiap berkas DAN folder pada `Set_Dokumentasi` tepat satu kali (gunakan inventaris dari task 1.1): kolom `Path`, `Tipe`, `Status_Tindakan` ∈ {Update, Supersede, New, No-Change}, `Ringkasan Alasan`
    - Sertakan blok detail per status: Update (≥1 perubahan + alasan), Supersede (pengganti + alasan), New (tujuan + ringkasan), No-Change (alasan tetap akurat)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - [x] 7.2 Tambahkan bagian konflik Blade vs Inertia dan tabel ketidaksesuaian versi/teknologi (model M2)
    - Identifikasi konflik dokumentasi lama (Blade, `ADR-002` menolak Inertia) vs `Kode_Nyata` (Inertia+React terpasang) + tindakan penyelesaian & `Status_Tindakan` berkas terdampak
    - Tabel ketidaksesuaian minimal: Laravel (`12.x` → `^13.7`), Filament (terpasang → tidak ada di `composer.json`), Tailwind (`v4` → `tailwindcss ^3.1.0` + `@tailwindcss/vite ^4.0.0`), Alpine.js (peran diturunkan), masing-masing dengan koreksi spesifik
    - _Requirements: 3.7, 3.8, 8.7_
  - [x] 7.3 Tambahkan penugasan pembaruan spesifik R6 ke registry
    - Tetapkan `Update` + instruksi untuk: `02_architecture/TECH_STACK.md` (R6.1), `01_guides/SETUP_GUIDE.md` (R6.2), `02_architecture/FOLDER_STRUCTURE.md` (R6.3), `01_guides/UI_UX_GUIDELINES.md` (R6.4), `05_prompts/PROMPT_SETUP_PROJECT.md` & `05_prompts/PROMPT_FRONTEND.md` (R6.5), `04_plans/MASTER_ROADMAP.md` & `04_plans/SPRINT_PLAN.md` (R6.6), `00_INDEX.md` (R6.7), `CHANGELOG.md` (R6.8)
    - Terapkan fallback: jika berkas tidak ditemukan, tandai `New` + tujuan + ringkasan (R6.9)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_
  - [x] 7.4 Tambahkan tabel koreksi atribut/sintaks dan tabel rujukan tak valid
    - Catat nilai/atribut/sintaks benar untuk dokumen lama yang salah (R8.6); catat rujukan berkas/route/kelas yang tidak ada pada `Kode_Nyata` jika ditemukan (R8.8)
    - _Requirements: 8.6, 8.8_
  - [x] 7.5 Validasi kelengkapan registry terhadap checklist V2 & V3
    - Bandingkan registry dengan inventaris `Set_Dokumentasi` (setiap item tepat satu kali, selisih = ∅); verifikasi nilai versi cocok karakter-demi-karakter dengan `composer.json`/`package.json`
    - _Requirements: 3.2, 8.1, 8.7_

- [x] 8. Validasi konsistensi silang & integritas scope
  - [x] 8.1 Pemeriksaan konsistensi & terminologi antar dokumen (checklist V5, V6, V7)
    - Verifikasi tidak ada pernyataan saling bertentangan (mis. versi Laravel seragam `^13.7`); terminologi peran konsisten `user`/`instructor`/`admin`; setiap cuplikan dibungkus fenced code block dengan penanda bahasa yang sesuai
    - _Requirements: 8.2, 8.4, 8.5_
  - [x] 8.2 Verifikasi integritas scope/backend (checklist V8)
    - Pastikan seluruh keluaran berekstensi `.md`; jalankan perintah read-only (`git status --porcelain`, `git diff --stat`) pada path `Lapisan_Backend` dan integrasi (Midtrans/Cloudinary/Reverb/Meilisearch/Socialite) untuk memastikan 0 selisih terhadap baseline
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9. Checkpoint akhir — pastikan semua validasi lolos
  - Pastikan semua pemeriksaan/validasi lolos, tanyakan kepada pengguna jika muncul pertanyaan.

## Notes

- Tasks bertanda `*` adalah validasi opsional (acceptance checklist V1–V9) dan dapat dilewati untuk MVP cepat; task inti penulisan dokumen tidak opsional.
- Setiap task merujuk klausa sub-requirement spesifik untuk telusur (traceability).
- Seluruh deliverable adalah Markdown (`.md`) — tidak ada kode produksi, controller, route, model, migrasi, atau perubahan skema database.
- Sesuai `design.md`, fitur ini tidak memakai property-based testing; validasi berbasis checklist dan pemeriksaan read-only menggantikan pengujian otomatis.
- Task 1.1 menghasilkan catatan fakta di `.kiro/specs/react-inertia-redesign/verified-facts.md` (di luar `BelajarKUY_docs/`) agar tidak memengaruhi registry R3.2.
- Checkpoint memastikan validasi inkremental sebelum melanjutkan.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "5.2", "5.3"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "5.4", "7.1"] },
    { "id": 3, "tasks": ["7.2"] },
    { "id": 4, "tasks": ["7.3"] },
    { "id": 5, "tasks": ["7.4"] },
    { "id": 6, "tasks": ["7.5", "8.1", "8.2"] }
  ]
}
```
