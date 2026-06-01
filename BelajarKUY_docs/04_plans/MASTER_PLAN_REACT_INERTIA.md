# 🚀 BelajarKUY — Master Plan Migrasi Frontend (Blade → React + Inertia)

> **Berkas:** `BelajarKUY_docs/04_plans/MASTER_PLAN_REACT_INERTIA.md`
> **Status:** Draft rencana (planning) — dokumen perencanaan, bukan eksekusi kode.
> **Tanggal:** 2026-05-31
> **Pemilik (Owner):** Tim Arsitektur Frontend BelajarKUY (PM + Frontend Lead)
> **Versi dokumen:** 1.0
> **Sumber kebenaran nilai:** `.kiro/specs/react-inertia-redesign/verified-facts.md` (seluruh angka versi, nama route, dan prop Inertia dikutip verbatim dari sana).
> **Traceability:** Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 7.6, 7.7.

---

## 1. Tujuan Dokumen

Dokumen ini adalah **peta jalan bertahap** untuk memigrasikan **lapisan presentasi** aplikasi BelajarKUY dari **Blade + Alpine.js** menjadi **React.js melalui Inertia.js**, sekaligus menyelaraskan tampilan dengan aset redesign Google Stitch (`BelajarKuy_Design_Revisi`).

Dokumen ini memberi tim panduan yang jelas mengenai **scope**, **fase**, **baseline scaffolding**, **risiko**, **strategi koeksistensi**, **urutan penonaktifan Blade**, dan **rollback**. Dokumen ini **tidak** menulis komponen React produksi, **tidak** mengubah controller/route/model, dan **tidak** mengubah skema database.

---

## 2. Scope Statement

**(Memenuhi R1.2)**

Migrasi yang direncanakan dokumen ini **hanya menyentuh lapisan presentasi (view)** aplikasi, yaitu:

- Berkas tampilan Blade (`resources/views/**`) dan interaktivitas Alpine.js di sisinya.
- Komposisi halaman, komponen UI, layout, dan styling visual.

Migrasi ini **secara eksplisit MENGECUALIKAN** seluruh `Lapisan_Backend`, yaitu: model, route, controller, request validation, middleware peran, skema database, serta integrasi Midtrans, Cloudinary, Reverb, Meilisearch, dan Socialite.

| Termasuk Scope (presentasi) | DIKECUALIKAN dari Scope (`Lapisan_Backend`) |
|---|---|
| Halaman & komponen React di `resources/js/Pages` dan `resources/js/Components` | Model Eloquent (mis. `User`, `Course`, `Category`) |
| Root view Inertia `resources/views/app.blade.php` | Definisi route pada `routes/web.php` & `routes/auth.php` |
| Layout, styling, dan interaksi UI | Controller (`Admin/*`, `Frontend/*`, `Auth/*`) |
| Pemetaan prop Inertia ke komponen React | Request validation (`app/Http/Requests/**`) |
| Penonaktifan view Blade lama | Middleware peran `RoleMiddleware.php` & skema database/migrasi |
| — | Integrasi Midtrans / Cloudinary / Reverb / Meilisearch / Socialite |

> Catatan deliverable: keseluruhan fitur ini menghasilkan **dokumen Markdown (`.md`) saja**. Tidak ada berkas kode, migrasi, atau berkas eksekusi yang dibuat sebagai bagian dari perencanaan ini.

---

## 3. Pernyataan Pelestarian Backend

**(Memenuhi R7.7)**

Selama dan setelah seluruh fase migrasi, komponen `Lapisan_Backend` berikut **dipertahankan utuh tanpa perubahan**:

- **Nama model** — seluruh kelas Eloquent (mis. `User`, `Course`, `Category`, `Cart`, `Coupon`) tetap dengan nama, namespace, dan relasi yang sama.
- **Route** — nama dan path route pada `routes/web.php` dan `routes/auth.php` tidak diubah, ditambah, atau dihapus oleh pekerjaan migrasi presentasi (mis. `dashboard`, `admin.dashboard`, `instructor.dashboard`, `student.dashboard`, `login`, `register`).
- **Controller** — seluruh controller (`app/Http/Controllers/**`) tetap. Yang berubah hanya **cara controller mengembalikan respons presentasi** (lihat Coexistence Strategy), bukan logika bisnisnya.
- **Skema database** — tidak ada migrasi baru, tidak ada perubahan kolom/tabel/indeks.
- **Middleware peran** — `RoleMiddleware.php` beserta nilai enum peran `user` (Student), `instructor`, dan `admin` dipertahankan persis. Logika redirect berbasis peran tidak diubah.

Terminologi peran yang dipakai konsisten di seluruh dokumen ini mengikuti `RoleMiddleware.php` dan `GLOSSARY.md`:

| Nilai enum DB (`role`) | Istilah bisnis |
|---|---|
| `user` | Student |
| `instructor` | Instructor |
| `admin` | Admin |

> Setiap usulan yang menyentuh `Lapisan_Backend` ditandai eksplisit sebagai **Out-of-Scope** (lihat Bagian 10).

---

## 4. Baseline Scaffolding React + Inertia (Kondisi Awal)

**(Memenuhi R1.6)**

Scaffolding React + Inertia **sudah terpasang** pada `Kode_Nyata`. Migrasi ini melanjutkan dari baseline berikut (nilai dikutip verbatim dari `verified-facts.md` → `composer.json`, `package.json`, dan `HandleInertiaRequests.php`).

### 4.1 Dependensi PHP (`composer.json`, blok `require`)

```json
"require": {
    "php": "^8.3",
    "cloudinary/cloudinary_php": "^3.1",
    "inertiajs/inertia-laravel": "^3.1",
    "intervention/image": "^4.0",
    "laravel/framework": "^13.7",
    "laravel/reverb": "^1.10",
    "laravel/scout": "^11.1",
    "laravel/socialite": "^5.27",
    "laravel/tinker": "^3.0",
    "meilisearch/meilisearch-php": "^1.16",
    "midtrans/midtrans-php": "^2.6"
}
```

Catatan baseline PHP yang relevan untuk migrasi presentasi:

- `inertiajs/inertia-laravel` versi `^3.1` — adapter Inertia sisi server.
- `laravel/framework` versi `^13.7`, `php` versi `^8.3`.
- `laravel/breeze` versi `^2.4` (pada `require-dev`) — sumber view auth yang akan dimigrasikan pada fase Auth.

### 4.2 Dependensi JS (`package.json`, blok `dependencies`)

```json
"dependencies": {
    "@headlessui/react": "^2.2.10",
    "@inertiajs/react": "^3.3.0",
    "@vitejs/plugin-react": "^6.0.2",
    "axios": "^1.16.0",
    "laravel-echo": "^2.3.4",
    "lucide-react": "^1.17.0",
    "pusher-js": "^8.5.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "sweetalert2": "^11.26.24"
}
```

Catatan baseline JS yang relevan:

- `react` versi `^19.2.6` dan `react-dom` versi `^19.2.6` — runtime React.
- `@inertiajs/react` versi `^3.3.0` — adapter Inertia sisi klien (React).
- `@vitejs/plugin-react` versi `^6.0.2` — plugin Vite untuk React.
- `@headlessui/react` versi `^2.2.10` dan `lucide-react` versi `^1.17.0` — primitif UI & ikon untuk komponen React.
- `tailwindcss` versi `^3.1.0` dan `@tailwindcss/vite` versi `^4.0.0` (keduanya pada `devDependencies`) — styling. Kedua nilai dikutip apa adanya; **tidak** boleh dibulatkan menjadi "Tailwind v4".
- `alpinejs` versi `^3.15.12` masih ada pada `devDependencies`, namun **bukan** lapisan presentasi utama setelah adopsi React+Inertia (perannya diturunkan).

### 4.3 Middleware Inertia (`app/Http/Middleware/HandleInertiaRequests.php`)

Root view Inertia terverifikasi:

```php
protected $rootView = 'app';
```

Inertia me-render ke Blade root view `resources/views/app.blade.php`. Shared props yang sudah dibagikan ke seluruh halaman React:

```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
                'photo' => $request->user()->photo,
                'email_verified_at' => $request->user()->email_verified_at,
            ] : null,
        ],
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
            'info' => fn () => $request->session()->get('info'),
            'warning' => fn () => $request->session()->get('warning'),
        ],
    ];
}
```

Ringkasan baseline shared props (dijadikan kontrak data presentasi yang sudah tersedia untuk setiap halaman React):

- **`auth.user`** — field: `id`, `name`, `email`, `role`, `photo`, `email_verified_at` (bernilai `null` jika belum login).
- **`flash`** — kunci: `success`, `error`, `info`, `warning`.

> **Implikasi baseline:** karena `rootView = 'app'`, shared props `auth.user` & `flash`, dan adapter Inertia sudah aktif, migrasi presentasi dapat dimulai **tanpa** pekerjaan setup ulang scaffolding. Fase-fase di bawah hanya perlu menambah halaman di `resources/js/Pages` dan mengganti respons presentasi controller dari `view(...)` menjadi `Inertia::render(...)`.

---

## 5. Pendekatan Bertahap (Phased Approach)

**(Memenuhi R1.3 untuk nama/tujuan/cakupan/exit criteria; R1.7 untuk deactivation sequence per fase)**

Migrasi dibagi menjadi **tiga fase berurutan**. Setiap fase mencantumkan: nama, tujuan, daftar view/halaman Blade yang dicakup, minimal satu exit criteria terukur, dan urutan penonaktifan (deactivation sequence) lapisan Blade.

Setiap exit criteria dirumuskan sebagai **kondisi terukur** sehingga dua peninjau independen mencapai kesimpulan terpenuhi/tidak-terpenuhi yang identik (mis. memakai hitungan referensi `@extends`, atau status route yang me-render `Inertia::render`).

### Fase 1 — Fondasi & Halaman Publik

- **Nama fase:** Fase 1 — Fondasi & Halaman Publik.
- **Tujuan:** Memigrasikan shell aplikasi (layout root Inertia) dan seluruh halaman publik (non-auth) ke React+Inertia, sebagai pembuktian alur end-to-end di atas baseline yang sudah terpasang.
- **Daftar view/halaman Blade yang dicakup:**
  - `welcome` (landing page, path `/`).
  - `frontend.home` (di-render oleh `HomeController@index`, route `home` → `/home`).
  - `frontend.course-detail` (route `course.detail` → `/courses/{slug}`).
- **Exit criteria (terukur):**
  1. Ketiga route publik (`/`, `home`, `course.detail`) me-render melalui `Inertia::render(...)` dan **0** dari ketiganya masih memanggil `view(...)` Blade lama (diverifikasi dengan menghitung pemanggilan `view(` pada handler ketiga route tersebut = 0).
  2. Halaman publik React yang dimigrasikan **0** memuat direktif `@extends`/`@section` Blade (hitungan referensi `@extends` pada berkas presentasi publik = 0).
  3. Smoke test manual: ketiga halaman publik tampil tanpa error konsol JavaScript yang memblokir render (jumlah error blocking = 0).
- **Deactivation sequence Blade (Fase 1):**
  1. Buat halaman React padanan di `resources/js/Pages` (mis. `Welcome.jsx`, `Home.jsx`, `Courses/Show.jsx`).
  2. Alihkan respons presentasi pada handler route publik dari `view('welcome')`/`view('frontend.home')`/`view('frontend.course-detail')` menjadi `Inertia::render(...)` (perubahan respons presentasi, bukan logika bisnis — lihat Bagian 10 bila menyentuh controller di luar lapisan view).
  3. Tandai berkas Blade publik lama (`welcome.blade.php`, `frontend/home.blade.php`, `frontend/course-detail.blade.php`) sebagai **deprecated** (tidak lagi dirujuk).
  4. Setelah exit criteria Fase 1 terpenuhi, pindahkan berkas Blade publik lama ke folder arsip/`_deprecated` agar tidak lagi termuat oleh router.

### Fase 2 — Autentikasi & Panel Student

- **Nama fase:** Fase 2 — Autentikasi & Panel Student.
- **Tujuan:** Memigrasikan alur autentikasi (view bawaan Breeze) dan seluruh halaman panel Student ke React+Inertia, memanfaatkan shared prop `auth.user` & `flash`.
- **Daftar view/halaman Blade yang dicakup:**
  - View autentikasi Breeze: login, register, forgot-password, reset-password, verify-email, confirm-password (route `login`, `register`, `password.request`, `password.reset`, `verification.notice`, `password.confirm`).
  - Halaman Student: `student.dashboard` (`/student/dashboard`), `student.my-courses` (`/student/my-courses`), `student.wishlist` (`/student/wishlist`), `student.profile` (`/student/profile`), `student.setting` (`/student/setting`), serta `profile.edit` (`/profile`).
- **Exit criteria (terukur):**
  1. Seluruh alur auth utama (login, registrasi, verifikasi email) berjalan melalui halaman React di `resources/js/Pages/Auth`, dengan **0** view auth Blade lama yang masih dirujuk router (hitungan referensi view auth Blade aktif = 0).
  2. Seluruh route `student.*` yang tercantum (6 route) me-render `Inertia::render(...)`; jumlah route `student.*` yang masih me-render Blade = 0.
  3. Shared prop `auth.user` (field `id`, `name`, `email`, `role`, `photo`, `email_verified_at`) terbaca pada minimal halaman dashboard Student tanpa pemanggilan data duplikat dari Blade (diverifikasi: dashboard Student dibaca dari `resources/js/Pages`, bukan view Blade).
- **Deactivation sequence Blade (Fase 2):**
  1. Buat halaman React Auth (`Pages/Auth/Login.jsx`, `Pages/Auth/Register.jsx`, dst.) dan Student (`Pages/Student/Dashboard.jsx`, `Pages/Student/MyCourses.jsx`, dst.).
  2. Alihkan respons presentasi auth & Student dari `view(...)` ke `Inertia::render(...)`.
  3. Nonaktifkan view Breeze Blade dan `backend/student/*.blade.php` lama setelah padanan React lulus uji.
  4. Arsipkan view auth & Student Blade lama setelah ketiga exit criteria Fase 2 terpenuhi.

### Fase 3 — Panel Instructor & Admin

- **Nama fase:** Fase 3 — Panel Instructor & Admin.
- **Tujuan:** Memigrasikan seluruh panel Instructor dan Admin ke React+Inertia, lalu menonaktifkan sisa lapisan Blade aplikasi.
- **Daftar view/halaman Blade yang dicakup:**
  - Instructor: `instructor.dashboard` (`/instructor/dashboard`) dan view `backend/instructor/*`.
  - Admin: `admin.dashboard` (`/admin/dashboard`), `admin.categories.*`, `admin.sub-categories.*`, `admin.courses.*`, `admin.instructors.*`, `admin.orders.*`, `admin.users.index`, `admin.sliders.*`, `admin.info-boxes.*`, `admin.partners.*`, `admin.reviews.*`, `admin.settings.*`, serta view `backend/admin/*`.
- **Exit criteria (terukur):**
  1. Seluruh route bergrup `role:admin` dan `role:instructor` me-render `Inertia::render(...)`; jumlah route `admin.*` dan `instructor.*` yang masih me-render Blade = 0.
  2. Setelah Fase 3, jumlah berkas `.blade.php` presentasi aplikasi (di luar root view Inertia `app.blade.php` dan, bila masih dibutuhkan, halaman email) yang masih dirujuk router = 0.
  3. Smoke test manual per peran (Admin dan Instructor) menghasilkan **0** error blocking pada halaman dashboard masing-masing.
- **Deactivation sequence Blade (Fase 3):**
  1. Buat halaman React Admin (`Pages/Admin/**`) dan Instructor (`Pages/Instructor/**`).
  2. Alihkan respons presentasi seluruh route `admin.*` dan `instructor.*` ke `Inertia::render(...)`.
  3. Nonaktifkan dan arsipkan view `backend/admin/*` dan `backend/instructor/*`.
  4. Verifikasi akhir: hanya `resources/views/app.blade.php` (root view Inertia) yang tersisa sebagai berkas Blade aktif; sisa view Blade presentasi sudah dinonaktifkan.

### Ringkasan Fase

| Fase | Tujuan singkat | Cakupan Blade utama | Contoh exit criteria terukur |
|---|---|---|---|
| 1. Fondasi & Publik | Shell + halaman publik | `welcome`, `frontend.home`, `frontend.course-detail` | 3 route publik me-render `Inertia::render`; 0 referensi `@extends` di halaman publik |
| 2. Auth & Student | Auth Breeze + panel Student | view Breeze, `backend/student/*` | 6 route `student.*` me-render React; 0 view auth Blade dirujuk |
| 3. Instructor & Admin | Panel Instructor & Admin | `backend/instructor/*`, `backend/admin/*` | 0 route `admin.*`/`instructor.*` me-render Blade; hanya `app.blade.php` tersisa |

---

## 6. Urutan Penonaktifan Lapisan Blade (Deactivation Sequence)

**(Memenuhi R1.7 — berlaku terlepas dari kebutuhan koeksistensi)**

Selain langkah per fase di Bagian 5, prinsip umum penonaktifan Blade berikut berlaku di seluruh migrasi:

1. **Buat padanan React lebih dulu** — halaman React di `resources/js/Pages` dibuat dan diuji sebelum view Blade padanannya dinonaktifkan.
2. **Alihkan titik render** — respons presentasi diarahkan dari `view(...)` ke `Inertia::render(...)`.
3. **Tandai deprecated** — view Blade lama ditandai tidak-dirujuk (deprecated) namun belum dihapus, untuk memungkinkan rollback cepat.
4. **Arsipkan** — setelah exit criteria fase terpenuhi, view Blade lama dipindahkan ke lokasi arsip/`_deprecated` sehingga tidak lagi termuat router.
5. **Pertahankan root view** — `resources/views/app.blade.php` (root view Inertia, `rootView = 'app'`) **tidak** dinonaktifkan; ia adalah titik mount aplikasi React.

> Urutan ini bersifat **reversible**: selama tahap 1–3, lapisan Blade masih hadir dan dapat diaktifkan kembali (lihat Bagian 9, Rollback). Penghapusan permanen hanya dilakukan setelah seluruh fase selesai dan stabil.

---

## 7. Strategi Koeksistensi (Coexistence Strategy)

**(Memenuhi R1.8)**

Selama transisi, **lapisan Blade dan React hidup berdampingan**. Mekanisme menjalankan keduanya secara bersamaan:

- **WHERE koeksistensi diperlukan** (selama Fase 1–3 belum semua route dimigrasikan): sebagian route me-render view Blade lama via `view(...)`, sementara sebagian route lain me-render halaman React via `Inertia::render(...)` di bawah root view yang sama (`rootView = 'app'`).
- **Titik berbagi tunggal:** karena `HandleInertiaRequests.php` sudah membagikan `auth.user` & `flash` secara global, halaman React yang baru langsung mendapat konteks autentikasi & flash message tanpa duplikasi logika. Halaman Blade lama tetap memakai mekanisme session/Blade sebagaimana sebelumnya.
- **Batas koeksistensi per peran/area:** koeksistensi dipetakan per area (publik → Student → Instructor/Admin) mengikuti urutan fase, sehingga pada satu waktu hanya sebagian area yang sudah React dan sisanya masih Blade. Ini membatasi blast radius tiap fase.
- **Build pipeline tunggal:** Vite (`@vitejs/plugin-react ^6.0.2`, `laravel-vite-plugin ^3.1`, `vite ^8.0.0`) menjadi pipeline build untuk aset React, berdampingan dengan aset lama selama transisi.

Tabel ringkas "di mana keduanya hidup":

| Area | Selama Fase aktif | Lapisan presentasi |
|---|---|---|
| Halaman publik | Sejak Fase 1 selesai | React (`Inertia::render`) |
| Auth & Student | Fase 1 berjalan → masih Blade; Fase 2 selesai → React | Blade → React |
| Instructor & Admin | Fase 1–2 berjalan → masih Blade; Fase 3 selesai → React | Blade → React |
| Root view | Sepanjang transisi | `app.blade.php` (shell Inertia, tetap) |

> Koeksistensi adalah kondisi **sementara**. Tujuannya menjaga aplikasi tetap berfungsi penuh di setiap titik fase sambil migrasi berlangsung bertahap.

---

## 8. Risk Register

**(Memenuhi R1.4 — minimal lima risiko, masing-masing dengan skala dampak & kemungkinan dari {Rendah, Sedang, Tinggi} dan ≥1 mitigasi)**

Skala tiga tingkat: **Rendah**, **Sedang**, **Tinggi**.

| # | Risiko | Dampak | Kemungkinan | Mitigasi |
|---|---|---|---|---|
| R-1 | **Regresi UI saat porting** dari Blade+Alpine ke React (tampilan/interaksi berbeda dari versi lama). | Sedang | Tinggi | (a) Porting per fase dengan smoke test manual sebelum menonaktifkan Blade; (b) bandingkan dengan `screen.png` aset Stitch sebagai acuan visual; (c) pertahankan view Blade lama (deprecated) untuk rollback. |
| R-2 | **Kurva belajar React + Inertia bagi tim** yang terbiasa Blade+Alpine. | Sedang | Sedang | (a) Mulai dari Fase 1 (halaman publik sederhana) sebagai latihan; (b) buat dokumen keunggulan & contoh komponen reusable; (c) sesi pairing/review pada PR awal. |
| R-3 | **Ketidakcocokan prop Inertia vs data controller** (struktur props yang dikirim controller tidak sesuai harapan komponen React). | Tinggi | Sedang | (a) Standarkan kontrak props mengacu shared props `auth.user` & `flash` yang sudah ada; (b) definisikan bentuk props per halaman sebelum implementasi; (c) uji manual tiap halaman saat alih render. |
| R-4 | **Dampak SEO/SSR** karena render sisi klien pada halaman publik (mis. landing & katalog). | Sedang | Sedang | (a) Prioritaskan evaluasi kebutuhan SSR untuk halaman publik di Fase 1; (b) jika SSR diperlukan, catat sebagai rekomendasi pekerjaan terpisah (Out-of-Scope, Bagian 10); (c) pastikan meta dasar dikirim via head Inertia. |
| R-5 | **Durasi koeksistensi Blade+React memanjang** sehingga dua lapisan dipelihara terlalu lama. | Tinggi | Sedang | (a) Tetapkan exit criteria terukur per fase (Bagian 5); (b) batasi WIP ke satu fase aktif; (c) arsipkan Blade lama segera setelah exit criteria terpenuhi. |
| R-6 | **Inkonsistensi versi/build** antara dokumentasi lama dan `Kode_Nyata` (mis. Tailwind, Laravel) membingungkan tim saat setup. | Rendah | Sedang | (a) Gunakan `verified-facts.md` sebagai sumber nilai tunggal; (b) selaraskan dokumentasi melalui `Rencana_Update_Dok`; (c) kutip versi verbatim dari `composer.json`/`package.json`. |

---

## 9. Strategi Rollback (per Fase)

**(Memenuhi R1.5 — untuk setiap fase: kondisi pemicu rollback + langkah berurutan kembali ke Blade)**

Prinsip umum: karena view Blade lama hanya **ditandai deprecated lalu diarsipkan** (bukan dihapus) hingga seluruh fase stabil, rollback dilakukan dengan **mengembalikan titik render ke `view(...)`** dan mengaktifkan kembali berkas Blade.

### Rollback Fase 1 — Fondasi & Publik

- **Kondisi pemicu:** salah satu halaman publik React gagal render (error blocking > 0), atau regresi visual signifikan yang tidak dapat diperbaiki dalam jendela rilis, atau smoke test publik gagal.
- **Langkah berurutan:**
  1. Aktifkan kembali berkas Blade publik dari arsip (`welcome.blade.php`, `frontend/home.blade.php`, `frontend/course-detail.blade.php`).
  2. Kembalikan respons presentasi route publik dari `Inertia::render(...)` ke `view(...)` semula.
  3. Nonaktifkan/parkir halaman React publik yang bermasalah di `resources/js/Pages`.
  4. Verifikasi ketiga route publik kembali tampil via Blade tanpa error.
  5. Catat penyebab pada laporan agar bisa diperbaiki sebelum mencoba Fase 1 kembali.

### Rollback Fase 2 — Auth & Student

- **Kondisi pemicu:** alur auth (login/registrasi/verifikasi) gagal via React, atau prop `auth.user` tidak terbaca dengan benar pada panel Student, atau route `student.*` error.
- **Langkah berurutan:**
  1. Aktifkan kembali view Breeze Blade dan `backend/student/*.blade.php` dari arsip.
  2. Kembalikan respons presentasi route auth & `student.*` ke `view(...)`.
  3. Nonaktifkan halaman React `Pages/Auth/**` dan `Pages/Student/**` yang bermasalah.
  4. Verifikasi login, registrasi, verifikasi email, dan dashboard Student berfungsi via Blade.
  5. Pertahankan Fase 1 (publik) tetap pada React jika Fase 1 stabil (rollback bersifat per fase, tidak harus total).

### Rollback Fase 3 — Instructor & Admin

- **Kondisi pemicu:** route `admin.*` atau `instructor.*` gagal render via React, regresi pada panel kritis (mis. moderasi/order), atau smoke test per peran gagal.
- **Langkah berurutan:**
  1. Aktifkan kembali view `backend/admin/*` dan `backend/instructor/*` dari arsip.
  2. Kembalikan respons presentasi route `admin.*` dan `instructor.*` ke `view(...)`.
  3. Nonaktifkan halaman React `Pages/Admin/**` dan `Pages/Instructor/**` yang bermasalah.
  4. Verifikasi dashboard Admin & Instructor serta operasi CRUD admin berfungsi via Blade.
  5. Tahan penghapusan permanen Blade sampai seluruh fase dinyatakan stabil.

> Catatan: rollback hanya membalik **lapisan presentasi**. Karena `Lapisan_Backend` tidak pernah diubah (Bagian 3), rollback tidak menyentuh model, route, controller logika bisnis, skema database, atau middleware peran.

---

## 10. Catatan Out-of-Scope

**(Memenuhi R7.6)**

Setiap usulan berikut **menyentuh `Lapisan_Backend`** dan karena itu **ditandai eksplisit sebagai rekomendasi untuk pekerjaan terpisah di luar scope fitur/migrasi presentasi ini**. Usulan-usulan ini **tidak** dieksekusi sebagai bagian dari migrasi presentasi:

- **OOS-1 — Perubahan signature/data controller di luar lapisan view.** Mengalihkan respons dari `view(...)` ke `Inertia::render(...)` adalah perubahan presentasi; namun bila sebuah halaman React menuntut **bentuk data baru** (mis. menambah field, agregasi, atau query baru pada controller), itu adalah pekerjaan backend terpisah.
- **OOS-2 — Server-Side Rendering (SSR) Inertia untuk SEO.** Penambahan SSR (mis. node SSR + konfigurasi server) menyentuh konfigurasi runtime backend dan dipisahkan sebagai pekerjaan tersendiri (terkait risiko R-4).
- **OOS-3 — Endpoint/route baru.** Penambahan atau perubahan nama/path route untuk kebutuhan halaman baru (mis. layar "Usulan baru" pada `Peta_Layar`) adalah pekerjaan backend terpisah.
- **OOS-4 — Perubahan request validation atau middleware.** Penyesuaian aturan validasi atau middleware peran untuk mendukung UI baru adalah pekerjaan backend terpisah.
- **OOS-5 — Perubahan skema database/migrasi.** Penambahan kolom/tabel untuk fitur UI baru dikecualikan; tidak ada migrasi yang dibuat oleh pekerjaan ini.
- **OOS-6 — Perubahan integrasi pihak ketiga** (Midtrans, Cloudinary, Reverb, Meilisearch, Socialite). Penyesuaian konfigurasi/kode integrasi untuk UI baru dikecualikan.

> Aturan umum: jika sebuah usulan dalam dokumen turunan menyiratkan perubahan pada `Lapisan_Backend`, usulan tersebut harus dirujuk balik ke daftar Out-of-Scope ini dan diangkat sebagai item pekerjaan terpisah, bukan dieksekusi dalam migrasi presentasi.

---

## 11. Traceability ke Requirements

| Bagian dokumen | Acceptance Criteria |
|---|---|
| Bagian 1 (berkas `MASTER_PLAN_REACT_INERTIA.md` dihasilkan) | R1.1 |
| Bagian 2 — Scope Statement | R1.2 |
| Bagian 3 — Pernyataan Pelestarian Backend | R7.7 |
| Bagian 4 — Baseline Scaffolding | R1.6 |
| Bagian 5 — Phased Approach (nama, tujuan, cakupan, exit criteria) | R1.3 |
| Bagian 5 & 6 — Deactivation Sequence per fase | R1.7 |
| Bagian 7 — Coexistence Strategy | R1.8 |
| Bagian 8 — Risk Register (≥5 risiko, skala & mitigasi) | R1.4 |
| Bagian 9 — Rollback Strategy per fase | R1.5 |
| Bagian 10 — Catatan Out-of-Scope | R7.6 |

---

_Dokumen ini adalah deliverable perencanaan berformat Markdown. Tidak ada kode produksi, controller, route, model, migrasi, atau perubahan skema database yang dieksekusi oleh dokumen ini._
