# 🤖 PROMPT: Build Frontend Pages

> Copy-paste prompt ini ke AI agent untuk membangun halaman frontend.
> **PIC: Vascha U & Quinsha Ilmi (Frontend)**

---

## PROMPT

```
Kamu adalah senior React + Inertia + TailwindCSS developer. Bangun halaman-halaman frontend untuk project BelajarKUY (Udemy clone Indonesia).

## PREREQUISITE: Baca file-file berikut terlebih dahulu:
- BelajarKUY_docs/01_guides/AGENT_GUIDELINES.md
- BelajarKUY_docs/01_guides/CODING_STANDARDS.md (section React + Inertia / Frontend)
- BelajarKUY_docs/03_features/F02_LANDING_PAGE.md
- BelajarKUY_docs/04_plans/SCREEN_MAPPING_STITCH_REACT.md

## CONTEXT:
- Laravel `^13.7` + React `^19.2.6` via Inertia (`@inertiajs/react ^3.3.0`, `inertiajs/inertia-laravel ^3.1`)
- TailwindCSS `^3.1.0` untuk styling; `@headlessui/react` + `lucide-react` untuk komponen & ikon
- SweetAlert2 tersedia untuk notifications (konsumsi shared prop `flash`)
- Halaman di `resources/js/Pages`, komponen reusable di `resources/js/Components`, root view `app`
- Semua model dan relationship sudah ada
- Database sudah terisi data (seeder)

## TASKS:

### 1. Root view & layout React (`resources/views/app.blade.php` + `resources/js/Layouts/AppLayout.jsx`)
- Root view `app.blade.php`: HTML5 boilerplate lang="id", `@viteReactRefresh`, `@vite([...])`, `@inertiaHead`, `@inertia`
- `AppLayout.jsx`: komponen layout React (header + konten + footer), dipakai oleh halaman publik
- Modern, clean design — terinspirasi dari Udemy

### 2. Navbar Component (`resources/js/Components/AppHeader.jsx`)
- Logo "BelajarKUY" di kiri
- Menu: Beranda, Kategori (dropdown via `@headlessui/react`), Kursus
- Search bar di tengah
- Kanan: Cart icon (dengan badge count), Wishlist icon (`lucide-react`)
- Jika guest: tombol "Masuk" dan "Daftar" (`<Link>`)
- Jika auth: dropdown user (nama, foto, Dashboard, Profile, Logout) — dari shared prop `auth.user`
- Responsive (hamburger menu di mobile, state React)
- **Search bar dengan live search** (React state + Meilisearch API)

### 3. Footer Component (`resources/js/Components/AppFooter.jsx`)
- 4 kolom: About, Links, Kategori Populer, Kontak
- Social media icons
- Copyright text
- Data dari props (SiteInfo)

### 4. Course Card Component (`resources/js/Components/CourseCard.jsx`)
- Props: `course`
- Thumbnail image
- Category badge
- Title (truncated)
- Instructor name
- Star rating (average)
- Price (dengan diskon jika ada — coret harga asli)
- Bestseller badge (jika applicable)
- Hover effect (shadow + scale)

### 5. Landing Page (`resources/js/Pages/Home.jsx`)
Section 1: Hero Slider (dari tabel sliders)
Section 2: Kategori Populer (grid 4x2 cards)
Section 3: Kursus Unggulan (carousel/grid course cards, featured=true)
Section 4: Kursus Best Seller (carousel/grid, bestseller=true)
Section 5: Mengapa BelajarKUY? (info boxes)
Section 6: Partner Kami (logo carousel)

### 6. Course Detail Page (`resources/js/Pages/Courses/Show.jsx`)
- Hero section: thumbnail, title, description, rating, students count, instructor
- Sidebar: price, buy button, add to cart, add to wishlist
- Tabs: Deskripsi, Kurikulum (sections + lectures), Review
- Kurikulum: accordion sections → list lectures (`@headlessui/react` Disclosure)
- Review: list reviews + form (jika eligible)
- Related courses section

### 7. HomeController (app/Http/Controllers/Frontend/HomeController.php)
```php
public function index()
{
    $sliders = Slider::where('status', true)->orderBy('order')->get();
    $categories = Category::active()->withCount('courses')->take(8)->get();
    $featuredCourses = Course::active()->featured()
        ->with(['category', 'instructor', 'reviews'])->take(8)->get();
    $bestsellerCourses = Course::active()->bestseller()
        ->with(['category', 'instructor', 'reviews'])->take(8)->get();
    $infoBoxes = InfoBox::orderBy('order')->get();
    $partners = Partner::where('status', true)->orderBy('order')->get();

    // Logika backend tidak berubah; hanya respons presentasi → Inertia::render
    return Inertia::render('Home', compact(
        'sliders', 'categories', 'featuredCourses',
        'bestsellerCourses', 'infoBoxes', 'partners'
    ));
}
```

## DESIGN GUIDELINES:
- Warna utama: Indigo (#4F46E5) atau Purple (#7C3AED)
- Warna aksen: Amber/Orange untuk CTA buttons
- Background: White + Light Gray sections
- Font: Inter atau system-ui
- Responsive: mobile-first
- Animasi subtle: hover effects, transition, fade-in
- Kartu kursus mirip style Udemy

## CONSTRAINT:
- HANYA TailwindCSS (jangan tambah CSS custom kecuali sangat perlu)
- React state + `@headlessui/react` untuk dropdown, accordion, slider (BUKAN Alpine.js)
- Text UI dalam Bahasa Indonesia
- Halaman = komponen React di `resources/js/Pages`; controller me-render `Inertia::render('Nama/Halaman', $props)`
- Navigasi antar halaman pakai `<Link>` dari `@inertiajs/react` (bukan `<a href>` biasa)
- Komponen reusable di `resources/js/Components` (`<CourseCard course={...} />`)
- Semua gambar dari database (URL Cloudinary), jangan hardcode
- Video kursus embed dari YouTube (URL di `course_lectures.url`)
- Live search di navbar (React state + Meilisearch API)

## OUTPUT:
- Root view `app.blade.php` + entry `resources/js/app.jsx`
- Layout & component files React (`resources/js/Components/*`, `resources/js/Layouts/*`)
- Home page (`Pages/Home.jsx`)
- Course detail page (`Pages/Courses/Show.jsx`)
- HomeController (me-render `Inertia::render`)
- CourseDetailController (me-render `Inertia::render`)
- Route additions (jika perlu)
```
