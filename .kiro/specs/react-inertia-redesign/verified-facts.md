# Catatan Fakta Terverifikasi — react-inertia-redesign

> **Sifat berkas:** Rujukan internal spec (Task 1.1). Berkas ini berada di `.kiro/specs/react-inertia-redesign/` **di luar** `BelajarKUY_docs/`, sehingga **tidak** termasuk dalam `Set_Dokumentasi` dan **tidak** masuk ke registry `Rencana_Update_Dok` (R3.2).
>
> **Tujuan:** Menjadi satu-satunya sumber nilai (single source of truth) untuk seluruh deliverable. Semua angka versi, nama route, prop Inertia, dan daftar layar yang dikutip dokumen lain WAJIB diambil dari berkas ini. Setiap nilai di bawah dikutip **verbatim** langsung dari `Kode_Nyata`/`Aset_Redesign`, bukan dari dokumen lama.
>
> **Tanggal ekstraksi:** 2026-05-31 (mengikuti penanggalan aset & dokumen proyek).
> **Traceability:** Requirements 8.1, 8.2, 8.3, 4.1.

---

## 1. Dependensi PHP — `composer.json`

Lokasi: `BelajarKUY/BelajarKUY/composer.json`

### 1.1 Blok `require` (verbatim)

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

### 1.2 Blok `require-dev` (verbatim)

```json
"require-dev": {
    "fakerphp/faker": "^1.23",
    "laravel/breeze": "^2.4",
    "laravel/pail": "^1.2.5",
    "laravel/pao": "^1.0.6",
    "laravel/pint": "^1.27",
    "mockery/mockery": "^1.6",
    "nunomaduro/collision": "^8.6",
    "phpunit/phpunit": "^12.5.12"
}
```

### 1.3 Tabel rujukan cepat (PHP)

| Paket | Versi (verbatim) | Blok |
|---|---|---|
| `php` | `^8.3` | require |
| `cloudinary/cloudinary_php` | `^3.1` | require |
| `inertiajs/inertia-laravel` | `^3.1` | require |
| `intervention/image` | `^4.0` | require |
| `laravel/framework` | `^13.7` | require |
| `laravel/reverb` | `^1.10` | require |
| `laravel/scout` | `^11.1` | require |
| `laravel/socialite` | `^5.27` | require |
| `laravel/tinker` | `^3.0` | require |
| `meilisearch/meilisearch-php` | `^1.16` | require |
| `midtrans/midtrans-php` | `^2.6` | require |
| `laravel/breeze` | `^2.4` | require-dev |
| `phpunit/phpunit` | `^12.5.12` | require-dev |

### 1.4 Konfirmasi: TIDAK ADA Filament

- **Terverifikasi:** Tidak ada paket apa pun dengan prefiks `filament/` pada `require` maupun `require-dev` di `composer.json`. Tidak ada `filament/filament`.
- Implikasi: klaim dokumen lama yang menyebut "Filament v5 terpasang" **tidak konsisten** dengan `Kode_Nyata` dan harus dikoreksi pada `Rencana_Update_Dok` (R3.8).

---

## 2. Dependensi JS — `package.json`

Lokasi: `BelajarKUY/BelajarKUY/package.json`

### 2.1 Blok `dependencies` (verbatim)

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

### 2.2 Blok `devDependencies` (verbatim)

```json
"devDependencies": {
    "@tailwindcss/forms": "^0.5.2",
    "@tailwindcss/vite": "^4.0.0",
    "alpinejs": "^3.15.12",
    "autoprefixer": "^10.4.2",
    "concurrently": "^9.0.1",
    "laravel-vite-plugin": "^3.1",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.1.0",
    "vite": "^8.0.0"
}
```

### 2.3 Tabel rujukan cepat (JS)

| Paket | Versi (verbatim) | Blok |
|---|---|---|
| `@headlessui/react` | `^2.2.10` | dependencies |
| `@inertiajs/react` | `^3.3.0` | dependencies |
| `@vitejs/plugin-react` | `^6.0.2` | dependencies |
| `axios` | `^1.16.0` | dependencies |
| `laravel-echo` | `^2.3.4` | dependencies |
| `lucide-react` | `^1.17.0` | dependencies |
| `pusher-js` | `^8.5.0` | dependencies |
| `react` | `^19.2.6` | dependencies |
| `react-dom` | `^19.2.6` | dependencies |
| `sweetalert2` | `^11.26.24` | dependencies |
| `@tailwindcss/forms` | `^0.5.2` | devDependencies |
| `@tailwindcss/vite` | `^4.0.0` | devDependencies |
| `alpinejs` | `^3.15.12` | devDependencies |
| `autoprefixer` | `^10.4.2` | devDependencies |
| `concurrently` | `^9.0.1` | devDependencies |
| `laravel-vite-plugin` | `^3.1` | devDependencies |
| `postcss` | `^8.4.31` | devDependencies |
| `tailwindcss` | `^3.1.0` | devDependencies |
| `vite` | `^8.0.0` | devDependencies |

### 2.4 Catatan dualitas Tailwind (penting untuk R8.1 & R3.8)

- Paket inti `tailwindcss` ada pada `devDependencies` dengan nilai **`^3.1.0`** (bukan v4).
- Plugin Vite `@tailwindcss/vite` ada pada `devDependencies` dengan nilai **`^4.0.0`**.
- Dokumen WAJIB mengutip kedua nilai apa adanya, karakter-demi-karakter, dan TIDAK boleh "membulatkan" menjadi "Tailwind v4". Dokumen lama yang menyebut "Tailwind v4" dikoreksi pada `Rencana_Update_Dok`.

### 2.5 Catatan Alpine.js

- `alpinejs ^3.15.12` masih ada di `devDependencies`, tetapi **bukan** lapisan presentasi utama setelah adopsi React+Inertia. Perannya diturunkan pada dokumentasi (R6.1 / M2).

---

## 3. Middleware Inertia — `HandleInertiaRequests.php`

Lokasi: `BelajarKUY/BelajarKUY/app/Http/Middleware/HandleInertiaRequests.php`

### 3.1 Root view

```php
protected $rootView = 'app';
```

- **rootView terverifikasi:** `'app'` (Inertia me-render ke Blade root view `resources/views/app.blade.php`).

### 3.2 Prop bersama (shared props) — verbatim

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

- **`auth.user`** membagikan field: `id`, `name`, `email`, `role`, `photo`, `email_verified_at` (null jika tidak login).
- **`flash`** membagikan kunci: `success`, `error`, `info`, `warning`.

---

## 4. Middleware Peran — `RoleMiddleware.php`

Lokasi: `BelajarKUY/BelajarKUY/app/Http/Middleware/RoleMiddleware.php`

### 4.1 Logika redirect berbasis peran (verbatim)

```php
return match($request->user()->role) {
    'admin' => redirect()->route('admin.dashboard'),
    'instructor' => redirect()->route('instructor.dashboard'),
    default => redirect()->route('dashboard'),
};
```

- Jika belum login → `redirect()->route('login')`.
- Jika `role` ada pada daftar `...$roles` → lanjut (`$next`).

### 4.2 Terminologi peran (enum) — untuk R8.2

| Nilai enum DB (`role`) | Istilah bisnis | Redirect default saat akses ditolak |
|---|---|---|
| `user` | Student | `dashboard` (cabang `default`) |
| `instructor` | Instructor | `instructor.dashboard` |
| `admin` | Admin | `admin.dashboard` |

- Nilai enum terverifikasi langsung dari kode: `admin`, `instructor`, dan default `user` (Student). Seluruh dokumen WAJIB memakai terminologi persis ini.

---

## 5. Route Nyata — `routes/web.php` & `routes/auth.php`

> Semua nama route di bawah dikutip dari pemanggilan `->name(...)` yang nyata. Path adalah URI yang didaftarkan.

### 5.1 Catatan penting: route `/` (landing) TIDAK bernama

```php
Route::get('/', function () {
    return view('welcome');
});
```

- Route landing page `/` adalah closure **tanpa** `->name(...)`. Jadi tidak ada nama route untuk `/`. Pada pemetaan layar, `landing_page_welcome` dipetakan ke **path** `/` (bukan named route).

### 5.2 Route bernama dari `routes/web.php`

| Nama route | Method | Path | Catatan |
|---|---|---|---|
| `dashboard` | GET | `/dashboard` | Universal; bercabang ke Admin/Instructor/Student berdasar `role`. Middleware `auth`, `verified` |
| `profile.edit` | GET | `/profile` | Breeze default |
| `profile.update` | PATCH | `/profile` | |
| `profile.destroy` | DELETE | `/profile` | |
| `admin.login.page` | GET | `/admin/login` | Halaman login admin terpisah; middleware `guest` |
| `admin.dashboard` | GET | `/admin/dashboard` | grup `role:admin` |
| `admin.categories.index` | GET | `/admin/categories` | `resource` except `show` |
| `admin.categories.create` | GET | `/admin/categories/create` | |
| `admin.categories.store` | POST | `/admin/categories` | |
| `admin.categories.edit` | GET | `/admin/categories/{category}/edit` | |
| `admin.categories.update` | PUT/PATCH | `/admin/categories/{category}` | |
| `admin.categories.destroy` | DELETE | `/admin/categories/{category}` | |
| `admin.sub-categories.*` | (resource except show) | `/admin/sub-categories...` | index/create/store/edit/update/destroy |
| `admin.courses.index` | GET | `/admin/courses` | `resource` only `index`,`show` |
| `admin.courses.show` | GET | `/admin/courses/{course}` | |
| `admin.courses.update-status` | PATCH | `/admin/courses/{course}/status` | |
| `admin.instructors.index` | GET | `/admin/instructors` | only `index`,`show` |
| `admin.instructors.show` | GET | `/admin/instructors/{instructor}` | |
| `admin.orders.index` | GET | `/admin/orders` | only `index`,`show` |
| `admin.orders.show` | GET | `/admin/orders/{order}` | |
| `admin.users.index` | GET | `/admin/users` | only `index` |
| `admin.sliders.*` | (resource except show) | `/admin/sliders...` | |
| `admin.info-boxes.*` | (resource except show) | `/admin/info-boxes...` | |
| `admin.partners.*` | (resource except show) | `/admin/partners...` | |
| `admin.reviews.index` | GET | `/admin/reviews` | |
| `admin.reviews.update-status` | PATCH | `/admin/reviews/{review}/status` | |
| `admin.settings.index` | GET | `/admin/settings` | |
| `admin.settings.update` | PUT | `/admin/settings` | |
| `admin.reviews.approve` | PATCH | `/admin/reviews/{review}/approve` | grup admin kedua |
| `admin.reviews.reject` | PATCH | `/admin/reviews/{review}/reject` | grup admin kedua |
| `instructor.dashboard` | GET | `/instructor/dashboard` | grup `role:instructor` |
| `student.dashboard` | GET | `/student/dashboard` | grup `role:user` |
| `student.my-courses` | GET | `/student/my-courses` | |
| `student.wishlist` | GET | `/student/wishlist` | |
| `student.wishlist.remove` | DELETE | `/student/wishlist/{id}` | |
| `student.profile` | GET | `/student/profile` | |
| `student.profile.update` | POST | `/student/profile` | |
| `student.setting` | GET | `/student/setting` | |
| `student.setting.update` | POST | `/student/setting` | |
| `auth.google` | GET | `/auth/google` | |
| `auth.google.callback` | GET | `/auth/google-callback` | |
| `home` | GET | `/home` | Placeholder Phase 2 (`HomeController@index`) |
| `course.detail` | GET | `/courses/{slug}` | Placeholder (view `frontend.course-detail`) |
| `cart.index` | GET | `/cart` | Placeholder (middleware `auth`) |
| `cart.add` | POST | `/cart/{course}` | Placeholder |
| `checkout` | GET | `/checkout` | Placeholder (middleware `auth`) |
| `checkout.process` | POST | `/checkout/process` | Placeholder |
| `payment.success` | GET | `/payment/success` | Placeholder (middleware `auth`) |
| `payment.failed` | GET | `/payment/failed` | Placeholder (middleware `auth`) |
| `course.review.store` | POST | `/courses/{course}/reviews` | Placeholder |
| `wishlist.add` | POST | `/wishlist/{course}` | Placeholder |

> Catatan: route `home`, `course.detail`, `cart.*`, `checkout*`, `payment.*`, `wishlist.add`, `course.review.store` saat ini adalah **placeholder** (sebagian me-render view Blade lama atau mengembalikan `back()`), namun namanya nyata dan dapat dijadikan target `route(...)`.

### 5.3 Route bernama dari `routes/auth.php`

| Nama route | Method | Path |
|---|---|---|
| `register` | GET | `/register` (juga POST `/register` tanpa nama terpisah) |
| `login` | GET | `/login` (juga POST `/login`) |
| `password.request` | GET | `/forgot-password` |
| `password.email` | POST | `/forgot-password` |
| `password.reset` | GET | `/reset-password/{token}` |
| `password.store` | POST | `/reset-password` |
| `verification.notice` | GET | `/verify-email` |
| `verification.verify` | GET | `/verify-email/{id}/{hash}` |
| `verification.send` | POST | `/email/verification-notification` |
| `password.confirm` | GET | `/confirm-password` |
| `password.update` | PUT | `/password` |
| `logout` | POST | `/logout` |

---

## 6. Set_Dokumentasi — Inventaris Lengkap `BelajarKUY_docs/`

> Sumber kelengkapan untuk registry `Rencana_Update_Dok` (R3.2). Inventaris ini mencakup **setiap berkas DAN folder**.

### 6.1 Akar `BelajarKUY_docs/` (file)

- `00_INDEX.md`
- `CHANGELOG.md`
- `PRD_BelajarKUY.md`

### 6.2 Folder + isi

| Folder | Berkas |
|---|---|
| `01_guides/` (8 file) | `AGENT_GUIDELINES.md`, `CODING_STANDARDS.md`, `GIT_WORKFLOW.md`, `GLOSSARY.md`, `SECURITY_GUIDELINES.md`, `SETUP_GUIDE.md`, `TESTING_STRATEGY.md`, `UI_UX_GUIDELINES.md` |
| `02_architecture/` (4 file + folder ADR) | `API_ROUTES.md`, `DATABASE_SCHEMA.md`, `FOLDER_STRUCTURE.md`, `TECH_STACK.md` |
| `02_architecture/ADR/` (8 file) | `README.md`, `ADR-001-midtrans-payment-gateway.md`, `ADR-002-frontend-blade-not-livewire.md`, `ADR-003-denormalized-instructor-in-orders.md`, `ADR-004-sandbox-only-midtrans.md`, `ADR-005-payout-out-of-scope.md`, `ADR-006-instructor-auto-active.md`, `ADR-007-role-naming.md` |
| `03_features/` (14 file) | `F01_AUTH_SYSTEM.md`, `F02_LANDING_PAGE.md`, `F03_COURSE_MANAGEMENT.md`, `F04_CATEGORY_SYSTEM.md`, `F05_CART_WISHLIST.md`, `F06_PAYMENT_MIDTRANS.md`, `F07_ADMIN_PANEL.md`, `F08_INSTRUCTOR_PANEL.md`, `F09_STUDENT_PANEL.md`, `F10_REVIEW_RATING.md`, `F11_COUPON_SYSTEM.md`, `F12_SITE_SETTINGS.md`, `F13_COURSE_PLAYER.md`, `F14_NOTIFICATIONS.md` |
| `04_plans/` (3 file) | `MASTER_ROADMAP.md`, `SPRINT_PLAN.md`, `TASK_DISTRIBUTION.md` |
| `05_prompts/` (8 file) | `PROMPT_ADMIN_PANEL.md`, `PROMPT_AUTH.md`, `PROMPT_FRONTEND.md`, `PROMPT_MIDTRANS.md`, `PROMPT_MIGRATIONS.md`, `PROMPT_MODELS.md`, `PROMPT_SETUP_PROJECT.md`, `STITCH_REDESIGN_PROMPTS.md` |
| `06_reports/` (6 file) | `PROGRESS_TRACKER.md`, `REPORT_2026-05-13_DATABASE_LAYER.md`, `REPORT_2026-05-14_DOCS_AUDIT_CLEANUP.md`, `REPORT_2026-05-14_SEEDERS_FACTORIES.md`, `REPORT_2026-05-17_AUTH_SYSTEM.md`, `REPORT_2026-05-19_PHASE1_COMPLETION.md` |
| `07_extras/` (3 file) | `AUDIT_DOCS_REVIEW.md`, `ERD_BelajarKUY.html`, `TECH_STACK_EXTRAS.md` |

### 6.3 Rekap jumlah untuk validasi registry

| Kategori | Jumlah folder | Jumlah file |
|---|---|---|
| Akar | — | 3 |
| `01_guides/` | 1 | 8 |
| `02_architecture/` | 1 | 4 |
| `02_architecture/ADR/` | 1 | 8 (README + ADR-001..007) |
| `03_features/` | 1 | 14 |
| `04_plans/` | 1 | 3 |
| `05_prompts/` | 1 | 8 |
| `06_reports/` | 1 | 6 |
| `07_extras/` | 1 | 3 (termasuk satu `.html`) |
| **Total** | **8 folder** | **57 file** |

> Catatan scope (R7.1): `07_extras/ERD_BelajarKUY.html` adalah berkas non-`.md` yang **sudah ada** (bukan deliverable yang dihasilkan fitur ini). Berkas tetap dicatat di registry sebagai item `Set_Dokumentasi`, tetapi tidak boleh dijadikan deliverable baru.

### 6.4 Status ADR — konfirmasi penomoran (R5.1, R5.7)

- **Terverifikasi ADA:** `ADR-001` s.d. `ADR-007` di `02_architecture/ADR/` (lihat daftar 6.2).
- **Terverifikasi BELUM ADA:** `ADR-008`. Tidak ada berkas dengan prefiks `ADR-008-` di direktori ADR. Nomor urut berikutnya = `ADR-008` (aman dibuat, tidak ada konflik nomor).

---

## 7. Aset_Redesign — Inventaris Layar Valid (R4.1)

> **Definisi layar (R4.1):** folder yang memuat **`code.html` DAN `screen.png`**. Folder lain dikecualikan.
>
> Akar: `BelajarKuy_Design_Revisi/BelajarKuy_Design_Revisi/` berisi 4 folder ekspor Stitch: `stitch_branded_web_interface_design (5)`, `(6)`, `(7)`, `(8)`. Setiap ekspor punya subfolder `stitch_branded_web_interface_design/` yang memuat folder-folder layar.

### 7.1 Ekspor (5) — 7 layar valid

1. `checkout_pesanan`
2. `detail_kursus_fullstack_web_dev`
3. `instructor_dashboard`
4. `katalog_kursus_home`
5. `keranjang_belanja`
6. `landing_page_welcome`
7. `student_dashboard`

### 7.2 Ekspor (6) — 12 layar valid

1. `admin_dashboard_overview`
2. `course_player_fullstack_web_dev`
3. `edit_kurikulum_kursus`
4. `informasi_dasar_kursus`
5. `manajemen_kategori_kursus`
6. `manajemen_kupon_diskon`
7. `manajemen_kursus_instruktur`
8. `moderasi_kursus_admin_panel`
9. `moderasi_review_siswa`
10. `pembayaran_berhasil`
11. `pembayaran_gagal`
12. `pengaturan_situs_global`

### 7.3 Ekspor (7) — 13 layar valid

1. `course_player_mobile`
2. `daftar_pengguna_admin_panel`
3. `katalog_kursus_search_empty_state`
4. `keranjang_belanja_filled_state`
5. `kursus_saya_empty_state`
6. `landing_page_mobile`
7. `login_registrasi_belajarkuy`
8. `manajemen_pesanan_admin_panel`
9. `pengaturan_profil_akun`
10. `profil_instruktur_public_view`
11. `pusat_notifikasi_student`
12. `riwayat_transaksi_saya`
13. `student_dashboard_empty_state`

### 7.4 Ekspor (8) — 9 layar valid

1. `admin_dashboard_final_polish`
2. `error_403_minimalist_no_illustration`
3. `error_404_minimalist_no_illustration`
4. `error_419_minimalist_no_illustration`
5. `error_429_minimalist_no_illustration`
6. `error_500_minimalist_no_illustration`
7. `error_503_minimalist_no_illustration`
8. `katalog_kursus_final_polish`
9. `student_dashboard_final_polish`

### 7.5 Total & rekap

| Ekspor | Layar valid |
|---|---|
| (5) | 7 |
| (6) | 12 |
| (7) | 13 |
| (8) | 9 |
| **Total** | **41** |

> **Koreksi terhadap `design.md`:** Narasi `design.md` menulis "7 + 13 + 13 + 9" untuk total layar. Hitungan aktual terverifikasi adalah **7 + 12 + 13 + 9 = 41** (Ekspor (6) memuat **12** layar valid, bukan 13). Total `41` tetap benar; per-ekspor harus memakai angka pada tabel 7.5 ini. `Peta_Layar` (Task 4.1) WAJIB memakai inventaris di sini.

### 7.6 Folder NON-layar yang dikecualikan

| Folder | Lokasi | Alasan dikecualikan |
|---|---|---|
| `rocket_growth_modern/` | ada di setiap ekspor (5), (6), (7), (8) | hanya memuat `DESIGN.md`; tidak ada `code.html`+`screen.png` |
| `whatsapp_image_2026_05_31_at_22.48.53.jpeg/` | Ekspor (5) | hanya memuat `screen.png`; tidak ada `code.html` |
| `whatsapp_image_2026_05_31_at_22.48.53_1.jpeg/` | Ekspor (5) | hanya memuat `screen.png`; tidak ada `code.html` |
| `prd.md` | Ekspor (5) (file, bukan folder layar) | berkas PRD redesign; bukan folder layar |

---

## 8. Ringkasan Konflik Dokumentasi vs Kode (untuk R3.7, R3.8)

> Daftar awal ketidaksesuaian yang terverifikasi dari `Kode_Nyata`. Dirinci & dikoreksi di `Rencana_Update_Dok`.

| Item | Klaim dokumen lama | Nilai pada `Kode_Nyata` (verbatim) | Sumber |
|---|---|---|---|
| Laravel | `12.x` | `^13.7` | `composer.json` → `laravel/framework` |
| Filament | terpasang (mis. Filament v5) | **tidak ada** pada `require`/`require-dev` | `composer.json` |
| Tailwind CSS | `v4` | `tailwindcss ^3.1.0` (+ `@tailwindcss/vite ^4.0.0`) | `package.json` → devDependencies |
| Frontend stack | Blade + Alpine.js; Inertia ditolak (`ADR-002`) | Inertia+React terpasang: `inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`, `react ^19.2.6` | `composer.json`, `package.json`, `HandleInertiaRequests.php` |
| Alpine.js (peran) | pustaka interaktivitas utama | `alpinejs ^3.15.12` di devDependencies; bukan lapisan presentasi utama | `package.json` |

---

_Berkas ini adalah rujukan internal Task 1.1 dan tidak masuk `Set_Dokumentasi`._
