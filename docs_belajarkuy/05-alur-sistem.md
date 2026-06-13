# 05 — Alur Sistem

Bagian ini menjelaskan alur kerja utama yang menghubungkan beberapa fitur menjadi satu rangkaian.

## 5.1 Autentikasi dan Pengarahan Peran

```
Registrasi atau Login (email atau Google)
        |
        v
Verifikasi email via kode sekali pakai
        |
        v
Redirect ke dashboard sesuai peran:
        - admin       -> dashboard administrator
        - instructor  -> dashboard instruktur
        - user        -> dashboard siswa
```

Pengguna yang belum terverifikasi tidak dapat memasuki area terbatas. Administrator memiliki halaman login tersendiri yang terpisah dari halaman umum.

## 5.2 Pembelian hingga Akses Kelas

Alur ini merupakan tulang punggung aplikasi. Ia membedakan tiga keadaan yang tidak boleh tertukar: telah dibayar, telah dipesan, dan telah terdaftar.

```
Siswa menekan tombol Bayar
        |
        v
Catatan pembayaran dibuat dengan status pending
        |
        v
Payment gateway memproses transaksi
        |
        v
Webhook callback diterima
        |
        v
Bila berhasil (settlement atau capture):
        - Pesanan dibuat dengan status selesai          [telah dipesan]
        - Pendaftaran kelas dibuat secara atomik         [telah terdaftar]
        - Cart dikosongkan
        - Email konfirmasi pembelian dan invoice dikirim
        |
        v
Siswa membuka course player
(hak akses diperiksa melalui keberadaan enrollment)
```

Pembuatan pesanan dan pendaftaran kelas dilakukan dalam satu database transaction agar konsisten: bila salah satu gagal, keduanya dibatalkan. Bila pembayaran tertunda, pengguna diarahkan ke halaman status pending; bila gagal atau dibatalkan, pengguna diarahkan ke halaman kegagalan.

## 5.3 Belajar dan Penerbitan Sertifikat

```
Siswa membuka kursus dari Kursus Saya
        |
        v
Player mengarahkan ke materi pertama yang belum selesai
        |
        v
Siswa menandai materi selesai (idempoten)
        |
        v
Progres dihitung ulang: jumlah materi selesai dibagi total materi
        |
        v
Bila seluruh materi selesai:
        - Banner penyelesaian ditampilkan
        - Sertifikat penyelesaian diterbitkan dan dapat diverifikasi publik
```

## 5.4 Moderasi Kursus

```
Instruktur submit kursus untuk ditinjau
        |
        v
Status kursus menjadi pending review
        |
        v
Administrator meninjau melalui halaman detail kursus:
        - Setuju  -> kursus menjadi aktif dan tampil di publik
        - Tolak   -> kursus menjadi nonaktif disertai feedback bagi instruktur
```

## 5.5 Help Desk

```
Pengguna membuat tiket bantuan (disertai lampiran bila perlu)
        |
        v
Tiket tampil sebagai percakapan berurutan
        |
        v
Administrator membalas; pengguna menerima notifikasi via email
        |
        v
Percakapan berlanjut hingga persoalan selesai
```

## 5.6 Pelaporan Konten

Pengguna dapat melaporkan kursus maupun ulasan yang dianggap tidak pantas. Laporan tersebut masuk ke antrian tinjauan administrator untuk ditindaklanjuti, sehingga kualitas konten platform tetap terjaga.
