 
# Anargya ITS EV Team Website

link live : https://mini-project-anargya-rust.vercel.app/

Website Anargya ITS EV Team merupakan website profil tim yang dilengkapi dengan katalog merchandise dan sistem pemesanan online. Project ini dikembangkan menggunakan React.js dan Vite pada sisi frontend, serta Supabase sebagai backend service dan PostgreSQL sebagai database.

Website ini dirancang untuk menampilkan identitas tim, perjalanan pengembangan mobil Formula Electric, pencapaian kompetisi, berita, dokumentasi, sponsor, dan merchandise Anargya ITS EV Team.

## 1. Project Overview

Project ini menggabungkan website profil tim dengan sistem toko merchandise berbasis database. Pengunjung dapat menjelajahi informasi tim dan melihat produk yang tersedia, sedangkan administrator dapat mengelola produk dan pesanan melalui halaman admin.

Fitur utama yang tersedia:

- Landing page dengan animasi dan visual interaktif.
- Halaman About yang menampilkan profil dan sejarah tim.
- News section dengan fitur pencarian berita.
- Car showcase yang menampilkan mobil Formula Electric dari berbagai generasi.
- Hall of Fame untuk menampilkan pencapaian tim.
- Sponsor section dan photo gallery.
- Katalog merchandise dengan kategori produk.
- Shopping cart dengan penyimpanan lokal pada browser.
- Checkout untuk menyimpan pesanan ke database.
- Validasi produk dan stok melalui PostgreSQL Function.
- Admin dashboard dengan autentikasi Supabase.
- Pengelolaan produk, stok, harga, dan status pesanan.

## 2. Development Environment

Project ini menggunakan frontend berbasis React yang dijalankan dan dibangun menggunakan Vite. Backend dan database menggunakan layanan Supabase sehingga project tidak memerlukan server API Node.js khusus.

| Komponen | Teknologi |
|---|---|
| Code editor | Editor yang mendukung JavaScript dan JSX |
| Bahasa pemrograman | JavaScript |
| Frontend framework | React.js 18 |
| Build tool | Vite 5 |
| Styling | CSS3 |
| Runtime development | Node.js |
| Package manager | npm |
| Backend service | Supabase |
| Database engine | PostgreSQL |
| Authentication | Supabase Auth |
| Database client | `@supabase/supabase-js` |
| Browser storage | `localStorage` |
| Database procedure | PostgreSQL PL/pgSQL |
| Environment configuration | `.env` |
| Module system | ES Modules |

Versi Node.js yang digunakan tidak dikunci secara eksplisit dalam repository. Gunakan versi Node.js yang kompatibel dengan Vite 5.

## 3. Project Structure

Struktur utama project:

```text
miniproject/
├── public/
│   └── fonts/
│       └── CodecCold-Bold.ttf
├── src/
│   ├── assets/
│   │   ├── gallery/
│   │   ├── shop/
│   │   ├── sponsors/
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   ├── data.js
│   ├── shopStore.js
│   ├── Sections.jsx
│   ├── AboutPage.jsx
│   ├── AdminPage.jsx
│   ├── ShopPage.jsx
│   ├── Sponsors.jsx
│   ├── PhotoGallery.jsx
│   ├── PhotoTagline.jsx
│   ├── FsaejBanner.jsx
│   └── *.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── supabase.sql
├── .env
└── .gitignore
```

### Fungsi file utama

| File | Fungsi |
|---|---|
| `index.html` | HTML entry point aplikasi |
| `src/main.jsx` | Inisialisasi dan rendering React |
| `src/App.jsx` | Navigasi dan pemilihan halaman |
| `src/data.js` | Data konten profil, berita, mobil, dan pencapaian |
| `src/Sections.jsx` | Komponen utama halaman Home |
| `src/AboutPage.jsx` | Halaman profil dan sejarah tim |
| `src/ShopPage.jsx` | Katalog, shopping cart, dan checkout |
| `src/AdminPage.jsx` | Dashboard administrator |
| `src/shopStore.js` | Integrasi Supabase dan pengelolaan shopping cart |
| `src/Sponsors.jsx` | Tampilan sponsor |
| `src/PhotoGallery.jsx` | Galeri foto |
| `src/FsaejBanner.jsx` | Banner kompetisi |
| `src/PhotoTagline.jsx` | Elemen tagline pada visual utama |
| `vite.config.js` | Konfigurasi build tool Vite |
| `package.json` | Dependency dan perintah project |
| `supabase.sql` | Skema database, kebijakan akses, dan fungsi pemesanan |
| `.env` | Konfigurasi lokal Supabase |
| `.gitignore` | Daftar file yang diabaikan Git |

## 4. Frontend

Frontend dikembangkan menggunakan React.js dengan pendekatan component-based architecture. Setiap halaman dan elemen visual dipisahkan menjadi komponen agar kode lebih mudah dikelola.

### 4.1 React.js

React digunakan untuk membangun UI dan mengelola state aplikasi.

Hooks yang digunakan antara lain:

- `useState` untuk mengelola state.
- `useEffect` untuk menangani side effects.
- `useRef` untuk referensi elemen DOM.
- `useMemo` untuk mengoptimalkan pemrosesan data.

### 4.2 Vite

Vite digunakan sebagai development server dan build tool. Vite memproses JSX, mendukung Hot Module Replacement, serta menghasilkan file production melalui proses build.

### 4.3 CSS

Styling dipisahkan berdasarkan halaman dan komponen, seperti `ShopPage.css`, `sections.css`, `about-page.css`, dan `theme.css`.

Website juga menggunakan Google Fonts, yaitu Archivo dan DM Mono, serta font lokal CodecCold-Bold.

### 4.4 Navigation

Navigasi menggunakan hash-based routing sederhana yang dikelola di `App.jsx`.

| Route | Halaman |
|---|---|
| `#/` | Home |
| `#/about` | About |
| `#/shop` | Shop |
| `#/admin` | Admin |

Sistem navigasi memanfaatkan `window.location.hash` dan event `hashchange`, tanpa menggunakan React Router.

## 5. Backend dan Supabase

Project menggunakan Supabase sebagai Backend-as-a-Service (BaaS). Layanan ini menyediakan database PostgreSQL, autentikasi, akses data melalui API, dan pemanggilan fungsi database.

Project tidak menggunakan Express.js atau framework backend server terpisah.

### 5.1 Supabase Services

Layanan Supabase yang digunakan:

- **PostgreSQL:** Menyimpan produk dan transaksi.
- **Supabase Auth:** Mengelola autentikasi administrator.
- **Supabase JavaScript Client:** Menghubungkan aplikasi React dengan Supabase.
- **Row Level Security (RLS):** Mengatur akses data berdasarkan kebijakan database.
- **PostgreSQL Function / RPC:** Menjalankan proses pemesanan pada database.

### 5.2 Supabase Configuration

Client Supabase dikonfigurasi melalui environment variables yang dibaca menggunakan `import.meta.env`.

Contoh format konfigurasi:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Nilai tersebut perlu disesuaikan dengan konfigurasi project Supabase yang digunakan.

Client dibuat menggunakan `createClient()` dari package `@supabase/supabase-js`.

Variabel dengan prefix `VITE_` dapat dimasukkan ke bundle frontend. Jangan menyimpan service role key, password database, atau secret key di dalamnya.

### 5.3 Authentication

Halaman admin menggunakan Supabase Auth dengan email dan password.

Fungsi autentikasi yang digunakan mencakup:

- `signInWithPassword()` untuk login.
- `getSession()` untuk memeriksa session aktif.

Akses halaman admin di frontend tidak boleh dianggap sebagai satu-satunya lapisan keamanan. Operasi database juga harus dilindungi dengan kebijakan RLS yang membatasi hak administrator secara tepat.

## 6. Database Structure

Database menggunakan PostgreSQL melalui Supabase. Skema database dan fungsi transaksi didefinisikan dalam `supabase.sql`.

Terdapat tiga tabel utama.

### 6.1 Products

Tabel `products` menyimpan katalog merchandise.

| Kolom | Fungsi |
|---|---|
| `id` | Identitas produk |
| `name` | Nama produk |
| `description` | Deskripsi produk |
| `price` | Harga produk |
| `stock` | Jumlah stok |
| `sizes` | Daftar ukuran |
| `photo` | Referensi gambar produk |
| `category` | Kategori produk |
| `sort_order` | Urutan tampilan |
| `active` | Status aktif produk |

### 6.2 Orders

Tabel `orders` menyimpan data pesanan dan informasi pelanggan.

| Kolom | Fungsi |
|---|---|
| `id` | Identitas pesanan |
| `created_at` | Waktu pemesanan |
| `customer_name` | Nama pelanggan |
| `phone` | Nomor telepon |
| `email` | Email pelanggan |
| `address` | Alamat pelanggan |
| `city` | Kota |
| `postal` | Kode pos |
| `note` | Catatan pesanan |
| `total` | Total pesanan |
| `status` | Status pesanan |

### 6.3 Order Items

Tabel `order_items` menyimpan rincian produk dalam sebuah pesanan.

| Kolom | Fungsi |
|---|---|
| `id` | Identitas item |
| `order_id` | Referensi pesanan |
| `product_id` | Referensi produk |
| `name` | Nama produk saat transaksi |
| `size` | Ukuran produk |
| `qty` | Jumlah pembelian |
| `price` | Harga produk saat transaksi |

### 6.4 Database Relationships

Relasi utama:

```text
orders
  |
  | 1:N
  v
order_items

products
  |
  | 1:N secara konseptual
  v
order_items
```

Satu pesanan dapat memiliki banyak item. Setiap item terhubung dengan pesanan melalui `order_id` dan mengacu pada produk melalui `product_id`.

Nama dan harga juga disimpan dalam item pesanan untuk mempertahankan informasi produk pada saat transaksi dilakukan.

## 7. Shopping Cart dan Checkout

### 7.1 Shopping Cart

Shopping cart dikelola di frontend menggunakan React state dan `localStorage`.

Fungsinya mencakup:

- Menambahkan produk ke keranjang.
- Mengubah kuantitas.
- Menghapus produk.
- Menyimpan keranjang ketika halaman dimuat ulang.
- Menghitung subtotal produk.

Penyimpanan lokal membuat isi keranjang tetap tersedia pada browser yang sama, tetapi tidak menjadikannya data pesanan permanen di server.

### 7.2 Checkout

Checkout mengirimkan data pelanggan dan item pesanan ke Supabase.

Proses pemesanan menggunakan PostgreSQL Function bernama `place_order`, yang dipanggil melalui RPC.

Secara umum, prosesnya meliputi:

1. Memvalidasi data pelanggan dan item.
2. Memeriksa produk yang dipesan.
3. Memvalidasi stok dan ukuran.
4. Membuat record pesanan.
5. Menyimpan rincian item.
6. Mengurangi stok produk.
7. Menghitung total pesanan.
8. Mengembalikan hasil transaksi dan kode pesanan.

Kode pesanan menggunakan format seperti `ANR-00001`.

Pembayaran belum terintegrasi dengan payment gateway pada implementasi yang diperiksa. Konfirmasi pembayaran dan pengiriman dilakukan secara manual.

## 8. Admin Dashboard

Halaman admin tersedia melalui `#/admin`.

Fitur utama:

- Login administrator.
- Melihat daftar pesanan.
- Melihat informasi pelanggan.
- Melihat rincian produk pesanan.
- Mengubah status pesanan.
- Menghapus pesanan.
- Mengelola harga produk.
- Mengelola stok.
- Mengaktifkan atau menonaktifkan produk.

Akses admin bergantung pada autentikasi Supabase dan kebijakan akses database.

**Catatan keamanan:** Kebijakan SQL yang memberikan akses luas kepada seluruh pengguna authenticated perlu diperketat. Pastikan hanya akun dengan role administrator yang dapat membaca atau mengubah data transaksi dan katalog.

## 9. Asset Management

Asset lokal disimpan di dalam `src/assets/`.

Direktori ini mencakup gambar mobil, logo, foto galeri, merchandise, dan sponsor.

Foto produk dipetakan menggunakan mekanisme import asset di frontend. Beberapa gambar berita menggunakan URL eksternal sehingga ketersediaannya bergantung pada server sumber.

Penggunaan asset lokal membantu proses build Vite mengelola file gambar sebagai bagian dari aplikasi.

## 10. Installation and Setup

### 10.1 Requirements

Pastikan perangkat sudah memiliki:

- Node.js yang kompatibel dengan Vite 5.
- npm.
- Git (opsional, jika menggunakan repository Git).
- Akun Supabase untuk backend dan database.

### 10.2 Clone Repository

```bash
git clone <repository-url>
cd miniproject
```

Ganti `<repository-url>` dengan URL repository project.

### 10.3 Install Dependencies

```bash
npm install
```

### 10.4 Configure Environment

Buat atau perbarui file `.env` di root project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Pastikan nilai tersebut sesuai dengan project Supabase milikmu.

### 10.5 Setup Database

1. Buka SQL Editor di dashboard Supabase.
2. Buka file `supabase.sql`.
3. Periksa skema tabel, function, dan kebijakan akses.
4. Jalankan SQL yang diperlukan pada project Supabase.
5. Pastikan tabel dan function telah berhasil dibuat.

Sebelum menjalankan skrip pada database yang sudah memiliki data, periksa dampak setiap perintah SQL agar tidak menimpa atau menghapus data yang ada.

### 10.6 Run Development Server

```bash
npm run dev
```

Vite akan menampilkan URL lokal pada terminal. Buka URL tersebut di browser untuk mengakses website.

### 10.7 Production Build

Untuk membuat versi production:

```bash
npm run build
```

Hasil build tersedia pada direktori `dist/`.

Untuk melakukan preview hasil build:

```bash
npm run preview
```

## 11. Security Notes

Beberapa hal yang perlu diperhatikan:

- Jangan commit file `.env` ke repository publik.
- Jangan menyimpan service role key atau database password di frontend.
- Gunakan RLS untuk melindungi tabel.
- Batasi akses pengelolaan produk dan pesanan hanya untuk admin.
- Validasi data transaksi di database, bukan hanya di frontend.
- Hindari menyimpan informasi sensitif pelanggan di log atau penyimpanan browser yang tidak diperlukan.

## 12. Limitations

Berdasarkan source code yang diperiksa, beberapa batasan implementasi adalah:

- Pembayaran belum terintegrasi dengan payment gateway.
- Pemesanan masih memerlukan konfirmasi pembayaran dan pengiriman secara manual.
- Navigasi menggunakan hash-based routing sederhana.
- Shopping cart disimpan secara lokal di browser.
- Gambar eksternal bergantung pada ketersediaan sumber.
- Pengaturan role administrator dan kebijakan RLS masih perlu diperketat.

## 13. Future Improvements

Pengembangan selanjutnya dapat mencakup:

- Integrasi payment gateway.
- Notifikasi otomatis untuk pesanan.
- Role-based access control untuk administrator.
- Riwayat pesanan pelanggan.
- Pengujian otomatis.
- Optimasi gambar dan performa.
- Peningkatan SEO dan accessibility.
- Deployment ke layanan hosting frontend seperti Vercel atau Netlify.

## 14. Technology Summary

| Area | Technology |
|---|---|
| Frontend | React.js |
| Language | JavaScript / JSX |
| Styling | CSS3 |
| Build Tool | Vite |
| Package Manager | npm |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Database Access | Supabase JavaScript Client |
| Server-side Logic | PostgreSQL Function / RPC |
| Database Security | Row Level Security |
| Browser Storage | LocalStorage |
| Environment | `.env` |
| Production Build | Vite |

---
