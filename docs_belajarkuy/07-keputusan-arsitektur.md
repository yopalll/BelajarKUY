# 07 — Keputusan Arsitektur

Bagian ini merangkum keputusan rancangan penting beserta alasan dan konsekuensinya. Catatan keputusan membantu pembaca memahami bukan hanya bagaimana sistem dibangun, tetapi juga mengapa pilihan tertentu diambil.

## 7.1 Lapisan Antarmuka Menggunakan React melalui Inertia

**Keputusan.** Antarmuka dibangun sebagai komponen React yang dirender melalui Inertia, bukan sebagai templat server murni maupun aplikasi satu halaman dengan API terpisah.

**Alasan.** Inertia memberikan pengalaman navigasi mulus ala aplikasi satu halaman tanpa memaksa tim membangun dan memelihara lapisan API tersendiri. Routing, otorisasi, dan validasi tetap berada di sisi server sehingga logika bisnis terpusat dan aman.

**Konsekuensi.** Pengembang frontend dan backend bekerja pada satu basis kode yang erat. Panel administrator pun dibangun sebagai halaman React, bukan menggunakan pustaka panel administrasi pihak ketiga.

## 7.2 Gerbang Pembayaran Midtrans pada Lingkungan Uji

**Keputusan.** Pembayaran menggunakan Midtrans Snap dan dijalankan pada lingkungan uji.

**Alasan.** Konteks proyek bersifat akademik sehingga tidak melibatkan transaksi uang nyata. Lingkungan uji memungkinkan seluruh alur pembayaran diperagakan secara utuh tanpa risiko finansial.

**Konsekuensi.** Penanda lingkungan disimpan pada konfigurasi dan perlu diubah secara sadar bila aplikasi hendak menerima pembayaran sesungguhnya.

## 7.3 Pendaftaran Kelas sebagai Acuan Hak Akses

**Keputusan.** Hak akses sebuah kursus ditentukan oleh keberadaan baris pendaftaran kelas, bukan dengan menelusuri pesanan dan pembayaran.

**Alasan.** Pemisahan ini menyederhanakan pengecekan akses menjadi satu kueri ringkas dan memisahkan urusan transaksi dari urusan hak belajar.

**Konsekuensi.** Pendaftaran kelas dibuat dalam satu transaksi atomik bersama pesanan ketika pembayaran berhasil, sehingga konsistensi data terjaga.

## 7.4 Denormalisasi Instruktur pada Pesanan

**Keputusan.** Identitas instruktur disalin ke dalam tabel pesanan, meskipun sebenarnya dapat diturunkan dari kursus.

**Alasan.** Laporan pendapatan instruktur sering memerlukan data ini. Menyalinnya menghindari penggabungan tabel berulang yang mahal saat pelaporan.

**Konsekuensi.** Ini adalah denormalisasi yang disengaja dan terdokumentasi, bukan kelalaian normalisasi.

## 7.5 Snapshot Harga pada Transaksi

**Keputusan.** Pesanan menyimpan harga asli, potongan, dan harga akhir pada saat transaksi terjadi.

**Alasan.** Harga kursus dapat berubah seiring waktu. Catatan transaksi harus mencerminkan nilai yang berlaku ketika pembelian dilakukan.

**Konsekuensi.** Keranjang belanja justru tidak menyimpan harga, karena harga di keranjang selalu dihitung ulang dari kursus agar tidak menjadi usang.

## 7.6 Instruktur Aktif Secara Langsung

**Keputusan.** Akun instruktur aktif segera setelah pendaftaran tanpa proses persetujuan.

**Alasan.** Yang membutuhkan moderasi adalah kualitas kursus, bukan keberadaan instruktur. Memfokuskan moderasi pada kursus menyederhanakan alur sekaligus tetap menjaga mutu konten.

**Konsekuensi.** Mekanisme moderasi diterapkan pada kursus melalui status menunggu tinjauan, bukan pada akun instruktur.

## 7.7 Kredensial pada Berkas Lingkungan

**Keputusan.** Seluruh kunci layanan eksternal disimpan pada berkas lingkungan, tidak pada basis data maupun di dalam kode.

**Alasan.** Menyimpan rahasia di luar kode dan basis data adalah praktik keamanan baku yang mencegah kebocoran kredensial dan memudahkan rotasi.

**Konsekuensi.** Berkas lingkungan dikecualikan dari repositori dan dari image kontainer.

## 7.8 Konsistensi Penamaan Peran

**Keputusan.** Peran siswa direpresentasikan sebagai nilai `user` pada basis data, sementara istilah yang ditampilkan kepada pengguna adalah "Siswa".

**Alasan.** Konsistensi penamaan antara lapisan data dan lapisan tampilan mencegah ambiguitas selama pengembangan.

**Konsekuensi.** Dokumentasi dan kode menjaga pembedaan ini secara taat asas agar tidak terjadi kerancuan istilah.
