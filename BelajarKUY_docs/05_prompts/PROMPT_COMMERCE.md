# 🤖 PROMPT: Commerce — Cart, Wishlist, Coupon, Midtrans (React + Inertia)

> Prompt untuk menyelesaikan pekerjaan **Ray Nathan** yang belum lengkap (gap terbesar saat ini).
> **PIC: Ray Nathan (Backend — Commerce)**
> **Stack:** Laravel `^13.7` + React via Inertia (ADR-008).
>
> Status awal (per 1 Juni 2026): belum ada CartController/WishlistController/CouponController. `MidtransService.php` & `CheckoutController.php` ada tapi checkout/payment masih render view statis; route `cart.add`, `wishlist.add`, `checkout`, `payment.*` masih placeholder. Model `Cart`, `Wishlist`, `Coupon`, `Order`, `Payment`, `Enrollment` sudah ada.

---

## PROMPT

```
Kamu adalah senior Laravel ^13.7 + React/Inertia developer. Lengkapi alur COMMERCE BelajarKUY end-to-end: Cart, Wishlist, Coupon, dan pembayaran Midtrans Snap (sandbox). Presentasi = halaman React (Inertia::render), BUKAN Blade.

## PREREQUISITE (baca dulu):
- BelajarKUY_docs/01_guides/AGENT_GUIDELINES.md
- BelajarKUY_docs/03_features/F05_CART_WISHLIST.md, F06_PAYMENT_MIDTRANS.md, F11_COUPON_SYSTEM.md
- BelajarKUY_docs/02_architecture/ADR/ADR-001 (Midtrans), ADR-004 (sandbox only)
- BelajarKUY_docs/05_prompts/PROMPT_MIDTRANS.md (detail integrasi backend)
- .kiro/specs/react-inertia-redesign/verified-facts.md (route placeholder: cart.*, checkout*, payment.*, wishlist.add)

## CONTEXT (Kode_Nyata):
- Model: Cart, Wishlist, Coupon, Course, Order, Payment, Enrollment.
- MidtransService.php SUDAH ada (gunakan; jangan bikin SDK baru). config/midtrans.php is_production = false (hardcoded, ADR-004).
- Route SAAT INI placeholder (routes/web.php) — ganti closure placeholder dengan controller nyata:
  cart.index, cart.add, checkout, checkout.process, payment.success, payment.failed, wishlist.add.
- Enrollment dibuat OTOMATIS setelah pembayaran settlement (cek via tabel Enrollment, BUKAN Order).

## TASKS

### 1. Wishlist
- WishlistController: add (POST /wishlist/{course} name wishlist.add), remove. Toggle untuk user login.
- Halaman daftar wishlist siswa sudah ada (student.wishlist) — pastikan add/remove berfungsi & flash message.

### 2. Cart
- CartController: index (Pages/Cart/Index.jsx), add (cart.add), remove, move-to-wishlist.
- Pages/Cart/Index.jsx (Konteks_A): daftar item + ringkasan; empty state "Keranjang kosong".
- Hitung subtotal; siap menerima kupon.

### 3. Coupon
- CouponController (instruktur): CRUD kupon (kode, diskon %, course/global, valid_until, max_usage, status).
- Apply kupon di cart/checkout: validasi kode (aktif, belum kedaluwarsa, kuota), hitung diskon, tampilkan di ringkasan.

### 4. Checkout + Midtrans Snap (end-to-end)
- CheckoutController@index → Pages/Checkout/Index.jsx (detail pembeli read-only dari auth.user, ringkasan, kupon).
- CheckoutController@process → buat Order (status pending) + minta Snap token via MidtransService → kirim snap token ke frontend.
- Frontend: muat snap.js Midtrans, panggil snap.pay(token) (komponen React/efek; bisa via script Midtrans).
- Payment callback/notification handler (POST /midtrans/notification, csrf-exempt): verifikasi signature, update Payment/Order status (settlement/capture/pending/deny/expire), dan saat settlement → buat Enrollment + kirim NewSaleNotification ke instruktur (koordinasi dgn Albariqi).
- Pages/Payment/Success.jsx & Failed.jsx (route payment.success / payment.failed).

## CONSTRAINT
- WAJIB sandbox (ADR-004) — JANGAN set is_production true; credentials dari .env.
- Backend: nama route yang sudah ada dipertahankan (ganti isi closure placeholder → controller). Skema DB tidak diubah.
- Presentasi React (Inertia::render); submit pakai useForm/router dari @inertiajs/react.
- Enrollment & flash message setelah settlement. Idempoten terhadap notifikasi ganda Midtrans.
- Text UI Bahasa Indonesia, Rupiah; Konteks_A.

## OUTPUT
- Controllers: CartController, WishlistController, CouponController, (update) CheckoutController, MidtransNotificationController.
- Halaman React: Pages/Cart/Index.jsx, Pages/Checkout/Index.jsx, Pages/Payment/{Success,Failed}.jsx.
- routes/web.php: ganti placeholder cart/checkout/payment/wishlist dengan controller; tambah route notifikasi Midtrans.
- Form Request + (jika perlu) Event PaymentSuccessful.
```

---

## Definition of Done (untuk PR)

- [ ] Add/remove wishlist & cart berfungsi (bukan lagi `back('… belum tersedia')`).
- [ ] Kupon bisa dibuat instruktur & diterapkan di checkout (diskon terhitung).
- [ ] Checkout membuat Order + Snap token; pembayaran sandbox berhasil → callback membuat Enrollment + flash sukses.
- [ ] Pages/Payment/Success & Failed tampil sesuai hasil.
- [ ] is_production tetap false; skema DB tidak berubah; `npm run build` sukses.

> Branch: `feature/cart-wishlist`, `feature/coupon`, `feature/payment-midtrans`. Lihat `04_plans/MIGRATION_SCHEDULE_REACT_INERTIA.md`.
