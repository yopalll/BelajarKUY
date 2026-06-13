# 08 — Pengujian dan Keamanan

## 8.1 Strategi Pengujian

Pengujian difokuskan pada alur kritis yang paling menentukan kebenaran aplikasi, sesuai prinsip piramida pengujian: banyak pengujian pada satuan kecil, dan secukupnya pada tingkat fitur.

Alur yang diprioritaskan untuk diuji meliputi:

- **Autentikasi**, termasuk masuk melalui surel dan akun Google serta verifikasi melalui kode sekali pakai.
- **Pemberitahuan balik pembayaran**, yaitu penanganan notifikasi dari gerbang pembayaran dan pengaruhnya terhadap status.
- **Pendaftaran kelas otomatis**, untuk memastikan pesanan dan pendaftaran terbentuk secara atomik ketika pembayaran berhasil.
- **Penghitungan progres**, untuk memastikan persentase progres dihitung tepat dari rasio materi yang diselesaikan.

Kerangka kerja menyediakan perkakas pengujian bawaan, dan basis data ringan dapat digunakan agar pengujian berjalan cepat tanpa bergantung pada layanan eksternal.

## 8.2 Prinsip Keamanan

Keamanan diterapkan secara berlapis pada beberapa titik:

- **Pengelolaan rahasia.** Seluruh kredensial layanan eksternal disimpan pada berkas lingkungan, bukan pada kode maupun basis data. Berkas tersebut dikecualikan dari repositori dan dari image kontainer.
- **Perlindungan formulir.** Setiap formulir dilindungi token lintas-situs untuk mencegah pemalsuan permintaan.
- **Validasi masukan.** Masukan pengguna divalidasi melalui aturan terstruktur sebelum diproses, sehingga data yang tidak sah ditolak sejak awal.
- **Otorisasi berlapis.** Akses antar area dibatasi middleware peran, dan hak menonton materi diperiksa melalui keberadaan pendaftaran kelas. Pengguna yang tidak berhak menerima penolakan akses.
- **Pembatasan kewenangan instruktur.** Instruktur hanya dapat mengelola kursus dan kupon miliknya sendiri.
- **Keamanan penerapan.** Pada lingkungan produksi, hanya porta layanan web yang dipaparkan ke internet. Basis data, singgahan, dan mesin pencari tidak dapat diakses langsung dari publik. Komunikasi terenkripsi melalui sertifikat keamanan transport.

## 8.3 Mutu Kode dan Alur Kerja

- Penataan kode mengikuti standar gaya yang lazim pada ekosistem kerangka kerja, dijaga melalui perkakas perapian otomatis.
- Riwayat perubahan menggunakan pesan komit yang deskriptif dan konsisten.
- Perubahan dikembangkan pada cabang fitur dan digabungkan melalui peninjauan, bukan didorong langsung ke cabang utama.
