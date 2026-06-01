# 🏗️ BelajarKUY — Tech Stack Detail

> Detail lengkap technology stack yang digunakan.

---

## Core Stack

| Komponen | Teknologi | Versi | Alasan |
|----------|-----------|-------|--------|
| Framework | Laravel | `^13.7` | Stable, PHP modern, ecosystem mature |
| PHP | PHP | `^8.3` | Required by Laravel 13, typed properties, enums |
| Database | MySQL | 8.x | Reliable, widely supported |
| **Frontend** | **React (via Inertia.js)** | `react ^19.2.6`, `@inertiajs/react ^3.3.0` (adapter klien), `inertiajs/inertia-laravel ^3.1` (adapter server) | SPA-like UX tanpa API layer terpisah; selaras `ADR-008` & aset redesign Stitch |
| Styling | TailwindCSS | `tailwindcss ^3.1.0` (paket inti) **+** `@tailwindcss/vite ^4.0.0` (plugin Vite) | Utility-first CSS. Catatan: paket inti v`^3.1.0`, plugin Vite v`^4.0.0` — keduanya dikutip apa adanya, bukan "v4" |
| UI React | `@headlessui/react ^2.2.10`, `lucide-react ^1.17.0` | — | Komponen aksesibel + ikon |
| JS Interactivity | Alpine.js | `alpinejs ^3.15.12` (`devDependencies`) | **Diturunkan** — bukan lapisan presentasi utama; interaktivitas ditangani komponen React |
| Build | Vite | `^8.0.0` (`@vitejs/plugin-react ^6.0.2`, `laravel-vite-plugin ^3.1`) | Fast HMR, native Laravel + React support |
| Payment | Midtrans Snap | v2 | Payment gateway Indonesia, sandbox gratis |
| Media Storage | Cloudinary | Latest | Auto-compress, resize, CDN, free tier besar |
| Video Hosting | YouTube (Unlisted) | — | Backup video hosting, 100% gratis |
| Search Engine | Meilisearch + Laravel Scout | Latest | Keystroke search, typo-tolerant, free self-host |
| Real-time | Laravel Reverb | Latest | WebSocket server bawaan Laravel, gratis |
| Email (Prod) | Resend | Latest | Modern transactional email, 3k free/bulan |
| Email (Dev) | Mailtrap | — | Email testing tanpa bocor ke inbox asli |

---

## Composer Packages (Required)

```json
{
    "require": {
        "php": "^8.3",
        "cloudinary/cloudinary_php": "^3.1",
        "inertiajs/inertia-laravel": "^3.1",
        "intervention/image": "^4.0",
        "laravel/framework": "^13.7",
        "laravel/reverb": "^1.10",
        "laravel/scout": "^11.1",
        "laravel/socialite": "^5.27",
        "laravel/tinker": "^3.0",
        "meilisearch/meilisearch-php": "^1.16",
        "midtrans/midtrans-php": "^2.6"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/breeze": "^2.4",
        "laravel/pail": "^1.2.5",
        "laravel/pao": "^1.0.6",
        "laravel/pint": "^1.27",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.6",
        "phpunit/phpunit": "^12.5.12"
    }
}
```

### Package Explanation

| Package | Fungsi |
|---------|--------|
| `inertiajs/inertia-laravel` | Adapter Inertia sisi server — menjembatani controller Laravel ke komponen React tanpa API layer terpisah |
| `laravel/breeze` | Authentication scaffolding (login, register, password reset) — me-render halaman React via Inertia |
| `laravel/socialite` | Google OAuth login |
| `laravel/scout` | Full-text search driver untuk Meilisearch |
| `laravel/reverb` | WebSocket server bawaan Laravel (real-time/notifikasi) |
| `midtrans/midtrans-php` | Midtrans payment SDK |
| `intervention/image` | Image resize & manipulation (thumbnail) |
| `cloudinary/cloudinary_php` | Upload media ke Cloudinary CDN |
| `meilisearch/meilisearch-php` | Meilisearch PHP client untuk Laravel Scout |
| `laravel/pint` | Code formatting (PSR-12) |

> **Catatan:** Admin panel **tidak** memakai Filament (tidak ada paket `filament/*` pada `composer.json`). Admin panel dibangun sebagai halaman React+Inertia di `resources/js/Pages/Admin/*` dengan kontrol akses via `RoleMiddleware` (`role:admin`). Lihat `ADR-008` dan `F07_ADMIN_PANEL.md`.

---

## NPM Packages (Required)

```json
{
    "dependencies": {
        "@headlessui/react": "^2.2.10",
        "@inertiajs/react": "^3.3.0",
        "@vitejs/plugin-react": "^6.0.2",
        "axios": "^1.16.0",
        "laravel-echo": "^2.3.4",
        "lucide-react": "^1.17.0",
        "pusher-js": "^8.5.0",
        "react": "^19.2.6",
        "react-dom": "^19.2.6",
        "sweetalert2": "^11.26.24"
    },
    "devDependencies": {
        "@tailwindcss/forms": "^0.5.2",
        "@tailwindcss/vite": "^4.0.0",
        "alpinejs": "^3.15.12",
        "autoprefixer": "^10.4.2",
        "concurrently": "^9.0.1",
        "laravel-vite-plugin": "^3.1",
        "postcss": "^8.4.31",
        "tailwindcss": "^3.1.0",
        "vite": "^8.0.0"
    }
}
```

### Package Explanation

| Package | Fungsi |
|---------|--------|
| `react`, `react-dom` | Pustaka UI utama (lapisan presentasi) |
| `@inertiajs/react` | Adapter Inertia sisi klien (React) — menukar halaman tanpa full reload |
| `@vitejs/plugin-react` | Plugin Vite untuk kompilasi React/JSX |
| `@headlessui/react` | Komponen UI aksesibel (dropdown, modal, dsb.) |
| `lucide-react` | Ikon SVG untuk komponen React |
| `tailwindcss` (+ `@tailwindcss/vite`) | Utility-first CSS framework (paket inti `^3.1.0`; plugin Vite `^4.0.0`) |
| `alpinejs` | **Diturunkan** — masih di `devDependencies`, bukan lapisan presentasi utama setelah adopsi React |
| `sweetalert2` | Beautiful alert/confirmation dialogs |
| `axios` | HTTP client untuk AJAX requests |
| `laravel-echo` | Client-side WebSocket listener (untuk Reverb/Pusher) |
| `pusher-js` | WebSocket client (required oleh Laravel Echo) |
| `concurrently` | Menjalankan beberapa proses dev (Vite + server) bersamaan |

---

## External Services

| Service | Fungsi | URL | Free Tier |
|---------|--------|-----|-----------|
| Midtrans Sandbox | Payment testing | https://dashboard.sandbox.midtrans.com | Gratis (sandbox) |
| Google Cloud Console | OAuth credentials | https://console.cloud.google.com | Gratis |
| Cloudinary | Media storage & CDN | https://cloudinary.com | 25 Credits/bulan |
| Meilisearch Cloud | Search engine (opsional) | https://cloud.meilisearch.com | Free tier tersedia |
| Resend | Transactional email (prod) | https://resend.com | 3.000 email/bulan |
| Mailtrap | Email testing (dev) | https://mailtrap.io | Gratis |

---

## Environment Variables

```env
# === APP ===
APP_NAME=BelajarKUY
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_LOCALE=id
APP_FALLBACK_LOCALE=id
APP_FAKER_LOCALE=id_ID
APP_TIMEZONE=Asia/Jakarta

# === DATABASE ===
# Default: SQLite (zero setup) — ganti ke mysql untuk production parity
DB_CONNECTION=sqlite
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=belajarkuy
# DB_USERNAME=root
# DB_PASSWORD=

# === MIDTRANS (SANDBOX ONLY — ADR-004) ===
# is_production HARDCODED di config/midtrans.php — tidak dari env
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_MERCHANT_ID=

# === GOOGLE OAUTH ===
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google-callback

# === CLOUDINARY ===
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=belajarkuy_unsigned

# === MEILISEARCH ===
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=masterKey

# === BROADCASTING (Reverb) ===
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

# === MAIL (Resend — production/demo) ===
MAIL_MAILER=smtp
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_USERNAME=resend
MAIL_PASSWORD=re_xxxxxxxxxxxx
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@belajarkuy.my.id
MAIL_FROM_NAME=BelajarKUY

# === MAIL (Mailtrap — uncomment untuk local dev) ===
# MAIL_MAILER=smtp
# MAIL_HOST=sandbox.smtp.mailtrap.io
# MAIL_PORT=2525
# MAIL_USERNAME=
# MAIL_PASSWORD=
# MAIL_FROM_ADDRESS=noreply@belajarkuy.test
# MAIL_FROM_NAME=BelajarKUY
```

---

## Server Requirements (Production)

| Requirement | Minimum |
|-------------|---------|
| PHP | 8.3 dengan extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, cURL |
| MySQL | 8.0 |
| Meilisearch | 1.x (self-host atau cloud) |
| Web Server | Nginx / Apache |
| SSL | Required (HTTPS) — Midtrans production memerlukan HTTPS |
| Storage | 10GB minimum (media di Cloudinary, bukan local) |
| RAM | 2GB minimum |
