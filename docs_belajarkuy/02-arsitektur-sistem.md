# 02 — Arsitektur Sistem

## 2.1 Gaya Arsitektur

BelajarKUY menggunakan arsitektur **monolitik modern berbasis Laravel** dengan lapisan antarmuka **React melalui Inertia**. Pendekatan ini menggabungkan keunggulan dua dunia: keteraturan dan keamanan kerangka kerja server-side Laravel, serta pengalaman navigasi mulus ala aplikasi satu halaman (single page application) pada sisi klien.

Inertia menjadi jembatan antara server dan klien. Controller Laravel tidak mengembalikan HTML mentah maupun respons API terpisah, melainkan menyerahkan nama komponen halaman React beserta data (props). Dengan demikian tidak diperlukan lapisan API tersendiri, sementara routing, otorisasi, dan validasi tetap berada di sisi server.

```
Permintaan Pengguna
        |
        v
  Route (routes/web.php)
        |
        v
  Middleware (autentikasi, peran, verifikasi)
        |
        v
  Controller  ── memanggil ──>  Model (Eloquent ORM)  <──>  Basis Data
        |
        v
  Inertia::render( Komponen, Props )
        |
        v
  Komponen Halaman React  ──>  Antarmuka di Peramban
```

## 2.2 Tumpukan Teknologi

| Lapisan | Teknologi | Peran |
| --- | --- | --- |
| Kerangka kerja server | Laravel (PHP) | Routing, controller, ORM, otorisasi, antrian, surel |
| Lapisan antarmuka | React melalui Inertia | Komponen halaman dinamis tanpa lapisan API terpisah |
| Penataan gaya | Tailwind CSS | Sistem desain berbasis utilitas |
| Alat bangun | Vite | Kompilasi dan penyajian aset frontend |
| Basis data | MySQL (produksi), SQLite (pengembangan) | Penyimpanan data relasional |
| Gerbang pembayaran | Midtrans Snap | Pemrosesan pembayaran pada lingkungan uji |
| Penyimpanan media | Google Cloud Storage dan Cloudinary | Berkas video serta gambar |
| Pengolahan gambar | Intervention Image | Pengubahan ukuran dan optimasi gambar |
| Mesin pencari | Meilisearch melalui Laravel Scout | Pencarian katalog yang responsif |
| Komunikasi waktu nyata | Laravel Reverb | Pembaruan dan notifikasi langsung |
| Autentikasi | Laravel Breeze dan Socialite | Masuk melalui surel maupun akun Google |
| Surel transaksional | Resend | Pengiriman surel verifikasi, pembelian, dan bantuan |
| Pembangkit rute klien | Ziggy | Pemakaian nama rute Laravel di dalam React |

## 2.3 Pola Berbasis Peran

Aplikasi menggunakan satu tabel pengguna dengan kolom peran yang membedakan tiga jenis pengguna: `user` (siswa), `instructor` (instruktur), dan `admin` (administrator). Pembatasan akses antar area dilakukan melalui middleware peran. Setiap area memiliki awalan rute tersendiri, yaitu area publik, area siswa, area instruktur, dan area administrator.

## 2.4 Struktur Kode

Struktur direktori mengikuti konvensi Laravel dengan penambahan komponen React pada direktori sumber daya.

```
app/
  Http/
    Controllers/        Pengendali permintaan, dikelompokkan per area
      Admin/            Pengendali panel administrator
      Auth/             Pengendali autentikasi dan verifikasi
      Backend/          Pengendali panel instruktur dan siswa
      Frontend/         Pengendali halaman publik dan transaksi
    Middleware/         Penyaring permintaan (peran, kelayakan membeli)
    Requests/           Aturan validasi terstruktur (Form Request)
  Models/               Model Eloquent yang memetakan tabel basis data
  Mail/                 Kelas surel transaksional
  Notifications/        Kelas notifikasi pengguna
  Services/             Layanan domain (penyimpanan video, kode sekali pakai)

database/
  migrations/           Definisi skema basis data
  seeders/              Pengisi data awal
  factories/            Pembangkit data contoh

resources/
  js/
    Pages/              Komponen halaman React per area
    Components/         Komponen antarmuka yang dapat dipakai ulang
    Layouts/            Kerangka tata letak halaman
    i18n/               Berkas alih bahasa antarmuka
  views/                Templat Blade penunjang dan templat surel

routes/
  web.php               Definisi seluruh rute aplikasi

public/                 Aset publik dan titik masuk aplikasi
config/                 Berkas konfigurasi, termasuk integrasi layanan awan
lang/                   Berkas terjemahan sisi server
docker/                 Berkas pendukung penerapan berbasis kontainer
```

## 2.5 Lapisan Layanan

Beberapa kebutuhan lintas fitur dipisahkan ke dalam kelas layanan agar pengendali tetap ramping dan logika mudah diuji ulang:

- **Layanan penyimpanan video** menangani unggahan berkas video ke penyimpanan awan serta pendeteksian durasi video secara otomatis dari metadata berkas.
- **Layanan kode sekali pakai** membangkitkan dan memverifikasi kode untuk verifikasi surel pengguna.

## 2.6 Komunikasi dengan Layanan Eksternal

Seluruh kredensial layanan eksternal disimpan pada berkas lingkungan dan tidak pernah dituliskan langsung di dalam kode maupun basis data. Integrasi mencakup gerbang pembayaran, penyimpanan media awan, layanan surel, dan mesin pencari. Pendekatan ini menjaga keamanan kredensial sekaligus memudahkan pergantian konfigurasi antar lingkungan.
