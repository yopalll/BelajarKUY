# 04 — Fitur Aplikasi

Bagian ini merinci fungsi aplikasi yang dikelompokkan menurut peran pengguna.

## 4.1 Area Publik (Tanpa Masuk)

- **Halaman depan** menampilkan sorotan berupa hero geser, kotak informasi, kategori populer, kursus unggulan, kursus terlaris, dan mitra.
- **Katalog dan pencarian** memungkinkan pengunjung menelusuri kursus serta menyaring berdasarkan kata kunci dan kategori. Pencarian ditenagai mesin pencari yang responsif.
- **Halaman detail kursus** memuat deskripsi, sasaran belajar, kurikulum, profil instruktur, ulasan, dan kursus terkait. Dari halaman ini pengunjung dapat menambahkan kursus ke keranjang atau daftar keinginan.
- **Halaman statis** seperti tentang kami, kebijakan privasi, syarat dan ketentuan, serta kontak.
- **Verifikasi sertifikat** memungkinkan siapa pun memeriksa keaslian sertifikat penyelesaian melalui kode unik.

## 4.2 Autentikasi

- Pendaftaran dan masuk melalui surel maupun akun Google.
- Verifikasi surel menggunakan kode sekali pakai sebelum pengguna dapat mengakses area terbatas.
- Pemulihan kata sandi melalui surel.
- Halaman masuk administrator yang terpisah dari halaman masuk umum.
- Pembatasan akses pengguna ke setiap area sesuai perannya.

## 4.3 Peran Siswa

- **Keranjang dan daftar keinginan** dengan penghitungan harga serta diskon secara langsung.
- **Proses bayar** yang menerapkan kupon bila tersedia dan meneruskan transaksi ke gerbang pembayaran.
- **Pendaftaran kelas otomatis** segera setelah pembayaran dinyatakan berhasil.
- **Kursus saya** yang menampilkan seluruh kelas yang telah didaftari beserta progresnya.
- **Pemutar kursus** dengan tata letak dua kolom: pemutar video dan informasi materi di satu sisi, serta bilah progres dan daftar kurikulum yang dapat dilipat di sisi lain. Materi dapat ditandai selesai, dan progres dihitung ulang seketika.
- **Sertifikat penyelesaian** yang terbit ketika seluruh materi suatu kursus telah dirampungkan.
- **Riwayat transaksi** beserta rinciannya.
- **Profil dan pengaturan** termasuk penggantian kata sandi.
- **Ulasan dan penilaian** kursus yang telah didaftari, satu ulasan untuk tiap kursus.

## 4.4 Peran Instruktur

- **Dasbor** yang merangkum jumlah kursus, jumlah siswa, dan pendapatan kotor.
- **Manajemen kursus** mencakup pembuatan dan penyuntingan kursus, bagian, materi, serta sasaran belajar.
- **Pengunggahan media** untuk thumbnail dan video, termasuk pengunggahan video ke penyimpanan awan dengan pendeteksian durasi otomatis.
- **Pengiriman kursus untuk moderasi**, yang mengubah status kursus menjadi menunggu tinjauan.
- **Manajemen kupon** milik instruktur sendiri, baik berlaku global maupun khusus satu kursus, dengan batas pemakaian.
- **Riwayat penjualan** yang menampilkan transaksi atas kursus miliknya.
- **Pedoman konten** sebagai acuan kualitas materi sebelum pengiriman.

## 4.5 Peran Administrator

- **Dasbor** statistik platform.
- **Manajemen kategori dan subkategori**.
- **Manajemen konten halaman depan**: hero geser, kotak informasi, dan mitra.
- **Pengaturan situs** seperti nama situs, logo, favicon, informasi kontak, dan tautan media sosial, lengkap dengan pratinjau langsung.
- **Moderasi kursus**: meninjau, menyetujui, atau menolak kursus melalui halaman detail dengan disertai umpan balik penolakan.
- **Moderasi ulasan**: menyetujui atau menolak ulasan, termasuk meninjau ulasan yang dilaporkan.
- **Penanganan laporan kursus** yang diajukan pengguna.
- **Layanan bantuan** berbentuk percakapan dua arah dengan pengguna, termasuk lampiran gambar dan pemberitahuan melalui surel.
- **Tinjauan pengguna, instruktur, dan pesanan** secara baca-saja.

## 4.6 Fitur Lintas Peran

- **Sistem kupon** yang diterapkan pada proses bayar dengan penambahan penghitung pemakaian dan penolakan kupon kedaluwarsa, melebihi batas, atau nonaktif.
- **Layanan bantuan** yang dapat diakses pengguna untuk mengajukan tiket dan ditanggapi administrator.
- **Pelaporan** terhadap kursus maupun ulasan yang dianggap tidak pantas.
- **Notifikasi** melalui surel transaksional, pembaruan dalam aplikasi, serta pesan sembul atas hasil aksi.
- **Penjenamaan dinamis** berupa logo, favicon, dan teks yang dapat diatur dari panel administrator dan langsung tercermin di seluruh halaman.
