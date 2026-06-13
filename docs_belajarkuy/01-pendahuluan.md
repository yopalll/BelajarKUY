# 01 — Pendahuluan

## 1.1 Latar Belakang

Kebutuhan masyarakat Indonesia terhadap pendidikan digital yang terjangkau terus meningkat, namun akses terhadap materi pembelajaran berkualitas dalam bahasa Indonesia masih tersebar dan belum terpusat. Di sisi lain, para praktisi dan pengajar membutuhkan kanal yang memungkinkan mereka membagikan keahlian secara terstruktur sekaligus memperoleh kanal distribusi yang sederhana.

BelajarKUY lahir untuk menjawab kebutuhan tersebut: sebuah marketplace kursus daring yang mempertemukan instruktur sebagai pembuat kursus dengan siswa sebagai pembelajar, dengan administrator sebagai pengelola ekosistem. Seluruh antarmuka disajikan dalam bahasa Indonesia dan transaksi menggunakan mata uang Rupiah.

## 1.2 Rumusan Masalah

1. Bagaimana merancang sebuah platform yang memungkinkan siswa menemukan, membeli, dan mempelajari kursus dalam satu alur yang utuh?
2. Bagaimana memastikan akses kelas diberikan secara otomatis dan andal setelah pembayaran berhasil?
3. Bagaimana menyediakan perangkat bagi instruktur untuk menyusun kurikulum, menetapkan harga dan diskon, serta memantau penjualan?
4. Bagaimana memberi administrator kendali untuk mengelola katalog dan memoderasi konten agar kualitas platform tetap terjaga?

## 1.3 Tujuan

Tujuan pengembangan BelajarKUY adalah membangun aplikasi web marketplace pembelajaran daring yang fungsional dan utuh, mencakup:

- Alur belanja menyeluruh, mulai dari penjelajahan katalog, keranjang, proses bayar, hingga pendaftaran kelas otomatis.
- Pemutar kursus interaktif dengan pelacakan penyelesaian materi dan persentase progres.
- Panel terpisah untuk masing-masing peran pengguna dengan kewenangan yang sesuai.
- Mekanisme moderasi kursus dan ulasan, serta layanan bantuan bagi pengguna.

## 1.4 Manfaat

- **Bagi siswa:** satu tempat untuk belajar dengan pengalaman yang mulus dan progres yang terukur.
- **Bagi instruktur:** sarana menyusun dan memasarkan kursus tanpa perlu membangun infrastruktur sendiri.
- **Bagi administrator:** kendali penuh atas konten dan kualitas platform.
- **Bagi tim pengembang:** sarana penerapan praktik rekayasa perangkat lunak modern secara nyata.

## 1.5 Ruang Lingkup

### Termasuk dalam ruang lingkup

- Autentikasi multi-peran melalui surel maupun akun Google, dengan verifikasi melalui kode sekali pakai.
- Katalog kursus, halaman detail, pencarian, dan penyaringan berdasarkan kategori.
- Keranjang belanja, daftar keinginan, dan sistem kupon diskon.
- Pembayaran melalui gerbang pembayaran Midtrans beserta pendaftaran kelas otomatis.
- Pemutar kursus dengan pelacakan progres dan penerbitan sertifikat penyelesaian.
- Panel instruktur untuk manajemen kursus, bagian, materi, sasaran belajar, dan kupon.
- Panel administrator untuk manajemen kategori, konten halaman depan, serta moderasi kursus dan ulasan.
- Ulasan dan penilaian kursus, layanan bantuan berbentuk percakapan, dan pelaporan kursus maupun ulasan.
- Notifikasi melalui surel dan pembaruan dalam aplikasi.

### Di luar ruang lingkup

- Pemrosesan transaksi uang nyata. Pembayaran berjalan pada lingkungan uji gerbang pembayaran.
- Pencairan dana (payout) atau bagi hasil pendapatan kepada instruktur. Pelaporan pendapatan bersifat simulasi.
- Proses persetujuan pendaftaran instruktur. Akun instruktur aktif secara langsung; yang dimoderasi adalah kursusnya.

## 1.6 Konteks Akademik

BelajarKUY dikembangkan sebagai Tugas Besar perkuliahan oleh sebuah tim mahasiswa. Keberhasilan proyek diukur dari kelengkapan dan kebenaran fungsional fitur, kualitas rancangan basis data dan arsitektur, serta penerapan praktik pengembangan yang baik, bukan dari pencapaian metrik bisnis kuantitatif.
