<div align="center">
  <img src="public/logo.png" alt="BelajarKUY Logo" width="200" />
  <h1>BelajarKUY</h1>
  <p>
    <b>A Modern Online Course Marketplace | Platform Pembelajaran Daring Modern</b>
  </p>
  <p>
    <i>Built with Laravel & React.js | Dibangun menggunakan Laravel & React.js</i>
  </p>
</div>

<br />

## About the Project | Tentang Proyek

**[EN]**  
BelajarKUY is an online course marketplace web application inspired by platforms like Udemy, designed specifically for the Indonesian market. Developed as a major academic project, it features three distinct user roles (Student, Instructor, Admin), a comprehensive e-commerce flow (cart, checkout, Midtrans payment gateway, auto-enrollment), an interactive course player with progress tracking, and a robust administrative panel. 

The primary goal of this project is to build a highly functional online learning platform with minimal operational costs (leveraging free-tier services) while serving as a practical implementation of modern software engineering practices.

**[ID]**  
BelajarKUY adalah aplikasi web marketplace kursus daring (e-learning) bergaya Udemy yang ditujukan untuk pasar Indonesia. Dikembangkan sebagai proyek Tugas Besar perkuliahan, aplikasi ini menyediakan tiga peran pengguna (Siswa, Instruktur, Admin), alur belanja lengkap (keranjang, checkout, pembayaran Midtrans, hingga pendaftaran kelas otomatis), pemutar kursus interaktif dengan pelacakan progres, serta panel administrasi yang kuat.

Tujuan utama proyek ini adalah membangun platform pembelajaran daring yang fungsional dengan biaya operasional minimal (memanfaatkan layanan dengan tingkat gratis), sekaligus menjadi sarana pembelajaran praktik rekayasa perangkat lunak modern.

---

## Architecture | Arsitektur

**[EN]**  
The presentation layer is currently transitioning from Blade + Alpine.js to **React.js via Inertia.js**. During this migration phase, both layers coexist: migrated pages are rendered via Inertia, while the rest continue to use Blade. The backend layer (models, routes, controllers, database schema, and role middleware) remains fully intact and unchanged during this transition.

**[ID]**  
Lapisan presentasi aplikasi sedang dimigrasikan dari Blade + Alpine.js menjadi **React.js melalui Inertia.js**. Selama masa transisi, kedua lapisan berjalan berdampingan: halaman yang telah dimigrasikan dirender melalui Inertia, sedangkan sisanya masih menggunakan Blade. Lapisan backend (model, route, controller, skema basis data, dan middleware peran) dipertahankan tanpa perubahan selama masa transisi ini.

---

## Key Features | Fitur Utama

**[EN]**
- Multi-role Authentication (Student, Instructor, Admin) using Laravel Breeze and Google Socialite.
- Course Catalog, detailed course pages, and advanced search powered by Meilisearch (Laravel Scout).
- Shopping Cart, Wishlist, and an Instructor Coupon system.
- Secure Payments via Midtrans Snap (sandbox mode) with automated course enrollment upon success.
- Interactive Course Player featuring lecture completion tracking.
- Instructor Panel for comprehensive course, section, and lecture management.
- Administrator Panel for content moderation, category management, user oversight, and site configuration.
- Real-time Updates and email notifications powered by Laravel Reverb.

**[ID]**
- Autentikasi multi-peran (Siswa, Instruktur, Admin) dengan Laravel Breeze dan login Google (Socialite).
- Katalog kursus, halaman detail kursus, serta pencarian lanjutan dengan Meilisearch (Laravel Scout).
- Keranjang belanja, daftar keinginan (wishlist), dan sistem kupon diskon instruktur.
- Pembayaran aman melalui Midtrans Snap (sandbox) dengan pendaftaran kelas otomatis setelah transaksi berhasil.
- Pemutar kursus interaktif beserta pelacakan penyelesaian materi.
- Panel instruktur untuk pengelolaan kursus, bagian (section), dan materi (lecture) secara komprehensif.
- Panel administrasi untuk moderasi konten, pengelolaan kategori, pengawasan pengguna, serta pengaturan situs.
- Pembaruan waktu nyata (real-time) dan notifikasi surel melalui Laravel Reverb.

---

## Tech Stack | Teknologi yang Digunakan

<div align="center">

| Layer / Lapisan | Technology / Teknologi | Version / Versi |
| --- | --- | --- |
| Backend Framework | Laravel | `^13.7` |
| Programming Language | PHP | `^8.3` |
| Presentation Layer | React via Inertia.js | `react ^19.2.6`, `@inertiajs/react ^3.3.0` |
| Styling | Tailwind CSS | `tailwindcss ^3.1.0`, `@tailwindcss/vite ^4.0.0` |
| Build Tool | Vite | `^8.0.0` |
| Database | MySQL (Prod) / SQLite (Dev) | 8.x / 3.x |
| Payment Gateway | Midtrans Snap (Sandbox) | `midtrans/midtrans-php ^2.6` |
| Media Storage | Cloudinary | `cloudinary/cloudinary_php ^3.1` |
| Search Engine | Meilisearch + Laravel Scout | `^1.16` / `^11.1` |
| Real-time / WebSocket | Laravel Reverb | `^1.10` |
| Authentication | Laravel Breeze + Socialite | `^2.4` / `^5.27` |

</div>

---

## Installation & Configuration | Instalasi dan Konfigurasi

**[EN]**  
Ensure your environment meets the prerequisites: PHP 8.3+, Composer 2.x, Node.js 20+, and MySQL 8.x (or SQLite).

**[ID]**  
Pastikan lingkungan pengembangan Anda memenuhi prasyarat: PHP 8.3+, Composer 2.x, Node.js 20+, dan MySQL 8.x (atau SQLite).

```bash
# 1. Clone the repository | Klona repositori
git clone https://github.com/yopalll/BelajarKUY.git
cd BelajarKUY/BelajarKUY

# 2. Install dependencies | Pasang dependensi
composer install
npm install

# 3. Setup environment | Siapkan berkas environment
cp .env.example .env
php artisan key:generate

# 4. Run migrations and seeders | Jalankan migrasi dan seeder
php artisan migrate --seed

# 5. Link storage and build assets | Tautkan storage dan bangun aset
php artisan storage:link
npm run build
```

---

## Running the Application | Menjalankan Aplikasi

**[EN]**  
For development, it is recommended to run the following processes in separate terminal instances:

**[ID]**  
Untuk pengembangan, jalankan proses berikut pada terminal terpisah:

```bash
# Terminal 1: Vite Development Server
npm run dev

# Terminal 2: Laravel Application Server
php artisan serve

# Terminal 3: Meilisearch Engine
meilisearch --master-key="masterKey"

# Terminal 4: Laravel Reverb WebSocket Server
php artisan reverb:start
```

---

## Default Accounts | Akun Default

**[EN]** All default accounts use the password: `password`  
**[ID]** Semua akun default menggunakan kata sandi: `password`

<div align="center">

| Role / Peran | Email / Surel |
| --- | --- |
| Admin | `admin@belajarkuy.test` |
| Instructor | `ray@belajarkuy.test` |
| Student | `student@belajarkuy.test` |

</div>

---

## Database Schema | Skema Basis Data

**[EN]**  
BelajarKUY utilizes 15 primary tables designed to handle users, categories, courses, curriculum (sections and lectures), e-commerce (wishlists, carts, coupons, payments, orders), learning progress (enrollments, lecture completions), and feedback (reviews).

**[ID]**  
BelajarKUY menggunakan 15 tabel utama yang dirancang untuk menangani pengguna, kategori, kursus, kurikulum (bagian dan materi), e-commerce (daftar keinginan, keranjang, kupon, pembayaran, pesanan), kemajuan belajar (pendaftaran, penyelesaian materi), serta umpan balik (ulasan).

---

## Development Team | Tim Pengembang

<div align="center">

| Name / Nama | Role / Peran |
| --- | --- |
| **Yosua Valentino Gulo** | Project Manager & Architect |
| **Albariqi Deanda Tarigan** | Backend Developer (Auth & Curriculum) |
| **Ray Nathan Geereno Saragih** | Backend Developer (Commerce & Payment) |
| **Vascha Uli Lumbantoruan** | Frontend Developer (Public & Student) |
| **Quinsha Ilmi Azzahra** | UI/UX Developer (Administration Panel) |

</div>

**[EN]** Design assets (Google Stitch) were crafted by Vascha Uli Lumbantoruan and Quinsha Ilmi Azzahra.  
**[ID]** Aset desain (Google Stitch) dikerjakan oleh Vascha Uli Lumbantoruan dan Quinsha Ilmi Azzahra.

---

## License | Lisensi

**[EN]** This project was developed for academic purposes. The underlying Laravel framework is open-sourced software licensed under the MIT license.  
**[ID]** Proyek ini dikembangkan untuk keperluan akademik. Kerangka kerja Laravel yang menjadi basis aplikasi dirilis di bawah lisensi MIT.
