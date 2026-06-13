# 06 — Instalasi dan Penerapan

## 6.1 Prasyarat

Environment development memerlukan perangkat berikut:

- PHP beserta Composer sebagai package manager.
- Node.js beserta npm untuk build asset frontend.
- Database MySQL untuk production, atau SQLite untuk development ringan.
- Meilisearch bila fitur pencarian ingin dijalankan secara penuh.

## 6.2 Instalasi Lokal

```bash
# 1. Clone repositori dan masuk ke direktori proyek
git clone <url-repositori>
cd BelajarKUY

# 2. Install dependensi server dan frontend
composer install
npm install

# 3. Siapkan file .env dan generate application key
cp .env.example .env
php artisan key:generate

# 4. Jalankan migrasi beserta data awal
php artisan migrate --seed

# 5. Link public storage dan build asset
php artisan storage:link
npm run build
```

## 6.3 Konfigurasi Environment

File `.env` mengelompokkan konfigurasi sebagai berikut. Seluruh kredensial bersifat rahasia dan tidak boleh dimasukkan ke dalam repositori.

| Kelompok | Keterangan |
| --- | --- |
| Aplikasi | Nama, environment, application key, URL, timezone, dan locale bahasa Indonesia. |
| Database | Koneksi, host, nama database, serta kredensial. |
| Email | Konfigurasi pengiriman email transaksional via provider email. |
| Payment gateway | Server key dan client key Midtrans serta penanda environment sandbox. |
| Google OAuth | Client ID, client secret, dan redirect URL. |
| Cloud storage | Konfigurasi penyimpanan cloud untuk gambar dan video. |
| Search engine | Host dan API key Meilisearch. |
| Real-time | Konfigurasi Laravel Reverb. |
| Queue dan cache | Penggunaan Redis untuk queue, session, dan cache. |

## 6.4 Menjalankan Saat Development

Jalankan proses berikut pada terminal terpisah.

```bash
# Terminal 1: frontend dev server
npm run dev

# Terminal 2: application server
php artisan serve

# Terminal 3: search engine
meilisearch

# Terminal 4: real-time server
php artisan reverb:start
```

## 6.5 Akun Bawaan

Seeder menyediakan akun bawaan untuk tiap peran guna keperluan demo. Password seluruh akun bawaan bernilai sama dan tercantum pada file seeder. Rujuk direktori `database/seeders` untuk detail akun yang dibuat.

## 6.6 Deployment Berbasis Docker

Proyek menyertakan file deployment berbasis container untuk environment production. Services stack terdiri atas beberapa container yang saling melengkapi:

| Service | Peran |
| --- | --- |
| Web | Menyajikan asset publik sekaligus meneruskan request ke service aplikasi dan real-time. |
| App | Memproses request; menjalankan migrasi dan cache warming saat startup. |
| Queue | Memproses background job. |
| Scheduler | Menjalankan scheduled task. |
| Real-time | Server Laravel Reverb. |
| Database | Service MySQL. |
| Cache | Service Redis untuk cache, session, queue, dan scaling real-time. |
| Search | Service Meilisearch. |

Langkah ringkas deployment production:

```bash
# 1. Gunakan file environment production sebagai .env aktif
cp .env.production .env

# 2. Letakkan service account key cloud storage pada lokasi yang ditunjuk file .env
#    Key ini tidak pernah dimasukkan ke dalam image dan hanya di-mount saat runtime.

# 3. Pastikan SSL certificate untuk domain telah tersedia.

# 4. Build dan jalankan seluruh services stack
docker compose up -d --build
```

Migrasi dijalankan secara otomatis ketika container aplikasi startup. Seeder serta build search index dapat dilakukan via perintah artisan di dalam container aplikasi.

## 6.7 Checklist Sebelum Production

- File `.env` disetel ke mode production dengan debug mode dimatikan.
- `.dockerignore` memastikan kredensial tidak ikut terbawa ke dalam image.
- Hanya port web service yang terbuka ke internet; database, cache, dan search engine tidak diekspos ke publik.
- Payment gateway masih pada environment sandbox hingga benar-benar siap menerima pembayaran sesungguhnya.
- Seluruh kredensial yang pernah tersingkap dirotasi sebelum go-live.
