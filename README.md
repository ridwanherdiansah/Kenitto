# Proyek Express.js Saya

Ini adalah proyek Node.js yang dibangun dengan Express.js, TypeScript, dan Mysql.

## Daftar Isi

- [Memulai](#memulai)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Proyek](#menjalankan-proyek)
- [API Endpoints](#api-endpoints)
- [Struktur Proyek](#struktur-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Lisensi](#lisensi)

## Memulai

Instruksi ini akan membantu Anda mengatur dan menjalankan proyek di mesin lokal Anda untuk keperluan pengembangan dan pengujian.

## Prasyarat

- Node.js
- npm
- Mysql

## Instalasi

1. Clone repositori ini ke mesin lokal Anda:
    ```sh
    git clone https://github.com/ridwanherdiansah/Kenitto
    ```
2. Masuk ke direktori proyek:
    ```sh
    cd Kenitto
    ```
3. Instal dependensi proyek:
    ```sh
    npm install
    ```

## Menjalankan Proyek

1. Buat file `.env` di direktori root proyek dan tambahkan konfigurasi berikut:
    ```env
    APP_NAME="BE-Knitto"
    APP_PORT="3000"
    BASEURL="localhost"
    APP_MODE="development"

    DB_HOST="localhost"
    DB_PORT="3306"
    DB_USERNAME="root"
    DB_PASSWORD=""
    DB_NAME="knitto"

    JWT_KEY="knitto"
    ```
2. Transpilasi kode TypeScript ke JavaScript:
    ```sh
    npm run build
    ```
3. Jalankan server:
    ```sh
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`.

## API Endpoints

Berikut adalah beberapa endpoint utama dalam API ini:

- `POST /auth/registrasi` - Registrasi users
- `POST /auth/login` - login users untuk mendapatkan token JWT

- `GET /product/` - Mengambil daftar semua produk dengan di beri authentikasi token JWT
- `POST /product/` - Menambahkan produk baru dengan di beri authentikasi token JWT
- `PATCH /product/:id` - meng update data product sesuai id yang di kirimkan dengan di beri authentikasi token JWT
- `DELETE /product/:id` - meng delete data product sesuai id yang di kirimkan dengan di beri authentikasi token JWT

- `GET /fakeAPI/` - Mengambil semua data product dari API external menggunakan axios dengan di beri authentikasi token JWT
- `POST /fakeAPI/` - Menambahkan data product baru ke API external menggunakan axios dengan di beri authentikasi token JWT
- `PATCH /fakeAPI/:id` - Men update data product sesuai id yang di kirimkan ke API external menggunakan axios dengan di beri authentikasi token JWT
- `DELETE /fakeAPI/:id` - Meng delete data product sesuai id yang di kirimkan ke API external menggunakan axios dengan di beri authentikasi token JWT

- `GET /transaksi/` - Mengnambahkan data users dan product baru menggunakan Query transakstion yang mana 
BEGIN
digunakan saat data akan diproses.
COMMIT
digunakan jika semua kasus pada alur proses berhasil. Bila demikian, fungsi commit harus diterapkan agar tersimpan di database.
ROLLBACK
digunakan jika terdapat kasus ada kegagalan (kesalahan/error) di salah satu proses itu. Maka, semua proses input akan dibatalkan (rollback) dan tidak akan disimpan ke dalam database.

- `GET /product/joinProduct` - Mengambil daftar semua produk yang di joinkan dengan tabel users

