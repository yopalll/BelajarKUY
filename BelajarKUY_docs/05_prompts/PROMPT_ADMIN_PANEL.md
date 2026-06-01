# 🤖 PROMPT: Build Admin Panel

> Copy-paste prompt ini ke AI agent untuk membangun admin panel.
> **PIC: Quinsha Ilmi & Vascha U (UI/UX)**

---

## PROMPT

```
Kamu adalah senior Laravel `^13.7` + React/Inertia developer. Bangun admin panel lengkap untuk project BelajarKUY (Udemy clone Indonesia). Admin panel = halaman React + Inertia (ADR-008), **bukan Filament**.

## PREREQUISITE: Baca file-file berikut terlebih dahulu:
- BelajarKUY_docs/01_guides/AGENT_GUIDELINES.md
- BelajarKUY_docs/03_features/F07_ADMIN_PANEL.md
- BelajarKUY_docs/02_architecture/API_ROUTES.md (section Admin Routes)
- BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md

## CONTEXT:
- Semua model sudah ada
- RoleMiddleware sudah terdaftar (alias 'role') — akses admin via `role:admin` (tanpa Filament)
- Admin route prefix: /admin, middleware: auth + role:admin
- Halaman admin = komponen React di `resources/js/Pages/Admin/*`; controller me-render `Inertia::render('Admin/...')`
- Konteks_B (Admin): palet krem + slate-blue, font Inter

## TASKS:

### 1. Admin Layout (`resources/js/Layouts/AdminLayout.jsx` + `resources/js/Components/Admin/AdminSidebar.jsx`)
- Sidebar navigasi (collapsible, state React)
- Top bar (admin name dari `auth.user`, notifications, logout)
- Content area
- TailwindCSS sidebar style (Konteks_B)
- Menu items: Dashboard, Kategori, Sub-kategori, Kursus, Instructor, Order, User, Slider, Info Box, Partner, Review, Settings, Profile

### 2. Admin Dashboard (`resources/js/Pages/Admin/Dashboard.jsx`)
- Stats cards: Total Users, Total Instructors, Total Courses, Active Courses, Total Orders, Total Revenue, This Month Revenue
- Recent orders table (last 10)
- Recent registrations (last 5 users)
- Revenue chart (optional — simple bar chart)

### 3. Category CRUD
- Index: Table dengan columns (Image, Name, Slug, Status, Actions)
- Create: Form (name, image upload)
- Edit: Form pre-filled
- Delete: Confirm dialog (SweetAlert2)
- Toggle status via AJAX

### 4. SubCategory CRUD
- Same as category, tapi punya dropdown pilih parent category

### 5. Course Management
- Index: Table (Thumbnail, Title, Instructor, Category, Status, Actions)
- Show: Detail view
- Approve/Reject: Toggle status (pending_review → active / inactive)
- TIDAK ada create/edit — itu tugas instructor

### 6. Instructor Management (View Only — ADR-006)
- Index: Table (Photo, Name, Email, # Courses, # Coupons, Actions)
- View: Detail instructor + list kursusnya + statistik
- ❌ TIDAK ADA Approve/Block button — instructor auto-active sesuai ADR-006
- ❌ TIDAK ADA payout UI — out of scope sesuai ADR-005

### 7. Order Management
- Index: Table (Order ID, Student, Course, Amount, Status, Date, Actions)
- Show: Detail order + payment info
- Filter by status

### 8. User Management
- Index: Table (Photo, Name, Email, Role, Date, Actions)
- TIDAK ada create — user register sendiri

### 9. Slider CRUD, Info Box CRUD, Partner CRUD
- Standard CRUD dengan image upload
- Reorder support (drag or order field)

### 10. Site Settings
- Key-value pairs (logo, site_name, phone, email, address, facebook, instagram, twitter, youtube)
- Edit form: loop through all settings

### 11. Settings

Halaman "Settings" ditempatkan di satu entry menu sidebar: **Site Settings**.

Halaman ini edit konten **yang disimpan di DB**:
- Logo, site_name, tagline, email, phone, address, footer text
- Social media URLs (facebook, instagram, twitter, youtube)
- Disimpan sebagai key-value di tabel `site_infos`

⚠️ **HAPUS** halaman-halaman ini (sebelumnya ada di spec, sekarang di-remove):
- ❌ Mail Setting UI — credentials di .env, bukan DB
- ❌ Midtrans Setting UI — credentials di .env, hardcoded sandbox (ADR-004)
- ❌ Google OAuth Setting UI — credentials di .env
- ❌ Cloudinary Setting UI — credentials di .env

Project ini tidak memerlukan edit API keys via UI — credentials cukup di `.env` server.

### 12. Review Management
- Index: Table (Student, Course, Rating, Comment, Status, Actions)
- Approve/Reject toggle

## DESIGN (Konteks_B):
- Sidebar slate-blue, latar krem (Inter)
- Content area terang
- Cards untuk stats (komponen React menerima props)
- Tables dengan pagination (props Inertia / paginator Laravel)
- Forms dengan validation feedback (errors dari Inertia `useForm`)
- SweetAlert2 untuk delete confirmation
- Toast notification dari shared prop `flash`

## CONSTRAINT:
- Semua route di prefix 'admin' dengan middleware auth + role:admin (TANPA Filament)
- Halaman = React di `resources/js/Pages/Admin/*`; controller me-render `Inertia::render(...)`
- Submit form via `useForm().post/put` dari `@inertiajs/react`
- Image upload ke **Cloudinary** (BUKAN ke public/uploads/)
- Validasi menggunakan Form Request classes (backend tidak berubah)
- Pagination 10-15 items per halaman
- Text UI dalam Bahasa Indonesia
- Kode dalam English

## OUTPUT:
- Admin layout & sidebar (React)
- Semua controller files (di Backend/Admin/) — me-render `Inertia::render`
- Semua halaman React (`resources/js/Pages/Admin/*`)
- Form Request files
- Route additions
```
