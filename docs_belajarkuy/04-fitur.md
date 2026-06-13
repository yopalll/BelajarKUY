# 04 — Fitur Aplikasi

Bagian ini merinci fungsi aplikasi yang dikelompokkan menurut peran pengguna.

## 4.1 Area Publik (Tanpa Login)

- **Halaman depan** menampilkan hero slider, info box, kategori populer, kursus unggulan, kursus terlaris, dan mitra.
- **Katalog dan pencarian** memungkinkan pengunjung menelusuri kursus serta memfilter berdasarkan kata kunci dan kategori. Pencarian ditenagai search engine yang responsif.
- **Halaman detail kursus** memuat deskripsi, sasaran belajar, kurikulum, profil instruktur, ulasan, dan kursus terkait. Dari halaman ini pengunjung dapat menambahkan kursus ke cart atau wishlist.
- **Halaman statis** seperti tentang kami, kebijakan privasi, syarat dan ketentuan, serta kontak.
- **Verifikasi sertifikat** memungkinkan siapa pun memeriksa keaslian sertifikat penyelesaian melalui kode unik.

## 4.2 Autentikasi

- Registrasi dan login via email maupun akun Google.
- Verifikasi email menggunakan kode sekali pakai sebelum pengguna dapat mengakses area terbatas.
- Reset password via email.
- Halaman login administrator yang terpisah dari halaman login umum.
- Pembatasan akses pengguna ke setiap area sesuai perannya.

## 4.3 Peran Siswa

- **Cart dan wishlist** dengan perhitungan harga dan diskon secara real-time.
- **Proses checkout** yang menerapkan kupon bila tersedia dan meneruskan transaksi ke payment gateway.
- **Pendaftaran kelas otomatis** segera setelah pembayaran dinyatakan berhasil.
- **Kursus saya** yang menampilkan seluruh kelas yang telah didaftari beserta progresnya.
- **Course player** dengan layout dua kolom: video player dan info materi di satu sisi, serta progress bar dan daftar kurikulum yang dapat dilipat di sisi lain. Materi dapat ditandai selesai, dan progres dihitung ulang seketika.
- **Sertifikat penyelesaian** yang terbit ketika seluruh materi suatu kursus telah dirampungkan.
- **Riwayat transaksi** beserta rinciannya.
- **Profil dan pengaturan** termasuk penggantian password.
- **Ulasan dan rating** kursus yang telah didaftari, satu ulasan untuk tiap kursus.

## 4.4 Peran Instruktur

- **Dashboard** yang merangkum jumlah kursus, jumlah siswa, dan pendapatan kotor.
- **Manajemen kursus** mencakup pembuatan dan pengeditan kursus, bagian, materi, serta sasaran belajar.
- **Upload media** untuk thumbnail dan video, termasuk upload video ke cloud storage dengan deteksi durasi otomatis.
- **Submit kursus untuk moderasi**, yang mengubah status kursus menjadi menunggu tinjauan.
- **Manajemen kupon** milik instruktur sendiri, baik berlaku global maupun khusus satu kursus, dengan batas pemakaian.
- **Riwayat penjualan** yang menampilkan transaksi atas kursus miliknya.
- **Pedoman konten** sebagai acuan kualitas materi sebelum submit.

## 4.5 Peran Administrator

- **Dashboard** statistik platform.
- **Manajemen kategori dan subkategori**.
- **Manajemen konten halaman depan**: hero slider, info box, dan mitra.
- **Pengaturan situs** seperti nama situs, logo, favicon, informasi kontak, dan tautan media sosial, lengkap dengan live preview.
- **Moderasi kursus**: meninjau, menyetujui, atau menolak kursus melalui halaman detail dengan disertai feedback penolakan.
- **Moderasi ulasan**: menyetujui atau menolak ulasan, termasuk meninjau ulasan yang dilaporkan.
- **Penanganan laporan kursus** yang diajukan pengguna.
- **Help desk** berbentuk percakapan dua arah dengan pengguna, termasuk lampiran gambar dan notifikasi via email.
- **Tinjauan pengguna, instruktur, dan pesanan** secara read-only.

## 4.6 Fitur Lintas Peran

- **Sistem kupon** yang diterapkan pada checkout dengan penghitung pemakaian dan penolakan kupon kedaluwarsa, melebihi batas, atau nonaktif.
- **Help desk** yang dapat diakses pengguna untuk mengajukan tiket dan ditanggapi administrator.
- **Pelaporan** terhadap kursus maupun ulasan yang dianggap tidak pantas.
- **Notifikasi** via email transaksional, update dalam aplikasi, serta toast notification atas hasil aksi.
- **Dynamic branding** berupa logo, favicon, dan teks yang dapat diatur dari panel administrator dan langsung tercermin di seluruh halaman.
