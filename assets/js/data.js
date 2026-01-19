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

  /**
   * DATA KAMPANYE (20+ Items)
   * Properti: id, title, image, description, target, collected, category, deadline, author, location
   */
  kampanye: [
    {
      id: "K1",
      title: "Bantuan Pangan Korban Banjir",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb",
      description:
        "Membantu menyediakan bahan pangan pokok untuk warga terdampak banjir di pesisir.",
      target: 50000000,
      collected: 15250000,
      category: "Bencana Alam",
      deadline: "2026-03-20",
      author: "ACT Bali",
      location: "Jembrana",
    },
    {
      id: "K2",
      title: "Beasiswa Anak Pesisir Bali",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      description:
        "Program bantuan pendidikan untuk anak-anak nelayan agar bisa lanjut ke jenjang SMA.",
      target: 25000000,
      collected: 10000000,
      category: "Pendidikan",
      deadline: "2026-05-15",
      author: "Yayasan Senyum",
      location: "Karangasem",
    },
    {
      id: "K3",
      title: "Penanaman 1000 Mangrove",
      image: "https://images.unsplash.com/photo-1583212292354-0837cc330f47",
      description:
        "Aksi nyata menjaga ekosistem pantai Bali dengan menanam bibit mangrove baru.",
      target: 15000000,
      collected: 5000000,
      category: "Lingkungan",
      deadline: "2026-02-28",
      author: "Green Earth ID",
      location: "Denpasar",
    },
    {
      id: "K4",
      title: "Cegah Stunting Balita Desa",
      image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
      description:
        "Penyaluran paket gizi tambahan (susu & vitamin) untuk 500 balita.",
      target: 30000000,
      collected: 12500000,
      category: "Kesehatan",
      deadline: "2026-04-10",
      author: "Posyandu Sehat",
      location: "Buleleng",
    },
    {
      id: "K5",
      title: "Rumah Aman Kucing Terlantar",
      image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7",
      description:
        "Pembangunan shelter dan biaya sterilisasi untuk kucing liar.",
      target: 15000000,
      collected: 4500000,
      category: "Hewan",
      deadline: "2026-06-01",
      author: "Bali Cat Lovers",
      location: "Tabanan",
    },
    {
      id: "K6",
      title: "Renovasi Jembatan Putus",
      image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8",
      description: "Memperbaiki akses utama anak sekolah di desa terpencil.",
      target: 100000000,
      collected: 45000000,
      category: "Bencana Alam",
      deadline: "2026-08-12",
      author: "Relawan Desa",
      location: "Gianyar",
    },
    {
      id: "K7",
      title: "Operasi Katarak Gratis",
      image: "https://images.unsplash.com/photo-1579154236594-e179764b0ad4",
      description:
        "Membantu 50 lansia kurang mampu mendapatkan kembali penglihatan mereka.",
      target: 75000000,
      collected: 30000000,
      category: "Kesehatan",
      deadline: "2026-03-30",
      author: "Klinik Mata Sehat",
      location: "Singaraja",
    },
    {
      id: "K8",
      title: "Buku untuk Papua",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      description:
        "Pengiriman 5000 buku pelajaran dan alat tulis ke pedalaman Papua.",
      target: 40000000,
      collected: 15000000,
      category: "Pendidikan",
      deadline: "2026-04-20",
      author: "Indonesia Pintar",
      location: "Papua",
    },
    {
      id: "K9",
      title: "Konservasi Penyu Hijau",
      image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
      description:
        "Perlindungan sarah penyu dan pelepasan tukik di Pantai Serangan.",
      target: 20000000,
      collected: 8000000,
      category: "Lingkungan",
      deadline: "2026-02-15",
      author: "Sahabat Penyu",
      location: "Denpasar",
    },
    {
      id: "K10",
      title: "Paket Sembako Lansia",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8",
      description: "Membantu kebutuhan pangan harian lansia sebatang kara.",
      target: 20000000,
      collected: 12000000,
      category: "Kesehatan",
      deadline: "2026-02-10",
      author: "Mari Berbagi",
      location: "Badung",
    },
    {
      id: "K11",
      title: "Sumur Bor Desa Kekeringan",
      image: "https://images.unsplash.com/photo-1534938665420-4193effeabb4",
      description:
        "Membangun akses air bersih untuk warga di Karangasem Timur.",
      target: 60000000,
      collected: 25000000,
      category: "Lingkungan",
      deadline: "2026-07-01",
      author: "Water Action",
      location: "Karangasem",
    },
    {
      id: "K12",
      title: "Pelatihan Digital UMKM",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      description:
        "Memberdayakan pengrajin lokal agar bisa berjualan secara online.",
      target: 15000000,
      collected: 3000000,
      category: "Pendidikan",
      deadline: "2026-05-20",
      author: "Startup Bali",
      location: "Klungkung",
    },
    {
      id: "K13",
      title: "Oksigen Darurat RS",
      image: "https://images.unsplash.com/photo-1584036561566-baf241f9142d",
      description: "Pengadaan tabung oksigen untuk puskesmas daerah terpencil.",
      target: 50000000,
      collected: 40000000,
      category: "Kesehatan",
      deadline: "2026-02-25",
      author: "Peduli Sehat",
      location: "Bangli",
    },
    {
      id: "K14",
      title: "Sekolah Alam Bambu",
      image: "https://images.unsplash.com/photo-1513258496099-48168024adb0",
      description: "Pembangunan ruang kelas ramah lingkungan dari bambu.",
      target: 85000000,
      collected: 20000000,
      category: "Pendidikan",
      deadline: "2026-09-15",
      author: "Yayasan Hijau",
      location: "Tabanan",
    },
    {
      id: "K15",
      title: "Rehabilitasi Terumbu Karang",
      image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b",
      description:
        "Pemasangan struktur biorock untuk memulihkan ekosistem laut.",
      target: 45000000,
      collected: 10000000,
      category: "Lingkungan",
      deadline: "2026-11-20",
      author: "Blue Ocean",
      location: "Amed",
    },
    {
      id: "K16",
      title: "Ambulans Gratis Desa",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
      description: "Pengadaan mobil layanan kesehatan gratis 24 jam.",
      target: 250000000,
      collected: 150000000,
      category: "Kesehatan",
      deadline: "2026-12-30",
      author: "Layanan Cepat",
      location: "Nusa Penida",
    },
    {
      id: "K17",
      title: "Kebun Komunitas Organik",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
      description:
        "Menciptakan ketahanan pangan desa melalui pertanian organik.",
      target: 12000000,
      collected: 6000000,
      category: "Lingkungan",
      deadline: "2026-03-05",
      author: "Tani Mandiri",
      location: "Badung",
    },
    {
      id: "K18",
      title: "Operasi Bibir Sumbing",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c7e0",
      description: "Mengembalikan senyum indah bagi 20 anak kurang mampu.",
      target: 100000000,
      collected: 85000000,
      category: "Kesehatan",
      deadline: "2026-02-20",
      author: "Smile Foundation",
      location: "Denpasar",
    },
    {
      id: "K19",
      title: "Perpustakaan Desa Keliling",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      description: "Motor pintar pembawa buku untuk anak-anak pelosok.",
      target: 10000000,
      collected: 9000000,
      category: "Pendidikan",
      deadline: "2026-01-30",
      author: "Literasi Bali",
      location: "Bangli",
    },
    {
      id: "K20",
      title: "Darurat Kebakaran Pasar",
      image: "https://images.unsplash.com/photo-1541888941297-3088d894aa13",
      description:
        "Membantu pedagang kecil yang kehilangan lapak akibat kebakaran.",
      target: 150000000,
      collected: 25000000,
      category: "Bencana Alam",
      deadline: "2026-04-05",
      author: "Pasar Kita",
      location: "Denpasar",
    },
  ],

  // DATA DONASI (Riwayat Transaksi)
  donasi: [
    {
      id: 101,
      donaturName: "Siti Aminah",
      amount: 250000,
      campaignId: "K1",
      date: "2026-01-16",
    },
    {
      id: 102,
      donaturName: "PT. Berkah Jaya",
      amount: 10000000,
      campaignId: "K1",
      date: "2026-01-17",
    },
    {
      id: 103,
      donaturName: "Budi Santoso",
      amount: 500000,
      campaignId: "K2",
      date: "2026-01-18",
    },
    {
      id: 104,
      donaturName: "Seseorang",
      amount: 100000,
      campaignId: "K3",
      date: "2026-01-18",
    },
    {
      id: 105,
      donaturName: "Lestari Putri",
      amount: 1500000,
      campaignId: "K4",
      date: "2026-01-19",
    },
    {
      id: 106,
      donaturName: "Hamba Allah",
      amount: 200000,
      campaignId: "K18",
      date: "2026-01-19",
    },
    {
      id: 107,
      donaturName: "Agus Salim",
      amount: 50000,
      campaignId: "K19",
      date: "2026-01-19",
    },
    {
      id: 108,
      donaturName: "Ani Wijaya",
      amount: 1000000,
      campaignId: "K20",
      date: "2026-01-19",
    },
    {
      id: 109,
      donaturName: "Rudi Hartono",
      amount: 300000,
      campaignId: "K7",
      date: "2026-01-18",
    },
    {
      id: 110,
      donaturName: "Seseorang",
      amount: 75000,
      campaignId: "K9",
      date: "2026-01-17",
    },
  ],

  // DATA RELAWAN
  relawan: [
    { id: 1, name: "Agus Junaedi", email: "agus@mail.com", skill: "Medis" },
    {
      id: 2,
      name: "Dewi Sartika",
      email: "dewi@mail.com",
      skill: "Pengajaran",
    },
    { id: 3, name: "I Made Yoga", email: "made@mail.com", skill: "Logistik" },
    {
      id: 4,
      name: "Santi Putri",
      email: "santi@mail.com",
      skill: "Media Sosial",
    },
    {
      id: 5,
      name: "Rizky Fauzi",
      email: "rizky@mail.com",
      skill: "Dokumentasi",
    },
    { id: 6, name: "Putu Ayu", email: "putu@mail.com", skill: "Psikologi" },
    { id: 7, name: "Wayan Gede", email: "wayan@mail.com", skill: "Konstruksi" },
    {
      id: 8,
      name: "Kadek Indah",
      email: "kadek@mail.com",
      skill: "Administrasi",
    },
  ],
};

// --- FUNGSI GETTER ---
export const getAllKampanye = () => database.kampanye;
export const getAllUsers = () => database.users;
export const getAllDonasi = () => database.donasi;
export const getAllRelawan = () => database.relawan;
export const getCurrentUser = () => database.currentUser;

// --- FUNGSI AUTH ---
export const login = (email, password) => {
  const user = database.users.find(
    (u) => u.email === email && u.password === password,
  );
  if (user) {
    database.currentUser = user;
    localStorage.setItem("userLogin", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Email atau Password salah!" };
};

export const register = (name, email, password) => {
  const isExist = database.users.find((u) => u.email === email);
  if (isExist) return { success: false, message: "Email sudah terdaftar!" };

  const newUser = {
    id: database.users.length + 1,
    name,
    email,
    password,
    role: "user",
  };
  database.users.push(newUser);
  return { success: true, message: "Berhasil daftar! Silakan login." };
};

export const logout = () => {
  database.currentUser = null;
  localStorage.removeItem("userLogin");
  window.location.hash = "#login";
};

export const checkAuthState = () => {
  const savedUser = localStorage.getItem("userLogin");
  if (savedUser) database.currentUser = JSON.parse(savedUser);
  return database.currentUser;
};

export const isAdmin = () =>
  database.currentUser && database.currentUser.role === "admin";

const savedData = localStorage.getItem("charity_db");
if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Timpa data default dengan data dari localStorage jika ada
    database.kampanye = parsedData.kampanye;
    database.donasi = parsedData.donasi;
}

