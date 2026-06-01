# 🎨 UI/UX Design Guidelines & Workflow

Dokumen ini berisi panduan mengenai halaman apa saja yang perlu didesain (sketsa/wireframe/mockup) untuk proyek **BelajarKUY** dan bagaimana *workflow* untuk mengimplementasikan desain tersebut ke dalam *codebase* Laravel.

---

## 📋 1. Daftar Sketsa/Desain yang Perlu Dibuat

Tidak perlu mendesain semuanya di awal. Fokuslah pada halaman-halaman utama (MVP). Berikut adalah daftar halaman yang wajib didesain:

### A. Halaman Publik (Frontend)
1. **Landing Page (Beranda):** Hero banner, pencarian cepat, daftar kategori populer, *featured/top courses*, testimoni, dan footer.
2. **Katalog Course (Pencarian & Filter):** Halaman hasil pencarian course dengan sidebar filter (harga, kategori, rating) dan list/grid *card course*.
3. **Detail Course:** Halaman informasi course sebelum dibeli. Berisi video *preview*, deskripsi, kurikulum/silabus, profil instruktur, harga, tombol "Add to Cart" / "Buy Now", dan *reviews*.
4. **Keranjang (Cart) & Checkout:** Halaman rincian pesanan, input kupon diskon, dan ringkasan total biaya.

### B. Sistem Autentikasi
5. **Login & Register:** Form masuk dan daftar (pastikan ada area untuk tombol "Login with Google").

### C. Panel Siswa (Student Dashboard)
6. **Dashboard Siswa:** Ringkasan progres belajar dan statistik ringkas.
7. **My Courses:** Daftar course yang sudah dibeli oleh siswa.
8. **Course Player (Halaman Belajar):** Halaman utama untuk menonton materi. Terdiri dari area video utama, *sidebar* daftar modul/kurikulum, dan tab konten (Deskripsi, Q&A/Komentar) di bawah video.

### D. Panel Instruktur (Instructor Dashboard)
9. **Dashboard & Statistik:** Ringkasan pendapatan, total siswa, dan performa course.
10. **Manajemen Course (CRUD):** Form interaktif untuk membuat/mengedit course (judul, harga, deskripsi) dan form khusus untuk meng-upload materi (Video/PDF) per modul.

### E. Panel Admin (Admin Dashboard)
11. **Dashboard Admin:** Statistik keseluruhan *platform* (total user aktif, transaksi, dll).
12. **Tabel Manajemen Data:** Tampilan antarmuka tabel CRUD standar untuk mengelola User, Kategori, Transaksi, dan persetujuan Payout.

---

## 🚀 2. Workflow Menerapkan Desain ke Project (React + Inertia)

Proyek BelajarKUY menggunakan stack modern: **Laravel `^13.7` + React `^19.2.6` (via Inertia.js) + TailwindCSS `^3.1.0`**. Berikut adalah langkah teknis (*workflow*) untuk memindahkan desain dari aset Stitch/Figma ke *codebase* (lihat `SCREEN_MAPPING_STITCH_REACT.md` untuk peta layar). Bahasa desain **Konteks_A** (Frontend & Student) dan **Konteks_B** (Admin) tetap dipertahankan tanpa perubahan.

### Langkah 1: Ekstrak Desain ke Komponen React *Reusable*
Desain halaman tidak boleh dibuat sebagai satu kesatuan kode yang panjang (monolitik).
*   **Halaman:** Setiap layar menjadi halaman React di `resources/js/Pages` (mis. `Courses/Show.jsx`), dirender controller via `Inertia::render('Courses/Show', $props)`.
*   **Components:** Identifikasi bagian desain yang diulang-ulang (seperti *CourseCard*, *Button*, *Input Form*) dan buat menjadi komponen React di `resources/js/Components` (mis. `<CourseCard course={course} />`).

### Langkah 2: Gunakan Tailwind CSS untuk Styling (Tanpa Custom CSS)
**DILARANG keras menulis custom CSS** di file `app.css` kecuali sangat mendesak dan spesifik.
*   Terjemahkan desain UI secara langsung ke elemen JSX menggunakan *utility classes* bawaan TailwindCSS.
*   *Contoh:* Untuk tombol berwarna biru melengkung: `<button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2">Tombol</button>`.

### Langkah 3: Interaktivitas UI dengan React + Headless UI
Untuk elemen interaktif seperti **Dropdown, Modal (Pop-up), Tab, Accordion, atau Sidebar Toggle**, gunakan state React (`useState`) dan komponen aksesibel `@headlessui/react` (`^2.2.10`) + ikon `lucide-react` (`^1.17.0`). Alpine.js **tidak** lagi dipakai untuk lapisan presentasi.
*   *Contoh implementasi Dropdown dengan React:*
    ```jsx
    import { useState } from 'react';

    function Dropdown() {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="btn">Buka Menu</button>
          {open && (
            <div className="absolute bg-white shadow-md">Isi Menu Dropdown</div>
          )}
        </div>
      );
    }
    ```

### Langkah 4: Manfaatkan AI untuk "Image to Code"
Untuk mempercepat konversi *wireframe/mockup* menjadi kode jadi:
1. Export/ambil *screenshot* dari desain UI (aset Stitch `BelajarKuy_Design_Revisi/` atau Figma).
2. Lampirkan gambar tersebut ke AI (Agent) dan berikan instruksi. *Contoh: "Tolong buatkan komponen React (JSX) dengan TailwindCSS untuk desain halaman ini, sesuai halaman Inertia di `resources/js/Pages`."*
3. Salin (*copy*) kode yang dihasilkan AI ke dalam file `.jsx` di dalam `resources/js/Pages` atau `resources/js/Components`.

---
*Dokumen ini dibuat untuk menjadi panduan tim UI/UX (Quinsha Ilmi) dan Frontend (Vascha U).*
