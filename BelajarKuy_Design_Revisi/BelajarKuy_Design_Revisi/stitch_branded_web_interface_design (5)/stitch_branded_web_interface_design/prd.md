# PRD — BelajarKUY

**Product Requirements Document — Edisi Lengkap**
Platform: **BelajarKUY** — E‑Learning Marketplace
Versi dokumen: 2.0 · Tanggal: 31 Mei 2026 · Status: Living document
Penyusun: Tim Produk BelajarKUY

> Dokumen ini mendesain web **halaman per halaman, route per route, untuk seluruh peran** (Student/User, Instructor, Admin, plus aktor sistem Midtrans). Untuk setiap halaman dicantumkan: **wireframe**, **isi halaman**, **daftar FITUR di halaman tersebut**, **alur/UX**, **state (kosong/loading/error)**, **route + middleware + controller**, dan **status implementasi nyata** di codebase.

---

## Daftar Isi

1. Ringkasan Produk & Visi
2. Persona & Aktor
3. Tech Stack (Pembangun Web)
4. Arsitektur Sistem
5. Sistem Peran & Matriks Otorisasi
6. Peta Route Lengkap
7. Desain Global UI / Design System
8. Halaman Publik / Frontend
9. Halaman Autentikasi
10. Halaman Student
11. Halaman Instructor
12. Halaman Admin
13. Data Dictionary (per tabel, per kolom)
14. Relasi Antar Entitas (ERD ringkas)
15. Aturan Bisnis
16. User Journey
17. Integrasi Pembayaran (Midtrans)
18. Pencarian, Realtime, Email
19. Kebutuhan Non‑Fungsional
20. Keamanan
21. Status Implementasi & Roadmap
22. Lampiran (Glosarium, ADR, format Changelog)

---

## 1. Ringkasan Produk & Visi

### 1.1 Deskripsi
**BelajarKUY** adalah platform *e‑learning marketplace* (model serupa Udemy) tempat:

- **Instructor** membuat & menjual kursus berisi video, materi tertulis, dan kupon diskon.
- **Student/User** menelusuri katalog, membeli kursus, menonton materi, melacak progres belajar, dan memberi review.
- **Admin** mengelola katalog (kategori/sub‑kategori), konten CMS homepage, moderasi kursus & review, serta memantau transaksi.
- **Midtrans** (aktor sistem) memverifikasi pembayaran melalui webhook.

### 1.2 Visi Produk
Menjadi marketplace kursus berbahasa Indonesia yang **andal secara transaksi** (tidak ada pembayaran ganda/hilang), **terlacak secara progres belajar**, dan **aman per peran**.

### 1.3 Tujuan Produk (Goals)
1. Marketplace kursus dengan alur beli–bayar–enroll yang konsisten.
2. Pengalaman belajar terukur (progress per lecture, persentase penyelesaian per kursus & keseluruhan).
3. Tiga panel terpisah & terlindungi sesuai peran.
4. CMS homepage agar admin dapat mengatur tampilan tanpa deploy ulang.

### 1.4 KPI / Metrik Keberhasilan (target awal)
| Metrik | Definisi | Target |
| --- | --- | --- |
| Conversion rate | enrollment / pengunjung katalog | ≥ 3% |
| Course completion | rata‑rata progress kursus per student | ≥ 40% |
| Pembayaran sukses | settlement / total checkout | ≥ 95% |
| Review approved | review approved / review masuk | dipantau admin |
| Retensi instruktur | instruktur dengan ≥1 kursus aktif | naik tiap bulan |

### 1.5 Non‑Goals (di luar lingkup awal)
- Aplikasi mobile native (hanya web responsif).
- Live class / video conference.
- Sertifikat ber‑PDF otomatis (rencana masa depan).
- Pembagian payout instruktur otomatis (ADR‑005: revenue dicatat gross, payout manual).

---

## 2. Persona & Aktor

### 2.1 Aktor (Stakeholder)
| Aktor | Nilai `role` | Aktivitas Utama | Data yang Dihasilkan |
| --- | --- | --- | --- |
| **Student / Pelajar** | `user` | Daftar, beli kursus, nonton, kasih review | profil, cart, wishlist, order, review, lecture progress |
| **Instructor** | `instructor` | Buat kursus, set harga, buat kupon, lihat penjualan | course, section, lecture, coupon, dashboard penjualan |
| **Admin** | `admin` | Kelola kategori, slider, partner, moderasi review & course | category, sub_category, slider, info_box, partner, site_info |
| **Midtrans** | (sistem) | Verifikasi pembayaran via webhook | payment record + JSON response |

### 2.2 Persona Ringkas
- **"Rani" — Student (22, mahasiswa).** Ingin belajar skill praktis, harga terjangkau, butuh progres yang jelas dan bisa dilanjutkan kapan saja.
- **"Budi" — Instructor (30, praktisi).** Ingin menjual keahlian, mengelola kurikulum video, dan melihat pendapatan kotor.
- **"Sari" — Admin (operasional).** Menjaga kualitas katalog, mengatur banner homepage, memoderasi review yang masuk.

---

## 3. Tech Stack (Pembangun Web)

### 3.1 Backend
| Komponen | Teknologi | Versi | Peran & Rationale |
| --- | --- | --- | --- |
| Bahasa | PHP | ^8.3 | Runtime, fitur tipe modern |
| Framework | **Laravel** | ^13.7 | MVC, routing, Eloquent ORM, queue, broadcasting |
| Auth scaffolding | **Laravel Breeze** | ^2.4 | Login/Register/Reset/Verify (Blade stack) |
| Social login | **Laravel Socialite** | ^5.27 | Google OAuth (driver `google`) |
| Pembayaran | **Midtrans PHP** | ^2.6 | Snap/Core API + webhook notifikasi |
| Media/storage | **Cloudinary PHP** | ^3.1 | Simpan gambar (`image_url` + `image_public_id`) |
| Image processing | **Intervention Image** | ^4.0 | Resize/optimize sebelum unggah |
| Pencarian | **Laravel Scout** + **Meilisearch** | ^11.1 / ^1.16 | Full‑text search kursus |
| Realtime | **Laravel Reverb** | ^1.10 | WebSocket server broadcasting |
| Dev REPL | **Tinker** | ^3.0 | Debug interaktif |
| Logging dev | **Pail** | ^1.2 | Tail log real‑time |
| Code style | **Pint** | ^1.27 | Formatter PSR |
| Testing | **PHPUnit** | ^12.5 | Unit/feature test |
| Error dev | **Collision** | ^8.6 | Tampilan error CLI |
| Faker | **fakerphp/faker** | ^1.23 | Data seeding |

### 3.2 Frontend
| Komponen | Teknologi | Versi | Peran |
| --- | --- | --- | --- |
| Templating | **Blade** | (Laravel) | Server‑side rendering |
| Build tool | **Vite** | ^8.0 | Bundling + HMR |
| CSS | **Tailwind CSS** | ^3.1 | Styling utility‑first |
| Form plugin | `@tailwindcss/forms` | ^0.5 | Normalisasi elemen form |
| JS interaktif | **Alpine.js** | ^3.15 | Dropdown, modal, toggle ringan |
| HTTP client | **Axios** | ^1.16 | Request AJAX |
| Realtime client | **Laravel Echo** + **pusher-js** | ^2.3 / ^8.5 | Konsumsi WebSocket (Reverb) |
| Alert/UX | **SweetAlert2** | ^11.26 | Konfirmasi & notifikasi visual |
| Orkestrasi dev | **concurrently** | ^9.0 | Jalankan server+queue+log+vite paralel |

### 3.3 Data & Infrastruktur
- **Database:** MySQL 8 (InnoDB) — relasional, FK + transaksi ACID. 19 entitas inti.
- **Cache / Queue / Session:** driver database (tabel `cache`, `jobs`, `sessions`).
- **Media:** Cloudinary (`image_url` + `image_public_id`). Fallback lokal `public/uploads/profile` untuk foto profil student.
- **Auth:** password bcrypt (cast `hashed`), email verification, Google OAuth auto‑verified.

### 3.4 Konfigurasi Layanan (ENV penting)
```
APP_URL, DB_*                         # aplikasi & database
GOOGLE_CLIENT_ID/SECRET/REDIRECT      # Socialite
MIDTRANS_SERVER_KEY/CLIENT_KEY/IS_PRODUCTION
CLOUDINARY_URL / CLOUDINARY_*         # media
SCOUT_DRIVER=meilisearch, MEILISEARCH_HOST/KEY
REVERB_APP_*, BROADCAST_CONNECTION=reverb
MAIL_*                                # verifikasi & notifikasi
```

### 3.5 Perintah Pengembangan
- `composer run dev` → menjalankan `php artisan serve` + `queue:listen` + `pail` + `npm run dev` secara paralel.
- `composer run setup` → install, key generate, migrate, npm install, build.
- `composer run test` → clear config + `php artisan test`.

> ⚠️ **Catatan akurasi:** commit terakhir menyebut "Filament v5", **namun `composer.json` TIDAK memuat paket Filament**. Panel admin saat ini **custom** (Controller `App\Http\Controllers\Admin\*` + Blade `resources/views/admin/*`), bukan Filament. PRD ini mengikuti kode nyata.

---

## 4. Arsitektur Sistem

### 4.1 Diagram Lapisan
```
┌──────────────────────────────────────────────────────────────┐
│  CLIENT (Browser)                                            │
│  Blade + Tailwind + Alpine.js + Echo + SweetAlert2          │
└───────────────┬──────────────────────────────────────────────┘
                │ HTTP / WebSocket
┌───────────────▼──────────────────────────────────────────────┐
│  LARAVEL APP                                                 │
│  Routes (web.php, auth.php) → Middleware (auth/verified/role)│
│  Controllers (Frontend / Backend\{Admin,Instructor,Student} │
│               / Admin\* CRUD / Auth\*)                      │
│  Models (Eloquent) ── relasi & scope ── Accessors           │
│  Queue (jobs) · Broadcasting (Reverb) · Scout (Meilisearch) │
└───────┬───────────────┬───────────────┬─────────────────────┘
        │               │               │
  ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
  │  MySQL 8  │   │ Cloudinary│   │  Midtrans │
  │ (InnoDB)  │   │  (media)  │   │ (payment) │
  └───────────┘   └───────────┘   └───────────┘
```

### 4.2 Pola Panel & Routing
- **`/dashboard` universal** — satu URL, konten dipilih berdasar `role` lewat `match()`: `admin`→AdminDashboard, `instructor`→InstructorDashboard, default→StudentDashboard. Middleware `auth` + `verified`.
- **`/admin/*`** — prefix `admin`, name `admin.`, middleware `auth, verified, role:admin`.
- **`/instructor/*`** — middleware `auth, verified, role:instructor`.
- **`/student/*`** — middleware `auth, verified, role:user`.
- **Frontend publik** — `/`, `/home`, `/courses/{slug}` tanpa auth; cart/checkout/payment butuh `auth`.

### 4.3 Middleware `role`
Alias `role` → `App\Http\Middleware\RoleMiddleware`, terdaftar di `bootstrap/app.php`. Memblokir akses lintas peran (mis. student membuka `/admin/*` → ditolak).

### 4.4 Legend Status Implementasi (dipakai sepanjang dokumen)
- 🟢 **Implemented** — controller + view aktif & berfungsi.
- 🟡 **Placeholder** — route terdaftar, view statis/kosong, logika belum jalan (Phase 2/3/5).
- 🔵 **Planned** — disebut di analisis/aturan bisnis, belum ada route/halaman.

---

## 5. Sistem Peran & Matriks Otorisasi

### 5.1 Definisi Peran (kolom `users.role`, enum)
| Label produk | Nilai DB | Helper model | Self‑register? |
| --- | --- | --- | --- |
| Student / Pelajar | `user` | `isStudent()` | ✅ (default) |
| Instructor | `instructor` | `isInstructor()` | ✅ (pilih saat daftar) |
| Admin | `admin` | `isAdmin()` | ❌ (dibuat manual/seed) |

### 5.2 Matriks Akses (ringkas)
| Kapabilitas | Guest | Student | Instructor | Admin |
| --- | :--: | :--: | :--: | :--: |
| Lihat katalog `/home` | ✅ | ✅ | ✅ | ✅ |
| Lihat detail kursus | ✅ | ✅ | ✅ | ✅ |
| Tambah cart/wishlist | ❌ | ✅ | ✅ | ✅ |
| Checkout & bayar | ❌ | ✅ | ✅* | ✅* |
| Tonton kursus enroll | ❌ | ✅ | ✅ | ✅ |
| Tulis review (post‑enroll) | ❌ | ✅ | ✅ | ✅ |
| Dashboard student | ❌ | ✅ | ❌ | ❌ |
| Buat/kelola kursus | ❌ | ❌ | ✅(🔵) | ❌ |
| Dashboard instruktur | ❌ | ❌ | ✅ | ❌ |
| Panel admin (CRUD katalog/CMS) | ❌ | ❌ | ❌ | ✅ |
| Moderasi review & course | ❌ | ❌ | ❌ | ✅ |

\* secara teknis bisa, namun BR‑02 melarang membeli kursus milik sendiri.

---

## 6. Peta Route Lengkap

### 6.1 Publik & umum (routes/web.php)
| # | Method | URI | Name | Middleware | Controller/Aksi | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | GET | `/` | — | — | `welcome` view | 🟢 |
| 2 | GET | `/home` | `home` | — | `Frontend\HomeController@index` | 🟢 |
| 3 | GET | `/courses/{slug}` | `course.detail` | — | `frontend.course-detail` view | 🟡 |
| 4 | GET | `/dashboard` | `dashboard` | auth, verified | dispatch per role | 🟢 |
| 5 | GET | `/profile` | `profile.edit` | auth | `ProfileController@edit` | 🟢 |
| 6 | PATCH | `/profile` | `profile.update` | auth | `ProfileController@update` | 🟢 |
| 7 | DELETE | `/profile` | `profile.destroy` | auth | `ProfileController@destroy` | 🟢 |
| 8 | GET | `/admin/login` | `admin.login.page` | guest | `auth.admin-login` view | 🟢 |
| 9 | GET | `/cart` | `cart.index` | auth | placeholder `dashboard` view | 🟡 |
| 10 | POST | `/cart/{course}` | `cart.add` | auth | placeholder (info flash) | 🟡 |
| 11 | GET | `/checkout` | `checkout` | auth | `frontend.checkout` view | 🟡 |
| 12 | POST | `/checkout/process` | `checkout.process` | auth | `frontend.checkout-process` view | 🟡 |
| 13 | GET | `/payment/success` | `payment.success` | auth | `frontend.payment-success` view | 🟡 |
| 14 | GET | `/payment/failed` | `payment.failed` | auth | `frontend.payment-failed` view | 🟡 |
| 15 | POST | `/courses/{course}/reviews` | `course.review.store` | auth | placeholder (info flash) | 🟡 |
| 16 | POST | `/wishlist/{course}` | `wishlist.add` | auth | placeholder (info flash) | 🟡 |
| 17 | GET | `/auth/google` | `auth.google` | — | `GoogleController@redirect` | 🟢 |
| 18 | GET | `/auth/google-callback` | `auth.google.callback` | — | `GoogleController@callback` | 🟢 |

### 6.2 Autentikasi (routes/auth.php — Breeze)
| Method | URI | Name | Middleware | Status |
| --- | --- | --- | --- | --- |
| GET/POST | `/register` | `register` | guest | 🟢 |
| GET/POST | `/login` | `login` | guest | 🟢 |
| GET/POST | `/forgot-password` | `password.request` / `password.email` | guest | 🟢 |
| GET/POST | `/reset-password/{token}` | `password.reset` / `password.store` | guest | 🟢 |
| GET | `/verify-email` | `verification.notice` | auth | 🟢 |
| GET | `/verify-email/{id}/{hash}` | `verification.verify` | auth, signed, throttle:6,1 | 🟢 |
| POST | `/email/verification-notification` | `verification.send` | auth, throttle:6,1 | 🟢 |
| GET/POST | `/confirm-password` | `password.confirm` | auth | 🟢 |
| PUT | `/password` | `password.update` | auth | 🟢 |
| POST | `/logout` | `logout` | auth | 🟢 |

### 6.3 Admin (`/admin`, role:admin)
| Method | URI | Name | Status |
| --- | --- | --- | --- |
| GET | `/admin/dashboard` | `admin.dashboard` | 🟢 |
| resource | `/admin/categories` (kecuali show) | `admin.categories.*` | 🟢 |
| resource | `/admin/sub-categories` (kecuali show) | `admin.sub-categories.*` | 🟢 |
| GET | `/admin/courses` + `/{course}` | `admin.courses.index/show` | 🟢 |
| PATCH | `/admin/courses/{course}/status` | `admin.courses.update-status` | 🟢 |
| GET | `/admin/instructors` + `/{instructor}` | `admin.instructors.index/show` | 🟢 |
| GET | `/admin/orders` + `/{order}` | `admin.orders.index/show` | 🟢 |
| GET | `/admin/users` | `admin.users.index` | 🟢 |
| resource | `/admin/sliders` (kecuali show) | `admin.sliders.*` | 🟢 |
| resource | `/admin/info-boxes` (kecuali show) | `admin.info-boxes.*` | 🟢 |
| resource | `/admin/partners` (kecuali show) | `admin.partners.*` | 🟢 |
| GET/PATCH | `/admin/reviews` + `/{review}/status` | `admin.reviews.index/update-status` | 🟢 |
| PATCH | `/admin/reviews/{review}/approve\|reject` | `admin.reviews.approve/reject` | 🟢 |
| GET/PUT | `/admin/settings` | `admin.settings.index/update` | 🟢 |

### 6.4 Instructor (`/instructor`, role:instructor)
| Method | URI | Name | Status |
| --- | --- | --- | --- |
| GET | `/instructor/dashboard` | `instructor.dashboard` | 🟢 (read‑only stats) |

### 6.5 Student (`/student`, role:user)
| Method | URI | Name | Status |
| --- | --- | --- | --- |
| GET | `/student/dashboard` | `student.dashboard` | 🟢 |
| GET | `/student/my-courses` | `student.my-courses` | 🟢 |
| GET | `/student/wishlist` | `student.wishlist` | 🟢 |
| DELETE | `/student/wishlist/{id}` | `student.wishlist.remove` | 🟢 |
| GET/POST | `/student/profile` | `student.profile` / `.update` | 🟢 |
| GET/POST | `/student/setting` | `student.setting` / `.update` | 🟢 |

---

## 7. Desain Global UI / Design System

### 7.1 Layout
| Layout | File | Dipakai oleh |
| --- | --- | --- |
| `guest` | `layouts/guest.blade.php` | Halaman auth |
| `app` | `layouts/app.blade.php` | Halaman bernavbar (frontend & student) |
| `admin` | `layouts/admin.blade.php` | Seluruh panel admin |
| Sidebar student | `backend/student/layouts/sidebar.blade.php` | Panel student |

### 7.2 Komponen Blade tersedia (`resources/views/components/`)
`application-logo`, `navbar`, `navigation`, `footer`, `course-card`, `dropdown`, `dropdown-link`, `nav-link`, `responsive-nav-link`, `modal`, `primary-button`, `secondary-button`, `danger-button`, `text-input`, `input-label`, `input-error`, `auth-session-status`.

### 7.3 Prinsip Visual
- **Warna:** palet Tailwind, aksen brand (indigo/biru). Status: hijau=sukses, merah=bahaya, kuning=peringatan.
- **Tipografi:** font default Tailwind; heading tebal, body reguler.
- **Spacing:** skala Tailwind (`p-4`, `gap-6`, dst).
- **Responsif:** mobile‑first; breakpoint `sm/md/lg/xl`. Navbar collapse jadi menu hamburger di mobile.
- **Ikon:** ikon SVG inline / class.

### 7.4 Pola UX Lintas Halaman (berlaku global)
- **Flash message:** sukses/error/info ditampilkan di atas konten; aksi destruktif memakai konfirmasi **SweetAlert2**.
- **Validasi form:** inline lewat komponen `input-error`, pesan berbahasa Indonesia.
- **Empty state:** tiap daftar punya pesan kosong + CTA (mis. "Belum ada kursus — Jelajahi katalog").
- **Loading:** indikator pada submit; build aset via Vite.
- **Aksesibilitas:** label form terkait input, kontras warna memadai.

---

## 8. Halaman Publik / Frontend

### 8.1 Landing `/` — `welcome.blade.php` 🟢
**Route:** `GET /` (closure view). **Akses:** semua.

**Wireframe**
```
┌────────────────────────────────────────────┐
│  [Logo BelajarKUY]        Login  Daftar     │  ← navbar
├────────────────────────────────────────────┤
│        HERO: "Belajar skill baru, KUY!"     │
│        [ Mulai Belajar ]  [ Lihat Katalog ] │
├────────────────────────────────────────────┤
│   Keunggulan singkat / highlight platform   │
├────────────────────────────────────────────┤
│                 Footer                      │
└────────────────────────────────────────────┘
```

**Isi halaman:** hero brand, tagline, CTA utama, tautan ke `/home` dan auth.

**Fitur di halaman ini:**
- Tombol CTA "Mulai Belajar" → arahkan ke register/katalog.
- Navigasi ke Login & Daftar.
- Link cepat ke katalog `/home`.

**UX:** halaman pembuka untuk tamu; mengarahkan ke katalog atau registrasi.

---

### 8.2 Beranda / Katalog `/home` — `frontend/home.blade.php` 🟢
**Route:** `GET /home` → `HomeController@index`. **Akses:** semua.

**Wireframe**
```
┌────────────────────────────────────────────┐
│  Navbar (cari kursus...) [🔍]   akun/login  │
├────────────────────────────────────────────┤
│  ◀  SLIDER / BANNER (auto)               ▶ │
├────────────────────────────────────────────┤
│  [Info Box 1] [Info Box 2] [Info Box 3] ... │  ← USP
├────────────────────────────────────────────┤
│  Kategori Populer: [Web][Design][Data]...   │  ← 8 teratas
├────────────────────────────────────────────┤
│  ★ Kursus Unggulan (Featured)               │
│  [card][card][card][card] ...               │
├────────────────────────────────────────────┤
│  🔥 Kursus Terlaris (Bestseller)            │
│  [card][card][card][card] ...               │
├────────────────────────────────────────────┤
│                 Footer + Partner logos      │
└────────────────────────────────────────────┘
```

**Isi (dari `HomeController@index`):**
- `sliders` — banner status aktif, urut `order_position`.
- `infoBoxes` — USP/keunggulan.
- `categories` — 8 kategori teratas (diurut jumlah course aktif, `withCount`).
- Mode default: `featuredCourses` (8) + `bestsellerCourses` (8, diurut `enrollments_count`).
- Mode cari/filter: bila ada `?search=` / `?category=`, tampilkan `filteredCourses`.

**Fitur di halaman ini:**
- 🔎 **Pencarian kursus** by judul (`?search=`, `LIKE`).
- 🗂️ **Filter kategori** by slug (`?category=`).
- 🎞️ **Slider banner** dinamis (CMS).
- 🧩 **Info box** keunggulan platform.
- 🏷️ **Kategori populer** klik → filter katalog.
- ⭐ **Section Featured** & 🔥 **Bestseller** terpisah.
- 🃏 **Course card**: thumbnail, judul, instruktur, rating rata‑rata (review approved), harga & harga setelah diskon.
- ↪️ Klik kartu → halaman detail kursus.

**States:**
- *Kosong:* jika tidak ada kursus → tampilkan pesan & CTA daftar jadi instruktur.
- *Hasil cari kosong:* "Tidak ada kursus untuk kata kunci tersebut."

**Acceptance criteria:** AC‑HOME‑1 saat tanpa query, featured & bestseller tampil; AC‑HOME‑2 saat `?search=` diisi, hanya `filteredCourses` tampil; AC‑HOME‑3 harga diskon dihitung dari accessor `discounted_price`.

---

### 8.3 Detail Kursus `/courses/{slug}` — `frontend/course-detail.blade.php` 🟡
**Route:** `GET /courses/{slug}` (closure view; `CourseDetailController` tersedia tapi belum di‑wire). **Akses:** semua.

**Wireframe**
```
┌────────────────────────────────────────────┐
│  Judul Kursus           ┌───────────────┐   │
│  Instruktur · Rating ★  │  PREVIEW VIDEO │   │
│  Kategori               │   ▶            │   │
│                         ├───────────────┤   │
│  Deskripsi panjang...   │  Rp149.000     │   │
│                         │  (diskon -20%) │   │
│  Yang akan dipelajari:  │ [Tambah Cart]  │   │
│   ✓ goal 1  ✓ goal 2    │ [Beli Sekarang]│   │
│   ✓ goal 3 ...          │ [♥ Wishlist]   │   │
│                         └───────────────┘   │
│  Kurikulum:                                 │
│   ▸ Section 1 (3 lecture · 25m)             │
│       • Lecture 1.1 [preview] 8m            │
│       • Lecture 1.2  10m                    │
│   ▸ Section 2 ...                           │
│  Review (approved): ★★★★☆ "Bagus!" ...      │
└────────────────────────────────────────────┘
```

**Isi (target):** judul, deskripsi, preview video, daftar **goals**, **kurikulum** (sections→lectures + durasi), profil instruktur, harga/diskon, rating + review approved.

**Fitur di halaman ini (target):**
- ▶️ **Preview video** kursus & lecture bertanda preview.
- 🎯 **Daftar goals** ("yang akan dipelajari").
- 📚 **Kurikulum accordion** (section → lecture + durasi).
- 👤 **Profil instruktur**.
- ⭐ **Rating & review** approved.
- 🛒 **Tambah ke Cart** / ♥ **Wishlist** / 💳 **Beli sekarang**.
- 🔁 Jika sudah enroll → tombol berubah **"Lanjut Belajar"**.

**Status:** view dirender statis; perlu binding `slug→Course` + relasi (goals, sections.lectures, reviews, instructor). 🔵 belum ada logika.

**Acceptance criteria (target):** AC‑CD‑1 slug tidak ditemukan → 404; AC‑CD‑2 user enroll melihat tombol "Lanjut Belajar"; AC‑CD‑3 hanya review approved tampil.

---

### 8.4 Keranjang `/cart` & `POST /cart/{course}` 🟡
**Route:** `GET /cart` (placeholder), `POST /cart/{course}` (flash). **Akses:** auth.

**Wireframe (target)**
```
┌────────────────────────────────────────────┐
│  Keranjang (2)                              │
│  [thumb] Kursus A      Rp99.000   [Hapus]   │
│  [thumb] Kursus B      Rp149.000  [Hapus]   │
│  ─────────────────────────────────────────  │
│  Kupon: [________] [Terapkan]               │
│  Subtotal ............... Rp248.000         │
│                      [ Lanjut Checkout → ]  │
└────────────────────────────────────────────┘
```

**Fitur di halaman ini (target):**
- 🧺 **Daftar item** keranjang (thumbnail, judul, harga real‑time dari course).
- ❌ **Hapus item**.
- 🎟️ **Input & terapkan kupon**.
- 🧮 **Ringkasan subtotal**.
- ➡️ **Tombol checkout**.

**Aturan:** UNIQUE (user, course) — tak boleh ganda (BR‑03/04 keluarga unik); BR‑02 tak boleh beli kursus sendiri. Harga **tidak** disimpan di cart (diturunkan dari `courses.price`+`discount` agar tidak basi).

**Status:** placeholder (GET render `dashboard`, POST balas flash "Fitur cart belum tersedia").

---

### 8.5 Checkout `/checkout` & `/checkout/process` 🟡
**Route:** `GET /checkout` (view), `POST /checkout/process` (view). **Akses:** auth.

**Wireframe (target)**
```
┌────────────────────────────────────────────┐
│  Ringkasan Pesanan                          │
│  Kursus A ............... Rp99.000          │
│  Kursus B ............... Rp149.000         │
│  Diskon kupon ........... −Rp20.000         │
│  Total .................. Rp228.000         │
│  Metode bayar: [ Midtrans Snap ]            │
│              [ Bayar Sekarang ]             │
└────────────────────────────────────────────┘
```

**Fitur di halaman ini (target):**
- 🧾 **Ringkasan order** (item, diskon, total final).
- 🎟️ **Kupon** diterapkan ke total.
- 💳 **Pilih metode bayar** → buat `Payment` (Midtrans Snap) → redirect ke Snap.
- 🔐 Validasi: BR‑02 (tak beli kursus sendiri), BR‑03 (belum enroll).

**Status:** view statis; integrasi Midtrans 🔵 belum aktif.

---

### 8.6 Hasil Pembayaran `/payment/success` & `/payment/failed` 🟡
**Route:** `GET /payment/success|failed` (view). **Akses:** auth.

**Fitur di halaman success (target):**
- ✅ Konfirmasi pembayaran berhasil.
- 🎓 **Auto‑enrollment** kursus (FR‑05) setelah settlement.
- ▶️ Tombol **"Mulai Belajar"** → `/student/my-courses`.

**Fitur di halaman failed (target):**
- ❌ Pesan kegagalan + alasan.
- 🔁 Tombol **"Coba lagi"** → kembali checkout.

**Status:** view statis; webhook Midtrans 🔵 belum ada route.

---

### 8.7 Aksi Wishlist & Review dari Frontend 🟡
- `POST /wishlist/{course}` — toggle wishlist. **Fitur:** ♥ tambah/hapus dari mana saja (card/detail). UNIQUE (user, course).
- `POST /courses/{course}/reviews` — kirim review. **Fitur:** ⭐ rating 1–5 + komentar; hanya user enroll (BR‑05); 1×/kursus; masuk moderasi `pending`.
- **Status:** keduanya placeholder flash "belum tersedia".

---

## 9. Halaman Autentikasi

Semua memakai layout `guest`. Validasi inline, status flash via `auth-session-status`.

### 9.1 Register `/register` — `auth/register.blade.php` 🟢
**Route:** `GET/POST /register` → `RegisteredUserController`.

**Field & validasi:**
| Field | Aturan |
| --- | --- |
| name | required, string, max:255 |
| email | required, email, lowercase, unique:users |
| password | required, confirmed, Password::defaults() |
| role | nullable, in:`user`,`instructor` (default `user`) |

**Fitur di halaman ini:**
- 📝 Form pendaftaran (nama, email, password+konfirmasi).
- 🎭 **Pemilihan peran**: Student (`user`) atau Instructor (`instructor`). Admin **tidak** bisa self‑register.
- 🔗 Tombol **Daftar dengan Google**.
- ➡️ Setelah submit: buat user → `event(Registered)` (kirim email verifikasi) → auto‑login → redirect `/dashboard`.
- 🔁 Link ke halaman Login.

---

### 9.2 Login `/login` — `auth/login.blade.php` 🟢
**Fitur di halaman ini:**
- 🔑 Form email + password.
- ☑️ **Remember me**.
- 🔗 **Login dengan Google**.
- ❓ Link **Lupa password**.
- 🔁 Link ke Register.
- ➡️ Sukses → `/dashboard` (dispatch per role).

---

### 9.3 Admin Login `/admin/login` — `auth/admin-login.blade.php` 🟢
**Route:** `GET /admin/login` (guest). Jika sudah login sebagai admin → redirect `admin.dashboard`.

**Fitur di halaman ini:**
- 🛡️ Form login **khusus admin** (terpisah dari login publik).
- 🔒 Hanya untuk akun role `admin`.

---

### 9.4 Lupa Password `/forgot-password` 🟢
**Fitur:** ✉️ input email → kirim **link reset** password (throttle).

### 9.5 Reset Password `/reset-password/{token}` 🟢
**Fitur:** 🔁 set password baru + konfirmasi (token signed).

### 9.6 Verifikasi Email `/verify-email` 🟢
**Fitur:** 📧 prompt + tombol **kirim ulang** link verifikasi (throttle 6/menit); link verifikasi signed.

### 9.7 Konfirmasi Password `/confirm-password` 🟢
**Fitur:** 🔐 re‑autentikasi untuk aksi sensitif.

### 9.8 Google OAuth `/auth/google` → callback 🟢
**Fitur:**
- 🔗 Redirect ke consent screen Google.
- 👤 Callback: user baru dibuat role `user`, `email_verified_at=now()` (auto‑verified), avatar disimpan; user existing di‑login (foto diisi bila kosong).
- ➡️ Redirect `/dashboard`.
- 🛟 Error handling: kegagalan OAuth → redirect login dengan pesan error.

---

## 10. Halaman Student (role: user)

Layout: sidebar `backend/student/layouts/sidebar.blade.php`.

**Navigasi sidebar:** Dashboard · Kursus Saya · Wishlist · Profil · Pengaturan · Logout.

### 10.1 Dashboard `/student/dashboard` — `backend/student/dashboard.blade.php` 🟢
**Controller:** `Backend\Student\DashboardController@index`.

**Wireframe**
```
┌──────────┬─────────────────────────────────┐
│ SIDEBAR  │  Halo, {nama} 👋                 │
│ • Dash   │  [Enroll: 5] [Wishlist: 3] [Rev:2]│
│ • Kursus │  Progres keseluruhan: ▓▓▓░ 62%   │
│ • Wish   │  ── Lanjutkan belajar ──         │
│ • Profil │  [Kursus A ▓▓░ 40%]  Lanjut →     │
│ • Setting│  [Kursus B ▓▓▓ 80%]  Lanjut →     │
└──────────┴─────────────────────────────────┘
```

**Isi:** kartu statistik (jumlah enrollment, wishlist, review), **progres keseluruhan %**, 3 kursus terakhir + progress bar (lecture selesai / total).

**Fitur di halaman ini:**
- 📊 **Statistik ringkas**: total enrollment, wishlist, review.
- 📈 **Progress keseluruhan** (akumulasi semua kursus).
- 🎬 **3 kursus terbaru** dengan progress bar individual + tombol lanjut.
- 🫥 Empty state bila belum enroll → CTA ke katalog.

**Acceptance criteria:** AC‑SD‑1 progress = round(completed/total ×100); AC‑SD‑2 kursus tanpa lecture → progress 0%.

---

### 10.2 Kursus Saya `/student/my-courses` 🟢
**Controller:** `@myCourses`.

**Fitur di halaman ini:**
- 🗂️ **Daftar semua kursus enroll** (grid kartu).
- 📈 **Progress % per kursus** (completed/total lecture).
- 👤 Instruktur + 🗓️ tanggal enroll.
- ▶️ Tombol **"Lanjut Belajar"** per kursus.
- 🫥 Empty state bila kosong.

---

### 10.3 Wishlist `/student/wishlist` (+ DELETE `/wishlist/{id}`) 🟢
**Controller:** `@wishlist`, `@wishlistRemove`.

**Fitur di halaman ini:**
- ♥ **Daftar kursus di wishlist** (course + instruktur + kategori).
- ❌ **Hapus dari wishlist** (flash sukses berbahasa Indonesia).
- ↪️ Link ke detail/beli kursus.
- 🫥 Empty state.

---

### 10.4 Profil `/student/profile` (GET/POST) 🟢
**Controller:** `@profile`, `@profileUpdate`.

**Field & validasi:**
| Field | Aturan |
| --- | --- |
| name | required, string, max:255 |
| phone | nullable, max:20 |
| website | nullable, url, max:255 |
| address | nullable, string |
| bio | nullable, string |
| photo | nullable, image (jpeg/png/jpg/gif/svg), max:2048 KB |

**Fitur di halaman ini:**
- 🖊️ **Edit profil**: nama, telepon, website, alamat, bio.
- 🖼️ **Upload foto profil** (disimpan `public/uploads/profile`, foto lokal lama dihapus otomatis).
- ✅ Flash "Profil Anda berhasil diperbarui".

---

### 10.5 Pengaturan `/student/setting` (GET/POST) 🟢
**Controller:** `@setting`, `@settingUpdate`.

**Fitur di halaman ini:**
- 🔒 **Ganti password**: `current_password` (tervalidasi benar), `password` (Password::defaults + confirmed).
- ✅ Flash "Kata sandi berhasil diperbarui".

---

### 10.6 Profil Breeze `/profile` (lintas semua role) 🟢
**Controller:** `ProfileController`. View `profile/edit` + partials.

**Fitur di halaman ini:**
- 👤 **Update informasi profil** (`update-profile-information-form`).
- 🔑 **Ubah password** (`update-password-form`).
- 🗑️ **Hapus akun** dengan konfirmasi password (`delete-user-form`).

---

## 11. Halaman Instructor (role: instructor)

### 11.1 Dashboard `/instructor/dashboard` 🟢
**Controller:** `Backend\Instructor\DashboardController@index`.

**Wireframe**
```
┌────────────────────────────────────────────┐
│  Dashboard Instruktur                       │
│  [Kursus: 4]  [Enrollment: 128]  [Rp 12,8jt]│
│  ── Kursus Saya ──                          │
│  • Kursus A    enroll: 60                    │
│  • Kursus B    enroll: 40                    │
│  • Kursus C    enroll: 28                    │
└────────────────────────────────────────────┘
```

**Isi:** total course milik instruktur, total enrollment, **gross revenue** (`orders.final_price` status `completed`; ADR‑005 tanpa pembagian payout), daftar course + jumlah enrollment.

**Fitur di halaman ini:**
- 📊 **Statistik**: total kursus, total enrollment, pendapatan kotor.
- 📋 **Daftar kursus** milik instruktur + jumlah enrollment masing‑masing.

**Acceptance criteria:** AC‑INS‑1 revenue hanya order `completed`; AC‑INS‑2 hanya kursus milik instruktur yang dihitung.

### 11.2 Backlog Instructor (🔵 belum ada route — lihat juga §21)
Disebut di FR‑02/03 & BR‑01:
- **Course CRUD** (judul, slug, kategori/subkategori, harga, diskon, thumbnail Cloudinary, video preview, durasi, status, flag bestseller/featured).
- **Section & Lecture builder** (drag‑sort `sort_order`, video url, durasi, content).
- **Goals** editor.
- **Coupon manager** (kode unik, %, valid_until, max_usage).
- **Laporan penjualan** per kursus/periode.

---

## 12. Halaman Admin (role: admin)

Layout `layouts/admin.blade.php`. Sidebar: Dashboard · Kategori · Sub‑Kategori · Kursus · Instruktur · Pesanan · Pengguna · Slider · Info Box · Partner · Review · Pengaturan.

### 12.1 Dashboard `/admin/dashboard` 🟢
**Controller:** `Backend\Admin\DashboardController@index`.

**Isi:** total students, total instructors, total courses, total orders (status `completed`).

**Fitur di halaman ini:**
- 📊 **Kartu statistik platform** (4 metrik).
- 🧭 Navigasi cepat ke modul admin.

---

### 12.2 Kategori `/admin/categories` (CRUD penuh) 🟢
**Controller:** `Admin\CategoryController` (resource kecuali show).

**Wireframe (index)**
```
┌────────────────────────────────────────────┐
│  Kategori           [ + Tambah Kategori ]   │
│  ┌──────┬──────────┬────────┬───────────┐   │
│  │ Img  │ Nama     │ Status │ Aksi      │   │
│  ├──────┼──────────┼────────┼───────────┤   │
│  │ 🖼️   │ Web Dev  │ Aktif  │ Edit Hapus│   │
│  │ 🖼️   │ Design   │ Aktif  │ Edit Hapus│   │
│  └──────┴──────────┴────────┴───────────┘   │
└────────────────────────────────────────────┘
```

**Field:** name, slug (unik), description, gambar Cloudinary (`image_url`+`image_public_id`), status (boolean).

**Fitur di halaman ini:**
- ➕ **Tambah** kategori (form create).
- 📋 **Daftar** kategori + status + thumbnail.
- ✏️ **Edit** kategori.
- 🗑️ **Hapus** kategori → cascade ke courses & sub_categories (BR‑06) — konfirmasi SweetAlert2.
- 🖼️ **Upload gambar** ke Cloudinary.
- 🔀 Toggle **status** aktif/nonaktif.

---

### 12.3 Sub‑Kategori `/admin/sub-categories` (CRUD) 🟢
**Controller:** `Admin\SubCategoryController`.

**Fitur di halaman ini:**
- ➕ Tambah sub‑kategori (pilih **kategori induk**, nama, slug unik).
- 📋 Daftar sub‑kategori.
- ✏️ Edit · 🗑️ Hapus (cascade saat kategori induk dihapus).

---

### 12.4 Kursus `/admin/courses` (index + show + update‑status) 🟢
**Controller:** `Admin\AdminCourseController`.

**Fitur di halaman ini:**
- 📋 **Daftar semua kursus** lintas instruktur (judul, instruktur, kategori, harga, status).
- 🔎 **Detail kursus** (show): kurikulum, instruktur, statistik.
- ✅ **Moderasi status** kursus (`draft`→`pending_review`→`active`/`inactive`) via `update-status` — mis. approve kursus baru.
- 🏷️ Tinjau flag bestseller/featured.

**Catatan:** admin tidak membuat kursus, hanya meninjau & mengubah status.

---

### 12.5 Instruktur `/admin/instructors` (index + show) 🟢
**Fitur di halaman ini:**
- 📋 **Daftar instruktur**.
- 👤 **Detail instruktur** (show): kursus & performa.

---

### 12.6 Pesanan `/admin/orders` (index + show) 🟢
**Fitur di halaman ini:**
- 📋 **Daftar order** (user, kursus, total, status).
- 🧾 **Detail order**: snapshot harga (original/discount/final), kupon, status (`pending/completed/cancelled/refunded`), payment terkait.

---

### 12.7 Pengguna `/admin/users` (index) 🟢
**Fitur di halaman ini:**
- 📋 **Daftar seluruh pengguna** + role (read‑only saat ini).
- 🔵 Backlog: edit role / suspend (belum ada).

---

### 12.8 CMS Homepage 🟢
**Sliders `/admin/sliders` (CRUD)**
- 🎞️ Tambah/edit/hapus banner: title, sub_title, link, gambar Cloudinary (`image_url`+`image_public_id`), status, `order_position`.

**Info Boxes `/admin/info-boxes` (CRUD)**
- 🧩 Kelola USP: title, description, icon, `order_position`.

**Partners `/admin/partners` (CRUD)**
- 🤝 Kelola logo mitra: name, link, `logo_url`+`logo_public_id`, `order_position`.

**Fitur umum CMS:** preview gambar, urutan tampil (`order_position`/sort), aktif/nonaktif (slider).

---

### 12.9 Moderasi Review `/admin/reviews` 🟢
**Controller:** `Admin\AdminReviewController` + alias approve/reject.

**Fitur di halaman ini:**
- 📋 **Daftar review** masuk (user, kursus, rating, komentar, status).
- ✅ **Approve** review (`update-status` / `reviews.approve`).
- ⛔ **Reject** review (`reviews.reject`).
- 👁️ Hanya review **approved** tampil publik & dihitung di `average_rating`.

---

### 12.10 Pengaturan Situs `/admin/settings` (GET/PUT) 🟢
**Controller:** `Admin\AdminSiteSettingController`.

**Fitur di halaman ini:**
- ⚙️ Kelola **key‑value `site_infos`** (nama situs, kontak, sosial media, dll).
- 💾 Simpan perubahan (PUT) → flash sukses.

---

## 13. Data Dictionary (per tabel, per kolom)

> ⊥ = UNIQUE. FK = foreign key. Semua tabel transaksional punya `created_at`/`updated_at` kecuali disebut lain.

### 13.1 `users`
| Kolom | Tipe | Ket. |
| --- | --- | --- |
| id | bigint PK | |
| name | string | |
| email | string ⊥ | |
| email_verified_at | datetime nullable | |
| password | string (hashed) | |
| role | enum(`user`,`instructor`,`admin`) | default `user`, indexed |
| photo | string(255) nullable | URL/Path foto |
| phone | string(20) nullable | |
| address | text nullable | |
| bio | text nullable | |
| website | string(255) nullable | |
| remember_token | string | |

### 13.2 `categories`
| Kolom | Tipe | Ket. |
| id | bigint PK | |
| name | string | |
| slug | string ⊥ | |
| image_url | string nullable | Cloudinary |
| image_public_id | string nullable | Cloudinary |
| status | boolean | default true, indexed |

### 13.3 `sub_categories`
| id PK · category_id FK→categories (cascade) · name · slug ⊥ |

### 13.4 `courses`
| Kolom | Tipe | Ket. |
| id | bigint PK | |
| category_id | FK→categories (cascade) | |
| subcategory_id | FK→sub_categories (nullOnDelete) nullable | |
| instructor_id | FK→users (cascade) | |
| title | string | |
| slug | string ⊥ | |
| description | text nullable | |
| price | decimal(12,2) | default 0 |
| discount | tinyint unsigned | 0–100 (%) |
| thumbnail | string nullable | |
| video_url | string nullable | preview |
| duration | string(50) nullable | |
| bestseller | boolean | default false |
| featured | boolean | default false |
| status | enum(`draft`,`pending_review`,`active`,`inactive`) | default draft |
Indeks: (status,featured), (status,bestseller), (instructor_id,status).

### 13.5 `course_goals`
| id PK · course_id FK (cascade) · goal string |

### 13.6 `course_sections`
| id PK · course_id FK (cascade) · title · sort_order uint default 0 |

### 13.7 `course_lectures`
| id PK · section_id FK→course_sections (cascade) · title · url string(500) nullable · content text nullable · duration string(50) nullable · sort_order uint |

### 13.8 `wishlists`
| id PK · user_id FK (cascade) · course_id FK (cascade) · UNIQUE(user_id,course_id) |

### 13.9 `carts`
| id PK · user_id FK (cascade) · course_id FK (cascade) · UNIQUE(user_id,course_id) | *harga & instructor TIDAK disimpan (diturunkan real‑time dari course).* |

### 13.10 `coupons`
| Kolom | Tipe | Ket. |
| id PK · instructor_id FK→users (cascade) | |
| course_id | FK nullable (nullOnDelete) | kupon spesifik/global |
| code | string(50) ⊥ | |
| discount_percent | uint | |
| valid_until | date | |
| max_usage | uint nullable | batas pemakaian |
| used_count | uint default 0 | |
| status | boolean default true | |

### 13.11 `payments`
| Kolom | Tipe | Ket. |
| id PK · user_id FK (cascade) | |
| midtrans_order_id | string(100) ⊥ | |
| midtrans_transaction_id | string(100) nullable | indexed |
| payment_type | string(50) nullable | |
| total_amount | decimal(12,2) | |
| status | enum(`pending`,`settlement`,`capture`,`deny`,`cancel`,`expire`,`failure`,`refund`) | default pending |
| midtrans_response | json nullable | audit penuh |
Indeks: status, (user_id,status), midtrans_transaction_id.

### 13.12 `orders`
| Kolom | Tipe | Ket. |
| id PK · payment_id FK (cascade) · user_id FK (cascade) · course_id FK (cascade) | |
| instructor_id | FK→users (cascade) | denormalisasi untuk laporan |
| coupon_id | FK nullable (nullOnDelete) | |
| original_price | decimal(12,2) | snapshot |
| discount_amount | decimal(12,2) | default 0 |
| final_price | decimal(12,2) | |
| status | enum(`pending`,`completed`,`cancelled`,`refunded`) | default pending |
Indeks: status, (user_id,status), (instructor_id,status).

### 13.13 `enrollments`
| id PK · user_id FK (cascade) · course_id FK (cascade) · order_id FK (cascade) · enrolled_at timestamp · UNIQUE(user_id,course_id) | *tanpa timestamps default.* |

### 13.14 `reviews`
| id PK · user_id FK (cascade) · course_id FK (cascade) · rating tinyint(1–5) · comment text nullable · status boolean default true (indexed) · UNIQUE(user_id,course_id) |

### 13.15 `lecture_completions`
| id PK · user_id FK (cascade) · lecture_id FK→course_lectures (cascade) · completed_at timestamp · UNIQUE(user_id,lecture_id) |

### 13.16 `sliders`
| id PK · title nullable · sub_title nullable · link nullable · image_url text · image_public_id · status boolean default true · order_position int default 0 |

### 13.17 `info_boxes`
| id PK · title · description text nullable · icon nullable · order_position uint default 0 |

### 13.18 `partners`
| id PK · name · link nullable · logo_url text · logo_public_id · order_position int default 0 |

### 13.19 `site_infos`
| id PK · key string(100) ⊥ · value text nullable |

### 13.20 Tabel sistem
`password_reset_tokens`, `sessions`, `cache`, `jobs` (bawaan Laravel).

---

## 14. Relasi Antar Entitas (ERD ringkas)

```
users ──< courses (instructor_id)
users ──< wishlists, carts, orders, reviews, payments, enrollments, lecture_completions, coupons
categories ──< sub_categories ──< courses
categories ──< courses
courses ──< course_goals, course_sections, wishlists, carts, orders, reviews, enrollments, coupons
course_sections ──< course_lectures ──< lecture_completions
payments ──< orders ──< enrollments
coupons ──< orders
```

**Relasi & accessor model penting:**
- `Course::discounted_price` = price − (price × discount / 100).
- `Course::average_rating` = avg(rating) review berstatus approved.
- `User` scopes: `students()`, `instructors()`, `admins()`.
- `Course` scopes: `active()`, `featured()`, `bestseller()`.

---

## 15. Aturan Bisnis (Business Rules)

| Kode | Aturan |
| --- | --- |
| BR‑01 | Hanya role `instructor` boleh membuat kursus |
| BR‑02 | User tak bisa membeli kursus miliknya sendiri |
| BR‑03 | 1 user enroll 1× per kursus (UNIQUE user+course) |
| BR‑04 | Kupon valid sampai `valid_until` & pemakaian ≤ `max_usage` |
| BR‑05 | Review hanya oleh user yang sudah enroll, 1×/kursus |
| BR‑06 | Hapus kategori → cascade ke courses & sub_categories |
| BR‑07 | Hapus payment → cascade ke orders (audit trail penuh) |
| BR‑08 | Status payment mengikuti standar Midtrans (8 nilai) |
| BR‑09 | Harga cart/checkout diturunkan real‑time dari course (tidak disimpan) untuk hindari data basi |
| BR‑10 | Order menyimpan snapshot harga (original/discount/final) saat transaksi |

---

## 16. User Journey

### 16.1 Student membeli & belajar (alur penuh)
```
/home → cari/filter → /courses/{slug} → [♥ wishlist | 🛒 add cart]
   → /cart → terapkan kupon → /checkout → Midtrans Snap
   → (webhook settlement) → auto Enrollment → /payment/success
   → /student/my-courses → tonton lecture → lecture_completion++
   → progress naik → setelah selesai → tulis review (pending)
   → admin approve → review tampil publik & rating ter‑update
```

### 16.2 Instructor menjual
```
/register (role instructor) → /instructor/dashboard
   → buat course (🔵) → submit pending_review
   → admin approve → status active → tampil katalog
   → student enroll → enrollment & order completed
   → gross_revenue ter‑update di dashboard
```

### 16.3 Admin operasional
```
/admin/login → /admin/dashboard
   → kelola kategori/sub‑kategori → atur CMS (slider/info box/partner)
   → moderasi /admin/courses (approve status) & /admin/reviews (approve/reject)
   → pantau /admin/orders & /admin/users
   → /admin/settings (site info)
```

---

## 17. Integrasi Pembayaran (Midtrans) 🔵 (spesifikasi target)

### 17.1 Alur
1. Checkout → backend buat `Payment` (status `pending`, `midtrans_order_id` unik) + `Order` per kursus (status `pending`).
2. Backend minta Snap token (Midtrans PHP) → frontend buka Snap.
3. User bayar → Midtrans kirim **webhook notifikasi** ke endpoint server.
4. Backend verifikasi signature → update `payments.status` (+`midtrans_response` JSON) & `orders.status`.
5. Jika `settlement`/`capture` → buat `Enrollment` (idempoten, hormati UNIQUE user+course) → tambah `coupons.used_count` bila kupon dipakai.

### 17.2 Pemetaan status (BR‑08)
| Midtrans | payments.status | orders.status | Enrollment |
| --- | --- | --- | --- |
| settlement/capture | settlement/capture | completed | dibuat |
| pending | pending | pending | tidak |
| deny/cancel/expire/failure | sesuai | cancelled | tidak |
| refund | refund | refunded | dicabut (kebijakan) |

### 17.3 Endpoint yang perlu ditambah
- `POST /payment/notification` (webhook, tanpa CSRF, verifikasi server key).
- Idempotensi via `midtrans_order_id` unik.

---

## 18. Pencarian, Realtime, Email

### 18.1 Pencarian (Scout + Meilisearch) 🔵
- Index `courses` (title, description). UI search bar di `/home` saat ini memakai `LIKE`; target migrasi ke Scout untuk relevansi & kecepatan.

### 18.2 Realtime (Reverb + Echo) 🔵
- Kandidat: notifikasi enrollment baru ke instruktur, status pembayaran live, badge notifikasi. Client memakai Laravel Echo + pusher‑js.

### 18.3 Email 🔵 / 🟢 parsial
- 🟢 Verifikasi email & reset password (Breeze).
- 🔵 `WelcomeMail` (F14) — masih `TODO` di `RegisteredUserController` & `GoogleController`.

---

## 19. Kebutuhan Non‑Fungsional

| Kategori | Kebutuhan |
| --- | --- |
| **Integritas** | FK `cascadeOnDelete` di relasi kuat, `nullOnDelete` di relasi opsional |
| **Performa** | Composite index (status,featured), (status,bestseller), (user_id,status), (instructor_id,status); eager‑load relasi untuk hindari N+1 |
| **Keunikan** | email, slug (course & kategori), code kupon, midtrans_order_id semua unik; UNIQUE pasangan (user,course) di wishlist/cart/enrollment/review |
| **Audit** | Tabel transaksional punya timestamps; `midtrans_response` JSON disimpan penuh |
| **Skalabilitas media** | Gambar di Cloudinary (`*_url` + `*_public_id`), bukan server lokal (kecuali foto profil student) |
| **Responsivitas** | Layout mobile‑first, navbar collapse |
| **Maintainability** | Pint (style), PHPUnit (test), struktur controller per‑domain |
| **i18n** | Pesan UI berbahasa Indonesia |

---

## 20. Keamanan

- **Password:** bcrypt (cast `hashed`).
- **Otorisasi:** middleware `auth`, `verified`, `role:*`; panel terpisah per peran.
- **Email verification:** wajib untuk akses dashboard (`verified`).
- **OAuth:** Google `stateless` callback, email Google auto‑verified.
- **Rate limit:** verifikasi/notifikasi email `throttle:6,1`; link verifikasi `signed`.
- **CSRF:** semua form web (kecuali webhook Midtrans yang dikecualikan + verifikasi signature).
- **Pembayaran:** verifikasi server key Midtrans; idempotensi via `midtrans_order_id`; `midtrans_response` untuk audit.
- **Mass assignment:** `$fillable` eksplisit per model; `$hidden` untuk password & token.
- **Upload:** validasi mime & ukuran (≤2MB foto profil).

---

## 21. Status Implementasi & Roadmap

### 21.1 Ringkasan status
**🟢 Sudah jalan:**
- Auth lengkap (Breeze + Google + admin login terpisah), email verification, reset password.
- `/dashboard` universal dispatch per role.
- Panel **Admin** CRUD penuh: kategori, sub‑kategori, course moderation (status), instruktur (lihat), orders (lihat), users (lihat), slider, info box, partner, review moderation (approve/reject), settings.
- Dashboard **Student**: overview (statistik+progress), my‑courses, wishlist (+ hapus), profil (+foto), setting (password).
- Dashboard **Instructor**: statistik + daftar kursus.
- **Homepage** dinamis (slider, info box, kategori, featured, bestseller, search/filter).

**🟡 Placeholder (route ada, logika belum):**
- Detail kursus (binding data), cart, checkout, payment success/failed, wishlist toggle frontend, review submit frontend.

**🔵 Belum ada route (Backlog):**
- Instructor: course/section/lecture/goal CRUD, kupon, laporan penjualan detail.
- Midtrans webhook + auto‑enrollment + update kupon.
- Player lecture + tracking `lecture_completion`.
- Pencarian Scout/Meilisearch terintegrasi UI.
- Realtime (Reverb/Echo) notifikasi.
- Email WelcomeMail (F14).
- Admin users: edit role / manajemen pengguna.

### 21.2 Roadmap Fase
| Fase | Lingkup | Status |
| --- | --- | --- |
| **Phase 1** | Auth, peran, panel admin CRUD, dashboard 3 role, homepage | 🟢 Selesai |
| **Phase 2** | Detail kursus dinamis, katalog Scout, player lecture | 🟡 Berjalan |
| **Phase 3** | Cart, checkout, Midtrans, auto‑enrollment, kupon | 🔵 Direncanakan |
| **Phase 4** | Instructor course builder (section/lecture/goal) | 🔵 Direncanakan |
| **Phase 5** | Review post‑enroll, moderasi end‑to‑end, rating | 🟡/🔵 |
| **Phase 6** | Realtime, email (Welcome), notifikasi, laporan | 🔵 |

---

## 22. Lampiran

### 22.1 Glosarium
- **Enrollment:** catatan kepemilikan kursus oleh user setelah pembayaran sukses.
- **Lecture completion:** penanda satu materi telah diselesaikan user (untuk progress).
- **Featured / Bestseller:** flag kurasi homepage (featured manual; bestseller berbasis jumlah enrollment).
- **Snapshot harga:** salinan harga saat transaksi disimpan di `orders` agar perubahan harga course kemudian tidak mengubah riwayat.
- **CMS:** modul admin untuk konten homepage (slider, info box, partner, site info).

### 22.2 Architecture Decision Records (rujukan kode)
- **ADR‑005:** Revenue instruktur dicatat **gross** (`orders.final_price`), tanpa pembagian payout otomatis.
- **ADR‑006 / F01:** Self‑register hanya `user` & `instructor`; admin dibuat manual.
- **v2 schema:** `carts` tidak menyimpan harga/instructor (diturunkan real‑time); `orders` menyimpan snapshot harga & `instructor_id` denormalisasi; `enrollments` & `lecture_completions` tabel baru untuk akses cepat progres.

### 22.3 Catatan ketidaksesuaian dokumentasi
- Commit menyebut **"Filament v5"**, tetapi paket Filament **tidak ada** di `composer.json`. Panel admin = custom controller + Blade. Perlu keputusan: (a) migrasi nyata ke Filament, atau (b) koreksi dokumen/commit. PRD ini mengikuti kondisi kode.
- `WelcomeMail` (F14) masih berupa `TODO` di kode registrasi.

### 22.4 Format Changelog (disarankan)
```
## [versi] - YYYY-MM-DD
### Added / Changed / Fixed / Removed
- deskripsi singkat (referensi Fxx/ADR jika ada)
```

---

*Akhir dokumen. Perbarui legend status (🔵/🟡 → 🟢) setiap fitur dirilis, dan sinkronkan Data Dictionary saat ada migrasi baru.*
