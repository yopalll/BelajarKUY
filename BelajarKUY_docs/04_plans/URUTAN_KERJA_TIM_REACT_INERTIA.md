# 🧭 BelajarKUY — Urutan Kerja Tim (Estafet Langkah demi Langkah)

> **Untuk apa dokumen ini:** menjelaskan **dari mana mulai** dan **urutan estafet** pengerjaan — "pertama Yosua bagian ini, lalu Vascha, lalu Ray lanjut bagiannya" — supaya mudah diajarkan ke anggota tim.
>
> **Dibuat:** 1 Juni 2026 · **PIC dokumen:** Yosua (PM)
> **Dokumen pendamping:** `MIGRATION_SCHEDULE_REACT_INERTIA.md` (tabel branch/PR & timeline), `MASTER_PLAN_REACT_INERTIA.md` (detail fase), prompt per orang di `05_prompts/`.
>
> **Catatan baca:** dokumen ini = *urutannya*. Detail teknis tiap bagian ada di **prompt** masing-masing (disebut di tiap langkah). Tabel branch/tanggal ada di `MIGRATION_SCHEDULE_REACT_INERTIA.md`.

---

## 0. Sebelum mulai — yang WAJIB dilakukan SEMUA orang

Fondasi React+Inertia (Fase 1) **sudah dibuat Yosua** dan sudah ada di repo. Sebelum menyentuh kode, tiap anggota lakukan ini sekali:

```bash
git pull origin main          # tarik fondasi terbaru
cd BelajarKUY
composer install
npm install
npm run build                 # HARUS sukses. Kalau gagal, lapor Yosua dulu.
```

Yang sudah jadi dan **jangan diubah** (ini pondasi bersama):
`vite.config.js`, `resources/js/app.jsx`, `resources/js/Layouts/AppLayout.jsx`,
`resources/js/Components/{AppHeader,CourseCard,FlashToast}.jsx`,
`resources/js/Pages/{Welcome,Home}.jsx`.

> **Prinsip koeksistensi:** halaman yang **belum** diport tetap pakai Blade lama (lewat `app.js`). Jadi aplikasi tidak pernah mati total selama migrasi. Jangan hapus `app.js` / layout Blade sampai diberi aba-aba (Langkah 16).

---

## 1. Peta Estafet (gambaran besar)

```
            ┌─────────────────────────────────────────────────────────────┐
            │  LANGKAH 0 — Yosua: Fondasi React+Inertia  ✅ SELESAI         │
            └─────────────────────────────────────────────────────────────┘
                                       │  semua orang build dari sini
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
  L1 Vascha ✅            L2 Albariqi ✅                 L6 Albariqi ✅
  Halaman publik          Auth + Error pages            Instructor Course CRUD
  + komponen dasar        (Login/Register)            (jalan mandiri)
        │                              │                              │
        ▼                              │                              ▼
  L3 Ray ✅ Wishlist ◄── butuh CourseCard dari L1        L7 Albariqi ✅: Section/Lecture
        │                                                              │
        ▼                                                              │
  L4 Ray ✅ Cart                                                       │
        │                                                              │
        ▼                              ▼                               │
  L8 Ray ✅ Coupon                                                     │
                              L5 Vascha ✅ Student panel               │
        │                     (butuh L1 + L2)                          │
        ▼                                                              │
  ┌──────────────────────────────────────────────────────────────────┐ │
  │  L9 Yosua/Ray ✅ Checkout + Midtrans + Enrollment ◄── TONGGAK KUNCI│ │
  └──────────────────────────────────────────────────────────────────┘ │
        │  menghasilkan data Enrollment & callback Midtrans            │
        ├───────────────────────────────────────────────┐              │
        ▼                                               ▼              ▼
  L10 Albariqi ✅: Course Player                L11 Albariqi ✅: Email notifikasi
  (butuh Enrollment dari L9)                    (dipicu callback L9)
        │
        ▼  (paralel mulai W2/W3)
  ┌──────────────────────────────────────────────────────────────────┐
  │  L12→L15 Quinsha: Migrasi Admin ke React (shell → pages → arsip)   │
  └──────────────────────────────────────────────────────────────────┘
        │
        ▼
  L16 Yosua: Matikan Blade/Alpine lama  →  L17 ALL: Polish, test, deploy
```

**Tiga aturan ketergantungan yang mengikat (sisanya bisa digeser):**
1. Ray **L9 (Enrollment)** harus jadi sebelum Albariqi **L10 (Course Player)** & **L11 (Email)**.
2. Albariqi **L2 (Auth React)** sebaiknya jadi sebelum Vascha **L5 (Student panel)**.
3. Ray butuh **CourseCard** dari Vascha **L1** sebelum **L3 (Wishlist)**.

---

## 2. Urutan Langkah (estafet rinci)

> Format tiap langkah: **Apa** · **Mulai setelah** · **File utama** · **Selesai bila (DoD)** · **Branch** · **Detail**.

### LANGKAH 0 — Yosua · Fondasi (✅ SELESAI)
- **Apa:** entry Inertia (`app.jsx`), `vite.config.js`, `AppLayout`, komponen `AppHeader/CourseCard/FlashToast`, port `Welcome` & `Home`, route `/` & `home` → `Inertia::render`.
- **Status:** sudah di repo, `npm run build` PASS. Inilah titik mulai semua orang.

---

### LANGKAH 1 — Vascha · Halaman publik + komponen dasar (V1, V2) ✅ SELESAI (2026-06-01)
- **Apa:** port **`Courses/Show`** (detail kursus) pakai data dinamis (ganti placeholder `course.detail`); rapikan `Home`/`Welcome`; buat komponen reusable `AppFooter`, `EmptyState`, `Badge`.
- **Mulai setelah:** Langkah 0 (sudah ada).
- **File utama:** `resources/js/Pages/Courses/Show.jsx`, `resources/js/Components/{AppFooter,EmptyState,Badge}.jsx`, controller detail kursus → `Inertia::render`.
- **Selesai bila:** buka detail kursus tampil React dengan data asli (judul, instruktur, kurikulum, harga); komponen dipakai ulang; `npm run build` sukses. ✅
- **Branch:** `feature/public-react`, lalu `feature/react-components`. ✅
- **Kenapa duluan:** menetapkan **pola komponen & gaya visual** yang jadi acuan semua orang, dan menyediakan `CourseCard` + tombol cart/wishlist yang dibutuhkan Ray.

### LANGKAH 2 — Albariqi · Auth & Error pages React ✅ SELESAI (2026-06-02)
- **Apa:** port halaman Breeze ke React: `Pages/Auth/*` (termasuk pilihan role saat register) dan migrasi halaman error ke React (`Pages/Errors/*`).
- **Mulai setelah:** Langkah 0.
- **File utama:** `resources/js/Pages/Auth/*`, `resources/js/Layouts/GuestLayout.jsx`, controller Breeze → `Inertia::render`.
- **Selesai bila:** login/register/logout jalan via React; redirect per role tetap benar (admin/instructor/student); `npm run build` sukses. ✅
- **Branch:** `feature/auth-react`. ✅
- **Kenapa di sini:** kecil tapi **membuka jalan** untuk Student panel Vascha (L5). Albariqi pemilik modul Auth, jadi dia yang port.
- **Hasil implementasi:**
  - `GuestLayout.jsx` — layout dua panel (branding kiri, form kanan)
  - `Login.jsx` — email/password + Google OAuth + remember me + show/hide password
  - `Register.jsx` — role selector kartu (Siswa 🎓 / Instruktur 📖) + show/hide password
  - `ForgotPassword.jsx` — info box + status sukses
  - `ResetPassword.jsx` — token prop, email readonly, password strength hints
  - 4 controller diupdate: `AuthenticatedSessionController`, `RegisteredUserController`, `PasswordResetLinkController`, `NewPasswordController` → `Inertia::render`
  - Error Pages: `Pages/Errors/404.jsx`, `500.jsx`, dsb. menggantikan legacy blade.
  - `npm run build` PASS ✅ (2371 modules)

> L1 dan L2 **berjalan paralel** — keduanya hanya butuh fondasi.

---

### LANGKAH 3 — Ray · Wishlist (R1) ✅ SELESAI (2026-06-02)
- **Apa:** add/remove wishlist (ganti placeholder route `wishlist.add`).
- **Mulai setelah:** Langkah 1 (butuh `CourseCard` + tombol wishlist).
- **File utama:** `WishlistController`, route wishlist, tombol di `CourseCard`.
- **Selesai bila:** siswa bisa tambah/hapus wishlist, data tersimpan di tabel `wishlists`, halaman wishlist menampilkannya. ✅
- **Branch:** `feature/wishlist`. ✅
- **Kenapa duluan untuk Ray:** kecil → pemanasan pola "controller + aksi Inertia" sebelum Cart.
- **Hasil implementasi:**
  - `WishlistController.php` — toggle add/remove (JSON), halaman index Inertia (`Pages/Student/Wishlist`), remove, count
  - `Pages/Student/Wishlist.jsx` — halaman React (grid kartu, empty state, tombol hapus via `router.delete`)
  - `Components/CourseCard.jsx` — tombol wishlist fungsional (props `isWishlisted` + `onWishlistChange`, fetch POST CSRF-aware, redirect guest ke `/login`)
  - `Components/AppHeader.jsx` — link ikon hati → `/student/wishlist`
  - `routes/web.php` — `wishlist.add`, `wishlist.count`, `student.wishlist` GET/DELETE terhubung ke `WishlistController`
  - `npm run build` PASS ✅ (2384 modules)

### LANGKAH 4 — Ray · Cart (R2) ✅ SELESAI (2026-06-02)
- **Apa:** add/remove cart + halaman `Pages/Cart/Index` (ganti placeholder `cart.*`).
- **Mulai setelah:** Langkah 3.
- **File utama:** `CartController`, `resources/js/Pages/Cart/Index.jsx`, tabel `carts`.
- **Selesai bila:** tambah ke cart, lihat isi cart, hapus item, subtotal benar; `npm run build` sukses. ✅
- **Branch:** `feature/cart`. ✅
- **Hasil implementasi:**
  - `CartController.php` — index Inertia, add JSON (cek Enrollment + idempotent `firstOrCreate`), remove JSON, move-to-wishlist JSON, count badge
  - `Pages/Cart/Index.jsx` — halaman React (daftar item, hapus, pindah ke wishlist, ringkasan sticky, empty state, update UI tanpa full-reload)
  - `Components/CourseCard.jsx` — tombol cart fungsional (prop `isInCart`, fetch POST, ikon ✓ saat sudah di cart, pesan error server)
  - `Components/AppHeader.jsx` — link ikon keranjang → `/cart`
  - `routes/web.php` — `cart.index`, `cart.add`, `cart.remove`, `cart.move-to-wishlist`, `cart.count` → `CartController`
  - `npm run build` PASS ✅


### LANGKAH 5 — Vascha · Student panel React (V4) ✅ SELESAI (2026-06-04)
- **Apa:** port `Pages/Student/{Dashboard,MyCourses,Wishlist,Profile,Notifications}`.
- **Mulai setelah:** Langkah 1 (komponen) + Langkah 2 (auth React).
- **File utama:** `resources/js/Pages/Student/*`, controller student → `Inertia::render`.
- **Selesai bila:** semua halaman student tampil React dengan data asli; `npm run build` sukses. ✅
- **Branch:** `feature/student-react`.
- **Hasil implementasi:**
  - `Layouts/StudentLayout.jsx` — shared sidebar layout (desktop fixed + mobile overlay + bottom nav bar), flash messages
  - `Pages/Student/Dashboard.jsx` — stat cards (enrolled/wishlist/reviews), lanjutkan belajar, SVG circular progress "Misi Belajar", empty state CTA
  - `Pages/Student/MyCourses.jsx` — grid kursus dikelompokkan per status (In Progress / Not Started / Selesai), progress bar gradient
  - `Pages/Student/Wishlist.jsx` — redesign pakai StudentLayout + V&Q design tokens (migrasi dari AppLayout)
  - `Pages/Student/Profile.jsx` — 3 tabs: Informasi Pribadi (form + photo upload), Keamanan & Sandi (ganti password), Notifikasi (placeholder)
  - `Pages/Student/Notifications.jsx` — notification center (empty state; data real dari F14 nanti)
  - `DashboardController.php` — semua `view()` → `Inertia::render()`, tambah `notifications()`
  - `routes/web.php` — tambah `student.notifications` route
  - `tailwind.config.js` — tambah token `background-subtle: #F8F5F2`
  - `npm run build` ✅ — 2392 modules, 0 error

### LANGKAH 6 — Albariqi · Instructor Course CRUD (A1) — paralel ✅ SELESAI (2026-06-02)
- **Apa:** `Pages/Instructor/Courses/{Index,BasicInfo}` + create/edit kursus.
- **Mulai setelah:** Langkah 0 (mandiri, tidak menunggu Ray/Vascha).
- **File utama:** `Instructor/CourseController`, `resources/js/Pages/Instructor/Courses/*`.
- **Selesai bila:** instruktur bisa buat & edit kursus (info dasar, kategori, harga, thumbnail Cloudinary); `npm run build` sukses. ✅
- **Branch:** `feature/instructor-courses`.
- **Hasil implementasi:**
  - `app/Http/Controllers/Backend/Instructor/CourseController.php` — CRUD lengkap (index, create, store, edit, update, destroy, submit); scope ke `instructor_id = auth()->id()`
  - `app/Http/Requests/Instructor/StoreCourseRequest.php` — validasi buat kursus baru (title, slug, kategori, harga, thumbnail)
  - `app/Http/Requests/Instructor/UpdateCourseRequest.php` — validasi edit (unique slug exclude current, authorize pemilik)
  - `Pages/Instructor/Courses/Index.jsx` — daftar kursus dengan status badge, statistik (total/aktif/pending/draft), aksi edit/hapus/submit-for-review/lihat-publik
  - `Pages/Instructor/Courses/BasicInfo.jsx` — form 2-kolom: Identitas (judul, slug auto-generate, deskripsi), Kategori (cascade subcategory), Harga (dengan preview diskon), Sorotan toggle (featured/bestseller), Thumbnail drag-drop ke Cloudinary
  - `routes/web.php` — ditambahkan `Route::resource('courses', ...)` + route `submit` + placeholder `curriculum` di grup instructor
  - `npm run build` PASS ✅ (2385 modules)


### LANGKAH 7 — Albariqi · Section & Lecture CRUD (A2) ✅ SELESAI (2026-06-04)
- **Apa:** `Curriculum.jsx` (kelola section & lecture) + tombol submit-for-review (draft → pending_review).
- **Mulai setelah:** Langkah 6.
- **File utama:** `SectionController`, `LectureController`, `resources/js/Pages/Instructor/Courses/Curriculum.jsx`.
- **Selesai bila:** instruktur bisa susun kurikulum & ajukan review; status kursus berubah benar. ✅
- **Branch:** `feature/instructor-curriculum`.
- **Hasil implementasi:**
  - `SectionController.php` — `store` / `update` / `destroy` / `reorder`; scope ke kursus milik instructor
  - `LectureController.php` — `store` / `update` / `destroy` / `reorder`; nested course→section→lecture; validasi kepemilikan 3 lapis
  - `CourseController@curriculum()` — load sections+lectures terurut (`sort_order`), render `Inertia::render('Instructor/Courses/Curriculum')`
  - `Pages/Instructor/Courses/Curriculum.jsx` — accordion section, list lecture, inline-edit section title, inline-edit lecture (judul/URL/durasi/catatan), form tambah section & lecture, tombol Ajukan ke Review, sidebar ringkasan & tips
  - `routes/web.php` — 9 route baru: GET kurikulum + 4 section routes + 4 lecture routes (menggantikan placeholder)
  - `npm run build` PASS ✅ (2393 modules)

### LANGKAH 8 — Ray · Coupon (R3) ✅ SELESAI (2026-06-04)
- **Apa:** Coupon CRUD (instruktur) + terapkan kupon di checkout.
- **Mulai setelah:** Langkah 4 (cart sudah ada).
- **File utama:** `CouponController`, integrasi diskon di cart/checkout.
- **Selesai bila:** kupon valid mengurangi total; kupon invalid/kedaluwarsa ditolak. ✅
- **Branch:** `feature/coupon`. ✅
- **Hasil implementasi:**
  - `Backend/Instructor/CouponController.php` — CRUD kupon instruktur (index, store, update, destroy, toggle status on/off, generate-code)
  - `Frontend/CouponController.php` — apply kupon di cart (POST /coupon/apply), validasi 4-layer (status, expired, quota, course scope), pesan error spesifik
  - `Http/Requests/Instructor/StoreCouponRequest.php` — validasi form kupon (unique code, date, 1-100%, dll)
  - `Pages/Instructor/Coupons/Index.jsx` — halaman React CRUD kupon: table data, modal create/edit, toggle aktif/nonaktif, hapus, stats card (total/aktif/expired), empty state
  - `Pages/Cart/Index.jsx` — `CouponPanel` aktif (ganti placeholder): input kode → POST /coupon/apply → diskon tampil real-time, kupon bisa dibatalkan
  - `routes/web.php` — route instructor coupon CRUD (`/instructor/coupons`, `toggle`, `generate-code`), `/coupon/apply`, `/coupon/remove`
  - `npm run build` PASS ✅ (2388 modules)

### LANGKAH 9 — Yosua (Ray co-author) · Checkout + Midtrans + Enrollment (R4) ✅ SELESAI (2026-06-05)
- **Apa:** checkout end-to-end: buat Snap token asli, halaman pembayaran, **callback/notification handler** Midtrans, buat `Order` + `Payment`, dan **auto-enroll** (isi tabel `Enrollment`) saat status settlement.
- **Mulai setelah:** Langkah 4 (cart) + Langkah 8 (coupon).
- **File utama:** `CheckoutController`, `MidtransService`, handler callback, `Pages/Checkout/*`, `Pages/Payment/*`.
- **Selesai bila:** bayar via Midtrans **sandbox** → Order tercatat → siswa otomatis ter-enroll; status pembayaran tersinkron via callback; `is_production = false` (ADR-004). ✅
- **Branch:** `feature/payment-midtrans`. ✅
- **Kenapa kunci:** langkah ini **membuka 2 pekerjaan Albariqi sekaligus** — Course Player (butuh Enrollment) dan Email NewSale (dipicu callback). Setelah L9 lulus, kabari Albariqi.
- **Hasil implementasi:**
  - `CheckoutController.php` — ganti semua `view()` → `Inertia::render()` (index, process, success, failed); callback handler sudah ada & lengkap
  - `bootstrap/app.php` — CSRF exclusion `/payment/callback` (Midtrans webhook)
  - `routes/web.php` — checkout/payment routes ke `CheckoutController`; tambah `POST /payment/callback`
  - `Pages/Checkout/Index.jsx` — halaman checkout React (desain `checkout_pesanan`, Konteks_A, Plus Jakarta Sans)
  - `Pages/Checkout/Process.jsx` — halaman perantara: load Snap JS sandbox + auto-trigger `snap.pay()` via `useEffect`
  - `Pages/Payment/Success.jsx` — halaman sukses (desain `pembayaran_berhasil`, Quinsha, Konteks_A) — animasi ping, glassmorphism card, daftar kursus dibeli
  - `Pages/Payment/Failed.jsx` — halaman gagal (desain `pembayaran_gagal`, Quinsha, Konteks_A) — red accent bar, CTA coba lagi
  - `npm run build` PASS ✅ (2398 modules)

---

> **Estafet ke Albariqi:** begitu L9 selesai, Albariqi *melanjutkan bagiannya* dengan modal data Enrollment & callback dari Ray.

### LANGKAH 10 — Albariqi · Course Player (A3, F13) ✅ SELESAI (2026-06-05)
- **Apa:** `Pages/Courses/Player` + pelacakan penyelesaian materi (lecture completion).
- **Mulai setelah:** Langkah 9 (butuh `Enrollment` untuk guard akses) + Langkah 7 (kurikulum).
- **File utama:** `CoursePlayerController`, `resources/js/Pages/Courses/Player.jsx`, tabel `lecture_completions`.
- **Selesai bila:** hanya siswa ter-enroll bisa menonton; tandai materi selesai; progres tersimpan & tampil. ✅
- **Branch:** `feature/course-player`. ✅
- **Hasil implementasi:**
  - `Frontend/CoursePlayerController.php` — guard Enrollment (`abort_unless`), `index()` auto-redirect ke first uncompleted lecture, `show()` render `Inertia::render('Courses/Player')` dengan data kurikulum + completed IDs + progress + prev/next, `markComplete()` idempotent `firstOrCreate` + recalculate progress (JSON response)
  - `Pages/Courses/Player.jsx` — layout fullscreen 2-kolom: video YouTube embed (kiri) + sidebar kurikulum accordion (kanan); tombol "Tandai Selesai" → AJAX POST, progress bar gradient (#300033→#ffb145), navigasi prev/next, mobile sidebar overlay, navbar branded dengan progress badge
  - `Pages/Student/MyCourses.jsx` — tombol "Lanjutkan/Mulai Belajar" mengarah ke `/student/learn/{slug}` (Course Player)
  - `Pages/Student/Dashboard.jsx` — tombol "Lanjut" di Lanjutkan Belajar mengarah ke Course Player
  - `routes/web.php` — 3 route baru di grup `student.*`: `GET /student/learn/{slug}` (entry), `GET /student/learn/{slug}/{lecture}` (show), `POST /student/lecture/{lecture}/complete` (mark complete)
  - `npm run build` PASS ✅ (2399 modules)

### LANGKAH 11 — Albariqi · Email notifikasi (A4, F14) ✅ SELESAI (2026-06-05)
- **Apa:** mail `CourseApproved` / `CourseRejected` / `NewSale` (pakai queue).
- **Mulai setelah:** Langkah 9 (NewSale dipicu callback Midtrans).
- **File utama:** Mailable + Blade templates, `app/Mail/*`.
- **Selesai bila:** email terkirim saat kursus disetujui/ditolak & saat ada penjualan; jalan lewat queue. ✅
- **Branch:** `feature/course-emails`. ✅
- **Hasil implementasi:**
  - `app/Mail/CourseApprovedMail.php` — Mailable+ShouldQueue; dikirim ke instruktur saat admin approve kursus (status → active)
  - `app/Mail/CourseRejectedMail.php` — Mailable+ShouldQueue; dikirim ke instruktur saat admin reject dari pending_review; membawa alasan opsional
  - `app/Mail/NewSaleMail.php` — Mailable+ShouldQueue; dikirim ke instruktur per order saat checkout berhasil (settlement/capture)
  - `resources/views/emails/course-approved.blade.php` — template email branded purple (Konteks_A), inline CSS, detail kursus + CTA
  - `resources/views/emails/course-rejected.blade.php` — template email merah, kotak catatan reviewer, langkah perbaikan, CTA
  - `resources/views/emails/new-sale.blade.php` — template email hijau, detail pembeli, kursus terjual, pendapatan instruktur
  - `AdminCourseController::updateStatus()` — hook email: approve → `CourseApprovedMail`, reject dari pending_review → `CourseRejectedMail(reason)`; validasi ditambah field `reason` opsional
  - `CheckoutController::handleSuccess()` — hook email: per order → `NewSaleMail` ke instruktur pemilik kursus
  - Queue driver: `database` (sudah dikonfigurasi di `.env`). Jalankan worker: `php artisan queue:work`
  - `npm run build` PASS ✅ (2399 modules)

---

### LANGKAH 12 — Quinsha · Admin shell React (Q1) ✅ SELESAI (2026-06-05)
- **Apa:** `AdminLayout` + `AdminSidebar` sebagai layout utama admin React (sidebar 256px fixed, mobile-responsive, topbar dengan search).
- **Author:** Quinsha Ilmi Azzahra (quinshailmiazzahra@gmail.com) | Co-author: Yosua Valentino
- **Mulai setelah:** Langkah 0 (mandiri).
- **File utama:** `resources/js/Layouts/AdminLayout.jsx`.
- **Branch:** `feature/admin-react-migration`.
- **Hasil implementasi:**
  - `AdminLayout.jsx` — sidebar 256px fixed (12 nav items), topbar, mobile hamburger toggle, logout POST
  - Active state: `bg-background-subtle text-primary border-r-4 border-primary` (desain moderasi_kursus_admin_panel)
  - `npm run build` PASS ✅ (2408 modules)

### LANGKAH 13 — Quinsha · Admin pages bagian 1 (Q2) ✅ SELESAI (2026-06-05)
- **Apa:** port ke React: Dashboard, Categories, SubCategories, Courses (moderasi), Reviews (moderasi).
- **Author:** Quinsha Ilmi Azzahra (quinshailmiazzahra@gmail.com) | Co-author: Yosua Valentino
- **Mulai setelah:** Langkah 12.
- **Branch:** `feature/admin-react-migration`.
- **Hasil implementasi:**
  - `DashboardController` → `Inertia::render('Admin/Dashboard')` + stats: active_courses, total_revenue, pending_courses, pending_reviews, recent_orders
  - `CategoryController` → `Inertia::render('Admin/Categories/Index')` + edit modal
  - `SubCategoryController` → `Inertia::render('Admin/SubCategories/Index')` + categories list
  - `AdminCourseController` → `Inertia::render('Admin/Courses/Index')` + `Inertia::render('Admin/Courses/Show')`
  - `AdminReviewController` → `Inertia::render('Admin/Reviews/Index')`
  - `Pages/Admin/Dashboard.jsx` — bento grid 4 stats cards, recent orders table, action required panel, system status ping
  - `Pages/Admin/Categories/Index.jsx` — DataTable + modal create/edit + Cloudinary image upload
  - `Pages/Admin/SubCategories/Index.jsx` — DataTable + modal + parent category dropdown
  - `Pages/Admin/Courses/Index.jsx` — tab filter + horizontal cards (desain moderasi_kursus_admin_panel)
  - `Pages/Admin/Courses/Show.jsx` — detail kursus + approve/reject actions
  - `Pages/Admin/Reviews/Index.jsx` — DataTable + star rating + approve/reject buttons
  - `npm run build` PASS ✅ (2408 modules)

### LANGKAH 14 — Quinsha · Admin pages bagian 2 (Q3) ✅ SELESAI (2026-06-05)
- **Apa:** port ke React: Orders, Users, Sliders, InfoBoxes, Partners, Settings.
- **Author:** Quinsha Ilmi Azzahra (quinshailmiazzahra@gmail.com) | Co-author: Yosua Valentino
- **Mulai setelah:** Langkah 13.
- **Branch:** `feature/admin-react-migration`.
- **Hasil implementasi:**
  - `AdminOrderController` → `Inertia::render('Admin/Orders/Index')` + `Inertia::render('Admin/Orders/Show')`
  - `AdminUserController` → `Inertia::render('Admin/Users/Index')`
  - `AdminSliderController` → `Inertia::render('Admin/Sliders/Index')` + edit modal
  - `AdminInfoBoxController` → `Inertia::render('Admin/InfoBoxes/Index')` + edit modal
  - `AdminPartnerController` → `Inertia::render('Admin/Partners/Index')` + edit modal
  - `AdminSiteSettingController` → `Inertia::render('Admin/Settings/Index')`
  - `Pages/Admin/Orders/Index.jsx` — filter status tabs + DataTable (desain manajemen_pesanan)
  - `Pages/Admin/Orders/Show.jsx` — detail order + payment info (midtrans_order_id)
  - `Pages/Admin/Users/Index.jsx` — DataTable view-only (role badge color-coded)
  - `Pages/Admin/Sliders/Index.jsx` — card grid + modal + Cloudinary upload
  - `Pages/Admin/InfoBoxes/Index.jsx` — DataTable + modal CRUD
  - `Pages/Admin/Partners/Index.jsx` — card grid + modal + Cloudinary logo upload
  - `Pages/Admin/Settings/Index.jsx` — form General Config + Social Media (desain pengaturan_situs_global)
  - `npm run build` PASS ✅ (2408 modules)

### LANGKAH 15 — Quinsha · Arsipkan Blade admin lama (Q4)
- **Apa:** nonaktifkan/arsipkan `resources/views/admin/*` setelah semua halaman admin React diverifikasi.
- **Mulai setelah:** Langkah 14 terverifikasi Yosua.
- **Branch:** `chore/deactivate-blade-admin`.

---

### LANGKAH 16 — Yosua · Matikan Blade/Alpine lama (Y3)
- **Apa:** setelah semua fase port selesai, nonaktifkan `app.js`/Alpine & layout Blade lama; sisakan hanya `app.blade.php` (root Inertia) + view email.
- **Mulai setelah:** Langkah 1–15 selesai.
- **Branch:** `chore/deactivate-blade`.

### LANGKAH 17 — SEMUA · Polish, testing, deploy (Y4)
- **Apa:** cek responsif, perbaiki bug, uji end-to-end, build produksi, deploy; update `PROGRESS_TRACKER.md` → 100%.
- **Branch:** `chore/deploy`.

> **Sepanjang proyek — Yosua (Y2):** review **setiap PR** sebelum merge ke `develop`, dan bereskan konflik koeksistensi (app.js vs app.jsx).

---

## 3. Apa yang boleh jalan BERSAMAAN

| Gelombang | Boleh paralel | Catatan |
|---|---|---|
| Gel. 1 (W1) | **Vascha L1** · **Albariqi L2** · **Albariqi L6** | semua hanya butuh fondasi |
| Gel. 2 (W2) | **Ray L3→L4→L8** · **Vascha L5** · **Albariqi L7** · **Quinsha L12** | Ray berurutan; lainnya paralel |
| Gel. 3 (W3) | **Ray L9** ✅ → lalu **Albariqi L10** ✅ **& L11** · **Quinsha L13→L14** | tunggu L9 untuk L10/L11 |
| Gel. 4 (W4) | **Quinsha L15** → **Yosua L16** → **ALL L17** | tahap penutup, berurutan |

Yang **tidak boleh** ditukar urutannya: L1→L3 (CourseCard), L9→L10/L11 (Enrollment & callback), L2→L5 (auth), L14→L15→L16 (jangan matikan Blade sebelum React siap).

---

## 4. Ringkasan "kamu mulai dari sini" (untuk diajarkan)

| Anggota | Mulai dari | Lanjut ke | Tonggak pribadi |
|---|---|---|---|
| **Yosua** (PM) | L0 ✅ (selesai) | review tiap PR (L2-jalan terus) | L16 matikan Blade, L17 deploy |
| **Vascha** | **L1** ✅ (selesai) | **L5** ✅ student panel selesai | komponen jadi acuan tim |
| **Albariqi** | **L2** ✅ auth & error **&** L6 instructor CRUD | L7 ✅ kurikulum → L10 ✅ player → **L11 ✅ email** | L11 ✅ selesai |
| **Ray** | **L3** ✅ wishlist · **L4** ✅ cart | L8 coupon → **L9** payment | **L9** membuka pekerjaan Albariqi |
| **Quinsha** | **L12** admin shell | L13 → L14 admin pages | L15 arsip Blade admin |

Cara ngajarinnya singkat: *"Vascha & Albariqi start duluan dari fondasi. Vascha bikin halaman publik + komponen; begitu CourseCard jadi, Ray mulai wishlist → cart → kupon → bayar. Pas Ray selesai bayar (Enrollment jadi), Albariqi lanjut bikin Course Player + email. Quinsha garap admin paralel. Terakhir Yosua matiin Blade lama, lalu kita semua polish & deploy."*

---

## 5. Cara push tiap langkah (sama untuk semua)

**1 langkah = 1 branch = 1 PR.** Jangan push langsung ke `main`.

```bash
git checkout develop && git pull origin develop
git checkout -b feature/<nama-bagian>      # contoh: feature/cart

# ... kerjakan langkahnya ...

npm run build                              # WAJIB sukses sebelum push
git add -A
git commit -m "feat(cart): cart controller + Pages/Cart/Index (Inertia)"
git push -u origin feature/<nama-bagian>
# buka PR ke develop → minta review Yosua
```

**Checklist sebelum buka PR:**
- [ ] `npm run build` sukses, tidak ada error console.
- [ ] Halaman lama yang belum diport masih jalan (koeksistensi tidak rusak).
- [ ] Tidak mengubah skema DB / integrasi (Midtrans/Cloudinary/Reverb/Meilisearch/Socialite) kecuali memang bagiannya.
- [ ] Update `PROGRESS_TRACKER.md` + centang di `TASK_DISTRIBUTION.md`.
- [ ] Pesan commit pakai **Conventional Commits** (`feat(...)`, `refactor(...)`, `chore(...)`).

**Detail teknis tiap bagian** ada di prompt masing-masing:
`05_prompts/PROMPT_COMMERCE.md` (Ray) · `05_prompts/PROMPT_INSTRUCTOR_PANEL.md` (Albariqi) · `05_prompts/PROMPT_ADMIN_REACT_MIGRATION.md` (Quinsha).

---

*Urutan ini estimasi & boleh digeser; yang mengikat adalah ketergantungan di Bagian 1 & 3 dan aturan push di Bagian 5.*
