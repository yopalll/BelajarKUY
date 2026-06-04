# 📋 Daily Report — L8 Ray Nathan: Coupon System (React + Inertia)

> **Tanggal:** 4 Juni 2026
> **PIC:** Ray Nathan (Backend Lead — Commerce)
> **Session:** 13
> **Branch:** `feature/coupon`
> **Durasi:** ~1 sesi kerja

---

## Ringkasan

Langkah 8 (L8) Ray Nathan selesai: implementasi **Coupon System** lengkap.

Instruktur sekarang bisa membuat dan mengelola kupon diskon (CRUD) via halaman React baru di `/instructor/coupons`. Student bisa menginput kode kupon di halaman cart — diskon langsung terhitung real-time di ringkasan pesanan.

---

## File yang Dibuat / Diubah

### ✅ Baru Dibuat

| File | Deskripsi |
|------|-----------|
| `app/Http/Controllers/Backend/Instructor/CouponController.php` | CRUD kupon instruktur: index (Inertia), store, update, destroy, toggle status on/off, generate-code (JSON) |
| `app/Http/Controllers/Frontend/CouponController.php` | Apply kupon di cart: POST /coupon/apply (validasi 4-layer) + remove |
| `app/Http/Requests/Instructor/StoreCouponRequest.php` | Validasi form kupon: unique code, date after_or_equal:today, between:1,100, dll |
| `resources/js/Pages/Instructor/Coupons/Index.jsx` | Halaman React CRUD kupon instruktur: tabel data, modal form create/edit, toggle aktif, stats card |

### ✅ Diperbarui

| File | Perubahan |
|------|-----------|
| `resources/js/Pages/Cart/Index.jsx` | Aktifkan `CouponPanel` (ganti placeholder "Kode kupon tersedia saat checkout") — input kode, POST /coupon/apply, tampil diskon real-time di OrderSummary, bisa dibatalkan |
| `routes/web.php` | Tambah route instructor coupon CRUD (`/instructor/coupons/*`, `/toggle`, `/generate-code`) + `/coupon/apply` + `/coupon/remove` di grup auth |

---

## Detail Teknis

### Backend — InstructorCouponController (CRUD)

```
GET    /instructor/coupons              → index() → Inertia::render('Instructor/Coupons/Index')
POST   /instructor/coupons              → store() → redirect back dengan flash success
PUT    /instructor/coupons/{coupon}     → update() → redirect back
DELETE /instructor/coupons/{coupon}     → destroy() → redirect back
PATCH  /instructor/coupons/{coupon}/toggle → toggle() → JSON { success, status, message }
GET    /instructor/coupons/generate-code  → generateCode() → JSON { code }
```

- Semua aksi CRUD dilindungi `abort_unless($coupon->instructor_id === Auth::id(), 403)` — instruktur hanya bisa edit kupon miliknya sendiri.
- Kode di-uppercase otomatis (`strtoupper`).
- Generate-code menggunakan `Str::random(8)` dengan loop sampai unique.
- `used_count` TIDAK di-increment di sini — sesuai F11 spec, increment hanya di L9 saat payment settlement.

### Backend — FrontendCouponController (Apply)

Validasi 4-layer via `Coupon::active()` scope + filter by `course_id`:
1. `status = true`
2. `valid_until >= today`
3. `max_usage NULL OR used_count < max_usage`
4. `course_id NULL (global) OR course_id IN cart course_ids`

Pesan error dibuat **spesifik** per kasus (kode tidak ditemukan vs nonaktif vs expired vs quota habis vs kursus tidak cocok) agar UX lebih baik.

### Frontend — CouponPanel (Cart/Index.jsx)

- Form `<input>` kode kupon + tombol "Terapkan" (fetch POST `/coupon/apply`)
- Loading state dengan `Loader2` spinning icon
- Error message merah di bawah input
- Saat kupon berhasil: tampil panel hijau (code + diskon %) dengan tombol X untuk batalkan
- OrderSummary: tambah baris diskon kupon hijau, total berubah ke `final_price` dari server
- Auto-uppercase kode saat diketik

### Frontend — Pages/Instructor/Coupons/Index.jsx

- **Stats cards**: Total Kupon / Aktif / Kedaluwarsa
- **Tabel**: Kode (monospace badge), Kursus, Diskon %, Kedaluwarsa, Pemakaian (X/Y), Status pill (Aktif/Nonaktif/Kedaluwarsa/Habis Kuota)
- **Modal form** (overlay): create/edit, dengan generate-code button, select kursus (global vs spesifik), toggle status
- **Aksi row**: toggle status (PATCH JSON), edit (buka modal), hapus (router.delete dengan confirm)
- **Empty state**: ilustrasi + tombol buat kupon pertama

---

## Definition of Done — Checklist ✅

| Item | Status |
|------|--------|
| Instructor bisa create kupon (kode, diskon %, expired, max_usage) | ✅ |
| Instructor bisa edit kupon | ✅ |
| Instructor bisa toggle on/off tanpa hapus | ✅ |
| Instructor bisa hapus kupon | ✅ |
| Kupon bisa global atau per-kursus | ✅ |
| Generate kode otomatis (helper) | ✅ |
| Student bisa apply kode di halaman cart | ✅ |
| Diskon tampil real-time di OrderSummary | ✅ |
| Kupon invalid/expired/habis quota ditolak dengan pesan spesifik | ✅ |
| Kupon course-specific hanya berlaku untuk kursus itu | ✅ |
| `npm run build` sukses | ✅ 2388 modules |
| Skema DB tidak berubah | ✅ |
| Koeksistensi Blade lama tidak rusak | ✅ |

---

## Catatan Penting

1. **`used_count` belum di-increment** — ini intentional sesuai F11 spec. Akan diimplementasi di L9 (`CheckoutController@handleSuccess` saat payment settlement).
2. **Panel kupon di Cart** hanya untuk preview diskon — state kupon tidak disimpan di server (stateless). Saat checkout, kode dikirim ulang ke backend.
3. Kode kupon selalu di-uppercase di frontend sebelum dikirim ke backend.
4. Route `GET /instructor/coupons/generate-code` harus SEBELUM resource route karena Laravel akan menangkap `generate-code` sebagai ID parameter jika urutan terbalik.

---

## Next Step

**L9 Ray — Checkout + Midtrans + Enrollment** (`feature/payment-midtrans`):
- `CheckoutController@index` → `Pages/Checkout/Index.jsx` (ringkasan, apply kupon, total)
- `CheckoutController@process` → buat Snap token via `MidtransService` → kirim ke frontend
- Frontend: `snap.pay(token)` via Midtrans Snap JS
- Callback handler POST `/midtrans/notification` (csrf-exempt) → verifikasi signature → update Payment/Order → buat Enrollment → increment `coupon.used_count`
- `Pages/Payment/Success.jsx` + `Failed.jsx`

> ⭐ **L9 adalah TONGGAK KUNCI** — setelah L9 selesai, Albariqi bisa mulai L10 (Course Player) dan L11 (Email notifikasi).

---

*Report dibuat oleh: Antigravity (AI Agent) untuk Ray Nathan*
*Branch: `feature/coupon` — Commit: `80e407a`*
