# 🤖 PROMPT: Migrasi Admin Panel Blade → React + Inertia

> Prompt untuk menyelesaikan pekerjaan **Quinsha Ilmi** yang belum lengkap.
> **PIC: Quinsha Ilmi (UI/UX — Admin)**
> **Stack:** Laravel `^13.7` + React via Inertia (ADR-008).
>
> Status awal (per 1 Juni 2026): admin panel **sudah lengkap dalam Blade** (`resources/views/admin/*` + 11 controller di `app/Http/Controllers/Admin/*`). Pekerjaan tersisa: **memigrasikan tampilan admin ke halaman React+Inertia** (`Pages/Admin/*`) tanpa mengubah logika backend & route. **Bukan Filament** (`composer.json` tidak memuat `filament/*`).

---

## PROMPT

```
Kamu adalah senior React/Inertia + TailwindCSS developer. Migrasikan ADMIN PANEL BelajarKUY dari Blade ke halaman React + Inertia (ADR-008). JANGAN ubah logika controller, model, atau route — hanya ganti respons presentasi dari view() ke Inertia::render() dan buat halaman React-nya.

## PREREQUISITE (baca dulu):
- BelajarKUY_docs/01_guides/AGENT_GUIDELINES.md
- BelajarKUY_docs/01_guides/CODING_STANDARDS.md (section React + Inertia)
- BelajarKUY_docs/03_features/F07_ADMIN_PANEL.md (sudah diperbarui ke React+Inertia)
- BelajarKUY_docs/05_prompts/PROMPT_ADMIN_PANEL.md
- BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md (layar Konteks_B)
- .kiro/specs/react-inertia-redesign/verified-facts.md §5.2 (route admin.* nyata)

## CONTEXT (Kode_Nyata — JANGAN ubah):
- Controller admin SUDAH ada: Admin/{Category, SubCategory, AdminCourse, AdminInstructor, AdminOrder, AdminUser, AdminSlider, AdminInfoBox, AdminPartner, AdminReview, AdminSiteSetting}Controller.
- Route admin.* SUDAH ada (grup prefix /admin, middleware auth+verified+role:admin) — lihat routes/web.php:
  admin.dashboard, admin.categories.*, admin.sub-categories.*, admin.courses.index/show, admin.courses.update-status,
  admin.instructors.index/show, admin.orders.index/show, admin.users.index, admin.sliders.*, admin.info-boxes.*,
  admin.partners.*, admin.reviews.index, admin.reviews.update-status, admin.settings.index/update.
- Blade lama: resources/views/admin/* (jadikan acuan UI/kolom, lalu nonaktifkan setelah migrasi).
- Konteks_B (Admin): palet krem (#FDF6ED/#F9F6F0) + slate-blue (#3B5973) + slate (#2B3A4A), font Inter, ikon lucide-react. Logo "Belajar" + "KUY" oranye.

## TASKS

### 1. Layout & Sidebar Admin (React)
- resources/js/Layouts/AdminLayout.jsx + resources/js/Components/Admin/AdminSidebar.jsx (Konteks_B): sidebar 270px, topbar (search, bell, profil dari auth.user), area konten.
- Komponen reusable: Components/Admin/DataTable.jsx (header, baris, badge status, pagination), FormField, Modal/Drawer.

### 2. Ubah controller admin: view() → Inertia::render()
Untuk SETIAP controller admin, ganti return view('admin.x', $data) menjadi Inertia::render('Admin/X', $data). Data/var yang sudah dikirim controller dipertahankan.

### 3. Halaman React Admin (Pages/Admin/*)
Buat per area, replikasi kolom & aksi dari Blade lama:
- Admin/Dashboard.jsx (stat cards + recent orders + courses pending review)
- Admin/Categories/Index.jsx (+ create/edit via modal), Admin/SubCategories/Index.jsx
- Admin/Courses/Index.jsx + Show.jsx (approve/reject → admin.courses.update-status)
- Admin/Instructors/Index.jsx + Show.jsx (view-only, ADR-006)
- Admin/Orders/Index.jsx + Show.jsx
- Admin/Users/Index.jsx (view-only)
- Admin/Sliders/Index.jsx, Admin/InfoBoxes/Index.jsx, Admin/Partners/Index.jsx (CRUD + upload Cloudinary)
- Admin/Reviews/Index.jsx (approve/reject → admin.reviews.update-status)
- Admin/Settings/Index.jsx (key-value site_infos)
- (opsional) Admin/Login.jsx untuk admin.login.page

### 4. Form & aksi
- Submit pakai useForm dari @inertiajs/react (post/put/patch/delete ke route admin.* yang sudah ada).
- Konfirmasi hapus pakai SweetAlert2; notifikasi via shared prop flash (FlashToast).

## CONSTRAINT
- TIDAK mengubah controller logic, model, skema DB, atau nama route admin.* — hanya respons presentasi + halaman React.
- Akses tetap via RoleMiddleware role:admin (tanpa Filament).
- Setelah halaman React stabil, nonaktifkan/arsipkan Blade admin lama (resources/views/admin/*) sesuai deactivation sequence MASTER_PLAN.
- Konteks_B dipertahankan persis; text campuran ID/EN, Rupiah.

## OUTPUT
- Layout & komponen admin React (AdminLayout, AdminSidebar, DataTable, dll).
- Pages/Admin/* (semua area di atas).
- Perubahan controller admin: view() → Inertia::render() (logic tetap).
- (Tahap akhir) arsip Blade admin lama.
```

---

## Definition of Done (untuk PR)

- [ ] Semua route `admin.*` me-render halaman React (`Pages/Admin/*`) — bukan Blade.
- [ ] CRUD (categories, sub-categories, sliders, info-boxes, partners, settings) berfungsi via `useForm`.
- [ ] Approve/reject course & review berfungsi (route `update-status`).
- [ ] Tidak ada perubahan logic controller / skema DB / nama route; `npm run build` sukses.
- [ ] Blade admin lama diarsipkan setelah verifikasi.

> Branch: `feature/admin-react-migration`. Lihat `04_plans/MIGRATION_SCHEDULE_REACT_INERTIA.md` (Fase 3).
