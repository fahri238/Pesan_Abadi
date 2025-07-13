# Pesan Abadi di Blockchain Internet Computer

Selamat datang di proyek **"Pesan Abadi"**, sebuah aplikasi terdesentralisasi (dApp) yang dibangun sepenuhnya di atas blockchain Internet Computer. Aplikasi ini memungkinkan pengguna untuk menulis pesan yang akan tersimpan selamanya, aman dari sensor dan perubahan.

Ini adalah demonstrasi kekuatan sejati dari Internet Computer: kemampuan untuk membangun aplikasi web yang **100% on-chain**, dengan state yang persisten dan pengalaman pengguna yang lancar tanpa biaya gas.

---

## ✨ Fitur Utama

- **Penyimpanan Abadi:**  
  Pesan yang dikirim disimpan secara permanen di dalam state canister dan tidak dapat diubah atau dihapus.

- **Otentikasi Aman:**  
  Menggunakan Internet Identity, sistem otentikasi asli dari Internet Computer, untuk mengaitkan setiap pesan dengan pengirimnya secara anonim dan aman.

- **Desentralisasi Penuh (100% On-Chain):**  
  Baik frontend (React) maupun backend (Motoko) berjalan di dalam canister, tanpa ketergantungan pada server terpusat.

- **Pengalaman Pengguna Tanpa Gas:**  
  Berkat model Reverse Gas dari ICP, pengguna dapat mengirim pesan tanpa perlu membayar biaya transaksi.

---

## 🛠️ Teknologi yang Digunakan

- **Backend:**  
  Motoko, sebuah bahasa pemrograman modern dan aman yang dirancang khusus untuk Internet Computer.

- **Frontend:**  
  React dengan Vite untuk membangun antarmuka pengguna yang cepat dan responsif.

- **Blockchain:**  
  Internet Computer (ICP), sebuah platform blockchain yang memungkinkan aplikasi web berjalan dengan kecepatan dan skala internet.

- **Otentikasi:**  
  Internet Identity, layanan otentikasi berbasis blockchain yang aman.

---

## 🚀 Cara Menjalankan Proyek

Proyek ini dirancang untuk dijalankan di lingkungan pengembangan seperti Juno (sebelumnya Ninja) atau secara lokal menggunakan DFX.

### Prasyarat

- Akses ke lingkungan pengembangan Internet Computer.
- Node.js dan npm terpasang.
- DFX (SDK Internet Computer) terpasang jika menjalankan secara lokal.

---

### Langkah-langkah Deployment

#### 1. Clone Repositori (jika berlaku)

Jika Anda mengunduh proyek ini, pastikan semua file berada di dalam direktori yang benar.

#### 2. Install Dependencies

Perintah build akan secara otomatis menjalankan:

```bash
npm install
```

di dalam direktori frontend untuk mengunduh semua paket yang diperlukan, seperti React dan AuthClient.

#### 3. Deploy ke Internet Computer

Jalankan perintah berikut dari direktori utama proyek Anda:

```bash
dfx deploy
```

Jika Anda menggunakan editor web seperti Juno, cukup klik tombol **"Update"** atau **"Deploy"**.

Perintah ini akan melakukan beberapa hal secara berurutan:

- Membangun canister backend dengan mengkompilasi kode Motoko.
- Menjalankan skrip prebuild untuk membuat declarations (file penghubung antara frontend dan backend).
- Membangun canister frontend dengan menjalankan:

```bash
npm run build
```

di dalam direktori frontend untuk membangun antarmuka pengguna.

- Men-deploy kedua canister tersebut ke jaringan (lokal atau mainnet).

---

#### 4. Buka Aplikasi

Setelah proses deploy selesai, Anda akan mendapatkan URL untuk canister frontend Anda. Buka URL tersebut di browser untuk mulai menggunakan aplikasi **"Pesan Abadi"!**

---

## 📢 Catatan

Proyek ini dibuat sebagai submission untuk menunjukkan potensi luar biasa dari pengembangan aplikasi web yang sepenuhnya terdesentralisasi di Internet Computer.
