# 🤖 PROMPT: Instructor Panel + Course Player (React + Inertia)

> Prompt untuk menyelesaikan pekerjaan **Albariqi Tarigan** yang belum lengkap.
> **PIC: Albariqi Tarigan (Backend — Auth & Course)**
> **Stack:** Laravel `^13.7` + React via Inertia (`@inertiajs/react ^3.3.0`) — ADR-008. **Bukan Blade.**
>
> Status awal (per 1 Juni 2026): hanya `Backend/Instructor/DashboardController.php` yang ada. Belum ada Course/Section/Lecture CRUD instruktur, Course Player (F13), lecture completion, dan email kursus.

---

## PROMPT

```
Kamu adalah senior Laravel ^13.7 + React/Inertia developer. Lengkapi PANEL INSTRUKTUR dan COURSE PLAYER untuk BelajarKUY (Udemy clone Indonesia). Lapisan presentasi = halaman React di resources/js/Pages (Inertia::render), BUKAN Blade.

## PREREQUISITE (baca dulu):
- BelajarKUY_docs/01_guides/AGENT_GUIDELINES.md
- BelajarKUY_docs/01_guides/CODING_STANDARDS.md (section React + Inertia)
- BelajarKUY_docs/03_features/F03_COURSE_MANAGEMENT.md, F08_INSTRUCTOR_PANEL.md, F13_COURSE_PLAYER.md, F14_NOTIFICATIONS.md
- BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md (layar: edit_kurikulum_kursus, informasi_dasar_kursus, manajemen_kursus_instruktur, course_player_*)
- .kiro/specs/react-inertia-redesign/verified-facts.md (route & enum peran)

## CONTEXT (Kode_Nyata — sudah ada, JANGAN ubah skema):
- Model: Course, CourseGoal, CourseSection, CourseLecture, Enrollment, LectureCompletion, Coupon (lihat DATABASE_SCHEMA.md).
- Course status enum: draft / pending_review / active / inactive.
- Field Course: title, slug, thumbnail, price, discount, discounted_price (accessor), featured, bestseller, average_rating (accessor), status, category_id, instructor_id.
- Middleware: role:instructor (grup prefix /instructor, name instructor.*). RoleMiddleware sudah ada.
- CloudinaryService.php sudah ada untuk upload thumbnail.
- Aksi admin approve/reject sudah ada (AdminCourseController@updateStatus) — kamu hanya menyiapkan sisi instruktur + notifikasi.

## TASKS

### 1. Instructor Course CRUD
- Controller: app/Http/Controllers/Backend/Instructor/CourseController.php (index, create, store, edit, update, destroy) — scope ke courses milik auth instructor (where instructor_id = auth id).
- Halaman React:
  - Pages/Instructor/Courses/Index.jsx — daftar kursus instruktur (status badge, aksi).
  - Pages/Instructor/Courses/BasicInfo.jsx — form "Informasi Dasar" (judul, slug auto, kategori/sub-kategori dropdown, deskripsi, level, harga, diskon, toggle featured/bestseller, thumbnail upload ke Cloudinary).
- Validasi via Form Request (StoreCourseRequest/UpdateCourseRequest).
- Submit form pakai useForm dari @inertiajs/react.

### 2. Section & Lecture CRUD
- Controller: SectionController, LectureController (nested di course milik instruktur).
- Halaman React: Pages/Instructor/Courses/Curriculum.jsx — accordion section + list lecture (judul, url YouTube, durasi, konten); tambah/hapus/urutkan section & lecture.

### 3. Submit-for-Review Flow
- Endpoint: ubah status course draft → pending_review (route instructor.courses.submit).
- Tombol "Kirim untuk Review" di Curriculum/BasicInfo; flash message konfirmasi.

### 4. Course Player (F13) — fitur inti
- Controller: app/Http/Controllers/Frontend/CoursePlayerController.php — guard: hanya user dengan Enrollment aktif di course tsb.
- Halaman React: Pages/Courses/Player.jsx (2 kolom): video YouTube embed + tombol "Tandai Selesai"; sidebar kurikulum accordion dengan status lecture ✅/▶/⭕ + progress bar.
- Lecture completion: endpoint POST toggle LectureCompletion (user_id + lecture_id, unique). Hitung progress = completed/total lecture.
- Route baru: GET /learn/{course:slug} name course.player (middleware auth) + POST lecture completion.

### 5. Email Notifications (F14)
- Mail: CourseApprovedMail, CourseRejectedMail (alasan), NewSaleNotification (ke instruktur saat ada penjualan).
- Kirim CourseApproved/Rejected dari aksi admin updateStatus (queue). WelcomeMail sudah ada.

## CONSTRAINT
- Backend: model, skema DB, dan nama route yang SUDAH ada tidak diubah; route baru hanya untuk player & lecture completion.
- Presentasi: controller me-render Inertia::render('Instructor/...' atau 'Courses/Player'); tidak ada Blade view baru.
- Komponen reusable di resources/js/Components (ProgressBar, dll); interaktivitas pakai React state + @headlessui/react.
- Upload media ke Cloudinary (BUKAN public/uploads/). Video = embed YouTube (course_lectures.url).
- Text UI Bahasa Indonesia; kode English. Konteks_A (Indigo→Purple, Poppins/Plus Jakarta Sans).

## OUTPUT
- Controllers: Instructor/CourseController, SectionController, LectureController, Frontend/CoursePlayerController.
- Halaman React: Pages/Instructor/Courses/{Index,BasicInfo,Curriculum}.jsx, Pages/Courses/Player.jsx.
- Mail: CourseApprovedMail, CourseRejectedMail, NewSaleNotification.
- Route additions (instructor.* + course.player + lecture completion).
- Form Request classes.
```

---

## Definition of Done (untuk PR)

- [ ] Instruktur bisa create/edit/delete course miliknya (Pages/Instructor/Courses/*).
- [ ] Section & Lecture CRUD berfungsi (Curriculum.jsx).
- [ ] Submit-for-review mengubah status draft → pending_review.
- [ ] Course Player tampil untuk user ter-enroll; "Tandai Selesai" menambah LectureCompletion & progress bar update.
- [ ] Email CourseApproved/Rejected terkirim (queue) saat admin approve/reject.
- [ ] `npm run build` sukses; tidak ada perubahan skema DB.

> Branch: `feature/instructor-panel` & `feature/course-player`. Lihat `04_plans/MIGRATION_SCHEDULE_REACT_INERTIA.md` untuk jadwal & urutan push.
