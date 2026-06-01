# 📆 BelajarKUY — Jadwal Pengerjaan & Rencana Push per Bagian (Migrasi React + Inertia)

> **Tujuan:** Pembagian jadwal & urutan **push/PR per bagian** untuk menyelesaikan sisa pekerjaan + migrasi frontend Blade → React+Inertia (ADR-008).
> **Dibuat:** 1 Juni 2026 · **Acuan:** `MASTER_PLAN_REACT_INERTIA.md` (fase), `MASTER_ROADMAP.md` (Phase 6), `PROGRESS_TRACKER.md` (status nyata), `01_guides/GIT_WORKFLOW.md` (branching).
>
> **Prinsip push per bagian:** 1 bagian = 1 feature branch = 1 PR ke `develop`. Push setelah Definition of Done (DoD) bagian terpenuhi + `npm run build` sukses. Commit pakai Conventional Commits. Jangan push langsung ke `main`.

---

## 0. Status awal (1 Juni 2026)

- ✅ **Fondasi React+Inertia (Fase 1) sudah di-scaffold** oleh PM: `vite.config.js` (plugin React + alias `@`), `resources/js/app.jsx`, `Layouts/AppLayout.jsx`, `Components/{AppHeader,CourseCard,FlashToast}.jsx`, `Pages/Welcome.jsx`, `Pages/Home.jsx`; route `/` & `home` sudah `Inertia::render`. `npm run build` PASS. Blade lama tetap jalan (koeksistensi via `app.js`).
- 🔴 Sisa: porting halaman publik lain, commerce (Ray), instructor+player (Albariqi), migrasi admin (Quinsha), auth & student pages (Vascha).

---

## 1. Urutan Fase & Ketergantungan

```
Fase 1 (Publik)  ──►  Fase 2 (Auth & Student)  ──►  Fase 3 (Instructor & Admin)
   Vascha               Vascha + Albariqi              Albariqi + Quinsha
        │
        └─ paralel: Ray (Commerce) butuh CourseCard/cart UI (Fase 1) lalu jalan mandiri
```

- Commerce (Ray) bergantung pada komponen Fase 1 (`CourseCard`, cart UI) lalu independen.
- Course Player (Albariqi) butuh `Enrollment` dari Commerce (Ray) untuk guard akses → koordinasi lintas tim.
- Email `NewSaleNotification` (Albariqi) dipicu callback Midtrans (Ray) → koordinasi.

---

## 2. Timeline (relative — basis 1 Juni 2026)

| Minggu | Tanggal | Fokus | PIC utama |
|---|---|---|---|
| **W1** | 1–7 Jun | Fase 1 selesai (publik) + mulai Commerce | Vascha, Ray |
| **W2** | 8–14 Jun | Auth & Student (Fase 2) + Commerce end-to-end + Instructor CRUD | Vascha, Ray, Albariqi |
| **W3** | 15–21 Jun | Course Player + Admin migration (Fase 3) + integrasi | Albariqi, Quinsha |
| **W4** | 22–28 Jun | Polish, responsif, deaktivasi Blade lama, testing, deploy | ALL |

---

## 3. Rencana Push per Bagian (branch → PR)

> Format: setiap baris = satu PR. Merge ke `develop`. DoD lihat prompt masing-masing.

### Vascha U — Frontend (Fase 1 & 2)
| # | Bagian | Branch | Target push | Bergantung |
|---|---|---|---|---|
| V1 | Port halaman publik: `Welcome`, `Home` (rapikan), `Courses/Show` (data dinamis) | `feature/public-react` | W1 (s.d. 5 Jun) | scaffold Fase 1 ✅ |
| V2 | Komponen reusable: `AppHeader`, `AppFooter`, `EmptyState`, `Badge` | `feature/react-components` | W1 | V1 |
| V3 | Auth pages React (Breeze): `Pages/Auth/{Login,Register,...}` | `feature/auth-react` | W2 | Albariqi (Breeze react) |
| V4 | Student panel React: `Pages/Student/{Dashboard,MyCourses,Wishlist,Profile,Notifications}` | `feature/student-react` | W2 | V2 |

### Ray Nathan — Commerce
| # | Bagian | Branch | Target push | Bergantung |
|---|---|---|---|---|
| R1 | Wishlist add/remove (ganti placeholder `wishlist.add`) | `feature/wishlist` | W1 | CourseCard (V) |
| R2 | Cart: controller + `Pages/Cart/Index` (ganti placeholder `cart.*`) | `feature/cart` | W1–W2 | R1 |
| R3 | Coupon CRUD (instruktur) + apply di checkout | `feature/coupon` | W2 | R2 |
| R4 | Checkout + Midtrans Snap end-to-end + callback + Enrollment | `feature/payment-midtrans` | W2–W3 | R2, R3 |

### Albariqi Tarigan — Course & Instructor
| # | Bagian | Branch | Target push | Bergantung |
|---|---|---|---|---|
| A1 | Instructor Course CRUD: `Pages/Instructor/Courses/{Index,BasicInfo}` | `feature/instructor-courses` | W2 | scaffold ✅ |
| A2 | Section & Lecture CRUD: `Curriculum.jsx` + submit-for-review | `feature/instructor-curriculum` | W2 | A1 |
| A3 | Course Player (F13): `Pages/Courses/Player` + lecture completion | `feature/course-player` | W3 | R4 (Enrollment) |
| A4 | Email: `CourseApproved/Rejected/NewSale` (queue) | `feature/course-emails` | W3 | R4 (callback) |

### Quinsha Ilmi — Admin migration (Fase 3)
| # | Bagian | Branch | Target push | Bergantung |
|---|---|---|---|---|
| Q1 | `AdminLayout` + `AdminSidebar` + `DataTable` (Konteks_B) | `feature/admin-shell-react` | W3 | scaffold ✅ |
| Q2 | Admin Pages part 1: Dashboard, Categories, SubCategories, Courses, Reviews | `feature/admin-react-1` | W3 | Q1 |
| Q3 | Admin Pages part 2: Orders, Users, Sliders, InfoBoxes, Partners, Settings | `feature/admin-react-2` | W3–W4 | Q2 |
| Q4 | Arsip/deaktivasi Blade admin lama (`resources/views/admin/*`) | `chore/deactivate-blade-admin` | W4 | Q3 verified |

### Yosua Valentino — PM/Integrasi
| # | Bagian | Branch | Target push | Bergantung |
|---|---|---|---|---|
| Y1 | Scaffold Fase 1 (entry, vite, layout) | `feature/inertia-scaffold` | ✅ selesai | — |
| Y2 | Code review semua PR + resolusi konflik koeksistensi | (review) | W1–W4 | — |
| Y3 | Deaktivasi `app.js`/Alpine & layout Blade lama setelah Fase 3 | `chore/deactivate-blade` | W4 | semua fase |
| Y4 | Performance, build prod, deploy | `chore/deploy` | W4 | semua |

---

## 4. Aturan Push / PR

1. **1 bagian = 1 branch = 1 PR.** Nama branch sesuai tabel (`feature/...`, `chore/...`).
2. **Sebelum push:** `npm run build` sukses; tidak ada perubahan skema DB (kecuali bila memang bagiannya); update `PROGRESS_TRACKER.md` + checkbox `TASK_DISTRIBUTION.md`.
3. **Conventional Commits**, contoh:
   ```bash
   feat(cart): cart controller + Pages/Cart/Index (Inertia)
   feat(payment): midtrans snap end-to-end + enrollment on settlement
   refactor(admin): migrate categories view to Pages/Admin/Categories/Index
   chore(blade): archive legacy admin blade views
   ```
4. **Koeksistensi:** selama migrasi, halaman yang belum diport tetap Blade (lewat `app.js`); jangan hapus `app.js`/layout Blade sampai Fase 3 selesai (tugas Y3).
5. **Merge** ke `develop`; rilis ke `main` hanya via PR setelah W4.

---

## 5. Definition of Done global (sebelum dianggap selesai)

- [ ] Semua route publik, student, instructor, admin me-render React (`Pages/*`); `0` `.blade.php` presentasi yang masih dirujuk router (selain root `app.blade.php` & email).
- [ ] Commerce end-to-end (cart → checkout → Midtrans sandbox → Enrollment) berfungsi.
- [ ] Course Player + lecture completion berfungsi untuk user ter-enroll.
- [ ] Email kursus terkirim (queue).
- [ ] `npm run build` sukses; skema DB & integrasi (Midtrans/Cloudinary/Reverb/Meilisearch/Socialite) tidak berubah.
- [ ] `PROGRESS_TRACKER.md` diperbarui ke 100%.

---

*Jadwal ini estimasi & dapat digeser; yang mengikat adalah urutan ketergantungan (Bagian 1) dan aturan push (Bagian 4).*
