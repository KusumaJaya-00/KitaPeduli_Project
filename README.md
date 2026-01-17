# 🤝 KitaPeduli - Platform Donasi Digital

Selamat datang di repository **KitaPeduli**. Project ini adalah platform donasi digital berbasis *Single Page Application* (SPA) yang dikembangkan untuk tugas mata kuliah Pemrograman Web.

---

## 🚀 1. Cara Menjalankan Project (WAJIB)
Project ini menggunakan **JavaScript Modules**, sehingga tidak bisa dijalankan dengan klik dua kali pada file HTML.
1. Buka folder project di **VS Code**.
2. Install extension **"Live Server"** (oleh Ritwick Dey).
3. Klik kanan pada file `index.html` -> **Open with Live Server**.
4. Website akan berjalan otomatis di: `http://127.0.0.1:5500`

---

## 🛠 2. Panduan Kolaborasi Git (Step-by-Step)
Ikuti langkah-langkah ini agar kode tim tidak bentrok (*conflict*):

### A. Persiapan Awal
- Clone repository ke laptopmu: `git clone https://github.com/KusumaJaya-00/KitaPeduli_Project.git`
- Masuk ke folder project: `cd KitaPeduli_Project`
- Pindah ke branch development: `git checkout development`

### B. Membuat Fitur Baru (Branching)
**JANGAN** koding langsung di branch `main` atau `development`. Buatlah branch khusus untuk fiturmu:
- Jalankan: `git checkout -b feature/[nama-fitur-kamu]`

### C. Menyimpan & Push Hasil Kerja
Setelah selesai koding fitur di branch tersebut, simpan dan upload ke GitHub:
1. `git add .`
2. `git commit -m "fitur: menyelesaikan tampilan [nama fitur]"`
3. `git push origin feature/[nama-fitur-kamu]`

### D. Pull Request (PR) ke Branch Development
Setelah kamu push, lakukan langkah ini di website GitHub:
1. Klik link ini untuk membuat PR: [Buka Halaman Pull Request](https://github.com/KusumaJaya-00/KitaPeduli_Project/pulls)
2. Klik tombol hijau **"New pull request"**.
3. **PENTING:** Atur base branch ke **`development`** (Bukan `main`).
4. Pilih branch fitur kamu di sebelah kanan.
5. Klik **"Create pull request"** dan isi deskripsi singkat.
6. Kabari **I Made Kusuma Jaya Wardana (Team Lead)** untuk dicek dan di-merge.

---

## 📁 3. Struktur Project & Tugas
Fokuslah mengerjakan file di folder `pages/` sesuai tugas masing-masing:

- `pages/Kampanye.js` : Menampilkan daftar kartu kampanye/donasi.
- `pages/Donasi.js` : Form pembayaran dan input nominal.
- `pages/Relawan.js` : Form pendaftaran relawan.
- `pages/DashboardAdmin.js` : Panel manajemen khusus admin.

> **Note:** Hindari mengubah `app.js` atau `Navbar.js` tanpa koordinasi. Untuk standar warna dan komponen dasar, cek file `assets/js/styles.js`.

---

## 🔑 4. Akun Testing (Uji Coba)
- **Role Admin:** `admin@gmail.com` | Password: `admin123`
- **Role User:** `user@gmail.com` | Password: `user123`

---

## 👤 5. Tim Pengembang
- **I Made Kusuma Jaya Wardana** (Team Lead)
- **I Putu Adhiatman** 
- **I Dewa Gde Ganendra Aryasatya** 
- **Putu Ghana Dhirendra Redanayasa**


---