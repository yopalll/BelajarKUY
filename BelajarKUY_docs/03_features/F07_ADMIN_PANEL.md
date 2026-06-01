# 🛡️ F07: Admin Panel (React + Inertia)

> Dashboard dan management panel untuk administrator.
> **Scope:** Sesuai ADR-005 (no payout) dan ADR-006 (no instructor approval).
> **Implementasi:** Halaman **React + Inertia** di `resources/js/Pages/Admin/*` (lihat `ADR-008`). **Bukan Filament** — `composer.json` tidak memuat paket `filament/*`.

---

## Arsitektur Admin Panel

Admin panel dibangun sebagai **halaman React yang dirender via Inertia** dari controller Laravel yang sudah ada. Routing tetap server-side (grup `role:admin`, prefix `/admin`); controller mengganti respons `view(...)` menjadi `Inertia::render('Admin/...', $props)`. Tidak ada admin panel builder pihak ketiga (Filament tidak terpasang).

### Komponen Utama

| Komponen | Lokasi | Fungsi |
|----------|--------|--------|
| Halaman Admin (React) | `resources/js/Pages/Admin/` | Dashboard, CRUD, moderasi (komponen React per halaman) |
| Komponen reusable | `resources/js/Components/` | `AdminSidebar`, tabel, form, dsb. (Konteks_B: krem + slate-blue, Inter) |
| Controller Admin | `app/Http/Controllers/**` (existing) | Logika & data; me-render `Inertia::render('Admin/...')` |
| Root view Inertia | `resources/views/app.blade.php` | Root view `app` (`HandleInertiaRequests::$rootView`) |

### Akses Kontrol

Kontrol akses admin memakai **`RoleMiddleware`** yang sudah ada (grup `role:admin`) — **bukan** interface panel pihak ketiga. Enum peran terverifikasi pada `RoleMiddleware.php`: `admin`, `instructor`, default `user` (Student).

```php
// routes/web.php — grup admin (sudah ada)
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // admin.dashboard, admin.categories.*, admin.courses.*, dst.
    });
```

### Halaman React yang Perlu Dibuat

Setiap area admin dipetakan ke halaman React di `resources/js/Pages/Admin/*` (lihat `SCREEN_MAPPING_STITCH_REACT.md`):
- `Admin/Categories/Index.jsx` — CRUD categories + images (Cloudinary) — route `admin.categories.*`
- `Admin/SubCategories/Index.jsx` — CRUD sub-categories — route `admin.sub-categories.*`
- `Admin/Courses/Index.jsx` — List + approve/reject — route `admin.courses.index`, `admin.courses.update-status`
- `Admin/Sliders/Index.jsx` — CRUD hero slider — route `admin.sliders.*`
- `Admin/InfoBoxes/Index.jsx` — CRUD info boxes — route `admin.info-boxes.*`
- `Admin/Partners/Index.jsx` — CRUD partner logos — route `admin.partners.*`
- `Admin/Reviews/Index.jsx` — Moderasi review — route `admin.reviews.index`, `admin.reviews.update-status`
- `Admin/Orders/Index.jsx` — View-only orders — route `admin.orders.index`, `admin.orders.show`
- `Admin/Settings/Index.jsx` — Key-value site settings — route `admin.settings.index`, `admin.settings.update`
- `Admin/Users/Index.jsx` — List students — route `admin.users.index`

## Halaman Admin

> Route dikutip dari `routes/web.php` (`verified-facts.md` §5.2). Halaman React di `resources/js/Pages/Admin/*`.

| # | Halaman React | Route nyata (`name` → path) | Deskripsi |
|---|---------|-------|-----------|
| 1 | `Admin/Dashboard.jsx` | `admin.dashboard` → `/admin/dashboard` | Stats overview: total users, courses, orders, revenue |
| 2 | `Admin/Categories/Index.jsx` | `admin.categories.index` → `/admin/categories` | CRUD categories + images (Cloudinary upload) |
| 3 | `Admin/SubCategories/Index.jsx` | `admin.sub-categories.*` → `/admin/sub-categories` | CRUD sub-categories |
| 4 | `Admin/Courses/Index.jsx` | `admin.courses.index` → `/admin/courses`; `admin.courses.update-status` | List semua kursus, **approve/reject** (pending_review → active/inactive) |
| 5 | `Admin/Instructors/Index.jsx` | `admin.instructors.index` → `/admin/instructors` | **View only** — list instructor + statistik (ADR-006) |
| 6 | `Admin/Orders/Index.jsx` | `admin.orders.index` → `/admin/orders` | List orders, filter by status, detail view |
| 7 | `Admin/Users/Index.jsx` | `admin.users.index` → `/admin/users` | List students (role=user) + view detail |
| 8 | `Admin/Sliders/Index.jsx` | `admin.sliders.*` → `/admin/sliders` | CRUD hero slider (Cloudinary) |
| 9 | `Admin/InfoBoxes/Index.jsx` | `admin.info-boxes.*` → `/admin/info-boxes` | CRUD value proposition boxes |
| 10 | `Admin/Partners/Index.jsx` | `admin.partners.*` → `/admin/partners` | CRUD partner logos (Cloudinary) |
| 11 | `Admin/Settings/Index.jsx` | `admin.settings.index` → `/admin/settings` | Logo, contact info, social media (key-value pairs) |
| 12 | `Admin/Reviews/Index.jsx` | `admin.reviews.index` → `/admin/reviews` | Approve/reject reviews |

---

## ⚠️ HALAMAN YANG DIHAPUS (Scope Decisions)

Sebelumnya ada halaman ini, **sekarang dihapus**:

| ❌ Dihapus | Alasan |
|------------|--------|
| Mail Settings UI (`/admin/mail-setting`) | Credentials di `.env`, bukan DB. Edit via server, bukan UI. |
| Midtrans Settings UI (`/admin/midtrans-setting`) | Credentials di `.env`. Hardcoded sandbox (ADR-004). |
| Google OAuth Settings UI (`/admin/google-setting`) | Credentials di `.env`. |
| Cloudinary Settings UI | Credentials di `.env`. |
| Instructor Approve/Block button | ADR-006 — instructor auto-active. Tidak ada approval flow. |
| Payout Management | ADR-005 — out of scope untuk MVP. |

**Rationale:** Menyimpan API credentials di DB bisa diedit via UI = security anti-pattern. Untuk project akademik dengan 1 deploy target, edit `.env` + restart cukup.

---

## Dashboard Stats

```php
// AdminDashboardController@index
use App\Models\Course;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Models\Enrollment;

public function index(): View
{
    $stats = [
        'total_students'     => User::students()->count(),
        'total_instructors'  => User::instructors()->count(),
        'total_courses'      => Course::count(),
        'active_courses'     => Course::active()->count(),
        'pending_review'     => Course::where('status', 'pending_review')->count(),
        'total_enrollments'  => Enrollment::count(),
        'total_completed_orders' => Order::completed()->count(),
        'gross_revenue'      => Payment::whereIn('status', ['settlement', 'capture'])->sum('total_amount'),
        'this_month_revenue' => Payment::whereIn('status', ['settlement', 'capture'])
            ->whereMonth('created_at', now()->month)
            ->sum('total_amount'),
    ];

    // Recent activity
    $recentOrders = Order::with(['user', 'course'])
        ->completed()
        ->latest()
        ->take(10)
        ->get();

    $recentStudents = User::students()
        ->latest()
        ->take(5)
        ->get();

    return Inertia::render('Admin/Dashboard', compact('stats', 'recentOrders', 'recentStudents'));
}
```

> **Catatan migrasi (presentasi):** logika pengumpulan data di atas dipertahankan utuh; hanya respons presentasi yang berubah dari `view('backend.admin.dashboard', …)` menjadi `Inertia::render('Admin/Dashboard', …)`. Backend (model, query, route) tidak berubah.

---

## Course Approval Flow (Main Moderation Point)

```
Instructor buat course (status=draft)
    ↓
Instructor klik "Submit for Review"
    ↓
Status → pending_review
    ↓
Admin review di /admin/course
    ↓
  [Approve]              [Reject]
    ↓                      ↓
status=active         status=inactive
Email ke instructor   Email ke instructor (+ alasan)
```

```php
// AdminCourseController
public function approve(Course $course): RedirectResponse
{
    $course->update(['status' => 'active']);

    Mail::to($course->instructor)->queue(new CourseApprovedMail($course));

    Log::info('Course approved', [
        'course_id' => $course->id,
        'admin_id' => auth()->id(),
    ]);

    return back()->with('success', 'Kursus disetujui dan sudah tayang.');
}

public function reject(Course $course, Request $request): RedirectResponse
{
    $reason = $request->validate([
        'rejection_reason' => 'required|string|max:500',
    ])['rejection_reason'];

    $course->update(['status' => 'inactive']);

    Mail::to($course->instructor)->queue(new CourseRejectedMail($course, $reason));

    return back()->with('success', 'Kursus ditolak.');
}
```

---

## Instructor List (View-Only, ADR-006)

Admin bisa lihat instructor + statistiknya, **tapi tidak ada tombol Approve/Block**.

```php
// AdminInstructorController@index
public function index(): View
{
    $instructors = User::instructors()
        ->withCount(['courses', 'coupons'])
        ->withSum('courses as gross_revenue', 'price')  // rough estimate
        ->latest()
        ->paginate(15);

    return Inertia::render('Admin/Instructors/Index', compact('instructors'));
}
```

Tabel columns: Photo, Name, Email, # Courses, # Coupons, Join Date, **Action: [View Detail]** (no approve/block).

---

## Media Upload (Cloudinary)

Semua upload (slider, info_box, partner, category image) pakai Cloudinary:

```php
// AdminCategoryController@store
public function store(StoreCategoryRequest $request): RedirectResponse
{
    $data = $request->validated();

    if ($request->hasFile('image')) {
        $result = $request->file('image')->storeOnCloudinary('belajarkuy/categories');
        $data['image'] = $result->getSecurePath();
    }

    Category::create($data);

    return redirect()->route('admin.categories.index')
        ->with('success', 'Kategori berhasil dibuat!');
}
```

---

## UI Design

UI admin dibangun sebagai komponen React (Konteks_B: palet krem + slate-blue, font Inter), mengikuti aset redesign Stitch:

- **Sidebar** (`AdminSidebar`) — komponen React dengan navigasi statis (link via Inertia `<Link>`)
- **Responsive** — mobile-friendly via utilitas Tailwind
- **Form** — komponen React + `@headlessui/react` (input, select, toggle, file upload)
- **Table** — komponen React: sortable, searchable, filterable, bulk actions
- **Dashboard widgets** — kartu stats yang menerima props dari `Inertia::render('Admin/Dashboard', …)`
- **Warna primer** & token desain diatur via Tailwind (lihat `UI_UX_GUIDELINES.md`)
- **SweetAlert2/Toast** digunakan untuk notifikasi (prop bersama `flash` dari `HandleInertiaRequests.php`)
- Login admin via halaman React di route `admin.login.page` (`/admin/login`)

---

## File Structure

```text
resources/js/
├── Pages/
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Categories/Index.jsx
│       ├── SubCategories/Index.jsx
│       ├── Courses/Index.jsx
│       ├── Instructors/Index.jsx
│       ├── Orders/Index.jsx
│       ├── Users/Index.jsx
│       ├── Sliders/Index.jsx
│       ├── InfoBoxes/Index.jsx
│       ├── Partners/Index.jsx
│       ├── Reviews/Index.jsx
│       └── Settings/Index.jsx
└── Components/
    └── Admin/
        ├── AdminSidebar.jsx
        └── DataTable.jsx
```

> Kontrol akses tetap via `RoleMiddleware` (`role:admin`) pada `routes/web.php`; tidak ada interface `FilamentUser` atau `app/Filament/**` (paket Filament tidak terpasang).

---

## PIC: Quinsha Ilmi & Vascha U (UI/UX)
