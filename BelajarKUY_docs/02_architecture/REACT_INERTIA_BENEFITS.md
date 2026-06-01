# 🚀 BelajarKUY — Keunggulan Adopsi React + Inertia

> Dokumen ini menjelaskan manfaat dan keunggulan mengadopsi **React.js melalui Inertia.js** sebagai lapisan presentasi (frontend) BelajarKUY, menggantikan Blade + Alpine.js. Seluruh klaim teknis di sini dikaitkan langsung dengan kondisi kode nyata (`Kode_Nyata`) dan aset redesign Google Stitch (`Aset_Redesign`).
>
> **Status:** Dokumen perencanaan (Markdown saja — tidak ada kode produksi yang diubah).
> **Tanggal:** 2026-05-31
> **Sumber kebenaran:** `composer.json`, `package.json`, `app/Http/Middleware/HandleInertiaRequests.php`, dan inventaris layar `BelajarKuy_Design_Revisi/` — nilai versi dikutip verbatim dari `verified-facts.md`.
> **Requirements terkait:** 2.1, 2.2, 2.3, 2.4, 2.5

---

## 1. Pengantar — Mengapa React + Inertia untuk BelajarKUY

BelajarKUY adalah marketplace e-learning dengan tiga peran pengguna (`user` untuk Student, `instructor`, dan `admin`) serta sejumlah alur kaya interaksi: katalog kursus, keranjang & wishlist, checkout + pembayaran Midtrans, panel Student/Instructor/Admin, hingga course player. Alur-alur ini menuntut antarmuka yang responsif, konsisten antar halaman, dan mudah dipelihara seiring fitur bertambah.

Kondisi kode saat ini **sudah** menyiapkan fondasi React + Inertia, sehingga adopsi penuh adalah kelanjutan natural, bukan perombakan dari nol:

```json
// composer.json (require) — verbatim
"inertiajs/inertia-laravel": "^3.1"
```

```json
// package.json (dependencies) — verbatim
"@inertiajs/react": "^3.3.0",
"react": "^19.2.6",
"react-dom": "^19.2.6"
```

Inertia.js bertindak sebagai "lem" antara backend Laravel dan frontend React: controller tetap mengembalikan data (server-side routing & controller dipertahankan), sementara React menangani rendering. Artinya BelajarKUY memperoleh pengalaman gaya Single Page Application (SPA) **tanpa** harus membangun dan memelihara REST/GraphQL API terpisah. Pendekatan ini selaras dengan batasan migrasi: hanya lapisan presentasi yang berubah, sedangkan model, route, controller, skema database, dan middleware peran tetap utuh.

Pengantar ini diperkuat oleh lima aspek manfaat konkret berikut.

---

## 2. Lima Aspek Manfaat untuk BelajarKUY

### 2.1 Pengalaman Pengembang (Developer Experience)

**Manfaat konkret:** Pengembang BelajarKUY tidak perlu membangun lapisan API terpisah. Controller Laravel cukup memanggil `Inertia::render('Nama/Halaman', $props)`, dan props langsung tersedia sebagai props komponen React. Hal ini memangkas boilerplate dibanding memelihara endpoint JSON + state-fetching manual.

Selain itu, prop autentikasi dan notifikasi flash sudah dibagikan secara global oleh middleware, sehingga setiap halaman React menerimanya tanpa pekerjaan tambahan:

```php
// app/Http/Middleware/HandleInertiaRequests.php — verbatim
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
```

Dengan `auth.user` (memuat `role`) tersedia di semua halaman, pengembang dapat menampilkan UI berbeda untuk Student/Instructor/Admin dari satu sumber data, dan `flash` (`success`/`error`/`info`/`warning`) dapat dirender sebagai notifikasi global tanpa mengoper data berulang per halaman. Hot Module Replacement (HMR) dari Vite (`@vitejs/plugin-react ^6.0.2`) juga mempercepat iterasi UI.

### 2.2 Reusabilitas Komponen

**Manfaat konkret:** Elemen UI yang berulang di banyak layar BelajarKUY dapat diekstrak menjadi komponen React tunggal lalu dipakai ulang, alih-alih menduplikasi partial Blade. Misalnya `CourseCard` muncul di katalog, dashboard Student, dan detail kursus; `AdminSidebar` dipakai di seluruh layar panel admin; serta `EmptyState` dipakai pada beberapa layar kondisi kosong.

React memungkinkan komposisi komponen berbasis props dan state lokal, sehingga satu definisi `CourseCard` cukup dipelihara di satu tempat. Komponen primitif aksesibel dapat memanfaatkan pustaka yang sudah terpasang:

```json
// package.json (dependencies) — verbatim
"@headlessui/react": "^2.2.10",
"lucide-react": "^1.17.0"
```

`@headlessui/react` menyediakan komponen interaktif tanpa gaya (dropdown, modal, menu) yang aksesibel, dan `lucide-react` menyediakan ikon konsisten — keduanya mempercepat pembangunan komponen yang dipakai ulang di banyak halaman tanpa menulis logika dari nol.

### 2.3 Pengalaman Pengguna Gaya SPA

**Manfaat konkret:** Navigasi antar halaman BelajarKUY (mis. dari katalog `home` ke `course.detail`, lalu `cart.index` dan `checkout`) berlangsung tanpa full page reload. Inertia melakukan kunjungan berbasis XHR dan menukar komponen halaman saja, sehingga transisi terasa instan dan state global (seperti `auth.user`) tidak perlu di-fetch ulang setiap navigasi.

Untuk marketplace e-learning, ini berarti alur belanja terasa mulus: menambah kursus ke keranjang, berpindah ke checkout, dan menerima notifikasi `flash` keberhasilan/kegagalan dari server tanpa memuat ulang seluruh dokumen. Pengalaman ini diperoleh sambil tetap mempertahankan server-side routing Laravel yang sudah ada (mis. route bernama `home`, `course.detail`, `cart.index`, `checkout`, `payment.success`, `payment.failed`).

### 2.4 Ekosistem React

**Manfaat konkret:** Mengadopsi React membuka akses ke ekosistem pustaka, perkakas, dan praktik komunitas yang luas dan aktif. BelajarKUY berjalan di React versi mutakhir:

```json
// package.json (dependencies) — verbatim
"react": "^19.2.6",
"react-dom": "^19.2.6"
```

Ekosistem ini langsung dimanfaatkan melalui dependensi yang sudah terpasang: `@headlessui/react ^2.2.10` (komponen UI aksesibel), `lucide-react ^1.17.0` (ikon), dan integrasi real-time via `laravel-echo ^2.3.4` + `pusher-js ^8.5.0` untuk fitur seperti notifikasi. Ketersediaan komponen siap pakai, dukungan TypeScript, serta talenta React di pasar kerja menurunkan biaya pemeliharaan jangka panjang dibanding ekosistem Alpine.js yang lebih sempit.

### 2.5 Keselarasan dengan Aset_Redesign (Layar Google Stitch)

**Manfaat konkret:** Redesign Google Stitch (`BelajarKuy_Design_Revisi/`) terdiri dari 41 layar valid yang terbagi ke dalam dua bahasa desain — **Konteks_A** (Frontend & Student: gradien Indigo→Purple, aksen Amber/Orange, font Poppins, kartu `rounded-3xl`) dan **Konteks_B** (Admin: palet krem + slate-blue, font Inter). Struktur berbasis komponen pada React memetakan secara alami ke struktur layar Stitch: setiap layar menjadi satu halaman di `resources/js/Pages`, dan elemen berulang menjadi komponen bersama.

Karena banyak layar adalah varian (state kosong, varian mobile, polish final) dari halaman yang sama, React memungkinkan satu halaman menangani beberapa state melalui props/kondisi, alih-alih menduplikasi markup. Dua konteks desain juga dapat diisolasi rapi melalui dua layout React (mis. layout publik/Student untuk Konteks_A dan layout admin untuk Konteks_B), didukung utilitas Tailwind:

```json
// package.json (devDependencies) — verbatim
"tailwindcss": "^3.1.0",
"@tailwindcss/vite": "^4.0.0"
```

Dengan demikian token visual Stitch (gradien, radius `rounded-3xl`, tipografi) diterjemahkan ke kelas Tailwind di dalam komponen React yang dapat digunakan ulang lintas layar, menjaga konsistensi visual redesign.

---

## 3. Pengaitan Klaim Teknis ke Kode Nyata

Tabel berikut menautkan klaim keunggulan teknis ke rujukan konkret pada `Kode_Nyata` (nama berkas, dependensi, atau route yang benar-benar ada). Nilai versi dikutip verbatim.

| Klaim keunggulan | Rujukan konkret pada Kode_Nyata | Sumber |
|---|---|---|
| Prop autentikasi & notifikasi tersedia global di semua halaman React tanpa fetch ulang | `auth.user` (`id`, `name`, `email`, `role`, `photo`, `email_verified_at`) dan `flash` (`success`, `error`, `info`, `warning`) dibagikan oleh `share()` | `app/Http/Middleware/HandleInertiaRequests.php` |
| React me-render ke root view tunggal melalui Inertia | `protected $rootView = 'app';` | `app/Http/Middleware/HandleInertiaRequests.php` |
| Adapter Inertia sisi server sudah terpasang | `inertiajs/inertia-laravel ^3.1` | `composer.json` (`require`) |
| Adapter React sisi klien sudah terpasang | `@inertiajs/react ^3.3.0`, `react ^19.2.6`, `react-dom ^19.2.6` | `package.json` (`dependencies`) |
| Build & HMR React siap pakai | `@vitejs/plugin-react ^6.0.2` | `package.json` (`dependencies`) |
| Komponen UI aksesibel + ikon untuk komponen reusable | `@headlessui/react ^2.2.10`, `lucide-react ^1.17.0` | `package.json` (`dependencies`) |
| UI per peran dari satu sumber data | enum peran `admin`, `instructor`, dan default `user` (Student) | `app/Http/Middleware/RoleMiddleware.php` |
| Navigasi SPA di atas server-side routing yang ada | route bernama `home`, `course.detail`, `cart.index`, `checkout`, `payment.success`, `payment.failed` | `routes/web.php` |

> Catatan terminologi (selaras `RoleMiddleware.php` & `GLOSSARY.md`): nilai enum peran adalah `user` (Student), `instructor`, dan `admin`.

---

## 4. Trade-off / Konsekuensi Negatif dan Mitigasinya

Adopsi React + Inertia membawa konsekuensi yang perlu dikelola. Berikut trade-off utama beserta tindakan mitigasinya.

### 4.1 Kurva belajar React bagi tim

**Konsekuensi:** Tim yang terbiasa dengan Blade + Alpine.js perlu mempelajari paradigma React (komponen, props, state, hooks) serta model kunjungan Inertia. Hal ini dapat memperlambat produktivitas di awal dan berisiko menghasilkan pola yang tidak konsisten.

**Mitigasi:**
- Migrasi bertahap per fase (sesuai Master Plan) agar tim belajar sambil mengerjakan halaman bervolume rendah lebih dulu (mis. halaman publik) sebelum panel kompleks.
- Tetapkan komponen dasar bersama (mis. `CourseCard`, `AdminSidebar`, `EmptyState`) dan layout per konteks sebagai pola acuan, memanfaatkan `@headlessui/react ^2.2.10` agar tim tidak menulis logika interaksi dari nol.
- Sediakan panduan pengembangan React+Inertia pada dokumentasi (`SETUP_GUIDE.md`, `UI_UX_GUIDELINES.md`) sebagai rujukan standar.

### 4.2 Ukuran bundel JavaScript & biaya hidrasi

**Konsekuensi:** Berbeda dengan Blade yang ringan di sisi klien, React mengirim bundel JavaScript dan melakukan hidrasi di browser. Tanpa pengelolaan, ukuran bundel dapat membengkak dan memengaruhi waktu muat awal, terutama pada perangkat mobile (beberapa layar Stitch dirancang khusus untuk mobile).

**Mitigasi:**
- Manfaatkan code-splitting per halaman yang difasilitasi resolusi halaman Inertia dari `resources/js/Pages` dan build Vite (`@vitejs/plugin-react ^6.0.2`, `vite ^8.0.0`).
- Pilih ikon secara selektif dari `lucide-react ^1.17.0` (impor per-ikon) alih-alih mengimpor seluruh paket.
- Pantau ukuran bundel sebagai bagian exit criteria fase migrasi dan optimalkan aset gambar redesign.

### 4.3 SEO & rendering awal pada halaman publik

**Konsekuensi:** Halaman yang dirender di sisi klien dapat kurang optimal untuk SEO dan first paint dibanding SSR Blade murni, padahal halaman publik BelajarKUY (landing, katalog `home`, `course.detail`) penting untuk ditemukan mesin pencari.

**Mitigasi:**
- Pertahankan root view `app` (`rootView = 'app'`) yang memungkinkan penambahan Server-Side Rendering (SSR) Inertia bila diperlukan tanpa mengubah controller.
- Sediakan meta tag dan judul halaman dari sisi server melalui props Inertia untuk halaman publik prioritas.
- Perlakukan SSR/SEO sebagai item evaluasi terukur pada fase migrasi halaman publik, bukan asumsi otomatis.

---

## 5. Ringkasan

React + Inertia memberi BelajarKUY pengalaman gaya SPA yang konsisten dan komponen yang dapat digunakan ulang, sambil mempertahankan server-side routing dan controller Laravel yang sudah ada — fondasinya pun sudah terpasang di kode (`inertiajs/inertia-laravel ^3.1`, `@inertiajs/react ^3.3.0`, `react ^19.2.6`, serta prop bersama `auth.user`/`flash` pada `HandleInertiaRequests.php`). Trade-off utama (kurva belajar, ukuran bundel, dan SEO/SSR) dapat dikelola melalui migrasi bertahap, komponen bersama, code-splitting, dan opsi SSR Inertia. Dengan demikian, adopsi React + Inertia memiliki justifikasi yang terdokumentasi dan selaras dengan redesign Google Stitch.
