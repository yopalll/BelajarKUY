# 06 — Instalasi dan Penerapan

## 6.1 Prasyarat

Lingkungan pengembangan memerlukan perangkat berikut:

- PHP beserta Composer sebagai pengelola paket.
- Node.js beserta npm untuk membangun aset antarmuka.
- Basis data MySQL untuk produksi, atau SQLite untuk pengembangan ringan.
- Mesin pencari Meilisearch bila fitur pencarian ingin dijalankan secara penuh.

## 6.2 Instalasi Lokal

```bash
# 1. Klona repositori dan masuk ke direktori proyek
git clone <url-repositori>
cd BelajarKUY

# 2. Pasang dependensi sisi server dan sisi antarmuka
composer install
npm install

# 3. Siapkan berkas lingkungan dan bangkitkan kunci aplikasi
cp .env.example .env
php artisan key:generate

# 4. Jalankan migrasi beserta data awal
php artisan migrate --seed

# 5. Tautkan penyimpanan publik dan bangun aset
php artisan storage:link
npm run build
```

## 6.3 Konfigurasi Lingkungan

Berkas `.env` mengelompokkan konfigurasi sebagai berikut. Seluruh kredensial bersifat rahasia dan tidak boleh dimasukkan ke dalam repositori.

| Kelompok | Keterangan |
| --- | --- |
| Aplikasi | Nama, lingkungan, kunci aplikasi, URL, zona waktu, dan locale berbahasa Indonesia. |
| Basis data | Koneksi, host, nama basis data, serta kredensial. |
| Surel | Konfigurasi pengiriman surel transaksional melalui penyedia surel. |
| Gerbang pembayaran | Kunci server dan klien Midtrans serta penanda lingkungan uji. |
| Autentikasi Google | Identitas klien, rahasia klien, dan URL pengalihan. |
| Penyimpanan media | Konfigurasi penyimpanan awan untuk gambar dan video. |
| Mesin pencari | Host dan kunci Meilisearch. |
| Komunikasi waktu nyata | Konfigurasi Laravel Reverb. |
| Antrian dan singgahan | Penggunaan Redis untuk antrian, sesi, dan singgahan. |

## 6.4 Menjalankan Saat Pengembangan

Dianjurkan menjalankan proses berikut pada jendela terminal terpisah.

```bash
# Terminal 1: server pengembangan aset antarmuka
npm run dev

# Terminal 2: server aplikasi
php artisan serve

# Terminal 3: mesin pencari
meilisearch

# Terminal 4: server komunikasi waktu nyata
php artisan reverb:start
```

## 6.5 Akun Bawaan

Pengisian data awal menyediakan akun bawaan untuk tiap peran guna keperluan demonstrasi. Kata sandi seluruh akun bawaan bernilai sama dan tercantum pada berkas pengisi data. Rujuk direktori `database/seeders` untuk perincian akun yang dibuat.

## 6.6 Penerapan Berbasis Docker

Proyek menyertakan berkas penerapan berbasis kontainer untuk lingkungan produksi. Tumpukan layanan terdiri atas beberapa kontainer yang saling melengkapi:

| Layanan | Peran |
| --- | --- |
| Web | Penyaji aset publik sekaligus penerus permintaan ke layanan aplikasi dan komunikasi waktu nyata. |
| Aplikasi | Pemroses permintaan; menjalankan migrasi dan pemanasan singgahan saat dinyalakan. |
| Antrian | Pemroses pekerjaan latar belakang. |
| Penjadwal | Pelaksana tugas terjadwal. |
| Komunikasi waktu nyata | Server Laravel Reverb. |
| Basis data | Layanan MySQL. |
| Singgahan | Layanan Redis untuk singgahan, sesi, antrian, dan penskalaan komunikasi waktu nyata. |
| Mesin pencari | Layanan Meilisearch. |

Langkah ringkas penerapan produksi:

```bash
# 1. Gunakan berkas lingkungan produksi sebagai .env aktif
cp .env.production .env

# 2. Letakkan kunci akun layanan penyimpanan awan pada lokasi yang ditunjuk berkas lingkungan
#    Kunci ini tidak pernah dimasukkan ke dalam image dan hanya dikaitkan saat berjalan.

# 3. Pastikan sertifikat keamanan transport untuk domain telah tersedia.

# 4. Bangun dan jalankan seluruh tumpukan layanan
docker compose up -d --build
```

Migrasi dijalankan secara otomatis ketika kontainer aplikasi dinyalakan. Pengisian data awal serta pembangunan indeks pencarian dapat dilakukan melalui perintah artisan di dalam kontainer aplikasi.

## 6.7 Daftar Periksa Sebelum Produksi

- Berkas lingkungan disetel ke mode produksi dengan mode awakutu (debug) dimatikan.
- Berkas pengecualian kontainer memastikan kredensial tidak ikut terbawa ke dalam image.
- Hanya porta layanan web yang terbuka ke internet; basis data, singgahan, dan mesin pencari tidak dipaparkan publik.
- Gerbang pembayaran masih pada lingkungan uji hingga benar-benar siap menerima pembayaran sesungguhnya.
- Seluruh kredensial yang pernah tersingkap dirotasi sebelum peluncuran.
