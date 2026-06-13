# 07 — Keputusan Arsitektur

Bagian ini merangkum keputusan rancangan penting beserta alasan dan konsekuensinya. Catatan keputusan membantu pembaca memahami bukan hanya bagaimana sistem dibangun, tetapi juga mengapa pilihan tertentu diambil.

## 7.1 Frontend Menggunakan React via Inertia

**Keputusan.** Antarmuka dibangun sebagai React component yang dirender via Inertia, bukan sebagai template server murni maupun SPA dengan API terpisah.

**Alasan.** Inertia memberikan pengalaman navigasi mulus ala SPA tanpa memaksa tim membangun dan memelihara API layer tersendiri. Routing, otorisasi, dan validasi tetap di server sehingga business logic terpusat dan aman.

**Konsekuensi.** Developer frontend dan backend bekerja pada satu codebase yang erat. Panel administrator pun dibangun sebagai React page, bukan menggunakan library admin panel pihak ketiga.

## 7.2 Payment Gateway Midtrans pada Environment Sandbox

**Keputusan.** Pembayaran menggunakan Midtrans Snap dan dijalankan pada environment sandbox.

**Alasan.** Konteks proyek bersifat akademik sehingga tidak melibatkan transaksi uang nyata. Environment sandbox memungkinkan seluruh alur pembayaran diperagakan secara utuh tanpa risiko finansial.

**Konsekuensi.** Flag environment disimpan pada konfigurasi dan perlu diubah secara sadar bila aplikasi hendak menerima pembayaran sesungguhnya.

## 7.3 Enrollment sebagai Acuan Hak Akses

**Keputusan.** Hak akses sebuah kursus ditentukan oleh keberadaan baris enrollment, bukan dengan menelusuri pesanan dan pembayaran.

**Alasan.** Pemisahan ini menyederhanakan pengecekan akses menjadi satu query ringkas dan memisahkan urusan transaksi dari urusan hak belajar.

**Konsekuensi.** Enrollment dibuat dalam satu database transaction atomik bersama pesanan ketika pembayaran berhasil, sehingga konsistensi data terjaga.

## 7.4 Denormalisasi Instruktur pada Pesanan

**Keputusan.** Identitas instruktur disalin ke dalam tabel pesanan, meskipun sebenarnya dapat diturunkan dari kursus.

**Alasan.** Laporan pendapatan instruktur sering memerlukan data ini. Menyalinnya menghindari JOIN tabel berulang yang mahal saat pelaporan.

**Konsekuensi.** Ini adalah denormalisasi yang disengaja dan terdokumentasi, bukan kelalaian normalisasi.

## 7.5 Price Snapshot pada Transaksi

**Keputusan.** Pesanan menyimpan harga asli, potongan, dan harga akhir pada saat transaksi terjadi.

**Alasan.** Harga kursus dapat berubah seiring waktu. Catatan transaksi harus mencerminkan nilai yang berlaku ketika pembelian dilakukan.

**Konsekuensi.** Cart justru tidak menyimpan harga, karena harga di cart selalu dihitung ulang dari kursus agar tidak menjadi usang.

## 7.6 Instruktur Aktif Secara Langsung

**Keputusan.** Akun instruktur aktif segera setelah registrasi tanpa proses persetujuan.

**Alasan.** Yang membutuhkan moderasi adalah kualitas kursus, bukan keberadaan instruktur. Memfokuskan moderasi pada kursus menyederhanakan alur sekaligus tetap menjaga mutu konten.

**Konsekuensi.** Mekanisme moderasi diterapkan pada kursus melalui status pending review, bukan pada akun instruktur.

## 7.7 Kredensial pada File .env

**Keputusan.** Seluruh key layanan eksternal disimpan pada file `.env`, tidak pada database maupun di dalam kode.

**Alasan.** Menyimpan secret di luar kode dan database adalah praktik keamanan standar yang mencegah kebocoran kredensial dan memudahkan rotasi.

**Konsekuensi.** File `.env` dikecualikan dari repositori dan dari container image.

## 7.8 Konsistensi Penamaan Peran

**Keputusan.** Peran siswa direpresentasikan sebagai nilai `user` pada database, sementara istilah yang ditampilkan kepada pengguna adalah "Siswa".

**Alasan.** Konsistensi penamaan antara data layer dan display layer mencegah ambiguitas selama pengembangan.

**Konsekuensi.** Dokumentasi dan kode menjaga pembedaan ini secara konsisten agar tidak terjadi kerancuan istilah.
