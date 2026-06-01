# 🛠️ BelajarKUY — Setup Guide

> Panduan lengkap untuk setup project BelajarKUY dari nol.

---

## Prerequisites

Pastikan sudah terinstall di komputer kamu:

| Software | Versi Minimum | Cek Versi |
|----------|---------------|-----------|
| PHP | 8.3+ | `php -v` |
| Composer | 2.x | `composer -V` |
| Node.js | 20+ | `node -v` |
| NPM | 10+ | `npm -v` |
| MySQL | 8.x | `mysql --version` |
| Git | 2.x | `git --version` |
| XAMPP/Laragon | Latest | — |

> 💡 **Rekomendasi:** Gunakan **Laragon** untuk Windows — otomatis setup PHP, MySQL, dan Apache.

---

## Step 1: Clone Repository

```bash
git clone https://github.com/[REPO_URL]/BelajarKUY.git
cd BelajarKUY
```

---

## Step 2: Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

---

## Step 2b: Setup Frontend React + Inertia

> Lapisan presentasi memakai **React via Inertia** (`ADR-008`). `composer install`/`npm install` di atas sudah memasang seluruh dependensi dari `composer.json`/`package.json`. Tiga bagian berikut adalah konfigurasi inti React+Inertia (sesuai `Kode_Nyata`).

### 1. Dependensi React (versi sesuai `package.json`)

```bash
npm install @inertiajs/react@^3.3.0 react@^19.2.6 react-dom@^19.2.6 \
  @vitejs/plugin-react@^6.0.2 @headlessui/react@^2.2.10 lucide-react@^1.17.0
# Adapter server (sudah ada di composer.json):
composer require inertiajs/inertia-laravel:^3.1
```

### 2. Konfigurasi `@vitejs/plugin-react` pada Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.jsx'], refresh: true }),
        react(),
    ],
});
```

### 3. Entry point Inertia (resolve `resources/js/Pages`, root view `app`)

```js
// resources/js/app.jsx
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    // root view Blade 'app' (resources/views/app.blade.php), sesuai
    // HandleInertiaRequests::$rootView = 'app'
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
```

> Prop bersama `auth.user` & `flash` otomatis tersedia di setiap halaman via `usePage().props` (dibagikan oleh `app/Http/Middleware/HandleInertiaRequests.php`).

---

## Step 3: Environment Setup

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

Edit file `.env` dengan konfigurasi berikut:

```env
APP_NAME=BelajarKUY
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=belajarkuy
DB_USERNAME=root
DB_PASSWORD=

# Midtrans (Selalu Sandbox — project non-komersial)
# Ambil dari: https://dashboard.sandbox.midtrans.com → Settings → Access Keys
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxx
MIDTRANS_MERCHANT_ID=G000000000

# Google OAuth (Optional untuk development awal)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google-callback

# Cloudinary (Media Storage)
# Ambil dari: https://cloudinary.com → Dashboard
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Meilisearch (Search Engine)
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=masterKey

# Broadcasting (Laravel Reverb — WebSocket)
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=belajarkuy
REVERB_APP_KEY=belajarkuy-key
REVERB_APP_SECRET=belajarkuy-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"

# Mail (Mailtrap untuk local dev)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@belajarkuy.test"
MAIL_FROM_NAME="BelajarKUY"
```

---

## Step 4: Setup Database

```bash
# Buat database MySQL bernama 'belajarkuy'
mysql -u root -e "CREATE DATABASE belajarkuy"

# Jalankan migrasi
php artisan migrate

# (Optional) Jalankan seeder untuk data awal
php artisan db:seed
```

---

## Step 5: Storage Link

```bash
php artisan storage:link
```

---

## Step 6: Build Assets & Run

```bash
# Terminal 1: Build frontend assets (development mode)
npm run dev

# Terminal 2: Jalankan Laravel server
php artisan serve

# Terminal 3: Jalankan Meilisearch (search engine)
# Download: https://www.meilisearch.com/docs/learn/getting_started/installation
meilisearch --master-key="masterKey"

# Terminal 4: Jalankan Laravel Reverb (WebSocket server)
php artisan reverb:start
```

Buka browser: **http://localhost:8000**

### Index data ke Meilisearch (setelah seeder):
```bash
php artisan scout:import "App\Models\Course"
```

---

## Step 7: Akun Default (Setelah Seeder)

Password untuk semua akun: **`password`**

| Role | Email |
|------|-------|
| Admin | `admin@belajarkuy.test` |
| Instructor | `ray@belajarkuy.test` |
| Instructor | `yosua@belajarkuy.test` |
| Student | `student@belajarkuy.test` |

> Domain `.test` dipakai intentional (RFC 2606 reserved untuk testing) — tidak konflik dengan domain asli.

---

## Troubleshooting

### Error: "SQLSTATE[HY000] [1049] Unknown database"
```bash
mysql -u root -e "CREATE DATABASE belajarkuy"
php artisan migrate
```

### Error: "Vite manifest not found"
```bash
npm run build
# ATAU jalankan npm run dev di terminal terpisah
```

### Error: "Class not found"
```bash
composer dump-autoload
php artisan optimize:clear
```

### Error: "Permission denied" (Linux/Mac)
```bash
chmod -R 775 storage bootstrap/cache
```

---

## Midtrans Sandbox Setup

1. Daftar di [https://dashboard.sandbox.midtrans.com](https://dashboard.sandbox.midtrans.com)
2. Buat akun merchant (gratis untuk sandbox)
3. Ambil **Server Key** dan **Client Key** dari Settings > Access Keys
4. Masukkan ke `.env`

### Test Card untuk Sandbox:
| Tipe | Nomor | Exp | CVV | OTP |
|------|-------|-----|-----|-----|
| Visa | 4811 1111 1111 1114 | 01/39 | 123 | 112233 |
| Mastercard | 5211 1111 1111 1117 | 01/39 | 123 | 112233 |

> ⚠️ Expiry terbaru selalu cek di: https://docs.midtrans.com/docs/testing-payment-on-sandbox

> 💡 **Testing callback di lokal:** Gunakan ngrok (`ngrok http 8000`) agar Midtrans bisa mengirim webhook ke localhost.

---

*Setup selesai! Lanjut ke development. Cek `AGENT_GUIDELINES.md` untuk panduan coding.*
