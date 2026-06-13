<div align="center">

<img src="public/images/logo-b.png" alt="BelajarKUY" height="96" />
<br />
<img src="public/images/logo-text.png" alt="BelajarKUY" height="56" />

<h1>BelajarKUY</h1>

<p><b>A Modern Online Course Marketplace &nbsp;|&nbsp; Marketplace Kursus Daring Modern</b></p>
<p><i>Built with Laravel and React via Inertia &nbsp;|&nbsp; Dibangun dengan Laravel dan React melalui Inertia</i></p>

</div>

---

## About the Project | Tentang Proyek

**[EN]**
BelajarKUY is an online course marketplace inspired by platforms such as Udemy, tailored for the Indonesian audience. Developed as a university final project, it brings together three user roles, namely Student, Instructor, and Administrator, within a single learning ecosystem. The application provides a complete commerce flow from catalog browsing through cart, checkout, payment, and automatic class enrollment, an interactive course player with progress tracking and certificate issuance, and a comprehensive administration panel for content moderation and platform management.

**[ID]**
BelajarKUY adalah marketplace kursus daring bergaya Udemy yang ditujukan untuk pengguna Indonesia. Dikembangkan sebagai Tugas Besar perkuliahan, aplikasi ini menyatukan tiga peran pengguna, yaitu Siswa, Instruktur, dan Administrator, dalam satu ekosistem belajar. Aplikasi menyediakan alur belanja lengkap mulai dari penjelajahan katalog, keranjang, proses bayar, hingga pendaftaran kelas otomatis, pemutar kursus interaktif dengan pelacakan progres dan penerbitan sertifikat, serta panel administrasi menyeluruh untuk moderasi konten dan pengelolaan platform.

---

## Architecture | Arsitektur

**[EN]**
The application follows a modern monolithic architecture built on Laravel, with a React interface layer delivered through Inertia. This approach combines the structure and security of a server-side framework with the smooth navigation of a single page application, without maintaining a separate API layer. Routing, authorization, and validation remain on the server, while pages are rendered as React components.

**[ID]**
Aplikasi menggunakan arsitektur monolitik modern berbasis Laravel dengan lapisan antarmuka React melalui Inertia. Pendekatan ini memadukan keteraturan dan keamanan kerangka kerja sisi server dengan navigasi mulus ala aplikasi satu halaman, tanpa memelihara lapisan API terpisah. Routing, otorisasi, dan validasi tetap berada di sisi server, sementara halaman dirender sebagai komponen React.

---

## Key Features | Fitur Utama

**[EN]**
- Multi-role authentication through email and Google, with one-time code email verification.
- Course catalog, detailed course pages, and responsive search powered by a dedicated search engine.
- Shopping cart, wishlist, and an instructor coupon system.
- Secure payment through the Midtrans gateway with automatic class enrollment upon success.
- Interactive course player with lecture completion tracking and completion certificates.
- Instructor panel for managing courses, sections, lectures, learning goals, and coupons.
- Administrator panel for category management, landing page content, and moderation of courses and reviews.
- Reviews and ratings, a conversation-based help desk, content reporting, and notifications.

**[ID]**
- Autentikasi multi-peran melalui surel dan akun Google, dengan verifikasi surel menggunakan kode sekali pakai.
- Katalog kursus, halaman detail kursus, dan pencarian responsif yang ditenagai mesin pencari khusus.
- Keranjang belanja, daftar keinginan, dan sistem kupon diskon instruktur.
- Pembayaran aman melalui gerbang pembayaran Midtrans dengan pendaftaran kelas otomatis setelah berhasil.
- Pemutar kursus interaktif dengan pelacakan penyelesaian materi dan sertifikat penyelesaian.
- Panel instruktur untuk mengelola kursus, bagian, materi, sasaran belajar, dan kupon.
- Panel administrator untuk manajemen kategori, konten halaman depan, serta moderasi kursus dan ulasan.
- Ulasan dan penilaian, layanan bantuan berbentuk percakapan, pelaporan konten, dan notifikasi.

---

## Tech Stack | Tumpukan Teknologi

| Layer / Lapisan | Technology / Teknologi |
| --- | --- |
| Server framework / Kerangka kerja server | Laravel (PHP) |
| Interface layer / Lapisan antarmuka | React via Inertia |
| Styling / Penataan gaya | Tailwind CSS |
| Build tool / Alat bangun | Vite |
| Database / Basis data | MySQL (production), SQLite (development) |
| Payment gateway / Gerbang pembayaran | Midtrans Snap |
| Media storage / Penyimpanan media | Google Cloud Storage, Cloudinary |
| Search engine / Mesin pencari | Meilisearch via Laravel Scout |
| Real-time / Waktu nyata | Laravel Reverb |
| Authentication / Autentikasi | Laravel Breeze and Socialite |
| Transactional email / Surel transaksional | Resend |
| Deployment / Penerapan | Docker |

---

## Project Structure | Struktur Proyek

```
app/              Application code: controllers, models, middleware, services, mail
database/         Migrations, seeders, and factories
resources/js/     React pages, components, layouts, and translations
routes/           Application routes
public/           Public assets and entry point
config/           Configuration, including external service integrations
docker/           Container deployment support files
docs_belajarkuy/  Academic and technical documentation
```

---

## Installation | Instalasi

**[EN]** Ensure PHP with Composer and Node.js with npm are available.
**[ID]** Pastikan PHP beserta Composer dan Node.js beserta npm telah tersedia.

```bash
# 1. Clone the repository | Klona repositori
git clone <repository-url>
cd BelajarKUY

# 2. Install dependencies | Pasang dependensi
composer install
npm install

# 3. Prepare environment | Siapkan berkas lingkungan
cp .env.example .env
php artisan key:generate

# 4. Run migrations and seeders | Jalankan migrasi dan data awal
php artisan migrate --seed

# 5. Link storage and build assets | Tautkan storage dan bangun aset
php artisan storage:link
npm run build
```

---

## Running the Application | Menjalankan Aplikasi

**[EN]** For development, run the following processes in separate terminals.
**[ID]** Untuk pengembangan, jalankan proses berikut pada terminal terpisah.

```bash
# Terminal 1: frontend dev server | server aset antarmuka
npm run dev

# Terminal 2: application server | server aplikasi
php artisan serve

# Terminal 3: search engine | mesin pencari
meilisearch

# Terminal 4: real-time server | server waktu nyata
php artisan reverb:start
```

**[EN]** A container-based deployment is also provided. See the documentation for details.
**[ID]** Tersedia pula penerapan berbasis kontainer. Lihat dokumentasi untuk perinciannya.

---

## Documentation | Dokumentasi

**[EN]** Complete technical and academic documentation is available in the [docs_belajarkuy](docs_belajarkuy/) directory.
**[ID]** Dokumentasi teknis dan akademik lengkap tersedia pada direktori [docs_belajarkuy](docs_belajarkuy/).

| Topic / Topik | Document / Dokumen |
| --- | --- |
| Introduction / Pendahuluan | [01-pendahuluan.md](docs_belajarkuy/01-pendahuluan.md) |
| System Architecture / Arsitektur Sistem | [02-arsitektur-sistem.md](docs_belajarkuy/02-arsitektur-sistem.md) |
| Database / Basis Data | [03-basis-data.md](docs_belajarkuy/03-basis-data.md) |
| Features / Fitur | [04-fitur.md](docs_belajarkuy/04-fitur.md) |
| System Flows / Alur Sistem | [05-alur-sistem.md](docs_belajarkuy/05-alur-sistem.md) |
| Installation and Deployment / Instalasi dan Penerapan | [06-instalasi-deployment.md](docs_belajarkuy/06-instalasi-deployment.md) |
| Architecture Decisions / Keputusan Arsitektur | [07-keputusan-arsitektur.md](docs_belajarkuy/07-keputusan-arsitektur.md) |
| Testing and Security / Pengujian dan Keamanan | [08-pengujian-keamanan.md](docs_belajarkuy/08-pengujian-keamanan.md) |
| Development Team / Tim Pengembang | [09-tim-pengembang.md](docs_belajarkuy/09-tim-pengembang.md) |

---

## Development Team | Tim Pengembang

| Name / Nama | Role / Peran | GitHub |
| --- | --- | --- |
| Yosua Valentino Gulo | Project Manager and Full-Stack Developer / Manajer Proyek dan Pengembang Penuh | [yopalll](https://github.com/yopalll) |
| Albariqi Deanda Tarigan | Backend Developer, Authentication and Player / Pengembang Sisi Server, Autentikasi dan Pemutar | [albariqitarigan](https://github.com/albariqitarigan) |
| Ray Nathan Geereno Saragih | Backend Developer, Commerce / Pengembang Sisi Server, Perdagangan | [rayysrgh](https://github.com/rayysrgh) |
| Vascha Uli Lumbantoruan | Frontend Developer, User Experience / Pengembang Antarmuka, Pengalaman Pengguna | [vaschau-rgb](https://github.com/vaschau-rgb) |
| Quinsha Ilmi Azzahra | Frontend Developer, Administration Panel / Pengembang Antarmuka, Panel Administrator | [uqxinn](https://github.com/uqxinn) |
| Viter Moldy | Database Consultant / Konsultan Basis Data | [vitermoldy](https://github.com/vitermoldy) |

---

## License | Lisensi

**[EN]** This project was developed for academic purposes. The underlying Laravel framework is open-source software licensed under the MIT license.
**[ID]** Proyek ini dikembangkan untuk keperluan akademik. Kerangka kerja Laravel yang menjadi basisnya merupakan perangkat lunak sumber terbuka yang dilisensikan di bawah lisensi MIT.
