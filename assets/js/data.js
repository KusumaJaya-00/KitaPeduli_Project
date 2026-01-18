export const database = {
  users: [
    {
      id: 1,
      name: "Admin Charity",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "Donatur Baik",
      email: "user@gmail.com",
      password: "user123",
      role: "user",
    },
  ],
  currentUser: null,
  kampanye: [
    {
      id: "K1",
      judul: "Bantuan Pangan Korban Banjir",
      gambar: "https://images.unsplash.com/photo-1542810634-71277d95dcbb",
      deskripsi:
        "Membantu menyediakan bahan pangan pokok untuk warga terdampak banjir di pesisir.",
      target: 50000000,
      terkumpul: 15250000,
      kategori: "Bencana Alam",
      tenggatWaktu: "2026-03-20",
    },
    {
      id: "K2",
      judul: "Beasiswa Anak Pesisir Bali",
      gambar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      deskripsi:
        "Program bantuan pendidikan untuk anak-anak nelayan agar bisa lanjut ke jenjang SMA.",
      target: 25000000,
      terkumpul: 10000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-05-15",
    },
    {
      id: "K3",
      judul: "Penanaman 1000 Mangrove",
      gambar: "https://images.unsplash.com/photo-1583212292354-0837cc330f47",
      deskripsi:
        "Aksi nyata menjaga ekosistem pantai Bali dengan menanam bibit mangrove baru.",
      target: 15000000,
      terkumpul: 5000000,
      kategori: "Lingkungan",
      tenggatWaktu: "2026-02-28",
    },
  ],

  // Data Donasi yang Masuk (Untuk Dashboard Admin)
  donasi: [
    {
      id: 101,
      namaDonatur: "Budi Santoso",
      jumlah: 100000,
      kampanye: "Beasiswa Anak Pesisir",
      tanggal: "2026-01-15",
    },
    {
      id: 102,
      namaDonatur: "Siti Aminah",
      jumlah: 500000,
      kampanye: "Bantuan Pangan",
      tanggal: "2026-01-16",
    },
  ],

  // Data Relawan (Untuk Dashboard Admin)
  relawan: [
    { id: 1, nama: "Agus Junaedi", email: "agus@mail.com", keahlian: "Medis" },
  ],
};

// --- FUNGSI GETTER (Untuk Ambil Data) ---
export const getAllKampanye = () => database.kampanye;
export const getAllUsers = () => database.users;
export const getAllDonasi = () => database.donasi;
export const getAllRelawan = () => database.relawan;
export const getCurrentUser = () => database.currentUser;

// --- FUNGSI AUTH (Login, Logout, Session) ---

// 1. Fungsi Login
export const login = (email, password) => {
  const user = database.users.find((u) => u.email === email && u.password === password);

  if (user) {
    database.currentUser = user;
    // Simpan ke localStorage agar login tidak hilang saat refresh
    localStorage.setItem("userLogin", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Email atau Password salah!" };
};

// --- SISTEM AUTH (REGISTER) ---

export const register = (name, email, password) => {
  // Cek apakah email sudah terdaftar
  const isExist = database.users.find((u) => u.email === email);
  if (isExist) {
    return { success: false, message: "Email sudah terdaftar!" };
  }

  // Tambah user baru ke database
  const newUser = {
    id: database.users.length + 1,
    name,
    email,
    password,
    role: "user", // Default role untuk pendaftar baru
  };

  database.users.push(newUser);
  return { success: true, message: "Berhasil daftar! Silakan login." };
};

// 2. Fungsi Logout
export const logout = () => {
  database.currentUser = null;
  localStorage.removeItem("userLogin");
  window.location.hash = "#login"; 
};

// 3. Cek Status Login (Panggil fungsi ini di app.js saat pertama kali load)
export const checkAuthState = () => {
  const savedUser = localStorage.getItem("userLogin");
  if (savedUser) {
    database.currentUser = JSON.parse(savedUser);
  }
  return database.currentUser;
};

// 4. Cek Role Admin
export const isAdmin = () => {
  return database.currentUser && database.currentUser.role === "admin";
};