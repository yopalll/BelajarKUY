# 🤖 PROMPT: Setup Laravel `^13.7` Project (React + Inertia)

> Copy-paste prompt ini ke AI agent untuk inisialisasi project BelajarKUY.
> **PIC: Yosua Valentino**

---

## PROMPT

```
Kamu adalah senior Laravel developer. Tugas kamu adalah menginisialisasi project Laravel `^13.7` bernama "BelajarKUY" — sebuah platform e-learning (Udemy clone) untuk pasar Indonesia. Lapisan frontend memakai React via Inertia (ADR-008).

## LANGKAH-LANGKAH:

### 1. Buat project Laravel `^13.7`
```bash
composer create-project laravel/laravel BelajarKUY
cd BelajarKUY
```

### 2. Install Laravel Breeze (React + Inertia)
```bash
composer require laravel/breeze --dev
php artisan breeze:install react
npm install && npm run build
```

### 3. Install additional packages
```bash
composer require inertiajs/inertia-laravel:^3.1
composer require laravel/socialite
composer require midtrans/midtrans-php
composer require intervention/image
composer require cloudinary/cloudinary_php
composer require laravel/scout
composer require meilisearch/meilisearch-php
composer require laravel/reverb
```

### 4. Install frontend packages (React + Inertia)
```bash
npm install @inertiajs/react@^3.3.0 react@^19.2.6 react-dom@^19.2.6 \
  @vitejs/plugin-react@^6.0.2 @headlessui/react@^2.2.10 lucide-react@^1.17.0
npm install sweetalert2 laravel-echo pusher-js
# alpinejs tetap di devDependencies (diturunkan, bukan lapisan presentasi utama)
```

### 4b. Setup Broadcasting (Reverb)
```bash
php artisan install:broadcasting
```

### 5. Setup .env file
- Pastikan DB_CONNECTION=sqlite (default, zero setup) atau ganti ke mysql dengan DB_DATABASE=belajarkuy
- Tambahkan variable Midtrans (MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY, MIDTRANS_MERCHANT_ID)
  ⚠️ JANGAN tambah MIDTRANS_IS_PRODUCTION — hardcoded false di config (ADR-004)
- Tambahkan variable Google OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL)
- Tambahkan variable Cloudinary (CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
- Tambahkan variable Meilisearch (SCOUT_DRIVER=meilisearch, MEILISEARCH_HOST, MEILISEARCH_KEY)
- Tambahkan variable Reverb broadcasting (REVERB_APP_ID, REVERB_APP_KEY, REVERB_APP_SECRET, dll)
- Set APP_LOCALE=id dan APP_TIMEZONE=Asia/Jakarta

### 6. Buat config/midtrans.php
```php
<?php
return [
    'server_key' => env('MIDTRANS_SERVER_KEY', ''),
    'client_key' => env('MIDTRANS_CLIENT_KEY', ''),
    'is_production' => false,       // HARDCODED — project ini sandbox only (ADR-004)
    'is_sanitized' => true,
    'is_3ds' => true,
    'merchant_id' => env('MIDTRANS_MERCHANT_ID', ''),
];
```

### 7. Tambahkan Google config di config/services.php
```php
'google' => [
    'client_id' => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect' => env('GOOGLE_REDIRECT_URL'),
],
```

### 8. Buat folder structure
```
app/Http/Controllers/Frontend/
app/Http/Controllers/Backend/Admin/
app/Http/Controllers/Backend/Instructor/
app/Http/Controllers/Backend/Student/
app/Services/
app/Helpers/
```

### 9. Buat RoleMiddleware
File: app/Http/Middleware/RoleMiddleware.php
Register di bootstrap/app.php dengan alias 'role'

### 10. Modifikasi User model
- Tambahkan kolom role (enum: user, instructor, admin) di migration users
- Tambahkan $fillable yang sesuai
- Tambahkan scope berdasarkan role

## CONSTRAINT:
- Gunakan Laravel `^13.7`, PHP `^8.3`
- Database: MySQL
- Frontend: React + Inertia (`@inertiajs/react ^3.3.0`, `inertiajs/inertia-laravel ^3.1`); halaman di `resources/js/Pages`, root view `app` (ADR-008)
- Payment: Midtrans (BUKAN Stripe)
- Semua text UI dalam Bahasa Indonesia
- Semua kode (variabel, fungsi) dalam English
```

---

*Gunakan prompt ini untuk langkah pertama project setup.*
