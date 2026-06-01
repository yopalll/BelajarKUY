# Requirements Document

## Introduction

Fitur ini adalah **perencanaan (planning) dan dokumentasi** untuk migrasi total lapisan frontend BelajarKUY (marketplace e-learning) dari **Blade + Alpine.js** menjadi **React.js melalui Inertia.js**, sekaligus menyelaraskan redesign visual dari aset Google Stitch (`BelajarKuy_Design_Revisi`).

Cakupan deliverable adalah **dokumen Markdown (.md)** saja — yaitu Master Migration Plan, dokumentasi keunggulan React, rencana pembaruan seluruh set dokumentasi, pemetaan layar redesign ke halaman/komponen React, dan ADR baru yang mengadopsi React+Inertia. Fitur ini **TIDAK** mengeksekusi kode migrasi (tidak menulis komponen React produksi, tidak mengubah controller/route/model, tidak mengubah skema database).

Konteks penting yang sudah diverifikasi langsung dari kode (bukan dari dokumen lama):

- `composer.json` sudah memuat `inertiajs/inertia-laravel: ^3.1`, Laravel `^13.7`, PHP `^8.3`, Breeze `^2.4`, Socialite, Scout+Meilisearch, Reverb, Midtrans, Cloudinary, Intervention Image.
- `package.json` sudah memuat `react: ^19.2.6`, `react-dom: ^19.2.6`, `@inertiajs/react: ^3.3.0`, `@vitejs/plugin-react: ^6.0.2`, `@headlessui/react: ^2.2.10`, `lucide-react: ^1.17.0`, di samping `alpinejs`, `tailwindcss`, `laravel-vite-plugin`, `vite`, `axios`, `laravel-echo`, `pusher-js`, `sweetalert2`.
- `app/Http/Middleware/HandleInertiaRequests.php` sudah ada, dengan `rootView = 'app'`, membagikan prop `auth.user` (id, name, email, role, photo, email_verified_at) dan `flash` (success/error/info/warning).
- **Konflik yang harus diselesaikan:** dokumentasi lama menyatakan frontend adalah Blade + Alpine.js dan secara eksplisit menolak Inertia (`ADR-002`), serta `TECH_STACK.md` menyebut Laravel 12 + Filament v5 + Tailwind v4 + Alpine, yang **tidak konsisten** dengan kondisi kode nyata (Laravel 13.7, Inertia+React terpasang, tanpa Filament di `composer.json`).

Dokumen requirements ini ditulis dalam Bahasa Indonesia agar konsisten dengan set dokumentasi yang sudah ada.

## Glossary

- **Sistem_Dokumentasi**: Kumpulan deliverable perencanaan berformat Markdown yang dihasilkan oleh fitur ini (Master Migration Plan, dokumen keunggulan, rencana pembaruan dokumentasi, pemetaan layar, ADR baru). Ini adalah "system" yang menjadi subjek pada sebagian besar acceptance criteria.
- **Master_Plan**: Dokumen `MASTER_PLAN_REACT_INERTIA.md` yang memuat strategi migrasi Blade → React+Inertia secara bertahap, lengkap dengan scope, fase, risiko, dan strategi rollback.
- **Dok_Keunggulan**: Bagian/dokumen yang menjelaskan manfaat dan keunggulan adopsi React+Inertia bagi proyek BelajarKUY.
- **Rencana_Update_Dok**: Dokumen yang memetakan setiap berkas/folder dokumentasi yang sudah ada ke status tindakan (Update / Supersede / New / No-Change) beserta alasan dan poin perbaikan.
- **Peta_Layar**: Dokumen pemetaan dari layar redesign Google Stitch ke halaman/komponen React+Inertia, dikelompokkan per peran dan konteks desain, serta dipetakan ke route yang sudah ada.
- **ADR_Baru**: Architecture Decision Record baru (nomor berikutnya: `ADR-008`) yang mengadopsi React+Inertia sebagai lapisan frontend dan men-supersede `ADR-002`.
- **Set_Dokumentasi**: Seluruh berkas dan folder dokumentasi yang berada di `BelajarKUY_docs/` (mencakup `00_INDEX.md`, `CHANGELOG.md`, `PRD_BelajarKUY.md`, `01_guides/`, `02_architecture/` termasuk `ADR/`, `03_features/`, `04_plans/`, `05_prompts/`, `06_reports/`, `07_extras/`).
- **Kode_Nyata**: Kondisi aktual basis kode aplikasi Laravel di `BelajarKUY/BelajarKUY/` (composer.json, package.json, middleware, controller, route, model, migration), yang menjadi sumber kebenaran (source of truth) untuk akurasi dokumentasi.
- **Aset_Redesign**: Aset desain hasil ekspor Google Stitch di folder `BelajarKuy_Design_Revisi/` (pasangan `code.html` + `screen.png` per layar) beserta `prd.md` versi baru di dalamnya.
- **Konteks_A**: Bahasa desain Frontend & Student — gradien Indigo→Purple, aksen Amber/Orange, font Poppins, kartu `rounded-3xl`.
- **Konteks_B**: Bahasa desain Admin — palet krem + slate-blue, font Inter.
- **Lapisan_Backend**: Komponen non-presentasi aplikasi: model, route, controller, request validation, middleware peran, skema database, serta integrasi Midtrans/Cloudinary/Reverb/Meilisearch/Socialite.
- **Status_Tindakan**: Salah satu dari empat nilai untuk setiap berkas dokumentasi: `Update`, `Supersede`, `New`, atau `No-Change`.

## Requirements

### Requirement 1: Master Migration Plan (Blade → React + Inertia)

**User Story:** Sebagai Project Manager, saya ingin sebuah dokumen master plan migrasi frontend ke React+Inertia, sehingga tim memiliki panduan bertahap yang jelas mengenai scope, fase, risiko, dan rollback.

#### Acceptance Criteria

1. THE Sistem_Dokumentasi SHALL menghasilkan berkas `MASTER_PLAN_REACT_INERTIA.md` berformat Markdown.
2. THE Master_Plan SHALL memuat pernyataan scope yang membatasi migrasi hanya pada lapisan presentasi (view) dan mengecualikan perubahan Lapisan_Backend.
3. THE Master_Plan SHALL memuat pendekatan bertahap (phased approach) dengan minimal tiga fase berurutan yang masing-masing memuat: nama fase, tujuan, daftar view/halaman Blade yang dicakup pada fase tersebut, dan minimal satu kriteria keluar (exit criteria) yang dirumuskan sebagai kondisi terukur sehingga dua peninjau independen mencapai kesimpulan terpenuhi/tidak terpenuhi yang identik.
4. THE Master_Plan SHALL memuat daftar minimal lima risiko migrasi yang masing-masing disertai tingkat dampak dan tingkat kemungkinan menggunakan skala tiga tingkat yang didefinisikan (Rendah, Sedang, Tinggi) serta minimal satu tindakan mitigasi.
5. THE Master_Plan SHALL memuat strategi rollback yang untuk setiap fase mencantumkan kondisi pemicu rollback dan langkah-langkah berurutan untuk mengembalikan lapisan presentasi ke lapisan Blade.
6. THE Master_Plan SHALL mendokumentasikan kondisi awal (baseline) scaffolding React+Inertia yang sudah terpasang berdasarkan `composer.json`, `package.json`, dan `HandleInertiaRequests.php`.
7. THE Master_Plan SHALL mendokumentasikan urutan penonaktifan (deactivation sequence) lapisan Blade pada setiap fase, terlepas dari apakah strategi koeksistensi diperlukan.
8. WHERE strategi koeksistensi Blade dan React diperlukan selama transisi, THE Master_Plan SHALL menjelaskan mekanisme menjalankan kedua lapisan secara bersamaan.

### Requirement 2: Dokumentasi Keunggulan React + Inertia

**User Story:** Sebagai stakeholder proyek, saya ingin dokumentasi yang menjelaskan manfaat adopsi React+Inertia, sehingga keputusan migrasi memiliki justifikasi yang terdokumentasi.

#### Acceptance Criteria

1. THE Sistem_Dokumentasi SHALL menghasilkan Dok_Keunggulan berformat Markdown yang menjelaskan manfaat adopsi React+Inertia bagi BelajarKUY.
2. THE Dok_Keunggulan SHALL mencakup kelima aspek berikut, dan untuk setiap aspek SHALL menyatakan minimal satu manfaat konkret bagi BelajarKUY: pengalaman pengembang (developer experience), reusabilitas komponen, pengalaman pengguna gaya SPA, ekosistem React, dan keselarasan dengan Aset_Redesign.
3. WHERE sebuah klaim keunggulan menyangkut perilaku teknis, THE Dok_Keunggulan SHALL mengaitkan klaim tersebut dengan kapabilitas konkret pada Kode_Nyata (mis. prop bersama pada `HandleInertiaRequests.php`).
4. THE Dok_Keunggulan SHALL memuat minimal satu klaim teknis yang dikaitkan dengan rujukan kode konkret pada Kode_Nyata, di mana rujukan konkret berarti menyebut nama berkas, dependensi, route, atau nama kelas yang benar-benar ada pada Kode_Nyata.
5. THE Dok_Keunggulan SHALL mencantumkan minimal dua trade-off atau konsekuensi negatif dari adopsi React+Inertia, dan untuk setiap trade-off SHALL menyertakan tindakan mitigasinya.

### Requirement 3: Rencana Pembaruan Seluruh Set Dokumentasi

**User Story:** Sebagai pemelihara dokumentasi, saya ingin rencana yang mencakup setiap berkas dokumentasi yang ada, sehingga seluruh dokumentasi tetap konsisten dan bebas dari inkonsistensi setelah migrasi.

#### Acceptance Criteria

1. THE Sistem_Dokumentasi SHALL menghasilkan tepat satu Rencana_Update_Dok berformat Markdown (`.md`).
2. THE Rencana_Update_Dok SHALL mencantumkan setiap berkas dan folder yang ada pada Set_Dokumentasi tepat satu kali tanpa ada yang terlewat, dan SHALL memberi masing-masing tepat satu Status_Tindakan bernilai `Update`, `Supersede`, atau `No-Change`.
3. FOR setiap berkas dengan Status_Tindakan `Update`, THE Rencana_Update_Dok SHALL mencantumkan minimal satu perubahan spesifik yang diperlukan beserta alasan untuk setiap perubahan tersebut.
4. FOR setiap berkas dengan Status_Tindakan `Supersede`, THE Rencana_Update_Dok SHALL mencantumkan dokumen pengganti dan alasan supersede.
5. FOR setiap berkas dengan Status_Tindakan `New`, THE Rencana_Update_Dok SHALL mencantumkan tujuan dan ringkasan isi dokumen baru tersebut.
6. FOR setiap berkas dengan Status_Tindakan `No-Change`, THE Rencana_Update_Dok SHALL mencantumkan alasan bahwa isi berkas tetap akurat terhadap Kode_Nyata sehingga tidak memerlukan perubahan.
7. THE Rencana_Update_Dok SHALL secara eksplisit mengidentifikasi konflik "Blade vs Inertia" antara dokumentasi lama dan Kode_Nyata, serta SHALL menetapkan tindakan penyelesaian yang menyelaraskan dokumentasi terhadap Kode_Nyata sebagai sumber kebenaran beserta Status_Tindakan untuk setiap berkas yang terdampak konflik tersebut.
8. THE Rencana_Update_Dok SHALL mengidentifikasi setiap ketidaksesuaian versi atau teknologi antara dokumentasi lama dan Kode_Nyata, mencakup minimal versi Laravel (dok: 12.x vs kode: `^13.7`), keberadaan Filament (dok: terpasang vs kode: tidak ada pada `composer.json`), dan versi Tailwind (dok: v4 vs versi pada `package.json` Kode_Nyata), serta SHALL mencantumkan koreksi spesifik untuk setiap ketidaksesuaian.

### Requirement 4: Pemetaan Layar Redesign Stitch ke Halaman/Komponen React

**User Story:** Sebagai frontend developer, saya ingin pemetaan dari layar redesign Stitch ke halaman/komponen React, sehingga implementasi UI selaras dengan route dan peran yang sudah ada.

#### Acceptance Criteria

1. THE Sistem_Dokumentasi SHALL menghasilkan Peta_Layar dalam format Markdown, di mana setiap "layar" didefinisikan sebagai tepat satu folder layar Aset_Redesign yang memuat berkas `code.html` dan `screen.png`.
2. THE Peta_Layar SHALL memetakan setiap layar ke minimal satu halaman React+Inertia yang diusulkan di bawah `resources/js/Pages`, sehingga jumlah layar yang tidak terpetakan sama dengan 0.
3. THE Peta_Layar SHALL menetapkan untuk setiap layar tepat satu peran dari himpunan {Student, Instructor, Admin, publik} dan tepat satu konteks desain dari himpunan {Konteks_A, Konteks_B}.
4. WHERE sebuah layar memiliki route yang sudah ada pada Kode_Nyata, THE Peta_Layar SHALL mencantumkan path route tersebut.
5. THE Peta_Layar SHALL mengidentifikasi komponen React yang dapat digunakan ulang, di mana "dapat digunakan ulang" berarti dipakai pada minimal 2 layar, dan SHALL mendaftar setiap layar yang memakai masing-masing komponen tersebut.
6. IF sebuah layar tidak memiliki route yang cocok pada Kode_Nyata, THEN THE Peta_Layar SHALL menandai layar tersebut sebagai usulan baru dan mencatat ketiadaan route yang cocok.

### Requirement 5: ADR Adopsi React + Inertia (Supersede ADR-002)

**User Story:** Sebagai arsitek, saya ingin ADR baru yang mengadopsi React+Inertia dan men-supersede ADR-002, sehingga keputusan arsitektur frontend tercatat secara konsisten.

#### Acceptance Criteria

1. WHEN Sistem_Dokumentasi membuat ADR_Baru, THE Sistem_Dokumentasi SHALL menyimpan ADR_Baru di direktori ADR yang sama dengan `ADR-001` sampai `ADR-007` (`02_architecture/ADR/`) menggunakan nomor `ADR-008` sebagai nomor urut berikutnya setelah `ADR-007`, dengan pola penamaan berkas yang sama seperti `ADR-001` sampai `ADR-007`.
2. THE ADR_Baru SHALL menyatakan keputusan mengadopsi React+Inertia sebagai lapisan frontend BelajarKUY yang menggantikan keputusan Blade + Alpine.js pada `ADR-002`.
3. THE ADR_Baru SHALL mencantumkan pernyataan bahwa ADR_Baru men-supersede `ADR-002` dengan menyebut identitas `ADR-002` secara eksplisit beserta minimal satu alasan perubahan keputusan.
4. THE Sistem_Dokumentasi SHALL memperbarui nilai field Status pada `ADR-002` menjadi `Superseded by ADR-008` (mengikuti kosakata status pada template ADR) tanpa mengubah bagian Context, Decision, Consequences, dan Alternatives Considered yang sudah ada pada `ADR-002`.
5. THE Sistem_Dokumentasi SHALL memperbarui berkas `02_architecture/ADR/README.md` dengan menambahkan satu baris indeks untuk `ADR-008` (mencakup kolom nomor, judul, status, dan tanggal) dan mengubah nilai kolom Status pada baris `ADR-002` menjadi `Superseded by ADR-008`.
6. THE ADR_Baru SHALL memuat field header Status bernilai `Accepted`, field Date, dan field Decision By, serta bagian Context, Decision, Consequences (dengan sub-bagian positif dan negatif), dan Alternatives Considered.
7. IF berkas dengan nomor `ADR-008` sudah ada di direktori ADR, THEN THE Sistem_Dokumentasi SHALL tidak menimpa berkas yang sudah ada dan menampilkan indikasi galat yang menyatakan terjadi konflik nomor ADR.

### Requirement 6: Pembaruan Dokumen Arsitektur, Panduan, Prompt, dan Rencana

**User Story:** Sebagai pemelihara dokumentasi, saya ingin dokumen tech stack, setup, struktur folder, UI/UX, prompt, dan roadmap diperbarui untuk frontend baru, sehingga seluruh dokumentasi mencerminkan React+Inertia.

#### Acceptance Criteria

1. THE Rencana_Update_Dok SHALL menetapkan pembaruan `02_architecture/TECH_STACK.md` dengan Status_Tindakan `Update` agar mencantumkan React `^19.2.6`, `@inertiajs/react ^3.3.0`, `inertiajs/inertia-laravel ^3.1`, `@vitejs/plugin-react ^6.0.2`, Laravel `^13.7`, dan PHP `^8.3` sesuai Kode_Nyata, serta mengoreksi setiap entri lama yang tidak konsisten (minimal Laravel `12.x` menjadi `^13.7`, penghapusan Filament, dan penurunan Alpine.js dari pustaka frontend utama) beserta alasan koreksinya.
2. THE Rencana_Update_Dok SHALL menetapkan pembaruan `01_guides/SETUP_GUIDE.md` dengan Status_Tindakan `Update` agar memuat langkah setup React+Inertia yang mencakup tepat tiga bagian: instalasi dependensi React sesuai versi pada Kode_Nyata, konfigurasi `@vitejs/plugin-react` pada Vite, dan entry point Inertia yang me-resolve halaman dari `resources/js/Pages` dengan root view `app`.
3. THE Rencana_Update_Dok SHALL menetapkan pembaruan `02_architecture/FOLDER_STRUCTURE.md` dengan Status_Tindakan `Update` agar memuat struktur direktori halaman React (`resources/js/Pages`), direktori komponen React (`resources/js/Components`), dan berkas root view `app`.
4. THE Rencana_Update_Dok SHALL menetapkan pembaruan `01_guides/UI_UX_GUIDELINES.md` dengan Status_Tindakan `Update` agar alur implementasi mengacu ke komponen React (bukan Blade + Alpine.js) sambil mempertahankan Konteks_A dan Konteks_B tanpa perubahan.
5. THE Rencana_Update_Dok SHALL menetapkan pembaruan `05_prompts/PROMPT_SETUP_PROJECT.md` dan `05_prompts/PROMPT_FRONTEND.md` dengan Status_Tindakan `Update` agar menghapus setiap pernyataan "BUKAN Inertia" dan menggantinya dengan instruksi React+Inertia.
6. THE Rencana_Update_Dok SHALL menetapkan pembaruan `04_plans/MASTER_ROADMAP.md` dan `04_plans/SPRINT_PLAN.md` dengan Status_Tindakan `Update` agar memuat minimal tiga fase/sprint migrasi frontend ke React+Inertia secara berurutan yang selaras dengan fase pada Master_Plan, masing-masing memiliki nama dan kriteria keluar (exit criteria) yang dapat diverifikasi.
7. THE Rencana_Update_Dok SHALL menetapkan pembaruan `00_INDEX.md` dengan Status_Tindakan `Update` agar mencantumkan setiap dokumen baru (Master_Plan, Dok_Keunggulan, Rencana_Update_Dok, Peta_Layar, dan `ADR-008`), perubahan tech stack ke React+Inertia, dan status baru `ADR-002` (`Superseded`).
8. THE Rencana_Update_Dok SHALL menetapkan pembaruan `CHANGELOG.md` dengan Status_Tindakan `Update` agar mencatat satu entri yang merujuk dokumen baru yang dihasilkan, perubahan tech stack ke React+Inertia, dan adopsi `ADR-008` yang men-supersede `ADR-002`.
9. IF sebuah berkas yang ditetapkan untuk pembaruan pada kriteria 1-8 tidak ditemukan pada Set_Dokumentasi, THEN THE Rencana_Update_Dok SHALL menandai berkas tersebut dengan Status_Tindakan `New` dan mencantumkan tujuan serta ringkasan isinya alih-alih `Update`.

### Requirement 7: Batasan Deliverable — Hanya Perencanaan/Dokumentasi Markdown

**User Story:** Sebagai pemilik produk, saya ingin memastikan fitur ini hanya menghasilkan dokumen perencanaan, sehingga tidak ada perubahan kode migrasi maupun backend yang dieksekusi secara tidak sengaja.

#### Acceptance Criteria

1. THE Sistem_Dokumentasi SHALL menghasilkan keluaran yang seluruhnya terdiri dari berkas berekstensi `.md` (format Markdown), tanpa menghasilkan berkas kode, berkas migrasi, maupun berkas yang dapat dieksekusi.
2. IF proses menghasilkan berkas dengan ekstensi selain `.md`, THEN THE Sistem_Dokumentasi SHALL menandai berkas tersebut sebagai pelanggaran scope dan mengeluarkannya dari kumpulan deliverable.
3. WHEN fitur dinyatakan selesai, THE Sistem_Dokumentasi SHALL memastikan seluruh berkas Lapisan_Backend (model, route, controller, request validation, middleware peran, dan skema database) tidak menunjukkan selisih apa pun jika dibandingkan terhadap kondisi awal sebelum fitur dikerjakan.
4. IF perubahan sementara pada Lapisan_Backend dilakukan untuk keperluan analisis, THEN THE Sistem_Dokumentasi SHALL mengembalikan (revert) seluruh perubahan tersebut sehingga perbandingan terhadap kondisi awal tidak menunjukkan selisih apa pun sebelum fitur dinyatakan selesai.
5. WHEN fitur dinyatakan selesai, THE Sistem_Dokumentasi SHALL memastikan konfigurasi dan kode integrasi Midtrans, Cloudinary, Reverb, Meilisearch, dan Socialite tidak menunjukkan selisih apa pun jika dibandingkan terhadap kondisi awal sebelum fitur dikerjakan.
6. IF sebuah usulan dalam dokumen menyiratkan perubahan pada Lapisan_Backend, THEN THE Sistem_Dokumentasi SHALL menandai usulan tersebut secara eksplisit sebagai rekomendasi untuk pekerjaan terpisah di luar scope fitur ini.
7. THE Sistem_Dokumentasi SHALL menyatakan secara eksplisit pada Master_Plan bahwa nama model, route, controller, skema database, dan middleware peran dipertahankan utuh tanpa perubahan.

### Requirement 8: Kualitas, Konsistensi, dan Akurasi Dokumen

**User Story:** Sebagai pembaca dokumentasi, saya ingin seluruh dokumen yang dihasilkan akurat terhadap kode nyata dan konsisten secara internal, sehingga tidak ada kesalahan sintaks, atribut, atau versi yang menyesatkan.

#### Acceptance Criteria

1. WHEN sebuah dokumen mencantumkan nilai versi dependensi, THE Sistem_Dokumentasi SHALL memastikan nilai tersebut sama persis karakter-demi-karakter dengan nilai pada `composer.json` (bagian `require` dan `require-dev`) serta `package.json` (bagian `dependencies` dan `devDependencies`) pada Kode_Nyata.
2. THE Sistem_Dokumentasi SHALL menggunakan terminologi peran yang sama persis dengan definisi pada `GLOSSARY.md` dan nilai enum pada `RoleMiddleware.php`, yaitu `user` (untuk Student), `instructor`, dan `admin`.
3. IF sebuah dokumen merujuk berkas, route, atau nama kelas pada Kode_Nyata, THEN THE Sistem_Dokumentasi SHALL memastikan rujukan tersebut cocok dengan lokasi dan nama yang sebenarnya ada pada Kode_Nyata.
4. WHEN sebuah dokumen memuat cuplikan konfigurasi, perintah, atau kode, THE Sistem_Dokumentasi SHALL membungkus cuplikan tersebut dalam blok kode berpagar (fenced code block) Markdown dengan penanda bahasa yang sesuai isi cuplikan (mis. `php`, `json`, `bash`).
5. THE Sistem_Dokumentasi SHALL memastikan tidak ada dua pernyataan yang saling bertentangan—yaitu dua pernyataan yang memberi nilai berbeda untuk fakta yang sama—baik antar dokumen yang dihasilkan maupun terhadap dokumen yang telah diperbarui.
6. WHERE sebuah dokumen lama memuat atribut atau sintaks yang salah, THE Rencana_Update_Dok SHALL mencatat koreksi spesifik berupa nilai, atribut, atau sintaks yang benar yang harus dilakukan.
7. IF ditemukan ketidaksesuaian nilai versi dependensi antara dokumen dan Kode_Nyata, THEN THE Sistem_Dokumentasi SHALL mencatatnya ke dalam Rencana_Update_Dok beserta nilai versi terkoreksi yang spesifik.
8. IF ditemukan rujukan ke berkas, route, atau nama kelas yang tidak ada pada Kode_Nyata, THEN THE Sistem_Dokumentasi SHALL mencatat rujukan tersebut ke dalam Rencana_Update_Dok.
