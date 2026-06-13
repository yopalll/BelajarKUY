# 02 — Arsitektur Sistem

## 2.1 Gaya Arsitektur

BelajarKUY menggunakan arsitektur **monolitik modern berbasis Laravel** dengan frontend **React via Inertia**. Pendekatan ini menggabungkan keunggulan dua dunia: keteraturan dan keamanan framework server-side Laravel, serta pengalaman navigasi mulus ala single page application di sisi klien.

Inertia menjadi jembatan antara server dan klien. Controller Laravel tidak mengembalikan HTML mentah maupun respons API terpisah, melainkan menyerahkan nama component halaman React beserta data (props). Dengan demikian tidak diperlukan API layer tersendiri, sementara routing, otorisasi, dan validasi tetap di server.

```
Request Pengguna
        |
        v
  Route (routes/web.php)
        |
        v
  Middleware (autentikasi, peran, verifikasi)
        |
        v
  Controller  ── memanggil ──>  Model (Eloquent ORM)  <──>  Database
        |
        v
  Inertia::render( Component, Props )
        |
        v
  React Page Component  ──>  Tampilan di Browser
```

## 2.2 Tech Stack

| Layer | Teknologi | Peran |
| --- | --- | --- |
| Server framework | Laravel (PHP) | Routing, controller, ORM, otorisasi, queue, email |
| Frontend | React via Inertia | Dynamic page component tanpa API layer terpisah |
| Styling | Tailwind CSS | Utility-based design system |
| Build tool | Vite | Kompilasi dan serving asset frontend |
| Database | MySQL (production), SQLite (development) | Penyimpanan data relasional |
| Payment gateway | Midtrans Snap | Pemrosesan pembayaran pada environment sandbox |
| Cloud storage | Google Cloud Storage dan Cloudinary | File video dan gambar |
| Image processing | Intervention Image | Resize dan optimasi gambar |
| Search engine | Meilisearch via Laravel Scout | Pencarian katalog yang responsif |
| Real-time | Laravel Reverb | Update dan notifikasi langsung |
| Authentication | Laravel Breeze dan Socialite | Login via email maupun akun Google |
| Transactional email | Resend | Pengiriman email verifikasi, pembelian, dan bantuan |
| Client-side routing | Ziggy | Penggunaan named route Laravel di dalam React |

## 2.3 Pola Berbasis Peran

Aplikasi menggunakan satu tabel pengguna dengan kolom peran yang membedakan tiga jenis pengguna: `user` (siswa), `instructor`, dan `admin`. Pembatasan akses antar area dilakukan melalui middleware peran. Setiap area memiliki prefix route tersendiri, yaitu area publik, area siswa, area instruktur, dan area administrator.

## 2.4 Struktur Kode

Struktur direktori mengikuti konvensi Laravel dengan penambahan React component pada direktori resources.

```
app/
  Http/
    Controllers/        Controller, dikelompokkan per area
      Admin/            Panel administrator
      Auth/             Autentikasi dan verifikasi
      Backend/          Panel instruktur dan siswa
      Frontend/         Halaman publik dan transaksi
    Middleware/         Request filter (peran, kelayakan membeli)
    Requests/           Aturan validasi terstruktur (Form Request)
  Models/               Eloquent model yang memetakan tabel database
  Mail/                 Kelas email transaksional
  Notifications/        Kelas notifikasi pengguna
  Services/             Domain service (cloud video storage, kode sekali pakai)

database/
  migrations/           Definisi skema database
  seeders/              Data awal
  factories/            Data contoh (factory)

resources/
  js/
    Pages/              React page component per area
    Components/         Reusable UI component
    Layouts/            Layout halaman
    i18n/               File terjemahan antarmuka
  views/                Blade template pendukung dan email template

routes/
  web.php               Definisi seluruh route aplikasi

public/                 Asset publik dan entry point
config/                 File konfigurasi, termasuk integrasi layanan cloud
lang/                   File terjemahan server-side
docker/                 File pendukung deployment berbasis container
```

## 2.5 Service Layer

Beberapa kebutuhan lintas fitur dipisahkan ke dalam kelas service agar controller tetap ramping dan logika mudah diuji:

- **Video storage service** menangani upload file video ke cloud storage serta deteksi durasi video secara otomatis dari metadata file.
- **OTP service** membangkitkan dan memverifikasi kode untuk verifikasi email pengguna.

## 2.6 Integrasi Layanan Eksternal

Seluruh kredensial layanan eksternal disimpan pada file `.env` dan tidak pernah ditulis langsung di dalam kode maupun database. Integrasi mencakup payment gateway, cloud storage media, layanan email, dan search engine. Pendekatan ini menjaga keamanan kredensial sekaligus memudahkan pergantian konfigurasi antar environment.
