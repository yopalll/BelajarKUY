# 05 — Alur Sistem

Bagian ini menjelaskan alur kerja utama yang menghubungkan beberapa fitur menjadi satu rangkaian.

## 5.1 Autentikasi dan Pengarahan Peran

```
Pendaftaran atau Masuk (surel atau Google)
        |
        v
Verifikasi surel melalui kode sekali pakai
        |
        v
Pengarahan ke dasbor sesuai peran:
        - admin       -> dasbor administrator
        - instructor  -> dasbor instruktur
        - user        -> dasbor siswa
```

Pengguna yang belum terverifikasi tidak dapat memasuki area terbatas. Administrator memiliki halaman masuk tersendiri yang terpisah dari halaman umum.

## 5.2 Pembelian hingga Akses Kelas

Alur ini merupakan tulang punggung aplikasi. Ia membedakan tiga keadaan yang tidak boleh tertukar: telah dibayar, telah dipesan, dan telah terdaftar.

```
Siswa menekan tombol Bayar
        |
        v
Catatan pembayaran dibuat dengan status menunggu
        |
        v
Gerbang pembayaran memproses transaksi
        |
        v
Pemberitahuan balik (webhook) diterima
        |
        v
Bila berhasil (settlement atau capture):
        - Pesanan dibuat dengan status selesai          [telah dipesan]
        - Pendaftaran kelas dibuat secara atomik         [telah terdaftar]
        - Keranjang dikosongkan
        - Surel konfirmasi pembelian dan faktur dikirim
        |
        v
Siswa membuka pemutar kursus
(hak akses diperiksa melalui keberadaan pendaftaran kelas)
```

Pembuatan pesanan dan pendaftaran kelas dilakukan dalam satu transaksi basis data agar konsisten: bila salah satu gagal, keduanya dibatalkan. Bila pembayaran tertunda, pengguna diarahkan ke halaman status tertunda; bila gagal atau dibatalkan, pengguna diarahkan ke halaman kegagalan.

## 5.3 Belajar dan Penerbitan Sertifikat

```
Siswa membuka kursus dari Kursus Saya
        |
        v
Pemutar mengarahkan ke materi pertama yang belum selesai
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
Instruktur mengirim kursus untuk ditinjau
        |
        v
Status kursus menjadi menunggu tinjauan
        |
        v
Administrator meninjau melalui halaman detail kursus:
        - Setuju  -> kursus menjadi aktif dan tampil di publik
        - Tolak   -> kursus menjadi nonaktif disertai umpan balik bagi instruktur
```

## 5.5 Layanan Bantuan

```
Pengguna membuat tiket bantuan (disertai lampiran bila perlu)
        |
        v
Tiket tampil sebagai percakapan berurutan
        |
        v
Administrator membalas; pengguna menerima pemberitahuan melalui surel
        |
        v
Percakapan berlanjut hingga persoalan selesai
```

## 5.6 Pelaporan Konten

Pengguna dapat melaporkan kursus maupun ulasan yang dianggap tidak pantas. Laporan tersebut masuk ke antrean tinjauan administrator untuk ditindaklanjuti, sehingga kualitas konten platform tetap terjaga.
