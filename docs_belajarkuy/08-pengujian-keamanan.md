# 08 — Pengujian dan Keamanan

## 8.1 Strategi Pengujian

Pengujian difokuskan pada alur kritis yang paling menentukan kebenaran aplikasi, sesuai prinsip testing pyramid: banyak pengujian pada unit kecil, dan secukupnya pada tingkat fitur.

Alur yang diprioritaskan untuk diuji meliputi:

- **Autentikasi**, termasuk login via email dan akun Google serta verifikasi via kode sekali pakai.
- **Webhook pembayaran**, yaitu penanganan notifikasi dari payment gateway dan pengaruhnya terhadap status.
- **Pendaftaran kelas otomatis**, untuk memastikan pesanan dan enrollment terbentuk secara atomik ketika pembayaran berhasil.
- **Perhitungan progres**, untuk memastikan persentase progres dihitung tepat dari rasio materi yang diselesaikan.

Framework menyediakan testing tools bawaan, dan database ringan (SQLite in-memory) dapat digunakan agar pengujian berjalan cepat tanpa bergantung pada layanan eksternal.

## 8.2 Prinsip Keamanan

Keamanan diterapkan secara berlapis pada beberapa titik:

- **Credential management.** Seluruh key layanan eksternal disimpan pada file `.env`, bukan pada kode maupun database. File tersebut dikecualikan dari repositori dan dari container image.
- **CSRF protection.** Setiap form dilindungi CSRF token untuk mencegah pemalsuan request.
- **Input validation.** Input pengguna divalidasi melalui aturan terstruktur sebelum diproses, sehingga data yang tidak sah ditolak sejak awal.
- **Role-based authorization.** Akses antar area dibatasi middleware peran, dan hak menonton materi diperiksa melalui keberadaan enrollment. Pengguna yang tidak berhak menerima penolakan akses.
- **Instructor scope.** Instruktur hanya dapat mengelola kursus dan kupon miliknya sendiri.
- **Deployment security.** Pada environment production, hanya port web service yang diekspos ke internet. Database, cache, dan search engine tidak dapat diakses langsung dari publik. Komunikasi dienkripsi via SSL/TLS.

## 8.3 Code Quality dan Workflow

- Penataan kode mengikuti standar style yang lazim pada ekosistem framework, dijaga melalui linting tool otomatis.
- Riwayat perubahan menggunakan commit message yang deskriptif dan konsisten.
- Perubahan dikembangkan pada feature branch dan digabungkan melalui review, bukan di-push langsung ke branch utama.
