# ADR-008: Frontend pakai React.js via Inertia.js (Supersede ADR-002)

**Status:** ✅ Accepted
**Date:** 31 Mei 2026
**Decision By:** Yosua (PM)
**Supersedes:** ADR-002

---

## Context

`ADR-002` (12 Mei 2026) memutuskan lapisan frontend BelajarKUY memakai **Blade + Alpine.js** dan secara eksplisit **menolak** Inertia.js dengan alasan "overhead setup ecosystem untuk project 4 minggu". Keputusan itu kini **tidak konsisten** dengan kondisi basis kode (`Kode_Nyata`) yang sebenarnya:

- **Inertia + React sudah terpasang** pada dependensi proyek. Terverifikasi langsung dari `composer.json` dan `package.json`:
  - `inertiajs/inertia-laravel` versi `^3.1` (`composer.json` → `require`)
  - `@inertiajs/react` versi `^3.3.0` (`package.json` → `dependencies`)
  - `react` versi `^19.2.6` dan `react-dom` versi `^19.2.6` (`package.json` → `dependencies`)
  - `@vitejs/plugin-react` versi `^6.0.2` (`package.json` → `dependencies`)
  - Pendukung UI: `@headlessui/react` versi `^2.2.10` dan `lucide-react` versi `^1.17.0` (`package.json` → `dependencies`)
- **Scaffolding Inertia sudah berjalan.** Berkas `app/Http/Middleware/HandleInertiaRequests.php` sudah ada dengan `rootView = 'app'` dan membagikan prop bersama (shared props):
  - `auth.user` → `id`, `name`, `email`, `role`, `photo`, `email_verified_at` (null jika tidak login)
  - `flash` → `success`, `error`, `info`, `warning`
- **Aset redesign berorientasi React.** Hasil ekspor Google Stitch (`BelajarKuy_Design_Revisi/`) terdiri dari komponen-komponen UI berbasis markup utility-first (Tailwind) yang dipetakan langsung ke halaman/komponen React di `resources/js/Pages` dan `resources/js/Components` — lebih cocok dirakit sebagai komponen React ketimbang partial Blade.
- **Versi platform sudah naik.** `composer.json` memuat `laravel/framework` versi `^13.7` dan `php` versi `^8.3`, yang mendukung penuh Inertia v3.

Dengan demikian, keputusan `ADR-002` sudah usang terhadap realita kode. Diperlukan ADR baru yang menyelaraskan keputusan arsitektur frontend dengan `Kode_Nyata` sebagai sumber kebenaran.

> Catatan scope: keputusan ini hanya menyentuh **lapisan presentasi (view)**. Nama model, route, controller, request validation, middleware peran, dan skema database dipertahankan utuh tanpa perubahan. Detail migrasi bertahap diuraikan pada `MASTER_PLAN_REACT_INERTIA.md`.

## Decision

Gunakan **React.js melalui Inertia.js** sebagai lapisan frontend BelajarKUY, **menggantikan** keputusan Blade + Alpine.js pada `ADR-002`.

- Halaman dirender via `Inertia::render(...)` dari controller Laravel yang sudah ada, dengan komponen halaman React berada di `resources/js/Pages` dan root view Blade `app` (`resources/views/app.blade.php`), sesuai `rootView = 'app'` pada `HandleInertiaRequests.php`.
- Routing tetap ditangani Laravel (server-side routing) — Inertia menjembatani controller ke komponen React tanpa perlu membangun API layer terpisah.
- State autentikasi dan notifikasi diakses melalui shared props yang sudah dibagikan (`auth.user`, `flash`) di `HandleInertiaRequests.php`.
- Komponen UI memanfaatkan pustaka yang sudah terpasang: `@headlessui/react` (`^2.2.10`) untuk komponen aksesibel (dropdown, modal, dsb.) dan `lucide-react` (`^1.17.0`) untuk ikon.
- Alpine.js (`alpinejs ^3.15.12`, masih tercatat di `devDependencies`) **diturunkan** dari lapisan presentasi utama; interaktivitas UI menjadi tanggung jawab komponen React.

### Pernyataan Supersede

ADR ini **men-supersede `ADR-002` (Frontend pakai Blade + Alpine.js)**. Alasan perubahan keputusan:

1. **Ketidaksesuaian dengan `Kode_Nyata`:** `ADR-002` menolak Inertia, tetapi `inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`, dan `react ^19.2.6` sudah terpasang serta `HandleInertiaRequests.php` sudah aktif — premis "overhead setup ecosystem" pada `ADR-002` tidak lagi berlaku karena scaffolding telah selesai.
2. **Keselarasan dengan aset redesign Google Stitch** yang berorientasi komponen React, sehingga implementasi UI lebih cepat dan konsisten bila dirakit sebagai komponen React+Inertia.

Field `Status` pada `ADR-002` diperbarui menjadi `Superseded by ADR-008` (ditangani pada task terpisah), tanpa mengubah bagian Context, Decision, Consequences, dan Alternatives Considered yang sudah ada.

## Consequences

### Positive
- **Selaras dengan kode nyata** — dokumentasi arsitektur kembali konsisten dengan dependensi dan middleware yang sudah terpasang (`inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`).
- **Pengalaman pengguna gaya SPA** — navigasi tanpa full page reload via Inertia, tetapi tetap memakai routing & controller Laravel yang ada (tanpa API layer terpisah).
- **Reusabilitas komponen** — UI dari aset Stitch dapat dipecah menjadi komponen React yang dipakai ulang di banyak halaman (`resources/js/Components`).
- **Prop bersama siap pakai** — `auth.user` dan `flash` dari `HandleInertiaRequests.php` langsung tersedia di setiap halaman React tanpa boilerplate tambahan.
- **Ekosistem React** — akses ke pustaka matang seperti `@headlessui/react` dan `lucide-react` yang sudah terpasang.

### Negative
- **Kurva belajar React** untuk anggota tim yang sebelumnya terbiasa dengan Blade.
- **Kompleksitas build & hidrasi** — bundel JavaScript dan proses hidrasi menambah kompleksitas dibanding render Blade murni.
- **Pertimbangan SEO/SSR** — halaman publik (landing, detail kursus) memerlukan perhatian ekstra terkait SEO karena rendering bergeser ke sisi klien.
- **Periode koeksistensi** — selama migrasi bertahap, Blade dan React berjalan berdampingan sehingga ada beban pemeliharaan ganda sementara.

### Mitigations
- Sediakan panduan setup & contoh komponen pada `SETUP_GUIDE.md` dan `UI_UX_GUIDELINES.md` untuk menekan kurva belajar.
- Lakukan migrasi **bertahap (phased)** sesuai `MASTER_PLAN_REACT_INERTIA.md`, dengan exit criteria dan strategi rollback per fase untuk membatasi durasi koeksistensi.
- Untuk SEO halaman publik, pertimbangkan SSR Inertia sebagai pekerjaan terpisah (di luar scope dokumentasi ini) dan jaga konten kritis tetap dapat diindeks.

## Alternatives Considered

1. **Tetap Blade + Alpine.js (status quo `ADR-002`)** — Ditolak: bertentangan dengan `Kode_Nyata` (Inertia+React sudah terpasang dan aktif) serta tidak selaras dengan aset redesign Stitch yang berorientasi React.
2. **Inertia + Vue** — Ditolak: dependensi yang terpasang adalah `@inertiajs/react ^3.3.0` dan `react ^19.2.6` (bukan Vue); memilih Vue berarti mengganti stack yang sudah ada tanpa alasan teknis.
3. **SPA React standalone + Laravel API terpisah** — Ditolak: membutuhkan API layer dan pengelolaan routing/otentikasi terpisah, padahal Inertia sudah menyatukan routing Laravel dengan komponen React (mis. shared props `auth.user`/`flash`).
4. **Livewire** — Ditolak: tidak ada dependensi Livewire pada `composer.json`; juga tidak memanfaatkan aset redesign React maupun scaffolding Inertia yang sudah ada.

---

*ADR ini final dan men-supersede `ADR-002`. Perubahan butuh ADR baru yang supersede.*
