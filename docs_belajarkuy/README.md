# Dokumentasi BelajarKUY

Dokumentasi teknis dan akademik untuk platform pembelajaran daring **BelajarKUY** — sebuah marketplace kursus online bergaya Udemy yang dikembangkan sebagai Tugas Besar mata kuliah Pemrograman Web.

Dokumen ini ditujukan untuk **pembaca manusia**: dosen penguji, anggota tim, dan developer yang ingin memahami arsitektur, database, fitur, serta cara menjalankan dan men-deploy aplikasi.

## Daftar Isi

| No | Dokumen | Ringkasan |
| --- | --- | --- |
| 01 | [Pendahuluan](01-pendahuluan.md) | Latar belakang, rumusan masalah, tujuan, manfaat, dan ruang lingkup proyek. |
| 02 | [Arsitektur Sistem](02-arsitektur-sistem.md) | Gaya arsitektur, tech stack, dan struktur kode aplikasi. |
| 03 | [Basis Data](03-basis-data.md) | Rancangan skema, diagram relasi entitas, daftar tabel, dan aturan integritas. |
| 04 | [Fitur Aplikasi](04-fitur.md) | Rincian fungsi per peran pengguna: publik, siswa, instruktur, dan administrator. |
| 05 | [Alur Sistem](05-alur-sistem.md) | Alur kerja utama: autentikasi, pembelian hingga akses kelas, moderasi, dan help desk. |
| 06 | [Instalasi dan Penerapan](06-instalasi-deployment.md) | Prasyarat, instalasi lokal, konfigurasi environment, dan deployment berbasis Docker. |
| 07 | [Keputusan Arsitektur](07-keputusan-arsitektur.md) | Catatan keputusan rancangan beserta alasan dan konsekuensinya. |
| 08 | [Pengujian dan Keamanan](08-pengujian-keamanan.md) | Strategi pengujian dan prinsip keamanan yang diterapkan. |
| 09 | [Tim Pengembang](09-tim-pengembang.md) | Susunan tim dan pembagian tanggung jawab. |

## Ringkasan Singkat

BelajarKUY menghubungkan tiga peran pengguna dalam satu ekosistem belajar:

- **Siswa** menjelajahi katalog, membeli kursus, dan belajar melalui course player dengan pelacakan progres.
- **Instruktur** membuat dan mengelola kursus berstruktur (bagian dan materi), menetapkan harga serta diskon, dan memantau penjualan.
- **Administrator** mengelola katalog, kategori, konten halaman depan, serta memoderasi kursus dan ulasan.

Aplikasi dibangun di atas framework Laravel di server dan React via Inertia di frontend, dengan pembayaran via Midtrans, media di cloud storage, serta email transaksional dan notifikasi.

> Catatan: Dokumentasi ini menggambarkan keadaan fungsional aplikasi sebagaimana terealisasi di dalam kode. Untuk detail terdalam, rujukan utama tetaplah file sumber pada direktori `app/`, `database/`, dan `routes/`.
