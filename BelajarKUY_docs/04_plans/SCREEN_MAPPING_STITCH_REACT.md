# Pemetaan Layar Redesign Stitch → Halaman/Komponen React + Inertia

> **Deliverable:** D4 — `Peta_Layar` (kontrak konten **C4**)
> **Berkas:** `BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md`
> **Requirement:** R4 (4.1, 4.2, 4.3, 4.4, 4.5, 4.6)
> **Tanggal:** 2026-05-31
> **Sumber kebenaran:** `.kiro/specs/react-inertia-redesign/verified-facts.md` (§5 route, §7 inventaris layar). Seluruh nama route dan nama folder layar dikutip **verbatim** dari berkas tersebut; nilai diturunkan langsung dari `Kode_Nyata` (`routes/web.php`, `routes/auth.php`) dan `Aset_Redesign` (Google Stitch).
> **Scope (R7):** Dokumen ini murni perencanaan/pemetaan (Markdown). Nama halaman React di kolom "Halaman React" adalah **usulan lokasi berkas** di bawah `resources/js/Pages`; tidak ada kode React produksi yang dibuat di sini. Nama model, route, controller, skema database, dan middleware peran dipertahankan utuh tanpa perubahan.

---

## 1. Definisi Layar (R4.1)

Sebuah **"layar"** didefinisikan sebagai **tepat satu folder layar** pada `Aset_Redesign` yang memuat **kedua** berkas berikut secara bersamaan:

- `code.html` (markup hasil ekspor Stitch), dan
- `screen.png` (tangkapan layar desain).

Folder yang **tidak** memuat pasangan lengkap tersebut **dikecualikan** dan **bukan** layar, yaitu:

| Folder dikecualikan | Lokasi | Alasan |
|---|---|---|
| `rocket_growth_modern/` | ada di setiap ekspor (5), (6), (7), (8) | hanya memuat `DESIGN.md`; tanpa `code.html` + `screen.png` |
| `whatsapp_image_2026_05_31_at_22.48.53.jpeg/` | Ekspor (5) | hanya `screen.png`; tanpa `code.html` |
| `whatsapp_image_2026_05_31_at_22.48.53_1.jpeg/` | Ekspor (5) | hanya `screen.png`; tanpa `code.html` |
| `prd.md` | Ekspor (5) | berkas PRD redesign; bukan folder layar |

Akar aset: `BelajarKuy_Design_Revisi/BelajarKuy_Design_Revisi/` berisi 4 folder ekspor Stitch — `stitch_branded_web_interface_design (5)`, `(6)`, `(7)`, `(8)` — masing-masing dengan subfolder `stitch_branded_web_interface_design/` yang memuat folder-folder layar.

### 1.0 Atribusi pembuat `Aset_Redesign` (Stitch)

`BelajarKuy_Design_Revisi.zip` dikerjakan berdua oleh **Vascha U** dan **Quinsha Ilmi** — masing-masing **2 folder ekspor**, selaras peran (Vascha = Frontend/Student/Konteks_A; Quinsha = Admin/Konteks_B):

| Ekspor | Pembuat | Fokus layar |
|---|---|---|
| `(5)` | **Vascha U** | landing, katalog, detail kursus, keranjang, checkout, dashboard student & instructor (Konteks_A) |
| `(7)` | **Vascha U** | login/registrasi, profil, notifikasi, riwayat transaksi, kursus saya, course player mobile (Konteks_A) |
| `(6)` | **Quinsha Ilmi** | admin dashboard overview, moderasi kursus/review, manajemen kategori/kupon, pengaturan situs, pembayaran berhasil/gagal (Konteks_B + sebagian Konteks_A) |
| `(8)` | **Quinsha Ilmi** | admin dashboard final polish, halaman error 403–503, katalog & dashboard final polish (Konteks_B + Konteks_A) |

> Pembagian di atas mengikuti peran tim. Jika pembagian folder aktual berbeda, sesuaikan tabel ini (sumber kebenaran pembuat = kesepakatan tim).

### 1.1 Definisi Konteks Desain (R4.3)

| Konteks | Cakupan | Bahasa desain |
|---|---|---|
| **Konteks_A** | Frontend & Student | Gradien Indigo→Purple, aksen Amber/Orange, font Poppins, kartu `rounded-3xl` |
| **Konteks_B** | Admin | Palet krem + slate-blue, font Inter |

### 1.2 Himpunan Peran (R4.3)

Setiap layar diberi **tepat satu** peran dari himpunan **{Student, Instructor, Admin, publik}** dan **tepat satu** konteks dari himpunan **{Konteks_A, Konteks_B}**. Istilah peran bisnis ini selaras dengan enum `RoleMiddleware.php` (`user` = Student, `instructor` = Instructor, `admin` = Admin); peran `publik` berarti layar yang dapat diakses tanpa autentikasi.

### 1.3 Konvensi kolom & Status (R4.4, R4.6)

- **Route nyata (jika ada):** nama route dikutip **verbatim** dari `verified-facts.md` §5 (mis. `dashboard`, `admin.dashboard`, `course.detail`). Path URI disertakan dalam tanda kurung untuk kejelasan.
- **Status = `Existing`** ⟺ layar memiliki route nyata yang cocok pada `Kode_Nyata`.
- **Status = `Usulan baru`** ⟺ layar **tidak** memiliki route yang cocok pada `Kode_Nyata`; kolom Route diisi `—` dan layar dicatat sebagai usulan baru (R4.6).
- Route landing page `/` adalah **closure tanpa `->name(...)`** di `routes/web.php`, sehingga dikutip sebagai **path `/` (tanpa nama route)** namun tetap dihitung sebagai route nyata yang ada → Status `Existing`.

---

## 2. Tabel Pemetaan Layar (R4.2, R4.3, R4.4, R4.6)

Satu baris per layar. Inventaris mengikuti `verified-facts.md` §7 dengan jumlah per-ekspor: **(5) = 7, (6) = 12, (7) = 13, (8) = 9 → total 41 layar**.

### 2.1 Ekspor (5) — 7 layar

| # | Folder Layar | Halaman React (`resources/js/Pages/...`) | Peran | Konteks Desain | Route nyata (jika ada) | Status |
|---|---|---|---|---|---|---|
| 1 | `landing_page_welcome` | `Pages/Welcome.jsx` | publik | Konteks_A | path `/` (closure tanpa nama route) | Existing |
| 2 | `katalog_kursus_home` | `Pages/Home.jsx` | publik | Konteks_A | `home` (`/home`) | Existing |
| 3 | `detail_kursus_fullstack_web_dev` | `Pages/Courses/Show.jsx` | publik | Konteks_A | `course.detail` (`/courses/{slug}`) | Existing |
| 4 | `keranjang_belanja` | `Pages/Cart/Index.jsx` | Student | Konteks_A | `cart.index` (`/cart`) | Existing |
| 5 | `checkout_pesanan` | `Pages/Checkout/Index.jsx` | Student | Konteks_A | `checkout` (`/checkout`) | Existing |
| 6 | `student_dashboard` | `Pages/Student/Dashboard.jsx` | Student | Konteks_A | `student.dashboard` (`/student/dashboard`) | Existing |
| 7 | `instructor_dashboard` | `Pages/Instructor/Dashboard.jsx` | Instructor | Konteks_A | `instructor.dashboard` (`/instructor/dashboard`) | Existing |

### 2.2 Ekspor (6) — 12 layar

| # | Folder Layar | Halaman React (`resources/js/Pages/...`) | Peran | Konteks Desain | Route nyata (jika ada) | Status |
|---|---|---|---|---|---|---|
| 8 | `admin_dashboard_overview` | `Pages/Admin/Dashboard.jsx` | Admin | Konteks_B | `admin.dashboard` (`/admin/dashboard`) | Existing |
| 9 | `course_player_fullstack_web_dev` | `Pages/Courses/Player.jsx` | Student | Konteks_A | — | Usulan baru |
| 10 | `edit_kurikulum_kursus` | `Pages/Instructor/Courses/Curriculum.jsx` | Instructor | Konteks_A | — | Usulan baru |
| 11 | `informasi_dasar_kursus` | `Pages/Instructor/Courses/BasicInfo.jsx` | Instructor | Konteks_A | — | Usulan baru |
| 12 | `manajemen_kategori_kursus` | `Pages/Admin/Categories/Index.jsx` | Admin | Konteks_B | `admin.categories.index` (`/admin/categories`) | Existing |
| 13 | `manajemen_kupon_diskon` | `Pages/Admin/Coupons/Index.jsx` | Admin | Konteks_B | — | Usulan baru |
| 14 | `manajemen_kursus_instruktur` | `Pages/Instructor/Courses/Index.jsx` | Instructor | Konteks_A | — | Usulan baru |
| 15 | `moderasi_kursus_admin_panel` | `Pages/Admin/Courses/Index.jsx` | Admin | Konteks_B | `admin.courses.index` (`/admin/courses`) | Existing |
| 16 | `moderasi_review_siswa` | `Pages/Admin/Reviews/Index.jsx` | Admin | Konteks_B | `admin.reviews.index` (`/admin/reviews`) | Existing |
| 17 | `pembayaran_berhasil` | `Pages/Payment/Success.jsx` | Student | Konteks_A | `payment.success` (`/payment/success`) | Existing |
| 18 | `pembayaran_gagal` | `Pages/Payment/Failed.jsx` | Student | Konteks_A | `payment.failed` (`/payment/failed`) | Existing |
| 19 | `pengaturan_situs_global` | `Pages/Admin/Settings/Index.jsx` | Admin | Konteks_B | `admin.settings.index` (`/admin/settings`) | Existing |

### 2.3 Ekspor (7) — 13 layar

| # | Folder Layar | Halaman React (`resources/js/Pages/...`) | Peran | Konteks Desain | Route nyata (jika ada) | Status |
|---|---|---|---|---|---|---|
| 20 | `course_player_mobile` | `Pages/Courses/Player.jsx` (varian mobile) | Student | Konteks_A | — | Usulan baru |
| 21 | `daftar_pengguna_admin_panel` | `Pages/Admin/Users/Index.jsx` | Admin | Konteks_B | `admin.users.index` (`/admin/users`) | Existing |
| 22 | `katalog_kursus_search_empty_state` | `Pages/Home.jsx` (state kosong) | publik | Konteks_A | `home` (`/home`) | Existing |
| 23 | `keranjang_belanja_filled_state` | `Pages/Cart/Index.jsx` (state terisi) | Student | Konteks_A | `cart.index` (`/cart`) | Existing |
| 24 | `kursus_saya_empty_state` | `Pages/Student/MyCourses.jsx` (state kosong) | Student | Konteks_A | `student.my-courses` (`/student/my-courses`) | Existing |
| 25 | `landing_page_mobile` | `Pages/Welcome.jsx` (varian mobile) | publik | Konteks_A | path `/` (closure tanpa nama route) | Existing |
| 26 | `login_registrasi_belajarkuy` | `Pages/Auth/Login.jsx` & `Pages/Auth/Register.jsx` | publik | Konteks_A | `login` (`/login`) & `register` (`/register`) | Existing |
| 27 | `manajemen_pesanan_admin_panel` | `Pages/Admin/Orders/Index.jsx` | Admin | Konteks_B | `admin.orders.index` (`/admin/orders`) | Existing |
| 28 | `pengaturan_profil_akun` | `Pages/Profile/Edit.jsx` | Student | Konteks_A | `profile.edit` (`/profile`) | Existing |
| 29 | `profil_instruktur_public_view` | `Pages/Instructors/Show.jsx` | publik | Konteks_A | — | Usulan baru |
| 30 | `pusat_notifikasi_student` | `Pages/Student/Notifications.jsx` | Student | Konteks_A | — | Usulan baru |
| 31 | `riwayat_transaksi_saya` | `Pages/Student/Transactions.jsx` | Student | Konteks_A | — | Usulan baru |
| 32 | `student_dashboard_empty_state` | `Pages/Student/Dashboard.jsx` (state kosong) | Student | Konteks_A | `student.dashboard` (`/student/dashboard`) | Existing |

### 2.4 Ekspor (8) — 9 layar

| # | Folder Layar | Halaman React (`resources/js/Pages/...`) | Peran | Konteks Desain | Route nyata (jika ada) | Status |
|---|---|---|---|---|---|---|
| 33 | `admin_dashboard_final_polish` | `Pages/Admin/Dashboard.jsx` (final) | Admin | Konteks_B | `admin.dashboard` (`/admin/dashboard`) | Existing |
| 34 | `katalog_kursus_final_polish` | `Pages/Home.jsx` (final) | publik | Konteks_A | `home` (`/home`) | Existing |
| 35 | `student_dashboard_final_polish` | `Pages/Student/Dashboard.jsx` (final) | Student | Konteks_A | `student.dashboard` (`/student/dashboard`) | Existing |
| 36 | `error_403_minimalist_no_illustration` | `Pages/Errors/403.jsx` | publik | Konteks_A | — | Usulan baru |
| 37 | `error_404_minimalist_no_illustration` | `Pages/Errors/404.jsx` | publik | Konteks_A | — | Usulan baru |
| 38 | `error_419_minimalist_no_illustration` | `Pages/Errors/419.jsx` | publik | Konteks_A | — | Usulan baru |
| 39 | `error_429_minimalist_no_illustration` | `Pages/Errors/429.jsx` | publik | Konteks_A | — | Usulan baru |
| 40 | `error_500_minimalist_no_illustration` | `Pages/Errors/500.jsx` | publik | Konteks_A | — | Usulan baru |
| 41 | `error_503_minimalist_no_illustration` | `Pages/Errors/503.jsx` | publik | Konteks_A | — | Usulan baru |

---

## 3. Cakupan Pemetaan — 0 Layar Tak Terpetakan (R4.2)

Setiap dari **41 layar valid** dipetakan ke **minimal satu** halaman React+Inertia di bawah `resources/js/Pages` (lihat tabel §2). Karena itu, **jumlah layar yang tidak terpetakan = 0**.

> Catatan injektivitas: beberapa layar yang merupakan **state/varian/polish** (mis. `*_empty_state`, `*_mobile`, `*_final_polish`) sengaja dipetakan ke halaman React yang **sama** dengan layar dasarnya (mis. `student_dashboard`, `student_dashboard_empty_state`, dan `student_dashboard_final_polish` → `Pages/Student/Dashboard.jsx`). Ini sah karena R4.2 hanya mensyaratkan setiap layar terpetakan ke ≥1 halaman, bukan pemetaan satu-ke-satu. Perbedaan state ditangani lewat props/kondisi render dalam komponen halaman yang sama.

### 3.1 Rekap jumlah (validasi inventaris)

| Ekspor | Layar valid | Existing | Usulan baru |
|---|---|---|---|
| (5) | 7 | 7 | 0 |
| (6) | 12 | 7 | 5 |
| (7) | 13 | 9 | 4 |
| (8) | 9 | 3 | 6 |
| **Total** | **41** | **26** | **15** |

- **Total layar terpetakan:** 41/41 (tak terpetakan = 0).
- **Layar Existing (punya route nyata):** 26.
- **Layar Usulan baru (tanpa route cocok):** 15.

### 3.2 Distribusi per Peran & Konteks

| Peran | Jumlah layar | Konteks dominan |
|---|---|---|
| publik | 14 | Konteks_A |
| Student | 14 | Konteks_A |
| Instructor | 4 | Konteks_A |
| Admin | 9 | Konteks_B |
| **Total** | **41** | — |

| Konteks | Jumlah layar |
|---|---|
| Konteks_A (Frontend & Student) | 32 |
| Konteks_B (Admin) | 9 |
| **Total** | **41** |

---

## 4. Layar Tanpa Route Cocok — Daftar "Usulan baru" (R4.6)

Ke-15 layar berikut **tidak** memiliki route yang cocok pada `Kode_Nyata` (`routes/web.php`/`routes/auth.php`). Masing-masing ditandai **`Usulan baru`** dengan catatan ketiadaan route. Penambahan route/controller untuk layar-layar ini adalah **rekomendasi pekerjaan terpisah di luar scope fitur ini** (R7.6) — pemetaan di sini hanya mendokumentasikan kebutuhannya, bukan mengeksekusi perubahan backend.

| # | Folder Layar | Halaman React usulan | Peran | Konteks | Catatan ketiadaan route |
|---|---|---|---|---|---|
| 9 | `course_player_fullstack_web_dev` | `Pages/Courses/Player.jsx` | Student | Konteks_A | Belum ada route course player; perlu route baru (mis. `course.player`) di luar scope |
| 10 | `edit_kurikulum_kursus` | `Pages/Instructor/Courses/Curriculum.jsx` | Instructor | Konteks_A | Belum ada route kurikulum instruktur; perlu route baru di luar scope |
| 11 | `informasi_dasar_kursus` | `Pages/Instructor/Courses/BasicInfo.jsx` | Instructor | Konteks_A | Belum ada route form info dasar kursus instruktur; perlu route baru di luar scope |
| 13 | `manajemen_kupon_diskon` | `Pages/Admin/Coupons/Index.jsx` | Admin | Konteks_B | Belum ada route admin kupon (`admin.coupons.*` tidak terdaftar); perlu route baru di luar scope |
| 14 | `manajemen_kursus_instruktur` | `Pages/Instructor/Courses/Index.jsx` | Instructor | Konteks_A | Belum ada route daftar kursus milik instruktur; perlu route baru di luar scope |
| 20 | `course_player_mobile` | `Pages/Courses/Player.jsx` (varian mobile) | Student | Konteks_A | Sama dengan #9; belum ada route course player |
| 29 | `profil_instruktur_public_view` | `Pages/Instructors/Show.jsx` | publik | Konteks_A | Belum ada route profil instruktur publik; perlu route baru di luar scope |
| 30 | `pusat_notifikasi_student` | `Pages/Student/Notifications.jsx` | Student | Konteks_A | Belum ada route notifikasi student; perlu route baru di luar scope |
| 31 | `riwayat_transaksi_saya` | `Pages/Student/Transactions.jsx` | Student | Konteks_A | Belum ada route riwayat transaksi student; perlu route baru di luar scope |
| 36 | `error_403_minimalist_no_illustration` | `Pages/Errors/403.jsx` | publik | Konteks_A | Halaman error dirender oleh handler exception Laravel; tidak terikat named route |
| 37 | `error_404_minimalist_no_illustration` | `Pages/Errors/404.jsx` | publik | Konteks_A | Halaman error; tidak terikat named route |
| 38 | `error_419_minimalist_no_illustration` | `Pages/Errors/419.jsx` | publik | Konteks_A | Halaman error; tidak terikat named route |
| 39 | `error_429_minimalist_no_illustration` | `Pages/Errors/429.jsx` | publik | Konteks_A | Halaman error; tidak terikat named route |
| 40 | `error_500_minimalist_no_illustration` | `Pages/Errors/500.jsx` | publik | Konteks_A | Halaman error; tidak terikat named route |
| 41 | `error_503_minimalist_no_illustration` | `Pages/Errors/503.jsx` | publik | Konteks_A | Halaman error; tidak terikat named route |

---

## 5. Komponen React Reusable (R4.5)

Sebuah komponen dianggap **"dapat digunakan ulang"** jika dipakai pada **minimal 2 layar** (folder layar berbeda). Tabel berikut mendaftar komponen reusable beserta **setiap layar pemakainya**. Lokasi usulan: `resources/js/Components/...`.

| Komponen | Lokasi usulan | Konteks | Layar pemakai (≥2) |
|---|---|---|---|
| `AppHeader` (Navbar publik/Student) | `Components/Layout/AppHeader.jsx` | Konteks_A | `landing_page_welcome`, `landing_page_mobile`, `katalog_kursus_home`, `katalog_kursus_search_empty_state`, `katalog_kursus_final_polish`, `detail_kursus_fullstack_web_dev`, `keranjang_belanja`, `keranjang_belanja_filled_state`, `checkout_pesanan`, `student_dashboard`, `student_dashboard_empty_state`, `student_dashboard_final_polish` |
| `AppFooter` | `Components/Layout/AppFooter.jsx` | Konteks_A | `landing_page_welcome`, `landing_page_mobile`, `katalog_kursus_home`, `katalog_kursus_final_polish`, `detail_kursus_fullstack_web_dev`, `profil_instruktur_public_view` |
| `CourseCard` | `Components/Course/CourseCard.jsx` | Konteks_A | `katalog_kursus_home`, `katalog_kursus_search_empty_state`, `katalog_kursus_final_polish`, `detail_kursus_fullstack_web_dev`, `student_dashboard`, `student_dashboard_final_polish` |
| `PriceTag` / `Badge` | `Components/Course/PriceTag.jsx` | Konteks_A | `katalog_kursus_home`, `detail_kursus_fullstack_web_dev`, `keranjang_belanja`, `keranjang_belanja_filled_state`, `checkout_pesanan` |
| `CartItem` | `Components/Cart/CartItem.jsx` | Konteks_A | `keranjang_belanja`, `keranjang_belanja_filled_state`, `checkout_pesanan` |
| `OrderSummary` | `Components/Cart/OrderSummary.jsx` | Konteks_A | `keranjang_belanja_filled_state`, `checkout_pesanan` |
| `ProgressBar` | `Components/Course/ProgressBar.jsx` | Konteks_A | `course_player_fullstack_web_dev`, `course_player_mobile`, `student_dashboard`, `student_dashboard_final_polish` |
| `StatCard` (kartu statistik dashboard) | `Components/Dashboard/StatCard.jsx` | Konteks_A & Konteks_B | `instructor_dashboard`, `student_dashboard`, `student_dashboard_final_polish`, `admin_dashboard_overview`, `admin_dashboard_final_polish` |
| `EmptyState` | `Components/Common/EmptyState.jsx` | Konteks_A | `katalog_kursus_search_empty_state`, `kursus_saya_empty_state`, `student_dashboard_empty_state` |
| `ErrorLayout` | `Components/Layout/ErrorLayout.jsx` | Konteks_A | `error_403_minimalist_no_illustration`, `error_404_minimalist_no_illustration`, `error_419_minimalist_no_illustration`, `error_429_minimalist_no_illustration`, `error_500_minimalist_no_illustration`, `error_503_minimalist_no_illustration` |
| `AdminSidebar` | `Components/Admin/AdminSidebar.jsx` | Konteks_B | `admin_dashboard_overview`, `admin_dashboard_final_polish`, `manajemen_kategori_kursus`, `manajemen_kupon_diskon`, `moderasi_kursus_admin_panel`, `moderasi_review_siswa`, `pengaturan_situs_global`, `daftar_pengguna_admin_panel`, `manajemen_pesanan_admin_panel` |
| `AdminTopbar` | `Components/Admin/AdminTopbar.jsx` | Konteks_B | `admin_dashboard_overview`, `admin_dashboard_final_polish`, `manajemen_kategori_kursus`, `manajemen_kupon_diskon`, `moderasi_kursus_admin_panel`, `moderasi_review_siswa`, `pengaturan_situs_global`, `daftar_pengguna_admin_panel`, `manajemen_pesanan_admin_panel` |
| `DataTable` (tabel data admin) | `Components/Admin/DataTable.jsx` | Konteks_B | `manajemen_kategori_kursus`, `manajemen_kupon_diskon`, `moderasi_kursus_admin_panel`, `moderasi_review_siswa`, `daftar_pengguna_admin_panel`, `manajemen_pesanan_admin_panel` |
| `StatusBadge` (status moderasi/pesanan) | `Components/Admin/StatusBadge.jsx` | Konteks_B | `moderasi_kursus_admin_panel`, `moderasi_review_siswa`, `manajemen_pesanan_admin_panel`, `daftar_pengguna_admin_panel` |
| `FlashToast` (konsumsi prop `flash`) | `Components/Common/FlashToast.jsx` | Konteks_A & Konteks_B | dipakai global di seluruh layar berlayout (≥2), mengonsumsi prop bersama `flash` (`success`/`error`/`info`/`warning`) dari `HandleInertiaRequests.php` |
| `InstructorCourseForm` | `Components/Instructor/InstructorCourseForm.jsx` | Konteks_A | `informasi_dasar_kursus`, `edit_kurikulum_kursus` |

> Komponen yang **tidak** memenuhi ambang reuse (hanya 1 layar) sengaja **tidak** dicantumkan di tabel ini, mis. `AuthCard` (hanya pada layar `login_registrasi_belajarkuy`, meski memetakan ke dua halaman React `Login.jsx`/`Register.jsx`, tetap 1 folder layar). Komponen semacam ini tetap dapat dibuat sebagai komponen lokal halaman tanpa diklaim "reusable".

---

## 6. Keterlacakan (Traceability)

| Bagian dokumen | Requirement dipenuhi |
|---|---|
| §1 Definisi layar (`code.html` + `screen.png`) | R4.1 |
| §2 Tabel pemetaan (1 baris/layar; kolom Folder Layar, Halaman React, Peran, Konteks, Route, Status) | R4.2, R4.3, R4.4, R4.6 |
| §2 kolom Peran ∈ {Student, Instructor, Admin, publik} & Konteks ∈ {Konteks_A, Konteks_B} (tepat satu masing-masing) | R4.3 |
| §2 kolom Route nyata (dikutip verbatim bila ada) | R4.4 |
| §3 Cakupan 0 tak terpetakan (41/41) | R4.2 |
| §4 Daftar layar tanpa route → "Usulan baru" + catatan ketiadaan route | R4.6 |
| §5 Komponen reusable (≥2 layar) + daftar layar pemakai | R4.5 |

> **Catatan koreksi inventaris:** Narasi lama pada `design.md` menulis total "7 + 13 + 13 + 9". Hitungan terverifikasi pada `verified-facts.md` §7.5 adalah **7 + 12 + 13 + 9 = 41** (Ekspor (6) memuat **12** layar valid, bukan 13). Dokumen ini memakai angka per-ekspor terverifikasi tersebut; total 41 tetap konsisten.
